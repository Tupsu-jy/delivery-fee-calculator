export type DeliveryFeeRequestData = {
  cartValue: number;
  deliveryDistance: number;
  numberOfItems: number;
  time: string;
};

export const validateDeliveryFeeRequestData = (data: DeliveryFeeRequestData): boolean => {
  const isCartValueValid = data.cartValue >= 0;
  const isDeliveryDistanceValid = data.deliveryDistance >= 0;
  const isNumberOfItemsValid = Number.isInteger(data.numberOfItems) && data.numberOfItems >= 0;
  const isTimeValid = !isNaN(Date.parse(data.time)); // Basic check for valid ISO 8601 format

  return isCartValueValid && isDeliveryDistanceValid && isNumberOfItemsValid && isTimeValid;
};

export type DeliveryFeeResponseData = {
  deliveryFee: number;
};