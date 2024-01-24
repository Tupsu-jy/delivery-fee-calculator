import pytest
from app.delivery_fee_calculator import (
    calculate_delivery_fee,
    calculate_delivery_distance_fee,
    calculate_small_order_surcharge,
    calculate_item_surcharge,
    calculate_bulk_surcharge,
    calculate_rush_hour_surcharge,
    apply_delivery_fee_limits,
)
from tests.test_data_loader import load_test_data

test_data=load_test_data()

# Parameterized tests for calculate_delivery_fee function
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
def test_calculate_delivery_fee(cart_value, delivery_distance, number_of_items, time, expected_fee):
    """
    Test the calculate_delivery_fee function with various input scenarios.
    
    Args:
        cart_value (int): The value of the shopping cart in cents.
        delivery_distance (int): The delivery distance in meters.
        number_of_items (int): The number of items in the cart.
        time (datetime): The order time as a datetime object.
        expected_fee (int): The expected calculated delivery fee in cents.
    """
    result = calculate_delivery_fee(cart_value, delivery_distance, number_of_items, time)
    assert result == expected_fee

# Parameterized tests for calculate_delivery_distance_fee function
@pytest.mark.parametrize(
    "distance, expected_fee",
    [
        (test_case["distance"], test_case["expected_fee"])
        for test_case in test_data["calculateDeliveryDistanceFee"]
    ],
)
def test_calculate_delivery_distance_fee(distance, expected_fee):
    """
    Test the calculate_delivery_distance_fee function with different delivery distances.
    
    Args:
        distance (int): The delivery distance in meters.
        expected_fee (int): The expected calculated delivery distance fee in cents.
    """
    result = calculate_delivery_distance_fee(distance)
    assert result == expected_fee

# Parameterized tests for calculate_small_order_surcharge function
@pytest.mark.parametrize(
    "cart_value, expected_surcharge",
    [
        (test_case["cart_value"], test_case["expected_surcharge"])
        for test_case in test_data["calculateSmallOrderSurcharge"]
    ],
)
def test_calculate_small_order_surcharge(cart_value, expected_surcharge):
    """
    Test the calculate_small_order_surcharge function with different cart values.
    
    Args:
        cart_value (int): The value of the shopping cart in cents.
        expected_surcharge (int): The expected calculated small order surcharge in cents.
    """
    result = calculate_small_order_surcharge(cart_value)
    assert result == expected_surcharge

# Parameterized tests for calculate_item_surcharge function
@pytest.mark.parametrize(
    "number_of_items, expected_surcharge",
    [
        (test_case["number_of_items"], test_case["expected_surcharge"])
        for test_case in test_data["calculateItemSurcharge"]
    ],
)
def test_calculate_item_surcharge(number_of_items, expected_surcharge):
    """
    Test the calculate_item_surcharge function with different numbers of items.
    
    Args:
        number_of_items (int): The number of items in the cart.
        expected_surcharge (int): The expected calculated item surcharge in cents.
    """
    result = calculate_item_surcharge(number_of_items)
    assert result == expected_surcharge

# Parameterized tests for calculate_bulk_surcharge function
@pytest.mark.parametrize(
    "number_of_items, expected_surcharge",
    [
        (test_case["number_of_items"], test_case["expected_surcharge"])
        for test_case in test_data["calculateBulkSurcharge"]
    ],
)
def test_calculate_bulk_surcharge(number_of_items, expected_surcharge):
    """
    Test the calculate_bulk_surcharge function with different numbers of items.
    
    Args:
        number_of_items (int): The number of items in the cart.
        expected_surcharge (int): The expected calculated bulk surcharge in cents.
    """
    result = calculate_bulk_surcharge(number_of_items)
    assert result == expected_surcharge

# Parameterized tests for calculate_rush_hour_surcharge function
@pytest.mark.parametrize(
    "time, delivery_fee, expected_surcharge",
    [
        (test_case["time"], test_case["delivery_fee"], test_case["expected_surcharge"])
        for test_case in test_data["calculateRushHourSurcharge"]
    ],
)
def test_calculate_rush_hour_surcharge(time, delivery_fee, expected_surcharge):
    """
    Test the calculate_rush_hour_surcharge function with different order times and delivery fees.
    
    Args:
        time (datetime): The order time as a datetime object.
        delivery_fee (int): The delivery fee in cents.
        expected_surcharge (int): The expected calculated rush hour surcharge in cents.
    """
    result = calculate_rush_hour_surcharge(delivery_fee, time)
    assert result == expected_surcharge

# Parameterized tests for apply_delivery_fee_limits function
@pytest.mark.parametrize(
    "delivery_fee, cart_value, expected_fee",
    [
        (test_case["delivery_fee"], test_case["cart_value"], test_case["expected_fee"])
        for test_case in test_data["applyDeliveryFeeLimits"]
    ],
)
def test_apply_delivery_fee_limits(delivery_fee, cart_value, expected_fee):
    """
    Test the apply_delivery_fee_limits function with different delivery fees and cart values.
    
    Args:
        delivery_fee (int): The delivery fee in cents.
        cart_value (int): The value of the shopping cart in cents.
        expected_fee (int): The expected delivery fee with applied limits in cents.
    """
    result = apply_delivery_fee_limits(delivery_fee, cart_value)
    assert result == expected_fee
