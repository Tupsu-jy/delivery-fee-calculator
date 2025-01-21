import { NextApiRequest, NextApiResponse } from 'next';
import { calculateDeliveryFee } from '@/utils/calculator';
import {
  DeliveryFeeRequestData,
  DeliveryFeeResponseData,
  validateDeliveryFeeRequestData,
} from '@/types/models';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  }

  try {
    // Parse and validate the request body
    const data: DeliveryFeeRequestData = req.body;

    if (!validateDeliveryFeeRequestData(data)) {
      return res.status(400).json({ error: 'Invalid request data' });
    }

    // Calculate the delivery fee
    const deliveryFee = calculateDeliveryFee(
      data.cartValue,
      data.deliveryDistance,
      data.numberOfItems,
      data.time
    );

    // Return the response
    const response: DeliveryFeeResponseData = { deliveryFee };
    return res.status(200).json(response);
  } catch (error) {
    console.error('Error processing delivery fee request:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
