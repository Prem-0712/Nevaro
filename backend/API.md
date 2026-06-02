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


## Login

Login using registered email and password

### Endpoint
- **Method:** `POST`
- **URL:** `/api/account/login/`
- **Full URL:** `http://0.0.0.0:8000/api/account/login/`

### Example Request

```json
{
    "email": "kembulkarakshat9967@gmail.co",
    "password": "Akshat@"
}
```

### Success Responses

#### User Logged in Successfully (200 Ok)

```json
{
    "success": true,
    "data": {
        "msg": "Login Successfully done",
        "jwt_token": {
            "refresh": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTc3MTA5NTczMSwiaWF0IjoxNzcxMDA5MzMxLCJqdGkiOiJiNmY5YmZkMDc3NDA0ZjJhYjViNTNhNGIwNjFlNjFmOSIsInVzZXJfaWQiOiIxIn0.S69UfOTQ4-iFEwJvX54oBACobgDWuF0jgDE7F-1eeAs",
            "access": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzcxMDA5NjMxLCJpYXQiOjE3NzEwMDkzMzEsImp0aSI6ImIxMDI3ZTRlZGEzOTQ5YWE4NDNmMDBhZmUwN2IzNGEyIiwidXNlcl9pZCI6IjEifQ.RM2zd0CKWN1D-xUjrhTUzUCcIg_5R8aQ0vZlnngE28E"
        }
    }
}
```

### Error Responses

#### Password is incorrect (400 Not Found)

```json
{
    "success": false,
    "status_code": 400,
    "errors": {
        "non_field_errors": [
            "Email or password is invalid"
        ]
    }
}
```

#### User does not exist (400 Not Found)

```json
{
    "success": false,
    "status_code": 400,
    "errors": {
        "non_field_errors": [
            "Email does not exist"
        ]
    }
}
```


## Profile  

Retrieve authenticated user profile details.

### Endpoint
- **Method:** `GET`
- **URL:** `/api/account/profile/`
- **Full URL:** `http://0.0.0.0:8000/api/account/profile/`

### Headers
- `Accept: application/json`
- `Authorization: Bearer <access_token>`

### Success Response (200 OK)

Returned when a valid access token is provided.

```json
{
  "success": true,
  "data": {
    "email": "kembulkarakshat9967@gmail.com",
    "name": "akshat",
    "is_active": true,
    "is_customer": true,
    "is_seller": false,
    "is_superuser": false
  }
}
```

### Error Responses

#### Missing Token (401 Unauthorized)

```json
{
  "detail": "Authentication credentials were not provided."
}
```

#### Invalid or Expired Token (401 Unauthorized)

```json
{
  "success": false,
  "status_code": 401,
  "errors": {
    "detail": "Given token not valid for any token type",
    "code": "token_not_valid",
    "messages": [
      {
        "token_class": "AccessToken",
        "token_type": "access",
        "message": "Token is expired"
      }
    ]
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


## Send Reset Password Email

Send a password reset link to the registered email address

### Endpoint 
- **Method:** `POST`
- **URL:** `/api/account/sendresetpass/`
- **Full URL** `http://0.0.0.0:8000/api/account/sendresetpass/`

### Authentication
This endpoint is **public** (no authentication required).

### Headers
- `Content-Type: application/json`
- `Accept: application/json`

### Request Body 
| Field   |  Type  | Required |              Notes                 |
|---------|--------|----------|------------------------------------|
| `email `| string |  Yes     | Must be a registered email address |

### Example Request

```json
{
  "email": "user@example.com"
}
```

### Success Response (200 OK)

```json
{
  "success": true,
  "status_code": 200,
  "message": "Password Reset Link has been successfully sent to the registered email",
  "data": {}
}
```

###   Error Responses

#### Email Does Not Exist (400 Bad Request)

```json
{
  "success": false,
  "status_code": 400,
  "errors": {
    "non_field_errors": [
      "Email Does not exist, register first !!!"
    ]
  }
}
```

## Reset Password 

Reset the user password using a valid reset link recieved vioa email.


### Endpoint

- **Method:** `POST`
- **URL Pattern:** `/api/account/password_reset/<uid>/<token>`

- **Example URL:** `http://0.0.0.0:8000/api/account/password_reset/MQ/d46kyq-7d622cef4207844723baf53c47c97c7a/`

Where:
- `uid` -> Base64 encoded user ID (generated by backend)
- `token` -> Secure password reset token ( generated by backend )

### Authentication 
 
This endpoint is **public**.
Access is validated using `uid` and `token`.

### Headers 

- `Content-Type: application/json`
- `Accept: application/json`

### Request Body 

|    Field    |  Type  | Required |        Notes          |
|-------------|--------|----------|-----------------------|
| `password`  | string | Yes      | New password          |
| `password2` | string | Yes      | Must match `password` |

### Exampe Request

```json
{
  "password": "NewPass@123",
  "password2": "NewPass@123"
}
```

### Success Response (200 OK)

```json
{
  "success": true,
  "status_code": 200,
  "message": "Your password has been reset successfully, try login",
  "data": {}
}
```

### Error Responses

### Passwords Do Not Match (400 Bad Request)

```json
{
  "success": true,
  "status_code": 200,
  "message": "Your password has been reset successfully, try login",
  "data": {}
}
```

#### Invalid or Expired Token (400 Bad Request)

```json
{
  "success": false,
  "status_code": 400,
  "message": "Invalid or expired reset token"
}
```


## NEW ACCESS TOKEN

Get new access token for user using refresh token, when access token is expired.


### Endpoint

- **Method:** `POST`
- **URL Pattern:** `/api/account/refresh-tokens/`

- **Example URL:** `http://0.0.0.0:8000/api/account/refresh-tokens/`

### Authentication 
 
This endpoint is **public**.
Access is validated using `refresh_token`.

### Headers 

- `Content-Type: application/json`
- `Accept: application/json`

### Request Body 

|    Field    |  Type  | Required |        Notes                                              |
|-------------|--------|----------|-----------------------------------------------------------|
| `refresh`   | string | Yes      | logged in user refresh token from local storage           |

### Exampe Request

```json
{
    "refresh":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTc4MDQ4OTEzOCwiaWF0IjoxNzgwNDAyNzM4LCJqdGkiOiI0MGY4NzZkNWM2NzM0ZjU3ODE2YjViZTI2ZTBhYjJhOCIsInVzZXJfaWQiOiIxNSJ9.CTgjPCaAVP0KrSLKTcReu8YrZ7jO9f1EMfEsSL864oo"
}
```

### Success Response (200 OK)

```json
{
    "access": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzgwNDAzMTUyLCJpYXQiOjE3ODA0MDI4NTIsImp0aSI6ImQ1M2NkYmYwZDc5MTQyMWI4MTA5MTQ1MzkyNGQ5MTFiIiwidXNlcl9pZCI6IjE1In0.zocJveEODqKFzfuZJUsqvJZ1rmMR-gmBZtIRbXsgfsU"
}
```

### Error Responses

### Invalid refresh token

```json
{
    "detail": "Token is invalid",
    "code": "token_not_valid"
}
```