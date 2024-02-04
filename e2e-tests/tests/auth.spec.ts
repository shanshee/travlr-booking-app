// Programmer: Londelle Sheehan
// Contact Info: shansheehan@gmail.com
// Date: January 29, 2024
// Version: 1.0
// Purpose: Automated UI tests using Playwright for user sign-in and registration

import { test, expect } from "@playwright/test";

// URL of the UI being tested
const UI_URL = "http://localhost:5173/";

// Test case to check user sign-in functionality
test("should allow the user to sign in", async ({ page }) => {
  // Navigate to the UI URL
  await page.goto(UI_URL);

  // Click on the "Sign In" button
  await page.getByRole("link", { name: "Sign In" }).click();

  // Verify that the "Sign In" heading is visible
  await expect(page.getByRole("heading", { name: "Sign In" })).toBeVisible();

  // Fill in email and password fields
  await page.locator("[name=email]").fill("test@test.com");
  await page.locator("[name=password]").fill("123456");

  // Click on the "Login" button
  await page.getByRole("button", { name: "Login" }).click();

  // Verify successful sign-in
  await expect(page.getByText("Sign in Success")).toBeVisible();
  await expect(page.getByRole("link", { name: "My Bookings" })).toBeVisible();
  await expect(page.getByRole("link", { name: "My Hotels" })).toBeVisible();
  await expect(page.getByRole("button", { name: "Sign Out" })).toBeVisible();
});

// Test case to check user registration functionality
test("should allow user to register", async ({ page }) => {
  // Generate a random test email
  const testEmail = `test_register_${Math.floor(Math.random() * 90000) + 10000}@test.com`;

  // Navigate to the UI URL
  await page.goto(UI_URL);

  // Click on the "Sign In" button and then on "Create an account here" link
  await page.getByRole("link", { name: "Sign In" }).click();
  await page.getByRole("link", { name: "Create an account here" }).click();

  // Verify that the "Create an Account" heading is visible
  await expect(page.getByRole("heading", { name: "Create an Account" })).toBeVisible();

  // Fill in registration form fields
  await page.locator("[name=firstName]").fill("test_firstName");
  await page.locator("[name=lastName]").fill("test_lastName");
  await page.locator("[name=email]").fill(testEmail);
  await page.locator("[name=password]").fill("password123");
  await page.locator("[name=confirmPassword]").fill("password123");

  // Click on the "Create Account" button
  await page.getByRole("button", { name: "Create Account" }).click();

  // Verify successful registration
  await expect(page.getByText("Registration Successful")).toBeVisible();
  await expect(page.getByRole("link", { name: "My Bookings" })).toBeVisible();
  await expect(page.getByRole("link", { name: "My Hotels" })).toBeVisible();
  await expect(page.getByRole("button", { name: "Sign Out" })).toBeVisible();
});
