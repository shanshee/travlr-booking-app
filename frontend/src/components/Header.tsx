// Programmer: Londelle Sheehan
// Contact Info: shansheehan@gmail.com
// Date: January 29, 2024
// Version: 1.0
// Purpose: Define a Header component for the Travlr.com website

// Import necessary dependencies
import { Link } from "react-router-dom";
import { useAppContext } from "../contexts/AppContext";
import SignOutButton from "./SignOutButton";

// Header component definition
const Header = () => {
  // Access isLoggedIn state from AppContext
  const { isLoggedIn } = useAppContext();

  return (
    // Render a header with a yellow background and padding
    <div className="bg-yellow-400 py-6">
      {/* Container for centering content horizontally */}
      <div className="container mx-auto flex justify-between">
        {/* Branding */}
        <span className="text-3xl text-orange-500 font-bold tracking-tight">
          {/* Link to home page */}
          <Link to="/">Travlr.com</Link>
        </span>
        {/* Navigation links */}
        <span className="flex space-x-2">
          {isLoggedIn ? ( // If user is logged in
            <>
              {/* Link to My Bookings page */}
              <Link className="flex items-center text-white px-3 font-bold" to="/my-bookings">My Bookings</Link>
              {/* Link to My Hotels page */}
              <Link className="flex items-center text-white px-3 font-bold" to="/my-hotels">My Hotels</Link>
              {/* Sign out button */}
              <SignOutButton />
            </>
          ) : (
            // If user is not logged in, render sign in link
            <Link
              to="/sign-in"
              className="flex bg-orange-500 items-center text-white px-3 font-bold hover:bg-yellow-400"
            >
              Sign In
            </Link>
          )}
        </span>
      </div>
    </div>
  );
};

// Export Header component as default
export default Header;
