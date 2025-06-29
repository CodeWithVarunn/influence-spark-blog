
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { MessageCircle, Send, X, Bot, User, HelpCircle, Zap, FileText, Calendar, RefreshCw, Lightbulb, Settings, BarChart3 } from 'lucide-react';

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
      text: 'Hello! I\'m your LinkedUp Content AI assistant. How can I help you create amazing LinkedIn content today?',
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showFollowUp, setShowFollowUp] = useState(false);

  const quickQuestions = [
    { icon: FileText, text: "How do I generate content ideas?", category: "Content" },
    { icon: Zap, text: "How to connect my LinkedIn account?", category: "Setup" },
    { icon: Calendar, text: "How does post scheduling work?", category: "Scheduling" },
    { icon: HelpCircle, text: "What file types can I upload?", category: "Resources" },
    { icon: Lightbulb, text: "How to create engaging posts?", category: "Tips" },
    { icon: BarChart3, text: "How to track performance?", category: "Analytics" }
  ];

  const followUpOptions = [
    { icon: RefreshCw, text: "Start new conversation", action: "new_chat" },
    { icon: Lightbulb, text: "Get more content tips", action: "content_tips" },
    { icon: Settings, text: "Account settings help", action: "settings_help" },
    { icon: Calendar, text: "Scheduling best practices", action: "scheduling_tips" },
    { icon: FileText, text: "Content optimization", action: "optimization" },
    { icon: BarChart3, text: "Performance insights", action: "analytics" }
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
    'create content': 'In the "Create Content" tab, enter your topic or idea in the text box, or click one of the quick prompt suggestions. Our AI will generate engaging LinkedIn content for you instantly.',
    'engaging posts': 'For engaging posts: 1) Start with a hook, 2) Share personal insights, 3) Ask questions, 4) Use relevant hashtags, 5) Include call-to-actions. Our AI helps optimize all these elements!',
    'track performance': 'Track your LinkedIn performance by: 1) Monitoring likes, comments, shares, 2) Checking profile views, 3) Analyzing best posting times, 4) Our platform will soon include built-in analytics!',
    'content tips': 'Pro content tips: 1) Be authentic and personal, 2) Share industry insights, 3) Tell stories, 4) Use data and statistics, 5) Engage with comments quickly. Quality over quantity always wins!',
    'settings help': 'Need help with settings? You can: 1) Update your profile info, 2) Change theme (light/dark), 3) Manage LinkedIn connections, 4) Set posting preferences. Check the settings menu in your profile dropdown.',
    'scheduling tips': 'Best posting times: 1) Tuesday-Thursday 8-10 AM, 2) Wednesday 3-5 PM, 3) Avoid weekends for business content, 4) Test different times for your audience, 5) Use our scheduling feature to optimize timing!',
    'optimization': 'Content optimization tips: 1) Use relevant keywords, 2) Optimize post length (1300 chars ideal), 3) Include compelling visuals, 4) Write attention-grabbing headlines, 5) Use our AI to refine your content!',
    'analytics': 'Performance insights: 1) Track engagement rates, 2) Monitor follower growth, 3) Analyze top-performing content, 4) Identify optimal posting times, 5) Use insights to improve future posts. Analytics coming soon!',
    'help': 'I can help you with: generating content ideas, connecting LinkedIn, uploading resources, scheduling posts, content optimization, performance tracking, and platform navigation. What interests you most?'
  };

  const generateResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    for (const [key, response] of Object.entries(predefinedResponses)) {
      if (lowerMessage.includes(key)) {
        return response;
      }
    }
    
    return 'Great question! I can help with content creation, LinkedIn optimization, scheduling strategies, and platform features. Would you like specific guidance on any of these areas?';
  };

  const handleFollowUpOption = (action: string) => {
    switch (action) {
      case 'new_chat':
        setMessages([{
          id: Date.now().toString(),
          text: 'Hello! I\'m ready to help you with a fresh start. What can I assist you with today?',
          isUser: false,
          timestamp: new Date()
        }]);
        setShowFollowUp(false);
        break;
      default:
        sendMessage(followUpOptions.find(opt => opt.action === action)?.text || '');
        setShowFollowUp(false);
    }
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
    setShowFollowUp(false);

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
      setShowFollowUp(true);
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
        className="fixed bottom-6 right-6 rounded-full w-16 h-16 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:via-indigo-700 hover:to-purple-700 shadow-2xl z-50 transition-all hover:scale-110 animate-pulse border-2 border-white/20"
      >
        <MessageCircle className="w-7 h-7 text-white" />
      </Button>
    );
  }

  return (
    <Card className="fixed bottom-6 right-6 w-96 h-[500px] shadow-2xl z-50 border-0 bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl">
      <CardHeader className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white rounded-t-lg">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center gap-2">
            <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
              <Bot className="w-5 h-5" />
            </div>
            LinkedUp AI Assistant
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
                      className="justify-start h-auto p-3 text-left hover:bg-blue-50 dark:hover:bg-blue-900/20 border-gray-200 dark:border-gray-700 transition-all hover:scale-[1.02]"
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
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-gray-400 to-gray-500 dark:from-gray-600 dark:to-gray-700 flex items-center justify-center flex-shrink-0">
                    <User className="w-4 h-4 text-white" />
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

            {showFollowUp && messages.length > 1 && (
              <div className="space-y-3 mt-4 p-3 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl border border-blue-200/50 dark:border-blue-700/50">
                <p className="text-sm font-medium text-gray-700 dark:text-gray-300">What would you like to do next?</p>
                <div className="grid grid-cols-2 gap-2">
                  {followUpOptions.map((option, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      className="h-auto p-2 text-xs hover:bg-white dark:hover:bg-gray-800 transition-all hover:scale-[1.02]"
                      onClick={() => handleFollowUpOption(option.action)}
                    >
                      <option.icon className="w-3 h-3 mr-1 text-blue-600 flex-shrink-0" />
                      <span className="text-left leading-tight">{option.text}</span>
                    </Button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </ScrollArea>
        
        <div className="p-4 border-t dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800/50">
          <div className="flex gap-2">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask me anything..."
              className="flex-1 rounded-xl border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800"
            />
            <Button 
              onClick={() => sendMessage()} 
              size="sm" 
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 rounded-xl px-4 shadow-lg"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
