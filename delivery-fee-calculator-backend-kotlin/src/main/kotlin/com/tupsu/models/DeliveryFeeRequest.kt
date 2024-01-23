import kotlinx.serialization.*
import kotlinx.serialization.descriptors.*
import kotlinx.serialization.encoding.*
import java.time.LocalDateTime
import java.time.format.DateTimeFormatter

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
        // Decode the string and use the formatter to parse it back into a LocalDateTime object.
        return LocalDateTime.parse(decoder.decodeString(), formatter)
    }
}

/**
 * Represents a request for calculating delivery fee.
 * @param cart_value The value of the shopping cart in cents.
 * @param delivery_distance The delivery distance in meters.
 * @param number_of_items The number of items in the cart.
 * @param time The order time. This uses LocalDateTime and is serialized using the custom LocalDateTimeSerializer to
 * handle its conversion to and from a string in ISO 8601 format.
 */
@Serializable
data class DeliveryFeeRequest(
    val cart_value: Int,
    val delivery_distance: Int,
    val number_of_items: Int,
    @Serializable(with = LocalDateTimeSerializer::class)
    val time: LocalDateTime
)
