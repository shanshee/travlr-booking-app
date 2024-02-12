/*
  File: FacilitiesFilter.tsx
  Programmer: Londelle Sheehan (shansheehan@gmail.com)
  Date: February 11, 2024
  Version: 1.0
  Purpose: Defines a component for filtering hotel facilities.

  This file contains the FacilitiesFilter component, which is responsible for rendering
  a list of hotel facilities checkboxes based on the selectedFacilities prop. Users can
  select or deselect facilities, triggering the onChange event handler to update the
  selected facilities.
*/

import React from "react";
import { hotelFacilities } from "../config/hotel-options-config";

type Props = {
  selectedFacilities: string[];
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

/**
 * FacilitiesFilter component for filtering hotel facilities.
 * @param selectedFacilities - Array of selected facility names.
 * @param onChange - Event handler for changes in selected facilities.
 */
const FacilitiesFilter = ({ selectedFacilities, onChange }: Props) => {
  return (
    <div className="border-b border-slate-300 pb-5">
      <h4 className="text-md font-semibold mb-2">Facilities</h4>
      {hotelFacilities.map((facility) => (
        <label className="flex items-center space-x-2" key={facility}>
          <input
            type="checkbox"
            className="rounded"
            value={facility}
            checked={selectedFacilities.includes(facility)}
            onChange={onChange}
          />
          <span>{facility}</span>
        </label>
      ))}
    </div>
  );
};

export default FacilitiesFilter;
