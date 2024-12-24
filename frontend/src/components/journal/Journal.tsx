import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { useNavigate } from 'react-router-dom';
import { AlertCircle, Loader2, Smile, Frown, Meh, Brain, PartyPopper } from 'lucide-react';
import { format } from 'date-fns';
import { utcToZonedTime } from 'date-fns-tz';

interface JournalEntry {
  _id?: string;
  title: string;
  content: string;
  mood: string;
  date: string;
}

interface JournalState {
  entries: JournalEntry[];
  loading: boolean;
  error: string | null;
}

interface MoodStats {
  [key: string]: number;
}

type MoodOption = {
  value: string;
  label: string;
  icon: JSX.Element;
  color: string;
};

const moodOptions: MoodOption[] = [
  { value: 'happy', label: 'Happy', icon: <Smile className="w-5 h-5" />, color: 'text-green-500' },
  { value: 'sad', label: 'Sad', icon: <Frown className="w-5 h-5" />, color: 'text-blue-500' },
  { value: 'neutral', label: 'Neutral', icon: <Meh className="w-5 h-5" />, color: 'text-yellow-500' },
  { value: 'anxious', label: 'Anxious', icon: <Brain className="w-5 h-5" />, color: 'text-red-500' },
  { value: 'excited', label: 'Excited', icon: <PartyPopper className="w-5 h-5" />, color: 'text-purple-500' },
];

const Journal: React.FC = () => {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const isLoggedIn = Boolean(localStorage.getItem('token'));

  const [journalState, setJournalState] = useState<JournalState>({
    entries: [],
    loading: false,
    error: null
  });
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [mood, setMood] = useState('neutral');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [entries, setEntries] = useState<JournalEntry[]>([]);

  // Check if user is logged in using JWT token

  const fetchJournalData = async (): Promise<JournalEntry[]> => {
    try {
      if (isLoggedIn) {
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:5000/api/journal', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        if (!response.ok) throw new Error('Failed to fetch entries');
        const data = await response.json();
        return data.entries;
      } else {
        const tempData = localStorage.getItem('tempJournalData');
        return tempData ? JSON.parse(tempData) : [];
      }
    } catch (error) {
      console.error('Error fetching journal data:', error);
      throw error;
    }
  };

  const saveJournalEntry = async (entry: JournalEntry): Promise<void> => {
    const formattedEntry = {
      ...entry,
      date: formatDate(new Date(entry.date))
    };

    try {
      if (isLoggedIn) {
        const token = localStorage.getItem('token');
        await fetch('http://localhost:5000/api/journal', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify(formattedEntry)
        });
      } else {
        const tempEntries = JSON.parse(localStorage.getItem('tempJournalData') || '[]');
        tempEntries.push({...formattedEntry, id: Date.now().toString()});
        localStorage.setItem('tempJournalData', JSON.stringify(tempEntries));
      }
      
      // Refresh entries after saving
      const updatedEntries = await fetchJournalData();
      setJournalState(prev => ({ ...prev, entries: updatedEntries }));
    } catch (error) {
      console.error('Error saving entry:', error);
      throw error;
    }
  };

  const getEntriesByDate = (date: string): JournalEntry[] => {
    return entries.filter(entry => entry.date.startsWith(date));
  };

  const getMoodStats = (): MoodStats => {
    const entries = journalState.entries;
    return entries.reduce((stats, entry) => {
      stats[entry.mood] = (stats[entry.mood] || 0) + 1;
      return stats;
    }, {} as MoodStats);
  };

  const getEntriesForDate = (date: Date): JournalEntry[] => {
    const formattedDate = date.toISOString().split('T')[0];
    return journalState.entries.filter(entry => entry.date === formattedDate);
  };

  const getMoodIcon = (moodValue: string) => {
    return moodOptions.find(option => option.value === moodValue)?.icon || moodOptions[2].icon;
  };

  const getMoodColor = (moodValue: string) => {
    return moodOptions.find(option => option.value === moodValue)?.color || '';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const entryDate = new Date(selectedDate);
      entryDate.setHours(12, 0, 0, 0);

      const newEntry: JournalEntry = {
        title,
        content,
        mood,
        date: entryDate.toISOString(),
        id: Date.now().toString()
      };

      await saveJournalEntry(newEntry);
      const entries = await fetchJournalData();
      setJournalState({
        entries,
        loading: false,
        error: null
      });
      setTitle('');
      setContent('');
      setMood('neutral');
    } catch (error) {
      console.error('Error creating entry:', error);
      setJournalState(prev => ({
        ...prev,
        error: 'Failed to save entry. Please try again.'
      }));
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    const loadJournalData = async () => {
      setJournalState(prev => ({ ...prev, loading: true }));
      try {
        const entries = await fetchJournalData();
        setJournalState({
          entries,
          loading: false,
          error: null
        });
      } catch (error) {
        setJournalState(prev => ({
          ...prev,
          loading: false,
          error: 'Failed to load journal entries'
        }));
      }
    };
    loadJournalData();
  }, []);

  useEffect(() => {
    if (!isLoggedIn && !localStorage.getItem('tempJournalData')) {
      localStorage.setItem('tempJournalData', '[]');
    }
  }, [isLoggedIn]);

  useEffect(() => {
    const loadEntries = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          const response = await fetch('http://localhost:5000/api/journal', {
            headers: { Authorization: `Bearer ${token}` }
          });
          const data = await response.json();
          setEntries(data);
        }
      } catch (error) {
        console.error('Error loading entries:', error);
      }
    };
    loadEntries();
  }, []);

  if (!isLoggedIn && !localStorage.getItem('tempJournalData')) {
    navigate('/login');
    return null;
  }

  // Use proper date formatting
