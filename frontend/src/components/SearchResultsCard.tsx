/*
  File: SearchResultsCard.tsx
  Programmer: Londelle Sheehan (shansheehan@gmail.com)
  Date: February 11, 2024
  Version: 1.0
  Purpose: Defines a component for displaying search results of hotels.

  This file contains the SearchResultsCard component, which is responsible for rendering
  a card displaying details of a hotel search result. It includes the hotel's image, star
  rating, type, name, description, facilities, and price per night, with a link to view
  more details about the hotel.
*/

import { Link } from "react-router-dom";
import { AiFillStar } from "react-icons/ai";
import { HotelType } from "../../../backend/src/shared/types";

type Props = {
  hotel: HotelType;
};

/**
 * SearchResultsCard component for displaying hotel search results.
 * @param hotel - Hotel details object.
 */
const SearchResultsCard = ({ hotel }: Props) => {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-[2fr_3fr] border border-slate-300 rounded-lg p-8 gap-8">
      <div className="w-full h-[300px]">
        <img
          src={hotel.imageUrls[0]}
          alt={hotel.name}
          className="w-full h-full object-cover object-center"
        />
      </div>
      <div className="grid grid-rows-[1fr_auto_1fr]">
        <div>
          <div className="flex items-center">
            <span className="flex">
              {Array.from({ length: hotel.starRating }, (_, index) => (
                <AiFillStar key={index} className="fill-yellow-400" />
              ))}
            </span>
            <span className="ml-1 text-sm">{hotel.type}</span>
          </div>
          <Link
            to={`/detail/${hotel._id}`}
            className="text-2xl font-bold cursor-pointer"
          >
            {hotel.name}
          </Link>
        </div>

        <div>
          <div className="line-clamp-4">{hotel.description}</div>
        </div>
        <div className="grid grid-cols-2 items-end whitespace-nowrap">
          <div className="flex gap-1 items-center">
            {hotel.facilities.slice(0, 3).map((facility, index) => (
              <span key={index} className="bg-slate-300 p-2 rounded-lg font-bold text-xs whitespace-nowrap">
                {facility}
              </span>
            ))}
            <span className="text-sm">
              {hotel.facilities.length > 3 &&
                `+${hotel.facilities.length - 3} more`}
            </span>
          </div>
          <div className="flex flex-col items-end gap-1">
            <span className="font-bold">${hotel.pricePerNight} per night</span>
            <Link to={`/detail/${hotel._id}`} className="bg-orange-500 text-white h-full p-2 font-bold text-xl max-w-fit hover:bg-yellow-400">
              View More
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchResultsCard;
