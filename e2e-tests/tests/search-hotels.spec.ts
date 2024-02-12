import {test, expect} from "@playwright/test"

// URL of the UI being tested
const UI_URL = "http://localhost:5173/";

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

test("Should show hotel search results", async({page}) => {
    await page.goto(UI_URL);

    await page.getByPlaceholder("Where are you going?").fill("Portland");
    await page.getByRole("button", {name: "Search"}).click();
    await expect(page.getByText("Hotels found in Portland")).toBeVisible();
    await expect(page.getByText("Oregon Luxury Getaways")).toBeVisible
});

