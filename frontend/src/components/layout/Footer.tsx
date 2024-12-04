import { Link } from 'react-router-dom';
import { Heart, Mail, Phone } from 'lucide-react';

export function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>Quick Links</h3>
          <ul>
            <li><Link to="/journal">Journal</Link></li>
            <li><Link to="/chat">Chat Support</Link></li>
            <li><Link to="/mindfulness">Mindfulness</Link></li>
            <li><Link to="/goals">Daily Goals</Link></li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>Resources</h3>
          <ul>
            <li><a href="https://nimhans.ac.in" target="_blank" rel="noopener noreferrer">NIMHANS</a></li>
            <li><a href="https://thelivelovelaughfoundation.org/" target="_blank" rel="noopener noreferrer">LiveLoveLaugh Foundation</a></li>
            <li><a href="https://www.vandrevalafoundation.com/" target="_blank" rel="noopener noreferrer">Vandrevala Foundation</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>Crisis Support (24/7)</h3>
          <ul>
            <li><a href="tel:+919152987821">AASRA Helpline</a></li>
            <li><a href="tel:+918448440632">Vandrevala Helpline</a></li>
            <li><a href="tel:1800599019">Sneha India Helpline</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>Contact Us</h3>
          <ul>
            <li className="flex items-center gap-2">
              <Mail className="w-4 h-4" />
              <a href="mailto:iamsaujanya.ig@gmail.com">iamsaujanya.ig@gmail.com</a>
            </li>
            <li className="flex items-center gap-2">
              <Phone className="w-4 h-4" />
              <a href="tel:9026573452">+91 90265 73452</a>
            </li>
            <li><Link to="/privacy">Privacy Policy</Link></li>
            <li><Link to="/terms">Terms of Service</Link></li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p className="flex items-center justify-center gap-2">
          Made with <Heart className="w-4 h-4 text-destructive" /> by Repose of Mind
        </p>
        <p className="text-sm mt-1">© {new Date().getFullYear()} Repose of Mind. All rights reserved.</p>
      </div>
    </footer>
  );
} 