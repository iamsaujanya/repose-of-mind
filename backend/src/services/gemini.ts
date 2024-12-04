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

If a user expresses thoughts of self-harm or suicide:
- Take it seriously
- Express concern
- Provide crisis hotline numbers
- Encourage seeking immediate professional help`;

export class GeminiService {
  private model = genAI.getGenerativeModel({ model: 'gemini-pro' });
  private chat;

  constructor() {
    this.chat = this.model.startChat({
      history: [
        {
          role: 'user',
          parts: SYSTEM_PROMPT,
        },
        {
          role: 'model',
          parts: "I understand my role as a mental health companion. I'll provide empathetic support while maintaining appropriate boundaries and prioritizing user safety.",
        },
      ],
    });
  }

  async generateResponse(userMessage: string): Promise<string> {
    try {
      const result = await this.chat.sendMessage(userMessage);
      const response = await result.response;
      return response.text();
    } catch (error) {
      console.error('Error generating response:', error);
      return "I apologize, but I'm having trouble processing your message right now. Please try again in a moment.";
    }
  }
} 