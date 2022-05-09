FROM openjdk:11

# VOLUME ["/doimage", "/doimage"]

RUN mkdir -p /images

ARG JAR_FILE=build/libs/wiselaundry-server_0.0.1.jar

COPY ${JAR_FILE} app.jar

ENTRYPOINT ["java","-jar", "-Duser.timezone=Asia/Seoul","/app.jar"]

EXPOSE 8080
