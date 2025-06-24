// ==============================================================================
// PROGRAMMER: Londelle Sheehan
// CONTACT INFO: shansheehan@gmail.com
// DATE: February 24, 2024
// VERSION: 1.0
// PURPOSE: This component provides a form for users to confirm their booking details,
//          including personal information and payment through Stripe. It leverages 
//          react-hook-form for form handling, Stripe for payment processing, and
//          react-query for managing the room booking mutation. It also integrates
//          with the application's context for global state management and displays
//          toast notifications upon success or error. The form prefills with user
//          and search context data, validates payment with Stripe, and submits the
//          booking information to the backend API.
// ==============================================================================

import { useForm } from "react-hook-form";
import { PaymentIntentResponse, Usertype } from "../../../../backend/src/shared/types";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { StripeCardElement } from "@stripe/stripe-js";
import { useSearchContext } from "../../contexts/SearchContext";
import { useParams } from "react-router-dom";
import * as apiClient from "../../api-client";
import { useAppContext } from "../../contexts/AppContext";
import { useMutation } from "react-query";

// Define Props and BookingFormData types for TypeScript validation.
type Props = {
  currentUser?: Usertype; // 👈 optional
  paymentIntent: PaymentIntentResponse;
};

export type BookingFormData = {
  firstName: string;
  lastName: string;
  email: string;
  adultCount: number;
  childCount: number;
  checkIn: string;
  checkOut: string;
  hotelId: string;
  paymentIntentId: string;
  totalCost: number;
};

const BookingForm = ({ currentUser, paymentIntent }: Props) => {
  // Setup Stripe hooks for payment processing.
  const stripe = useStripe();
  const elements = useElements();

  // Access search parameters from context to prefill form data.
  const search = useSearchContext();
  const { hotelId } = useParams();

  // Use application context for showing toast notifications.
  const { showToast } = useAppContext();

  // Setup the mutation for booking a room using react-query for better state management.
  const { mutate: bookRoom, isLoading } = useMutation(apiClient.createRoomBooking, {
    onSuccess: () => showToast({ message: "Booking Saved", type: "SUCCESS" }),
    onError: () => showToast({ message: "Error saving booking", type: "ERROR" }),
  });

  // Initialize form handling with react-hook-form, prefilling with user and search context data.
  const { handleSubmit, register } = useForm<BookingFormData>({
    defaultValues: {
      firstName: currentUser?.firstName || "",
      lastName: currentUser?.lastName || "",
      email: currentUser?.email || "",
      adultCount: search.adultCount,
      childCount: search.childCount,
      checkIn: search.checkIn.toISOString(),
      checkOut: search.checkOut.toISOString(),
      hotelId: hotelId || "",
      totalCost: paymentIntent.totalCost,
      paymentIntentId: paymentIntent.paymentIntentId,
    }
  });

  // Handle form submission, including payment confirmation through Stripe.
  const onSubmit = async (formData: BookingFormData) => {
    if (!stripe || !elements) {
      return;
    }
    const result = await stripe.confirmCardPayment(paymentIntent.clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement) as StripeCardElement,
      },
    });
    if (result.paymentIntent?.status === "succeeded") {
      bookRoom({ ...formData, paymentIntentId: result.paymentIntent.id });
    }
  };

  // Render the booking form with prefilled data and Stripe payment integration.
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 gap-5 rounded-lg border border-slate-300 p-5">
      {/* Form header */}
      <span className="text-3xl font-bold">Confirm Your Details</span>
      {/* User information section */}
      <div className="grid grid-cols-2 gap-6">
        {/* Firstname and lastname fields, prepopulated and read-only */}
          <label className="text-gray-700 text-sm font-bold flex-1">
            Firstname
            <input
              className="mt-1 border rounded w-full py-2 px-3 text-gray-700 bg-white font-normal"
              type="text"
              {...register("firstName", { required: true })}
            />
          </label>
          
          <label className="text-gray-700 text-sm font-bold flex-1">
            Lastname
            <input
              className="mt-1 border rounded w-full py-2 px-3 text-gray-700 bg-white font-normal"
              type="text"
              {...register("lastName", { required: true })}
            />
          </label>
          
          <label className="text-gray-700 text-sm font-bold flex-1">
            Email
            <input
              className="mt-1 border rounded w-full py-2 px-3 text-gray-700 bg-white font-normal"
              type="email"
              {...register("email", { required: true })}
            />
</label>
      </div>

      {/* Price summary section */}
      <div className="space-y-2">
        <h2 className="text-xl font-semibold">Your Price Summary</h2>
        <div className="bg-orange-300 p-4 rounced-md">
          <div className="font-semibold text-lg">Total Cost: ${paymentIntent.totalCost.toFixed(2)}</div>
          <div className="text-xs">Inclusive of taxes and charges</div>
        </div>
      </div>
      {/* Payment details section with Stripe CardElement */}
      <div className="space-y-2">
        <h3 className="text-xl font-semibold">Payment Details</h3>
        <CardElement id="payment-element" className="border rounded-md p-2 text-sm" />
      </div>
      {/* Submit button */}
      <div className="flex justify-end">
        <button disabled={isLoading} type="submit" className="bg-orange-500 text-white p-2 font-bold hover:bg-yellow-400 text-md disabled:bg-gray-500">
          {isLoading ? "Saving..." : "Confirm Booking"}
        </button>
      </div>
    </form>
  );
};

export default BookingForm;
