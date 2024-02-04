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
}