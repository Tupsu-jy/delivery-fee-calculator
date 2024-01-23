import java.time.LocalDateTime

/**
 * Calculates the total delivery fee based on various parameters.
 * @param cartValue The value of the shopping cart in cents.
 * @param deliveryDistance The delivery distance in meters.
 * @param numberOfItems The number of items in the cart.
 * @param time The order time in ISO 8601 format.
 * @return The calculated delivery fee in cents.
 */
fun calculateDeliveryFee(cartValue: Int, deliveryDistance: Int, numberOfItems: Int, time: LocalDateTime): Int {
    var deliveryFee = 0
    deliveryFee += calculateDeliveryDistanceFee(deliveryDistance)
    deliveryFee += calculateSmallOrderSurcharge(cartValue)
    deliveryFee += calculateItemSurcharge(numberOfItems)
    deliveryFee += calculateBulkSurcharge(numberOfItems)
    // Rush hour surcharge is applied after the other surcharges, because it is calculated from the total delivery fee.
    deliveryFee += calculateRushHourSurcharge(deliveryFee, time)
    return applyDeliveryFeeLimits(deliveryFee, cartValue)
}

/**
 * Calculates the delivery distance fee based on the delivery distance. The fee is calculated as follows:
 * 2€ base fee + 1€ per every 500m over 1km. Round up to nearest 500m.
 * @param deliveryDistance The delivery distance in meters.
 * @return The calculated delivery distance fee in cents.
 */
fun calculateDeliveryDistanceFee(deliveryDistance: Int): Int {
    // 2€ base fee
    var fee = 200
    // 1€ per every 500m over 1km. Round up to nearest 500m.
    if (deliveryDistance > 1000) {
        fee += ((deliveryDistance - 1000 + 499) / 500) * 100
    }
    return fee
}

/**
 * Calculates the small order surcharge based on the cart value. The surcharge is calculated as follows:
 * 10€ minus the cart value, if the cart value is less than 10€, otherwise 0€.
 * @param cartValue The value of the shopping cart in cents.
 * @return The calculated small order surcharge in cents.
 */
fun calculateSmallOrderSurcharge(cartValue: Int): Int {
    return if (cartValue < 1000) 1000 - cartValue else 0
}

/**
 * Calculates the item surcharge based on the number of items in the cart. The surcharge is calculated as follows:
 * 50 cents per items over 4, otherwise 0€.
 * @param numberOfItems The number of items in the cart.
 * @return The calculated item surcharge in cents.
 */
fun calculateItemSurcharge(numberOfItems: Int): Int {
    return if (numberOfItems >= 5) 50 * (numberOfItems - 4) else 0
}

/**
 * Calculates the bulk surcharge based on the number of items in the cart. The surcharge is calculated as follows:
 * 1.20€ if over 12 items, otherwise 0€.
 * @param numberOfItems The number of items in the cart.
 * @return The calculated bulk surcharge in cents.
 */
fun calculateBulkSurcharge(numberOfItems: Int): Int {
    return if (numberOfItems > 12) 120 else 0
}

/**
 * Applies a rush hour multiplier to the delivery fee based on the order time. The multiplier is applied as follows:
 * 20% increase on Fridays between 3pm and 6pm, otherwise no multiplier.
 * @param deliveryFee The delivery fee to apply the multiplier to.
 * @param orderTime The order time.
 * @return The rush hour surcharge.
 */
fun calculateRushHourSurcharge(deliveryFee: Int, orderTime: LocalDateTime): Int {
    return if (orderTime.dayOfWeek.value == 5 && orderTime.hour in 15..18) (deliveryFee * 0.2).toInt() else 0
}

/**
 * Applies limits to the delivery fee. The limits are applied as follows:
 * The delivery is free if the cart value is over 200€.
 * The delivery fee cannot be more than 15€.
 * @param deliveryFee The delivery fee to apply the limits to.
 * @param cartValue The value of the shopping cart in cents.
 * @return The delivery fee with the limits applied.
 */
fun applyDeliveryFeeLimits(deliveryFee: Int, cartValue: Int): Int {
    // The delivery is free if the cart value is over 200€.
    if (cartValue >= 20000) return 0
    // The delivery fee cannot be more than 15€.
    if (deliveryFee > 1500) return 1500
    return deliveryFee
}
