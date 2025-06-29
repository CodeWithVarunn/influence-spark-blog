
import { useState } from 'react';
import { Header } from '@/components/Header';
import { ResourceUpload } from '@/components/ResourceUpload';
import { IdeaGeneration } from '@/components/IdeaGeneration';
import { ContentCreation } from '@/components/ContentCreation';
import { LinkedInScheduler } from '@/components/LinkedInScheduler';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Upload, Lightbulb, FileText, Calendar, Sparkles, Zap, Users, TrendingUp } from 'lucide-react';

const Index = () => {
  const [activeTab, setActiveTab] = useState('upload');

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900 transition-all duration-300">
      <Header />
      
      <main className="container mx-auto px-6 py-8 max-w-7xl">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-2xl transform hover:scale-105 transition-all">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
            <div className="text-left">
              <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                LinkedUp Content
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 font-medium">
                Your all-in-one platform for brilliant LinkedIn posts
              </p>
            </div>
          </div>
          
          {/* Stats Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto mb-8">
            <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-xl p-4 border border-gray-200/50 dark:border-gray-700/50">
              <Zap className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-gray-900 dark:text-white">AI-Powered</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Content Generation</p>
            </div>
            <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-xl p-4 border border-gray-200/50 dark:border-gray-700/50">
              <Users className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-gray-900 dark:text-white">Easy</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">LinkedIn Integration</p>
            </div>
            <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-xl p-4 border border-gray-200/50 dark:border-gray-700/50">
              <TrendingUp className="w-8 h-8 text-purple-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-gray-900 dark:text-white">Boost</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Engagement Rates</p>
            </div>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8 bg-white/80 dark:bg-gray-800/80 shadow-xl rounded-2xl p-2 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50">
            <TabsTrigger 
              value="upload" 
              className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-indigo-500 data-[state=active]:text-white transition-all rounded-xl py-3"
            >
              <Upload className="w-4 h-4" />
              <span className="hidden sm:inline">Upload Resources</span>
              <span className="sm:hidden">Upload</span>
            </TabsTrigger>
            <TabsTrigger 
              value="ideas" 
              className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-pink-500 data-[state=active]:text-white transition-all rounded-xl py-3"
            >
              <Lightbulb className="w-4 h-4" />
              <span className="hidden sm:inline">Generate Ideas</span>
              <span className="sm:hidden">Ideas</span>
            </TabsTrigger>
            <TabsTrigger 
              value="content" 
              className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-500 data-[state=active]:to-red-500 data-[state=active]:text-white transition-all rounded-xl py-3"
            >
              <FileText className="w-4 h-4" />
              <span className="hidden sm:inline">Create Content</span>
              <span className="sm:hidden">Create</span>
            </TabsTrigger>
            <TabsTrigger 
              value="schedule" 
              className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-500 data-[state=active]:to-emerald-500 data-[state=active]:text-white transition-all rounded-xl py-3"
            >
              <Calendar className="w-4 h-4" />
              <span className="hidden sm:inline">Schedule Posts</span>
              <span className="sm:hidden">Schedule</span>
            </TabsTrigger>
          </TabsList>

          <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-gray-200/50 dark:border-gray-700/50">
            <TabsContent value="upload" className="mt-0">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center">
                  <Upload className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Upload Resources</h2>
                <Sparkles className="w-6 h-6 text-yellow-500 animate-pulse" />
              </div>
              <ResourceUpload />
            </TabsContent>

            <TabsContent value="ideas" className="mt-0">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                  <Lightbulb className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Generate Ideas</h2>
                <Sparkles className="w-6 h-6 text-yellow-500 animate-pulse" />
              </div>
              <IdeaGeneration />
            </TabsContent>

            <TabsContent value="content" className="mt-0">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl flex items-center justify-center">
                  <FileText className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Create Content</h2>
                <Sparkles className="w-6 h-6 text-yellow-500 animate-pulse" />
              </div>
              <ContentCreation />
            </TabsContent>

            <TabsContent value="schedule" className="mt-0">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Schedule Posts</h2>
                <Sparkles className="w-6 h-6 text-yellow-500 animate-pulse" />
              </div>
              <LinkedInScheduler />
            </TabsContent>
          </div>
        </Tabs>
      </main>
    </div>
  );
};

export default Index;
