# Notification Service

A Spring Boot-based Notification Service built with Spring Boot Web and Mail.

## Overview

The **Notification Service** is responsible for sending email notifications using Spring Boot's mail support. It provides endpoints and background tasks for managing and dispatching notifications.

## Features

- **Email Notifications:** Sends emails using Spring Boot Starter Mail.
- **RESTful API:** Exposes endpoints for notification management.
- **Lightweight:** Built using Spring Boot Starter Web.

## Prerequisites

- **Java 17:** Ensure Java 17 is installed.
- **Maven:** Apache Maven is required to build the project.
- **Mail Server:** A configured mail server for sending notifications.

## Build & Run

Build the project:
```bash
mvn clean install
mvn spring-boot:run.

```

## Build Docker Image:
```bash 
docker build -t gcr.io/your-project/notification-service:latest .
```

## Run Docker Image:
```bash 
docker run gcr.io/your-project/notification-service:latest
```
