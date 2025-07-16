# Auth Service

A Spring Boot-based Authentication Service built with Web, Data JPA, Security, and Mail support.

## Overview

The **Auth Service** manages user authentication and authorization using JWT. It integrates with MySQL for data persistence and Spring Security for protecting endpoints.

## Prerequisites

- **Java 17**
- **Maven**
- **MySQL** database

## Build & Run

Build the project:
```bash
mvn clean install
mvn spring-boot:run.

```

## Build Docker Image:
```bash 
docker build -t gcr.io/your-project/auth-service:latest .
```

## Run Docker Image:
```bash 
docker run gcr.io/your-project/auth-service:latest
```
