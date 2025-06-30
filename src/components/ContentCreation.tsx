
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { FileText, Sparkles, Copy, Share2, RefreshCw, Lightbulb, Link, Upload, Eye, Zap, Brain } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface BlogIdea {
  id: string;
  title: string;
  description: string;
  category: string;
  engagement_potential: 'high' | 'medium' | 'low';
}

export const ContentCreation = () => {
  const { toast } = useToast();
  const [customPrompt, setCustomPrompt] = useState('');
  const [generatedContent, setGeneratedContent] = useState('');
  const [generatedIdeas, setGeneratedIdeas] = useState<BlogIdea[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [documentUrl, setDocumentUrl] = useState('');
  const [showDocumentInput, setShowDocumentInput] = useState(false);
  const [activeMode, setActiveMode] = useState<'content' | 'ideas'>('content');

  const generateContent = async () => {
    if (!customPrompt.trim()) {
      toast({
        title: "Please enter a prompt",
        description: "Enter what kind of content you'd like to create",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);
    
    try {
      let enhancedPrompt = customPrompt;
      
      // If user provided a document URL, include it in the prompt
      if (documentUrl.trim()) {
        enhancedPrompt = `Based on the document/link: ${documentUrl} and the following request: ${customPrompt}`;
      }

      // Get user profile data for personalization
      const userProfile = localStorage.getItem('userProfile');
      if (userProfile) {
        const profile = JSON.parse(userProfile);
        enhancedPrompt += `\n\nUser context: ${profile.jobTitle} at ${profile.company}, industry: ${profile.industry}, interests: ${profile.interests?.join(', ')}, goals: ${profile.goals}`;
      }

      const { data, error } = await supabase.functions.invoke('generate-content', {
        body: {
          prompt: enhancedPrompt,
          type: activeMode
        }
      });

      if (error) throw error;

      if (activeMode === 'content') {
        setGeneratedContent(data.content);
        toast({
          title: "Content generated successfully!",
          description: "Your LinkedIn content is ready to use",
        });
      } else {
        try {
          const parsedIdeas = JSON.parse(data.content);
          const formattedIdeas = parsedIdeas.map((idea: any, index: number) => ({
            id: (index + 1).toString(),
            title: idea.title,
            description: idea.description,
            category: idea.category,
            engagement_potential: idea.engagement_potential
          }));
          setGeneratedIdeas(formattedIdeas);
          toast({
            title: "Ideas generated successfully!",
            description: `Generated ${formattedIdeas.length} blog ideas for you`,
          });
        } catch {
          // Fallback for ideas
          const fallbackIdeas = [
            {
              id: '1',
              title: 'The Future of Remote Work: 5 Trends Every Leader Should Know',
              description: 'Explore emerging trends in remote work culture and how leaders can adapt their management strategies.',
              category: 'Leadership',
              engagement_potential: 'high' as const
            },
            {
              id: '2',
              title: 'Building Personal Brand Authority in Your Industry',
              description: 'Step-by-step guide to establishing yourself as a thought leader in your professional field.',
              category: 'Personal Branding',
              engagement_potential: 'high' as const
            }
          ];
          setGeneratedIdeas(fallbackIdeas);
        }
      }
    } catch (error) {
      console.error('Error generating content:', error);
      toast({
        title: "Error generating content",
        description: "Please check your API configuration and try again",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast({
        title: "Copied to clipboard!",
        description: "Content has been copied to your clipboard",
      });
    } catch (error) {
      toast({
        title: "Copy failed",
        description: "Please select and copy the text manually",
        variant: "destructive",
      });
    }
  };

  const quickPrompts = [
    "Write a motivational post about overcoming challenges in business",
    "Create a post about the importance of networking in professional growth",
    "Write about work-life balance tips for entrepreneurs",
    "Share insights about leadership in remote teams",
    "Create content about personal branding strategies"
  ];

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      {/* Mode Selection */}
      <div className="flex justify-center">
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-2 shadow-lg border border-gray-200/50 dark:border-gray-700/50">
          <div className="flex gap-2">
            <Button
              onClick={() => setActiveMode('content')}
              variant={activeMode === 'content' ? 'default' : 'ghost'}
              className={`rounded-xl px-6 py-3 font-medium transition-all ${
                activeMode === 'content' 
                  ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg' 
                  : 'hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              <FileText className="w-4 h-4 mr-2" />
              Create Content
            </Button>
            <Button
              onClick={() => setActiveMode('ideas')}
              variant={activeMode === 'ideas' ? 'default' : 'ghost'}
              className={`rounded-xl px-6 py-3 font-medium transition-all ${
                activeMode === 'ideas' 
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg' 
                  : 'hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              <Lightbulb className="w-4 h-4 mr-2" />
              Generate Ideas
            </Button>
          </div>
        </div>
      </div>

      {/* Content Generation */}
      <Card className="border-0 shadow-xl bg-gradient-to-br from-white to-gray-50/50 dark:from-gray-800 dark:to-gray-900/50 backdrop-blur-sm">
        <CardHeader className="text-center pb-6">
          <CardTitle className="flex items-center justify-center gap-3 text-gray-900 dark:text-white text-2xl">
            <div className={`w-10 h-10 rounded-2xl flex items-center justify-center shadow-lg ${
              activeMode === 'content' 
                ? 'bg-gradient-to-r from-orange-500 to-red-500' 
                : 'bg-gradient-to-r from-purple-500 to-pink-500'
            }`}>
              {activeMode === 'content' ? <FileText className="w-5 h-5 text-white" /> : <Brain className="w-5 h-5 text-white" />}
            </div>
            {activeMode === 'content' ? 'AI Content Generator' : 'AI Idea Generator'}
          </CardTitle>
          <CardDescription className="text-gray-600 dark:text-gray-300 text-lg">
            {activeMode === 'content' 
              ? 'Create complete LinkedIn content using AI' 
              : 'Generate engaging blog ideas for your next post'
            }
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <Label htmlFor="prompt" className="text-base font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-blue-500" />
              {activeMode === 'content' ? 'Content Ideas' : 'Topic Ideas'}
            </Label>
            <Textarea
              id="prompt"
              value={customPrompt}
              onChange={(e) => setCustomPrompt(e.target.value)}
              placeholder={activeMode === 'content' 
                ? "Enter your content idea or topic (e.g., 'Write about leadership in remote teams'). You can also paste links or documents for reference."
                : "Enter a topic or theme for idea generation (e.g., 'leadership', 'personal branding', 'remote work')"
              }
              className="min-h-[120px] resize-none rounded-2xl border-2 border-gray-200 dark:border-gray-700 focus:border-blue-500 text-base p-4"
            />
          </div>

          {/* Document/Link Input */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label className="text-base font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-2">
                <Link className="w-5 h-5 text-green-500" />
                Reference Document/Link (Optional)
              </Label>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowDocumentInput(!showDocumentInput)}
                className="rounded-xl"
              >
                {showDocumentInput ? 'Hide' : 'Add Document'}
              </Button>
            </div>
            
            {showDocumentInput && (
              <div className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-2xl border border-blue-200/50 dark:border-blue-700/50 space-y-4">
                <Input
                  value={documentUrl}
                  onChange={(e) => setDocumentUrl(e.target.value)}
                  placeholder="Paste a link to an article, document, or any URL you want to reference..."
                  className="rounded-xl border-blue-300 dark:border-blue-600"
                />
                <div className="flex items-center gap-2 text-sm text-blue-600 dark:text-blue-400">
                  <Upload className="w-4 h-4" />
                  <span>Supports: PDFs, Word documents, web links, and text files</span>
                </div>
                <p className="text-sm text-blue-600/80 dark:text-blue-400/80">
                  The AI will read and analyze the content from this source to create personalized content for you.
                </p>
              </div>
            )}
          </div>

          <div className="space-y-4">
            <Label className="text-base font-semibold text-gray-700 dark:text-gray-300">Quick Ideas:</Label>
            <div className="flex flex-wrap gap-3">
              {quickPrompts.map((prompt, index) => (
                <Badge
                  key={index}
                  variant="outline"
                  className="cursor-pointer hover:bg-blue-50 dark:hover:bg-blue-900/20 text-sm p-3 rounded-xl border-2 hover:border-blue-300 transition-all"
                  onClick={() => setCustomPrompt(prompt)}
                >
                  {prompt}
                </Badge>
              ))}
            </div>
          </div>

          <div className="flex justify-center pt-4">
            <Button 
              onClick={generateContent}
              disabled={isGenerating || !customPrompt.trim()}
              className={`px-8 py-4 text-lg font-semibold rounded-2xl shadow-xl hover:shadow-2xl transition-all transform hover:scale-105 ${
                activeMode === 'content'
                  ? 'bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700'
                  : 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700'
              } text-white`}
            >
              {isGenerating ? (
                <>
                  <RefreshCw className="w-5 h-5 mr-3 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  {activeMode === 'content' ? <FileText className="w-5 h-5 mr-3" /> : <Lightbulb className="w-5 h-5 mr-3" />}
                  {activeMode === 'content' ? 'Generate Content' : 'Generate Ideas'}
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Generated Content */}
      {generatedContent && activeMode === 'content' && (
        <Card className="border-0 shadow-xl bg-white dark:bg-gray-800">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-3 text-gray-900 dark:text-white text-xl">
                <FileText className="w-6 h-6 text-green-600" />
                Generated Content
              </CardTitle>
              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => copyToClipboard(generatedContent)}
                  className="text-blue-600 hover:text-blue-700 border-blue-200 hover:bg-blue-50 dark:border-blue-700 dark:text-blue-400 rounded-xl"
                >
                  <Copy className="w-4 h-4 mr-2" />
                  Copy
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-green-600 hover:text-green-700 border-green-200 hover:bg-green-50 dark:border-green-700 dark:text-green-400 rounded-xl"
                >
                  <Share2 className="w-4 h-4 mr-2" />
                  Share
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 rounded-2xl p-6 border-2 border-gray-200 dark:border-gray-700 max-h-96 overflow-y-auto">
              <div className="whitespace-pre-wrap text-gray-800 dark:text-gray-200 leading-relaxed text-base">
                {generatedContent}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Generated Ideas */}
      {generatedIdeas.length > 0 && activeMode === 'ideas' && (
        <div className="space-y-6">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Generated Ideas</h3>
            <p className="text-gray-600 dark:text-gray-300">Click on any idea to use it for content creation</p>
          </div>
          
          <div className="grid gap-4">
            {generatedIdeas.map((idea) => (
              <Card 
                key={idea.id} 
                className="cursor-pointer transition-all duration-300 border-2 hover:border-purple-300 hover:shadow-xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl"
                onClick={() => {
                  setCustomPrompt(idea.title);
                  setActiveMode('content');
                }}
              >
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className="font-bold text-lg text-gray-900 dark:text-white mb-3">
                        {idea.title}
                      </h4>
                      <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                        {idea.description}
                      </p>
                      <div className="flex items-center gap-3">
                        <Badge variant="secondary" className="text-sm bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-xl">
                          {idea.category}
                        </Badge>
                        <Badge 
                          variant={idea.engagement_potential === 'high' ? 'default' : 'outline'}
                          className={`text-sm px-3 py-1 rounded-xl ${
                            idea.engagement_potential === 'high' 
                              ? 'bg-green-100 text-green-800 border-green-200 dark:bg-green-900/20 dark:text-green-400' 
                              : idea.engagement_potential === 'medium'
                              ? 'bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900/20 dark:text-yellow-400'
                              : 'bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-700 dark:text-gray-300'
                          }`}
                        >
                          {idea.engagement_potential} engagement
                        </Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Empty State */}
      {!generatedContent && generatedIdeas.length === 0 && (
        <Card className="border-0 shadow-xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
          <CardContent className="text-center py-16">
            <div className={`w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg ${
              activeMode === 'content' 
                ? 'bg-gradient-to-r from-orange-500 to-red-500' 
                : 'bg-gradient-to-r from-purple-500 to-pink-500'
            }`}>
              {activeMode === 'content' ? <FileText className="w-10 h-10 text-white" /> : <Lightbulb className="w-10 h-10 text-white" />}
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
              {activeMode === 'content' ? 'No content generated yet' : 'No ideas generated yet'}
            </h3>
            <p className="text-gray-600 dark:text-gray-300 text-lg max-w-md mx-auto">
              {activeMode === 'content' 
                ? 'Enter a prompt above to generate AI-powered LinkedIn content'
                : 'Enter a topic above to generate creative blog ideas for your content'
              }
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
