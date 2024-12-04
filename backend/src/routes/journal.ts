import express, { Request, Response } from 'express';
import { auth } from '../middleware/auth';
import { Journal } from '../models/Journal';

const router = express.Router();

// Get all journal entries for a user
router.get('/', auth, async (req: Request, res: Response) => {
  try {
    const entries = await Journal.find({ userId: req.user._id }).sort({ date: -1 });
    return res.json(entries);
  } catch (error) {
    console.error('Error fetching journal entries:', error);
    return res.status(500).json({ error: 'Failed to fetch journal entries' });
  }
});

// Create a new journal entry
router.post('/', auth, async (req: Request, res: Response) => {
  try {
    const { title, content, mood, date } = req.body;
    
    if (!title || !content) {
      return res.status(400).json({ error: 'Title and content are required' });
    }

    const entry = new Journal({
      userId: req.user._id,
      title,
      content,
      mood,
      date: date || new Date(),
    });

    await entry.save();
    return res.status(201).json(entry);
  } catch (error) {
    console.error('Error creating journal entry:', error);
    return res.status(500).json({ error: 'Failed to create journal entry' });
  }
});

// Get a specific journal entry
router.get('/:id', auth, async (req: Request, res: Response) => {
  try {
    const entry = await Journal.findOne({
      _id: req.params.id,
      userId: req.user._id,
    });

    if (!entry) {
      return res.status(404).json({ error: 'Journal entry not found' });
    }

    return res.json(entry);
  } catch (error) {
    console.error('Error fetching journal entry:', error);
    return res.status(500).json({ error: 'Failed to fetch journal entry' });
  }
});

// Update a journal entry
router.put('/:id', auth, async (req: Request, res: Response) => {
  try {
    const { title, content, mood } = req.body;
    
    if (!title || !content) {
      return res.status(400).json({ error: 'Title and content are required' });
    }

    const entry = await Journal.findOneAndUpdate(
      { _id: req.params.id, userId: req.user._id },
      { title, content, mood },
      { new: true }
    );

    if (!entry) {
      return res.status(404).json({ error: 'Journal entry not found' });
    }

    return res.json(entry);
  } catch (error) {
    console.error('Error updating journal entry:', error);
    return res.status(500).json({ error: 'Failed to update journal entry' });
  }
});

// Delete a journal entry
router.delete('/:id', auth, async (req: Request, res: Response) => {
  try {
    const entry = await Journal.findOneAndDelete({
      _id: req.params.id,
      userId: req.user._id,
    });

    if (!entry) {
      return res.status(404).json({ error: 'Journal entry not found' });
    }

    return res.json({ message: 'Journal entry deleted successfully' });
  } catch (error) {
    console.error('Error deleting journal entry:', error);
    return res.status(500).json({ error: 'Failed to delete journal entry' });
  }
});

export default router; 