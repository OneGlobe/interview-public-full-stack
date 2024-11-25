FROM maven:3.9.9-amazoncorretto-21 AS builder
COPY pom.xml .
RUN mvn verify --fail-never
COPY src src
COPY lombok.config .
RUN ["mvn", "-B", "package", "-Dmaven.test.skip=true"]

FROM amazoncorretto:21.0.5
COPY --from=builder target/ref-platform-app-svc-*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]