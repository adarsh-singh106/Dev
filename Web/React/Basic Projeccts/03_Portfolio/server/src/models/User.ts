import mongoose, { Document, Schema, Model } from "mongoose";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';

// ================================================================
// 1. THE INTERFACE (Compile-Time Only)
// acts as a contract for the CODER. It provides autocomplete (IntelliSense) 
// and ensures you don't misspell properties. It disappears after compilation.
// ================================================================
export interface IUser extends Document {
    name: string;
    email: string;
    password: string; // Not optional here because the DB *will* have it, even if we select: false later
    role: 'user' | 'admin';
    createdAt: Date;
    
    // Method Definition: Tells TS that this function exists on every User document
    getSignedJwtToken: () => string;
    matchpassword: (enteredPassword: string) => Promise<boolean>;
}

// ================================================================
// 2. THE SCHEMA (Runtime / Database Validation)
// This is the "Bouncer". It validates data BEFORE it touches MongoDB.
// ================================================================
const UserSchema: Schema<IUser> = new Schema(
    {
        name: {
            type: String,
            required: [true, 'Please add a name']
        },
        email: {
            type: String,
            required: [true, 'Please add an email'],
            unique: true,
            // Regex for email validation
            match: [
                /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                'Please add a valid email',
            ],
        },
        password: {
            type: String,
            required: [true, 'Please add a Password'],
            minlength: 6,
            select: false, // Security: Never return the password in queries unless explicitly asked
        },
        role: {
            type: String,
            enum: ['user', 'admin'],
            default: 'user',
        },
    },
    {
        timestamps: true, // Auto-manage createdAt and updatedAt
    }
);

// ================================================================
// 3. SECURITY METHODS (Smart Model Logic)
// We keep logic here so the Controller stays clean ("Fat Model, Skinny Controller")
// ================================================================

// A. Encrypt password using bcrypt
// Trigger: Runs automatically BEFORE .save() or .create()
// WARNING: This does NOT run on .updateOne() or .findOneAndUpdate()!
UserSchema.pre('save', async function (this: IUser) {
    
    // Defensive: Only hash the password if it's new or has been modified.
    // If we are just updating the 'name', we don't want to re-hash the hash!
    if (!this.isModified('password')) {
        return;
    }

    // 10 rounds is the 2026 standard for speed vs security balance
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

// B. Instance Method to compare passwords
// Usage: await user.matchpassword(req.body.password)
UserSchema.methods.matchpassword = async function (enteredPassword: string): Promise<boolean> {
    // 'this.password' refers to the hashed password stored in the DB
    return await bcrypt.compare(enteredPassword, this.password);
};

// C. Instance Method to Genrate JWT Token
UserSchema.methods.getSignedJwtToken = function (): string {
    const secret = process.env.JWT_SECRET;
    if (!secret) {
        throw new Error("JWT_SECRET is not defined in .env file");
    }

    return jwt.sign(
        { id: this._id },
        secret,
        {
            expiresIn: process.env.JWT_EXPIRE || '30d',
        } as jwt.SignOptions
    );
};

export default mongoose.model<IUser>('User', UserSchema);