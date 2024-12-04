import express from 'express';
import { auth } from '../middleware/auth';
import { Chat } from '../models/Chat';
import { GeminiService } from '../services/gemini';

const router = express.Router();
const geminiService = new GeminiService();

// Get chat history
router.get('/', auth, async (req, res) => {
  try {
    let chat = await Chat.findOne({ userId: req.user._id });
    
    if (!chat) {
      chat = new Chat({
        userId: req.user._id,
        messages: [{
          content: "Hello! I'm your mental health companion. How can I help you today?",
          sender: 'bot',
          timestamp: new Date(),
        }],
      });
      await chat.save();
    }

    res.json(chat.messages);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Send message and get response
router.post('/message', auth, async (req, res) => {
  try {
    const { content } = req.body;
    if (!content) {
      return res.status(400).json({ error: 'Message content is required' });
    }

    let chat = await Chat.findOne({ userId: req.user._id });
    if (!chat) {
      chat = new Chat({ userId: req.user._id, messages: [] });
    }

    // Add user message
    const userMessage = {
      content,
      sender: 'user' as const,
      timestamp: new Date(),
    };
    chat.messages.push(userMessage);

    // Get bot response
    const botResponse = await geminiService.generateResponse(content);
    const botMessage = {
      content: botResponse,
      sender: 'bot' as const,
      timestamp: new Date(),
    };
    chat.messages.push(botMessage);

    await chat.save();
    res.json({ userMessage, botMessage });
  } catch (error) {
    console.error('Chat error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Clear chat history
router.delete('/', auth, async (req, res) => {
  try {
    await Chat.findOneAndDelete({ userId: req.user._id });
    res.json({ message: 'Chat history cleared' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

export default router; 