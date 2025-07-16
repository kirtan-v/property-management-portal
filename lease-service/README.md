# Lease Service

A Spring Boot-based Lease Service built with Web, Data JPA, Security, and Mail support.

## Overview

The **Lease Service** handles lease-related operations, including managing leases, security with JWT, and sending notifications via email. It uses MySQL for data persistence and Spring Boot's security features for authentication and authorization.

## Prerequisites

- **Java 17**: Ensure Java 17 is installed.
- **Maven**: Apache Maven is required to build the project.
- **MySQL**: A MySQL database instance is needed at runtime.
- **Mail Server**: A configured mail server for sending emails.

## Build & Run

Build the project:
```bash
mvn clean install
mvn spring-boot:run.

```

## Build Docker Image:
```bash 
docker build -t gcr.io/your-project/lease-service:latest .
```

## Run Docker Image:
```bash 
docker run gcr.io/your-project/lease-service:latest
```