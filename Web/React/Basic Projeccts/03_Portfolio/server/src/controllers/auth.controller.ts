import { Request, Response } from "express";
import authService from "../services/auth.service.js"; // Relative path
import User, { IUser } from "../models/User.js"; // Relative path
import { AuthRequest } from "../middleware/auth.middleware.js"; // Relative path

// Helper Function
const sendTokenResponse = (user: IUser, statusCode: number, res: Response) => {
    const token = user.getSignedJwtToken();

    res.status(statusCode).json({
        success: true,
        token,
        data: {
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
        }
    });
};

// ... Register and Login (Keep them as they are) ...

export const register = async (req: Request, res: Response) => {
    try {
        const user = await authService.register(req.body);
        sendTokenResponse(user, 201, res);
    } catch (error) {
        res.status(400).json({
            success: false,
            message: (error as Error).message
        });
    }
};

export const login = async (req: Request, res: Response) => {
    try {
        const user = await authService.login(req.body);
        sendTokenResponse(user, 200, res);
    } catch (error) {
        res.status(401).json({
            success: false,
            message: (error as Error).message
        });
    }
};

// ==========================================
// 1. Get Current User (With Error Handling)
// ==========================================
export const getMe = async (req: AuthRequest, res: Response) => {
    try {
        // req.user is guaranteed by middleware, but DB could fail
        const user = await User.findById(req.user!._id);

        res.status(200).json({
            success: true,
            data: user
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
};

// ==========================================
// 2. Update Details (With Error Handling)
// ==========================================
export const updateDetails = async (req: AuthRequest, res: Response) => {
    try {
        const fieldsToUpdate = {
            name: req.body.name,
            email: req.body.email
        };

        const user = await User.findByIdAndUpdate(req.user!._id, fieldsToUpdate, {
            new: true,
            runValidators: true
        });

        res.status(200).json({
            success: true,
            data: user
        });
    } catch (error) {
        // This catches "Email already exists" or "Validation failed"
        res.status(400).json({
            success: false,
            message: (error as Error).message
        });
    }
};