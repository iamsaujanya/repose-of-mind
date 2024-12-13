# Repose of Mind API Documentation

Welcome to the Repose of Mind API! This API allows you to integrate mental wellness features into your applications.

## 🔑 Authentication

Before using the API endpoints, you need to authenticate. We use JWT (JSON Web Tokens) for authentication.

### Getting Started

1. Register an account or log in
2. Use the received JWT token in subsequent requests
3. Include the token in the Authorization header:
   ```
   Authorization: Bearer your_jwt_token
   ```

### Authentication Endpoints

#### Register a New User
```http
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securepassword123"
}
```

#### Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "securepassword123"
}
```

#### Google OAuth Login
```http
POST /api/auth/google
Content-Type: application/json

{
  "token": "google_oauth_token"
}
```

## 📝 Journal API

Track and manage journal entries with mood tracking.

### Endpoints

#### Get All Entries
```http
GET /api/journal

# Query Parameters
from: ISO date    # Optional: Filter entries from date
to: ISO date      # Optional: Filter entries to date
```

#### Create Entry
```http
POST /api/journal
Content-Type: application/json

{
  "title": "My Journal Entry",
  "content": "Today was a great day...",
  "mood": "happy",  # One of: happy, sad, neutral, anxious, excited
  "date": "2024-01-13T10:30:00Z"  # Optional, defaults to current time
}
```

#### Update Entry
```http
PUT /api/journal/:id
Content-Type: application/json

{
  "title": "Updated Title",
  "content": "Updated content...",
  "mood": "excited"
}
```

#### Delete Entry
```http
DELETE /api/journal/:id
```

## 🎯 Daily Goals API

Manage daily mental wellness goals.

### Endpoints

#### List Goals
```http
GET /api/daily-goals

# Query Parameters
startDate: ISO date  # Optional: Filter goals from date
endDate: ISO date    # Optional: Filter goals to date
```

#### Create Goal
```http
POST /api/daily-goals
Content-Type: application/json

{
  "title": "Practice Mindfulness",
  "description": "10 minutes of meditation",  # Optional
  "date": "2024-01-13"  # Optional, defaults to today
}
```

#### Update Goal
```http
PUT /api/daily-goals/:id
Content-Type: application/json

{
  "title": "Updated Goal",
  "description": "New description",
  "completed": true
}
```

## 💬 AI Chat API

Interact with our mental wellness AI companion.

### Endpoints

#### Send Message
```http
POST /api/chat
Content-Type: application/json

{
  "message": "I'm feeling anxious today"
}
```

#### Get Chat History
```http
GET /api/chat
```

## ⚡ Rate Limits

To ensure fair usage, we implement the following rate limits:

- Authentication: 5 requests per minute per IP
- Journal/Goals API: 100 requests per minute per user
- Chat API: 50 messages per hour per user

## 🔒 Security Best Practices

1. Never share your JWT token
2. Use HTTPS for all requests
3. Implement proper error handling
4. Store sensitive data securely
5. Validate user input before sending

## ❌ Error Handling

The API uses standard HTTP status codes and returns errors in this format:

```json
{
  "error": "Error message here",
  "code": "ERROR_CODE",  // Optional
  "details": {}          // Optional
}
```

Common status codes:
- `400`: Bad Request - Invalid input
- `401`: Unauthorized - Invalid/missing token
- `403`: Forbidden - Insufficient permissions
- `404`: Not Found - Resource doesn't exist
- `429`: Too Many Requests - Rate limit exceeded
- `500`: Server Error - Something went wrong on our end

## 📚 Examples

### JavaScript/TypeScript
```typescript
// Authentication
const login = async (email: string, password: string) => {
  const response = await fetch('http://localhost:5000/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });
  return await response.json();
};

// Create Journal Entry
const createEntry = async (token: string, entry: JournalEntry) => {
  const response = await fetch('http://localhost:5000/api/journal', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(entry)
  });
  return await response.json();
};
```

### Python
```python
import requests

# Authentication
def login(email: str, password: str):
    response = requests.post(
        'http://localhost:5000/api/auth/login',
        json={'email': email, 'password': password}
    )
    return response.json()

# Create Journal Entry
def create_entry(token: str, entry: dict):
    response = requests.post(
        'http://localhost:5000/api/journal',
        headers={'Authorization': f'Bearer {token}'},
        json=entry
    )
    return response.json()
```

## 🔄 Webhook Events

Subscribe to these events for real-time updates:

- `journal.created`: New journal entry created
- `journal.updated`: Journal entry updated
- `goal.completed`: Daily goal marked as complete
- `goal.streak`: Goal streak milestone reached

## 📞 Support

Need help? We're here for you!

- 📧 Email: iamsaujanya.ig@gmail.com
- 🐛 Issues: [GitHub Issues](https://github.com/yourusername/repose-of-mind/issues)
- 📖 Discussions: Join our [GitHub Discussions](https://github.com/yourusername/repose-of-mind/discussions)

## 🛠️ Development

1. Clone the repository
2. Install dependencies
3. Copy `.env.sample` to `.env`
4. Set up your environment variables
5. Start the development server

## 📄 License

This API is licensed under the MIT License. See the [LICENSE](../LICENSE) file for details.
