# Fishing App API Documentation

Base URL: `{API_URL}/api`

## Authentication

All protected endpoints require a JWT token in the `Authorization` header:
```
Authorization: Bearer <token>
```

---

## Auth Endpoints

### `POST /auth/signup`
Create a new user account.

**Request:**
```json
{
  "email": "user@example.com",
  "username": "fisherman123",
  "password": "SecurePass123",
  "full_name": "John Fisher"
}
```

**Response (201):**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": 1,
    "email": "user@example.com",
    "username": "fisherman123"
  }
}
```

---

### `POST /auth/login`
Authenticate with email and password.

**Request:**
```json
{
  "email": "user@example.com",
  "password": "SecurePass123"
}
```

**Response (200):**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": 1,
    "email": "user@example.com",
    "username": "fisherman123"
  }
}
```

---

## Catches Endpoints

### `GET /catches`
Get all public catches with optional filters.

**Query Parameters:**
- `user_id` - Filter by user ID
- `location_id` - Filter by location
- `species` - Filter by fish species (case-insensitive)

**Example:** `GET /catches?species=bass&user_id=1`

**Response (200):**
```json
[
  {
    "id": 1,
    "user_id": 1,
    "fish_species": "bass",
    "weight_lbs": 3.5,
    "length_inches": 14.2,
    "bait_type": "live shiners",
    "catch_method": "spinning",
    "caught_at": "2024-01-15T10:30:00Z",
    "notes": "Great fight!",
    "is_public": true,
    "created_at": "2024-01-15T10:35:00Z"
  }
]
```

---

### `GET /catches/my-catches`
Get authenticated user's catches (including private ones).

**Auth Required:** Yes

**Response (200):** Array of catch objects

---

### `GET /catches/:id`
Get a single catch by ID.

**Parameters:**
- `id` - Catch ID (required)

**Response (200):** Single catch object

---

### `POST /catches`
Log a new catch.

**Auth Required:** Yes

**Request:**
```json
{
  "fish_species": "bass",
  "weight_lbs": 3.5,
  "length_inches": 14.2,
  "bait_type": "live shiners",
  "catch_method": "spinning",
  "caught_at": "2024-01-15T10:30:00Z",
  "location_id": 5,
  "notes": "Great fight!",
  "is_public": true
}
```

**Response (201):** Created catch object

---

### `PATCH /catches/:id`
Update a catch (owner only).

**Auth Required:** Yes

**Request:**
```json
{
  "weight_lbs": 4.2,
  "notes": "Updated notes"
}
```

**Response (200):** Updated catch object

---

### `DELETE /catches/:id`
Delete a catch (owner only).

**Auth Required:** Yes

**Response:** 204 No Content

---

## Locations Endpoints

### `GET /locations`
Get public fishing locations with optional radius filter.

**Query Parameters:**
- `latitude` - Center latitude
- `longitude` - Center longitude
- `radius_miles` - Search radius in miles

**Example:** `GET /locations?latitude=37.5&longitude=-76.5&radius_miles=10`

**Response (200):**
```json
[
  {
    "id": 1,
    "name": "Chesapeake Bay",
    "latitude": 37.5,
    "longitude": -76.5,
    "description": "Great fishing spot",
    "location_type": "bay",
    "is_public": true,
    "created_by_id": 1,
    "created_at": "2024-01-10T15:00:00Z"
  }
]
```

---

### `GET /locations/:id`
Get location details with catch count.

**Response (200):**
```json
{
  "id": 1,
  "name": "Chesapeake Bay",
  "latitude": 37.5,
  "longitude": -76.5,
  "description": "Great fishing spot",
  "location_type": "bay",
  "is_public": true,
  "catch_count": 42
}
```

---

### `POST /locations`
Create a new fishing location.

**Auth Required:** Yes

**Request:**
```json
{
  "name": "Secret Pond",
  "latitude": 37.75,
  "longitude": -76.25,
  "description": "Hidden fishing gem",
  "location_type": "pond",
  "is_public": true
}
```

**Response (201):** Created location object

---

### `PATCH /locations/:id`
Update a location (creator only).

**Auth Required:** Yes

**Request:**
```json
{
  "description": "Updated description",
  "is_public": false
}
```

**Response (200):** Updated location object

---

## Error Responses

### 400 Bad Request
```json
{
  "error": "Invalid input: fish_species is required"
}
```

### 401 Unauthorized
```json
{
  "error": "No token provided" 
}
```

### 403 Forbidden
```json
{
  "error": "Not authorized to modify this resource"
}
```

### 404 Not Found
```json
{
  "error": "Catch not found"
}
```

### 500 Internal Server Error
```json
{
  "error": "Internal server error"
}
```

---

## Rate Limiting

Currently no rate limiting. Will be added in production.

---

## Versioning

API Version: 1.0.0

Future changes may introduce `/api/v2` endpoints while maintaining `/api/v1` support.
