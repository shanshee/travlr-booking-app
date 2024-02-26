// File: ImagesSection.js
// Programmer: Londelle Sheehan (shansheehan@gmail.com)
// Date: February 1, 2024
// Version: 1.0
// Purpose: Component for managing images in a hotel form.

import { useFormContext } from "react-hook-form";
import { HotelFormData } from "./ManageHotelForm";

const ImagesSection = () => {
  const {
    register,
    formState: { errors },
    watch,
    setValue,
  } = useFormContext<HotelFormData>();

  // Get existing image URLs from form data
  const existingImageUrls = watch("imageUrls");

  // Function to handle image deletion
  const handleDelete = (
    event: React.MouseEvent<HTMLButtonElement>,
    imageUrl: string
  ) => {
    event.preventDefault();
    setValue(
      "imageUrls",
      existingImageUrls.filter((url) => url !== imageUrl)
    );
  };

  return (
    <div>
      {/* Section header */}
      <h2 className="text-2xl font-bold mb-3">Images</h2>

      {/* Image section with delete buttons */}
      <div className="border rounded p-4 flex flex-col gap-4">
        {existingImageUrls && (
          <div className="grid grid-cols-6 gap-4">
            {existingImageUrls.map((url) => (
              <div key={url} className="relative group">
                {/* Image */}
                <img src={url} className="min-h-full object-cover" />

                {/* Delete button */}
                <button
                  onClick={(event) => handleDelete(event, url)}
                  className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 text-white"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Input for adding new images */}
        <input
          type="file"
          accept="image/*"
          multiple
          className="w-full text-gray-700 font-normal"
          {...register("imageFiles", {
            validate: (imageFiles) => {
              const totalLength = imageFiles.length + (existingImageUrls?.length || 0);

              // Validation for minimum and maximum number of images
              if (totalLength === 0) {
                return "At least one image must be added.";
              }

              if (totalLength > 6) {
                return "Total number of images cannot be more than 6.";
              }

              return true;
            },
          })}
        />
      </div>

      {/* Error message for imageFiles */}
      {errors.imageFiles && (
        <span className="text-red-500 text-sm font-bold">
          {errors.imageFiles.message}
        </span>
      )}
    </div>
  );
};

export default ImagesSection;
