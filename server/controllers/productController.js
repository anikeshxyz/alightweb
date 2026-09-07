import Product from '../models/Product.js';
import { fallbackProducts } from '../data/fallbackProducts.js';

// Helper with timeout to prevent queries hanging when DB is offline
const withTimeout = (promise, ms = 3000) => {
    return Promise.race([
        promise,
        new Promise((_, reject) => setTimeout(() => reject(new Error('Database query timed out')), ms))
    ]);
};

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
const getProducts = async (req, res) => {
    try {
        const products = await withTimeout(Product.find({}).lean(), 3000);
        if (products && products.length > 0) {
            return res.json({ success: true, data: products });
        }
        // If DB is empty, serve fallback catalog
        res.json({ success: true, data: fallbackProducts });
    } catch (error) {
        console.warn('[Products API] Serving fallback products due to DB status:', error.message);
        res.json({ success: true, data: fallbackProducts, isFallback: true });
    }
};

// @desc    Create a product
// @route   POST /api/products
// @access  Public (should be Admin)
const createProduct = async (req, res) => {
    try {
        const product = new Product(req.body);
        const createdProduct = await product.save();
        res.status(201).json({ success: true, data: createdProduct });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// @desc    Fetch single product
// @route   GET /api/products/:id
// @access  Public
const getProductById = async (req, res) => {
    try {
        let product = null;
        try {
            product = await withTimeout(Product.findById(req.params.id).lean(), 3000);
        } catch (dbErr) {
            console.warn('[Product By ID] DB query failed, checking fallback:', dbErr.message);
        }

        if (!product) {
            product = fallbackProducts.find(p => p._id === req.params.id || p.id === req.params.id || p.name.toLowerCase().includes((req.params.id || '').toLowerCase()));
        }

        if (product) {
            res.json({ success: true, data: product });
        } else {
            res.status(404).json({ success: false, message: 'Product not found' });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin
const updateProduct = async (req, res) => {
    try {
        const { name, price, description, image, images, category, countInStock } = req.body;

        const product = await Product.findById(req.params.id);

        if (product) {
            product.name = name || product.name;
            product.price = price !== undefined ? price : product.price;
            product.description = description || product.description;
            product.image = image || product.image;
            if (images !== undefined) product.images = images;
            product.category = category || product.category;
            product.countInStock = countInStock !== undefined ? countInStock : product.countInStock;

            const updatedProduct = await product.save();
            res.json(updatedProduct);
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/Admin
const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id).lean();

        if (product) {
            await Product.deleteOne({ _id: product._id });
            res.json({ message: 'Product removed' });
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export { getProducts, getProductById, createProduct, updateProduct, deleteProduct };
