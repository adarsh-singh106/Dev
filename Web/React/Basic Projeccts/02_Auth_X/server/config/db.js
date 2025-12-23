const mongoose = require('mongoose');


const connectDB = async () => {
  try {
    // MongoDB se connect karne ki koshish (Promise return karta hai isliye await)
    const conn = await mongoose.connect(process.env.MONGO_URI);

    // Agar connect ho gaya to terminal me batao (Host ka naam bhi print hoga)
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    // Agar koi dikkat aayi to error print karo
    console.log(`Error: ${error.message}`);
    
    // Process ko band kar do (Exit with failure code 1)
    process.exit(1);
  }
};

module.exports = connectDB;