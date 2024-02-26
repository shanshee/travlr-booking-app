// File: Detail.tsx
// Author: Londelle Sheehan (shansheehan@gmail.com)
// Date: February 14, 2024
// Version: 1.0
// Purpose: 
// This file contains a React component for displaying detailed information 
// about a hotel. It fetches the hotel data using react-query based on the 
// hotel ID obtained from the URL parameters. It displays the hotel's star 
// rating, name, images, facilities, and description. It also includes a 
// form component (GuestInfoForm) for managing guest information and booking
// a room at the hotel.

import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import * as apiClient from "./../api-client";
import { AiFillStar } from "react-icons/ai";
import GuestInfoForm from "../forms/ManageHotelForm/GuestInfoForm/GuestInfoForm";

const Detail = () => {
  const { hotelId } = useParams();

  // Query to fetch hotel details
  const { data: hotel } = useQuery(
    "fetchHotelById",
    () => apiClient.fetchHotelById(hotelId as string),
    {
      enabled: !!hotelId,
    }
  );

  // If hotel data is not available yet, return nothing
  if (!hotel) {
    return <></>;
  }

  return (
    <div className="space-y-6">
      {/* Display star rating and hotel name */}
      <div>
        <span className="flex ">
          {/* Display star rating */}
          {Array.from({ length: hotel.starRating }).map((_, index) => (
            <AiFillStar key={index} className="fill-yellow-400" />
          ))}
        </span>
        {/* Display hotel name */}
        <h1 className="text-3xl font-bold">{hotel.name}</h1>
      </div>

      {/* Display hotel images */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {hotel.imageUrls.map((image, index) => (
          <div key={index} className="h-[300px]">
            <img
              src={image}
              alt={hotel.name}
              className="rounded-md w-full h-full object-cover object-center"
            />
          </div>
        ))}
      </div>

      {/* Display hotel facilities */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-2">
        {hotel.facilities.map((facility, index) => (
          <div key={index} className="border border-slate-300 rounded-sm p-3">
            {facility}
          </div>
        ))}
      </div>

      {/* Display hotel description and guest information form */}
      <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr]">
        {/* Display hotel description */}
        <div className="whitespace-pre-line">{hotel.description}</div>
        {/* Render GuestInfoForm component for managing guest information */}
        <div className="h-fit">
          <GuestInfoForm
            pricePerNight={hotel.pricePerNight}
            hotelId={hotel._id}
          />
        </div>
      </div>
    </div>
  );
};

export default Detail;
