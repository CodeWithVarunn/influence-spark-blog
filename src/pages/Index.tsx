
import { useState, useEffect } from 'react';
import { Header } from '@/components/Header';
import { ContentCreation } from '@/components/ContentCreation';
import { UserProfile } from '@/components/UserProfile';
import { ChatBot } from '@/components/ChatBot';
import { FloatingNav } from '@/components/FloatingNav';
import { Footer } from '@/components/Footer';
import { SuggestionBox } from '@/components/SuggestionBox';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

export default function Index() {
  const { user } = useAuth();
  const [showProfile, setShowProfile] = useState(false);
  const [profileComplete, setProfileComplete] = useState(false);

  useEffect(() => {
    checkProfileStatus();
    
    const handleProfileCompleted = () => {
      setProfileComplete(true);
      setShowProfile(false);
    };

    window.addEventListener('profileCompleted', handleProfileCompleted);
    return () => window.removeEventListener('profileCompleted', handleProfileCompleted);
  }, [user]);

  const checkProfileStatus = async () => {
    if (!user) return;
    
    try {
      const { data, error } = await supabase
        .from('user_profiles')
        .select('is_complete')
        .eq('user_id', user.id)
        .single();
      
      if (error && error.code !== 'PGRST116') {
        console.error('Error checking profile status:', error);
        return;
      }
      
      const isComplete = data?.is_complete || false;
      setProfileComplete(isComplete);
      setShowProfile(!isComplete);
    } catch (error) {
      console.error('Error checking profile status:', error);
    }
  };

  if (showProfile && !profileComplete) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900">
        <Header />
        <main className="pt-20 pb-32">
          <UserProfile />
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900">
      <Header />
      <main className="pt-20 pb-32">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <ContentCreation />
        </div>
      </main>
      <FloatingNav />
      <ChatBot />
      <SuggestionBox />
      <Footer />
    </div>
  );
}
