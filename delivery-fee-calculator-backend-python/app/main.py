from fastapi import FastAPI

# Creating FastAPI instance
app = FastAPI()

# Include the delivery fee routes
from .api import delivery_fee_routes
app.include_router(delivery_fee_routes.router)
