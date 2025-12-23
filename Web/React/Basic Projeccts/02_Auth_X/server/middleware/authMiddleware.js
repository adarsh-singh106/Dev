const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const User = require('../model/User.model');

const protect = asyncHandler(async (req, res, next) => {
  let token;

  // Check karo agar header me token hai aur "Bearer" se start hota hai
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // Token nikaalo ("Bearer <token>" string me se)
      token = req.headers.authorization.split(' ')[1];

      // Token verify karo
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Token se User ID nikal kar DB me find karo (password mat lana)
      req.user = await User.findById(decoded.id).select('-password');

      // Sab sahi hai, aage badho
      next();
    } catch (error) {
      console.error(error);
      res.status(401);
      throw new Error('Not authorized, token failed');
    }
  }

  if (!token) {
    res.status(401);
    throw new Error('Not authorized, no token');
  }
});

module.exports = { protect };