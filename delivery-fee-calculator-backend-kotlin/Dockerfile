FROM openjdk:17-alpine

# Set the working directory
WORKDIR /app

# Install necessary tools
RUN apk add --no-cache findutils bash

# Copy files and build the application
COPY gradle.properties ./
COPY gradlew ./
COPY gradle gradle
COPY build.gradle.kts ./
COPY settings.gradle.kts ./
COPY src src

# Grant execution permissions to the Gradle wrapper
RUN chmod +x ./gradlew

# Build the application
RUN ./gradlew build --no-daemon

# Expose the application port
EXPOSE 8080

# Run the application
CMD ["java", "-jar", "build/libs/delivery-fee-calculator-backend-kotlin-all.jar"]
