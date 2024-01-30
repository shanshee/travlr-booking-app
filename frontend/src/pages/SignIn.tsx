// Programmer: Londelle Sheehan
// Contact Info: shansheehan@gmail.com
// Date: January 29, 2024
// Version: 1.0
// Purpose: Define a SignIn component for user authentication

// Import necessary dependencies
import { useForm } from "react-hook-form"; // Import useForm hook for form handling
import { useMutation, useQueryClient } from "react-query"; // Import useMutation and useQueryClient hooks for mutations and caching
import * as apiClient from "../api-client"; // Import apiClient functions for API requests
import { useAppContext } from "../contexts/AppContext"; // Import useAppContext hook for accessing application context
import { Link, useNavigate } from "react-router-dom"; // Import Link and useNavigate for programmatic navigation
import React from "react"; // Import React

// Define type for form data
export type SignInFormData = {
  email: string;
  password: string;
};

// SignIn component definition
const SignIn = () => {
  const { showToast } = useAppContext(); // Access showToast function from AppContext
  const navigate = useNavigate(); // Access navigate for programmatic navigation
  const queryClient = useQueryClient(); // Access queryClient for invalidating queries

  // Use useForm hook to manage form state and validation
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<SignInFormData>();

  // Define mutation for user sign in
  const mutation = useMutation(apiClient.signIn, {
    // When sign in is successful
    onSuccess: async () => {
      showToast({ message: "Sign in Successful", type: "SUCCESS" }); // Show success message
      await queryClient.invalidateQueries("validateToken"); // Invalidate token validation query
      navigate("/"); // Navigate to home page
    },
    // When sign in encounters an error
    onError: (error: Error) => {
      showToast({ message: error.message, type: "ERROR" }); // Show error message
    },
  });

  // Handler for form submission
  const onSubmit = handleSubmit((data) => {
    mutation.mutate(data); // Trigger the sign in mutation
  });

  // Render sign in form
  return (
    <form className="flex flex-col gap-5" onSubmit={onSubmit}>
      <h2 className="text-3xl font-bold">Sign In</h2>

      {/* Email field */}
      <label className="text-gray-700 text-sm font-bold flex-1">
        Email
        <input
          type="email"
          className="border rounded w-full py-1 px-2 font-normal"
          {...register("email", { required: "This field is required" })}
        ></input>
        {errors.email && (
          <span className="text-red-500">{errors.email.message}</span>
        )}
      </label>
      
      {/* Password field */}
      <label className="text-gray-700 text-sm font-bold flex-1">
        Password
        <input
          type="password"
          className="border rounded w-full py-1 px-2 font-normal"
          {...register("password", {
            required: "This field is required",
            minLength: {
              value: 6,
              message: "Password must be atleast 6 characters",
            },
          })}
        ></input>
        {errors.password && (
          <span className="text-red-500">{errors.password.message}</span>
        )}
      </label>
      
      {/* Link to registration page */}
      <span className="flex items-center justify-between">
        <span className="text-sm">
          Not Registered? {" "}
          <Link className="underline" to="/register">
            Create an account here.
          </Link>
        </span>
        {/* Submit button */}
        <button
          type="submit"
          className="bg-orange-500 text-white p-2 font-bold hover:bg-yellow-400 text-xl"
        >
          Login
        </button>
      </span>
    </form>
  );
};

export default SignIn; // Export SignIn component as default
