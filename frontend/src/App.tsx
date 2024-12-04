import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './components/theme-provider';
import { Navbar } from './components/layout/Navbar';
import { Login } from './components/auth/Login';
import { Register } from './components/auth/Register';
import { Journal } from './components/journal/Journal';

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Router>
        <div className="min-h-screen bg-background">
          <Navbar />
          <main>
            <Routes>
              <Route path="/" element={<div>Home</div>} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/journal" element={<Journal />} />
              <Route path="/chat" element={<div>Chat</div>} />
              <Route path="/mood" element={<div>Mood Tracking</div>} />
            </Routes>
          </main>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
