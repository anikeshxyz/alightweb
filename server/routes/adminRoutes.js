import express from 'express';
import Admin from '../models/Admin.js';
import Product from '../models/Product.js';
import Order from '../models/Order.js';
import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import { protect } from '../middleware/adminAuth.js';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { sendEmailOtp } from '../utils/emailService.js';

const router = express.Router();

// Multer Config
const storage = multer.memoryStorage();

function checkFileType(file, cb) {
    const filetypes = /jpg|jpeg|png|webp|gif|svg/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);

    if (extname && mimetype) {
        return cb(null, true);
    } else {
        cb(new Error('Images only! Allowed: jpg, jpeg, png, webp, gif, svg'));
    }
}

const upload = multer({
    storage,
    limits: { fileSize: 10 * 1024 * 1024 }, // 10MB per file
    fileFilter: function (req, file, cb) {
        checkFileType(file, cb);
    },
});

// Helper to convert Google Drive sharing links to direct thumbnail/image links
function parseImageUrl(url) {
    if (!url) return '';
    const trimmed = url.trim();
    const driveFileRegex = /(?:https?:\/\/)?(?:www\.)?drive\.google\.com\/file\/d\/([a-zA-Z0-9_-]+)/;
    const driveUcRegex = /(?:https?:\/\/)?(?:www\.)?drive\.google\.com\/uc\?(?:.*&)?id=([a-zA-Z0-9_-]+)/;
    const driveOpenRegex = /(?:https?:\/\/)?(?:www\.)?drive\.google\.com\/open\?(?:.*&)?id=([a-zA-Z0-9_-]+)/;

    let match = trimmed.match(driveFileRegex) || trimmed.match(driveUcRegex) || trimmed.match(driveOpenRegex);
    if (match && match[1]) {
        return `https://lh3.googleusercontent.com/d/${match[1]}`;
    }
    return trimmed;
}

// Helper to save uploaded multer files to public/uploads
function saveUploadedFiles(files) {
    const savedUrls = [];
    if (!files || files.length === 0) return savedUrls;

    const uploadDir = path.join(process.cwd(), 'public', 'uploads');
    if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
    }

    for (let file of files) {
        const ext = path.extname(file.originalname).toLowerCase() || '.jpg';
        const filename = `product-${Date.now()}-${Math.round(Math.random() * 1E9)}${ext}`;
        const uploadPath = path.join(uploadDir, filename);
        fs.writeFileSync(uploadPath, file.buffer);
        savedUrls.push(`/uploads/${filename}`);
    }
    return savedUrls;
}

// ─── AUTHENTICATION & OTP ───────────────────────────────────────────────────

// Root Admin Redirect
router.get('/', (req, res) => {
    if (req.session && req.session.admin) {
        return res.redirect('/admin/dashboard');
    }
    res.redirect('/admin/login');
});

// OTP Store for Admins (in-memory mapping: email -> { otp, expiresAt })
const adminOtpStore = new Map();

function generateOtp() {
    return Math.floor(100000 + Math.random() * 900000).toString();
}

// Login Page
router.get('/login', async (req, res) => {
    if (req.session && req.session.admin) {
        return res.redirect('/admin/dashboard');
    }
    try {
        const adminExists = await Admin.findOne({}).lean();
        res.render('admin/login', {
            error: req.query.error || null,
            message: req.query.message || null,
            adminExists: !!adminExists,
            title: 'Admin Login'
        });
    } catch (err) {
        res.render('admin/login', { error: null, message: null, adminExists: true, title: 'Admin Login' });
    }
});

