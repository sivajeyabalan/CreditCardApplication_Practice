# ---------- Build Stage ----------
FROM maven:3.9.6-eclipse-temurin-21 AS builder

WORKDIR /app

COPY pom.xml .
RUN mvn dependency:go-offline

COPY src ./src
RUN mvn clean package -DskipTests

# ---------- Runtime Stage ----------
FROM eclipse-temurin:21-jre

WORKDIR /app

COPY --from=builder /app/target/*.jar app.jar

# Render provides PORT env variable - Spring Boot will use server.port from application.yml
EXPOSE 8081

ENTRYPOINT ["java", "-Xmx512m", "-Xms256m", "-jar", "app.jar"]
