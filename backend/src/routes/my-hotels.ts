/*
File: hotelRoutes.ts
Author: Londelle Sheehan (shansheehan@gmail.com)
Date: January 29, 2024
Version: 1.0
Purpose: This file defines routes for handling hotel-related operations.
*/

import express, { Request, Response } from "express";
import multer from "multer";
import cloudinary from "cloudinary";
import Hotel, { HotelType } from "../models/hotel";
import verifyToken from "../middleware/auth";
import { body } from "express-validator";

const router = express.Router();

// Set up multer for file upload
const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB
  },
});

// POST route for creating a new hotel
router.post(
  "/",
  verifyToken, // Middleware for verifying user authentication
  [
    // Validation middleware for request body fields
    body("name").notEmpty().withMessage("Name is required."),
    body("city").notEmpty().withMessage("City is required."),
    body("country").notEmpty().withMessage("Country is required."),
    body("description").notEmpty().withMessage("Description is required."),
    body("type").notEmpty().withMessage("Hotel Type is required."),
    body("pricePerNight")
      .notEmpty()
      .isNumeric()
      .withMessage("Price per night is required and must be a number."),
    body("facilities")
      .notEmpty()
      .isArray()
      .withMessage("Facilities are required."),
  ],
  upload.array("imageFiles", 6), // Middleware for handling file uploads
  async (req: Request, res: Response) => {
    try {
      const imageFiles = req.files as Express.Multer.File[];
      const newHotel: HotelType = req.body;

      // Upload images to cloudinary and get image URLs
      const uploadPromises = imageFiles.map(async (image) => {
        const b64 = Buffer.from(image.buffer).toString("base64");
        let dataURI = "data:" + image.mimetype + ";base64," + b64;
        const res = await cloudinary.v2.uploader.upload(dataURI);
        return res.url;
      });

      const imageUrls = await Promise.all(uploadPromises);
      newHotel.imageUrls = imageUrls;
      newHotel.lastUpdated = new Date();
      newHotel.userId = req.userId; // Assuming userId is extracted from authentication middleware

      const hotel = new Hotel(newHotel);
      await hotel.save(); // Save new hotel to database

      res.status(201).send(hotel); // Send response with created hotel object
    } catch (error) {
      console.log("Error creating hotel: ", error);
      res.status(500).json({ message: "Something went wrong" }); // Handle server error
    }
  }
);

export default router;
