# 🏠 Property Management Portal

A **cloud-native**, **microservices-based** full-stack platform for property listing, user management, leasing, and notification handling. Built with **React.js**, **Spring Boot (Java 17)**, **MySQL**, and deployed on **Google Kubernetes Engine (GKE)** with infrastructure managed via **Terraform**.

---

## 📌 Overview

This project is a scalable property management system supporting:
- Property listings & updates
- Lease creation & approvals
- User registration & JWT-based authentication
- Email notifications

The system uses a modular microservices architecture, containerized with Docker and orchestrated using Kubernetes.

---

## 🛠️ Tech Stack

| Layer        | Technology                                |
|--------------|--------------------------------------------|
| Frontend     | React.js, Axios, Bootstrap                |
| Backend      | Spring Boot, Spring Security, JPA         |
| Auth         | JWT, Spring Security                      |
| Database     | Cloud SQL (MySQL 8)                       |
| Infrastructure | Terraform, GKE, GCP Cloud Build        |
| Orchestration | Kubernetes (GKE)                         |

---

## 📦 Microservices

| Service Name         | Description                                      |
|----------------------|--------------------------------------------------|
| **API Gateway**      | Centralized router using Spring Cloud Gateway    |
| **Auth Service**     | JWT-based authentication                         |
| **User Service**     | User CRUD and role management                    |
| **Property Service** | CRUD for property listings                       |
| **Lease Service**    | Handles lease creation and approval              |
| **Notification Service** | Sends email notifications using SMTP       |
| **Frontend**         | React-based SPA served externally or via GKE     |

Each service has its own folder with a `Dockerfile` and Kubernetes deployment YAML.

---

## 🧾 Project Structure

```
/property-management-portal/
├── frontend/
├── api-gateway/
├── auth-service/
├── user-service/
├── property-service/
├── lease-service/
├── notification-service/
├── infrastructure/
│   ├── gcp-infrastructure.tf
│   ├── variables.tf
└── README.md
```

---

## 🚀 Getting Started

### 1. ✅ Prerequisites

- [ ] Google Cloud account with billing enabled
- [ ] [gcloud CLI](https://cloud.google.com/sdk/docs/install)
- [ ] Terraform v1.5+
- [ ] Docker
- [ ] kubectl

---

### 2. ☁️ Infrastructure Setup (via Terraform)

```bash
cd infrastructure
terraform init
terraform apply -var="project_id=your-project-id" -var="db_root_password=your-password"
```

---

### 3. 📦 Build and Push Docker Images

```bash
# Build and push each microservice from its respective folder

cd user-service
docker build -t gcr.io/YOUR_PROJECT_ID/user-service:latest .
docker push gcr.io/YOUR_PROJECT_ID/user-service:latest

cd ../auth-service
docker build -t gcr.io/YOUR_PROJECT_ID/auth-service:latest .
docker push gcr.io/YOUR_PROJECT_ID/auth-service:latest

cd ../property-service
docker build -t gcr.io/YOUR_PROJECT_ID/property-service:latest .
docker push gcr.io/YOUR_PROJECT_ID/property-service:latest

cd ../lease-service
docker build -t gcr.io/YOUR_PROJECT_ID/lease-service:latest .
docker push gcr.io/YOUR_PROJECT_ID/lease-service:latest

cd ../notification-service
docker build -t gcr.io/YOUR_PROJECT_ID/notification-service:latest .
docker push gcr.io/YOUR_PROJECT_ID/notification-service:latest

cd ../api-gateway
docker build -t gcr.io/YOUR_PROJECT_ID/api-gateway:latest .
docker push gcr.io/YOUR_PROJECT_ID/api-gateway:latest
```

---

### 4. 📂 Deploy Microservices to GKE

```bash
# Fetch GKE credentials
gcloud container clusters get-credentials my-gke-cluster --zone us-central1-a

# Deploy each service using its own deploy.yaml
kubectl apply -f user-service/deploy.yaml
kubectl apply -f auth-service/deploy.yaml
kubectl apply -f property-service/deploy.yaml
kubectl apply -f lease-service/deploy.yaml
kubectl apply -f notification-service/deploy.yaml
kubectl apply -f api-gateway/deploy.yaml


---

### 5. 🌐 Frontend Setup

```bash
cd frontend
npm install
npm run build
```

---

## 🔐 Environment Variables

```env
SPRING_DATASOURCE_URL=jdbc:mysql://<PRIVATE_IP>:3306/<dbname>
SPRING_DATASOURCE_USERNAME=root
SPRING_DATASOURCE_PASSWORD=your-password
JWT_SECRET=your-secret
JWT_EXPIRATION=3600000
```

---

## 📊 Load Testing & Availability

- Achieved **99.9% uptime** during controlled test scenarios.
- Sustained **500+ concurrent users** using Apache JMeter.

---

## 📄 License

This project is built as part of an Advanced Topics in Web Development course and is intended for academic and demonstration purposes only.

---

## 🙋‍♂️ Author

**Kirtan Vaja**  
MACS, Dalhousie University  
LinkedIn: https://www.linkedin.com/in/kirtan-vaja/
