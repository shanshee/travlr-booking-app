// ==============================================================================
// PROGRAMMER: Londelle Sheehan
// CONTACT INFO: shansheehan@gmail.com
// DATE: February 24, 2024
// VERSION: 1.0
// PURPOSE: This component serves as the main booking page for the application.
//          It fetches necessary data for booking a room, such as payment intent,
//          hotel details, and current user information using react-query hooks.
//          It calculates the number of nights based on search context and
//          displays the BookingForm and BookingDetailsSummary components within
//          a Stripe Elements provider for secure payment processing. The component
//          ensures that all required data is loaded before rendering the booking form,
//          providing a seamless booking experience for the user.
// ==============================================================================

import { useQuery } from "react-query";
import * as apiClient from "../api-client";
import BookingForm from "../forms/BookingForm/BookingForm";
import { useSearchContext } from "../contexts/SearchContext";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import BookingDetailsSummary from "../components/BookingDetailsSummary";
import { Elements } from "@stripe/react-stripe-js";
import { useAppContext } from "../contexts/AppContext";

const Booking = () => {
  const { stripePromise } = useAppContext(); // Access Stripe.js promise from context for payment.
  const search = useSearchContext(); // Access search parameters from context.
  const { hotelId } = useParams(); // Extract hotelId from the URL parameters.

  const [numberOfNights, setNumberOfNights] = useState<number>(0); // State to keep track of the number of nights.

  // Calculate the number of nights based on check-in and check-out dates.
  useEffect(() => {
    if (search.checkIn && search.checkOut) {
      const nights = Math.abs(search.checkOut.getTime() - search.checkIn.getTime()) / (1000 * 60 * 60 * 24);
      setNumberOfNights(Math.ceil(nights));
    }
  }, [search.checkIn, search.checkOut]);

  // Fetch payment intent data required for Stripe payment, enabled only when hotelId and numberOfNights are available.
  const { data: paymentIntentData } = useQuery("createPaymentIntent", () => apiClient.createPaymentIntent(hotelId as string, numberOfNights.toString()), { enabled: !!hotelId && numberOfNights > 0 });

  // Fetch hotel details, enabled only when hotelId is available.
  const { data: hotel } = useQuery("fetchHotelById", () => apiClient.fetchHotelById(hotelId as string), { enabled: !!hotelId });

  // Fetch current user information.
  const { data: currentUser } = useQuery("fetchCurrentUser", apiClient.fetchCurrentUser);

  // Conditional rendering to ensure hotel data is available before rendering the component.
  if (!hotel) {
    return <></>; // Render nothing if hotel data is not available.
  }

  // Render the booking page layout with booking details summary and booking form within Stripe Elements.
  return (
    <div className="grid md:grid-cols-[1fr_2fr]">
      <BookingDetailsSummary
        checkIn={search.checkIn}
        checkOut={search.checkOut}
        adultCount={search.adultCount}
        childCount={search.childCount}
        numberOfNights={numberOfNights}
        hotel={hotel}
      />
      {paymentIntentData && (
        <Elements stripe={stripePromise} options={{ clientSecret: paymentIntentData.clientSecret }}>
          <BookingForm currentUser={currentUser} paymentIntent={paymentIntentData} />
        </Elements>
      )}
    </div>
  );
};

export default Booking;
