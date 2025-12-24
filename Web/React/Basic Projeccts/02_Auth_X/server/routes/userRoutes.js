const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
// Controller functions ko import kar rahe hain jo humne abhi banaye the
const {
  registerUser,
  loginUser,
  verifyUserEmail,
} = require('../controllers/User.controller'); 
// (Make sure filename wahi ho jo aapne banaya hai, e.g., authController ya userController)

// --- Routes Definition ---

// 1. Register Route
// URL: POST /api/users/
router.post('/register', registerUser);

// 2. Login Route
// URL: POST /api/users/login
router.post('/login', loginUser);

// 3. Email Verify Route
// URL: POST /api/users/verify
// Frontend se jab token aayega to ye hit hoga
router.post('/verify', verifyUserEmail);

// Ab ye route sirf logged-in user hi access kar payega
// router.get('/profile', protect, getUserProfile); 

// Router ko export karo taaki server.js me use kar sakein
module.exports = router;