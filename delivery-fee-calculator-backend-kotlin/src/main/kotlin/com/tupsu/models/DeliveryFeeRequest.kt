import kotlinx.serialization.*
import kotlinx.serialization.descriptors.*
import kotlinx.serialization.encoding.*
import java.time.LocalDateTime
import java.time.format.DateTimeFormatter
import java.time.format.DateTimeParseException

// TODO add validation by having constraints in these models

/**
 * Serializes and deserializes [LocalDateTime] objects to and from ISO 8601 format.
 */
@Serializer(forClass = LocalDateTime::class)
object LocalDateTimeSerializer : KSerializer<LocalDateTime> {
    // DateTimeFormatter to format LocalDateTime objects to ISO 8601 format and parse them back.
    private val formatter = DateTimeFormatter.ISO_DATE_TIME

    override val descriptor: SerialDescriptor = PrimitiveSerialDescriptor("LocalDateTime", PrimitiveKind.STRING)

    // Override the serialize method to convert a LocalDateTime object to a string.
    override fun serialize(encoder: Encoder, value: LocalDateTime) {
        // Use the formatter to convert the LocalDateTime object to a string in ISO 8601 format, and then encode it.
        encoder.encodeString(value.format(formatter))
    }

    // Override the deserialize method to convert a string back to a LocalDateTime object.
    override fun deserialize(decoder: Decoder): LocalDateTime {
        val dateTimeString = decoder.decodeString()
        return try {
            LocalDateTime.parse(dateTimeString, formatter)
        } catch (e: DateTimeParseException) {
            throw SerializationException("Invalid date-time format: $dateTimeString. Expected ISO 8601 format.")
        }
    }
}

/**
 * Represents a request for calculating delivery fee.
 * @param cartValue The value of the shopping cart in cents.
 * @param deliveryDistance The delivery distance in meters.
 * @param numberOfItems The number of items in the cart.
 * @param time The order time. This uses LocalDateTime and is serialized using the custom LocalDateTimeSerializer to
 * handle its conversion to and from a string in ISO 8601 format.
 */
@Serializable
data class DeliveryFeeRequest(
    val cartValue: Int,
    val deliveryDistance: Int,
    val numberOfItems: Int,
    @Serializable(with = LocalDateTimeSerializer::class)
    val time: LocalDateTime
) {
    init {
        require(cartValue >= 0) { "Cart value must be non-negative" }
        require(deliveryDistance >= 0) { "Delivery distance must be non-negative" }
        require(numberOfItems > 0) { "Number of items must be greater than 0" }
        // time just needs to be a valid LocalDateTime object
    }
}