// Login Action (Step 1 -> Sends OTP)
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        if (!email || !password) {
            const adminExists = await Admin.findOne({}).lean();
            return res.render('admin/login', {
                error: 'Please provide both email and password',
                message: null,
                adminExists: !!adminExists,
                title: 'Admin Login'
            });
        }

        const admin = await Admin.findOne({ email: email.trim().toLowerCase() }).lean();
        if (admin && (await bcrypt.compare(password, admin.password))) {
            const otp = generateOtp();
            const expiresAt = Date.now() + 10 * 60 * 1000; // 10 minutes
            adminOtpStore.set(admin.email, { otp, expiresAt });

            // Send Email OTP if configured
            try {
                await sendEmailOtp(admin.email, 'Administrator', otp);
            } catch (mailErr) {
                console.warn('[Admin Auth] Mail sending skipped or failed:', mailErr.message);
            }

            req.session.pendingAdminLogin = { email: admin.email };
            req.session.save((err) => {
                if (err) console.error('Session error storing pending login:', err);
                res.redirect('/admin/verify-login-otp');
            });
        } else {
            const adminExists = await Admin.findOne({}).lean();
            res.render('admin/login', {
                error: 'Invalid email or password',
                message: null,
                adminExists: !!adminExists,
                title: 'Admin Login'
            });
        }
    } catch (error) {
        console.error('Admin login error:', error);
        const adminExists = await Admin.findOne({}).lean().catch(() => true);
        res.render('admin/login', {
            error: 'An error occurred during sign in. Please try again.',
            message: null,
            adminExists: !!adminExists,
            title: 'Admin Login'
        });
    }
});

// Verify Login OTP Form (Step 2)
router.get('/verify-login-otp', (req, res) => {
    if (!req.session || !req.session.pendingAdminLogin) {
        return res.redirect('/admin/login');
    }
    const email = req.session.pendingAdminLogin.email;
    const storedData = adminOtpStore.get(email);
    res.render('admin/verify_otp', {
        error: req.query.error || null,
        email,
        actionUrl: '/admin/verify-login-otp',
        resendUrl: '/admin/resend-login-otp',
        dev_otp: storedData ? storedData.otp : null,
        title: 'Verify Two-Step Authentication'
    });
});

// Resend Login OTP
router.get('/resend-login-otp', async (req, res) => {
    if (!req.session || !req.session.pendingAdminLogin) {
        return res.redirect('/admin/login');
    }
    const email = req.session.pendingAdminLogin.email;
    const otp = generateOtp();
    const expiresAt = Date.now() + 10 * 60 * 1000;
    adminOtpStore.set(email, { otp, expiresAt });

    try {
        await sendEmailOtp(email, 'Administrator', otp);
    } catch (err) {
        console.warn('Resend OTP email skipped:', err.message);
    }

    res.redirect('/admin/verify-login-otp');
});

// Verify Login OTP Action (Step 2)
router.post('/verify-login-otp', async (req, res) => {
    if (!req.session || !req.session.pendingAdminLogin) {
        return res.redirect('/admin/login');
    }

    const email = req.session.pendingAdminLogin.email;
    const { otp } = req.body;
    const storedData = adminOtpStore.get(email);

    if (!storedData || Date.now() > storedData.expiresAt || storedData.otp !== (otp || '').trim()) {
        return res.render('admin/verify_otp', {
            error: 'Invalid or expired 6-digit verification code. Please try again.',
            email,
            actionUrl: '/admin/verify-login-otp',
            resendUrl: '/admin/resend-login-otp',
            dev_otp: storedData ? storedData.otp : null,
            title: 'Verify Two-Step Authentication'
        });
    }

    try {
        const admin = await Admin.findOne({ email }).lean();
        adminOtpStore.delete(email); // Clear OTP

        req.session.admin = admin; // Set active session
        delete req.session.pendingAdminLogin;

        req.session.save((err) => {
            if (err) console.error('Session save error:', err);
            res.redirect('/admin/dashboard');
        });
    } catch (error) {
        res.render('admin/verify_otp', {
            error: 'Authentication error occurred during verification',
            email,
            actionUrl: '/admin/verify-login-otp',
            resendUrl: '/admin/resend-login-otp',
            dev_otp: null,
            title: 'Verify Two-Step Authentication'
        });
    }
});

// Signup Page
router.get('/signup', async (req, res) => {
    if (req.session && req.session.admin) {
        return res.redirect('/admin/dashboard');
    }
    const adminExists = await Admin.findOne({}).lean();
    if (adminExists) {
        return res.redirect('/admin/login?message=Admin+account+already+exists.+Please+sign+in.');
    }
    res.render('admin/signup', { error: null, title: 'Create Admin Account' });
});

