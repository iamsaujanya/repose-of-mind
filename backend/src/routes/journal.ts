import express from 'express';
import { auth } from '../middleware/auth';
import { Journal } from '../models/Journal';

const router = express.Router();

// Get all journal entries for the authenticated user
router.get('/', auth, async (req, res) => {
  try {
    const entries = await Journal.find({ userId: req.user._id }).sort({ createdAt: -1 });
    res.json(entries);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Create a new journal entry
router.post('/', auth, async (req, res) => {
  try {
    const { title, content, mood, createdAt } = req.body;
    const entry = new Journal({
      userId: req.user._id,
      title,
      content,
      mood,
      createdAt: createdAt || new Date(),
    });
    await entry.save();
    res.status(201).json(entry);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Get a specific journal entry
router.get('/:id', auth, async (req, res) => {
  try {
    const entry = await Journal.findOne({
      _id: req.params.id,
      userId: req.user._id,
    });

    if (!entry) {
      return res.status(404).json({ error: 'Entry not found' });
    }

    res.json(entry);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Update a journal entry
router.put('/:id', auth, async (req, res) => {
  try {
    const { title, content, mood } = req.body;
    const entry = await Journal.findOneAndUpdate(
      { _id: req.params.id, userId: req.user._id },
      { title, content, mood },
      { new: true }
    );

    if (!entry) {
      return res.status(404).json({ error: 'Entry not found' });
    }

    res.json(entry);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Delete a journal entry
router.delete('/:id', auth, async (req, res) => {
  try {
    const entry = await Journal.findOneAndDelete({
      _id: req.params.id,
      userId: req.user._id,
    });

    if (!entry) {
      return res.status(404).json({ error: 'Entry not found' });
    }

    res.json({ message: 'Entry deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

export default router; 