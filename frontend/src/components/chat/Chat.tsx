import { useState, useEffect, useRef } from 'react';
import { Send, Bot, User, Loader2, Trash2, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Message {
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

interface ChatMessage {
  id?: string;
  content: string;
  sender: string;
  timestamp: string;
}

const Chat: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const isLoggedIn = Boolean(localStorage.getItem('token'));

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    fetchChatHistory();
    initChat();
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const fetchChatHistory = async () => {
    setError(null);
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
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to fetch chat history');
      }

      const data = await response.json();
      if (!Array.isArray(data)) {
        throw new Error('Invalid chat history format');
      }

      setMessages(data.map((msg: any) => ({
        content: msg.content || '',
        sender: msg.sender === 'user' || msg.sender === 'bot' ? msg.sender : 'bot',
        timestamp: new Date(msg.timestamp),
      })));
    } catch (error: any) {
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

    const messageText = input.trim();
    setInput('');
    setError(null);
    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:5000/api/chat/message', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ content: messageText }),
      });

      if (!response.ok) {
        if (response.status === 401) {
          navigate('/login');
          return;
        }
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to send message');
      }

      const data = await response.json();
      if (!data.userMessage || !data.botMessage) {
        throw new Error('Invalid response format');
      }

      setMessages(prev => [
        ...prev,
        {
          content: data.userMessage.content || messageText,
          sender: 'user',
          timestamp: new Date(data.userMessage.timestamp).toISOString(),
        },
        {
          content: data.botMessage.content || "I'm having trouble understanding. Could you rephrase that?",
          sender: 'bot',
          timestamp: new Date(data.botMessage.timestamp).toISOString(),
        },
      ]);
    } catch (error: any) {
      console.error('Failed to send message:', error);
      setError(error.message || 'Failed to send message. Please try again.');
      // Add the user's message even if the bot response failed
      setMessages(prev => [
        ...prev,
        {
          content: messageText,
          sender: 'user',
          timestamp: new Date().toISOString(),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearChat = async () => {
    if (!window.confirm('Are you sure you want to clear your chat history?')) {
      return;
    }

    setError(null);
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
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to clear chat history');
      }

      setMessages([]);
    } catch (error: any) {
      console.error('Failed to clear chat:', error);
      setError(error.message || 'Failed to clear chat history. Please try again.');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // Initialize chat with welcome message
  const initChat = () => {
    const welcomeMessage = {
      sender: 'bot',
      message: 'Hello! How can I help you today?',
      timestamp: new Date().toISOString()
    };
    
    if (isLoggedIn) {
        // Save to database
        saveChatHistory([welcomeMessage]);
    } else {
        // Save to localStorage
        localStorage.setItem('tempChatHistory', JSON.stringify([welcomeMessage]));
    }
    
    displayMessage(welcomeMessage);
  }

  // Handle chat messages
  const handleChat = (message) => {
    if (isLoggedIn) {
        // Save to database
        saveChatToDatabase(message);
    } else {
        // Save to localStorage
        const history = JSON.parse(localStorage.getItem('tempChatHistory')) || [];
        history.push(message);
        localStorage.setItem('tempChatHistory', JSON.stringify(history));
    }
  }

  const saveChatHistory = async (messages: ChatMessage[]) => {
    if (isLoggedIn) {
      const token = localStorage.getItem('token');
      await fetch('http://localhost:5000/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ messages })
      });
    } else {
      localStorage.setItem('tempChatHistory', JSON.stringify(messages));
    }
  };

  const displayMessage = (message: ChatMessage) => {
    setMessages(prev => [...prev, message]);
  };

  const handleNewMessage = (content: string) => {
    const newMessage: ChatMessage = {
      content,
      sender: 'user',
      timestamp: new Date().toISOString()
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const handleBotResponse = (response: string) => {
    const botMessage: ChatMessage = {
      content: response,
      sender: 'bot',
      timestamp: new Date().toISOString()
    };
    setMessages(prev => [...prev, botMessage]);
  };

  const saveChatToDatabase = async (message: ChatMessage): Promise<void> => {
    if (!isLoggedIn) return;
    const token = localStorage.getItem('token');
    if (!token) return;
    
    await fetch('http://localhost:5000/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(message)
    });
  };

  const handleMessage = (messageContent: string) => {
    const newMessage: ChatMessage = {
      content: messageContent,
      sender: 'user',
      timestamp: new Date().toISOString()
    };
    setMessages(prev => [...prev, newMessage]);
    saveChatToDatabase(newMessage);
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
                  {new Date(message.timestamp).toLocaleTimeString()}
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
        </div>
      </div>
    </div>
  );
}

export default Chat;