// Signup Action (Step 1 -> Sends OTP)
router.post('/signup', async (req, res) => {
    const { email, password } = req.body;
    try {
        const existingAnyAdmin = await Admin.findOne({}).lean();
        if (existingAnyAdmin) {
            return res.redirect('/admin/login?message=Admin+already+configured.');
        }

        if (!email || !password || password.length < 6) {
            return res.render('admin/signup', {
                error: 'Please provide a valid email and a password with at least 6 characters.',
                title: 'Create Admin Account'
            });
        }

        const cleanEmail = email.trim().toLowerCase();
        const otp = generateOtp();
        const expiresAt = Date.now() + 10 * 60 * 1000;
        adminOtpStore.set(cleanEmail, { otp, expiresAt });

        try {
            await sendEmailOtp(cleanEmail, 'Administrator', otp);
        } catch (err) {
            console.warn('Signup OTP email skipped:', err.message);
        }

        req.session.pendingAdminSignup = { email: cleanEmail, password };
        req.session.save((err) => {
            if (err) console.error('Session error storing pending signup:', err);
            res.redirect('/admin/verify-signup-otp');
        });
    } catch (error) {
        res.render('admin/signup', { error: 'An error occurred during registration.', title: 'Create Admin Account' });
    }
});

// Verify Signup OTP Form (Step 2)
router.get('/verify-signup-otp', (req, res) => {
    if (!req.session || !req.session.pendingAdminSignup) {
        return res.redirect('/admin/signup');
    }
    const email = req.session.pendingAdminSignup.email;
    const storedData = adminOtpStore.get(email);
    res.render('admin/verify_otp', {
        error: null,
        email,
        actionUrl: '/admin/verify-signup-otp',
        resendUrl: '/admin/resend-signup-otp',
        dev_otp: storedData ? storedData.otp : null,
        title: 'Verify Admin Email'
    });
});

// Resend Signup OTP
router.get('/resend-signup-otp', async (req, res) => {
    if (!req.session || !req.session.pendingAdminSignup) {
        return res.redirect('/admin/signup');
    }
    const email = req.session.pendingAdminSignup.email;
    const otp = generateOtp();
    const expiresAt = Date.now() + 10 * 60 * 1000;
    adminOtpStore.set(email, { otp, expiresAt });

    try {
        await sendEmailOtp(email, 'Administrator', otp);
    } catch (err) {
        console.warn('Resend signup OTP email skipped:', err.message);
    }

    res.redirect('/admin/verify-signup-otp');
});

// Verify Signup OTP Action (Step 2)
router.post('/verify-signup-otp', async (req, res) => {
    if (!req.session || !req.session.pendingAdminSignup) {
        return res.redirect('/admin/signup');
    }

    const { email, password } = req.session.pendingAdminSignup;
    const { otp } = req.body;
    const storedData = adminOtpStore.get(email);

    if (!storedData || Date.now() > storedData.expiresAt || storedData.otp !== (otp || '').trim()) {
        return res.render('admin/verify_otp', {
            error: 'Invalid or expired 6-digit verification code.',
            email,
            actionUrl: '/admin/verify-signup-otp',
            resendUrl: '/admin/resend-signup-otp',
            dev_otp: storedData ? storedData.otp : null,
            title: 'Verify Admin Email'
        });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const admin = new Admin({ email, password: hashedPassword, role: 'admin' });
        await admin.save();

        adminOtpStore.delete(email);
        delete req.session.pendingAdminSignup;

        req.session.admin = admin.toObject();
        req.session.save((err) => {
            if (err) console.error('Session save error:', err);
            res.redirect('/admin/dashboard?welcome=true');
        });
    } catch (error) {
        res.render('admin/verify_otp', {
            error: 'Failed to create admin account: ' + error.message,
            email,
            actionUrl: '/admin/verify-signup-otp',
            resendUrl: '/admin/resend-signup-otp',
            dev_otp: null,
            title: 'Verify Admin Email'
        });
    }
});

