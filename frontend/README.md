# Repose of Mind Frontend

![React](https://img.shields.io/badge/react-%5E18.2.0-blue.svg)
![TypeScript](https://img.shields.io/badge/typescript-%5E5.3.3-blue.svg)
![Vite](https://img.shields.io/badge/vite-%5E5.0.8-brightgreen.svg)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%5E3.4.16-blue.svg)
![License](https://img.shields.io/badge/license-MIT-blue.svg)

> The frontend application for Repose of Mind - A mental health companion built with React, TypeScript, and Tailwind CSS.

## 📚 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Getting Started](#-getting-started)
- [Project Structure](#-project-structure)
- [Development](#-development)
- [Styling](#-styling)
- [Components](#-components)
- [Testing](#-testing)

## ✨ Features

- 🎨 **Modern UI** with shadcn/ui components
- 🌓 **Dark/Light Mode** with theme persistence
- 📱 **Responsive Design** for all devices
- 🔒 **Secure Authentication** with Google OAuth
- 🎯 **Real-time Updates** for goals and journals
- 🌍 **IST Timezone Support** for date handling
- 🚀 **Fast Development** with Vite

## 🛠️ Tech Stack

- **Framework**: React 18
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Components**: shadcn/ui
- **Build Tool**: Vite
- **Routing**: React Router DOM
- **Date Handling**: date-fns & date-fns-tz
- **HTTP Client**: Native fetch API

## 🚀 Getting Started

1. **Install Dependencies**

```bash
cd repose-of-mind/frontend
npm install
```

2. **Environment Setup**

```bash
cp .env.sample .env
```

Configure `.env`:

```env
VITE_API_URL=http://localhost:5000
VITE_GOOGLE_CLIENT_ID=your_google_client_id
```

3. **Start Development Server**

```bash
npm run dev
```

Visit `http://localhost:5173`

## 📁 Project Structure

```
src/
├── components/         # React components
│   ├── auth/          # Authentication
│   ├── chat/          # AI chat
│   ├── goals/         # Daily goals
│   ├── journal/       # Journaling
│   ├── layout/        # Layout components
│   ├── pages/         # Page components
│   └── ui/            # UI components
├── lib/               # Utilities
├── styles/            # Global styles
└── App.tsx            # Main component
```

## 💻 Development

```bash
# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Type checking
npm run typecheck

# Linting
npm run lint
```

## 🎨 Styling

We use Tailwind CSS with custom configuration:

```js
// tailwind.config.js
module.exports = {
  darkMode: ["class"],
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Custom colors
      }
    }
  }
}
```

## 🧩 Components

### UI Components
- Buttons
- Cards
- Dialogs
- Dropdowns
- Forms
- Navigation

### Feature Components
- Journal Editor
- Goal Tracker
- Chat Interface
- Calendar View
- Profile Management

## 🧪 Testing

```bash
# Run tests
npm test

# Watch mode
npm run test:watch

# Coverage report
npm run test:coverage
```

## 📱 Responsive Design

- Mobile-first approach
- Breakpoints:
  - sm: 640px
  - md: 768px
  - lg: 1024px
  - xl: 1280px
  - 2xl: 1536px

## 🔒 Security

- Secure token storage
- XSS prevention
- CSRF protection
- Input validation
- Secure routing

## 🌐 API Integration

```typescript
const API_URL = import.meta.env.VITE_API_URL;

async function fetchData(endpoint: string) {
  const response = await fetch(`${API_URL}${endpoint}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });
  return response.json();
}
```

## 🚀 Deployment

1. Build the application

```bash
npm run build
```

2. Test the build

```bash
npm run preview
```

3. Deploy the `dist` directory

## 🐛 Troubleshooting

### Common Issues

1. **Build Errors**

```bash
# Clear cache and node_modules
rm -rf node_modules
rm -rf dist
npm install
```

2. **Type Errors**

```bash
# Update TypeScript definitions
npm run typecheck
```

3. **Vite Issues**

```bash
# Clear Vite cache
rm -rf node_modules/.vite
```

## 📞 Support

- Check documentation
- Review GitHub issues
- Email: iamsaujanya.ig@gmail.com

## 📄 License

MIT License - see the [LICENSE](LICENSE) file