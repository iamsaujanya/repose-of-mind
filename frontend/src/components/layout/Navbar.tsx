import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../theme-provider';
import { Moon, Sun } from 'lucide-react';
import { Profile } from '../auth/Profile';

export function Navbar() {
  const { theme, setTheme } = useTheme();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);

    // Listen for login/logout events
    const handleStorageChange = () => {
      const token = localStorage.getItem('token');
      setIsLoggedIn(!!token);
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  return (
    <nav className="border-b">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-xl font-semibold">
            Repose of Mind
          </Link>
          
          <div className="flex items-center space-x-6">
            <Link to="/journal" className="hover:text-primary">Journal</Link>
            <Link to="/chat" className="hover:text-primary">Chat</Link>
            <Link to="/mindfulness" className="hover:text-primary">Mindfulness</Link>
            <Link to="/goals" className="hover:text-primary">Goals</Link>
            
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="p-2 rounded-md hover:bg-accent"
            >
              {theme === 'dark' ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </button>
            
            {isLoggedIn ? (
              <Profile />
            ) : (
              <Link
                to="/login"
                className="px-4 py-2 rounded-md bg-primary text-primary-foreground hover:bg-primary/90"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
} 