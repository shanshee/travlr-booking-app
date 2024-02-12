/*
  File: PriceFilter.tsx
  Programmer: Londelle Sheehan (shansheehan@gmail.com)
  Date: February 11, 2024
  Version: 1.0
  Purpose: Defines a component for filtering by maximum price.

  This file contains the PriceFilter component, which is responsible for rendering
  a dropdown menu for selecting the maximum price filter. Users can select a maximum
  price from the dropdown menu, triggering the onChange event handler to update the
  selected price.
*/


export type Props = {
  selectedPrice?: number;
  onChange: (value?: number) => void;
};

/**
 * PriceFilter component for filtering by maximum price.
 * @param selectedPrice - Selected maximum price.
 * @param onChange - Function to handle price change.
 */
const PriceFilter = ({ selectedPrice, onChange }: Props) => {
  return (
    <div>
      <h4 className="text-md font-semibold mb-2">Max Price</h4>
      <select
        className="p-2 border rounded-md w-full"
        value={selectedPrice}
        onChange={(event) =>
          onChange(
            event.target.value ? parseInt(event.target.value) : undefined
          )
        }
      >
        <option value="">Select Max Price</option>
        {[100, 250, 350, 500, 1000].map((price) => (
          <option key={price} value={price}>{price}</option>
        ))}
      </select>
    </div>
  );
};

export default PriceFilter;
