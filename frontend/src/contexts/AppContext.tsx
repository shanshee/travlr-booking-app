// Programmer: Londelle Sheehan
// Contact Info: shansheehan@gmail.com
// Date: January 29, 2024
// Version: 1.0
// Purpose: Define AppContextProvider and useAppContext for managing application context

// Import necessary dependencies
import React, { useContext, useState } from "react";
import Toast from "../components/Toast"; // Import Toast component
import { useQuery } from "react-query"; // Import useQuery hook from react-query
import * as apiClient from "../api-client"; // Import apiClient functions
import { loadStripe, Stripe } from "@stripe/stripe-js";

const STRIPE_PUB_KEY = import.meta.env.VITE_STRIPE_PUB_KEY || "";

// Define type for toast message
type ToastMessage = {
  message: string;
  type: "SUCCESS" | "ERROR";
};

// Define type for application context
type AppContext = {
  showToast: (toastMessage: ToastMessage) => void; // Function to show toast messages
  isLoggedIn: boolean; // Flag indicating whether the user is logged in
  stripePromise: Promise<Stripe | null>;
};

// Create AppContext using React createContext
const AppContext = React.createContext<AppContext | undefined>(undefined);

const stripePromise = loadStripe(STRIPE_PUB_KEY);

// Define AppContextProvider component to provide application context
export const AppContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  // State for managing toast messages
  const [toast, setToast] = useState<ToastMessage | undefined>(undefined);

  // Query to check if user is logged in
  const { isError } = useQuery("validateToken", apiClient.validateToken, {
    retry: false,
  });

  return (
    // Provide AppContext value to children components
    <AppContext.Provider
      value={{
        showToast: (toastMessage) => {
          setToast(toastMessage); // Show toast message
        },
        isLoggedIn: !isError, // Determine if user is logged in based on query result
        stripePromise
      }}
    >
      {/* Render Toast component if toast message exists */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(undefined)} // Close toast message when onClose is triggered
        />
      )}
      {children} {/* Render children components */}
    </AppContext.Provider>
  );
};

// Define useAppContext hook to access application context
export const useAppContext = () => {
  const context = useContext(AppContext); // Access application context
  return context as AppContext; // Return application context
};
