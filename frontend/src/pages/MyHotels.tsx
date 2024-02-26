// File: MyHotels.js
// Programmer: Londelle Sheehan (shansheehan@gmail.com)
// Date: February 1, 2024
// Version: 1.0
// Purpose: Component for displaying user's hotels.

import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import * as apiClient from "../api-client";
import { BsBuilding, BsMap } from "react-icons/bs";
import { BiHotel, BiMoney, BiStar } from "react-icons/bi";

const MyHotels = () => {
  // Fetch user's hotels using useQuery
  const { data: hotelData } = useQuery(
    "fetchMyHotels",
    apiClient.fetchMyHotels,
    {
      onError: () => {}, // Error handling
    }
  );

  // Render hotels data or "No hotels found" if data is not available
  if (!hotelData) {
    return <span>No hotels found</span>;
  }

  return (
    <div className="space-y-5">
      {/* Page header with "Add Hotel" link */}
      <span className="flex justify-between">
        <h1 className="text-3xl font-bold">My Hotels</h1>
        <Link
          to="/add-hotel"
          className="flex bg-orange-500 text-white text-xl font-bold p-2 hover:bg-yellow-400"
        >
          Add Hotel
        </Link>
      </span>

      {/* Display user's hotels */}
      <div className="grid grid-cols-1 gap-8">
        {hotelData.map((hotel) => (
          <div key={hotel._id} className="flex flex-col justify-between border border-slate-300 rounded-lg p-8 gap-5">
            {/* Hotel name and description */}
            <h2 className="text-2x font-bold">{hotel.name}</h2>
            <div className="whitespace-pre-line">{hotel.description}</div>
            
            {/* Hotel details */}
            <div className="grid grid-cols-5 gap-2">
              {/* Location */}
              <div className="border border-slate-300 rounded-sm p-3 flex items-center">
                <BsMap className="mr-1" />
                {hotel.city}, {hotel.country}
              </div>
              
              {/* Type */}
              <div className="border border-slate-300 rounded-sm p-3 flex items-center">
                <BsBuilding className="mr-1" />
                {hotel.type}
              </div>
              
              {/* Price per night */}
              <div className="border border-slate-300 rounded-sm p-3 flex items-center">
                <BiMoney className="mr-1" />${hotel.pricePerNight} per night
              </div>
              
              {/* Guest count */}
              <div className="border border-slate-300 rounded-sm p-3 flex items-center">
                <BiHotel className="mr-1" />
                {hotel.adultCount} adults, {hotel.childCount} children
              </div>
              
              {/* Star rating */}
              <div className="border border-slate-300 rounded-sm p-3 flex items-center">
                <BiStar className="mr-1" />{hotel.starRating} Star Rating
              </div>
            </div>

            {/* View Details link */}
            <span className="flex justify-end">
              <Link
                to={`/edit-hotel/${hotel._id}`}
                className="flex bg-orange-500 text-white text-xl font-bold p-2 hover:bg-yellow-400"
              >
                View Details
              </Link>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyHotels;
