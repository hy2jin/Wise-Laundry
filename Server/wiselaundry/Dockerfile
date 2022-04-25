FROM openjdk:11

# VOLUME ["/doimage", "/doimage"]

ARG JAR_FILE=build/libs/*.jar

COPY ${JAR_FILE} app.jar

ENTRYPOINT ["java","-jar","/app.jar"]

EXPOSE 8080
