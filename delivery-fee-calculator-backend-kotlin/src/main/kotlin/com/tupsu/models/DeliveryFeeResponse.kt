package com.tupsu.models

import kotlinx.serialization.Serializable

/**
 * Represents a response to request for calculating delivery fee.
 * @param delivery_fee The value of the delivery fee in cents.
 */
@Serializable
data class DeliveryFeeResponse(
    val delivery_fee: Int
)