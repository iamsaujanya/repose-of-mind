# Repose of Mind

<div align="center">

A mental health companion web application that provides tools and resources for mental wellness.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Node](https://img.shields.io/badge/node-%3E%3D16.0.0-brightgreen.svg)
![MongoDB](https://img.shields.io/badge/mongodb-%3E%3D4.4.0-green.svg)
![React](https://img.shields.io/badge/react-%5E18.2.0-blue.svg)
![TypeScript](https://img.shields.io/badge/typescript-%5E5.3.3-blue.svg)
![Vite](https://img.shields.io/badge/vite-%5E5.0.8-brightgreen.svg)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%5E3.4.16-blue.svg)

[Setup Guide](#setup-guide) • [Features](#features) • [Development](#development) • [Support](#support)

</div>

---

## 📋 Table of Contents
- [Features](#features)
- [Prerequisites](#prerequisites)
- [Setup Guide](#setup-guide)
  - [API Keys Setup](#api-keys-setup)
  - [Environment Setup](#environment-setup)
  - [Installation](#installation)
- [Development](#development)
  - [Project Structure](#project-structure)
  - [Available Scripts](#available-scripts)
- [Contributing](#contributing)
- [Support](#support)
- [License](#license)

## ✨ Features

- **Journal**: Express your thoughts and track your emotional journey
- **AI Chat**: Get support through AI-powered conversations
- **Mindfulness**: Access guided meditation and mindfulness exercises
- **Daily Goals**: Set and track personal goals for mental wellness
- **Dark/Light Mode**: Comfortable viewing experience
- **Responsive Design**: Works on all devices

## 🔧 Prerequisites

- Node.js (v16 or higher)
- MongoDB (v4.4 or higher)
- npm or yarn

## 🚀 Setup Guide

### API Keys Setup

#### 1. MongoDB Atlas
1. Visit [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free account or sign in
3. Create a new cluster
4. Click "Connect" and choose "Connect your application"
5. Copy the connection string
6. Replace `<username>`, `<password>`, `<cluster>`, and `<dbname>` with your details

#### 2. Google OAuth
1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create a new project or select an existing one
3. Enable the Google OAuth API
4. Create OAuth 2.0 Client ID (Web Application)
5. Add authorized JavaScript origins:
   - `http://localhost:5173` (for development)
6. Add authorized redirect URIs:
   - `http://localhost:5173/login` (for development)
7. Copy the Client ID

#### 3. Google Gemini API
1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy the generated API key

### Environment Setup

1. Backend Configuration:
   ```bash
   cd backend
   cp .env.sample .env
   ```
   Edit `.env` and add your:
   - MongoDB connection string
   - JWT secret (generate using provided command)
   - Gemini API key

2. Frontend Configuration:
   ```bash
   cd frontend
   cp .env.sample .env
   ```
   Edit `.env` and add your:
   - Google OAuth Client ID

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/iamsaujanya/repose-of-mind.git
   cd repose-of-mind
   ```

2. Install dependencies:
   ```bash
   # Install root dependencies
   npm install

   # Install frontend and backend dependencies
   npm run install:all
   ```

3. Start MongoDB:
   ```bash
   # Start MongoDB service
   sudo systemctl start mongodb
   ```

4. Start the development servers:
   ```bash
   npm run dev
   ```

5. Access the application:
   - Frontend: http://localhost:5173
   - Backend: http://localhost:5000

## 💻 Development

### Available Scripts

- Frontend development server: `npm run dev:frontend`
- Backend development server: `npm run dev:backend`
- Build frontend: `npm run build:frontend`
- Build backend: `npm run build:backend`

### Project Structure

```
repose-of-mind/
├── frontend/              # React frontend
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── lib/          # Utilities
│   │   └── App.tsx       # Main app component
│   └── package.json
├── backend/              # Express backend
│   ├── src/
│   │   ├── models/       # MongoDB models
│   │   ├── routes/       # API routes
│   │   ├── middleware/   # Custom middleware
│   │   └── server.ts     # Server entry point
│   └── package.json
└── package.json         # Root package.json
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📞 Support

Need help? Contact us:
- 📧 Email: iamsaujanya.ig@gmail.com
- 💻 GitHub Issues: [Create an issue](https://github.com/iamsaujanya/repose-of-mind/issues)
- 💬 Discussions: [Join discussions](https://github.com/iamsaujanya/repose-of-mind/discussions)

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

<div align="center">
Made with 💖 by Repose of Mind Team
</div>
