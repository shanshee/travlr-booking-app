import { test, expect } from "@playwright/test";
import path from "path";

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

test("should allow user to add a hotel", async ({ page }) => {
    await page.goto(`${UI_URL}add-hotel`);

    await page.locator(`[name="name"]`).fill("Test Hotel");
    await page.locator(`[name="city"]`).fill("Test City");
    await page.locator(`[name="country"]`).fill("Test Country");
    await page.locator(`[name="description"]`).fill("This is the description for the Test Hotel");
    await page.locator(`[name="pricePerNight"]`).fill("100");
   
    await page.selectOption(`select[name="starRating"]`, "3");
    
    await page.getByText("Budget").click();

    await page.getByLabel("Free Wifi").check();
    await page.getByLabel("Parking").check();

    await page.locator(`[name="adultCount"]`).fill("2");
    await page.locator(`[name="childCount"]`).fill("4  ");

    await page.setInputFiles('[name="imageFiles"]', [
        path.join(__dirname, "files", "1.jpg"),
        path.join(__dirname, "files", "2.jpg"),
        path.join(__dirname, "files", "3.jpg"),
    ]);

    await page.getByRole( 'button', {name : "Save"}).click();
    await expect(page.getByText("Hotel Saved")).toBeVisible();

});
