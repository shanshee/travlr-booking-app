// Programmer: Londelle Sheehan (shansheehan@gmail.com)
// Date: February 4, 2024
// Version: 1.1
// Purpose: Defines the main routing configuration for the application.

import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Layout from "./layouts/Layout";
import Register from "./pages/Register";
import SignIn from "./pages/SignIn";
import AddHotel from "./pages/AddHotel";
import { useAppContext } from "./contexts/AppContext";
import MyHotels from "./pages/MyHotels";
import EditHotel from "./pages/EditHotel";
import Search from "./pages/Search";
import Detail from "./pages/Details";
import Booking from "./pages/Bookings";

/**
 * Main component defining the routing configuration for the application.
 */
const App = () => {
  const { isLoggedIn } = useAppContext();
  return (
    <Router>
      <Routes>
        {/* Route for the home page */}
        <Route
          path="/"
          element={
            <Layout>
              <p>Home Page</p>
            </Layout>
          }
        />
        {/* Route for the registration page */}
        <Route
          path="/register"
          element={
            <Layout>
              <Register />
            </Layout>
          }
        />
        {/* Route for the sign-in page */}
        <Route
          path="/sign-in"
          element={
            <Layout>
              <SignIn />
            </Layout>
          }
        />

        {isLoggedIn && (
          <>
            <Route
              path="/hotel/:hotelId/booking"
              element={
                <Layout>
                  <Booking />
                </Layout>
              }
            />
            <Route
              path="/add-hotel"
              element={
                <Layout>
                  <AddHotel />
                </Layout>
              }
            />
          </>
        )}

        {/* Route for the search page */}
        <Route
          path="/search"
          element={
            <Layout>
              <Search/>
            </Layout>
          }
        />
        {/* Route for the details page */}
        <Route
          path="/detail/:hotelId"
          element={
            <Layout>
              <Detail />
            </Layout>
          }
        />
        {/* Route for editing a hotel */}
        <Route
              path="/edit-hotel/:hotelId"
              element={
                <Layout>
                  <EditHotel />
                </Layout>
              }
            />
        {/* Route for user's hotels */}
        <Route
              path="/my-hotels"
              element={
                <Layout>
                  <MyHotels />
                </Layout>
              }
            />
        {/* Default route to redirect to the home page if the entered URL does not match any route */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default App;
