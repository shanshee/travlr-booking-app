// Programmer: Londelle Sheehan (Contact: shansheehan@gmail.com)
// Date: February 11, 2024
// Version: 1.0
// Purpose: This file contains end-to-end tests to ensure that the hotel search functionality works as expected.
// It tests the behavior of the search feature, including searching for hotels in a specific location and verifying the displayed search results.

import { test, expect } from "@playwright/test";

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

// Test case to verify view hotel details functionality
test("Should show hotel detail", async ({ page }) => {
  await page.goto(UI_URL);

  // Search for hotels in Portland
  await page.getByPlaceholder("Where are you going?").fill("Portland");
  await page.getByRole("button", { name: "Search" }).click();

  // Verify that the search results are displayed
  await page.getByText("Oregon Luxury Getaways").click();
  await expect(page).toHaveURL(/detail/);
  await expect(page.getByRole("button", { name: "Book now" })).toBeVisible();
});

test("should book hotel", async ({ page }) => {
  await page.goto(UI_URL);

  // Search for hotels in Portland
  await page.getByPlaceholder("Where are you going?").fill("Portland");

  const date = new Date();
  date.setDate(date.getDate() + 3);
  const formattedDate = date.toISOString().split("T")[0];
  await page.getByPlaceholder("Check-out Date").fill(formattedDate);

  await page.getByRole("button", { name: "Search" }).click();

  // Verify that the search results are displayed
  await page.getByText("Oregon Luxury Getaways").click();
  await page.getByRole("button", { name: "Book now" }).click();

  await expect(page.getByText("Total Cost: $2310.00")).toBeVisible();

  const stripeFrame = page.frameLocator("iframe").first();
  await stripeFrame
    .locator('[placeholder="Card number"]')
    .fill("42424242424242424")
  await stripeFrame.locator('[placeholder="MM / YY"]').fill("04/30")
  await stripeFrame.locator('[placeholder="CVC"]').fill("123")
  await stripeFrame.locator('[placeholder="ZIP"]').fill("12345")

  await page.getByRole("button", { name: "Confirm Booking" }).click();
  await expect(page.getByText("Booking Saved")).toBeVisible();
});
