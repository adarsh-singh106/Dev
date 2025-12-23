const errorHandler = (err, req, res, next) => {
  // Agar status code pehle se set hai (jaise 400 or 401) to wahi use karo,
  // nahi to default 500 (Server Error) maan lo.
  const statusCode = res.statusCode ? res.statusCode : 500;

  res.status(statusCode);

  // Frontend ko JSON response bhejo
  res.json({
    message: err.message, // Error ka main message
    // Stack trace sirf development mode me dikhao, production me chhupa do (Security ke liye)
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
};

module.exports = {
  errorHandler,
};