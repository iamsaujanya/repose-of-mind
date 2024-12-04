import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

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
- Keep responses concise and focused
- Use a friendly, conversational tone

If a user expresses thoughts of self-harm or suicide:
- Take it seriously
- Express concern
- Provide crisis hotline numbers
- Encourage seeking immediate professional help`;

export class GeminiService {
  private model;

  constructor() {
    this.model = genAI.getGenerativeModel({ model: 'gemini-pro' });
  }

  async generateResponse(userMessage: string): Promise<string> {
    try {
      // Combine system prompt with user message for context
      const prompt = `${SYSTEM_PROMPT}\n\nUser: ${userMessage}\n\nResponse:`;
      
      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      
      // If response is empty, provide a fallback
      if (!text.trim()) {
        return "I understand what you're saying. Could you tell me more about how you're feeling?";
      }

      return text;
    } catch (error) {
      console.error('Error generating response:', error);
      return "I apologize, but I'm having trouble processing your message right now. Could you try rephrasing that, or perhaps we could explore a different topic?";
    }
  }
} 