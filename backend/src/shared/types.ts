// File: HotelTypes.ts
// Programmer: Londelle Sheehan (Contact: shansheehan@gmail.com)
// Date: February 5, 2024
// Version: 1.1
// Purpose: This file defines types related to hotel documents and search responses.

// Define the structure of user data
export type Usertype = {
  _id: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
};

// Define the type for the Hotel document
export type HotelType = {
  _id: string;
  userId: string; // ID of the user who owns the hotel
  name: string; // Name of the hotel
  city: string; // City where the hotel is located
  country: string; // Country where the hotel is located
  description: string; // Description of the hotel
  type: string; // Type of the hotel (e.g., resort, boutique, etc.)
  adultCount: number; // Number of adult guests the hotel can accommodate
  childCount: number; // Number of child guests the hotel can accommodate
  facilities: string[]; // Array of facilities available at the hotel
  pricePerNight: number; // Price per night at the hotel
  starRating: number; // Star rating of the hotel (1 to 5)
  imageUrls: string[]; // Array of URLs of hotel images
  lastUpdated: Date; // Date when the hotel information was last updated
  bookings: BookingType[];
};

export type BookingType = {
    _id: string;
    userId: string;
    firstName: string;
    lastName: string;
    email: string;
    adultCount: number;
    childCount: number;
    checkIn: Date;
    checkOut: Date;
    totalCost: number;
}

// Define the type for the Hotel search response
export type HotelSearchResponse = {
  data: HotelType[]; // Array of hotel documents
  pagination: {
    total: number; // Total number of hotels matching the search criteria
    page: number; // Current page number of the search results
    pages: number; // Total number of pages of search results
  };
};

export type PaymentIntentResponse = {
  paymentIntentId: string;
  clientSecret: string;
  totalCost: number;
};
