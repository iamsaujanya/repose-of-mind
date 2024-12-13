# Repose of Mind API Reference

## Overview

Base URL: `http://localhost:5000/api`

All requests must include:
```http
Content-Type: application/json
```

Protected endpoints require:
```http
Authorization: Bearer <your_jwt_token>
```

## Authentication

### Register
```http
POST /auth/register

Request:
{
  "name": "string",
  "email": "string",
  "password": "string"  // min 6 characters
}

Response: 201 Created
{
  "token": "jwt_token",
  "user": {
    "id": "user_id",
    "name": "user_name",
    "email": "user_email"
  }
}
```

### Login
```http
POST /auth/login

Request:
{
  "email": "string",
  "password": "string"
}

Response: 200 OK
{
  "token": "jwt_token",
  "user": {
    "id": "user_id",
    "name": "user_name",
    "email": "user_email"
  }
}
```

### Google OAuth
```http
POST /auth/google

Request:
{
  "token": "google_oauth_token"
}

Response: 200 OK
{
  "token": "jwt_token",
  "user": {
    "id": "user_id",
    "name": "user_name",
    "email": "user_email",
    "googleId": "google_id"
  }
}
```

## Journal Entries

### Get All Entries
```http
GET /journal

Query Parameters:
- startDate: ISO date (optional)
- endDate: ISO date (optional)

Response: 200 OK
[
  {
    "id": "entry_id",
    "title": "string",
    "content": "string",
    "mood": "happy" | "sad" | "neutral" | "anxious" | "excited",
    "date": "ISO date",
    "createdAt": "ISO date",
    "updatedAt": "ISO date"
  }
]
```

### Create Entry
```http
POST /journal

Request:
{
  "title": "string",
  "content": "string",
  "mood": "happy" | "sad" | "neutral" | "anxious" | "excited",
  "date": "ISO date"  // optional, defaults to now
}

Response: 201 Created
{
  "id": "entry_id",
  "title": "string",
  "content": "string",
  "mood": "string",
  "date": "ISO date",
  "createdAt": "ISO date",
  "updatedAt": "ISO date"
}
```

### Update Entry
```http
PUT /journal/:id

Request:
{
  "title": "string",
  "content": "string",
  "mood": "string",
  "date": "ISO date"
}

Response: 200 OK
{
  "id": "entry_id",
  "title": "string",
  "content": "string",
  "mood": "string",
  "date": "ISO date",
  "updatedAt": "ISO date"
}
```

### Delete Entry
```http
DELETE /journal/:id

Response: 200 OK
{
  "message": "Entry deleted successfully"
}
```

## Daily Goals

### Get All Goals
```http
GET /daily-goals

Query Parameters:
- startDate: ISO date (optional)
- endDate: ISO date (optional)

Response: 200 OK
[
  {
    "id": "goal_id",
    "title": "string",
    "description": "string",
    "completed": boolean,
    "date": "ISO date",
    "createdAt": "ISO date",
    "updatedAt": "ISO date"
  }
]
```

### Create Goal
```http
POST /daily-goals

Request:
{
  "title": "string",
  "description": "string",  // optional
  "date": "ISO date"       // optional, defaults to today
}

Response: 201 Created
{
  "id": "goal_id",
  "title": "string",
  "description": "string",
  "completed": false,
  "date": "ISO date",
  "createdAt": "ISO date",
  "updatedAt": "ISO date"
}
```

### Update Goal
```http
PUT /daily-goals/:id

Request:
{
  "title": "string",
  "description": "string",
  "completed": boolean,
  "date": "ISO date"
}

Response: 200 OK
{
  "id": "goal_id",
  "title": "string",
  "description": "string",
  "completed": boolean,
  "date": "ISO date",
  "updatedAt": "ISO date"
}
```

### Delete Goal
```http
DELETE /daily-goals/:id

Response: 200 OK
{
  "message": "Goal deleted successfully"
}
```

## AI Chat

### Send Message
```http
POST /chat

Request:
{
  "message": "string"
}

Response: 200 OK
{
  "response": "string",
  "timestamp": "ISO date"
}
```

### Get Chat History
```http
GET /chat

Response: 200 OK
{
  "messages": [
    {
      "content": "string",
      "sender": "user" | "bot",
      "timestamp": "ISO date"
    }
  ]
}
```

## Error Responses

### 400 Bad Request
```json
{
  "error": "Validation error message"
}
```

### 401 Unauthorized
```json
{
  "error": "No authentication token, access denied"
}
```

### 403 Forbidden
```json
{
  "error": "Access denied"
}
```

### 404 Not Found
```json
{
  "error": "Resource not found"
}
```

### 500 Server Error
```json
{
  "error": "Internal server error message"
}
```

## Rate Limits

- Authentication: 5 requests/minute/IP
- Journal/Goals API: 100 requests/minute/user
- Chat API: 50 messages/hour/user

## Development

For local development:
1. Clone the repository
2. Install dependencies
3. Copy `.env.sample` to `.env`
4. Set required environment variables
5. Run `npm run dev`

## Support

Need help with the API?
- 📧 Email: iamsaujanya.ig@gmail.com
- 💻 GitHub Issues: [Create an issue](https://github.com/yourusername/repose-of-mind/issues)
- 💬 Discussions: [Join discussions](https://github.com/yourusername/repose-of-mind/discussions)
