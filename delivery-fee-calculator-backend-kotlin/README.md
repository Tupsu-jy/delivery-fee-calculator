# Ktor Kotlin REST API Example

This project demonstrates a simple REST API built with Ktor in Kotlin, using gradle. It features a single endpoint that showcases basic API functionality.

## Getting Started

Run these commands at root to get started:

```bash 
./gradlew build
./gradlew run
```

After this the server will be running on port 8080. 

## Endpoints
There is a single POST endpoint at 'deliveryFee' that takes a JSON body of the following format:

```json
{
  "cart_value": 790, 
  "delivery_distance": 2235, 
  "number_of_items": 4, 
  "time": "2024-01-15T13:00:00Z" // ISO 8601 format string
}
```

The response will be a JSON body of the following format:

```json
{
  "delivery_fee": 1000
}
```

The response represents the delivery fee that was calculated based on the input parameters.

## Testing

To run the tests, run the following command at root:

```bash
./gradlew test
```

This runs the tests in the 'test' folder. The tests are written using Kotest and ktor-test-host.