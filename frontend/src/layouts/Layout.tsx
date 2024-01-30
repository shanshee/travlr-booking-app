// Programmer: Londelle Sheehan
// Contact Info: shansheehan@gmail.com
// Date: January 29, 2024
// Version: 1.0
// Purpose: Define a Layout component for structuring the overall page layout

// Import necessary dependencies
import Footer from "../components/Footer"; // Import Footer component
import Header from "../components/Header"; // Import Header component
import Hero from "../components/Hero"; // Import Hero component
import React from "react"; // Import React

// Define Props interface for Layout component
interface Props {
  children: React.ReactNode; // Children components to be rendered inside the layout
}

// Layout component definition
const Layout = ({ children }: Props) => {
  return (
    // Render a flex container with a minimum height of the screen
    <div className="flex flex-col min-h-screen">
      <Header /> {/* Render Header component */}
      <Hero /> {/* Render Hero component */}
      {/* Main content container with padding and flex-grow */}
      <div className="container mx-auto py-10 flex-1">
        {children} {/* Render children components */}
      </div>
      <Footer /> {/* Render Footer component */}
    </div>
  );
};

// Export Layout component as default
export default Layout;
