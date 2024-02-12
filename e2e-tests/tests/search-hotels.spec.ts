// Programmer: Londelle Sheehan (Contact: shansheehan@gmail.com)
// Date: February 11, 2024
// Version: 1.0
// Purpose: This file contains end-to-end tests to ensure that the hotel search functionality works as expected.
// It tests the behavior of the search feature, including searching for hotels in a specific location and verifying the displayed search results.

import { test, expect } from "@playwright/test"

// URL of the UI being tested
const UI_URL = "http://localhost:5173/";

// Set up test environment before each test case
test.beforeEach(async ({ page }) => {
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
});

// Test case to verify hotel search functionality
test("Should show hotel search results", async ({ page }) => {
  await page.goto(UI_URL);

  // Search for hotels in Portland
  await page.getByPlaceholder("Where are you going?").fill("Portland");
  await page.getByRole("button", { name: "Search" }).click();

  // Verify that the search results are displayed
  await expect(page.getByText("Hotels found in Portland")).toBeVisible();
  await expect(page.getByText("Oregon Luxury Getaways")).toBeVisible();
});
