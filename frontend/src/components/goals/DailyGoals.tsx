import { useState, useEffect, ChangeEvent } from 'react';
import { format } from 'date-fns';
import { Calendar, Plus, Target, CheckCircle2, XCircle, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

type GoalCategory = 'mental' | 'physical' | 'emotional' | 'social' | 'other';
type GoalPriority = 'low' | 'medium' | 'high';

interface DailyGoal {
  _id: string;
  title: string;
  description?: string;
  completed: boolean;
  date: string;
  category: GoalCategory;
  priority: GoalPriority;
}

interface NewGoal {
  title: string;
  description: string;
  category: GoalCategory;
  priority: GoalPriority;
  date: string;
}

export function DailyGoals() {
  const [goals, setGoals] = useState<DailyGoal[]>([]);
  const [isAddingGoal, setIsAddingGoal] = useState(false);
  const [newGoal, setNewGoal] = useState<NewGoal>({
    title: '',
    description: '',
    category: 'other',
    priority: 'medium',
    date: format(new Date(), 'yyyy-MM-dd'),
  });
  const [error, setError] = useState('');

  const fetchGoals = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/daily-goals`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      if (!response.ok) throw new Error('Failed to fetch goals');
      const data = await response.json();
      setGoals(data);
    } catch (err) {
      setError('Failed to load goals');
    }
  };

  useEffect(() => {
    fetchGoals();
  }, []);

  const handleAddGoal = async () => {
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
        category: 'other',
        priority: 'medium',
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
                placeholder="Description (optional)"
                value={newGoal.description}
                onChange={handleInputChange}
              />
              <Select
                value={newGoal.category}
                onValueChange={(value: GoalCategory) => setNewGoal({ ...newGoal, category: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="mental">Mental</SelectItem>
                  <SelectItem value="physical">Physical</SelectItem>
                  <SelectItem value="emotional">Emotional</SelectItem>
                  <SelectItem value="social">Social</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
              <Select
                value={newGoal.priority}
                onValueChange={(value: GoalPriority) => setNewGoal({ ...newGoal, priority: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                </SelectContent>
              </Select>
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
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-semibold">{goal.title}</h3>
              <div className="flex gap-2">
                <button
                  onClick={() => toggleGoalCompletion(goal._id, goal.completed)}
                  className={`${
                    goal.completed ? 'text-green-500' : 'text-gray-400'
                  } hover:text-green-600`}
                >
                  {goal.completed ? (
                    <CheckCircle2 className="h-5 w-5" />
                  ) : (
                    <XCircle className="h-5 w-5" />
                  )}
                </button>
                <button
                  onClick={() => deleteGoal(goal._id)}
                  className="text-gray-400 hover:text-destructive"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              </div>
            </div>
            {goal.description && (
              <p className="text-sm text-muted-foreground mb-2">{goal.description}</p>
            )}
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Calendar className="h-4 w-4" />
              {format(new Date(goal.date), 'MMM d, yyyy')}
            </div>
            <div className="flex gap-2 mt-2">
              <span className="text-xs px-2 py-1 rounded-full bg-primary/10">
                {goal.category}
              </span>
              <span
                className={`text-xs px-2 py-1 rounded-full ${
                  goal.priority === 'high'
                    ? 'bg-destructive/10 text-destructive'
                    : goal.priority === 'medium'
                    ? 'bg-yellow-500/10 text-yellow-500'
                    : 'bg-green-500/10 text-green-500'
                }`}
              >
                {goal.priority}
              </span>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
} 