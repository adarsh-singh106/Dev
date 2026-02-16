import { Request, Response, NextFunction } from "express"; // ✅ Fixed: Capital 'R' for Response
import jwt from 'jsonwebtoken';
import User, { IUser } from "@/models/User.js";

// Extend the Express Request interface
export interface AuthRequest extends Request {
    user?: IUser;
}

export const protect = async (req: AuthRequest, res: Response, next: NextFunction) => {
    let token;

    // 1. Check if header exists and starts with Bearer
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        try {
            // 2. Extract token
            token = req.headers.authorization.split(' ')[1];

            // 3. Verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { id: string };

            // 4. Find user in DB
            // We use 'as IUser' to tell TS that if found, this is our User type
            // The select('-password') ensures we don't carry the hash around
            const user = await User.findById(decoded.id).select('-password');

            // 5. Check if user exists (e.g., maybe they deleted their account but still have a token)
            if (!user) {
                // 🛑 RETURN here to stop execution
                return res.status(401).json({
                    success: false,
                    message: "User not found"
                });
            }

            // 6. Attach user to request
            // We use 'as IUser' here if needed, but usually Mongoose types align well if setup correctly
            req.user = user as IUser; 

            // 7. Move to controller
            next();

        } catch (error) {
            // Token failed verification (expired or manipulated)
            return res.status(401).json({
                success: false,
                message: "Not authorized, token failed"
            });
        }
    }

    // 8. Handle case where no token was found AT ALL
    // This runs if the 'if' block at the top was skipped
    if (!token) {
        return res.status(401).json({
            success: false,
            message: "Not authorized, no token"
        });
    }
};