// Programmer: Londelle Sheehan
// Contact Info: shansheehan@gmail.com
// Date: January 30, 2024
// Version: 1.1
// Purpose: Setup Express server with middleware and routes for user authentication and registration

import express, { Request, Response } from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
import userRoutes from "./routes/users"; // Import user routes
import authRoutes from "./routes/auth"; // Import authentication routes
import cookieParser from "cookie-parser";
import path from "path";
import { v2 as cloudinary } from 'cloudinary';
import myHotelRoutes from './routes/my-hotels';
import hotelRoutes from  './routes/hotels';


// Connect to Cloudinary database using environment variable
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});


// Connect to MongoDB database using environment variable
mongoose.connect(process.env.MONGODB_CONNECTION_STRING as string);

const app = express();

// Middleware setup
app.use(cookieParser()); // Parse cookies
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies
app.use(
  cors({
    origin: process.env.FRONTEND_URL, // Allow requests from specified frontend URL
    credentials: true, // Allow sending cookies
  })
);

// Serve static files from the frontend build directory
app.use(express.static(path.join(__dirname, "../../frontend/dist")));

// Routes setup
app.use("/api/auth", authRoutes); // Authentication routes
app.use("/api/users", userRoutes); // User-related routes
app.use("/api/my-hotels", myHotelRoutes); // Adding my hotel routes for logged in users
app.use("/api/hotels", hotelRoutes); // Adding hotel routes to search and view hotels

app.get("*", (req:Request, res:Response)=>{
  res.sendFile(path.join(__dirname, '../../frontend/dist/index.html'));
});

// Start server on port 3000
app.listen(3000, () => {
  console.log("server running on localhost:3000"); 
});
