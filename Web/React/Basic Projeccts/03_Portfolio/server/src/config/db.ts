import mongoose from 'mongoose';

// 1. Explicit return type (Promise<void>)
const connectDB = async (): Promise<void> => {
    try {
        const connString = process.env.MONGO_URI;
        
        // This check is excellent! kept it.
        if (!connString) {
            throw new Error("MONGO_URI is missing in .env file");
        }

        const conn = await mongoose.connect(connString);

        console.log(`✅ Database connected: ${conn.connection.host}`);
        
    } catch (error) {
        // 2. Professional Error Logging
        // We cast 'error' to Error type to safely access .message
        console.error(`❌ Database Connection Error: ${(error as Error).message}`);

        process.exit(1);
    }
}

export default connectDB;