// Logout
router.get('/logout', (req, res) => {
    req.session.destroy(() => {
        res.redirect('/admin/login');
    });
});

// ─── DASHBOARD ───────────────────────────────────────────────────────────────

router.get('/dashboard', protect, async (req, res) => {
    try {
        const [productCount, userCount, orders, products, users] = await Promise.all([
            Product.countDocuments(),
            User.countDocuments(),
            Order.find({}).populate('user', 'name email').sort({ createdAt: -1 }).lean(),
            Product.find({}).sort({ createdAt: -1 }).lean(),
            User.find({}).sort({ createdAt: -1 }).limit(5).lean()
        ]);

        const orderCount = orders.length;
        const totalSales = orders.reduce((sum, order) => sum + (order.totalPrice || 0), 0);

        // Low stock products (stock <= 10)
        const lowStockProducts = products.filter(p => (p.countInStock || 0) <= 10).slice(0, 5);

        // 7-day Sales aggregation for Chart.js
        const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        const last7Days = [];
        const chartLabels = [];
        const chartValues = [];

        for (let i = 6; i >= 0; i--) {
            const d = new Date();
            d.setDate(d.getDate() - i);
            d.setHours(0, 0, 0, 0);
            const nextD = new Date(d);
            nextD.setDate(d.getDate() + 1);

            const daySales = orders
                .filter(o => {
                    const oDate = new Date(o.createdAt);
                    return oDate >= d && oDate < nextD;
                })
                .reduce((sum, o) => sum + (o.totalPrice || 0), 0);

            chartLabels.push(`${dayNames[d.getDay()]} (${d.getDate()}/${d.getMonth() + 1})`);
            chartValues.push(daySales);
        }

        // Recent 5 orders
        const recentOrders = orders.slice(0, 5);

        res.render('admin/dashboard', {
            admin: req.session.admin,
            productCount,
            userCount,
            orderCount,
            totalSales,
            recentOrders,
            lowStockProducts,
            recentUsers: users,
            chartLabels: JSON.stringify(chartLabels),
            chartValues: JSON.stringify(chartValues),
            path: '/dashboard',
            title: 'Dashboard Overview',
            success: req.query.welcome ? 'Welcome to Alight International Admin Portal!' : null
        });
    } catch (error) {
        console.error('Error fetching dashboard stats:', error);
        res.render('admin/dashboard', {
            admin: req.session.admin,
            productCount: 0,
            userCount: 0,
            orderCount: 0,
            totalSales: 0,
            recentOrders: [],
            lowStockProducts: [],
            recentUsers: [],
            chartLabels: JSON.stringify(['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']),
            chartValues: JSON.stringify([0, 0, 0, 0, 0, 0, 0]),
            path: '/dashboard',
            title: 'Dashboard Overview',
            success: null
        });
    }
});

// ─── PRODUCTS MANAGEMENT ────────────────────────────────────────────────────

// List Products (with Search & Category/Stock Filtering)
router.get('/products', protect, async (req, res) => {
    try {
        const { q, category, stock, success } = req.query;
        let query = {};

        if (q && q.trim()) {
            const regex = new RegExp(q.trim(), 'i');
            query.$or = [
                { name: regex },
                { description: regex },
                { material: regex },
                { category: regex },
                { subCategory: regex }
            ];
        }

        if (category && category !== 'all') {
            query.category = category;
        }

        if (stock === 'in_stock') {
            query.countInStock = { $gt: 10 };
        } else if (stock === 'low_stock') {
            query.countInStock = { $gt: 0, $lte: 10 };
        } else if (stock === 'out_of_stock') {
            query.countInStock = { $lte: 0 };
        }

        const products = await Product.find(query).sort({ createdAt: -1 }).lean();
        const totalCount = await Product.countDocuments();

        res.render('admin/products', {
            products,
            totalCount,
            currentQuery: q || '',
            currentCategory: category || 'all',
            currentStock: stock || 'all',
            path: '/products',
            admin: req.session.admin,
            title: 'Product Catalog Management',
            success: success || null
        });
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).send('Server Error fetching products');
    }
});

