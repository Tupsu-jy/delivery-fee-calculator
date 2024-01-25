import pytest
from fastapi.testclient import TestClient
from app.main import app
from tests.test_data_loader import load_test_data

client = TestClient(app)
test_data = load_test_data()

# Parameterized test for the FastAPI endpoint using test_data


@pytest.mark.parametrize(
    "cart_value, delivery_distance, number_of_items, time, expected_fee",
    [
        (test_case["cart_value"],
         test_case["delivery_distance"],
         test_case["number_of_items"],
         test_case["time"],
         test_case["expected_fee"])
        for test_case in test_data["calculateDeliveryFee"]
    ],
)
def test_calculate_fee_endpoint(cart_value, delivery_distance, number_of_items, time, expected_fee):
    request_data = {
        "cart_value": cart_value,
        "delivery_distance": delivery_distance,
        "number_of_items": number_of_items,
        "time": time
    }

    # Make a POST request to the endpoint
    response = client.post("/delivery-fee", json=request_data)

    # Assert the response
    assert response.status_code == 200
    response_data = response.json()
    assert response_data['delivery_fee'] == expected_fee
