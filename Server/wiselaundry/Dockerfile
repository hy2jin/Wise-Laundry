FROM openjdk:11

# VOLUME ["/doimage", "/doimage"]

COPY ${JAR_FILE} app.jar

ENTRYPOINT ["java","-jar","/app.jar"]

EXPOSE 8080
