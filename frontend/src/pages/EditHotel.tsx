// File: EditHotel.js
// Programmer: Londelle Sheehan (shansheehan@gmail.com)
// Date: February 1, 2024
// Version: 1.0
// Purpose: Component for editing an existing hotel.

import { useMutation, useQuery } from "react-query";
import { useParams } from "react-router-dom";
import * as apiClient from "../api-client";
import ManageHotelForm from "../forms/ManageHotelForm/ManageHotelForm";
import { useAppContext } from "../contexts/AppContext";

const EditHotel = () => {
  // Get hotelId from URL params
  const { hotelId } = useParams();
  
  // Get showToast function from AppContext
  const { showToast } = useAppContext();
  
  // Fetch hotel data by hotelId using useQuery
  const { data: hotel } = useQuery(
    "fetchMyHotelById",
    () => apiClient.fetchMyHotelById(hotelId || ""),
    {
      enabled: !!hotelId, // Enable query only if hotelId is present
    }
  );

  // Define mutation hook to update hotel data
  const { mutate, isLoading } = useMutation(apiClient.updateMyHotelById, {
    onSuccess: () => {
      showToast({ message: "Hotel Saved", type: "SUCCESS" });
    },
    onError: () => {
      showToast({ message: "Error Saving Hotel", type: "ERROR" });
    },
  });

  // Callback function to handle saving updated hotel data
  const handleSave = (hotelFormData: FormData) => {
    mutate(hotelFormData); // Call the mutation hook with form data
  };

  return (
    <ManageHotelForm hotel={hotel} onSave={handleSave} isLoading={isLoading} />
  ); // Render ManageHotelForm component with hotel data, save handler, and loading state
};

export default EditHotel;