// Export Products as CSV
router.get('/products/export', protect, async (req, res) => {
    try {
        const products = await Product.find({}).sort({ createdAt: -1 }).lean();
        let csv = 'ID,Name,Category,SubCategory,Price,OriginalPrice,Discount,Stock,Material,Dimensions,CountryOfOrigin\n';
        for (let p of products) {
            const safeName = `"${(p.name || '').replace(/"/g, '""')}"`;
            const safeCat = `"${(p.category || '').replace(/"/g, '""')}"`;
            const safeSub = `"${(p.subCategory || '').replace(/"/g, '""')}"`;
            const safeMat = `"${(p.material || '').replace(/"/g, '""')}"`;
            const safeDim = `"${(p.dimensions || '').replace(/"/g, '""')}"`;
            csv += `${p._id},${safeName},${safeCat},${safeSub},${p.price},${p.originalPrice || 0},${p.discount || ''},${p.countInStock || 0},${safeMat},${safeDim},${p.countryOfOrigin || 'India'}\n`;
        }
        res.setHeader('Content-Type', 'text/csv');
        res.setHeader('Content-Disposition', `attachment; filename=products-inventory-${Date.now()}.csv`);
        res.send(csv);
    } catch (err) {
        res.status(500).send('Error generating export');
    }
});

// Add Product Form
router.get('/products/add', protect, (req, res) => {
    res.render('admin/add_product', {
        path: '/products',
        admin: req.session.admin,
        success: req.query.success === 'true',
        error: req.query.error || null,
        title: 'Add New Product'
    });
});

// Add Product Action
router.post('/products/add', protect, upload.array('images', 10), async (req, res) => {
    const {
        name, price, originalPrice, discount, description, category, subCategory, countInStock,
        material, dimensions, components, ecoFeatures, countryOfOrigin, artisanImageUrl
    } = req.body;

    let finalImages = [];

    // Parse image URLs from textarea
    if (req.body.imageUrls) {
        const urls = req.body.imageUrls.split('\n').map(u => parseImageUrl(u)).filter(Boolean);
        finalImages.push(...urls);
    }

    // Process uploaded file buffers
    if (req.files && req.files.length > 0) {
        const savedUploadedUrls = saveUploadedFiles(req.files);
        finalImages.push(...savedUploadedUrls);
    }

    // Default placeholder if no image provided
    let mainImage = finalImages.length > 0 ? finalImages[0] : '/images/placeholder.jpg';

    try {
        if (!name || !price || !category) {
            return res.redirect('/admin/products/add?error=' + encodeURIComponent('Product name, category, and selling price are required.'));
        }

        const numPrice = parseFloat(price) || 0;
        const numOriginalPrice = parseFloat(originalPrice) || 0;
        const numStock = parseInt(countInStock, 10) || 0;

        let autoDiscount = discount;
        if (!autoDiscount && numOriginalPrice > numPrice) {
            const pct = Math.round(((numOriginalPrice - numPrice) / numOriginalPrice) * 100);
            autoDiscount = `${pct}% OFF`;
        }

        const product = new Product({
            name: name.trim(),
            price: numPrice,
            originalPrice: numOriginalPrice,
            discount: autoDiscount || '',
            description: (description || '').trim(),
            image: mainImage,
            images: finalImages.length > 0 ? finalImages : [mainImage],
            category,
            subCategory: subCategory || '',
            countInStock: numStock,
            material: (material || '').trim(),
            dimensions: (dimensions || '').trim(),
            components: (components || '').trim(),
            ecoFeatures: (ecoFeatures || '').trim(),
            countryOfOrigin: (countryOfOrigin || 'India').trim(),
            artisanImage: artisanImageUrl ? parseImageUrl(artisanImageUrl) : '',
        });

        await product.save();
        res.redirect('/admin/products?success=' + encodeURIComponent(`Product "${product.name}" created successfully!`));
    } catch (error) {
        console.error("Product Add Error:", error);
        res.redirect('/admin/products/add?error=' + encodeURIComponent(error.message));
    }
});

