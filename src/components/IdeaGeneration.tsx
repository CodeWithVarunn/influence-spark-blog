
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Lightbulb, Sparkles, RefreshCw, CheckCircle2 } from 'lucide-react';

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

  const generateIdeas = async () => {
    setIsGenerating(true);
    
    // Simulate AI idea generation
    setTimeout(() => {
      const sampleIdeas: BlogIdea[] = [
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
        },
        {
          id: '4',
          title: 'Networking in the Digital Age: LinkedIn Best Practices',
          description: 'Modern networking strategies and how to build meaningful professional relationships online.',
          category: 'Networking',
          engagement_potential: 'high',
          selected: false
        },
        {
          id: '5',
          title: 'Employee Retention Strategies That Actually Work',
          description: 'Proven methods to reduce turnover and create a workplace culture that retains top talent.',
          category: 'HR & Management',
          engagement_potential: 'medium',
          selected: false
        }
      ];

      setIdeas(sampleIdeas);
      setIsGenerating(false);
      toast({
        title: "Ideas generated successfully!",
        description: `Generated ${sampleIdeas.length} blog ideas from your resources`,
      });
    }, 3000);
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
      <Card className="border-0 shadow-md bg-gradient-to-r from-purple-50 to-pink-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-purple-600" />
            AI Blog Idea Generator
          </CardTitle>
          <CardDescription>
            Generate engaging blog ideas from your uploaded resources
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4">
            <Button 
              onClick={generateIdeas}
              disabled={isGenerating}
              className="bg-purple-600 hover:bg-purple-700"
            >
              {isGenerating ? (
                <>
                  <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                  Generating Ideas...
                </>
              ) : (
                <>
                  <Lightbulb className="w-4 h-4 mr-2" />
                  Generate 20 Blog Ideas
                </>
              )}
            </Button>
            
            {ideas.length > 0 && (
              <div className="text-sm text-gray-600">
                {selectedCount} of {ideas.length} ideas selected
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Generated Ideas */}
      {ideas.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Generated Ideas</h3>
            <Button 
              onClick={proceedToContentCreation}
              disabled={selectedCount === 0}
              className="bg-green-600 hover:bg-green-700"
            >
              <CheckCircle2 className="w-4 h-4 mr-2" />
              Proceed with Selected ({selectedCount})
            </Button>
          </div>

          <div className="grid gap-4">
            {ideas.map((idea) => (
              <Card 
                key={idea.id} 
                className={`cursor-pointer transition-all duration-200 border-2 ${
                  idea.selected 
                    ? 'border-blue-300 bg-blue-50/50 shadow-md' 
                    : 'border-gray-200 hover:border-gray-300 hover:shadow-sm'
                }`}
                onClick={() => toggleIdeaSelection(idea.id)}
              >
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h4 className="font-semibold text-gray-900">
                          {idea.title}
                        </h4>
                        {idea.selected && (
                          <CheckCircle2 className="w-5 h-5 text-blue-600" />
                        )}
                      </div>
                      <p className="text-sm text-gray-600 mb-3">
                        {idea.description}
                      </p>
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary" className="text-xs">
                          {idea.category}
                        </Badge>
                        <Badge 
                          variant={idea.engagement_potential === 'high' ? 'default' : 'outline'}
                          className={`text-xs ${
                            idea.engagement_potential === 'high' 
                              ? 'bg-green-100 text-green-800 border-green-200' 
                              : idea.engagement_potential === 'medium'
                              ? 'bg-yellow-100 text-yellow-800 border-yellow-200'
                              : 'bg-gray-100 text-gray-800 border-gray-200'
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
        <Card className="border-0 shadow-md">
          <CardContent className="text-center py-12">
            <Lightbulb className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No ideas generated yet
            </h3>
            <p className="text-gray-600 mb-4">
              Upload some resources first, then generate blog ideas using AI
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
