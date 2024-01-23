package com.tupsu.routes

import DeliveryFeeRequest
import calculateDeliveryFee
import com.tupsu.models.DeliveryFeeResponse
import io.ktor.server.application.*
import io.ktor.server.request.*
import io.ktor.server.response.*
import io.ktor.server.routing.*

/**
 * Adds routes for calculating delivery fee.
 */
fun Application.configureDeliveryFeeRoutes() {
    routing {
        post("/deliveryFee") {
            val request = call.receive<DeliveryFeeRequest>()
            // Handle request and calculate delivery fee
            val deliveryFee = calculateDeliveryFee(
                cartValue = request.cart_value,
                deliveryDistance = request.delivery_distance,
                numberOfItems = request.number_of_items,
                time = request.time
            )
            // Send response
            call.respond(DeliveryFeeResponse(delivery_fee = deliveryFee))
        }
    }
}
