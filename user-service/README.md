# User Service

A Spring Boot-based User Service built with Spring Boot Web, Data JPA, Security, and Validation.

## Overview

The **User Service** handles user-related operations including registration, authentication, and profile management. It uses MySQL for data persistence and JWT for token-based security.

## Features

- **RESTful API:** Exposes endpoints for user management.
- **Security:** Implements Spring Security with JWT.
- **Data Persistence:** Uses Spring Data JPA with MySQL.
- **Validation:** Provides input validation for user data.

## Prerequisites

- **Java 17:** Make sure Java 17 is installed.
- **Maven:** Apache Maven is required to build the project.
- **MySQL:** A MySQL database instance for runtime.

## Build & Run

Build the project:
```bash
mvn clean install
mvn spring-boot:run.

```

## Build Docker Image:
```bash 
docker build -t gcr.io/your-project/user-service:latest .
```

## Run Docker Image:
```bash 
docker run gcr.io/your-project/user-service:latest
```
