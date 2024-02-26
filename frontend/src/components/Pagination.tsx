/*
  File: Pagination.tsx
  Programmer: Londelle Sheehan (shansheehan@gmail.com)
  Date: February 11, 2024
  Version: 1.0
  Purpose: Defines a pagination component for navigating between pages.

  This file contains the Pagination component, which is responsible for rendering
  a pagination UI based on the current page number and total number of pages. Users
  can navigate to different pages by clicking on the page numbers.
*/


export type Props = {
  page: number;
  pages: number;
  onPageChange: (page: number) => void;
};

/**
 * Pagination component for navigating between pages.
 * @param page - Current page number.
 * @param pages - Total number of pages.
 * @param onPageChange - Function to handle page change.
 */
const Pagination = ({ page, pages, onPageChange }: Props) => {
  const pageNumbers = [];
  for (let i = 1; i <= pages; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="flex justify-center">
      <ul className="flex border border-slate-300">
        {pageNumbers.map((number) => (
          <li key={number} className={`px-2 py-1 ${page === number ? "bg-gray-200" : ""}`}>
            <button onClick={() => onPageChange(number)}>{number}</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Pagination;
