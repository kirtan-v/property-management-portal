# Auth Service API Documentation

This document outlines the RESTful endpoints provided by the Property Service. The service is responsible for managing property listings, including creation, retrieval, update, and deletion. It also includes internal endpoints for updating property status.

---

## Endpoints

### 1. Health Check

**Endpoint:** `/property/health`  
**Method:** GET

**Description:**  
Returns a simple health check message indicating that the service is up and running.

**Request Example:**
GET /property/health HTTP/1.1 Host: <server-host>


**Response Example:**
HTTP/1.1 200 OK Content-Type: text/plain
"Health is good."



---

### 2. Add Property

**Endpoint:** `/property/add`  
**Method:** POST

**Description:**  
Adds a new property to the system using the provided property details.

**Request Payload (PropertyDTO):**

```json
{
  "landlordId": 123,
  "landlordEmail": "landlord@example.com",
  "name": "Cozy Apartment",
  "description": "A cozy apartment in the city center.",
  "street": "123 Main St",
  "city": "New York",
  "state": "NY",
  "zip": "10001",
  "country": "USA",
  "startDate": "2023-01-01",
  "endDate": "2023-12-31",
  "rent": 1500.00,
  "deposit": 1500.00,
  "leaseStatus": 1
}
```

**Response Payload (PropertyDTO):**

```json
{
  "id": 1,
  "landlordId": 123,
  "landlordEmail": "landlord@example.com",
  "name": "Cozy Apartment",
  "description": "A cozy apartment in the city center.",
  "street": "123 Main St",
  "city": "New York",
  "state": "NY",
  "zip": "10001",
  "country": "USA",
  "startDate": "2023-01-01",
  "endDate": "2023-12-31",
  "rent": 1500.00,
  "deposit": 1500.00,
  "leaseStatus": 1,
  "createdAt": "2023-01-01T10:00:00",
  "updatedAt": "2023-01-01T10:00:00"
}

```


---

### 3. Get All Properties

**Endpoint:** `/property/all`  
**Method:** GET

**Description:**  
Retrieves a list of all properties.


**Response Payload (AuthResponseDTO):**
```json
[
  {
    "id": 1,
    "landlordId": 123,
    "landlordEmail": "landlord@example.com",
    "name": "Cozy Apartment",
    "description": "A cozy apartment in the city center.",
    "street": "123 Main St",
    "city": "New York",
    "state": "NY",
    "zip": "10001",
    "country": "USA",
    "startDate": "2023-01-01",
    "endDate": "2023-12-31",
    "rent": 1500.00,
    "deposit": 1500.00,
    "leaseStatus": 1,
    "createdAt": "2023-01-01T10:00:00",
    "updatedAt": "2023-01-01T10:00:00"
  }
]
```

### 4. Get All Available Properties

**Endpoint:** `/property/all/available`  
**Method:** GET

**Description:**  
Retrieves a list of all properties that are available (filtering logic handled by the service).

**Response Payload (AuthResponseDTO):**
```json
[
  {
    "id": 1,
    "landlordId": 123,
    "landlordEmail": "landlord@example.com",
    "name": "Cozy Apartment",
    "description": "A cozy apartment in the city center.",
    "street": "123 Main St",
    "city": "New York",
    "state": "NY",
    "zip": "10001",
    "country": "USA",
    "startDate": "2023-01-01",
    "endDate": "2023-12-31",
    "rent": 1500.00,
    "deposit": 1500.00,
    "leaseStatus": 1,
    "createdAt": "2023-01-01T10:00:00",
    "updatedAt": "2023-01-01T10:00:00"
  }
]
```

### 5. Get Property by ID

**Endpoint:** `/property/id/{id}`  
**Method:** GET

**Description:**  
Retrieves a single property by its unique ID.

**URL Parameter:**
id (Long): The ID of the property.

