// File: LatestDestinationCard.jsx
// Author: Londelle Sheehan
// Contact Info: shansheehan@gmail.com
// Date: February 24, 2024
// Version: 1.0
// Purpose: This component renders a card for displaying the latest destination in a visually appealing manner. It uses data from the hotel object passed as a prop to show the hotel's name and its primary image. The card is clickable and redirects the user to the hotel's detail page using react-router-dom's Link component.

import { Link } from "react-router-dom";
import { HotelType } from "../../../backend/src/shared/types";


// Define the type for props received by the component for better type checking
type Props = {
    hotel: HotelType;
  };

  // LatestDestinationCard component definition
// @param {Props} props - The props containing hotel data to display
const LatestDestinationCard = ({ hotel }: Props) => {
  return (
    // Link component to make the card clickable and navigate to the hotel's detail page
    <Link
      to={`/detail/${hotel._id}`}
      className="relative cursor-pointer overflow-hidden rounded-md"
    >
      <div className="h-[300px]">
        <img
          src={hotel.imageUrls[0]}
          className="w-full h-full object-cover object-center"
        />
      </div>
      <div className="absolute bottom-0 p-4 bg-black bg-opacity-50 w-full rounded-b-md">
        <span className="text-white font-bold tracking-tight text-3xl">
            {hotel.name}
        </span>
      </div>
    </Link>
  );
};

export default LatestDestinationCard;