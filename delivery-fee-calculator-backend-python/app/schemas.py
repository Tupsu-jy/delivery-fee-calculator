from datetime import datetime
from pydantic import BaseModel, Field

# TODO add constraints here to do validation with those
# example constr(min_length=2, max_length=10, regex=r'^[a-zA-Z0-9_]+$')
# also custom validators could be nice maybe

class DeliveryFeeRequest(BaseModel):
    """
    Represents a request for calculating delivery fee.
    
    :param cart_value: The value of the shopping cart in cents.
    :param delivery_distance: The delivery distance in meters.
    :param number_of_items: The number of items in the cart.
    :param time: The order time in ISO 8601 format.
    """
    cart_value: int = Field(..., description="The value of the shopping cart in cents.")
    delivery_distance: int = Field(..., description="The delivery distance in meters.")
    number_of_items: int = Field(..., description="The number of items in the cart.")
    time: datetime = Field(..., description="The time when the order was placed in ISO 8601 format.")

class DeliveryFeeResponse(BaseModel):
    """
    Represents a response to a request for calculating delivery fee.
    
    :param delivery_fee: The value of the delivery fee in cents.
    """
    delivery_fee: int = Field(..., description="The calculated delivery fee in cents.")
