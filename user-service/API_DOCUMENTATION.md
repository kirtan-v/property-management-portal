
# User Service API Documentation

This document describes the RESTful endpoints exposed by the User Service for managing user data.

---

## Endpoints

### Health Check
- **GET** `/users/health`
- Returns "Health is good."

---

### Register User
- **POST** `/users/register`
- Registers a new user.

**Request Body (RegisterDTO):**
```json
{
  "email": "user@example.com",
  "password": "password123",
  "role": "ROLE_USER",
  "firstName": "John",
  "lastName": "Doe",
  "phone": "1234567890"
}
```

---

### Check If Email Exists
- **GET** `/users/check/{email}`

---

### Get User by ID
- **GET** `/users/id/{id}`

---

### Authenticate User (Internal Use)
- **GET** `/users/authenticate/{email}`

---

### Get User by Email
- **GET** `/users/email/{email}`

---

### Get All Users
- **GET** `/users/all`

---

### Get Users by Role
- **GET** `/users/role/{role}`

---

### Update User Password
- **PUT** `/users/password`

**Request Body (LoginDTO):**
```json
{
  "email": "user@example.com",
  "password": "newpassword123"
}
```

---

### Update User
- **PUT** `/users/update/{id}`

**Request Body (UserDTO)**

---

### Get User by Email (Internal)
- **GET** `/users/internal/{email}`

---

### Get User by ID (Internal)
- **GET** `/users/internal/id/{id}`

---

## DTOs

### RegisterDTO
- `email`, `password`, `role`, `firstName`, `lastName`, `phone`, `created_at`, `updated_at`

### LoginDTO
- `email`, `password`

### UserDTO
- `id`, `email`, `phone`, `role`, `firstName`, `lastName`, `created_at`, `updated_at`

### ErrorDTO
- `errorCode`, `errorMessage`

---

## License
[Specify your license here]
