# Repose of Mind Backend

![Express](https://img.shields.io/badge/express-%5E4.18.2-blue.svg)
![TypeScript](https://img.shields.io/badge/typescript-%5E5.3.3-blue.svg)
![MongoDB](https://img.shields.io/badge/mongodb-%5E8.0.3-green.svg)
![License](https://img.shields.io/badge/license-MIT-blue.svg)

> Backend server for Repose of Mind - A mental health companion application. Built with Express.js, TypeScript, and MongoDB.

## 📚 Table of Contents

- [Features](#-features)
- [Prerequisites](#-prerequisites)
- [Installation](#-installation)
- [API Documentation](#-api-documentation)
- [Development](#-development)
- [Testing](#-testing)
- [Deployment](#-deployment)
- [Troubleshooting](#-troubleshooting)

## ✨ Features

- 🔐 **JWT Authentication** with Google OAuth support
- 📝 **Journal Management** with mood tracking
- 🤖 **AI Chat Integration** using Google Gemini
- 🎯 **Daily Goals System** with progress tracking
- 🌏 **IST Timezone Support** for date handling
- 🛡️ **Security Features** including input validation

## 🔧 Prerequisites

- Node.js ≥ 16.0.0
- MongoDB ≥ 4.4.0
- npm or yarn
- Google Cloud account for OAuth & Gemini API

## 🚀 Installation

1. **Clone and Install**
```bash
cd repose-of-mind/backend
npm install
```

2. **Environment Setup**
```bash
cp .env.sample .env
```

Configure your `.env`:
```env
PORT=5000
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
GEMINI_API_KEY=your_gemini_api_key
NODE_ENV=development
```

3. **Start MongoDB**
```bash
sudo systemctl start mongodb
```

4. **Run the Server**
```bash
# Development
npm run dev

# Production
npm run build && npm start
```

## 📡 API Documentation

### Auth Endpoints
\`\`\`
POST /api/auth/register - Register new user
POST /api/auth/login    - Login user
POST /api/auth/google   - Google OAuth
GET  /api/auth/profile  - Get user profile
\`\`\`

### Journal Endpoints
\`\`\`
GET    /api/journal     - Get all entries
POST   /api/journal     - Create entry
GET    /api/journal/:id - Get entry
PUT    /api/journal/:id - Update entry
DELETE /api/journal/:id - Delete entry
\`\`\`

### Daily Goals Endpoints
\`\`\`
GET    /api/daily-goals      - Get all goals
POST   /api/daily-goals      - Create goal
PUT    /api/daily-goals/:id  - Update goal
DELETE /api/daily-goals/:id  - Delete goal
POST   /api/daily-goals/:id/complete - Complete goal
\`\`\`

### Chat Endpoints
\`\`\`
POST /api/chat        - Send message
GET  /api/chat/history - Get chat history
\`\`\`

## 📁 Project Structure

```
src/
├── models/           # Database models
├── routes/          # API routes
├── middleware/      # Custom middleware
├── services/        # Business logic
└── server.ts        # Entry point
```

## 🛠️ Development

```bash
# Start development server
npm run dev

# Build TypeScript
npm run build

# Run tests
npm test

# Check linting
npm run lint
```

## 🧪 Testing

```bash
# Run all tests
npm test

# Run specific tests
npm test -- --grep "Auth"

# Generate coverage
npm run test:coverage
```

## 🚀 Deployment

1. Build the application
```bash
npm run build
```

2. Set production environment
```bash
export NODE_ENV=production
```

3. Start the server
```bash
npm start
```

## ❗ Troubleshooting

### MongoDB Issues
```bash
# Check MongoDB status
sudo systemctl status mongodb

# Fix permissions
sudo chown -R mongodb:mongodb /var/lib/mongodb
```

### Build Issues
```bash
# Clean and rebuild
rm -rf dist/
npm run build
```

## 🔒 Security

- JWT tokens expire in 24 hours
- Password hashing with bcrypt
- Input validation & sanitization
- MongoDB injection prevention
- CORS configuration

## 📝 Environment Variables

```env
PORT=5000                 # Server port
MONGODB_URI=             # MongoDB connection string
JWT_SECRET=              # JWT signing key
GEMINI_API_KEY=          # Google Gemini API key
NODE_ENV=development     # Environment
```

## 👥 Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📞 Support

- Check [Troubleshooting](#-troubleshooting)
- Review GitHub issues
- Email: iamsaujanya.ig@gmail.com

## 📄 License

MIT License - see the [LICENSE](LICENSE) file