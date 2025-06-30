
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Users, Lightbulb, FileText, Calendar, Settings } from 'lucide-react';

interface FloatingNavProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export const FloatingNav = ({ activeTab, onTabChange }: FloatingNavProps) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      setIsVisible(scrollTop > 200);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'profile', icon: Users, label: 'Profile', color: 'from-blue-500 to-indigo-500' },
    { id: 'ideas', icon: Lightbulb, label: 'Ideas', color: 'from-purple-500 to-pink-500' },
    { id: 'content', icon: FileText, label: 'Create', color: 'from-orange-500 to-red-500' },
    { id: 'schedule', icon: Calendar, label: 'Schedule', color: 'from-green-500 to-emerald-500' },
    { id: 'settings', icon: Settings, label: 'Settings', color: 'from-gray-500 to-gray-700' },
  ];

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-40 animate-scale-in">
      <div className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl rounded-2xl p-2 shadow-2xl border border-gray-200/50 dark:border-gray-700/50">
        <div className="flex items-center gap-2">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <Button
                key={item.id}
                variant={isActive ? "default" : "ghost"}
                size="sm"
                onClick={() => onTabChange(item.id)}
                className={`relative h-12 px-4 rounded-xl transition-all duration-300 ${
                  isActive 
                    ? `bg-gradient-to-r ${item.color} text-white shadow-lg scale-105` 
                    : 'hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-300'
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span className={`ml-2 font-medium ${isActive ? 'block' : 'hidden sm:block'}`}>
                  {item.label}
                </span>
                {isActive && (
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-white rounded-full animate-pulse"></div>
                )}
              </Button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
