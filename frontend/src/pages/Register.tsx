// Programmer: Londelle Sheehan
// Contact Info: shansheehan@gmail.com
// Date: January 29, 2024
// Version: 1.0
// Purpose: Define a Register component for user registration

// Import necessary dependencies
import { useForm } from "react-hook-form"; // Import useForm hook for form handling
import { useMutation, useQueryClient } from "react-query"; // Import useMutation and useQueryClient hooks for mutations and caching
import * as apiClient from '../api-client'; // Import apiClient functions for API requests
import { useAppContext } from "../contexts/AppContext"; // Import useAppContext hook for accessing application context
import { useNavigate } from "react-router-dom"; // Import useNavigate for programmatic navigation
import React from "react"; // Import React

// Define type for form data
export type RegisterFormData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

// Register component definition
const Register = () => {
  const queryClient = useQueryClient(); // Access queryClient for invalidating queries
  const navigate = useNavigate(); // Access navigate for programmatic navigation
  const { showToast } = useAppContext(); // Access showToast function from AppContext
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>(); // Use useForm hook to manage form state and validation

  // Define mutation for user registration
  const mutation = useMutation(apiClient.register, {
    // When registration is successful
    onSuccess: async () => {
      showToast({message: "Registration Successful", type: "SUCCESS"}); // Show success message
      await queryClient.invalidateQueries("validateToken"); // Invalidate token validation query
      navigate("/"); // Navigate to home page
    },
    // When registration encounters an error
    onError: (error: Error)=> {
      showToast({message: error.message, type: "ERROR"}); // Show error message
    }
  }); 

  // Handler for form submission
  const onSubmit = handleSubmit((data) => {
    mutation.mutate(data); // Trigger the registration mutation
  });

  // Render registration form
  return (
    <form className="flex flex-col gap-5" onSubmit={onSubmit}>
      <h2 className="text-3xl font-bold">Create an Account</h2>
      {/* First name and last name fields */}
      <div className="flex flex-col md:flex-row gap-5">
        <label className="text-gray-700 text-sm font-bold flex-1">
          First Name
          <input
            className="border rounded w-full py-1 px-2 font-normal"
            {...register("firstName", { required: "This field is required" })}
          ></input>
          {errors.firstName && (
            <span className="text-red-500">{errors.firstName.message}</span>
          )}
        </label>
        <label className="text-gray-700 text-sm font-bold flex-1">
          Last Name
          <input
            className="border rounded w-full py-1 px-2 font-normal"
            {...register("lastName", { required: "This field is required" })}
          ></input>
          {errors.lastName && (
            <span className="text-red-500">{errors.lastName.message}</span>
          )}
        </label>
      </div>
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
      {/* Confirm password field */}
      <label className="text-gray-700 text-sm font-bold flex-1">
        Confirm Password
        <input
          type="password"
          className="border rounded w-full py-1 px-2 font-normal"
          {...register("confirmPassword", {
            validate: (val) => {
              if (!val) {
                return "This field is required";
              } else if (watch("password") !== val) {
                return "Your passwords do not match";
              }
            },
          })}
        ></input>
        {errors.confirmPassword && (
            <span className="text-red-500">{errors.confirmPassword.message}</span>
          )}
      </label>
      {/* Submit button */}
      <span>
        <button
          type="submit"
          className="bg-orange-500 text-white p-2 font-bold hover:bg-yellow-400 text-xl"
        >
          Create Account
        </button>
      </span>
    </form>
  );
};

export default Register; // Export Register component as default
