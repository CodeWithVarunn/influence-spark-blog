
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { MessageCircle, Send, X, Bot, User, HelpCircle, Zap, FileText, Calendar } from 'lucide-react';

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
      text: 'Hello! I\'m your LinkedUp Content assistant. How can I help you create amazing LinkedIn content today?',
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const quickQuestions = [
    { icon: FileText, text: "How do I generate content ideas?", category: "Content" },
    { icon: Zap, text: "How to connect my LinkedIn account?", category: "Setup" },
    { icon: Calendar, text: "How does post scheduling work?", category: "Scheduling" },
    { icon: HelpCircle, text: "What file types can I upload?", category: "Resources" }
  ];

  const predefinedResponses: Record<string, string> = {
    'generate content ideas': 'To generate content ideas: 1) Go to the "Generate Ideas" tab, 2) Click "Generate Blog Ideas" for AI suggestions, or 3) Add your own custom ideas. You can select multiple ideas to work with!',
    'generate ideas': 'Head over to the "Generate Ideas" section! Click the "Generate Blog Ideas" button to get AI-powered suggestions, or use "Add Custom Idea" to create your own. You can select multiple ideas that interest you.',
    'connect linkedin': 'To connect LinkedIn: 1) Go to the "Schedule Posts" tab, 2) Click "Connect LinkedIn Account", 3) Sign in with your LinkedIn credentials. This allows you to schedule posts directly to your profile.',
    'linkedin account': 'You can connect your LinkedIn account in the "Schedule Posts" section. Click "Connect LinkedIn Account" and sign in. This enables direct post scheduling to your LinkedIn profile.',
    'upload resources': 'You can upload resources in the "Upload Resources" section. We support PDF files and website URLs. Just drag & drop PDFs or enter a website name/URL to extract content.',
    'file types': 'We support PDF files and website URLs in the Upload Resources section. You can upload documents or enter website names/URLs to extract content for idea generation.',
    'schedule posts': 'After connecting LinkedIn and creating content, go to "Schedule Posts" to set up your posting schedule. Choose optimal times and dates for maximum engagement.',
    'post scheduling': 'Post scheduling works after you connect your LinkedIn account. Go to the "Schedule Posts" tab, create your content, choose the best time, and schedule it for automatic posting.',
    'dark mode': 'You can toggle between light and dark themes using the sun/moon icon in the top navigation bar. Your preference will be saved automatically.',
    'create content': 'In the "Create Content" tab, enter your topic or idea in the text box, or click one of the quick prompt suggestions. Our AI will generate engaging LinkedIn content for you instantly.',
    'help': 'I can help you with: generating content ideas, connecting LinkedIn, uploading resources, scheduling posts, using dark mode, and navigating the platform. What would you like to know more about?',
    'api key': 'Good news! You don\'t need to provide any API keys. All AI features are built-in and ready to use immediately.',
    'getting started': 'Welcome! Here\'s how to get started: 1) Upload your resources (PDFs/websites), 2) Generate content ideas, 3) Create engaging content, 4) Connect LinkedIn and schedule posts. Each step builds on the previous one!'
  };

  const generateResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    for (const [key, response] of Object.entries(predefinedResponses)) {
      if (lowerMessage.includes(key)) {
        return response;
      }
    }
    
    return 'I understand you need help with that! I can assist with generating content ideas, connecting LinkedIn, uploading resources, scheduling posts, and general platform navigation. Try asking about specific features or click one of the quick questions below.';
  };

  const sendMessage = async (messageText?: string) => {
    const textToSend = messageText || inputValue;
    if (!textToSend.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: textToSend,
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
        text: generateResponse(textToSend),
        isUser: false,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000);
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
        className="fixed bottom-6 right-6 rounded-full w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-2xl z-50 transition-all hover:scale-110 animate-pulse"
      >
        <MessageCircle className="w-7 h-7 text-white" />
      </Button>
    );
  }

  return (
    <Card className="fixed bottom-6 right-6 w-96 h-[500px] shadow-2xl z-50 border-0 bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl">
      <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-t-lg">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center gap-2">
            <Bot className="w-6 h-6" />
            LinkedUp Assistant
          </CardTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsOpen(false)}
            className="text-white hover:bg-white/20 rounded-lg"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
      </CardHeader>
      
      <CardContent className="p-0 flex flex-col h-full">
        <ScrollArea className="flex-1 p-4">
          <div className="space-y-4">
            {messages.length === 1 && (
              <div className="space-y-3 mb-4">
                <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">Quick Questions:</p>
                <div className="grid grid-cols-1 gap-2">
                  {quickQuestions.map((question, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      className="justify-start h-auto p-3 text-left hover:bg-blue-50 dark:hover:bg-blue-900/20 border-gray-200 dark:border-gray-700"
                      onClick={() => sendMessage(question.text)}
                    >
                      <question.icon className="w-4 h-4 mr-2 text-blue-600 flex-shrink-0" />
                      <div className="flex-1">
                        <p className="text-sm font-medium">{question.text}</p>
                        <Badge variant="secondary" className="text-xs mt-1">{question.category}</Badge>
                      </div>
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-3 ${message.isUser ? 'justify-end' : 'justify-start'}`}
              >
                {!message.isUser && (
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 flex items-center justify-center flex-shrink-0">
                    <Bot className="w-4 h-4 text-white" />
                  </div>
                )}
                <div
                  className={`max-w-xs p-3 rounded-2xl text-sm ${
                    message.isUser
                      ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-br-md'
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-bl-md'
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
              <div className="flex gap-3 justify-start">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 flex items-center justify-center flex-shrink-0">
                  <Bot className="w-4 h-4 text-white" />
                </div>
                <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-2xl rounded-bl-md">
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
              className="flex-1 rounded-xl"
            />
            <Button 
              onClick={() => sendMessage()} 
              size="sm" 
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 rounded-xl px-4"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
