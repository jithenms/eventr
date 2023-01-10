FROM openjdk:17-jdk-slim
ADD . /app
WORKDIR /app
RUN ./mvnw clean package
ENTRYPOINT ["java", "-jar", "./target/event-service-1.0.0-SNAPSHOT.jar"]