// Edit Product Form
router.get('/products/edit/:id', protect, async (req, res) => {
    try {
        const product = await Product.findById(req.params.id).lean();
        if (product) {
            res.render('admin/edit_product', {
                product,
                path: '/products',
                admin: req.session.admin,
                title: `Edit: ${product.name}`,
                error: req.query.error || null
            });
        } else {
            res.redirect('/admin/products?error=' + encodeURIComponent('Product not found'));
        }
    } catch (error) {
        res.redirect('/admin/products?error=' + encodeURIComponent('Invalid product ID'));
    }
});

// Edit Product Action
router.post('/products/edit/:id', protect, upload.array('images', 10), async (req, res) => {
    const {
        name, description, price, originalPrice, discount, category, subCategory, countInStock,
        material, dimensions, components, ecoFeatures, countryOfOrigin, artisanImageUrl,
        existingImagesToKeep
    } = req.body;

    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.redirect('/admin/products?error=' + encodeURIComponent('Product not found'));
        }

        let finalImages = [];

        // Retain selected existing images
        if (existingImagesToKeep) {
            if (Array.isArray(existingImagesToKeep)) {
                finalImages.push(...existingImagesToKeep.filter(Boolean));
            } else if (typeof existingImagesToKeep === 'string') {
                finalImages.push(existingImagesToKeep);
            }
        } else if (req.body.clearGallery !== 'true') {
            finalImages = [...(product.images || [])];
        }

        // Add newly entered image URLs
        if (req.body.imageUrls) {
            const urls = req.body.imageUrls.split('\n').map(u => parseImageUrl(u)).filter(Boolean);
            finalImages.push(...urls);
        }

        // Add newly uploaded files
        if (req.files && req.files.length > 0) {
            const savedUploadedUrls = saveUploadedFiles(req.files);
            finalImages.push(...savedUploadedUrls);
        }

        const numPrice = parseFloat(price) || 0;
        const numOriginalPrice = parseFloat(originalPrice) || 0;
        const numStock = parseInt(countInStock, 10) || 0;

        let autoDiscount = discount;
        if (!autoDiscount && numOriginalPrice > numPrice) {
            const pct = Math.round(((numOriginalPrice - numPrice) / numOriginalPrice) * 100);
            autoDiscount = `${pct}% OFF`;
        }

        product.name = (name || '').trim();
        product.description = (description || '').trim();
        product.price = numPrice;
        product.originalPrice = numOriginalPrice;
        product.discount = autoDiscount || '';
        product.category = category;
        product.subCategory = subCategory || '';
        product.countInStock = numStock;
        product.material = (material || '').trim();
        product.dimensions = (dimensions || '').trim();
        product.components = (components || '').trim();
        product.ecoFeatures = (ecoFeatures || '').trim();
        product.countryOfOrigin = (countryOfOrigin || 'India').trim();

        if (artisanImageUrl) {
            product.artisanImage = parseImageUrl(artisanImageUrl);
        }

        if (finalImages.length > 0) {
            product.images = finalImages;
            product.image = finalImages[0];
        }

        await product.save();
        res.redirect('/admin/products?success=' + encodeURIComponent(`Product "${product.name}" updated successfully!`));
    } catch (error) {
        console.error("Product Edit Error:", error);
        res.redirect(`/admin/products/edit/${req.params.id}?error=` + encodeURIComponent(error.message));
    }
});

// Delete Product
router.get('/products/delete/:id', protect, async (req, res) => {
    try {
        const deleted = await Product.findByIdAndDelete(req.params.id);
        const name = deleted ? deleted.name : 'Product';
        res.redirect('/admin/products?success=' + encodeURIComponent(`"${name}" deleted successfully.`));
    } catch (error) {
        res.redirect('/admin/products?error=' + encodeURIComponent('Error deleting product'));
    }
});

