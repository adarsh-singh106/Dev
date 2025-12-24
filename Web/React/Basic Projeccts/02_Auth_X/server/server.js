const express = require('express');
const dotenv = require('dotenv');
const rateLimit = require('express-rate-limit');
const connectDB = require('./config/db'); // Database import
const { errorHandler } = require('./middleware/errorMiddleware'); // Error handler import
const cors = require('cors')

// 1. Config Load karo
dotenv.config();

// 2. Database Connect karo
connectDB();

// 3. App Initialize karo (Ye sabse pehle hona chahiye middlewares se)
const app = express();

// IMP:  Allow Cross-Origin Requests (MUST BE AT THE TOP)
app.use(cors()); // <--- NEW: This allows your frontend to talk to the backend

// 4. Rate Limiter Setup
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: "Too many requests from this IP, please try again after 15 minutes"
});

// --- MIDDLEWARES ---

// A. Rate Limiter Lagao
app.use(limiter);

// B. JSON Body Parser (Iske bina req.body undefined rahega - IMPORTANT)
app.use(express.json()); 
app.use(express.urlencoded({ extended: false }));

// --- ROUTES ---
app.use('/api/users', require('./routes/userRoutes'));

// --- ERROR HANDLING ---
// (Routes ke baad aana chahiye)
app.use(errorHandler);

// --- SERVER LISTEN ---
const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Server is Running on PORT: ${port}`);
});