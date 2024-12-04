import { useState, useEffect } from 'react';
import { Calendar } from 'react-calendar';
import { Smile, Frown, Meh, AlertCircle, Heart } from 'lucide-react';

type Mood = 'happy' | 'sad' | 'neutral' | 'anxious' | 'excited';

interface MoodEntry {
  date: string;
  mood: Mood;
  note: string;
}

export function MoodTracking() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [currentMood, setCurrentMood] = useState<Mood | null>(null);
  const [note, setNote] = useState('');
  const [moodHistory, setMoodHistory] = useState<MoodEntry[]>([]);
  const [showMoodPopup, setShowMoodPopup] = useState(false);

  useEffect(() => {
    // Check if user has already logged mood for today
    const today = new Date().toISOString().split('T')[0];
    const hasTodaysMood = moodHistory.some(entry => entry.date === today);
    if (!hasTodaysMood) {
      setShowMoodPopup(true);
    }
  }, [moodHistory]);

  const moodIcons = {
    happy: <Smile className="w-8 h-8" />,
    sad: <Frown className="w-8 h-8" />,
    neutral: <Meh className="w-8 h-8" />,
    anxious: <AlertCircle className="w-8 h-8" />,
    excited: <Heart className="w-8 h-8" />,
  };

  const moodColors = {
    happy: 'bg-green-500',
    sad: 'bg-blue-500',
    neutral: 'bg-gray-500',
    anxious: 'bg-yellow-500',
    excited: 'bg-pink-500',
  };

  const handleMoodSubmit = () => {
    if (currentMood) {
      const newEntry: MoodEntry = {
        date: selectedDate.toISOString().split('T')[0],
        mood: currentMood,
        note,
      };
      setMoodHistory([...moodHistory, newEntry]);
      setCurrentMood(null);
      setNote('');
      setShowMoodPopup(false);
    }
  };

  const getMoodForDate = (date: Date) => {
    const dateStr = date.toISOString().split('T')[0];
    return moodHistory.find(entry => entry.date === dateStr);
  };

  const getMoodStats = () => {
    const stats = {
      happy: 0,
      sad: 0,
      neutral: 0,
      anxious: 0,
      excited: 0,
    };

    moodHistory.forEach(entry => {
      stats[entry.mood]++;
    });

    return stats;
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Mood Tracking</h1>

      {/* Daily Mood Popup */}
      {showMoodPopup && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center">
          <div className="bg-card p-6 rounded-lg shadow-lg max-w-md w-full">
            <h2 className="text-2xl font-bold mb-4">How are you feeling today?</h2>
            <div className="grid grid-cols-5 gap-4 mb-6">
              {Object.entries(moodIcons).map(([mood, icon]) => (
                <button
                  key={mood}
                  onClick={() => setCurrentMood(mood as Mood)}
                  className={`p-4 rounded-lg flex flex-col items-center gap-2 transition-colors
                    ${currentMood === mood ? moodColors[mood as Mood] : 'bg-secondary'}
                  `}
                >
                  {icon}
                  <span className="text-sm capitalize">{mood}</span>
                </button>
              ))}
            </div>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Add a note about your mood (optional)"
              className="w-full p-2 rounded-md border bg-background mb-4"
              rows={3}
            />
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setShowMoodPopup(false)}
                className="px-4 py-2 rounded-md bg-secondary hover:bg-secondary/90"
              >
                Skip
              </button>
              <button
                onClick={handleMoodSubmit}
                disabled={!currentMood}
                className="px-4 py-2 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
              >
                Save Mood
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Calendar View */}
        <div>
          <h2 className="text-2xl font-bold mb-4">Mood Calendar</h2>
          <Calendar
            onChange={setSelectedDate}
            value={selectedDate}
            className="w-full bg-card p-4 rounded-lg shadow-lg"
            tileContent={({ date }) => {
              const mood = getMoodForDate(date);
              return mood ? (
                <div className={`w-3 h-3 rounded-full mx-auto mt-1 ${moodColors[mood.mood]}`} />
              ) : null;
            }}
          />
        </div>

        {/* Mood Analytics */}
        <div>
          <h2 className="text-2xl font-bold mb-4">Mood Analytics</h2>
          <div className="bg-card p-6 rounded-lg shadow-lg">
            <div className="space-y-4">
              {Object.entries(getMoodStats()).map(([mood, count]) => (
                <div key={mood} className="flex items-center gap-4">
                  <div className="w-24 flex items-center gap-2">
                    {moodIcons[mood as Mood]}
                    <span className="capitalize">{mood}</span>
                  </div>
                  <div className="flex-1 h-4 bg-secondary rounded-full overflow-hidden">
                    <div
                      className={`h-full ${moodColors[mood as Mood]}`}
                      style={{
                        width: `${(count / moodHistory.length) * 100 || 0}%`,
                      }}
                    />
                  </div>
                  <span className="w-12 text-right">{count}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Selected Date Mood */}
          {getMoodForDate(selectedDate) && (
            <div className="mt-8 bg-card p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-bold mb-4">
                Mood for {selectedDate.toLocaleDateString('en-IN')}
              </h3>
              <div className="flex items-center gap-4 mb-4">
                {moodIcons[getMoodForDate(selectedDate)!.mood]}
                <span className="capitalize">{getMoodForDate(selectedDate)!.mood}</span>
              </div>
              {getMoodForDate(selectedDate)!.note && (
                <p className="text-muted-foreground">
                  {getMoodForDate(selectedDate)!.note}
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 