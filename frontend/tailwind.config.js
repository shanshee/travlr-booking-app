// Programmer: Londelle Sheehan (shansheehan@gmail.com)
// Date: January 29, 2024
// Version: 1.0
// Purpose: Configuration file for Tailwind CSS.

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
    container: {
      padding: {
        md: "5rem",
      },
    },
  },
  plugins: [],
};