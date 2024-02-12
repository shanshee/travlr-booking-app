// File: main.jsx
// Programmer: Londelle Sheehan (shansheehan@gmail.com)
// Date: January 29, 2024
// Version: 1.0
// Purpose: Entry point for rendering the React application.

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { QueryClient, QueryClientProvider } from "react-query";
import { AppContextProvider } from "./contexts/AppContext.tsx";
import { SearchContextProvider } from "./contexts/SearchContext.tsx";

// Create a new instance of QueryClient with default options
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0,
    },
  },
});

// Render the application within a React StrictMode for improved development experience
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AppContextProvider>
        <SearchContextProvider>
         <App /> 
        </SearchContextProvider>
      </AppContextProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
