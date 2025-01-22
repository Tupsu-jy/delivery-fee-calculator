from fastapi import FastAPI, HTTPException, Request, status, APIRouter
from fastapi.responses import JSONResponse
from fastapi.exceptions import RequestValidationError
from pydantic import ValidationError
from ..schemas import DeliveryFeeRequest, DeliveryFeeResponse
from ..delivery_fee_calculator import calculate_delivery_fee

router = APIRouter()


@router.post(
    "/delivery-fee",
    response_model=DeliveryFeeResponse,
    summary="Calculate Delivery Fee",
    description="Calculates the total delivery fee based on the cart value, delivery distance, number of items, and time of order.",
    tags=["Delivery Fee"]
)
async def calculate_fee_endpoint(request: DeliveryFeeRequest):
    """
    Endpoint to calculate the delivery fee.

    - **cartValue**: The value of the shopping cart in cents.
    - **deliveryDistance**: The delivery distance in meters.
    - **numberOfItems**: The number of items in the cart.
    - **time**: The time when the order was placed, in ISO 8601 format.

    The endpoint calculates the delivery fee considering various factors such as
    cart value, delivery distance, number of items, and the time of the order,
    applying any necessary surcharges based on these parameters. CamelCase used 
    in order to be compatible with frontend.
    """
    fee = calculate_delivery_fee(
        cart_value=request.cartValue,
        delivery_distance=request.deliveryDistance,
        number_of_items=request.numberOfItems,
        time=request.time
    )

    return DeliveryFeeResponse(deliveryFee=fee)
