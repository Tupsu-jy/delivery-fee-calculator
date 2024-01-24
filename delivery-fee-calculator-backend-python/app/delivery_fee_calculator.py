
def calculate_delivery_fee(cart_value, delivery_distance, number_of_items, time):
    """
    Calculates the total delivery fee based on various parameters.
    
    :param cart_value: The value of the shopping cart in cents.
    :param delivery_distance: The delivery distance in meters.
    :param number_of_items: The number of items in the cart.
    :param time: The order time in ISO 8601 format.
    :return: The calculated delivery fee in cents.
    """
    delivery_fee = 0
    delivery_fee += calculate_delivery_distance_fee(delivery_distance)
    delivery_fee += calculate_small_order_surcharge(cart_value)
    delivery_fee += calculate_item_surcharge(number_of_items)
    delivery_fee += calculate_bulk_surcharge(number_of_items)
    # Rush hour surcharge is applied after the other surcharges, because it is calculated from the total delivery fee.
    delivery_fee += calculate_rush_hour_surcharge(delivery_fee, time)
    return apply_delivery_fee_limits(delivery_fee, cart_value)

def calculate_delivery_distance_fee(delivery_distance):
    """
    Calculates the delivery distance fee based on the delivery distance. 
    The fee is calculated as follows: 2€ base fee + 1€ per every 500m over 1km. 
    Round up to nearest 500m.
    
    :param delivery_distance: The delivery distance in meters.
    :return: The calculated delivery distance fee in cents.
    """
    # 2€ base fee
    fee = 200
    # 1€ per every 500m over 1km. Round up to nearest 500m.
    if delivery_distance > 1000:
        fee += ((delivery_distance - 1000 + 499) // 500) * 100
    return fee

def calculate_small_order_surcharge(cart_value):
    """
    Calculates the small order surcharge based on the cart value. 
    The surcharge is calculated as follows: 10€ minus the cart value, 
    if the cart value is less than 10€, otherwise 0€.
    
    :param cart_value: The value of the shopping cart in cents.
    :return: The calculated small order surcharge in cents.
    """
    return 1000 - cart_value if cart_value < 1000 else 0

def calculate_item_surcharge(number_of_items):
    """
    Calculates the item surcharge based on the number of items in the cart. 
    The surcharge is calculated as follows: 50 cents per items over 4, otherwise 0€.
    
    :param number_of_items: The number of items in the cart.
    :return: The calculated item surcharge in cents.
    """
    return 50 * (number_of_items - 4) if number_of_items >= 5 else 0

def calculate_bulk_surcharge(number_of_items):
    """
    Calculates the bulk surcharge based on the number of items in the cart. 
    The surcharge is calculated as follows: 1.20€ if over 12 items, otherwise 0€.
    
    :param number_of_items: The number of items in the cart.
    :return: The calculated bulk surcharge in cents.
    """
    return 120 if number_of_items > 12 else 0

def calculate_rush_hour_surcharge(delivery_fee, order_time):
    """
    Applies a rush hour multiplier to the delivery fee based on the order time. 
    The multiplier is applied as follows: 20% increase on Fridays between 3pm and 6pm, 
    otherwise no multiplier.
    
    :param delivery_fee: The delivery fee to apply the multiplier to.
    :param order_time: The order time.
    :return: The rush hour surcharge.
    """
    if order_time.weekday() == 4 and 15 <= order_time.hour <= 18:
        return int(delivery_fee * 0.2)
    else:
        return 0

def apply_delivery_fee_limits(delivery_fee, cart_value):
    """
    Applies limits to the delivery fee. The limits are applied as follows:
    The delivery is free if the cart value is over 200€. The delivery fee cannot be more than 15€.
    
    :param delivery_fee: The delivery fee to apply the limits to.
    :param cart_value: The value of the shopping cart in cents.
    :return: The delivery fee with the limits applied.
    """
    # The delivery is free if the cart value is over 200€.
    if cart_value >= 20000:
        return 0
    # The delivery fee cannot be more than 15€.
    elif delivery_fee > 1500:
        return 1500
    else:
        return delivery_fee
