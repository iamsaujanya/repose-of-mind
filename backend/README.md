# 🚀 Repose of Mind Backend

<div align="center">

![Express](https://img.shields.io/badge/express-%5E4.18.2-blue.svg)
![TypeScript](https://img.shields.io/badge/typescript-%5E5.3.3-blue.svg)
![MongoDB](https://img.shields.io/badge/mongodb-%5E8.0.3-green.svg)
![Node.js](https://img.shields.io/badge/node-%3E%3D16.0.0-brightgreen.svg)

The backend server for Repose of Mind - A robust Node.js API powering mental wellness features.

[Setup](#-setup) • [API Reference](#-api-reference) • [Development](#-development) • [Deployment](#-deployment)

</div>

## 📋 Table of Contents

- [Setup](#-setup)
- [API Reference](#-api-reference)
- [Architecture](#-architecture)
- [Database](#-database)
- [Authentication](#-authentication)
- [Development](#-development)
- [Testing](#-testing)
- [Deployment](#-deployment)
- [Monitoring](#-monitoring)
- [Troubleshooting](#-troubleshooting)

## 🛠️ Setup

### Prerequisites

- Node.js ≥ 16.0.0
- MongoDB ≥ 4.4.0
- npm or yarn
- Google Cloud account (for OAuth & Gemini API)

### Installation

1. **Clone and Install**
   ```bash
   cd repose-of-mind/backend
   npm install
   ```

2. **Environment Setup**
   ```bash
   cp .env.sample .env
   ```

   Required environment variables:
   ```env
   PORT=5000                    # Server port
   MONGODB_URI=                 # MongoDB connection string
   JWT_SECRET=                  # JWT signing key
   GEMINI_API_KEY=             # Google Gemini API key
   NODE_ENV=development        # Environment
   ```

3. **Database Setup**
   ```bash
   # Start MongoDB (Ubuntu/Debian)
   sudo systemctl start mongodb
   
   # Verify MongoDB status
   sudo systemctl status mongodb
   ```

4. **Start Server**
   ```bash
   # Development mode
   npm run dev

   # Production mode
   npm run build && npm start
   ```

## 📡 API Reference

### Authentication Endpoints

```http
POST /api/auth/register
Content-Type: application/json

{
  "name": "string",
  "email": "string",
  "password": "string"
}
```

```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "string",
  "password": "string"
}
```

```http
POST /api/auth/google
Content-Type: application/json

{
  "token": "string"  // Google OAuth token
}
```

### Journal Endpoints

```http
GET /api/journal
Authorization: Bearer <token>
```

```http
POST /api/journal
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "string",
  "content": "string",
  "mood": "happy" | "sad" | "neutral" | "anxious" | "excited"
}
```

### Daily Goals Endpoints

```http
GET /api/daily-goals
Authorization: Bearer <token>
```

```http
POST /api/daily-goals
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "string",
  "description": "string",
  "targetDays": number
}
```

### Chat Endpoints

```http
POST /api/chat
Authorization: Bearer <token>
Content-Type: application/json

{
  "message": "string"
}
```

## 🏗️ Architecture

```
src/
├── models/           # MongoDB schemas
│   ├── User.ts
│   ├── Journal.ts
│   ├── DailyGoal.ts
│   └── Chat.ts
├── routes/          # API routes
│   ├── auth.ts
│   ├── journal.ts
│   ├── dailyGoals.ts
│   └── chat.ts
├── middleware/      # Custom middleware
│   ├── auth.ts
│   └── validation.ts
├── services/        # Business logic
│   └── gemini.ts
├── utils/          # Helper functions
│   └── date.ts
└── server.ts       # Entry point
```

## 🗄️ Database

### MongoDB Collections

- **Users**: Authentication and profile data
- **Journals**: User journal entries and moods
- **DailyGoals**: User goals and progress
- **Chats**: AI conversation history

### Indexes

```typescript
// User indexes
userSchema.index({ email: 1 }, { unique: true });

// Journal indexes
journalSchema.index({ userId: 1, date: -1 });

// DailyGoals indexes
dailyGoalSchema.index({ userId: 1, createdAt: -1 });
```

## 🔒 Authentication

- JWT-based authentication
- Google OAuth integration
- Token expiration handling
- Password hashing with bcrypt
- Role-based access control

## 💻 Development

```bash
# Start development server
npm run dev

# Build TypeScript
npm run build

# Run tests
npm test

# Check linting
npm run lint

# Type checking
npm run typecheck
```

## 🧪 Testing

```bash
# Run all tests
npm test

# Run specific test suite
npm test -- --grep "Auth"

# Generate coverage report
npm run test:coverage
```

## 📦 Deployment

1. **Build Application**
   ```bash
   npm run build
   ```

2. **Set Production Environment**
   ```bash
   export NODE_ENV=production
   ```

3. **Start Server**
   ```bash
   npm start
   ```

## 📊 Monitoring

- Error logging with Winston
- Performance monitoring
- API request logging
- Database query monitoring
- Memory usage tracking

## ❗ Troubleshooting

### Common Issues

1. **MongoDB Connection**
   ```bash
   # Check MongoDB status
   sudo systemctl status mongodb

   # View MongoDB logs
   sudo tail -f /var/log/mongodb/mongodb.log

   # Fix permissions
   sudo chown -R mongodb:mongodb /var/lib/mongodb
   ```

2. **Build Issues**
   ```bash
   # Clean and rebuild
   rm -rf dist/
   npm run build
   ```

3. **Memory Issues**
   ```bash
   # Increase Node.js memory limit
   export NODE_OPTIONS=--max_old_space_size=4096
   ```

### Security Measures

- Input validation
- Request rate limiting
- CORS configuration
- XSS prevention
- CSRF protection
- SQL injection prevention

## 🔍 Logging

```typescript
// Error logging
logger.error('Database connection failed', {
  error: err.message,
  timestamp: new Date(),
  service: 'mongodb'
});

// API request logging
logger.info('API request', {
  method: req.method,
  path: req.path,
  duration: responseTime
});
```

## 📞 Support

Need help with the backend? Contact us:

- 📧 Email: iamsaujanya.ig@gmail.com
- 💻 GitHub Issues: [Create an issue](https://github.com/iamsaujanya/repose-of-mind/issues)
- 💬 Discussions: Join our [GitHub Discussions](https://github.com/iamsaujanya/repose-of-mind/discussions)

## 🔄 Continuous Integration

- GitHub Actions workflow
- Automated testing
- Code quality checks
- Docker image builds
- Deployment automation

## 📈 Performance

- Response time monitoring
- Database query optimization
- Caching strategies
- Load balancing
- Rate limiting

---

<div align="center">
Made with 💻 by the Repose of Mind Backend Team
</div>
