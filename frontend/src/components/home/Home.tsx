import { Link } from 'react-router-dom';
import { Calendar, MessageCircle, Moon, Sun, Heart, Youtube, CheckSquare } from 'lucide-react';

export function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 px-4 text-center bg-gradient-to-b from-background to-secondary/20">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          Welcome to Repose of Mind
        </h1>
        <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-8">
          Your personal companion for mental wellness, mindfulness, and emotional balance
        </p>
        <Link
          to="/register"
          className="inline-block px-8 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
        >
          Start Your Journey
        </Link>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Journal Feature */}
            <div className="p-6 bg-card rounded-lg shadow-lg">
              <Calendar className="w-12 h-12 mb-4 text-primary" />
              <h3 className="text-xl font-semibold mb-2">Smart Journaling</h3>
              <p className="text-muted-foreground">
                Document your thoughts and feelings with our intuitive journaling system.
                Track your entries by date and mood, all synchronized with IST.
              </p>
            </div>

            {/* Daily Goals Feature */}
            <div className="p-6 bg-card rounded-lg shadow-lg">
              <CheckSquare className="w-12 h-12 mb-4 text-primary" />
              <h3 className="text-xl font-semibold mb-2">Daily Goals</h3>
              <p className="text-muted-foreground">
                Set and track your daily wellness goals. Stay motivated with our
                progress tracking system and build healthy habits.
              </p>
            </div>

            {/* Chatbot Feature */}
            <div className="p-6 bg-card rounded-lg shadow-lg">
              <MessageCircle className="w-12 h-12 mb-4 text-primary" />
              <h3 className="text-xl font-semibold mb-2">AI Companion</h3>
              <p className="text-muted-foreground">
                Engage with our empathetic chatbot powered by advanced AI technology,
                offering support and guidance whenever you need it.
              </p>
            </div>

            {/* Mood Tracking */}
            <div className="p-6 bg-card rounded-lg shadow-lg">
              <Heart className="w-12 h-12 mb-4 text-primary" />
              <h3 className="text-xl font-semibold mb-2">Mood Tracking</h3>
              <p className="text-muted-foreground">
                Monitor your emotional well-being with daily mood check-ins and
                insightful analytics to understand your patterns.
              </p>
            </div>

            {/* Dark Mode */}
            <div className="p-6 bg-card rounded-lg shadow-lg">
              <div className="flex mb-4">
                <Moon className="w-12 h-12 text-primary" />
                <Sun className="w-12 h-12 text-primary ml-2" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Personalized Experience</h3>
              <p className="text-muted-foreground">
                Customize your interface with dark/light mode options for comfortable
                viewing any time of day.
              </p>
            </div>

            {/* Mindfulness Content */}
            <div className="p-6 bg-card rounded-lg shadow-lg">
              <Youtube className="w-12 h-12 mb-4 text-primary" />
              <h3 className="text-xl font-semibold mb-2">Mindfulness Resources</h3>
              <p className="text-muted-foreground">
                Access curated meditation, breathing exercises, and mindfulness
                videos to support your mental wellness journey.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 px-4 bg-secondary/20">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8">Why Choose Repose of Mind?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-2">Privacy First</h3>
              <p className="text-muted-foreground">
                Your data is securely encrypted and stored with the highest privacy
                standards.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Always Available</h3>
              <p className="text-muted-foreground">
                Access your mental wellness companion 24/7, whenever you need
                support.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Continuous Growth</h3>
              <p className="text-muted-foreground">
                Regular updates and new features to support your evolving mental
                health needs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-4 text-center">
        <h2 className="text-3xl font-bold mb-4">
          Begin Your Mental Wellness Journey Today
        </h2>
        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          Join our community of mindful individuals and take the first step
          towards better mental health.
        </p>
        <div className="flex justify-center gap-4">
          <Link
            to="/register"
            className="px-8 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
          >
            Sign Up Now
          </Link>
          <Link
            to="/login"
            className="px-8 py-3 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/90 transition-colors"
          >
            Login
          </Link>
        </div>
      </section>
    </div>
  );
} 