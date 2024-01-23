package com.tupsu.models

import kotlinx.serialization.Serializable

@Serializable
data class DeliveryFeeResponse(
    val delivery_fee: Int
)