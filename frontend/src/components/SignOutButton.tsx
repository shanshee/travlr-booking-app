// Programmer: Londelle Sheehan
// Contact Info: shansheehan@gmail.com
// Date: January 29, 2024
// Version: 1.0
// Purpose: Define a SignOutButton component for the Travlr.com website

// Import necessary dependencies
import { useMutation, useQueryClient } from "react-query";
import * as apiClient from "../api-client";
import { useAppContext } from "../contexts/AppContext";

// SignOutButton component definition
const SignOutButton = () => {
    // Access queryClient and showToast function from AppContext
    const queryClient = useQueryClient();
    const { showToast } = useAppContext();

    // Define mutation for signing out
    const mutation = useMutation(apiClient.signOut, {
        // When sign out is successful
        onSuccess: async () => {
            // Invalidate token validation query
            await queryClient.invalidateQueries("validateToken");
            // Show success message
            showToast({ message: "Signed Out", type: "SUCCESS" });
        },
        // When sign out encounters an error
        onError: (error: Error) => {
            // Show error message
            showToast({ message: error.message, type: "ERROR" });
        },
    });

    // Handler for sign out button click
    const handleClick = () => {
        mutation.mutate(); // Trigger the sign out mutation
    };

    // Render sign out button
    return (
        <button
            onClick={handleClick}
            className="flex bg-orange-500 items-center text-white px-3 font-bold hover:bg-yellow-400"
        >
            Sign Out
        </button>
    );
};

// Export SignOutButton component as default
export default SignOutButton;
