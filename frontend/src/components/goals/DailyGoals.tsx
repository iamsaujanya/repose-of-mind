import { useState, useEffect, ChangeEvent } from 'react';
import { format } from 'date-fns';
import { Calendar, Plus, Target, CheckCircle2, XCircle, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Checkbox } from '@/components/ui/checkbox';

interface DailyGoal {
  _id: string;
  title: string;
  description?: string;
  completed: boolean;
  date: string;
}

interface NewGoal {
  title: string;
  description: string;
  date: string;
}

const DEFAULT_GOALS = [
  {
    title: 'Morning Meditation',
    description: 'Start your day with 10 minutes of mindful meditation',
    date: format(new Date(), 'yyyy-MM-dd'),
  },
  {
    title: 'Exercise',
    description: '30 minutes of physical activity',
    date: format(new Date(), 'yyyy-MM-dd'),
  },
  {
    title: 'Gratitude Journal',
    description: 'Write down three things you are grateful for today',
    date: format(new Date(), 'yyyy-MM-dd'),
  },
  {
    title: 'Healthy Breakfast',
    description: 'Start your day with a nutritious meal',
    date: format(new Date(), 'yyyy-MM-dd'),
  },
  {
    title: 'Reading',
    description: 'Read for at least 20 minutes',
    date: format(new Date(), 'yyyy-MM-dd'),
  },
  {
    title: 'Water Intake',
    description: 'Drink 8 glasses of water throughout the day',
    date: format(new Date(), 'yyyy-MM-dd'),
  }
];

export function DailyGoals() {
  const [goals, setGoals] = useState<DailyGoal[]>([]);
  const [isAddingGoal, setIsAddingGoal] = useState(false);
  const [newGoal, setNewGoal] = useState<NewGoal>({
    title: '',
    description: '',
    date: format(new Date(), 'yyyy-MM-dd'),
  });
  const [error, setError] = useState('');

  const fetchGoals = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('Please log in to view your goals');
        return;
      }

      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/daily-goals`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        if (response.status === 401) {
          setError('Your session has expired. Please log in again.');
          return;
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      const today = format(new Date(), 'yyyy-MM-dd');
      
      // Filter out any goals that aren't from today
      const todaysGoals = data.filter((goal: DailyGoal) => 
        format(new Date(goal.date), 'yyyy-MM-dd') === today
      );

      if (todaysGoals.length === 0) {
        // If no goals exist for today, create default goals
        try {
          const createdGoals = await Promise.all(DEFAULT_GOALS.map(goal => 
            fetch(`${import.meta.env.VITE_API_URL}/api/daily-goals`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
              },
              body: JSON.stringify(goal),
            }).then(res => res.json())
          ));
          setGoals(createdGoals);
        } catch (err) {
          console.error('Error creating default goals:', err);
          setError('Failed to create default goals. Please try again.');
        }
      } else {
        // Remove any duplicates by title
        const uniqueGoals = todaysGoals.reduce((acc: DailyGoal[], current: DailyGoal) => {
          const x = acc.find(item => item.title === current.title);
          if (!x) {
            return acc.concat([current]);
          } else {
            // If duplicate found, keep the one that's completed
            if (current.completed && !x.completed) {
              return acc.map(item => item._id === x._id ? current : item);
            }
            return acc;
          }
        }, []);
        setGoals(uniqueGoals);
      }
    } catch (err) {
      console.error('Error fetching goals:', err);
      if (!import.meta.env.VITE_API_URL) {
        setError('API URL is not configured. Please check your environment variables.');
      } else {
        setError('Failed to load goals. Please check your connection and try again.');
      }
    }
  };

  useEffect(() => {
    fetchGoals();
  }, []);

  const handleAddGoal = async () => {
    if (newGoal.description.split(' ').length > 50) {
      setError('Description should not exceed 50 words');
      return;
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/daily-goals`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(newGoal),
      });

      if (!response.ok) throw new Error('Failed to add goal');

      setIsAddingGoal(false);
      setNewGoal({
        title: '',
        description: '',
        date: format(new Date(), 'yyyy-MM-dd'),
      });
      fetchGoals();
    } catch (err) {
      setError('Failed to add goal');
    }
  };

  const toggleGoalCompletion = async (goalId: string, completed: boolean) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/daily-goals/${goalId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ completed: !completed }),
      });

      if (!response.ok) throw new Error('Failed to update goal');
      fetchGoals();
    } catch (err) {
      setError('Failed to update goal');
    }
  };

  const deleteGoal = async (goalId: string) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/daily-goals/${goalId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (!response.ok) throw new Error('Failed to delete goal');
      fetchGoals();
    } catch (err) {
      setError('Failed to delete goal');
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setNewGoal({ ...newGoal, [e.target.name]: e.target.value });
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <Target className="h-6 w-6" />
          Daily Goals
        </h2>
        <Dialog open={isAddingGoal} onOpenChange={setIsAddingGoal}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Goal
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Goal</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <Input
                name="title"
                placeholder="Goal Title"
                value={newGoal.title}
                onChange={handleInputChange}
              />
              <Textarea
                name="description"
                placeholder="Description (max 50 words)"
                value={newGoal.description}
                onChange={handleInputChange}
              />
              <Input
                name="date"
                type="date"
                value={newGoal.date}
                onChange={handleInputChange}
              />
              <Button onClick={handleAddGoal}>Add Goal</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {error && (
        <div className="bg-destructive/15 text-destructive p-3 rounded-md mb-4">
          {error}
        </div>
      )}

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {goals.map((goal) => (
          <Card key={goal._id} className="p-4">
            <div className="flex items-start gap-3">
              <div className="pt-1">
                <Checkbox
                  checked={goal.completed}
                  onCheckedChange={() => toggleGoalCompletion(goal._id, goal.completed)}
                  className="w-5 h-5"
                />
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <h3 className={`font-semibold ${goal.completed ? 'line-through text-muted-foreground' : ''}`}>
                    {goal.title}
                  </h3>
                  <button
                    onClick={() => deleteGoal(goal._id)}
                    className="text-gray-400 hover:text-destructive ml-2"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
                {goal.description && (
                  <p className={`text-sm text-muted-foreground mb-2 ${goal.completed ? 'line-through' : ''}`}>
                    {goal.description}
                  </p>
                )}
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  {format(new Date(goal.date), 'MMM d, yyyy')}
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
} 