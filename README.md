# Repose of Mind

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Node](https://img.shields.io/badge/node-%3E%3D16.0.0-brightgreen.svg)
![MongoDB](https://img.shields.io/badge/mongodb-%3E%3D4.4.0-green.svg)
![React](https://img.shields.io/badge/react-%5E18.2.0-blue.svg)

> A mental health companion web application that helps users track their mental well-being through journaling, AI chat support, mindfulness exercises, and daily goal tracking.

![Project Screenshot](screenshot.png)

## ✨ Features

- 📝 **Smart Journaling** - Track thoughts and emotions with mood analysis
- 🤖 **AI Chat Support** - Get instant support from our Gemini AI-powered chatbot
- 🧘 **Mindfulness Resources** - Access guided meditations and breathing exercises
- 🎯 **Daily Goals** - Set and track personal wellness goals
- 🌓 **Dark/Light Mode** - Choose your preferred theme
- 🔒 **Secure Authentication** - Google OAuth and JWT-based security
- 📱 **Responsive Design** - Works on all devices

## 🚀 Quick Start

### Prerequisites

- Node.js ≥ 16
- MongoDB ≥ 4.4
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/repose-of-mind.git
cd repose-of-mind
```

2. Install dependencies
```bash
npm install
npm run install:all
```

3. Set up environment variables
```bash
# Backend
cd backend
cp .env.sample .env

# Frontend
cd ../frontend
cp .env.sample .env
```

4. Start development servers
```bash
# Start both frontend and backend
npm run dev

# Or separately
npm run dev:frontend  # http://localhost:5173
npm run dev:backend   # http://localhost:5000
```

## 📖 Documentation

- [Frontend Documentation](./frontend/README.md)
- [Backend Documentation](./backend/README.md)
- [API Documentation](./backend/API.md)

## 🏗️ Built With

### Frontend
- React 18
- TypeScript
- Tailwind CSS
- shadcn/ui
- Vite

### Backend
- Node.js
- Express
- TypeScript
- MongoDB
- Google Gemini AI

## 📁 Project Structure

```
repose-of-mind/
├── frontend/          # React frontend application
├── backend/          # Express backend API
└── package.json      # Root package.json for scripts
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 🔧 Development

```bash
# Install dependencies
npm run install:all

# Start development servers
npm run dev

# Build for production
npm run build:frontend
npm run build:backend
```

## 🧪 Testing

```bash
# Run frontend tests
cd frontend && npm test

# Run backend tests
cd backend && npm test
```

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Authors

- **Saujanya** - *Initial work* - [GitHub](https://github.com/yourusername)

## 🙏 Acknowledgments

- [shadcn/ui](https://ui.shadcn.com/) - Beautiful UI components
- [Google Gemini](https://ai.google.dev/) - AI capabilities
- [MongoDB](https://www.mongodb.com/) - Database
- [React](https://reactjs.org/) - Frontend framework
- [Node.js](https://nodejs.org/) - Backend runtime

## 📞 Support

For support, please:
- Email: iamsaujanya.ig@gmail.com
- Open an issue in the repository
- Check existing documentation