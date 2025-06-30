
import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { MessageCircle, X, Send, Bot, User } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

interface Message {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
}

const PREDEFINED_QA = [
  {
    question: "How do I create content?",
    answer: "To create content, use the 'Create Content & Generate Ideas' section on the main page. Enter your topic or idea, and our AI will generate professional LinkedIn content for you."
  },
  {
    question: "How do I schedule posts?",
    answer: "After creating content, you can schedule it by clicking 'Schedule Posts' in the navigation. Connect your LinkedIn account, select a date and time, then schedule your post."
  },
  {
    question: "How do I connect LinkedIn?",
    answer: "Go to the Schedule Posts page and follow the LinkedIn connection process. You'll need to provide your LinkedIn profile information to enable post scheduling."
  },
  {
    question: "Can I edit my profile?",
    answer: "Yes! Click on your avatar in the top right corner and select 'View Profile' to see your profile details. Your profile helps generate more personalized content."
  },
  {
    question: "How does AI content generation work?",
    answer: "Our AI uses your profile information (job title, industry, goals) to create personalized LinkedIn content. The more complete your profile, the better the content will be."
  },
  {
    question: "What types of content can I create?",
    answer: "You can create various types of LinkedIn content including professional posts, industry insights, career updates, thought leadership pieces, and engagement posts."
  }
];

export const ChatBot = () => {
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hi! I'm your LinkedUp Content assistant. I can help you with questions about creating content, scheduling posts, and using the platform. What would you like to know?",
      isBot: true,
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Don't show chatbot if user is not logged in
  if (!user) {
    return null;
  }

  const findAnswer = (question: string): string | null => {
    const lowerQuestion = question.toLowerCase();
    
    const match = PREDEFINED_QA.find(qa => 
      lowerQuestion.includes(qa.question.toLowerCase().split(' ').slice(2).join(' ')) ||
      qa.question.toLowerCase().includes(lowerQuestion) ||
      lowerQuestion.includes('content') && qa.question.toLowerCase().includes('content') ||
      lowerQuestion.includes('schedule') && qa.question.toLowerCase().includes('schedule') ||
      lowerQuestion.includes('linkedin') && qa.question.toLowerCase().includes('linkedin') ||
      lowerQuestion.includes('profile') && qa.question.toLowerCase().includes('profile') ||
      lowerQuestion.includes('ai') && qa.question.toLowerCase().includes('ai')
    );
    
    return match ? match.answer : null;
  };

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      isBot: false,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);

    const answer = findAnswer(inputValue);
    const botResponse: Message = {
      id: (Date.now() + 1).toString(),
      text: answer || "I understand you're asking about that topic. For detailed help, please check our main features: Create Content, Schedule Posts, and Profile management. If you need specific assistance, try asking about content creation, scheduling, or LinkedIn connection.",
      isBot: true,
      timestamp: new Date()
    };

    setTimeout(() => {
      setMessages(prev => [...prev, botResponse]);
    }, 500);

    setInputValue('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  const suggestedQuestions = [
    "How do I create content?",
    "How do I schedule posts?",
    "How do I connect LinkedIn?",
    "Can I edit my profile?"
  ];

  return (
    <>
      {/* Chat Button */}
      <Button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-2xl hover:shadow-blue-500/25 transition-all transform hover:scale-110 ${isOpen ? 'hidden' : 'block'}`}
      >
        <MessageCircle className="w-6 h-6 text-white" />
      </Button>

      {/* Chat Window */}
      {isOpen && (
        <Card className="fixed bottom-6 right-6 z-50 w-80 h-96 shadow-2xl border-0 bg-white dark:bg-gray-800">
          <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-t-lg">
            <div className="flex items-center gap-2">
              <Bot className="w-5 h-5" />
              <span className="font-semibold">LinkedUp Assistant</span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(false)}
              className="text-white hover:bg-white/20 h-8 w-8 p-0"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>

          <CardContent className="flex flex-col h-80 p-0">
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex gap-2 ${message.isBot ? 'justify-start' : 'justify-end'}`}
                >
                  {message.isBot && (
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 flex items-center justify-center flex-shrink-0">
                      <Bot className="w-4 h-4 text-white" />
                    </div>
                  )}
                  <div
                    className={`max-w-[240px] p-3 rounded-lg text-sm ${
                      message.isBot
                        ? 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
                        : 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white'
                    }`}
                  >
                    {message.text}
                  </div>
                  {!message.isBot && (
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center flex-shrink-0">
                      <User className="w-4 h-4 text-white" />
                    </div>
                  )}
                </div>
              ))}
              
              {messages.length === 1 && (
                <div className="space-y-2">
                  <p className="text-xs text-gray-500 dark:text-gray-400 text-center">Quick questions:</p>
                  {suggestedQuestions.map((question, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        setInputValue(question);
                        handleSendMessage();
                      }}
                      className="w-full text-left p-2 text-xs bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-lg transition-colors"
                    >
                      {question}
                    </button>
                  ))}
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            <div className="p-4 border-t border-gray-200 dark:border-gray-700">
              <div className="flex gap-2">
                <Input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask me anything..."
                  className="flex-1 text-sm"
                />
                <Button
                  onClick={handleSendMessage}
                  size="sm"
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </>
  );
};
