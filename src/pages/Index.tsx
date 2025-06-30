
import { useState, useEffect } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { UserProfile } from '@/components/UserProfile';
import { ContentCreation } from '@/components/ContentCreation';
import { LinkedInScheduler } from '@/components/LinkedInScheduler';
import { FloatingNav } from '@/components/FloatingNav';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Users, FileText, Calendar, Brain, Rocket, Target, Award } from 'lucide-react';

const Index = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [isProfileComplete, setIsProfileComplete] = useState(false);

  useEffect(() => {
    // Check if profile is complete
    const userProfile = localStorage.getItem('userProfile');
    if (userProfile) {
      try {
        const profile = JSON.parse(userProfile);
        const isComplete = profile.fullName && profile.jobTitle && profile.company && profile.industry && profile.goals && profile.bio;
        setIsProfileComplete(isComplete);
        if (isComplete) {
          setActiveTab('content');
        }
      } catch (error) {
        console.error('Error parsing user profile:', error);
      }
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50/30 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900/30 transition-all duration-300">
      <Header />
      
      <main className="container mx-auto px-6 py-8 max-w-7xl">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-6 mb-8">
            <div className="relative group">
              <div className="w-20 h-20 flex items-center justify-center transform hover:scale-105 transition-all duration-300">
                <img 
                  src="/lovable-uploads/2a70df12-ad0c-4e56-9c0d-b5974e5fd46e.png" 
                  alt="LinkedUp Logo" 
                  className="w-16 h-16 object-contain filter drop-shadow-2xl"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-indigo-400/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
            </div>
            <div className="text-left">
              <h1 className="text-6xl font-bold bg-gradient-to-r from-gray-900 via-blue-600 to-indigo-600 dark:from-white dark:via-blue-400 dark:to-indigo-400 bg-clip-text text-transparent mb-2">
                LinkedUp Content
              </h1>
              <p className="text-2xl text-gray-600 dark:text-gray-300 font-medium">
                Your all-in-one platform for brilliant LinkedIn posts
              </p>
              <div className="flex items-center gap-2 mt-3">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm text-gray-500 dark:text-gray-400">AI-Enhanced • Professional • Results-Driven</span>
              </div>
            </div>
          </div>
          
          {/* Enhanced Stats Section with 4 items */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto mb-12">
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-indigo-600/10 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
              <div className="relative bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-2xl p-8 border border-gray-200/50 dark:border-gray-700/50 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-2xl h-full">
                <Brain className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                <p className="text-3xl font-bold text-gray-900 dark:text-white mb-2">AI-Enhanced</p>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">Advanced content generation with GPT technology</p>
              </div>
            </div>
            
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-r from-green-600/10 to-emerald-600/10 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
              <div className="relative bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-2xl p-8 border border-gray-200/50 dark:border-gray-700/50 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-2xl h-full">
                <Rocket className="w-12 h-12 text-green-600 mx-auto mb-4" />
                <p className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Lightning Fast</p>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">Generate professional content in seconds</p>
              </div>
            </div>
            
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-pink-600/10 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
              <div className="relative bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-2xl p-8 border border-gray-200/50 dark:border-gray-700/50 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-2xl h-full">
                <Target className="w-12 h-12 text-purple-600 mx-auto mb-4" />
                <p className="text-3xl font-bold text-gray-900 dark:text-white mb-2">High Engagement</p>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">Optimize posts for maximum reach and impact</p>
              </div>
            </div>

            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-r from-orange-600/10 to-red-600/10 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
              <div className="relative bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-2xl p-8 border border-gray-200/50 dark:border-gray-700/50 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-2xl h-full">
                <Award className="w-12 h-12 text-orange-600 mx-auto mb-4" />
                <p className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Professional</p>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">Tailored for business professionals and creators</p>
              </div>
            </div>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="flex justify-center mb-8">
            <TabsList className="grid grid-cols-3 bg-white/80 dark:bg-gray-800/80 shadow-2xl rounded-3xl p-2 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 w-full max-w-2xl">
              {!isProfileComplete && (
                <TabsTrigger 
                  value="profile" 
                  className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-indigo-500 data-[state=active]:text-white transition-all rounded-2xl py-4 font-medium"
                >
                  <Users className="w-5 h-5" />
                  <span className="hidden sm:inline">Profile Setup</span>
                  <span className="sm:hidden">Profile</span>
                </TabsTrigger>
              )}
              <TabsTrigger 
                value="content" 
                className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-500 data-[state=active]:to-red-500 data-[state=active]:text-white transition-all rounded-2xl py-4 font-medium"
              >
                <FileText className="w-5 h-5" />
                <span className="hidden sm:inline">Create & Generate</span>
                <span className="sm:hidden">Create</span>
              </TabsTrigger>
              <TabsTrigger 
                value="schedule" 
                className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-500 data-[state=active]:to-emerald-500 data-[state=active]:text-white transition-all rounded-2xl py-4 font-medium"
              >
                <Calendar className="w-5 h-5" />
                <span className="hidden sm:inline">Schedule Posts</span>
                <span className="sm:hidden">Schedule</span>
              </TabsTrigger>
            </TabsList>
          </div>

          <div className="relative flex justify-center">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 via-purple-600/5 to-indigo-600/5 rounded-3xl blur-3xl"></div>
            <div className="relative bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-gray-200/50 dark:border-gray-700/50 w-full max-w-6xl">
              {!isProfileComplete && (
                <TabsContent value="profile" className="mt-0">
                  <div className="flex items-center gap-4 mb-8">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl flex items-center justify-center shadow-lg">
                      <Users className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Complete Your Profile</h2>
                      <p className="text-gray-600 dark:text-gray-400 mt-1">Tell us about yourself for personalized content</p>
                    </div>
                  </div>
                  <UserProfile />
                </TabsContent>
              )}

              <TabsContent value="content" className="mt-0">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl flex items-center justify-center shadow-lg">
                    <FileText className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Create Content & Generate Ideas</h2>
                    <p className="text-gray-600 dark:text-gray-400 mt-1">AI-powered content creation and inspiration</p>
                  </div>
                </div>
                <ContentCreation />
              </TabsContent>

              <TabsContent value="schedule" className="mt-0">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center shadow-lg">
                    <Calendar className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Schedule Posts</h2>
                    <p className="text-gray-600 dark:text-gray-400 mt-1">Optimal timing for maximum reach</p>
                  </div>
                </div>
                <LinkedInScheduler />
              </TabsContent>
            </div>
          </div>
        </Tabs>

        <FloatingNav activeTab={activeTab} onTabChange={setActiveTab} />
      </main>

      <Footer />
    </div>
  );
};

export default Index;
