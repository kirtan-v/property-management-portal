
# Notification Service API Documentation

This document describes the RESTful endpoint for the Notification Service which is responsible for sending email notifications.

---

## Endpoints

### Send Email Notification

- **Endpoint:** `/notification/email`
- **Method:** POST
- **Description:** Sends an email using the specified fields in the request body.

**Request Payload (EmailDTO):**
```json
{
  "to": "recipient@example.com",
  "subject": "Welcome to our platform",
  "body": "Thank you for signing up!"
}
```

**Response Example:**
```text
HTTP/1.1 200 OK
Content-Type: text/plain

"Email notification sent"
```

---

## DTOs

### EmailDTO
- `to` (String): Recipient's email address
- `subject` (String): Subject line of the email
- `body` (String): Body content of the email

---

## License

[Specify your license here]
