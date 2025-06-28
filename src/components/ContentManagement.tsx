
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { CheckCircle, XCircle, Edit, Eye, Clock, MessageSquare } from 'lucide-react';

interface ContentItem {
  id: string;
  title: string;
  content: string;
  status: 'pending' | 'approved' | 'rejected' | 'scheduled';
  createdAt: string;
  wordCount: number;
  estimatedReadTime: string;
  feedback?: string;
}

export const ContentManagement = () => {
  const { toast } = useToast();
  const [contentItems, setContentItems] = useState<ContentItem[]>([
    {
      id: '1',
      title: 'The Future of Remote Work: 5 Trends Every Leader Should Know',
      content: '# The Future of Remote Work\n\nRemote work has transformed from a temporary solution to a permanent fixture...',
      status: 'pending',
      createdAt: '2024-01-15T10:30:00Z',
      wordCount: 1250,
      estimatedReadTime: '6 min',
    },
    {
      id: '2',
      title: 'Building Personal Brand Authority in Your Industry',
      content: '# Building Personal Brand Authority\n\nIn today\'s competitive landscape, personal branding...',
      status: 'approved',
      createdAt: '2024-01-14T14:20:00Z',
      wordCount: 980,
      estimatedReadTime: '5 min',
    },
    {
      id: '3',
      title: 'Data-Driven Decision Making: Tools and Techniques',
      content: '# Data-Driven Decision Making\n\nSuccessful businesses rely on data to make informed decisions...',
      status: 'rejected',
      createdAt: '2024-01-13T09:15:00Z',
      wordCount: 1100,
      estimatedReadTime: '6 min',
      feedback: 'Need more specific examples and case studies. Also, the tone feels too technical for LinkedIn audience.'
    }
  ]);

  const [selectedContent, setSelectedContent] = useState<ContentItem | null>(null);
  const [feedback, setFeedback] = useState('');

  const approveContent = (id: string) => {
    setContentItems(prev => 
      prev.map(item => 
        item.id === id ? { ...item, status: 'approved' as const } : item
      )
    );
    toast({
      title: "Content approved",
      description: "Content is now ready for scheduling",
    });
  };

  const rejectContent = (id: string, feedbackText: string) => {
    setContentItems(prev => 
      prev.map(item => 
        item.id === id 
          ? { ...item, status: 'rejected' as const, feedback: feedbackText }
          : item
      )
    );
    toast({
      title: "Content rejected",
      description: "Feedback has been saved for revision",
    });
    setSelectedContent(null);
    setFeedback('');
  };

  const getStatusColor = (status: ContentItem['status']) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'approved': return 'bg-green-100 text-green-800 border-green-200';
      case 'rejected': return 'bg-red-100 text-red-800 border-red-200';
      case 'scheduled': return 'bg-blue-100 text-blue-800 border-blue-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-0 shadow-md bg-gradient-to-br from-yellow-50 to-orange-50">
          <CardContent className="p-4 text-center">
            <Clock className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-yellow-800">
              {contentItems.filter(item => item.status === 'pending').length}
            </div>
            <div className="text-sm text-yellow-700">Pending Review</div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-md bg-gradient-to-br from-green-50 to-emerald-50">
          <CardContent className="p-4 text-center">
            <CheckCircle className="w-8 h-8 text-green-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-green-800">
              {contentItems.filter(item => item.status === 'approved').length}
            </div>
            <div className="text-sm text-green-700">Approved</div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-md bg-gradient-to-br from-red-50 to-pink-50">
          <CardContent className="p-4 text-center">
            <XCircle className="w-8 h-8 text-red-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-red-800">
              {contentItems.filter(item => item.status === 'rejected').length}
            </div>
            <div className="text-sm text-red-700">Rejected</div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-md bg-gradient-to-br from-blue-50 to-indigo-50">
          <CardContent className="p-4 text-center">
            <Clock className="w-8 h-8 text-blue-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-blue-800">
              {contentItems.filter(item => item.status === 'scheduled').length}
            </div>
            <div className="text-sm text-blue-700">Scheduled</div>
          </CardContent>
        </Card>
      </div>

      {/* Content List */}
      <Card className="border-0 shadow-md">
        <CardHeader>
          <CardTitle>Content Queue</CardTitle>
          <CardDescription>
            Review and approve generated content before scheduling
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {contentItems.map((item) => (
              <div
                key={item.id}
                className="border border-gray-200 rounded-lg p-4 hover:shadow-sm transition-shadow"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 mb-1">
                      {item.title}
                    </h3>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span>Created: {formatDate(item.createdAt)}</span>
                      <span>{item.wordCount} words</span>
                      <span>{item.estimatedReadTime} read</span>
                    </div>
                  </div>
                  <Badge className={getStatusColor(item.status)}>
                    {item.status}
                  </Badge>
                </div>

                {item.feedback && (
                  <div className="bg-red-50 border border-red-200 rounded-md p-3 mb-3">
                    <div className="flex items-start gap-2">
                      <MessageSquare className="w-4 h-4 text-red-600 mt-0.5" />
                      <div>
                        <div className="text-sm font-medium text-red-800">Feedback:</div>
                        <div className="text-sm text-red-700">{item.feedback}</div>
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setSelectedContent(item)}
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    Review
                  </Button>
                  
                  {item.status === 'pending' && (
                    <>
                      <Button
                        size="sm"
                        onClick={() => approveContent(item.id)}
                        className="bg-green-600 hover:bg-green-700"
                      >
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Approve
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setSelectedContent(item)}
                        className="text-red-600 border-red-200 hover:bg-red-50"
                      >
                        <XCircle className="w-4 h-4 mr-2" />
                        Reject
                      </Button>
                    </>
                  )}
                  
                  {item.status === 'rejected' && (
                    <Button variant="outline" size="sm">
                      <Edit className="w-4 h-4 mr-2" />
                      Edit
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Content Review Modal */}
      {selectedContent && (
        <Card className="border-0 shadow-lg bg-white">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Review Content</CardTitle>
              <Button 
                variant="ghost" 
                onClick={() => setSelectedContent(null)}
              >
                ×
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold text-lg mb-2">{selectedContent.title}</h3>
              <div className="bg-gray-50 p-4 rounded-lg max-h-96 overflow-y-auto">
                <pre className="whitespace-pre-wrap text-sm">
                  {selectedContent.content}
                </pre>
              </div>
            </div>

            {selectedContent.status === 'pending' && (
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Feedback (optional for rejection)
                  </label>
                  <Textarea
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    placeholder="Provide feedback for improvements..."
                    rows={3}
                  />
                </div>

                <div className="flex gap-2">
                  <Button
                    onClick={() => {
                      approveContent(selectedContent.id);
                      setSelectedContent(null);
                    }}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Approve
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => rejectContent(selectedContent.id, feedback)}
                    className="text-red-600 border-red-200 hover:bg-red-50"
                  >
                    <XCircle className="w-4 h-4 mr-2" />
                    Reject
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};