router.post('/products/delete/:id', protect, async (req, res) => {
    try {
        const deleted = await Product.findByIdAndDelete(req.params.id);
        const name = deleted ? deleted.name : 'Product';
        res.redirect('/admin/products?success=' + encodeURIComponent(`"${name}" deleted successfully.`));
    } catch (error) {
        res.redirect('/admin/products?error=' + encodeURIComponent('Error deleting product'));
    }
});

// ─── ORDERS MANAGEMENT ──────────────────────────────────────────────────────

// List Orders
router.get('/orders', protect, async (req, res) => {
    try {
        const { status, q, success, error } = req.query;
        let query = {};

        if (status && status !== 'all') {
            query.status = status;
        }

        let orders = await Order.find(query)
            .populate('user', 'name email mobile')
            .sort({ createdAt: -1 })
            .lean();

        // Search query filter
        if (q && q.trim()) {
            const term = q.trim().toLowerCase();
            orders = orders.filter(o => {
                const idStr = o._id.toString().toLowerCase();
                const userName = (o.user?.name || '').toLowerCase();
                const userEmail = (o.user?.email || '').toLowerCase();
                const city = (o.shippingAddress?.city || '').toLowerCase();
                return idStr.includes(term) || userName.includes(term) || userEmail.includes(term) || city.includes(term);
            });
        }

        // Get status counts for filter tabs
        const allOrders = await Order.find({}).lean();
        const counts = {
            all: allOrders.length,
            Processing: allOrders.filter(o => o.status === 'Processing').length,
            Shipped: allOrders.filter(o => o.status === 'Shipped').length,
            Delivered: allOrders.filter(o => o.status === 'Delivered').length,
            Cancelled: allOrders.filter(o => o.status === 'Cancelled').length,
        };

        res.render('admin/orders', {
            path: '/orders',
            admin: req.session.admin,
            orders,
            counts,
            currentStatus: status || 'all',
            currentQuery: q || '',
            title: 'Order Fulfillment & Management',
            success: success || null,
            error: error || null
        });
    } catch (error) {
        console.error('Error fetching orders:', error);
        res.status(500).send('Server Error fetching orders');
    }
});

// Update Order Status
router.post('/orders/:id/status', protect, async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        if (order) {
            const oldStatus = order.status;
            order.status = req.body.status;
            if (req.body.status === 'Delivered' && !order.isDelivered) {
                order.isDelivered = true;
                order.deliveredAt = Date.now();
            } else if (req.body.status !== 'Delivered') {
                order.isDelivered = false;
            }
            await order.save();
            res.redirect('/admin/orders?success=' + encodeURIComponent(`Order #${order._id.toString().substring(18)} status updated to ${order.status}`));
        } else {
            res.redirect('/admin/orders?error=' + encodeURIComponent('Order not found'));
        }
    } catch (error) {
        console.error('Error updating order:', error);
        res.redirect('/admin/orders?error=' + encodeURIComponent('Error updating order status'));
    }
});

// Export Orders as CSV
router.get('/orders/export', protect, async (req, res) => {
    try {
        const orders = await Order.find({}).populate('user', 'name email mobile').sort({ createdAt: -1 }).lean();
        let csv = 'OrderID,CustomerName,CustomerEmail,CustomerMobile,ItemsCount,TotalAmount,PaymentMethod,IsPaid,Status,City,Country,Date\n';
        for (let o of orders) {
            const safeName = `"${(o.user?.name || 'Guest').replace(/"/g, '""')}"`;
            const safeEmail = `"${(o.user?.email || '').replace(/"/g, '""')}"`;
            const safeMobile = `"${(o.user?.mobile || '').replace(/"/g, '""')}"`;
            const safeCity = `"${(o.shippingAddress?.city || '').replace(/"/g, '""')}"`;
            const safeCountry = `"${(o.shippingAddress?.country || '').replace(/"/g, '""')}"`;
            const itemsCount = (o.orderItems || []).reduce((acc, it) => acc + (it.qty || 1), 0);
            const dateStr = new Date(o.createdAt).toISOString();
            csv += `${o._id},${safeName},${safeEmail},${safeMobile},${itemsCount},${o.totalPrice},${o.paymentMethod},${o.isPaid ? 'Yes' : 'No'},${o.status},${safeCity},${safeCountry},${dateStr}\n`;
        }
        res.setHeader('Content-Type', 'text/csv');
        res.setHeader('Content-Disposition', `attachment; filename=orders-report-${Date.now()}.csv`);
        res.send(csv);
    } catch (err) {
        res.status(500).send('Error generating export');
    }
});

