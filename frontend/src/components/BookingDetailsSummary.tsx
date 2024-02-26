// ==============================================================================
// PROGRAMMER: Londelle Sheehan
// CONTACT INFO: shansheehan@gmail.com
// DATE: February 24, 2024
// VERSION: 1.0
// PURPOSE: This component displays a summary of the booking details for a hotel
//          reservation. It includes information such as the check-in and check-out
//          dates, the number of adults and children, the number of nights, and the
//          hotel's details (name, city, country). It is designed to provide the
//          user with a clear and concise overview of their booking information.
// ==============================================================================

import { HotelType } from "../../../backend/src/shared/types";

// Define the Props type with expected properties for the component.
type Props = {
  checkIn: Date;
  checkOut: Date;
  adultCount: number;
  childCount: number;
  numberOfNights: number;
  hotel: HotelType;
};

const BookingDetailsSummary = ({
  checkIn,
  checkOut,
  adultCount,
  childCount,
  numberOfNights,
  hotel,
}: Props) => {
  // Render the booking details summary using a structured layout.
  return (
    <div className="grid gap-4 rounded-lg border border-slate-300 p-5 h-fit">
      <h2 className="text-xl font-bold">Your Booking Details</h2> {/* Title */}
      <div className="border-b py-2"> {/* Hotel location information */}
        Location:
        <div className="font-bold">{`${hotel.name}, ${hotel.city}, ${hotel.country}`}</div>
      </div>
      <div className="flex justify-between"> {/* Check-in and check-out dates */}
        <div>
          Check-in
          <div className="font-bold"> {checkIn.toDateString()}</div> {/* Formatted check-in date */}
        </div>
        <div>
          Check-out
          <div className="font-bold"> {checkOut.toDateString()}</div> {/* Formatted check-out date */}
        </div>
      </div>
      <div className="border-t border-b py-2"> {/* Total length of stay */}
        Total length of stay:
        <div className="font-bold">{numberOfNights} nights</div>
      </div>
      <div>Guests {/* Number of adults and children */}
        <div className="font-bold">{adultCount} Adults, {childCount} Children</div>
      </div>
    </div>
  );
};

export default BookingDetailsSummary;
