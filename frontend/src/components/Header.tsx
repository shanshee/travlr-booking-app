import { Link } from "react-router-dom";
import { useAppContext } from "../contexts/AppContext";
import SignOutButton from "./SignOutButton";

const Header = () => {
  const { isLoggedIn } = useAppContext();
  return (
    <div className="bg-yellow-400 py-6">
      <div className="container mx-auto flex justify-between">
        <span className="text-3xl text-orange-500 font-bold tracking-tight">
          <Link to="/">Travlr.com</Link>
        </span>
        <span className="flex space-x-2">
          {isLoggedIn ? (
            <>
              <Link className="flex items-center text-white px-3 font-bold " to="/my-bookings">My Bookings</Link>
              <Link className="flex items-center text-white px-3 font-bold " to="/my-hotels">My Hotels</Link>
              <SignOutButton />
            </>
          ) : (
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

export default Header;
