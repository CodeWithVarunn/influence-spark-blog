
import { useState } from 'react';
import { Header } from '@/components/Header';
import { ResourceUpload } from '@/components/ResourceUpload';
import { IdeaGeneration } from '@/components/IdeaGeneration';
import { ContentCreation } from '@/components/ContentCreation';
import { LinkedInScheduler } from '@/components/LinkedInScheduler';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Upload, Lightbulb, FileText, Calendar, Sparkles } from 'lucide-react';

const Index = () => {
  const [activeTab, setActiveTab] = useState('upload');

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900 transition-colors">
      <Header />
      
      <main className="container mx-auto px-6 py-8 max-w-7xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            LinkedIn Content Studio
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Transform your resources into engaging LinkedIn content with AI-powered tools
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8 bg-white dark:bg-gray-800 shadow-lg rounded-xl p-1">
            <TabsTrigger 
              value="upload" 
              className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-indigo-500 data-[state=active]:text-white transition-all"
            >
              <Upload className="w-4 h-4" />
              Upload Resources
            </TabsTrigger>
            <TabsTrigger 
              value="ideas" 
              className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-pink-500 data-[state=active]:text-white transition-all"
            >
              <Lightbulb className="w-4 h-4" />
              Generate Ideas
            </TabsTrigger>
            <TabsTrigger 
              value="content" 
              className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-500 data-[state=active]:to-red-500 data-[state=active]:text-white transition-all"
            >
              <FileText className="w-4 h-4" />
              Create Content
            </TabsTrigger>
            <TabsTrigger 
              value="schedule" 
              className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-500 data-[state=active]:to-emerald-500 data-[state=active]:text-white transition-all"
            >
              <Calendar className="w-4 h-4" />
              Schedule Posts
            </TabsTrigger>
          </TabsList>

          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-gray-200/50 dark:border-gray-700/50">
            <TabsContent value="upload" className="mt-0">
              <div className="flex items-center gap-2 mb-6">
                <Upload className="w-6 h-6 text-blue-600" />
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Upload Resources</h2>
                <Sparkles className="w-5 h-5 text-yellow-500" />
              </div>
              <ResourceUpload />
            </TabsContent>

            <TabsContent value="ideas" className="mt-0">
              <div className="flex items-center gap-2 mb-6">
                <Lightbulb className="w-6 h-6 text-purple-600" />
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Generate Ideas</h2>
                <Sparkles className="w-5 h-5 text-yellow-500" />
              </div>
              <IdeaGeneration />
            </TabsContent>

            <TabsContent value="content" className="mt-0">
              <div className="flex items-center gap-2 mb-6">
                <FileText className="w-6 h-6 text-orange-600" />
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Create Content</h2>
                <Sparkles className="w-5 h-5 text-yellow-500" />
              </div>
              <ContentCreation />
            </TabsContent>

            <TabsContent value="schedule" className="mt-0">
              <div className="flex items-center gap-2 mb-6">
                <Calendar className="w-6 h-6 text-green-600" />
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Schedule Posts</h2>
                <Sparkles className="w-5 h-5 text-yellow-500" />
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
