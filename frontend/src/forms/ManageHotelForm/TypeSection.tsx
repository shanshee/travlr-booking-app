// File: TypeSection.js
// Programmer: Londelle Sheehan (shansheehan@gmail.com)
// Date: February 1, 2024
// Version: 1.0
// Purpose: Component for selecting hotel type in a form.

import { useFormContext } from "react-hook-form";
import { hotelTypes } from "../../config/hotel-options-config";
import { HotelFormData } from "./ManageHotelForm";

const TypeSection = () => {
  // Get form context to access form methods and state
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext<HotelFormData>();

  // Watch for changes in "type" field
  const typeWatch = watch("type");

  return (
    <div>
      {/* Section header */}
      <h2 className="test-2xl font-bold mb-3">Type</h2>

      {/* Type selection */}
      <div className="grid grid-cols-5 gap-2">
        {hotelTypes.map((type) => (
          <label
            key={type}
            className={
              typeWatch === type
                ? "cursor-pointer bg-orange-500 text-sm rounded-full px-4 py-2 font-semibold"
                : "cursor-pointer bg-yellow-300 text-sm rounded-full px-4 py-2 font-semibold"
            }
          >
            {/* Radio input */}
            <input
              type="radio"
              value={type}
              {...register("type", {
                required: "This is required.",
              })}
              className="hidden"
            />
            <span>{type}</span>
          </label>
        ))}
      </div>

      {/* Error message for type */}
      {errors.type && (
        <span className="text-red-500 text-sm font-bold">
          {errors.type.message}
        </span>
      )}
    </div>
  );
};

export default TypeSection;
