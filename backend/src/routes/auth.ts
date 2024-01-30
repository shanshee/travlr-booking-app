// Programmer: Londelle Sheehan
// Contact Info: shansheehan@gmail.com
// Date: January 29, 2024
// Version: 1.0
// Purpose: Define routes for user authentication (login, logout) and token validation

import express, { Request, Response } from "express";
import { check, validationResult } from "express-validator";
import User from "../models/users"; // Import User model
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import verifyToken from "../middleware/auth"; // Import token verification middleware

const router = express.Router();

// Route for user login
router.post(
  "/login",
  [
    // Validate email and password
    check("email", "Email is required").isEmail(),
    check("password", "Password with 6 or more characters required").isLength({
      min: 6,
    }),
  ],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.array() });
    }

    const { email, password } = req.body;

    try {
      // Find user by email
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: "Invalid Credentials" });
      }

      // Compare passwords
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: "Invalid Credentials" });
      }

      // Generate JWT token
      const token = jwt.sign(
        { userId: user },
        process.env.JWT_SECRET_KEY as string,
        {
          expiresIn: "1d",
        }
      );

      // Set token as cookie
      res.cookie("auth_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 86400000, // 1 day in milliseconds
      });

      // Send user ID in response
      res.status(200).json({ userId: user._id });

    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Something went wrong" });
    }
  }
);

// Route to validate token
router.get("/validate-token", verifyToken, (req: Request, res: Response) => {
  res.status(200).send({ userId: req.userId });
});

// Route for user logout
router.post("/logout", (req: Request, res: Response) => {
  // Clear auth_token cookie
  res.cookie("auth_token", "", {
    expires: new Date(0),
  });
  res.send(); // Send empty response
});

export default router;
