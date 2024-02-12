// File: SearchContext.tsx
// Programmer: Londelle Sheehan (Contact: shansheehan@gmail.com)
// Date: February 5, 2024
// Version: 1.0
// Purpose: This file defines the SearchContext and SearchContextProvider components for managing search-related state.

import React, { useContext, useState } from "react";

// Define the shape of the search context
type SearchContext = {
  destination: string;
  checkIn: Date;
  checkOut: Date;
  adultCount: number;
  childCount: number;
  hotelId: string;
  saveSearchValues: (
    destination: string,
    checkIn: Date,
    checkOut: Date,
    adultCount: number,
    childCount: number,
    hotelId?: string
  ) => void;
};

// Create the context
const SearchContext = React.createContext<SearchContext | undefined>(undefined);

// Define props for SearchContextProvider
type SearchContextProviderProps = {
  children: React.ReactNode;
};

export const SearchContextProvider = ({
  children,
}: SearchContextProviderProps) => {
  // State variables for search values
  const [destination, setDestination] = useState<string>("");
  const [checkIn, setCheckIn] = useState<Date>(new Date());
  const [checkOut, setCheckOut] = useState<Date>(new Date());
  const [adultCount, setAdultCount] = useState<number>(1);
  const [childCount, setChildCount] = useState<number>(0);
  const [hotelId, setHotelId] = useState<string>("");

  // Function to save search values
  const saveSearchValues = (
    destination: string,
    checkIn: Date,
    checkOut: Date,
    adultCount: number,
    childCount: number,
    hotelId?: string
  ) => {
    setDestination(destination);
    setCheckIn(checkIn);
    setCheckOut(checkOut);
    setAdultCount(adultCount);
    setChildCount(childCount);
    if(hotelId) {
        setHotelId(hotelId);
    }
  };

  return (
    <SearchContext.Provider
      value={{
        destination,
        checkIn,
        checkOut,
        adultCount,
        childCount,
        hotelId,
        saveSearchValues,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};

// Custom hook to access the search context
export const useSearchContext = () => {
    const context = useContext(SearchContext);
    return context as SearchContext;
};
