/*
  File: HotelTypesFilter.tsx
  Programmer: Londelle Sheehan (shansheehan@gmail.com)
  Date: February 11, 2024
  Version: 1.0
  Purpose: Defines a component for filtering hotel types.

  This file contains the HotelTypesFilter component, which is responsible for rendering
  a list of hotel type checkboxes based on the selectedHotelTypes prop. Users can select
  or deselect hotel types, triggering the onChange event handler to update the selected
  hotel types.
*/

import React from "react";
import { hotelTypes } from "../config/hotel-options-config";

type Props = {
  selectedHotelTypes: string[];
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

/**
 * HotelTypesFilter component for filtering hotel types.
 * @param selectedHotelTypes - Array of selected hotel type names.
 * @param onChange - Event handler for changes in selected hotel types.
 */
const HotelTypesFilter = ({ selectedHotelTypes, onChange }: Props) => {
  return (
    <div className="border-b border-slate-300 pb-5">
      <h4 className="text-md font-semibold mb-2">Hotel Type</h4>
      {hotelTypes.map((type) => (
        <label className="flex items-center space-x-2" key={type}>
          <input
            type="checkbox"
            className="rounded"
            value={type}
            checked={selectedHotelTypes.includes(type)}
            onChange={onChange}
          />
          <span>{type}</span>
        </label>
      ))}
    </div>
  );
};

export default HotelTypesFilter;
