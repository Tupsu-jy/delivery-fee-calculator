import { DeliveryFeeRequestData, DeliveryFeeResponseData } from "@/types/models";


export const calculateDeliveryFeeKotlin = async (data: DeliveryFeeRequestData): Promise<DeliveryFeeResponseData> => {
  const response = await fetch('http://localhost:8080/deliveryFee', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error(`Error: ${response.status}`);
  }

  return response.json();
};

export const calculateDeliveryFeePython = async (data: DeliveryFeeRequestData): Promise<DeliveryFeeResponseData> => {
  const response = await fetch('http://localhost:8000/delivery-fee', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error(`Error: ${response.status}`);
  }

  return response.json();
};
