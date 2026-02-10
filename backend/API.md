# API Documentation

Base URL (local): `http://0.0.0.0:8000`

## Authentication
This endpoint is **public** (no auth required).

---

## Register

Create a new user account and trigger email verification.

### Endpoint
- **Method:** `POST`
- **URL:** `/api/account/register/`
- **Full URL:** `http://0.0.0.0:8000/api/account/register/`

### Headers
- `Content-Type: application/json`
- `Accept: application/json`

### Request Body
| Field      | Type   | Required | Notes |
|-----------|--------|----------|------|
| `email`    | string | ✅       | Must be a valid email. |
| `name`     | string | ✅       | User display name. |
| `password` | string | ✅       | Minimum rules depend on backend validators. |
| `password2`| string | ✅       | Must match `password`. |

### Example Request
```json
{
  "email": "gopelow260@2insp.com",
  "name": "DRDOOM",
  "password": "Peter@012",
  "password2": "Peter@012"
}
```

### Error Responses

#### Duplicate Email (400 Bad Request)
Returned when a user tries to register with an email that already exists.

```json
{
  "success": false,
  "status_code": 400,
  "errors": {
    "email": [
      "custom user model with this Email already exists."
    ]
  }
}
```

