/**
 * ==============================================================================
 * FILENAME: /routes/userBookings.js
 * PROGRAMMER: Londelle Sheehan
 * CONTACT INFO: shansheehan@gmail.com
 * DATE: February 24, 2024
 * VERSION: 1.0
 * PURPOSE: This Express route file is designed to handle API requests related to 
 *          fetching hotel bookings made by the current user. It uses JWT for 
 *          authentication, validates the token, and returns a list of hotels 
 *          booked by the user, including filtering to only show the bookings 
 *          related to the requesting user. This ensures that users can only access
 *          their own booking information, enhancing privacy and security.
 * ==============================================================================
 */

import express, { Request, Response } from 'express'; // Importing Express and its types for request and response objects.
import verifyToken from '../middleware/auth'; // Middleware for JWT token verification to ensure routes are protected.
import Hotel from '../models/hotel'; // Hotel model for interacting with the hotel collection in the database.
import { HotelType } from '../shared/types'; // TypeScript interface for strong typing of hotel objects.

const router = express.Router(); // Creating a new router object for defining API routes.

// Define a GET route for fetching user-specific hotel bookings.
router.get("/", verifyToken, async (req: Request, res: Response) => {
    try {
        // Fetch hotels where the current user has bookings.
        const hotels = await Hotel.find({
            bookings: { $elemMatch: { userId: req.userId } }, // MongoDB query to match elements in the bookings array.
        });

        // Map through the fetched hotels to filter out bookings not belonging to the user.
        const results = hotels.map((hotel) => {
            const userBookings = hotel.bookings.filter((booking) => booking.userId === req.userId);
            // Creating a new hotel object including only the user's bookings.
            const hotelWithUserBookings: HotelType = {
                ...hotel.toObject(), // Convert Mongoose document to a plain JavaScript object.
                bookings: userBookings, // Overwrite bookings with only those belonging to the user.
            };
            return hotelWithUserBookings;
        });

        // Send the filtered list of hotels with user bookings as a response.
        res.status(200).send(results);
    } catch (error) {
        console.error(error); // Log the error for debugging purposes.
        // Respond with a 500 status code and error message if the operation fails.
        res.status(500).json({ message: "Unable to fetch bookings" });
    }
});

// Export the router for use in the application.
export default router;
