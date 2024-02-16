FROM openjdk:17

# Set the working directory in the container
WORKDIR /app

# Copy the Gradle wrapper, build files, and source code to the container
COPY gradlew ./
COPY gradle gradle
COPY build.gradle.kts ./
COPY settings.gradle.kts ./
COPY src src

# Grant execution permissions to the Gradle wrapper
RUN chmod +x ./gradlew

# Expose port 8080 for the application
EXPOSE 8080

# Use the Gradle wrapper to run the application
CMD ["./gradlew", "run"]