// ─── USERS MANAGEMENT ───────────────────────────────────────────────────────

// List Users
router.get('/users', protect, async (req, res) => {
    try {
        const { q, success, error } = req.query;
        let query = {};

        if (q && q.trim()) {
            const regex = new RegExp(q.trim(), 'i');
            query.$or = [
                { name: regex },
                { email: regex },
                { mobile: regex },
                { role: regex }
            ];
        }

        const users = await User.find(query).sort({ createdAt: -1 }).lean();

        // Calculate order count for each user
        const orders = await Order.find({}).lean();
        const usersWithOrders = users.map(u => {
            const userOrders = orders.filter(o => o.user && o.user.toString() === u._id.toString());
            const totalSpent = userOrders.reduce((sum, o) => sum + (o.totalPrice || 0), 0);
            return {
                ...u,
                orderCount: userOrders.length,
                totalSpent
            };
        });

        const totalUsers = await User.countDocuments();
        const verifiedCount = await User.countDocuments({ isMobileVerified: true });

        res.render('admin/users', {
            path: '/users',
            admin: req.session.admin,
            users: usersWithOrders,
            totalUsers,
            verifiedCount,
            currentQuery: q || '',
            title: 'Customer Accounts & Profiles',
            success: success || null,
            error: error || null
        });
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).send('Server Error fetching users');
    }
});

// ─── SETTINGS & PROFILE ─────────────────────────────────────────────────────

// Settings Page
router.get('/settings', protect, async (req, res) => {
    try {
        const adminDoc = await Admin.findOne({ email: req.session.admin.email }).lean();
        const totalAdmins = await Admin.countDocuments();
        const productCount = await Product.countDocuments();
        const orderCount = await Order.countDocuments();
        const userCount = await User.countDocuments();

        res.render('admin/settings', {
            path: '/settings',
            admin: req.session.admin,
            adminDoc: adminDoc || req.session.admin,
            totalAdmins,
            productCount,
            orderCount,
            userCount,
            title: 'Admin Settings & Security',
            success: req.query.success || null,
            error: req.query.error || null
        });
    } catch (error) {
        console.error('Settings error:', error);
        res.status(500).send('Server Error loading settings');
    }
});

// Change Password Action
router.post('/settings/change-password', protect, async (req, res) => {
    const { currentPassword, newPassword, confirmPassword } = req.body;
    try {
        if (!currentPassword || !newPassword || !confirmPassword) {
            return res.redirect('/admin/settings?error=' + encodeURIComponent('All password fields are required.'));
        }

        if (newPassword !== confirmPassword) {
            return res.redirect('/admin/settings?error=' + encodeURIComponent('New passwords do not match.'));
        }

        if (newPassword.length < 6) {
            return res.redirect('/admin/settings?error=' + encodeURIComponent('Password must be at least 6 characters long.'));
        }

        const admin = await Admin.findById(req.session.admin._id || req.session.admin.id) || await Admin.findOne({ email: req.session.admin.email });
        if (!admin) {
            return res.redirect('/admin/settings?error=' + encodeURIComponent('Admin account not found.'));
        }

        const isMatch = await bcrypt.compare(currentPassword, admin.password);
        if (!isMatch) {
            return res.redirect('/admin/settings?error=' + encodeURIComponent('Current password is incorrect.'));
        }

        admin.password = await bcrypt.hash(newPassword, 10);
        await admin.save();

        res.redirect('/admin/settings?success=' + encodeURIComponent('Password changed successfully!'));
    } catch (error) {
        console.error('Change password error:', error);
        res.redirect('/admin/settings?error=' + encodeURIComponent(error.message));
    }
});

export default router;
