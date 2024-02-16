from fastapi import FastAPI, HTTPException, Request, status
from fastapi.responses import JSONResponse
from fastapi.exceptions import RequestValidationError
from pydantic import ValidationError
from ..schemas import DeliveryFeeRequest, DeliveryFeeResponse
from ..delivery_fee_calculator import calculate_delivery_fee

router = APIRouter()


@app.exception_handler(RequestValidationError)
async def validation_exception_handler(request: Request, exc: RequestValidationError):
    """
    Handles validation errors. This is a FastAPI-specific exception handler.
    """
    return JSONResponse(
        status_code=status.HTTP_400_BAD_REQUEST,
        content={"error": exc.errors()},
    )


@app.exception_handler(Exception)
async def generic_exception_handler(request: Request, exc: Exception):
    return JSONResponse(
        status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
        content={"error": "An unexpected error occurred"},
    )


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

    - **cart_value**: The value of the shopping cart in cents.
    - **delivery_distance**: The delivery distance in meters.
    - **number_of_items**: The number of items in the cart.
    - **time**: The time when the order was placed, in ISO 8601 format.

    The endpoint calculates the delivery fee considering various factors such as
    cart value, delivery distance, number of items, and the time of the order,
    applying any necessary surcharges based on these parameters.
    """
    fee = calculate_delivery_fee(
        cart_value=request.cart_value,
        delivery_distance=request.delivery_distance,
        number_of_items=request.number_of_items,
        time=request.time
    )

    return DeliveryFeeResponse(delivery_fee=fee)
