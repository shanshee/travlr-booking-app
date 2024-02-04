// File: AddHotel.js
// Programmer: Londelle Sheehan (shansheehan@gmail.com)
// Date: February 1, 2024
// Version: 1.0
// Purpose: Component for adding a new hotel.

import { useMutation } from "react-query";
import ManageHotelForm from "../forms/ManageHotelForm/ManageHotelForm";
import { useAppContext } from "../contexts/AppContext";
import * as apiClient from "../api-client";

const AddHotel = () => {
  // Get showToast function from AppContext
  const { showToast } = useAppContext();

  // Define mutation hook to add a new hotel
  const { mutate, isLoading } = useMutation(apiClient.addMyHotel, {
    onSuccess: () => {
      showToast({ message: "Hotel Saved", type: "SUCCESS" });
    },
    onError: () => {
      showToast({ message: "Error Saving Hotel", type: "ERROR" });
    },
  });

  // Callback function to handle saving hotel data
  const handleSave = (hotelFormData: FormData) => {
    mutate(hotelFormData); // Call the mutation hook with form data
  };

  return (
    <ManageHotelForm onSave={handleSave} isLoading={isLoading} />
  ); // Render ManageHotelForm component with save handler and loading state
};

export default AddHotel;
