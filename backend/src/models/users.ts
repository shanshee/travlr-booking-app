// Programmer: Londelle Sheehan
// Contact Info: shansheehan@gmail.com
// Date: January 29, 2024
// Version: 1.0
// Purpose: Define user schema and model for MongoDB using Mongoose, including password hashing before saving

import mongoose from "mongoose";
import bcrypt from "bcryptjs";

// Define the structure of user data
export type Usertype = {
    _id: string;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
};

// Define user schema
const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
});

// Middleware to hash the password before saving user data
userSchema.pre("save", async function (next) {
    // Check if password field is modified, then hash the password
    if(this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 8)
    }
    next();
});

// Create user model based on user schema
const User = mongoose.model<Usertype>("User", userSchema);

export default User;
