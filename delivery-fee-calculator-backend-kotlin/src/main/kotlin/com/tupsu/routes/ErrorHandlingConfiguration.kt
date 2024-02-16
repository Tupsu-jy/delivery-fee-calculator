package com.tupsu.routes

import io.ktor.http.*
import io.ktor.server.application.*
import io.ktor.server.plugins.statuspages.*
import io.ktor.server.response.*
import kotlinx.serialization.SerializationException

/**
 * Adds error handling configuration.
 */
fun Application.errorHandlingConfiguration() {
    install(StatusPages) {
        exception<SerializationException> { call, cause ->
            // Handle serialization errors
            call.respond(HttpStatusCode.BadRequest, mapOf("error" to cause.message))
        }
        exception<IllegalArgumentException> { call, cause ->
            // Handle validation errors
            call.respond(HttpStatusCode.BadRequest, mapOf("error" to cause.message))
        }
        exception<Exception> { call, _ ->
            // Handle other exceptions
            call.respond(HttpStatusCode.InternalServerError, mapOf("error" to "An unexpected error occurred"))
        }
    }
}
