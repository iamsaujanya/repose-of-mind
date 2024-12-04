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
    console.error('Error fetching chat history:', error);
    res.status(500).json({ error: 'Failed to fetch chat history' });
  }
});

// Send message and get response
router.post('/message', auth, async (req, res) => {
  try {
    const { content } = req.body;
    if (!content || typeof content !== 'string') {
      return res.status(400).json({ error: 'Valid message content is required' });
    }

    if (content.length > 1000) {
      return res.status(400).json({ error: 'Message is too long. Please keep it under 1000 characters.' });
    }

    let chat = await Chat.findOne({ userId: req.user._id });
    if (!chat) {
      chat = new Chat({ userId: req.user._id, messages: [] });
    }

    // Add user message
    const userMessage = {
      content: content.trim(),
      sender: 'user' as const,
      timestamp: new Date(),
    };
    chat.messages.push(userMessage);

    try {
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
      // If Gemini API fails, save only the user message
      await chat.save();
      console.error('Error generating bot response:', error);
      res.status(500).json({
        error: 'Failed to generate response',
        userMessage,
        botMessage: {
          content: "I apologize, but I'm having trouble responding right now. Please try again in a moment.",
          sender: 'bot',
          timestamp: new Date(),
        },
      });
    }
  } catch (error) {
    console.error('Chat error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Clear chat history
router.delete('/', auth, async (req, res) => {
  try {
    const result = await Chat.findOneAndDelete({ userId: req.user._id });
    if (!result) {
      return res.status(404).json({ error: 'No chat history found' });
    }
    res.json({ message: 'Chat history cleared successfully' });
  } catch (error) {
    console.error('Error clearing chat history:', error);
    res.status(500).json({ error: 'Failed to clear chat history' });
  }
});

export default router; 