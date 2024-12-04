import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './components/theme-provider';
import { Navbar } from './components/layout/Navbar';
import { Login } from './components/auth/Login';
import { Register } from './components/auth/Register';
import { Journal } from './components/journal/Journal';
import { Home } from './components/home/Home';
import { Chat } from './components/chat/Chat';
import { MoodTracking } from './components/mood/MoodTracking';

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Router>
        <div className="min-h-screen bg-background">
          <Navbar />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/journal" element={<Journal />} />
              <Route path="/chat" element={<Chat />} />
              <Route path="/mood" element={<MoodTracking />} />
            </Routes>
          </main>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
