# Property Service

A Spring Boot-based Property Service built with Web, Data JPA, and Security.

## Overview

The **Property Service** manages property-related operations such as CRUD operations for property listings.

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
docker build -t gcr.io/your-project/property-service:latest .
```

## Run Docker Image:
```bash 
docker run gcr.io/your-project/property-service:latest
```