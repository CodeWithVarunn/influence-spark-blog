
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { FileText, Wand2, Save, Eye, RefreshCw } from 'lucide-react';

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
  const [apiKey, setApiKey] = useState('');

  // Sample ideas that would come from the previous step
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

    if (!apiKey) {
      toast({
        title: "API Key Required",
        description: "Please enter your ChatGPT API key to generate content",
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
      // Simulate ChatGPT API call
      setTimeout(() => {
        const sampleContent = `# ${title}

In today's rapidly evolving business landscape, professionals are constantly seeking ways to stay ahead of the curve and drive meaningful impact in their organizations.

## Key Insights

The modern workplace has undergone significant transformation, particularly in how we approach collaboration, innovation, and leadership. Here are the most important considerations:

### 1. Embracing Change as a Constant
Change is no longer an exception—it's the rule. Successful professionals understand that adaptability isn't just a skill; it's a survival mechanism in today's dynamic environment.

### 2. The Power of Continuous Learning
The half-life of skills is rapidly decreasing. What you learned five years ago might be obsolete today. Investing in continuous learning and upskilling is crucial for career longevity.

### 3. Building Authentic Relationships
In an increasingly digital world, authentic human connections become more valuable than ever. Building genuine relationships with colleagues, clients, and industry peers creates lasting professional value.

## Practical Applications

Here's how you can implement these insights in your daily work:

- **Set aside dedicated time for learning**: Block 30 minutes daily for skill development
- **Seek feedback regularly**: Don't wait for annual reviews to understand your performance
- **Network with purpose**: Focus on building meaningful connections rather than collecting contacts
- **Document your wins**: Keep track of your achievements and learnings for future reference

## Looking Forward

The future belongs to those who can adapt quickly, learn continuously, and build meaningful relationships. By focusing on these fundamental areas, professionals can position themselves for long-term success regardless of industry changes.

What strategies have you found most effective in your professional journey? Share your thoughts in the comments below.

#ProfessionalDevelopment #Leadership #CareerGrowth #BusinessStrategy`;

        setContentDrafts(prev => 
          prev.map(draft => 
            draft.id === newDraft.id 
              ? { 
                  ...draft, 
                  content: sampleContent,
                  status: 'ready' as const,
                  wordCount: sampleContent.split(' ').length,
                  estimatedReadTime: `${Math.ceil(sampleContent.split(' ').length / 200)} min`
                }
              : draft
          )
        );

        setIsGenerating(false);
        toast({
          title: "Content generated successfully!",
          description: "Your blog post is ready for review and approval",
        });
      }, 4000);

    } catch (error) {
      setIsGenerating(false);
      toast({
        title: "Generation failed",
        description: "Please check your API key and try again",
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
      <Card className="border-0 shadow-md bg-gradient-to-r from-orange-50 to-red-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Wand2 className="w-5 h-5 text-orange-600" />
            AI Content Generator
          </CardTitle>
          <CardDescription>
            Create complete blog content using ChatGPT
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* API Key Input */}
          <div>
            <Label htmlFor="api-key">ChatGPT API Key</Label>
            <Input
              id="api-key"
              type="password"
              placeholder="sk-..."
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              className="mt-1"
            />
            <p className="text-xs text-gray-500 mt-1">
              Your API key is stored locally and never shared
            </p>
          </div>

          {/* Idea Selection */}
          <div>
            <Label htmlFor="idea-select">Select Generated Idea</Label>
            <select
              id="idea-select"
              value={selectedIdea}
              onChange={(e) => setSelectedIdea(e.target.value)}
              className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
            disabled={isGenerating || (!selectedIdea && !customPrompt) || !apiKey}
            className="w-full bg-orange-600 hover:bg-orange-700"
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
          <h3 className="text-lg font-semibold">Generated Content</h3>
          
          {contentDrafts.map((draft) => (
            <Card key={draft.id} className="border-0 shadow-md">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">{draft.title}</CardTitle>
                  <div className="flex items-center gap-2">
                    <Badge 
                      variant={draft.status === 'ready' ? 'default' : 'secondary'}
                      className={draft.status === 'generating' ? 'animate-pulse' : ''}
                    >
                      {draft.status}
                    </Badge>
                    {draft.status === 'ready' && (
                      <div className="text-sm text-gray-500">
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
                    <span className="text-gray-600">Generating content with ChatGPT...</span>
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
                      className="bg-green-600 hover:bg-green-700"
                    >
                      <Save className="w-4 h-4 mr-2" />
                      Save for Approval
                    </Button>
                    <Button variant="outline">
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
        <Card className="border-0 shadow-md">
          <CardContent className="text-center py-12">
            <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No content generated yet
            </h3>
            <p className="text-gray-600 mb-4">
              Enter your ChatGPT API key and generate content from your blog ideas
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
