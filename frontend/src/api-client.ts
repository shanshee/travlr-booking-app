// Programmer: Londelle Sheehan (shansheehan@gmail.com)
// Date: February 4, 2024
// Version: 1.1
// Purpose: Contains functions for interacting with the backend API.

import { RegisterFormData } from "./pages/Register";
import { SignInFormData } from "./pages/SignIn";
import { HotelType } from "../../backend/src/shared/types";

// Retrieve the base URL for the API from environment variables or use an empty string if not provided
const API_BASE_URL: string = import.meta.env.VITE_API_BASE_URL || "";

/**
 * Registers a new user by sending registration form data to the backend API.
 * @param formData - Registration form data.
 * @throws Error if the registration request fails.
 */
export const register = async (formData: RegisterFormData): Promise<void> => {
  const response = await fetch(`${API_BASE_URL}/api/users/register`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });
  const responseBody = await response.json();

  if (!response.ok) {
    throw new Error(responseBody.message);
  }
};

/**
 * Signs in a user by sending sign-in form data to the backend API.
 * @param formData - Sign-in form data.
 * @returns User information if sign-in is successful.
 * @throws Error if the sign-in request fails.
 */
export const signIn = async (formData: SignInFormData): Promise<any> => {
  const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  const body = await response.json();
  if (!response.ok) {
    throw new Error(body.message);
  }
  return body;
};

/**
 * Validates the user's token with the backend API.
 * @throws Error if the token validation fails.
 * @returns User information if the token is valid.
 */
export const validateToken = async (): Promise<any> => {
  const response = await fetch(`${API_BASE_URL}/api/auth/validate-token`, {
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Token invalid");
  }
  return await response.json();
};

/**
 * Signs out the user by sending a request to invalidate the token with the backend API.
 * @throws Error if sign out fails.
 */
export const signOut = async (): Promise<void> => {
  const response = await fetch(`${API_BASE_URL}/api/auth/logout`, {
    credentials: "include",
    method: "POST",
  });

  if (!response.ok) {
    throw new Error("Error during sign out.");
  }
};

/**
 * Adds a new hotel by sending hotel form data to the backend API.
 * @param hotelFormData - Hotel form data.
 * @throws Error if the request to add the hotel fails.
 * @returns Response JSON data if the request is successful.
 */
export const addMyHotel = async (hotelFormData: FormData) => {
  const response = await fetch(`${API_BASE_URL}/api/my-hotels`, {
    method: "POST",
    credentials: "include",
    body: hotelFormData,
  });

  if (!response.ok) {
    throw new Error("Failed to add hotel");
  }
  return response.json();
};

/**
 * Fetches user's hotels from the backend API.
 * @throws Error if there is an error fetching hotels.
 * @returns An array of HotelType objects.
 */
export const fetchMyHotels = async (): Promise<HotelType[]> => {
  const response = await fetch(`${API_BASE_URL}/api/my-hotels`, {
    credentials: "include"
  });

  if (!response.ok) {
    throw new Error("Error fetching hotels");
  }

  return response.json();
};

/**
 * Fetches a hotel by its ID from the backend API.
 * @param hotelId - ID of the hotel to fetch.
 * @throws Error if there is an error fetching the hotel.
 * @returns A HotelType object.
 */
export const fetchMyHotelById = async (hotelId: string): Promise<HotelType> => {
  const response = await fetch(`${API_BASE_URL}/api/my-hotels/${hotelId}`, {
    credentials: "include"
  });

  if (!response.ok) {
    throw new Error("Error fetching hotel");
  }
  return response.json();
};

/**
 * Updates a hotel by its ID with new data from the backend API.
 * @param hotelFormData - Updated hotel form data.
 * @throws Error if there is an error updating the hotel.
 * @returns Response JSON data if the update is successful.
 */
export const updateMyHotelById = async (hotelFormData: FormData) => {
  const response = await fetch(`${API_BASE_URL}/api/my-hotels/${hotelFormData.get("hotelId")}`, {
    method: "PUT",
    body: hotelFormData,
    credentials: "include"
  });

  if (!response.ok) {
    throw new Error("Failed to update hotel")
  }
  return response.json();
};
