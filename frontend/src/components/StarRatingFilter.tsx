/*
  File: StarRatingFilter.tsx
  Programmer: Londelle Sheehan (shansheehan@gmail.com)
  Date: February 11, 2024
  Version: 1.0
  Purpose: Defines a component for filtering by star rating.

  This file contains the StarRatingFilter component, which is responsible for rendering
  a list of star rating checkboxes based on the selectedStars prop. Users can select or
  deselect star ratings, triggering the onChange event handler to update the selected star
  ratings.
*/

import React from "react";

type Props = {
  selectedStars: string[];
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

/**
 * StarRatingFilter component for filtering by star rating.
 * @param selectedStars - Array of selected star ratings.
 * @param onChange - Function to handle star rating change.
 */
const StarRatingFilter = ({ selectedStars, onChange }: Props) => {
  return (
    <div className="border-b border-slate-300 pb-5">
      <h4 className="text-md font-semibold mb-2">Property Rating</h4>
      {["5", "4", "3", "2", "1"].map((star) => (
        <label key={star} className="flex items-center space-x-2">
          <input
            type="checkbox"
            className="rounded"
            value={star}
            checked={selectedStars.includes(star)}
            onChange={onChange}
          />
          <span>{star} Stars</span>
        </label>
      ))}
    </div>
  );
};

export default StarRatingFilter;
