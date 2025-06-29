
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { MessageCircle, Send, X, Bot, User } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

export const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hello! I\'m here to help you with the LinkedIn Content Studio. How can I assist you today?',
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const predefinedResponses: Record<string, string> = {
    'how to upload': 'You can upload resources by going to the Resource Upload section. You can either upload PDF files or enter website URLs to extract content.',
    'generate ideas': 'To generate blog ideas, first upload your resources, then go to the Idea Generation section and click "Generate Blog Ideas".',
    'connect linkedin': 'You can connect your LinkedIn account in the LinkedIn Scheduler section. Click "Connect LinkedIn Account" to get started.',
    'schedule posts': 'After connecting LinkedIn and creating content, go to the LinkedIn Scheduler to schedule your posts at optimal times.',
    'dark mode': 'You can toggle between light and dark mode using the moon/sun icon in the top navigation.',
    'api key': 'The OpenAI API key is now configured in the backend, so you don\'t need to enter it manually anymore.',
    'help': 'I can help you with: uploading resources, generating ideas, creating content, connecting LinkedIn, scheduling posts, and navigating the platform.',
  };

  const generateResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    for (const [key, response] of Object.entries(predefinedResponses)) {
      if (lowerMessage.includes(key)) {
        return response;
      }
    }
    
    return 'I understand you need help with that. For specific technical issues, please check our documentation or contact support. I can help with general questions about uploading resources, generating ideas, connecting LinkedIn, scheduling posts, and using the platform features.';
  };

  const sendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate typing delay
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: generateResponse(inputValue),
        isUser: false,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  if (!isOpen) {
    return (
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 rounded-full w-14 h-14 bg-blue-600 hover:bg-blue-700 shadow-lg z-50"
      >
        <MessageCircle className="w-6 h-6 text-white" />
      </Button>
    );
  }

  return (
    <Card className="fixed bottom-6 right-6 w-80 h-96 shadow-xl z-50 border-0 bg-white dark:bg-gray-900">
      <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-t-lg">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center gap-2">
            <Bot className="w-5 h-5" />
            AI Assistant
          </CardTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsOpen(false)}
            className="text-white hover:bg-white/20"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
      </CardHeader>
      
      <CardContent className="p-0 flex flex-col h-full">
        <ScrollArea className="flex-1 p-4">
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-2 ${message.isUser ? 'justify-end' : 'justify-start'}`}
              >
                {!message.isUser && (
                  <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center flex-shrink-0">
                    <Bot className="w-4 h-4 text-blue-600" />
                  </div>
                )}
                <div
                  className={`max-w-xs p-3 rounded-lg text-sm ${
                    message.isUser
                      ? 'bg-blue-600 text-white rounded-br-none'
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-bl-none'
                  }`}
                >
                  {message.text}
                </div>
                {message.isUser && (
                  <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center flex-shrink-0">
                    <User className="w-4 h-4 text-gray-600 dark:text-gray-300" />
                  </div>
                )}
              </div>
            ))}
            {isTyping && (
              <div className="flex gap-2 justify-start">
                <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center flex-shrink-0">
                  <Bot className="w-4 h-4 text-blue-600" />
                </div>
                <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-lg rounded-bl-none">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>
        
        <div className="p-4 border-t dark:border-gray-700">
          <div className="flex gap-2">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask me anything..."
              className="flex-1"
            />
            <Button onClick={sendMessage} size="sm" className="bg-blue-600 hover:bg-blue-700">
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
