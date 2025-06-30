
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { 
  Sparkles, 
  FileText, 
  Copy, 
  Calendar, 
  Lightbulb,
  Upload,
  Link as LinkIcon,
  User,
  Briefcase,
  Target
} from 'lucide-react';

interface ContentIdea {
  title: string;
  description: string;
  contentType: string;
  engagement: string;
}

export const ContentCreation = () => {
  const { toast } = useToast();
  const { user } = useAuth();
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedContent, setGeneratedContent] = useState('');
  const [contentIdeas, setContentIdeas] = useState<ContentIdea[]>([]);
  const [activeTab, setActiveTab] = useState<'content' | 'ideas'>('content');
  const [userProfile, setUserProfile] = useState<any>(null);
  const [file, setFile] = useState<File | null>(null);

  useEffect(() => {
    loadUserProfile();
  }, [user]);

  const loadUserProfile = async () => {
    if (!user) return;
    
    try {
      const { data, error } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('user_id', user.id)
        .single();
      
      if (error && error.code !== 'PGRST116') {
        console.error('Error loading profile:', error);
      } else if (data) {
        setUserProfile(data);
      }
    } catch (error) {
      console.error('Error loading profile:', error);
    }
  };

  const generateContent = async (type: 'content' | 'ideas' = 'content') => {
    if (!prompt.trim() && !file) {
      toast({
        title: "Input required",
        description: "Please enter a prompt or upload a document",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);
    
    try {
      let finalPrompt = prompt;
      
      // If file is uploaded, read its content
      if (file) {
        const fileContent = await readFileContent(file);
        finalPrompt = `Based on this document/content: ${fileContent}\n\nUser request: ${prompt || 'Generate relevant content'}`;
      }

      const response = await fetch('/functions/v1/generate-content', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: finalPrompt,
          type,
          industry: userProfile?.industry,
          jobTitle: userProfile?.job_title,
          experience: userProfile?.experience_level,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to generate content');
      }

      const data = await response.json();
      
      if (type === 'ideas') {
        setContentIdeas(data.ideas || []);
        setActiveTab('ideas');
      } else {
        setGeneratedContent(data.content || '');
        setActiveTab('content');
      }

      toast({
        title: "Success!",
        description: `${type === 'ideas' ? 'Ideas' : 'Content'} generated successfully`,
      });
    } catch (error) {
      console.error('Error generating content:', error);
      toast({
        title: "Error",
        description: error.message || 'Failed to generate content. Please try again.',
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const readFileContent = async (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        resolve(content);
      };
      reader.onerror = reject;
      
      if (file.type.includes('text') || file.name.endsWith('.md')) {
        reader.readAsText(file);
      } else {
        // For other file types, just use the file name and type info
        resolve(`File: ${file.name} (${file.type})`);
      }
    });
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied!",
      description: "Content copied to clipboard",
    });
  };

  const schedulePost = (content: string) => {
    localStorage.setItem('pendingSchedule', content);
    window.location.href = '/schedule-posts';
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Profile Status Card */}
      {userProfile && (
        <Card className="border-0 shadow-lg bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full flex items-center justify-center">
                <User className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 dark:text-white">
                  {userProfile.full_name || 'User'}
                </h3>
                <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-300">
                  {userProfile.job_title && (
                    <div className="flex items-center gap-1">
                      <Briefcase className="w-4 h-4" />
                      {userProfile.job_title}
                    </div>
                  )}
                  {userProfile.industry && (
                    <div className="flex items-center gap-1">
                      <Target className="w-4 h-4" />
                      {userProfile.industry}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Main Content Creation Card */}
      <Card className="border-0 shadow-2xl bg-white dark:bg-gray-800 backdrop-blur-sm">
        <CardHeader className="text-center pb-6">
          <CardTitle className="text-3xl font-bold bg-gradient-to-r from-gray-900 via-blue-600 to-indigo-600 dark:from-white dark:via-blue-400 dark:to-indigo-400 bg-clip-text text-transparent">
            Create Content & Generate Ideas
          </CardTitle>
          <p className="text-gray-600 dark:text-gray-300 text-lg">
            Generate professional LinkedIn content and creative ideas with AI
          </p>
        </CardHeader>
        
        <CardContent className="space-y-8">
          {/* Input Section */}
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                What would you like to create?
              </label>
              <Textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Describe what you want to create... (e.g., 'Write about leadership challenges in remote work' or 'Generate ideas about digital marketing trends')"
                rows={4}
                className="w-full resize-none border-2 focus:border-blue-500 rounded-xl text-base"
              />
            </div>

            {/* File Upload Section */}
            <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl p-6 text-center">
              <input
                type="file"
                id="document-upload"
                className="hidden"
                accept=".txt,.md,.pdf,.doc,.docx"
                onChange={(e) => setFile(e.target.files?.[0] || null)}
              />
              <label htmlFor="document-upload" className="cursor-pointer">
                <div className="flex flex-col items-center gap-3">
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                    <Upload className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      Upload Reference Document
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      PDF, DOC, TXT, MD files or paste links in the text box above
                    </p>
                  </div>
                  {file && (
                    <Badge variant="secondary" className="mt-2">
                      <LinkIcon className="w-3 h-3 mr-1" />
                      {file.name}
                    </Badge>
                  )}
                </div>
              </label>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 justify-center">
              <Button
                onClick={() => generateContent('content')}
                disabled={isGenerating}
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-3 rounded-xl shadow-lg"
              >
                <FileText className="w-5 h-5 mr-2" />
                {isGenerating && activeTab === 'content' ? 'Creating...' : 'Create Content'}
              </Button>
              
              <Button
                onClick={() => generateContent('ideas')}
                disabled={isGenerating}
                size="lg"
                variant="outline"
                className="border-2 border-purple-200 hover:bg-purple-50 dark:border-purple-600 dark:hover:bg-purple-900/20 px-8 py-3 rounded-xl"
              >
                <Lightbulb className="w-5 h-5 mr-2" />
                {isGenerating && activeTab === 'ideas' ? 'Generating...' : 'Generate Ideas'}
              </Button>
            </div>
          </div>

          {/* Results Section */}
          {(generatedContent || contentIdeas.length > 0) && (
            <div className="space-y-6">
              {/* Tab Navigation */}
              <div className="flex justify-center">
                <div className="bg-gray-100 dark:bg-gray-700 p-1 rounded-xl">
                  <Button
                    variant={activeTab === 'content' ? 'default' : 'ghost'}
                    onClick={() => setActiveTab('content')}
                    className="rounded-lg px-6"
                  >
                    <FileText className="w-4 h-4 mr-2" />
                    Generated Content
                  </Button>
                  <Button
                    variant={activeTab === 'ideas' ? 'default' : 'ghost'}
                    onClick={() => setActiveTab('ideas')}
                    className="rounded-lg px-6"
                  >
                    <Lightbulb className="w-4 h-4 mr-2" />
                    Content Ideas
                  </Button>
                </div>
              </div>

              {/* Content Display */}
              {activeTab === 'content' && generatedContent && (
                <Card className="bg-gray-50 dark:bg-gray-900 border-2">
                  <CardHeader className="flex flex-row items-center justify-between">
                    <h3 className="text-lg font-semibold">Generated Content</h3>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => copyToClipboard(generatedContent)}
                      >
                        <Copy className="w-4 h-4 mr-2" />
                        Copy
                      </Button>
                      <Button
                        size="sm"
                        onClick={() => schedulePost(generatedContent)}
                        className="bg-green-600 hover:bg-green-700"
                      >
                        <Calendar className="w-4 h-4 mr-2" />
                        Schedule
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="whitespace-pre-wrap text-gray-800 dark:text-gray-200 leading-relaxed">
                      {generatedContent}
                    </div>
                  </CardContent>
                </Card>
              )}

              {activeTab === 'ideas' && contentIdeas.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {contentIdeas.map((idea, index) => (
                    <Card key={index} className="bg-gray-50 dark:bg-gray-900 border-2 hover:shadow-lg transition-shadow">
                      <CardContent className="p-6">
                        <div className="flex justify-between items-start mb-3">
                          <h4 className="font-semibold text-gray-900 dark:text-white">
                            {idea.title}
                          </h4>
                          <Badge variant={idea.engagement === 'High' ? 'default' : 'secondary'}>
                            {idea.engagement}
                          </Badge>
                        </div>
                        <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">
                          {idea.description}
                        </p>
                        <div className="flex justify-between items-center">
                          <Badge variant="outline">{idea.contentType}</Badge>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => {
                              setPrompt(`Create a LinkedIn post about: ${idea.title}. ${idea.description}`);
                              generateContent('content');
                            }}
                          >
                            <Sparkles className="w-4 h-4 mr-1" />
                            Create
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
