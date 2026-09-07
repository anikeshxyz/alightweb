import mongoose from 'mongoose';

const connectDB = async (retries = 3) => {
    const uri = process.env.MONGODB_URI;
    console.log("Attempting to connect to MongoDB...", uri?.split('@')[1] || "Local/Unknown");

    for (let attempt = 1; attempt <= retries; attempt++) {
        try {
            const conn = await mongoose.connect(uri, {
                serverSelectionTimeoutMS: 15000,
                socketTimeoutMS: 45000,
            });
            console.log(`MongoDB Connected: ${conn.connection.host}`);
            return conn;
        } catch (error) {
            console.error(`MongoDB Connection Error (Attempt ${attempt}/${retries}): ${error.message}`);
            if (attempt < retries) {
                console.log(`Retrying connection in 2 seconds...`);
                await new Promise(r => setTimeout(r, 2000));
            }
        }
    }
};

export default connectDB;
