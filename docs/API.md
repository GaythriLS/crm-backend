# CRM Backend — API Reference

## Base URL
```
http://localhost:5000/api
```

---

## Authentication

### Register
**POST** `/auth/register`

Request Body:
```json
{
  "username": "john_doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "agent"
}
```

Response `201`:
```json
{
  "success": true,
  "message": "Account created successfully.",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "_id": "64f1a2b3c4d5e6f7a8b9c0d1",
    "username": "john_doe",
    "email": "john@example.com",
    "role": "agent"
  }
}
```

---

### Login
**POST** `/auth/login`

Request Body:
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

Response `200`:
```json
{
  "success": true,
  "message": "Login successful.",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

---

## Customers

### Create Customer
**POST** `/customers`

Request Body:
```json
{
  "name": "Alice Corp",
  "contact_info": {
    "email": "alice@corp.com",
    "phone": "+91-9876543210",
    "address": "123 Business Park, Chennai"
  },
  "company": "Alice Corp Ltd",
  "status": "active",
  "notes": "Key enterprise client"
}
```

---

### List Customers (with filters)
**GET** `/customers?status=active&search=alice&page=1&limit=10`

---

## Cases

### Create Case
**POST** `/cases`

Request Body:
```json
{
  "title": "Login issue on mobile app",
  "description": "Customer unable to login from iOS devices after update.",
  "customer_id": "64f1a2b3c4d5e6f7a8b9c0d1",
  "assigned_to": "64f1a2b3c4d5e6f7a8b9c0d2",
  "priority": "high",
  "status": "open",
  "tags": ["mobile", "auth", "ios"]
}
```

---

### Update Case Status
**PATCH** `/cases/:id`

Request Body:
```json
{
  "status": "resolved",
  "resolution": "Fixed by rolling back to v2.3.1 on the auth service."
}
```

---

## Dashboard

### Get Stats
**GET** `/dashboard/stats`

Response:
```json
{
  "success": true,
  "stats": {
    "totalCustomers": 42,
    "totalCases": 128,
    "totalUsers": 8,
    "casesByStatus": [
      { "_id": "open", "count": 35 },
      { "_id": "resolved", "count": 80 }
    ],
    "casesByPriority": [
      { "_id": "high", "count": 20 }
    ],
    "recentCases": []
  }
}
```

---

## Error Responses

All errors follow this format:
```json
{
  "success": false,
  "message": "Descriptive error message here."
}
```

| Status Code | Meaning |
|-------------|---------|
| 400 | Bad Request / Validation Error |
| 401 | Unauthorized (no or invalid token) |
| 403 | Forbidden (insufficient role) |
| 404 | Resource not found |
| 500 | Internal Server Error |
