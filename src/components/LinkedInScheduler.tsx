
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Calendar } from '@/components/ui/calendar';
import { useToast } from '@/hooks/use-toast';
import { Calendar as CalendarIcon, Clock, Send, Settings, CheckCircle2, BarChart3, User } from 'lucide-react';

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
  const [linkedInProfile, setLinkedInProfile] = useState('');
  const [showProfileInput, setShowProfileInput] = useState(false);
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
    if (!linkedInProfile.trim()) {
      setShowProfileInput(true);
      return;
    }

    setTimeout(() => {
      setLinkedInConnected(true);
      setShowProfileInput(false);
      toast({
        title: "LinkedIn connected successfully!",
        description: `Connected to ${linkedInProfile}. You can now schedule posts to your LinkedIn profile`,
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
      case 'scheduled': return 'bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/30 dark:text-blue-400';
      case 'posted': return 'bg-green-100 text-green-800 border-green-200 dark:bg-green-900/30 dark:text-green-400';
      case 'failed': return 'bg-red-100 text-red-800 border-red-200 dark:bg-red-900/30 dark:text-red-400';
      default: return 'bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-700 dark:text-gray-300';
    }
  };

  return (
    <div className="space-y-6">
      {!linkedInConnected ? (
        <Card className="border-0 shadow-lg bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-gray-900 dark:text-white">
              <Settings className="w-5 h-5 text-blue-600" />
              Connect LinkedIn Account
            </CardTitle>
            <CardDescription className="text-gray-600 dark:text-gray-300">
              Connect your LinkedIn account to start scheduling posts
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-6">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-xl">in</span>
              </div>
              <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">LinkedIn Integration</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Connect your LinkedIn account to automate post scheduling
              </p>
              
              {showProfileInput && (
                <div className="mb-4 max-w-md mx-auto">
                  <Label htmlFor="linkedin-profile" className="text-left block mb-2">LinkedIn Profile/Email</Label>
                  <div className="flex gap-2">
                    <Input
                      id="linkedin-profile"
                      type="text"
                      placeholder="your-email@example.com or profile-url"
                      value={linkedInProfile}
                      onChange={(e) => setLinkedInProfile(e.target.value)}
                      className="flex-1"
                    />
                  </div>
                </div>
              )}
              
              <Button 
                onClick={connectLinkedIn}
                className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg"
              >
                <User className="w-4 h-4 mr-2" />
                {showProfileInput ? 'Connect Account' : 'Connect LinkedIn Account'}
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Scheduling Interface */}
          <div className="space-y-4">
            <Card className="border-0 shadow-lg bg-white dark:bg-gray-800">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-gray-900 dark:text-white">
                  <CalendarIcon className="w-5 h-5 text-green-600" />
                  Schedule New Post
                </CardTitle>
                <CardDescription className="text-gray-600 dark:text-gray-300">
                  Select approved content and set publishing schedule
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Select Approved Content</Label>
                  <div className="space-y-2 mt-2">
                    {approvedContent.map(content => (
                      <div
                        key={content.id}
                        className="flex items-center justify-between p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                      >
                        <div>
                          <h4 className="font-medium text-sm text-gray-900 dark:text-white">{content.title}</h4>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            {content.wordCount} words • {content.estimatedReadTime} read
                          </p>
                        </div>
                        <Button
                          size="sm"
                          onClick={() => schedulePost(content.id)}
                          className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white"
                        >
                          <Clock className="w-4 h-4 mr-2" />
                          Schedule
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>

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

            <Card className="border-0 shadow-lg bg-white dark:bg-gray-800">
              <CardHeader>
                <CardTitle className="text-gray-900 dark:text-white">Select Date</CardTitle>
              </CardHeader>
              <CardContent>
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  disabled={(date) => date < new Date()}
                  className="rounded-md border dark:border-gray-600"
                />
              </CardContent>
            </Card>
          </div>

          {/* Scheduled Posts */}
          <Card className="border-0 shadow-lg bg-white dark:bg-gray-800">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-gray-900 dark:text-white">
                <Send className="w-5 h-5 text-purple-600" />
                Scheduled Posts
              </CardTitle>
              <CardDescription className="text-gray-600 dark:text-gray-300">
                Manage your upcoming and past LinkedIn posts
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {scheduledPosts.map((post) => (
                  <div
                    key={post.id}
                    className="border border-gray-200 dark:border-gray-600 rounded-lg p-4 bg-gray-50 dark:bg-gray-700"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h4 className="font-medium text-sm mb-1 text-gray-900 dark:text-white">{post.title}</h4>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
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
                      <div className="bg-white dark:bg-gray-800 rounded-md p-3">
                        <div className="flex items-center gap-1 mb-2">
                          <BarChart3 className="w-4 h-4 text-gray-600 dark:text-gray-300" />
                          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            Engagement Stats
                          </span>
                        </div>
                        <div className="grid grid-cols-4 gap-2 text-center">
                          <div>
                            <div className="text-lg font-semibold text-blue-600">
                              {post.engagementStats.views}
                            </div>
                            <div className="text-xs text-gray-500 dark:text-gray-400">Views</div>
                          </div>
                          <div>
                            <div className="text-lg font-semibold text-red-600">
                              {post.engagementStats.likes}
                            </div>
                            <div className="text-xs text-gray-500 dark:text-gray-400">Likes</div>
                          </div>
                          <div>
                            <div className="text-lg font-semibold text-green-600">
                              {post.engagementStats.comments}
                            </div>
                            <div className="text-xs text-gray-500 dark:text-gray-400">Comments</div>
                          </div>
                          <div>
                            <div className="text-lg font-semibold text-purple-600">
                              {post.engagementStats.shares}
                            </div>
                            <div className="text-xs text-gray-500 dark:text-gray-400">Shares</div>
                          </div>
                        </div>
                      </div>
                    )}

                    {post.status === 'posted' && (
                      <div className="flex items-center gap-2 mt-2 text-green-600 dark:text-green-400">
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
