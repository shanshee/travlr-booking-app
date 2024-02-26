// File: GuestSection.js
// Programmer: Londelle Sheehan (shansheehan@gmail.com)
// Date: February 1, 2024
// Version: 1.0
// Purpose: Component for managing guest details in a hotel form.


import { useFormContext } from "react-hook-form";
import { HotelFormData } from "./ManageHotelForm";

const GuestSection = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<HotelFormData>();

  return (
    <div>
      {/* Section header */}
      <h2 className="text-2xl font-bold mb-3">Guests</h2>

      {/* Guest input fields */}
      <div className="grid grid-cols-2 p-6 gap-5 bg-yellow-300">
        {/* Adults input */}
        <label className="text-gray-700 text-sm font-semibold">
          Adults
          <input
            className="border rounded w-full py-2 px-3 font-normal"
            type="number"
            min={1}
            {...register("adultCount", {
              required: "This field is required",
            })}
          />
          {/* Error message for adultCount */}
          {errors.adultCount?.message && (
            <span className="text-red-500 text-sm font-bold">
              {errors.adultCount?.message}
            </span>
          )}
        </label>

        {/* Children input */}
        <label className="text-gray-700 text-sm font-semibold">
          Children
          <input
            className="border rounded w-full py-2 px-3 font-normal"
            type="number"
            min={0}
            {...register("childCount", {
              required: "This field is required",
            })}
          />
          {/* Error message for childCount */}
          {errors.childCount?.message && (
            <span className="text-red-500 text-sm font-bold">
              {errors.childCount?.message}
            </span>
          )}
        </label>
      </div>
    </div>
  );
};

export default GuestSection;
