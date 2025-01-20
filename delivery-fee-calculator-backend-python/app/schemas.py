from datetime import datetime
from pydantic import BaseModel, Field


class DeliveryFeeRequest(BaseModel):
    """
    Represents a request for calculating delivery fee.

    :param cartValue: The value of the shopping cart in cents.
    :param deliveryDistance: The delivery distance in meters.
    :param numberOfItems: The number of items in the cart.
    :param time: The order time in ISO 8601 format.
    """
    cartValue: int = Field(..., ge=0,
                           description="The value of the shopping cart in cents.")
    deliveryDistance: int = Field(..., ge=0,
                                  description="The delivery distance in meters.")
    numberOfItems: int = Field(..., ge=0,
                               description="The number of items in the cart.")
    time: datetime = Field(...,
                           description="The time when the order was placed in ISO 8601 format.")


class DeliveryFeeResponse(BaseModel):
    """
    Represents a response to a request for calculating delivery fee.

    :param delivery_fee: The value of the delivery fee in cents.
    """
    deliveryFee: int = Field(...,  ge=0,
                             description="The calculated delivery fee in cents.")
