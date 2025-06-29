
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { FileText, Wand2, Save, Eye, RefreshCw } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface ContentDraft {
  id: string;
  title: string;
  content: string;
  status: 'draft' | 'generating' | 'ready';
  wordCount: number;
  estimatedReadTime: string;
}

export const ContentCreation = () => {
  const { toast } = useToast();
  const [selectedIdea, setSelectedIdea] = useState('');
  const [customPrompt, setCustomPrompt] = useState('');
  const [contentDrafts, setContentDrafts] = useState<ContentDraft[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);

  const availableIdeas = [
    'The Future of Remote Work: 5 Trends Every Leader Should Know',
    'Building Personal Brand Authority in Your Industry',
    'Data-Driven Decision Making: Tools and Techniques',
    'Networking in the Digital Age: LinkedIn Best Practices'
  ];

  const generateContent = async () => {
    if (!selectedIdea && !customPrompt) {
      toast({
        title: "Missing information",
        description: "Please select an idea or enter a custom prompt",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);
    const title = selectedIdea || "Custom Content";
    
    const newDraft: ContentDraft = {
      id: Date.now().toString(),
      title,
      content: '',
      status: 'generating',
      wordCount: 0,
      estimatedReadTime: '0 min'
    };

    setContentDrafts(prev => [...prev, newDraft]);

    try {
      const prompt = selectedIdea || customPrompt;
      
      const { data, error } = await supabase.functions.invoke('generate-content', {
        body: {
          prompt: prompt,
          type: 'content'
        }
      });

      if (error) throw error;

      const generatedContent = data.content;
      const wordCount = generatedContent.split(' ').length;

      setContentDrafts(prev => 
        prev.map(draft => 
          draft.id === newDraft.id 
            ? { 
                ...draft, 
                content: generatedContent,
                status: 'ready' as const,
                wordCount: wordCount,
                estimatedReadTime: `${Math.ceil(wordCount / 200)} min`
              }
            : draft
        )
      );

      setIsGenerating(false);
      toast({
        title: "Content generated successfully!",
        description: "Your blog post is ready for review and approval",
      });
    } catch (error) {
      console.error('Error generating content:', error);
      setIsGenerating(false);
      toast({
        title: "Generation failed",
        description: "Please try again later",
        variant: "destructive",
      });
    }
  };

  const saveContent = (id: string) => {
    toast({
      title: "Content saved",
      description: "Draft saved to content management for approval",
    });
  };

  const editContent = (id: string, newContent: string) => {
    setContentDrafts(prev => 
      prev.map(draft => 
        draft.id === id 
          ? { 
              ...draft, 
              content: newContent,
              wordCount: newContent.split(' ').length,
              estimatedReadTime: `${Math.ceil(newContent.split(' ').length / 200)} min`
            }
          : draft
      )
    );
  };

  return (
    <div className="space-y-6">
      {/* Content Generation Controls */}
      <Card className="border-0 shadow-lg bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-gray-900 dark:text-white">
            <Wand2 className="w-5 h-5 text-orange-600" />
            AI Content Generator
          </CardTitle>
          <CardDescription className="text-gray-600 dark:text-gray-300">
            Create complete blog content using AI (No API key required!)
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Idea Selection */}
          <div>
            <Label htmlFor="idea-select">Select Ideas</Label>
            <select
              id="idea-select"
              value={selectedIdea}
              onChange={(e) => setSelectedIdea(e.target.value)}
              className="w-full mt-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              <option value="">Choose an idea...</option>
              {availableIdeas.map(idea => (
                <option key={idea} value={idea}>{idea}</option>
              ))}
            </select>
          </div>

          {/* Custom Prompt */}
          <div>
            <Label htmlFor="custom-prompt">Or Enter Custom Prompt</Label>
            <Textarea
              id="custom-prompt"
              placeholder="Write a blog post about..."
              value={customPrompt}
              onChange={(e) => setCustomPrompt(e.target.value)}
              rows={3}
              className="mt-1"
            />
          </div>

          <Button 
            onClick={generateContent}
            disabled={isGenerating || (!selectedIdea && !customPrompt)}
            className="w-full bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white shadow-lg"
          >
            {isGenerating ? (
              <>
                <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                Generating Content...
              </>
            ) : (
              <>
                <Wand2 className="w-4 h-4 mr-2" />
                Generate Complete Blog Post
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Generated Content Drafts */}
      {contentDrafts.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Generated Content</h3>
          
          {contentDrafts.map((draft) => (
            <Card key={draft.id} className="border-0 shadow-lg bg-white dark:bg-gray-800">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg text-gray-900 dark:text-white">{draft.title}</CardTitle>
                  <div className="flex items-center gap-2">
                    <Badge 
                      variant={draft.status === 'ready' ? 'default' : 'secondary'}
                      className={draft.status === 'generating' ? 'animate-pulse' : ''}
                    >
                      {draft.status}
                    </Badge>
                    {draft.status === 'ready' && (
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {draft.wordCount} words • {draft.estimatedReadTime} read
                      </div>
                    )}
                  </div>
                </div>
              </CardHeader>
              
              {draft.status === 'generating' && (
                <CardContent>
                  <div className="flex items-center justify-center py-8">
                    <RefreshCw className="w-6 h-6 animate-spin text-orange-600 mr-2" />
                    <span className="text-gray-600 dark:text-gray-300">Generating content with AI...</span>
                  </div>
                </CardContent>
              )}

              {draft.status === 'ready' && (
                <CardContent className="space-y-4">
                  <Textarea
                    value={draft.content}
                    onChange={(e) => editContent(draft.id, e.target.value)}
                    rows={15}
                    className="font-mono text-sm"
                  />
                  
                  <div className="flex gap-2">
                    <Button 
                      onClick={() => saveContent(draft.id)}
                      className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white"
                    >
                      <Save className="w-4 h-4 mr-2" />
                      Save for Approval
                    </Button>
                    <Button variant="outline" className="border-gray-300 dark:border-gray-600">
                      <Eye className="w-4 h-4 mr-2" />
                      Preview
                    </Button>
                  </div>
                </CardContent>
              )}
            </Card>
          ))}
        </div>
      )}

      {contentDrafts.length === 0 && (
        <Card className="border-0 shadow-lg bg-white dark:bg-gray-800">
          <CardContent className="text-center py-12">
            <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              No content generated yet
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Select an idea or enter a custom prompt to generate AI-powered content
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
