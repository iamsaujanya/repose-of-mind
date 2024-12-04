import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';

// Ensure environment variables are loaded
dotenv.config();

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

if (!GEMINI_API_KEY) {
  console.error('Warning: GEMINI_API_KEY is not set in environment variables');
}

const genAI = new GoogleGenerativeAI(GEMINI_API_KEY || '');

const SYSTEM_PROMPT = `You are a compassionate mental health companion. Your role is to:
1. Provide empathetic and supportive responses
2. Help users explore their feelings and thoughts
3. Suggest healthy coping mechanisms and mindfulness techniques
4. Encourage professional help when appropriate
5. Maintain a warm, understanding tone

Important guidelines:
- Never provide medical diagnoses or prescribe medication
- Always prioritize user safety
- Encourage journaling and mood tracking
- Suggest breathing exercises and meditation when appropriate
- Be sensitive to cultural differences
- Maintain confidentiality and privacy
- Keep responses concise and focused (under 200 words)
- Use a friendly, conversational tone

If a user expresses thoughts of self-harm or suicide:
- Take it seriously
- Express concern
- Provide crisis hotline numbers
- Encourage seeking immediate professional help`;

export class GeminiService {
  private model;
  private chatHistory: string[];
  private isConfigured: boolean;

  constructor() {
    this.isConfigured = Boolean(GEMINI_API_KEY);
    this.model = genAI.getGenerativeModel({ model: 'gemini-pro' });
    this.chatHistory = [];
  }

  async generateResponse(userMessage: string): Promise<string> {
    try {
      if (!this.isConfigured) {
        return "I apologize, but I'm not properly configured at the moment. Please contact the administrator.";
      }

      // Add basic input validation
      if (!userMessage.trim()) {
        return "I notice you haven't typed anything. Would you like to share what's on your mind?";
      }

      // Keep chat history limited to last 5 exchanges for context
      if (this.chatHistory.length > 10) {
        this.chatHistory = this.chatHistory.slice(-10);
      }

      // Add user message to history
      this.chatHistory.push(`User: ${userMessage}`);

      // Combine system prompt with chat history and current message
      const prompt = `${SYSTEM_PROMPT}\n\nPrevious conversation:\n${this.chatHistory.join('\n')}\n\nResponse:`;
      
      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      
      // Validate response
      if (!text || !text.trim()) {
        throw new Error('Empty response received from Gemini API');
      }

      // Add bot response to history
      this.chatHistory.push(`Assistant: ${text}`);

      return text;
    } catch (error) {
      console.error('Error generating response:', error);
      
      // Check for specific error types
      if (error instanceof Error) {
        if (error.message.includes('API key')) {
          return "I'm currently experiencing technical difficulties with my configuration. Please try again later.";
        }
        if (error.message.includes('rate limit')) {
          return "I'm receiving too many requests right now. Please wait a moment before trying again.";
        }
        if (error.message.includes('content filtered')) {
          return "I apologize, but I need to be careful about certain topics. Could we discuss something else?";
        }
      }

      // Provide a more natural fallback response
      const fallbackResponses = [
        "I'm having a bit of trouble understanding. Could you rephrase that?",
        "I want to help, but I'm not quite following. Could you explain that differently?",
        "I apologize, but I'm having difficulty processing that. Could we try approaching this from a different angle?",
        "I want to make sure I respond appropriately. Could you share more about what you mean?",
      ];

      return fallbackResponses[Math.floor(Math.random() * fallbackResponses.length)];
    }
  }
} 