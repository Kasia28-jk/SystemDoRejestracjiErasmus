FROM maven:3.8.2-jdk-8 as build

COPY src /home/app/src
COPY pom.xml /home/app
WORKDIR /home/app
RUN mvn clean package

FROM openjdk:8-jre-slim
COPY --from=build /home/app/target/myapp.jar /usr/local/lib/myapp.jar
EXPOSE 8080
ENTRYPOINT ["java","-jar","/usr/local/lib/myapp.jar"]