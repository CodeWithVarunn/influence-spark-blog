
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  FileText, 
  Calendar,
  User
} from 'lucide-react';

export const FloatingNav = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    {
      icon: <FileText className="w-5 h-5" />,
      label: 'Create & Ideas',
      path: '/',
      isActive: location.pathname === '/'
    },
    {
      icon: <Calendar className="w-5 h-5" />,
      label: 'Schedule Posts',
      path: '/schedule-posts',
      isActive: location.pathname === '/schedule-posts'
    }
  ];

  return (
    <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-40">
      <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl border border-gray-200/50 dark:border-gray-700/50 rounded-2xl shadow-2xl px-2 py-2">
        <div className="flex items-center gap-2">
          {navItems.map((item, index) => (
            <Button
              key={index}
              variant={item.isActive ? "default" : "ghost"}
              size="sm"
              onClick={() => navigate(item.path)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all ${
                item.isActive 
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg' 
                  : 'hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              {item.icon}
              <span className="font-medium text-sm">{item.label}</span>
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};
