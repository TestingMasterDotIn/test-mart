import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { MessageCircle, Send, X, User, Bot, Minimize2, Maximize2 } from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'user' | 'bot' | 'agent';
  message: string;
  timestamp: Date;
  senderName?: string;
}

interface ChatSupportProps {
  className?: string;
}

const ChatSupport: React.FC<ChatSupportProps> = ({ className = '' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [chatStatus, setChatStatus] = useState<'online' | 'away' | 'offline'>('online');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { user, isAuthenticated } = useAuth();

  const botResponses = [
    "Hi! I'm here to help. What can I assist you with today?",
    "Thank you for contacting us! How can I help you?",
    "I understand your concern. Let me help you with that.",
    "That's a great question! Here's what I can tell you...",
    "I'm connecting you with our product specialist. Please hold on.",
    "Is there anything else I can help you with today?",
    "Thanks for using TestMart! Have a great day!",
    "I'm sorry, but I need to transfer you to a human agent for this complex issue.",
    "Your order details have been sent to your email. Anything else?",
    "Our return policy allows returns within 30 days of purchase."
  ];

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      // Add welcome message
      const welcomeMessage: ChatMessage = {
        id: Date.now().toString(),
        sender: 'bot',
        message: `Welcome to TestMart Support! ${isAuthenticated ? `Hi ${user?.name}!` : ''} How can I help you today?`,
        timestamp: new Date(),
        senderName: 'TestMart Bot'
      };
      setMessages([welcomeMessage]);
    }
  }, [isOpen, isAuthenticated, user?.name, messages.length]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const simulateBotResponse = () => {
    setIsTyping(true);
    setTimeout(() => {
      const randomResponse = botResponses[Math.floor(Math.random() * botResponses.length)];
      const botMessage: ChatMessage = {
        id: Date.now().toString(),
        sender: 'bot',
        message: randomResponse,
        timestamp: new Date(),
        senderName: 'TestMart Bot'
      };
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1000 + Math.random() * 2000);
  };

  const handleSendMessage = () => {
    if (!message.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      message: message.trim(),
      timestamp: new Date(),
      senderName: user?.name || 'You'
    };

    setMessages(prev => [...prev, userMessage]);
    setMessage('');

    // Simulate bot response
    simulateBotResponse();
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  if (!isOpen) {
    return (
      <div className={`fixed bottom-4 right-4 z-50 ${className}`}>
        <Button
          onClick={() => setIsOpen(true)}
          className="rounded-full h-14 w-14 shadow-lg hover:shadow-xl transition-shadow"
          data-testid="chat-support-button"
        >
          <MessageCircle className="h-6 w-6" />
        </Button>
        {chatStatus === 'online' && (
          <div className="absolute -top-2 -right-2 h-4 w-4 bg-green-500 rounded-full border-2 border-white"></div>
        )}
      </div>
    );
  }

  return (
    <div className={`fixed bottom-4 right-4 z-50 ${className}`}>
      <Card className={`w-80 shadow-xl transition-all duration-300 ${isMinimized ? 'h-16' : 'h-96'}`}>
        <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
          <div className="flex items-center space-x-2">
            <div className="flex items-center space-x-2">
              <div className="h-3 w-3 bg-green-500 rounded-full"></div>
              <CardTitle className="text-sm">TestMart Support</CardTitle>
            </div>
            <Badge variant="secondary" className="text-xs">
              {chatStatus}
            </Badge>
          </div>
          <div className="flex space-x-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMinimized(!isMinimized)}
              className="h-6 w-6 p-0"
            >
              {isMinimized ? <Maximize2 className="h-3 w-3" /> : <Minimize2 className="h-3 w-3" />}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(false)}
              className="h-6 w-6 p-0"
            >
              <X className="h-3 w-3" />
            </Button>
          </div>
        </CardHeader>

        {!isMinimized && (
          <CardContent className="p-0 flex flex-col h-80">
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[70%] rounded-lg p-3 ${
                        msg.sender === 'user'
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted'
                      }`}
                    >
                      <div className="flex items-center space-x-2 mb-1">
                        {msg.sender === 'user' ? (
                          <User className="h-3 w-3" />
                        ) : (
                          <Bot className="h-3 w-3" />
                        )}
                        <span className="text-xs font-medium">{msg.senderName}</span>
                        <span className="text-xs opacity-70">
                          {formatTime(msg.timestamp)}
                        </span>
                      </div>
                      <p className="text-sm">{msg.message}</p>
                    </div>
                  </div>
                ))}
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-muted rounded-lg p-3 max-w-[70%]">
                      <div className="flex items-center space-x-2 mb-1">
                        <Bot className="h-3 w-3" />
                        <span className="text-xs font-medium">TestMart Bot</span>
                      </div>
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-current rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div ref={messagesEndRef} />
            </ScrollArea>

            <div className="p-4 border-t">
              <div className="flex space-x-2">
                <Input
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your message..."
                  className="flex-1"
                  data-testid="chat-message-input"
                />
                <Button
                  onClick={handleSendMessage}
                  size="sm"
                  className="px-3"
                  data-testid="chat-send-button"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        )}
      </Card>
    </div>
  );
};

export default ChatSupport;
