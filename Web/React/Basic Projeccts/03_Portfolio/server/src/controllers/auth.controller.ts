import { Request, Response } from "express";
import authService from "../services/auth.service.js"; // Changed to relative path for safety
import { IUser } from "@/models/User.js";

// Helper Function to send Tokenised Response
const sendTokenResponse = (user:IUser , statusCode:number , res:Response) => {
    // 1. get signed toke for user -> 'user'
    const token = user.getSignedJwtToken();

    // 2. Send response with the token
    res.status(statusCode).json(
        {
            success:true,
            token, // send signed token
            data:{
                _id:user._id,
                name:user.name,
                email:user.email,
                role:user.role,
            }
        }
    )
}


export const register = async (req: Request, res: Response) => {
    try {
        // 1. Try registering
        const user = await authService.register(req.body);
        
        // 2. Send success response (201 Created)
        sendTokenResponse(user,201,res);

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
        sendTokenResponse(user,200,res);


    } catch (error) {
        // 3. Handle Errors (401 Unauthorized)
        res.status(401).json({
            success: false,
            message: (error as Error).message
        });
    }
}