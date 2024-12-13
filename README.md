# 🌿 Repose of Mind

<div align="center">

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Node](https://img.shields.io/badge/node-%3E%3D16.0.0-brightgreen.svg)
![MongoDB](https://img.shields.io/badge/mongodb-%3E%3D4.4.0-green.svg)
![React](https://img.shields.io/badge/react-%5E18.2.0-blue.svg)
![TypeScript](https://img.shields.io/badge/typescript-%5E5.3.3-blue.svg)

A modern mental wellness companion designed to help you track, improve, and maintain your mental well-being.

[Getting Started](#getting-started) • [Features](#features) • [Documentation](#documentation) • [Support](#support)

![Repose of Mind Screenshot](screenshot.png)

</div>

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (version 16 or higher)
- MongoDB (version 4.4 or higher)
- npm or yarn package manager
- Git

### Quick Start

1. **Clone the Repository**
   ```bash
   git clone https://github.com/yourusername/repose-of-mind.git
   cd repose-of-mind
   ```

2. **Set Up Environment**
   ```bash
   # Install dependencies
   npm install
   npm run install:all

   # Configure environment variables
   cd backend && cp .env.sample .env
   cd ../frontend && cp .env.sample .env
   ```

3. **Start Development Servers**
   ```bash
   # Start both frontend and backend
   npm run dev

   # Access the application
   Frontend: http://localhost:5173
   Backend: http://localhost:5000
   ```

## ✨ Features

### Core Features
- **📝 Smart Journaling**
  - Daily mood tracking
  - Emotion analysis
  - Timestamp support in IST
  - Rich text formatting

- **🤖 AI Chat Support**
  - Powered by Google Gemini AI
  - 24/7 emotional support
  - Personalized responses
  - Conversation history

- **🧘 Mindfulness Resources**
  - Guided meditations
  - Breathing exercises
  - Curated wellness videos
  - Progress tracking

- **🎯 Daily Goals**
  - Custom goal setting
  - Progress tracking
  - Streak monitoring
  - Achievement rewards

### Technical Features
- **🔒 Secure Authentication**
  - JWT-based security
  - Google OAuth integration
  - Password encryption
  - Session management

- **🎨 Modern UI/UX**
  - Dark/Light themes
  - Responsive design
  - Intuitive navigation
  - Accessibility support

## 🛠️ Technology Stack

### Frontend
- **Core**: React 18, TypeScript
- **Styling**: Tailwind CSS, shadcn/ui
- **Build**: Vite
- **State**: React Context
- **Routing**: React Router 6

### Backend
- **Core**: Node.js, Express
- **Database**: MongoDB
- **Auth**: JWT, Google OAuth
- **AI**: Google Gemini API

## 📖 Documentation

- [User Guide](./docs/USER_GUIDE.md)
- [Frontend Documentation](./frontend/README.md)
- [Backend Documentation](./backend/README.md)
- [API Reference](./docs/API.md)

## 🔧 Development

```bash
# Install all dependencies
npm run install:all

# Start development environment
npm run dev

# Build for production
npm run build:frontend
npm run build:backend

# Run tests
npm run test:frontend
npm run test:backend
```

## 🌟 Key Benefits

- **Mental Health Support**: 24/7 access to AI-powered emotional support
- **Progress Tracking**: Monitor your mental wellness journey
- **Privacy Focused**: Secure data handling and user privacy
- **Customizable**: Personalized experience for each user
- **Always Available**: Access your support system anytime, anywhere

## 🤝 Contributing

We welcome contributions! Here's how you can help:

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/AmazingFeature`
3. Commit your changes: `git commit -m 'Add AmazingFeature'`
4. Push to the branch: `git push origin feature/AmazingFeature`
5. Open a Pull Request

Please read our [Contributing Guidelines](./CONTRIBUTING.md) for details.

## 🐛 Troubleshooting

Common issues and solutions:

### MongoDB Connection Issues
```bash
# Check MongoDB status
sudo systemctl status mongodb

# Start MongoDB if not running
sudo systemctl start mongodb
```

### Build Issues
```bash
# Clear dependencies and reinstall
rm -rf node_modules
npm run install:all

# Clear build cache
rm -rf frontend/dist backend/dist
```

## 📞 Support

Need help? We're here for you!

- 📧 Email: iamsaujanya.ig@gmail.com
- 💬 GitHub Issues: [Create an issue](https://github.com/yourusername/repose-of-mind/issues)
- 💬 Discussions: Join our [GitHub Discussions](https://github.com/yourusername/repose-of-mind/discussions)

## 🙏 Acknowledgments

- [shadcn/ui](https://ui.shadcn.com/) - UI components
- [Google Gemini](https://ai.google.dev/) - AI capabilities
- [MongoDB](https://www.mongodb.com/) - Database
- [React](https://reactjs.org/) - Frontend framework
- [Node.js](https://nodejs.org/) - Backend runtime

---

<div align="center">
Made with ❤️ by Repose of Mind Team
</div>
