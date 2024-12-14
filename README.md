# 🎨 Repose of Mind Frontend

<div align="center">

![React](https://img.shields.io/badge/react-%5E18.2.0-blue.svg)
![TypeScript](https://img.shields.io/badge/typescript-%5E5.3.3-blue.svg)
![Vite](https://img.shields.io/badge/vite-%5E5.0.8-brightgreen.svg)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%5E3.4.16-blue.svg)

The frontend application for Repose of Mind - A modern mental wellness companion built with React and TypeScript.

[Setup](#-setup) • [Development](#-development) • [Components](#-components) • [Styling](#-styling)

</div>

## 📋 Table of Contents

- [Setup](#-setup)
- [Development](#-development)
- [Project Structure](#-project-structure)
- [Components](#-components)
- [Styling](#-styling)
- [State Management](#-state-management)
- [Testing](#-testing)
- [Deployment](#-deployment)
- [Troubleshooting](#-troubleshooting)

## 🚀 Setup

### Prerequisites

- Node.js ≥ 16.0.0
- npm or yarn
- Backend server running (see [Backend README]((../backend/README.md)))

### Installation

1. **Install Dependencies**
   ```bash
   cd repose-of-mind/frontend
   npm install
   ```

2. **Environment Configuration**
   ```bash
   cp .env.sample .env
   ```
   
   Configure the following variables:
   ```env
   VITE_API_URL=http://localhost:5000
   VITE_GOOGLE_CLIENT_ID=your_google_client_id
   ```

3. **Start Development Server**
   ```bash
   npm run dev
   ```
   
   Access the application at `http://localhost:5173`

## 💻 Development

### Available Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run tests
npm test

# Check types
npm run typecheck

# Lint code
npm run lint
```

### Code Quality Tools

- **TypeScript** for static typing
- **ESLint** for code linting
- **Prettier** for code formatting
- **Husky** for pre-commit hooks

## 📁 Project Structure

```
src/
├── components/         # React components
│   ├── auth/          # Authentication components
│   ├── chat/          # Chat interface components
│   ├── goals/         # Goal tracking components
│   ├── journal/       # Journaling components
│   ├── layout/        # Layout components
│   ├── mindfulness/   # Mindfulness components
│   └── ui/            # Reusable UI components
├── lib/               # Utility functions
├── hooks/             # Custom React hooks
├── types/             # TypeScript type definitions
├── styles/            # Global styles
└── App.tsx            # Main application component
```

## 🧩 Components

### Core Components

- **Authentication**
  - Login
  - Register
  - Profile
  - OAuth Integration

- **Journal**
  - Entry Editor
  - Mood Tracker
  - Calendar View
  - Entry List

- **Chat**
  - Message Interface
  - Chat History
  - AI Integration
  - Response Handling

- **Goals**
  - Goal Creator
  - Progress Tracker
  - Streak Counter
  - Achievement Display

### UI Components

All UI components are built using shadcn/ui and can be found in `src/components/ui/`:

- Button
- Card
- Dialog
- Input
- Select
- Checkbox
- Avatar
- Dropdown

## 🎨 Styling

### Tailwind Configuration

```js
// tailwind.config.js
module.exports = {
  darkMode: ["class"],
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Custom color palette
        primary: { ... },
        secondary: { ... }
      },
      // Custom animations
      keyframes: { ... },
      // Responsive breakpoints
      screens: { ... }
    }
  }
}
```

### Theme System

- Dark/Light mode support
- CSS variables for dynamic theming
- Consistent color palette
- Responsive design utilities

## 📊 State Management

- React Context for global state
- Local state with useState
- Form state with controlled components
- Auth state persistence
- Theme preferences storage

## 🧪 Testing

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Generate coverage report
npm run test:coverage
```

## 📦 Deployment

1. **Build the Application**
   ```bash
   npm run build
   ```

2. **Preview the Build**
   ```bash
   npm run preview
   ```

3. **Deployment Checklist**
   - Environment variables configured
   - API endpoints updated
   - Assets optimized
   - Performance tested
   - SEO meta tags added

## ❗ Troubleshooting

### Common Issues

1. **Build Failures**
   ```bash
   # Clear build cache
   rm -rf dist
   rm -rf node_modules/.vite
   npm install
   ```

2. **Type Errors**
   ```bash
   # Update TypeScript definitions
   npm run typecheck
   ```

3. **Styling Issues**
   ```bash
   # Rebuild Tailwind CSS
   npm run build:css
   ```

### Development Tips

- Use React DevTools for component debugging
- Check Network tab for API issues
- Verify environment variables
- Clear browser cache if needed

## 🔒 Security

- Secure token storage
- XSS prevention
- CSRF protection
- Input sanitization
- Secure routing

## 📞 Support

Need help with the frontend? Contact us:

- 📧 Email: iamsaujanya.ig@gmail.com
- 💻 GitHub Issues: [Create an issue](https://github.com/iamsaujanya/repose-of-mind/issues)
- 💬 Discussions: Join our [GitHub Discussions](https://github.com/iamsaujanya/repose-of-mind/discussions)

---

<div align="center">
Made with 💜 by the Repose of Mind Frontend Team
</div>
