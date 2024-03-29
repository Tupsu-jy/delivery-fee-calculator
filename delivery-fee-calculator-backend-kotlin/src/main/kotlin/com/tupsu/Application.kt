package com.tupsu

import com.tupsu.models.configureSerialization
import com.tupsu.routes.configureHTTP
import com.tupsu.routes.configureDeliveryFeeRoutes
import com.tupsu.routes.errorHandlingConfiguration
import io.ktor.server.application.*
import io.ktor.server.engine.*
import io.ktor.server.netty.*

fun main() {
    embeddedServer(Netty, port = 8080, host = "0.0.0.0", module = Application::module)
        .start(wait = true)
}

fun Application.module() {
    configureHTTP()
    configureDeliveryFeeRoutes()
    configureSerialization()
    errorHandlingConfiguration()
}
