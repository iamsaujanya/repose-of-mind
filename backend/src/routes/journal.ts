import express, { Request, Response } from 'express';
import { auth } from '../middleware/auth';
import { Journal } from '../models/Journal';

const router = express.Router();

// Get all journal entries for a user
router.get('/', auth, async (req: Request, res: Response) => {
  try {
    const entries = await Journal.find({ userId: req.user._id })
      .sort({ date: -1 })
      .lean()
      .exec();

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

    // Use current time if no date provided, otherwise parse the provided date
    const entryDate = date ? new Date(date) : new Date();
    if (isNaN(entryDate.getTime())) {
      return res.status(400).json({ error: 'Invalid date format' });
    }

    const entry = new Journal({
      userId: req.user._id,
      title: title.trim(),
      content: content.trim(),
      mood,
      date: entryDate,
    });

    await entry.save();

    // Return the saved entry
    const savedEntry = await Journal.findById(entry._id).lean().exec();
    return res.status(201).json(savedEntry);
  } catch (error) {
    console.error('Error creating journal entry:', error);
    return res.status(500).json({ error: 'Failed to create journal entry' });
  }
});

// Get entries for a specific date
router.get('/date/:date', auth, async (req: Request, res: Response) => {
  try {
    const date = new Date(req.params.date);
    if (isNaN(date.getTime())) {
      return res.status(400).json({ error: 'Invalid date format' });
    }

    // Set time range for the entire day
    const startDate = new Date(date);
    startDate.setHours(0, 0, 0, 0);
    const endDate = new Date(date);
    endDate.setHours(23, 59, 59, 999);

    const entries = await Journal.find({
      userId: req.user._id,
      date: {
        $gte: startDate,
        $lte: endDate,
      },
    })
      .sort({ date: -1 })
      .lean()
      .exec();

    return res.json(entries);
  } catch (error) {
    console.error('Error fetching journal entries:', error);
    return res.status(500).json({ error: 'Failed to fetch journal entries' });
  }
});

// Get a specific journal entry
router.get('/:id', auth, async (req: Request, res: Response) => {
  try {
    const entry = await Journal.findOne({
      _id: req.params.id,
      userId: req.user._id,
    })
      .lean()
      .exec();

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
    const { title, content, mood, date } = req.body;
    
    if (!title || !content) {
      return res.status(400).json({ error: 'Title and content are required' });
    }

    let updateData: any = {
      title: title.trim(),
      content: content.trim(),
      mood,
    };

    if (date) {
      const entryDate = new Date(date);
      if (isNaN(entryDate.getTime())) {
        return res.status(400).json({ error: 'Invalid date format' });
      }
      updateData.date = entryDate;
    }

    const entry = await Journal.findOneAndUpdate(
      { _id: req.params.id, userId: req.user._id },
      updateData,
      { new: true }
    )
      .lean()
      .exec();

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
    })
      .lean()
      .exec();

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