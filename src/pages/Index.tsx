
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ResourceUpload } from "@/components/ResourceUpload";
import { IdeaGeneration } from "@/components/IdeaGeneration";
import { ContentCreation } from "@/components/ContentCreation";
import { ContentManagement } from "@/components/ContentManagement";
import { LinkedInScheduler } from "@/components/LinkedInScheduler";
import { Lightbulb, FileText, CheckCircle, Calendar, Upload } from "lucide-react";

const Index = () => {
  const [activeTab, setActiveTab] = useState("upload");

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            LinkedIn Content Studio
          </h1>
          <p className="text-xl text-gray-600">
            Transform your resources into engaging LinkedIn content
          </p>
        </div>

        {/* Main Navigation */}
        <Card className="mb-8 shadow-lg border-0 bg-white/80 backdrop-blur-sm">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-5 h-14 bg-gray-100/50">
              <TabsTrigger 
                value="upload" 
                className="flex items-center gap-2 data-[state=active]:bg-blue-600 data-[state=active]:text-white"
              >
                <Upload className="w-4 h-4" />
                Upload Resources
              </TabsTrigger>
              <TabsTrigger 
                value="ideas" 
                className="flex items-center gap-2 data-[state=active]:bg-blue-600 data-[state=active]:text-white"
              >
                <Lightbulb className="w-4 h-4" />
                Generate Ideas
              </TabsTrigger>
              <TabsTrigger 
                value="create" 
                className="flex items-center gap-2 data-[state=active]:bg-blue-600 data-[state=active]:text-white"
              >
                <FileText className="w-4 h-4" />
                Create Content
              </TabsTrigger>
              <TabsTrigger 
                value="manage" 
                className="flex items-center gap-2 data-[state=active]:bg-blue-600 data-[state=active]:text-white"
              >
                <CheckCircle className="w-4 h-4" />
                Manage Content
              </TabsTrigger>
              <TabsTrigger 
                value="schedule" 
                className="flex items-center gap-2 data-[state=active]:bg-blue-600 data-[state=active]:text-white"
              >
                <Calendar className="w-4 h-4" />
                Schedule Posts
              </TabsTrigger>
            </TabsList>

            <div className="p-6">
              <TabsContent value="upload" className="mt-0">
                <ResourceUpload />
              </TabsContent>
              
              <TabsContent value="ideas" className="mt-0">
                <IdeaGeneration />
              </TabsContent>
              
              <TabsContent value="create" className="mt-0">
                <ContentCreation />
              </TabsContent>
              
              <TabsContent value="manage" className="mt-0">
                <ContentManagement />
              </TabsContent>
              
              <TabsContent value="schedule" className="mt-0">
                <LinkedInScheduler />
              </TabsContent>
            </div>
          </Tabs>
        </Card>
      </div>
    </div>
  );
};

export default Index;
