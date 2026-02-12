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

## Activate Account

Activating user account using link sent through email

### Endpoint
- **Method:** `GET`
- **URL:** `/api/account/activate/`
- **Full URL:** `http://0.0.0.0:8000/api/account/activate/Ng/d3sie0-9f912491b3d033150ad147ed34f70ba2/`

### Success Responses

#### User Account Activated Successfully (200 Ok)

```json
{
  "success": true,
  "data": {
    "msg": "User account is successfully activated "
  }
}
```

### Error Responses

#### User does not exist (404 Not Found)

```json
{
    "success": false,
    "status_code": 404,
    "errors": {
        "msg": "User does not exist"
    }
}
```
## Change Password
Change the password of a loggedin user.

### Endpoint
- **Method:** `POST`
- **URL:** `/api/account/changepass/`
- **Full URL:** `http://0.0.0.0:8000/api/account/changepass/`

### Authentication
This endpoint requires authentication

- Permission: `IsAuthenticated`
- Header: `Authorization: Bearer <access_token>`

### Headers 
- `Content-Type: application/json`
- `Accept: application/json`
- `Authorization: Bearer <access_token>`

### Request Body

|    Field          | Type   | Required |           Notes                     | 
|-------------------|--------|----------|-------------------------------------|
| `current_password`| string |   yes    | Must match user's existing password |
| `password`        | string |   yes    | New password                        |
| `password2`       | string |   yes    | Must match `password`               | 

### Example Request

```json
{
    "current_password":"Peter@012",
    "password": "Peter@012",
    "password2": "Peter@012"
}
```

### Success Response (200 OK)

```json
{
  "msg": "Password changed successfully"
}
```

### Error Responses

### Incorrect Current Password (400 Bad Request) 

```json
{
  "non_field_errors": [
    "Current Password is incorrect !!"
  ]
}
```

#### Passwords Do Not Match (400 Bad Request)

```json 
{
  "non_field_errors": [
    "Both passwords should match !!"
  ]
}
```

#### Unauthorized (401 Unautherized)
```json
{
  "detail": "Authentication credentials were not provided."
}
```