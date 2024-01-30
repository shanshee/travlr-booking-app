// Programmer: Londelle Sheehan
// Contact Info: shansheehan@gmail.com
// Date: January 29, 2024
// Version: 1.0
// Purpose: Define a Toast component for displaying success or error messages

// Import necessary dependencies
import { useEffect } from "react";

// Define props for the Toast component
type ToastProps = {
  message: string;
  type: "SUCCESS" | "ERROR"; // Type of toast (success or error)
  onClose: () => void; // Callback function to close the toast
};

// Toast component definition
const Toast = ({ message, type, onClose }: ToastProps) => {
  useEffect(() => {
    // Set a timer to automatically close the toast after 2000 milliseconds (2 seconds)
    const timer = setTimeout(() => {
      onClose(); // Call the onClose callback to close the toast
    }, 2000);

    // Cleanup function to clear the timer when the component unmounts or changes
    return () => {
      clearTimeout(timer); // Clear the timer to prevent memory leaks
    };
  }, [onClose]); // Run this effect whenever the onClose callback changes

  // Determine styles based on the type of toast (success or error)
  const styles =
    type === "SUCCESS"
      ? "fixed top-4 right-4 z-30 p-4 rounded-md bg-orange-500 text-white max-w-md"
      : "fixed top-4 right-4 z-30 p-4 rounded-md bg-red-600 text-white max-w-md";

  // Render the toast with appropriate styles and message
  return (
    <div className={styles}>
      <div className="flex justify-center items-center">
        <span className="text-lg font-semibold">{message}</span>
      </div>
    </div>
  );
};

// Export Toast component as default
export default Toast;
