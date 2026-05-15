FROM maven:3.9.15-eclipse-temurin-21 AS base
WORKDIR /app
COPY pom.xml .
RUN mvn dependency:go-offline -B

FROM base AS development
COPY . .
EXPOSE ${SERVER_PORT}
CMD ["mvn", "spring-boot:run"]

FROM base AS build
COPY src ./src
# Mặc định build với maven profile là prod(production)
RUN mvn clean package -Pprod

FROM eclipse-temurin:21-jre AS production
COPY --from=build /app/target/*.jar app.jar
EXPOSE ${SERVER_PORT}
ENTRYPOINT ["java", "-jar", "app.jar"]