import express from 'express';
import { auth } from '../middleware/auth';
import DailyGoal, { IDailyGoal } from '../models/DailyGoal';

const router = express.Router();

// Get all daily goals for a user (with date filter)
router.get('/', auth, async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    const query: any = { userId: req.user.id };

    if (startDate && endDate) {
      query.date = {
        $gte: new Date(startDate as string),
        $lte: new Date(endDate as string),
      };
    }

    const goals = await DailyGoal.find(query).sort({ date: -1, createdAt: -1 });
    res.json(goals);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching daily goals' });
  }
});

// Get a specific goal
router.get('/:id', auth, async (req, res) => {
  try {
    const goal = await DailyGoal.findOne({
      _id: req.params.id,
      userId: req.user.id,
    });

    if (!goal) {
      return res.status(404).json({ error: 'Goal not found' });
    }

    res.json(goal);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching goal' });
  }
});

// Create a new goal
router.post('/', auth, async (req, res) => {
  try {
    const { title, description, date } = req.body;

    const goal = new DailyGoal({
      userId: req.user.id,
      title,
      description,
      date: date || new Date(),
    });

    await goal.save();
    res.status(201).json(goal);
  } catch (error) {
    res.status(500).json({ error: 'Error creating goal' });
  }
});

// Update a goal
router.put('/:id', auth, async (req, res) => {
  try {
    const { title, description, completed, date } = req.body;

    const goal = await DailyGoal.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      {
        $set: {
          title,
          description,
          completed,
          date,
        },
      },
      { new: true }
    );

    if (!goal) {
      return res.status(404).json({ error: 'Goal not found' });
    }

    res.json(goal);
  } catch (error) {
    res.status(500).json({ error: 'Error updating goal' });
  }
});

// Delete a goal
router.delete('/:id', auth, async (req, res) => {
  try {
    const goal = await DailyGoal.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.id,
    });

    if (!goal) {
      return res.status(404).json({ error: 'Goal not found' });
    }

    res.json({ message: 'Goal deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting goal' });
  }
});

export default router; 