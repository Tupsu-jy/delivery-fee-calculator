FROM openjdk:17-alpine

# Set the working directory
WORKDIR /app

# Install necessary tools
RUN apk add --no-cache bash inotify-tools

# Copy Gradle configuration files
COPY gradle.properties ./
COPY gradlew ./
COPY gradle gradle
COPY build.gradle.kts ./
COPY settings.gradle.kts ./

# Grant execution permissions to Gradle wrapper
RUN chmod +x ./gradlew

# Copy source code
COPY src src

# Build the application
RUN ./gradlew build --no-daemon

# Expose the application port
EXPOSE 8080

# Run the built JAR file
CMD ["java", "-jar", "build/libs/delivery-fee-calculator-backend-kotlin-all.jar"]
