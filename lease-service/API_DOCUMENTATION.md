
# Lease Service API Documentation

This document outlines the RESTful endpoints provided by the Lease Service, which includes both lease operations and lease request handling.

---

## Lease Endpoints

### Health Check
- **GET** `/lease/health`
- Returns a basic health status message.

### Create Lease
- **POST** `/lease/create`
- Creates a new lease.
```json
Request Body (LeaseDTO):
{
  "propertyId": 1,
  "landlordId": 101,
  "tenantId": 201,
  "startDate": "2024-05-01",
  "endDate": "2025-05-01",
  "rentAmount": 1200.00,
  "depositAmount": 1200.00
}
```

### Renew Lease
- **POST** `/lease/renew`
- Renews a lease using LeaseDTO (same as create).

### Get Lease by Property ID
- **GET** `/lease/property/{propertyId}`

### Get Leases by Tenant
- **GET** `/lease/tenant/{tenantId}`

### Get Leases by Landlord
- **GET** `/lease/landlord/{landlordId}`

### Get Leases by Landlord and Tenant
- **GET** `/lease/landlord/{landlordId}/tenant/{tenantId}`

### Get Expiring Soon Leases
- **GET** `/lease/expiry/soon`

### Accept Lease
- **PUT** `/lease/accept/{id}`

### Reject Lease
- **PUT** `/lease/reject/{id}`

---

## Lease Request Endpoints

### Create Lease Request
- **POST** `/lease-request/create`
```json
Request Body (LeaseRequestDTO):
{
  "propertyId": 1,
  "landlordId": 101,
  "tenantId": 201,
  "requestType": 1,
  "message": "Interested in renting this property."
}
```

### Get Lease Request by ID
- **GET** `/lease-request/id/{id}`

### Get Requests by Property
- **GET** `/lease-request/property/{propertyId}`

### Get Requests by Landlord
- **GET** `/lease-request/landlord/{id}`

### Get Requests by Tenant
- **GET** `/lease-request/tenant/{tenantId}`

### Update Lease Request Status
- **PUT** `/lease-request/id/{id}/status/{status}`

### Delete Lease Request
- **DELETE** `/lease-request/{id}`

---

## DTOs Summary

### LeaseDTO
- Fields: `id`, `propertyId`, `landlordId`, `tenantId`, `startDate`, `endDate`, `rentAmount`, `depositAmount`, `status`, `acknowledgedAt`, `createdAt`, `updatedAt`

### LeaseRequestDTO
- Fields: `id`, `propertyId`, `landlordId`, `tenantId`, `requestType`, `message`, `status`, `createdAt`, `updatedAt`

### EmailDTO
- Fields: `to`, `subject`, `body`

### StringResponseDTO
- Fields: `message`

### ErrorDTO
- Fields: `errorCode`, `errorMessage`

### UserDTO
- Fields: `id`, `email`, `phone`, `role`, `firstName`, `lastName`, `createdAt`, `updatedAt`

---

## License
[Specify your license here]
