/**
 * ==============================================================================
 * FILENAME: MyBookings.tsx
 * PROGRAMMER: Londelle Sheehan
 * CONTACT INFO: shansheehan@gmail.com
 * DATE: February 24, 2024
 * VERSION: 1.0
 * This component fetches and displays a list of hotel bookings made by the current user.
 * Utilizes react-query for data fetching and state management to improve user experience
 * by handling loading states, caching, and automatic updates.
 * ==============================================================================
 */

import { useQuery } from "react-query"; // Import useQuery hook from react-query for fetching data
import * as apiClient from "../api-client"; // Import all functions from the api-client module

const MyBookings = () => {
  // Use the useQuery hook to fetch bookings. The query key 'fetchMyBookings' is used for caching and tracking the query state.
  const { data: hotels } = useQuery(
    "fetchMyBookings",
    apiClient.fetchMyBookings // apiClient.fetchMyBookings is the function that fetches the booking data from the backend
  );

  // Display a message if no bookings are found
  if (!hotels || hotels.length === 0) {
    return <span>No bookings found</span>;
  }

  // Render the list of bookings if data is available
  return (   
    <div className="space-y-5">
      <h1 className="text-3xl font-bold">My Bookings</h1>
      {hotels.map((hotel) => (
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_3fr] border border-slate-300 rounded-lg p-8 gap-5">
          <div className="lg:w-full lg:h-[250px]">
            <img
              src={hotel.imageUrls[0]}
              className="w-full h-full object-cover object-center"
            />
          </div>
          <div className="flex flex-col gap-4 overflow-y-auto max-h-[300px]">
            <div className="text-2xl font-bold">
              {hotel.name}
              <div className="text-xs font-normal">
                {hotel.city}, {hotel.country}
              </div >
            </div>
            {hotel.bookings.map((booking) => (
              <div>
                <div>
                  <span className="font-bold mr-2">Dates: </span>
                  <span>
                    {new Date(booking.checkIn).toDateString()} -
                    {new Date(booking.checkOut).toDateString()}
                  </span>
                </div>
                <div>
                  <span className="font-bold mr-2">Guests:</span>
                  <span>
                    {booking.adultCount} adults, {booking.childCount} children
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default MyBookings;