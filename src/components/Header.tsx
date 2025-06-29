
import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useTheme } from '@/contexts/ThemeContext';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from '@/components/ui/dropdown-menu';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { LogOut, User, Sun, Moon, Settings, Activity, Award, TrendingUp, BarChart3, Target, Trophy } from 'lucide-react';

export const Header = () => {
  const { user, signOut } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const [profileOpen, setProfileOpen] = useState(false);

  const handleSignOut = async () => {
    await signOut();
  };

  const getInitials = (email: string) => {
    return email.substring(0, 2).toUpperCase();
  };

  const UserProfile = () => (
    <Card className="w-full max-w-md mx-auto border-0 shadow-2xl bg-gradient-to-br from-white via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-blue-900/20 dark:to-indigo-900/20">
      <CardHeader className="text-center pb-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-t-lg">
        <div className="mx-auto w-20 h-20 mb-4">
          <Avatar className="w-20 h-20 mx-auto border-4 border-white/30">
            <AvatarFallback className="bg-gradient-to-r from-white/20 to-white/30 text-white text-xl font-bold">
              {getInitials(user?.email || 'U')}
            </AvatarFallback>
          </Avatar>
        </div>
        <CardTitle className="text-xl font-bold">{user?.user_metadata?.full_name || 'Professional User'}</CardTitle>
        <CardDescription className="text-blue-100">{user?.email}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4 p-6">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-900/20 rounded-xl border border-blue-200/50 dark:border-blue-700/50">
            <BarChart3 className="w-6 h-6 mx-auto mb-2 text-blue-600" />
            <p className="text-lg font-bold text-gray-900 dark:text-white">247</p>
            <p className="text-xs text-gray-600 dark:text-gray-400">Engagement</p>
          </div>
          <div className="p-4 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/30 dark:to-green-900/20 rounded-xl border border-green-200/50 dark:border-green-700/50">
            <Target className="w-6 h-6 mx-auto mb-2 text-green-600" />
            <p className="text-lg font-bold text-gray-900 dark:text-white">12</p>
            <p className="text-xs text-gray-600 dark:text-gray-400">Posts Created</p>
          </div>
          <div className="p-4 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/30 dark:to-purple-900/20 rounded-xl border border-purple-200/50 dark:border-purple-700/50">
            <Trophy className="w-6 h-6 mx-auto mb-2 text-purple-600" />
            <p className="text-lg font-bold text-gray-900 dark:text-white">5.2K</p>
            <p className="text-xs text-gray-600 dark:text-gray-400">Reach</p>
          </div>
        </div>
        <div className="pt-4 border-t border-gray-200/50 dark:border-gray-700/50">
          <h3 className="font-semibold mb-3 text-gray-900 dark:text-white flex items-center gap-2">
            <Activity className="w-4 h-4 text-blue-600" />
            Recent Activity
          </h3>
          <div className="space-y-3 text-sm">
            <div className="flex items-center gap-3 p-2 rounded-lg bg-gray-50 dark:bg-gray-800/50">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-gray-700 dark:text-gray-300">Generated 3 content ideas today</span>
            </div>
            <div className="flex items-center gap-3 p-2 rounded-lg bg-gray-50 dark:bg-gray-800/50">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span className="text-gray-700 dark:text-gray-300">Created LinkedIn post draft</span>
            </div>
            <div className="flex items-center gap-3 p-2 rounded-lg bg-gray-50 dark:bg-gray-800/50">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              <span className="text-gray-700 dark:text-gray-300">Scheduled 2 posts for next week</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <header className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-b border-gray-200/50 dark:border-gray-700/50 px-6 py-4 sticky top-0 z-50 transition-all duration-300">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        <div className="flex items-center gap-4">
          <div className="relative group">
            <div className="w-12 h-12 flex items-center justify-center transform hover:scale-105 transition-all duration-300">
              <img 
                src="/lovable-uploads/2a70df12-ad0c-4e56-9c0d-b5974e5fd46e.png" 
                alt="LinkedUp Logo" 
                className="w-10 h-10 object-contain"
              />
            </div>
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full border-2 border-white dark:border-gray-900 animate-pulse shadow-lg"></div>
          </div>
          <div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-900 via-blue-600 to-indigo-600 dark:from-white dark:via-blue-400 dark:to-indigo-400 bg-clip-text text-transparent">
              LinkedUp Content
            </h1>
            <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">
              Your all-in-one platform for brilliant LinkedIn posts
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleTheme}
            className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200 rounded-xl p-2"
          >
            {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </Button>
          
          {user && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 w-10 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200">
                  <Avatar className="h-10 w-10 border-2 border-transparent hover:border-blue-300 dark:hover:border-blue-600 transition-all">
                    <AvatarFallback className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-semibold">
                      {getInitials(user.email || 'U')}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-72 p-0 border-0 shadow-2xl bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl" align="end" forceMount>
                <div className="p-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-t-lg">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-12 w-12 border-2 border-white/30">
                      <AvatarFallback className="bg-white/20 text-white font-bold">
                        {getInitials(user.email || 'U')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold leading-none">
                        {user.user_metadata?.full_name || 'Professional'}
                      </p>
                      <p className="text-sm text-blue-100 mt-1">
                        {user.email}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="p-2">
                  <Dialog open={profileOpen} onOpenChange={setProfileOpen}>
                    <DialogTrigger asChild>
                      <DropdownMenuItem className="cursor-pointer rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 p-3" onSelect={(e) => e.preventDefault()}>
                        <User className="mr-3 h-4 w-4 text-blue-600" />
                        <span className="font-medium">View Profile</span>
                      </DropdownMenuItem>
                    </DialogTrigger>
                    <DialogContent className="max-w-md p-0 border-0">
                      <DialogHeader className="sr-only">
                        <DialogTitle>User Profile</DialogTitle>
                      </DialogHeader>
                      <UserProfile />
                    </DialogContent>
                  </Dialog>
                  <DropdownMenuItem className="cursor-pointer rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 p-3">
                    <Settings className="mr-3 h-4 w-4 text-gray-600" />
                    <span className="font-medium">Settings & Privacy</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="my-2" />
                  <DropdownMenuItem onClick={handleSignOut} className="cursor-pointer text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg p-3">
                    <LogOut className="mr-3 h-4 w-4" />
                    <span className="font-medium">Sign Out</span>
                  </DropdownMenuItem>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </div>
    </header>
  );
};
