import app from './app.js';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
dotenv.config();

const PORT = process.env.PORT || 5000;
connectDB();

const startServer = async () => {
  try {
    // TODO: Connect to DB here (e.g., mongoose.connect...)
    
    app.listen(PORT, () => {
      console.log(`✅ Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('❌ Error starting server:', error);
    process.exit(1);
  }
};

startServer();