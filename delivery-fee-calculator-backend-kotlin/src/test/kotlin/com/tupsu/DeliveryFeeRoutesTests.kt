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
        val jsonRequestBody = """
            {
                "cartValue": 790,
                "deliveryDistance": 2235,
                "numberOfItems": 4,
                "time": "2024-01-15T13:00:00Z"
            }
        """.trimIndent()

        val expectedResponse = DeliveryFeeResponse(deliveryFee = 710)

        testApplication {
            application { module() }
            val response = client.post("/deliveryFee") {
                contentType(ContentType.Application.Json)
                setBody(jsonRequestBody)
            }
            response.status shouldBe HttpStatusCode.OK
            val responseJson = response.bodyAsText()
            val actualResponse = Json.decodeFromString<DeliveryFeeResponse>(responseJson)
            actualResponse shouldBe expectedResponse
        }
    }
})
