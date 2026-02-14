import { Request, Response } from "express";
import authService from "../services/auth.service.js"; // Changed to relative path for safety

export const register = async (req: Request, res: Response) => {
    try {
        // 1. Try registering
        const user = await authService.register(req.body);

        // 2. Send success response (201 Created)
        res.status(201).json({
            success: true,
            data: {
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                token: "TODO_JWT_TOKEN" // Placeholder for now
            }
        });

    } catch (error) {
        // 3. Handle Errors (400 Bad Request)
        res.status(400).json({
            success: false,
            message: (error as Error).message
        });
    }
}

export const login = async (req: Request, res: Response) => {
    try {
        // 1. Try Login
        const user = await authService.login(req.body);

        // 2. Send success response (200 OK)
        res.status(200).json({
            success: true,
            data: {
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                token: "TODO_JWT_TOKEN"
            }
        });

    } catch (error) {
        // 3. Handle Errors (401 Unauthorized)
        res.status(401).json({
            success: false,
            message: (error as Error).message
        });
    }
}