/*
File: hotel.ts
Author: Londelle Sheehan (shansheehan@gmail.com)
Date: February 24, 2024
Version: 1.1
Purpose: This file defines the Mongoose schema for the Hotel model.
*/

import mongoose from "mongoose";
import { BookingType, HotelType } from "../shared/types";

const bookingSchema = new mongoose.Schema<BookingType>({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    email: {type: String, required: true},
    adultCount: {type: Number, required: true},
    childCount: {type: Number, required: true},
    checkIn: {type: Date, required: true},
    checkOut: {type: Date, required: true},
    userId: {type: String, required: true},
    totalCost: {type: Number, required: true},
});
 
// Define the Mongoose schema for the Hotel model
const hotelSchema = new mongoose.Schema<HotelType>({
    userId: { type: String, required: true }, // User ID of the hotel owner
    name: { type: String, required: true }, // Name of the hotel
    city: { type: String, required: true }, // City where the hotel is located
    country: { type: String, required: true }, // Country where the hotel is located
    description: { type: String, required: true }, // Description of the hotel
    type: { type: String, required: true }, // Type of the hotel (e.g., resort, boutique, etc.)
    adultCount: {  type: Number, required: true }, // Number of adult guests the hotel can accommodate
    childCount: { type: Number, required: true }, // Number of child guests the hotel can accommodate
    facilities: [{ type: String, required: true }], // Array of facilities available at the hotel
    pricePerNight: { type: Number, required: true }, // Price per night at the hotel
    starRating: { type: Number, required: true, min:1, max:5 }, // Star rating of the hotel (1 to 5)
    imageUrls: [{ type: String, required: true }], // Array of URLs of hotel images
    lastUpdated: { type: Date, required: true }, // Date when the hotel information was last updated
    bookings: [bookingSchema],
});

// Define the Hotel model
const Hotel = mongoose.model<HotelType>("Hotel", hotelSchema);
export default Hotel;
