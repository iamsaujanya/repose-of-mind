import express, { Request, Response } from 'express';
import { auth } from '../middleware/auth';
import { Chat } from '../models/Chat';
import { GeminiService } from '../services/gemini';

const router = express.Router();
const geminiService = new GeminiService();

// Get chat history
router.get('/', auth, async (req: Request, res: Response) => {
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

    return res.json(chat.messages);
  } catch (error) {
    console.error('Error fetching chat history:', error);
    return res.status(500).json({ error: 'Failed to fetch chat history' });
  }
});

// Send message and get response
router.post('/message', auth, async (req: Request, res: Response) => {
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
      // Get bot response with retry logic
      let botResponse: string | null = null;
      let attempts = 0;
      const maxAttempts = 3;

      while (!botResponse && attempts < maxAttempts) {
        try {
          botResponse = await geminiService.generateResponse(content);
          if (!botResponse || !botResponse.trim()) {
            throw new Error('Empty response received');
          }
        } catch (error) {
          attempts++;
          if (attempts === maxAttempts) {
            throw error;
          }
          // Wait before retrying (exponential backoff)
          await new Promise(resolve => setTimeout(resolve, 1000 * Math.pow(2, attempts)));
        }
      }

      if (!botResponse) {
        throw new Error('Failed to generate response after retries');
      }

      const botMessage = {
        content: botResponse,
        sender: 'bot' as const,
        timestamp: new Date(),
      };
      chat.messages.push(botMessage);

      await chat.save();
      return res.json({ userMessage, botMessage });
    } catch (error) {
      // If Gemini API fails, save only the user message
      await chat.save();
      console.error('Error generating bot response:', error);

      // Check for specific error types
      let errorMessage = "I apologize, but I'm having trouble responding right now. Please try again in a moment.";
      
      if (error instanceof Error) {
        if (error.message.includes('API key') || error.message.includes('not properly configured')) {
          errorMessage = "I'm currently experiencing technical difficulties. Please contact the administrator.";
        } else if (error.message.includes('rate limit')) {
          errorMessage = "I'm receiving too many requests right now. Please wait a moment before trying again.";
        }
      }

      return res.status(500).json({
        error: 'Failed to generate response',
        userMessage,
        botMessage: {
          content: errorMessage,
          sender: 'bot',
          timestamp: new Date(),
        },
      });
    }
  } catch (error) {
    console.error('Chat error:', error);
    return res.status(500).json({ error: 'Server error' });
  }
});

// Clear chat history
router.delete('/', auth, async (req: Request, res: Response) => {
  try {
    const result = await Chat.findOneAndDelete({ userId: req.user._id });
    if (!result) {
      return res.status(404).json({ error: 'No chat history found' });
    }
    return res.json({ message: 'Chat history cleared successfully' });
  } catch (error) {
    console.error('Error clearing chat history:', error);
    return res.status(500).json({ error: 'Failed to clear chat history' });
  }
});

export default router; 