const formatDate = (date) => {
  return new Date(date).toISOString().split('T')[0];
}

  const selectedEntries = getEntriesForDate(selectedDate);
  const moodStats = getMoodStats();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl font-bold mb-4">Journal Entries</h2>
          <div className="calendar-wrapper bg-card p-4 rounded-lg shadow-lg">
            <Calendar
              onChange={(value) => {
                const dateObj = Array.isArray(value) ? value[0]?.getDate() : value?.getDate();
                setSelectedDate(new Date(dateObj!));
              }}
              value={selectedDate}
              className="w-full !bg-transparent border-none"
              tileContent={({ date }) => {
                const dayEntries = getEntriesForDate(date);
                if (dayEntries.length === 0) return null;
                const entry = dayEntries[0];
                return (
                  <div className={`mt-1 ${getMoodColor(entry.mood)}`}>
                    {getMoodIcon(entry.mood)}
                  </div>
                );
              }}
              tileClassName={({ date }) => {
                const isSelected = selectedDate.toDateString() === date.toDateString();
                return `${isSelected ? 'bg-primary text-primary-foreground' : 'hover:bg-accent'} rounded-lg`;
              }}
            />
          </div>

          <div className="mt-8 bg-card p-4 rounded-lg shadow-lg">
            <h3 className="text-lg font-semibold mb-4">Mood Summary</h3>
            <div className="grid grid-cols-5 gap-4">
              {moodOptions.map((option) => (
                <div key={option.value} className="text-center">
                  <div className={`${option.color} mb-2`}>{option.icon}</div>
                  <div className="text-2xl font-bold">{moodStats[option.value as keyof typeof moodStats]}</div>
                  <div className="text-xs text-muted-foreground">{option.label}</div>
                </div>
              ))}
            </div>
          </div>

          <form onSubmit={handleSubmit} className="mt-8 space-y-4">
            <div>
              <label htmlFor="title" className="block text-sm font-medium mb-1">
                Title
              </label>
              <input
                id="title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full p-2 rounded-md border bg-background"
                required
                disabled={isSubmitting}
                placeholder="Enter a title for your entry"
              />
            </div>

            <div>
              <label htmlFor="content" className="block text-sm font-medium mb-1">
                Content
              </label>
              <textarea
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full p-2 rounded-md border bg-background h-32 resize-none"
                required
                disabled={isSubmitting}
                placeholder="Write your thoughts here..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                How are you feeling?
              </label>
              <div className="grid grid-cols-5 gap-2">
                {moodOptions.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => setMood(option.value)}
                    className={`p-3 rounded-md flex flex-col items-center gap-1 ${
                      mood === option.value
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-card hover:bg-accent'
                    }`}
                    disabled={isSubmitting}
                  >
                    <div className={mood === option.value ? 'text-primary-foreground' : option.color}>
                      {option.icon}
                    </div>
                    <span className="text-xs">{option.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-2 px-4 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 disabled:opacity-50 flex items-center justify-center gap-2"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Saving...
                </>
              ) : (
                'Save Entry'
              )}
            </button>
          </form>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-4">
            Entries for {selectedDate.toLocaleDateString()}
          </h2>
          {journalState.error && (
            <div className="p-3 text-sm bg-destructive/10 text-destructive rounded-md flex items-center gap-2 mb-4">
              <AlertCircle className="w-4 h-4" />
              {journalState.error}
            </div>
          )}
          {journalState.loading ? (
            <div className="flex items-center gap-2 text-muted-foreground">
              <Loader2 className="w-4 h-4 animate-spin" />
              Loading entries...
            </div>
          ) : selectedEntries.length > 0 ? (
            <div className="space-y-4">
              {selectedEntries.map((entry) => (
                <div key={entry.id} className="bg-card p-4 rounded-lg shadow-lg mb-4">
                  <h3 className="text-xl font-semibold mb-2">{entry.title}</h3>
                  <p className="text-sm text-muted-foreground mb-2">
                    {format(utcToZonedTime(new Date(entry.date), 'Asia/Kolkata'), 'PPpp')}
                  </p>
                  <div className={`flex items-center gap-2 mb-2 ${getMoodColor(entry.mood)}`}>
                    {getMoodIcon(entry.mood)}
                    <span className="capitalize">{entry.mood}</span>
                  </div>
                  <p className="whitespace-pre-wrap">{entry.content}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground">No entries for this date</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Journal;