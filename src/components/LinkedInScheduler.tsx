
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Calendar } from '@/components/ui/calendar';
import { useToast } from '@/hooks/use-toast';
import { Calendar as CalendarIcon, Clock, Send, Settings, CheckCircle2, BarChart3 } from 'lucide-react';

interface ScheduledPost {
  id: string;
  title: string;
  scheduledDate: Date;
  status: 'scheduled' | 'posted' | 'failed';
  engagementStats?: {
    likes: number;
    comments: number;
    shares: number;
    views: number;
  };
}

export const LinkedInScheduler = () => {
  const { toast } = useToast();
  const [linkedInConnected, setLinkedInConnected] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedTime, setSelectedTime] = useState('09:00');
  const [scheduledPosts, setScheduledPosts] = useState<ScheduledPost[]>([
    {
      id: '1',
      title: 'Building Personal Brand Authority in Your Industry',
      scheduledDate: new Date(2024, 0, 20, 9, 0),
      status: 'posted',
      engagementStats: {
        likes: 45,
        comments: 12,
        shares: 8,
        views: 234
      }
    },
    {
      id: '2',
      title: 'The Future of Remote Work: 5 Trends Every Leader Should Know',
      scheduledDate: new Date(2024, 0, 22, 14, 30),
      status: 'scheduled'
    }
  ]);

  // Sample approved content that would come from content management
  const approvedContent = [
    {
      id: '1',
      title: 'Data-Driven Decision Making: Tools and Techniques',
      wordCount: 1100,
      estimatedReadTime: '6 min'
    },
    {
      id: '2',
      title: 'Networking in the Digital Age: LinkedIn Best Practices',
      wordCount: 950,
      estimatedReadTime: '5 min'
    }
  ];

  const connectLinkedIn = () => {
    // Simulate LinkedIn OAuth connection
    setTimeout(() => {
      setLinkedInConnected(true);
      toast({
        title: "LinkedIn connected successfully!",
        description: "You can now schedule posts to your LinkedIn profile",
      });
    }, 1000);
  };

  const schedulePost = (contentId: string) => {
    if (!selectedDate || !selectedTime) {
      toast({
        title: "Missing information",
        description: "Please select both date and time for scheduling",
        variant: "destructive",
      });
      return;
    }

    const content = approvedContent.find(c => c.id === contentId);
    if (!content) return;

    const [hours, minutes] = selectedTime.split(':').map(Number);
    const scheduledDateTime = new Date(selectedDate);
    scheduledDateTime.setHours(hours, minutes);

    const newPost: ScheduledPost = {
      id: Date.now().toString(),
      title: content.title,
      scheduledDate: scheduledDateTime,
      status: 'scheduled'
    };

    setScheduledPosts(prev => [...prev, newPost]);
    
    toast({
      title: "Post scheduled successfully!",
      description: `"${content.title}" will be posted on ${scheduledDateTime.toLocaleDateString()} at ${selectedTime}`,
    });
  };

  const getStatusColor = (status: ScheduledPost['status']) => {
    switch (status) {
      case 'scheduled': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'posted': return 'bg-green-100 text-green-800 border-green-200';
      case 'failed': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="space-y-6">
      {/* LinkedIn Connection */}
      {!linkedInConnected ? (
        <Card className="border-0 shadow-md bg-gradient-to-r from-blue-50 to-indigo-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="w-5 h-5 text-blue-600" />
              Connect LinkedIn Account
            </CardTitle>
            <CardDescription>
              Connect your LinkedIn account to start scheduling posts
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-6">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-xl">in</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">LinkedIn Integration</h3>
              <p className="text-gray-600 mb-4">
                Securely connect your LinkedIn account to automate post scheduling
              </p>
              <Button 
                onClick={connectLinkedIn}
                className="bg-blue-600 hover:bg-blue-700"
              >
                Connect LinkedIn Account
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Scheduling Interface */}
          <div className="space-y-4">
            <Card className="border-0 shadow-md">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CalendarIcon className="w-5 h-5 text-green-600" />
                  Schedule New Post
                </CardTitle>
                <CardDescription>
                  Select approved content and set publishing schedule
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Content Selection */}
                <div>
                  <Label>Select Approved Content</Label>
                  <div className="space-y-2 mt-2">
                    {approvedContent.map(content => (
                      <div
                        key={content.id}
                        className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50"
                      >
                        <div>
                          <h4 className="font-medium text-sm">{content.title}</h4>
                          <p className="text-xs text-gray-500">
                            {content.wordCount} words • {content.estimatedReadTime} read
                          </p>
                        </div>
                        <Button
                          size="sm"
                          onClick={() => schedulePost(content.id)}
                          className="bg-green-600 hover:bg-green-700"
                        >
                          <Clock className="w-4 h-4 mr-2" />
                          Schedule
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Date and Time Selection */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="schedule-time">Time</Label>
                    <Input
                      id="schedule-time"
                      type="time"
                      value={selectedTime}
                      onChange={(e) => setSelectedTime(e.target.value)}
                      className="mt-1"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Calendar */}
            <Card className="border-0 shadow-md">
              <CardHeader>
                <CardTitle>Select Date</CardTitle>
              </CardHeader>
              <CardContent>
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  disabled={(date) => date < new Date()}
                  className="rounded-md border"
                />
              </CardContent>
            </Card>
          </div>

          {/* Scheduled Posts */}
          <Card className="border-0 shadow-md">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Send className="w-5 h-5 text-purple-600" />
                Scheduled Posts
              </CardTitle>
              <CardDescription>
                Manage your upcoming and past LinkedIn posts
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {scheduledPosts.map((post) => (
                  <div
                    key={post.id}
                    className="border border-gray-200 rounded-lg p-4"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h4 className="font-medium text-sm mb-1">{post.title}</h4>
                        <p className="text-xs text-gray-500">
                          {post.scheduledDate.toLocaleDateString()} at{' '}
                          {post.scheduledDate.toLocaleTimeString([], { 
                            hour: '2-digit', 
                            minute: '2-digit' 
                          })}
                        </p>
                      </div>
                      <Badge className={getStatusColor(post.status)}>
                        {post.status}
                      </Badge>
                    </div>

                    {post.engagementStats && (
                      <div className="bg-gray-50 rounded-md p-3">
                        <div className="flex items-center gap-1 mb-2">
                          <BarChart3 className="w-4 h-4 text-gray-600" />
                          <span className="text-sm font-medium text-gray-700">
                            Engagement Stats
                          </span>
                        </div>
                        <div className="grid grid-cols-4 gap-2 text-center">
                          <div>
                            <div className="text-lg font-semibold text-blue-600">
                              {post.engagementStats.views}
                            </div>
                            <div className="text-xs text-gray-500">Views</div>
                          </div>
                          <div>
                            <div className="text-lg font-semibold text-red-600">
                              {post.engagementStats.likes}
                            </div>
                            <div className="text-xs text-gray-500">Likes</div>
                          </div>
                          <div>
                            <div className="text-lg font-semibold text-green-600">
                              {post.engagementStats.comments}
                            </div>
                            <div className="text-xs text-gray-500">Comments</div>
                          </div>
                          <div>
                            <div className="text-lg font-semibold text-purple-600">
                              {post.engagementStats.shares}
                            </div>
                            <div className="text-xs text-gray-500">Shares</div>
                          </div>
                        </div>
                      </div>
                    )}

                    {post.status === 'posted' && (
                      <div className="flex items-center gap-2 mt-2 text-green-600">
                        <CheckCircle2 className="w-4 h-4" />
                        <span className="text-sm">Successfully posted to LinkedIn</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};