**Response Payload (AuthResponseDTO):**
```json
[
  {
    "id": 1,
    "landlordId": 123,
    "landlordEmail": "landlord@example.com",
    "name": "Cozy Apartment",
    "description": "A cozy apartment in the city center.",
    "street": "123 Main St",
    "city": "New York",
    "state": "NY",
    "zip": "10001",
    "country": "USA",
    "startDate": "2023-01-01",
    "endDate": "2023-12-31",
    "rent": 1500.00,
    "deposit": 1500.00,
    "leaseStatus": 1,
    "createdAt": "2023-01-01T10:00:00",
    "updatedAt": "2023-01-01T10:00:00"
  }
]
```

### 6. Get All Properties by Landlord

**Endpoint:** `/property/allByLandlord/{id}`  
**Method:** GET

**Description:**  
Retrieves all properties associated with a specific landlord.

**URL Parameter:**
id (Long): The landlord's ID.

**Response Payload (AuthResponseDTO):**
```json
[
  {
    "id": 1,
    "landlordId": 123,
    "landlordEmail": "landlord@example.com",
    "name": "Cozy Apartment",
    "description": "A cozy apartment in the city center.",
    "street": "123 Main St",
    "city": "New York",
    "state": "NY",
    "zip": "10001",
    "country": "USA",
    "startDate": "2023-01-01",
    "endDate": "2023-12-31",
    "rent": 1500.00,
    "deposit": 1500.00,
    "leaseStatus": 1,
    "createdAt": "2023-01-01T10:00:00",
    "updatedAt": "2023-01-01T10:00:00"
  }
]
```

### 7. Update Property

**Endpoint:** `/property/update/{id}`  
**Method:** PUT

**Description:**  
Updates the details of an existing property.

**URL Parameter:**
id (Long): The ID of the property to update.

**Request Payload (AuthResponseDTO):**
```json
[
  {
    "id": 1,
    "landlordId": 123,
    "landlordEmail": "landlord@example.com",
    "name": "Cozy Apartment",
    "description": "A cozy apartment in the city center.",
    "street": "123 Main St",
    "city": "New York",
    "state": "NY",
    "zip": "10001",
    "country": "USA",
    "startDate": "2023-01-01",
    "endDate": "2023-12-31",
    "rent": 1500.00,
    "deposit": 1500.00,
    "leaseStatus": 1,
    "createdAt": "2023-01-01T10:00:00",
    "updatedAt": "2023-01-01T10:00:00"
  }
]
```


**Response Payload (AuthResponseDTO):**
```json
[
  {
    "id": 1,
    "landlordId": 123,
    "landlordEmail": "landlord@example.com",
    "name": "Cozy Apartment",
    "description": "A cozy apartment in the city center.",
    "street": "123 Main St",
    "city": "New York",
    "state": "NY",
    "zip": "10001",
    "country": "USA",
    "startDate": "2023-01-01",
    "endDate": "2023-12-31",
    "rent": 1500.00,
    "deposit": 1500.00,
    "leaseStatus": 1,
    "createdAt": "2023-01-01T10:00:00",
    "updatedAt": "2023-01-01T10:00:00"
  }
]
```

### 8. Delete Property

**Endpoint:** `/property/delete/{id}/{userId}`  
**Method:** DELETE

**Description:**  
Deletes a property by its ID. The userId parameter may be used for authorization or logging purposes.

**URL Parameters:**
id (Long): The ID of the property to delete.
userId (Long): The ID of the user requesting the deletion.

**Response Payload (AuthResponseDTO):**
```json
{
  "message": "success"
}
```

### 8. Internal Endpoints

a. Update Property Status (Internal)
Endpoint: /property/internal/update/{id}/status/{status}

Method: PUT

Description:
Updates the status of a property. This endpoint is intended for internal use.

URL Parameters:

id (Long): The ID of the property.

status (Integer): The new status value.

Response Payload (PropertyDTO):
Returns the updated property details.

b. Get Property by ID (Internal)
Endpoint: /property/internal/id/{id}

Method: GET

Description:
Retrieves a property by its ID. This endpoint is intended for internal use.

URL Parameter:

id (Long): The ID of the property.

Response Payload (PropertyDTO):
Same as the public Get Property by ID endpoint.
```



