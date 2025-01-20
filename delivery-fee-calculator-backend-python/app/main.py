import logging
from .api import delivery_fee_routes
from fastapi import FastAPI
from fastapi import FastAPI, HTTPException, Request, status, APIRouter
from fastapi.responses import JSONResponse
from fastapi.exceptions import RequestValidationError
from pydantic import ValidationError
from fastapi.middleware.cors import CORSMiddleware

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Creating FastAPI instance
app = FastAPI()

# Include the delivery fee routes
app.include_router(delivery_fee_routes.router)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Replace '*' with your domain(s) for production
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.exception_handler(RequestValidationError)
async def validation_exception_handler(request: Request, exc: RequestValidationError):
    """
    Handles validation errors by providing detailed information about what went wrong.
    """
    error_details = [
        {
            # Join location into a dot-separated string
            "field": ".".join(str(loc) for loc in error.get("loc", [])),
            "message": error.get("msg"),
            "type": error.get("type")
        }
        for error in exc.errors()
    ]

    # Log the details to the console
    logger.error(f"Validation error for request: {request.url}")
    for error in error_details:
        logger.error(
            f"Field: {error['field']}, Message: {error['message']}, Type: {error['type']}")

    return JSONResponse(
        status_code=status.HTTP_400_BAD_REQUEST,
        content={
            "error": "Validation error occurred",
            "details": error_details
        },
    )


@app.exception_handler(Exception)
async def generic_exception_handler(request: Request, exc: Exception):
    return JSONResponse(
        status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
        content={"error": "An unexpected error occurred"},
    )
