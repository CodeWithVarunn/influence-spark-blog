
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Lightbulb, Sparkles, RefreshCw, CheckCircle2, Plus } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface BlogIdea {
  id: string;
  title: string;
  description: string;
  category: string;
  engagement_potential: 'high' | 'medium' | 'low';
  selected: boolean;
}

export const IdeaGeneration = () => {
  const { toast } = useToast();
  const [ideas, setIdeas] = useState<BlogIdea[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedCount, setSelectedCount] = useState(0);
  const [customIdea, setCustomIdea] = useState('');
  const [showCustomInput, setShowCustomInput] = useState(false);

  const generateIdeas = async () => {
    setIsGenerating(true);
    
    try {
      const { data, error } = await supabase.functions.invoke('generate-content', {
        body: {
          prompt: 'Generate creative blog ideas for LinkedIn content based on business, leadership, personal branding, and professional development topics',
          type: 'ideas'
        }
      });

      if (error) throw error;

      let generatedIdeas: BlogIdea[] = [];
      try {
        const parsedContent = JSON.parse(data.content);
        generatedIdeas = parsedContent.map((idea: any, index: number) => ({
          id: (index + 1).toString(),
          title: idea.title,
          description: idea.description,
          category: idea.category,
          engagement_potential: idea.engagement_potential,
          selected: false
        }));
      } catch {
        // Fallback to sample ideas if parsing fails
        generatedIdeas = [
          {
            id: '1',
            title: 'The Future of Remote Work: 5 Trends Every Leader Should Know',
            description: 'Explore emerging trends in remote work culture and how leaders can adapt their management strategies.',
            category: 'Leadership',
            engagement_potential: 'high',
            selected: false
          },
          {
            id: '2',
            title: 'Building Personal Brand Authority in Your Industry',
            description: 'Step-by-step guide to establishing yourself as a thought leader in your professional field.',
            category: 'Personal Branding',
            engagement_potential: 'high',
            selected: false
          },
          {
            id: '3',
            title: 'Data-Driven Decision Making: Tools and Techniques',
            description: 'How to leverage data analytics to make better business decisions and drive growth.',
            category: 'Business Strategy',
            engagement_potential: 'medium',
            selected: false
          }
        ];
      }

      setIdeas(generatedIdeas);
      toast({
        title: "Ideas generated successfully!",
        description: `Generated ${generatedIdeas.length} blog ideas for you`,
      });
    } catch (error) {
      console.error('Error generating ideas:', error);
      toast({
        title: "Error generating ideas",
        description: "Please try again later",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const toggleIdeaSelection = (id: string) => {
    setIdeas(prev => prev.map(idea => 
      idea.id === id ? { ...idea, selected: !idea.selected } : idea
    ));
    
    setSelectedCount(prev => {
      const idea = ideas.find(i => i.id === id);
      return idea?.selected ? prev - 1 : prev + 1;
    });
  };

  const addCustomIdea = () => {
    if (!customIdea.trim()) return;

    const newIdea: BlogIdea = {
      id: `custom-${Date.now()}`,
      title: customIdea,
      description: 'Custom idea created by user',
      category: 'Custom',
      engagement_potential: 'medium',
      selected: false
    };

    setIdeas(prev => [...prev, newIdea]);
    setCustomIdea('');
    setShowCustomInput(false);
    
    toast({
      title: "Custom idea added!",
      description: "Your custom idea has been added to the list",
    });
  };

  const proceedToContentCreation = () => {
    const selectedIdeas = ideas.filter(idea => idea.selected);
    if (selectedIdeas.length === 0) {
      toast({
        title: "No ideas selected",
        description: "Please select at least one idea to proceed",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Ideas saved!",
      description: `${selectedIdeas.length} ideas ready for content creation`,
    });
  };

  return (
    <div className="space-y-6">
      {/* Generation Controls */}
      <Card className="border-0 shadow-lg bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-gray-900 dark:text-white">
            <Sparkles className="w-5 h-5 text-purple-600" />
            AI Blog Idea Generator
          </CardTitle>
          <CardDescription className="text-gray-600 dark:text-gray-300">
            Generate engaging blog ideas from your uploaded resources
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4 flex-wrap">
            <Button 
              onClick={generateIdeas}
              disabled={isGenerating}
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-lg"
            >
              {isGenerating ? (
                <>
                  <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                  Generating Ideas...
                </>
              ) : (
                <>
                  <Lightbulb className="w-4 h-4 mr-2" />
                  Generate Blog Ideas
                </>
              )}
            </Button>
            
            <Button
              variant="outline"
              onClick={() => setShowCustomInput(!showCustomInput)}
              className="border-purple-300 text-purple-700 hover:bg-purple-50 dark:border-purple-600 dark:text-purple-300 dark:hover:bg-purple-900/20"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Custom Idea
            </Button>
            
            {ideas.length > 0 && (
              <div className="text-sm text-gray-600 dark:text-gray-300 bg-white/50 dark:bg-gray-800/50 px-3 py-1 rounded-full">
                {selectedCount} of {ideas.length} ideas selected
              </div>
            )}
          </div>

          {/* Custom Idea Input */}
          {showCustomInput && (
            <div className="mt-4 p-4 bg-white/70 dark:bg-gray-800/70 rounded-lg space-y-3">
              <Label htmlFor="custom-idea">Enter Your Custom Idea</Label>
              <div className="flex gap-2">
                <Input
                  id="custom-idea"
                  value={customIdea}
                  onChange={(e) => setCustomIdea(e.target.value)}
                  placeholder="Enter your blog idea..."
                  className="flex-1"
                />
                <Button onClick={addCustomIdea} disabled={!customIdea.trim()}>
                  Add
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Generated Ideas */}
      {ideas.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Select Ideas</h3>
            <Button 
              onClick={proceedToContentCreation}
              disabled={selectedCount === 0}
              className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white shadow-lg"
            >
              <CheckCircle2 className="w-4 h-4 mr-2" />
              Proceed with Selected ({selectedCount})
            </Button>
          </div>

          <div className="grid gap-4">
            {ideas.map((idea) => (
              <Card 
                key={idea.id} 
                className={`cursor-pointer transition-all duration-300 border-2 hover:shadow-lg ${
                  idea.selected 
                    ? 'border-blue-400 bg-blue-50/80 dark:bg-blue-900/20 shadow-md transform scale-[1.02]' 
                    : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 bg-white dark:bg-gray-800'
                }`}
                onClick={() => toggleIdeaSelection(idea.id)}
              >
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h4 className="font-semibold text-gray-900 dark:text-white">
                          {idea.title}
                        </h4>
                        {idea.selected && (
                          <CheckCircle2 className="w-5 h-5 text-blue-600 animate-in fade-in-0 zoom-in-95" />
                        )}
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                        {idea.description}
                      </p>
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary" className="text-xs bg-gray-100 dark:bg-gray-700">
                          {idea.category}
                        </Badge>
                        <Badge 
                          variant={idea.engagement_potential === 'high' ? 'default' : 'outline'}
                          className={`text-xs ${
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

      {ideas.length === 0 && (
        <Card className="border-0 shadow-lg bg-white dark:bg-gray-800">
          <CardContent className="text-center py-12">
            <Lightbulb className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              No ideas generated yet
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Click "Generate Blog Ideas" to get AI-powered suggestions for your content
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
