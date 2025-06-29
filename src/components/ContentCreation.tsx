
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { FileText, Sparkles, Copy, Download, Share2, RefreshCw, Lightbulb } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

export const ContentCreation = () => {
  const { toast } = useToast();
  const [customPrompt, setCustomPrompt] = useState('');
  const [generatedContent, setGeneratedContent] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

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
      const { data, error } = await supabase.functions.invoke('generate-content', {
        body: {
          prompt: customPrompt,
          type: 'content'
        }
      });

      if (error) throw error;

      setGeneratedContent(data.content);
      toast({
        title: "Content generated successfully!",
        description: "Your LinkedIn content is ready to use",
      });
    } catch (error) {
      console.error('Error generating content:', error);
      toast({
        title: "Error generating content",
        description: "Please try again later",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(generatedContent);
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
    <div className="space-y-6">
      {/* Content Generation */}
      <Card className="border-0 shadow-lg bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-gray-900 dark:text-white">
            <Sparkles className="w-5 h-5 text-orange-600" />
            AI Content Generator
          </CardTitle>
          <CardDescription className="text-gray-600 dark:text-gray-300">
            Create complete blog content using AI
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <label htmlFor="prompt" className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
              <Lightbulb className="w-4 h-4" />
              Get Content Ideas
            </label>
            <Textarea
              id="prompt"
              value={customPrompt}
              onChange={(e) => setCustomPrompt(e.target.value)}
              placeholder="Enter your content idea or topic (e.g., 'Write about leadership in remote teams')"
              className="min-h-[100px] resize-none"
            />
          </div>

          <div className="space-y-3">
            <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Quick Ideas:</p>
            <div className="flex flex-wrap gap-2">
              {quickPrompts.map((prompt, index) => (
                <Badge
                  key={index}
                  variant="outline"
                  className="cursor-pointer hover:bg-orange-50 dark:hover:bg-orange-900/20 text-xs p-2"
                  onClick={() => setCustomPrompt(prompt)}
                >
                  {prompt}
                </Badge>
              ))}
            </div>
          </div>

          <Button 
            onClick={generateContent}
            disabled={isGenerating || !customPrompt.trim()}
            className="w-full bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white shadow-lg"
          >
            {isGenerating ? (
              <>
                <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                Generating Content...
              </>
            ) : (
              <>
                <FileText className="w-4 h-4 mr-2" />
                Generate Content
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Generated Content */}
      {generatedContent && (
        <Card className="border-0 shadow-lg bg-white dark:bg-gray-800">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2 text-gray-900 dark:text-white">
                <FileText className="w-5 h-5 text-green-600" />
                Generated Content
              </CardTitle>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={copyToClipboard}
                  className="text-blue-600 hover:text-blue-700 border-blue-200 hover:bg-blue-50 dark:border-blue-700 dark:text-blue-400"
                >
                  <Copy className="w-4 h-4 mr-1" />
                  Copy
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-green-600 hover:text-green-700 border-green-200 hover:bg-green-50 dark:border-green-700 dark:text-green-400"
                >
                  <Share2 className="w-4 h-4 mr-1" />
                  Share
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
              <div className="whitespace-pre-wrap text-gray-800 dark:text-gray-200 leading-relaxed">
                {generatedContent}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {!generatedContent && (
        <Card className="border-0 shadow-lg bg-white dark:bg-gray-800">
          <CardContent className="text-center py-12">
            <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              No content generated yet
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Enter a prompt above to generate AI-powered LinkedIn content
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
