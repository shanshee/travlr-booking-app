// Programmer: Londelle Sheehan
// Contact Info: shansheehan@gmail.com
// Date: January 29, 2024
// Version: 1.0
// Purpose: Middleware to verify JWT token for user authentication

import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from 'jsonwebtoken';

// Extend Express's Request interface to include userId property
declare global {
    namespace Express {
        interface Request {
            userId: string;
        }
    }
};

// Middleware function to verify JWT token
const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    // Extract token from cookies
    const token = req.cookies["auth_token"];
    // If token doesn't exist, return unauthorized status
    if(!token) {
        return res.status(401).json({message: "unauthorized"});
    }

    try {
        // Verify token using JWT_SECRET_KEY
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY as string);
        // Extract userId from decoded JWT payload and attach to request object
        req.userId = (decoded as JwtPayload).userId;
        // Move to the next middleware/controller
        next();
    } catch(error){
        // If token verification fails, return unauthorized status
        return res.status(401).json({message: "unauthorized"});
    }
};

export default verifyToken;
