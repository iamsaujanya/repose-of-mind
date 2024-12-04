import { useState, useEffect, useRef } from 'react';
import { Send, Bot, User, Loader2, Trash2, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Message {
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

export function Chat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    fetchChatHistory();
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const fetchChatHistory = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }

      const response = await fetch('http://localhost:5000/api/chat', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        if (response.status === 401) {
          navigate('/login');
          return;
        }
        throw new Error('Failed to fetch chat history');
      }

      const data = await response.json();
      setMessages(data.map((msg: any) => ({
        ...msg,
        timestamp: new Date(msg.timestamp),
      })));
    } catch (error) {
      console.error('Error fetching chat history:', error);
      setError('Failed to load chat history. Please try refreshing the page.');
    }
  };

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    setError(null);
    setIsLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/chat/message', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ content: input }),
      });

      if (!response.ok) {
        if (response.status === 401) {
          navigate('/login');
          return;
        }
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to send message');
      }

      const { userMessage, botMessage } = await response.json();
      setMessages(prev => [
        ...prev,
        {
          ...userMessage,
          timestamp: new Date(userMessage.timestamp),
        },
        {
          ...botMessage,
          timestamp: new Date(botMessage.timestamp),
        },
      ]);
      setInput('');
    } catch (error: any) {
      console.error('Failed to send message:', error);
      setError(error.message || 'Failed to send message. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearChat = async () => {
    if (!window.confirm('Are you sure you want to clear your chat history?')) {
      return;
    }

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }

      const response = await fetch('http://localhost:5000/api/chat', {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        if (response.status === 401) {
          navigate('/login');
          return;
        }
        throw new Error('Failed to clear chat history');
      }

      setMessages([]);
      setError(null);
    } catch (error) {
      console.error('Failed to clear chat:', error);
      setError('Failed to clear chat history. Please try again.');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="bg-card rounded-lg shadow-lg h-[calc(100vh-12rem)]">
        {/* Chat Header */}
        <div className="p-4 border-b flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold flex items-center gap-2">
              <Bot className="w-6 h-6" />
              Mental Health Companion
            </h1>
            <p className="text-muted-foreground">
              A safe space to share your thoughts and feelings
            </p>
          </div>
          <button
            onClick={handleClearChat}
            className="p-2 rounded-md hover:bg-destructive/10 text-destructive"
            title="Clear chat history"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        </div>

        {/* Error Message */}
        {error && (
          <div className="p-4 bg-destructive/10 text-destructive flex items-center gap-2">
            <AlertCircle className="w-5 h-5" />
            {error}
          </div>
        )}

        {/* Messages */}
        <div className="h-[calc(100%-8rem)] overflow-y-auto p-4 space-y-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex items-start gap-3 ${
                message.sender === 'user' ? 'flex-row-reverse' : ''
              }`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  message.sender === 'user' ? 'bg-primary' : 'bg-secondary'
                }`}
              >
                {message.sender === 'user' ? (
                  <User className="w-5 h-5" />
                ) : (
                  <Bot className="w-5 h-5" />
                )}
              </div>
              <div
                className={`max-w-[80%] rounded-lg p-3 ${
                  message.sender === 'user'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-secondary'
                }`}
              >
                <p className="whitespace-pre-wrap">{message.content}</p>
                <span className="text-xs opacity-70 mt-1 block">
                  {message.timestamp.toLocaleTimeString('en-IN')}
                </span>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex items-center gap-2 text-muted-foreground">
              <Loader2 className="w-4 h-4 animate-spin" />
              Thinking...
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-4 border-t">
          <div className="flex gap-2">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Type your message..."
              className="flex-1 p-2 rounded-md border bg-background resize-none"
              rows={1}
              disabled={isLoading}
              maxLength={1000}
            />
            <button
              onClick={handleSend}
              disabled={!input.trim() || isLoading}
              className="p-2 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
          <div className="flex justify-between text-xs text-muted-foreground mt-2">
            <span>Press Enter to send, Shift + Enter for new line</span>
            <span>{input.length}/1000</span>
          </div>
        </div>
      </div>
    </div>
  );
} 