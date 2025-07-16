# Auth Service API Documentation

This document describes the RESTful endpoints for the Auth Service. The service is responsible for user authentication, password management, and related operations using JWT and Spring Security.

---

## Endpoints

### 1. Health Check

**Endpoint:** `/auth/health`  
**Method:** GET

**Description:**  
Returns a simple health check message indicating that the service is up and running.

**Request Example:**
GET /auth/health HTTP/1.1 Host: <server-host>


**Response Example:**
HTTP/1.1 200 OK Content-Type: text/plain
"Health is good."



---

### 2. Login

**Endpoint:** `/auth/login`  
**Method:** POST

**Description:**  
Authenticates a user using their email and password, returning a JWT token along with user details if successful.

**Request Payload (LoginDTO):**

```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response Payload (AuthResponseDTO):**

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "id": 1,
  "email": "user@example.com",
  "phone": "1234567890",
  "role": "ROLE_USER",
  "firstName": "John",
  "lastName": "Doe",
  "createdAt": "2023-01-01T12:00:00",
  "updatedAt": "2023-01-01T12:00:00"
}
```


---

### 3. Forgot Password

**Endpoint:** `/auth/forgot-password`  
**Method:** POST

**Description:**  
Initiates the forgot password process by sending a reset email to the user.

**Request Payload (LoginDTO):**

```json
{
  "email": "user@example.com"
}
```

**Response Payload (AuthResponseDTO):**
HTTP/1.1 200 OK
Content-Type: text/plain
"Password reset email sent."

### 4. Reset Password

**Endpoint:** `/auth/reset-password`  
**Method:** POST

**Description:**  
Resets the user's password using the provided reset token and new password.

**Request Payload (LoginDTO):**

```json
{
  "token": "reset-token-string",
  "newPassword": "newSecurePassword"
}   
```

**Response Payload (AuthResponseDTO):**
HTTP/1.1 200 OK
Content-Type: text/plain
"Password successfully reset."



