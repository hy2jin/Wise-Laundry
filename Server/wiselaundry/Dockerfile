FROM openjdk:11

# VOLUME ["/doimage", "/doimage"]

ARG JAR_FILE=build/libs/wiserlaundry-server_0.0.1.jar

COPY ${JAR_FILE} app.jar

ENTRYPOINT ["java","-jar","/app.jar"]

EXPOSE 8080
