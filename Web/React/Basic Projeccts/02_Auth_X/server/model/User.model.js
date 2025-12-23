const mongoose = require('mongoose');
const bcrypt = require('bcryptjs'); // Improvement: Use bcryptjs (or bcrypt)

const UserSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: [true, "Please add a First Name"],
            trim: true,
            maxlength: [50, "Name cannot be more than 50 characters"]
        },
        lastName: {
            type: String,
            required: [true, "Please add a Last Name"],
            trim: true,
            maxlength: [50, "Name cannot be more than 50 characters"]
        },
        email: {
            type: String,
            required: [true, "Please add an email"],
            unique: true,
            trim: true,
            lowercase: true, // Key for normalization
            match: [
                /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                "Please add a valid email",
            ],
        },
        password: {
            type: String,
            required: [true, "Please add a password"],
            minlength: [8, "Password must be at least 8 characters"],
            maxlength:[16,"Password must be less than or equal to 16 charaters"],
            select: false, // Security: Don't return password in queries by default
        },
        isVerified: {
            type: Boolean,
            default: false, // Improvement: Default to false instead of required
        },
        verifyToken: {
            type: String,
        },
    },
    {
        timestamps: true,
    }
);

// Encrypt password using bcrypt
// --- Password Encryption Hook ---
UserSchema.pre('save', async function () {
  // Note: Yahan function bracket () mein 'next' mat likhna
  
  // Agar password modify nahi hua hai, to kuch mat karo, bas return ho jao
  if (!this.isModified('password')) {
    return;
  }

  // Agar naya password hai, to hash karo
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  
  // End mein 'next()' likhne ki zaroorat nahi hai. 
  // Function khatam hote hi Mongoose samajh jayega ki aage badhna hai.
});

// Helper method to match user password to hashed password in database
UserSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', UserSchema);