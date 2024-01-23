import com.tupsu.*
import com.tupsu.models.DeliveryFeeResponse
import io.kotest.core.spec.style.StringSpec
import io.kotest.matchers.shouldBe
import io.ktor.client.request.*
import io.ktor.client.statement.*
import io.ktor.http.*
import io.ktor.server.testing.*
import kotlinx.serialization.encodeToString
import kotlinx.serialization.json.Json
import java.time.LocalDateTime

class DeliveryFeeRoutesTests : StringSpec({

    "should return delivery fee" {
        val request = DeliveryFeeRequest(
            cart_value = 1500,
            delivery_distance = 2000,
            number_of_items = 5,
            time = LocalDateTime.parse("2024-01-15T13:00:00")
        )
        val expectedResponse = DeliveryFeeResponse(delivery_fee = 2500)

        testApplication {
            application { module() }
            val response = client.post("/deliveryFee") {
                contentType(ContentType.Application.Json)
                setBody(Json.encodeToString(request))
            }
            response.status shouldBe HttpStatusCode.OK
            val responseJson = response.bodyAsText()
            val actualResponse = Json.decodeFromString<DeliveryFeeResponse>(responseJson)
            actualResponse shouldBe expectedResponse
        }
    }
})
