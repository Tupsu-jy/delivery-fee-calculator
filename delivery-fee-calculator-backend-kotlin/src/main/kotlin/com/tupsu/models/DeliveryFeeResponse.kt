package com.tupsu.models

import kotlinx.serialization.Serializable

/**
 * Represents a response to request for calculating delivery fee.
 * @param deliveryFee The value of the delivery fee in cents.
 */
@Serializable
data class DeliveryFeeResponse(
    val deliveryFee: Int
) {
    init {
        require(deliveryFee >= 0) { "Delivery fee must be non-negative" }
    }
}