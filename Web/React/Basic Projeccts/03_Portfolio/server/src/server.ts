import app from './app.js';
import dotenv from 'dotenv';
import connectDB from './config/db.js';

// 1. Config logic first
dotenv.config();

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    // 2. Connect to DB *before* listening
    // We await it so if it fails, we catch the error immediately
    await connectDB(); 
    
    // 3. Start listening only after DB is ready
    app.listen(PORT, () => {
      console.log(`✅ Server running on http://localhost:${PORT}`);
    });

  } catch (error) {
    console.error('❌ Error starting server:', error);
    process.exit(1); // Stop the process if DB fails
  }
};

startServer();