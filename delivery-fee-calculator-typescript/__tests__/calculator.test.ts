import { calculateDeliveryFee } from "../utils/calculator";

describe("calculateDeliveryFee", () => {
  it("should correctly calculate the total delivery fee for cart value 790, distance 2235, 4 items, and non-rush hour time", () => {
    const cartValue = 790; // in cents
    const deliveryDistance = 2235; // in meters
    const numberOfItems = 4;
    const time = "2024-01-15T13:00:00Z"; // ISO 8601 format

    const result = calculateDeliveryFee(cartValue, deliveryDistance, numberOfItems, time);

    // Assert the result
    expect(result).toBe(710); // The expected delivery fee in cents
  });
});
