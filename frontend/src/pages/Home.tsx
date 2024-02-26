// File: Home.jsx
// Author: Londelle Sheehan
// Contact Info: shansheehan@gmail.com
// Date: February 24, 2024
// Version: 1.0
// Purpose: This component serves as the homepage for the application, showcasing the top destinations currently available. It fetches a list of hotels from the backend and displays them in two sections: "Top Row" for the first two hotels and "Bottom Row" for the rest. Each hotel is displayed using the LatestDestinationCard component.

import { useQuery } from "react-query";
import * as apiClient from "../api-client";
import LatestDestinationCard from "../components/LatestDestinationCard";

const Home = () => {
  // Fetch hotels data using react-query's useQuery hook
  // "fetchQuery" is the unique key for the query, and apiClient.fetchHotels is the fetch function
  const { data: hotels } = useQuery("fetchQuery", () =>
    apiClient.fetchHotels()
  );

  // Splits the fetched hotels array into two parts for different display sections
  // topRowHotels contains the first two hotels, while bottomeRowHotels contains the rest
  const topRowHotels = hotels?.slice(0, 2) || [];
  const bottomeRowHotels = hotels?.slice(2) || [];

  return (
    <div className="space-y-3">
      <h2 className="text-3xl font-bold"> Top Destinations </h2>
      <p>New destinations added by our hosts</p>
      <div className="grid gap-4">
        <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
          {topRowHotels.map((hotel) => (
            <LatestDestinationCard key={hotel._id} hotel={hotel} /> 
          ))}
        </div>
        <div className="grid md:grid-cols-3 gap-4">
          {bottomeRowHotels.map((hotel) => (
            <LatestDestinationCard key={hotel._id} hotel={hotel} /> 
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
