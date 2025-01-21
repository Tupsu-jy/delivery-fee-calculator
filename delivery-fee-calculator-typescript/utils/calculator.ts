/**
 * Calculates the total delivery fee based on various parameters.
 *
 * @param cartValue - The value of the shopping cart in cents.
 * @param deliveryDistance - The delivery distance in meters.
 * @param numberOfItems - The number of items in the cart.
 * @param time - The order time in ISO 8601 format.
 * @returns The calculated delivery fee in cents.
 */
export function calculateDeliveryFee(
    cartValue: number,
    deliveryDistance: number,
    numberOfItems: number,
    time: string
  ): number {
    let deliveryFee = 0;
  
    deliveryFee += calculateDeliveryDistanceFee(deliveryDistance);
    deliveryFee += calculateSmallOrderSurcharge(cartValue);
    deliveryFee += calculateItemSurcharge(numberOfItems);
    deliveryFee += calculateBulkSurcharge(numberOfItems);
  
    // Parse the ISO 8601 time string to a Date object
    const orderTime = new Date(time);
  
    // Rush hour surcharge is applied after the other surcharges
    deliveryFee += calculateRushHourSurcharge(deliveryFee, orderTime);
  
    return applyDeliveryFeeLimits(deliveryFee, cartValue);
  }
  
  /**
   * Calculates the delivery distance fee based on the delivery distance.
   * The fee is calculated as follows: 2€ base fee + 1€ per every 500m over 1km. Round up to nearest 500m.
   *
   * @param deliveryDistance - The delivery distance in meters.
   * @returns The calculated delivery distance fee in cents.
   */
  function calculateDeliveryDistanceFee(deliveryDistance: number): number {
    let fee = 200; // 2€ base fee
    if (deliveryDistance > 1000) {
      fee += Math.ceil((deliveryDistance - 1000) / 500) * 100; // 1€ per 500m
    }
    return fee;
  }
  
  /**
   * Calculates the small order surcharge based on the cart value.
   * The surcharge is calculated as follows: 10€ minus the cart value,
   * if the cart value is less than 10€, otherwise 0€.
   *
   * @param cartValue - The value of the shopping cart in cents.
   * @returns The calculated small order surcharge in cents.
   */
  function calculateSmallOrderSurcharge(cartValue: number): number {
    return cartValue < 1000 ? 1000 - cartValue : 0;
  }
  
  /**
   * Calculates the item surcharge based on the number of items in the cart.
   * The surcharge is calculated as follows: 50 cents per item over 4, otherwise 0€.
   *
   * @param numberOfItems - The number of items in the cart.
   * @returns The calculated item surcharge in cents.
   */
  function calculateItemSurcharge(numberOfItems: number): number {
    return numberOfItems > 4 ? (numberOfItems - 4) * 50 : 0;
  }
  
  /**
   * Calculates the bulk surcharge based on the number of items in the cart.
   * The surcharge is calculated as follows: 1.20€ if over 12 items, otherwise 0€.
   *
   * @param numberOfItems - The number of items in the cart.
   * @returns The calculated bulk surcharge in cents.
   */
  function calculateBulkSurcharge(numberOfItems: number): number {
    return numberOfItems > 12 ? 120 : 0;
  }
  
  /**
   * Applies a rush hour multiplier to the delivery fee based on the order time.
   * The multiplier is applied as follows: 20% increase on Fridays between 3pm and 6pm,
   * otherwise no multiplier.
   *
   * @param deliveryFee - The delivery fee to apply the multiplier to.
   * @param orderTime - The order time as a Date object.
   * @returns The rush hour surcharge.
   */
  function calculateRushHourSurcharge(deliveryFee: number, orderTime: Date): number {
    const isFriday = orderTime.getDay() === 5; // 5 = Friday
    const hour = orderTime.getHours();
    const isRushHour = hour >= 15 && hour <= 18;
    return isFriday && isRushHour ? Math.floor(deliveryFee * 0.2) : 0;
  }
  
  /**
   * Applies limits to the delivery fee. The limits are applied as follows:
   * The delivery is free if the cart value is over 200€. The delivery fee cannot be more than 15€.
   *
   * @param deliveryFee - The delivery fee to apply the limits to.
   * @param cartValue - The value of the shopping cart in cents.
   * @returns The delivery fee with the limits applied.
   */
  function applyDeliveryFeeLimits(deliveryFee: number, cartValue: number): number {
    if (cartValue >= 20000) {
      return 0; // Delivery is free if cart value is over 200€
    }
    return Math.min(deliveryFee, 1500); // Delivery fee cannot exceed 15€
  }
  