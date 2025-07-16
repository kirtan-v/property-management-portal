# API Gateway

A Spring Cloud Gateway-based API Gateway service built with Spring Boot and WebFlux.

## Overview

The **API Gateway** service is responsible for routing and load balancing incoming requests to appropriate downstream microservices. It leverages Spring Cloud Gateway along with Spring Boot WebFlux to provide a reactive and efficient routing mechanism. This service is an essential part of the microservices architecture, centralizing cross-cutting concerns like authentication, logging, and rate limiting.

## Features

- **Routing:** Directs client requests to the appropriate microservices.
- **Load Balancing:** Distributes requests efficiently across services.
- **Reactive Programming:** Utilizes Spring Boot WebFlux for non-blocking I/O.
- **Configurable:** Easily customizable through externalized configuration.

## Prerequisites

- **Java 17:** Ensure Java 17 is installed on your machine.
- **Maven:** Apache Maven is required to build the project.
- **Spring Cloud Version:** Uses Spring Cloud version `2022.0.5`.

## Build & Run

Build the project:
```bash
mvn clean install
mvn spring-boot:run.

```

## Build Docker Image:
```bash 
docker build -t gcr.io/your-project/api-gateway:latest .
```

## Run Docker Image:
```bash 
docker run gcr.io/your-project/api-gateway:latest
```