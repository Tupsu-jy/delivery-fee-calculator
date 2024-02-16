from .api import delivery_fee_routes
from fastapi import FastAPI

# Creating FastAPI instance
app = FastAPI()

# Include the delivery fee routes
app.include_router(delivery_fee_routes.router)
