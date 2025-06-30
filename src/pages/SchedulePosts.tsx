
import { useState } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Calendar } from '@/components/ui/calendar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Calendar as CalendarIcon, Clock, Send, Eye, Edit, Trash2, TrendingUp, Users, MessageSquare, Share2 } from 'lucide-react';

interface ScheduledPost {
  id: string;
  content: string;
  scheduledDate: Date;
  status: 'draft' | 'scheduled' | 'posted' | 'failed';
  platform: 'linkedin';
  engagement?: {
    likes: number;
    comments: number;
    shares: number;
    views: number;
  };
}

const SchedulePosts = () => {
  const { toast } = useToast();
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedTime, setSelectedTime] = useState('09:00');
  const [postContent, setPostContent] = useState('');
  const [scheduledPosts, setScheduledPosts] = useState<ScheduledPost[]>([
    {
      id: '1',
      content: 'Excited to share insights from our latest AI conference. The future of technology is incredibly promising! 🚀 #AI #Technology #Innovation',
      scheduledDate: new Date(2024, 1, 15, 9, 0),
      status: 'posted',
      platform: 'linkedin',
      engagement: {
        likes: 145,
        comments: 23,
        shares: 12,
        views: 890
      }
    },
    {
      id: '2',
      content: 'Building strong professional relationships is key to career success. Here are my top 5 networking tips that actually work...',
      scheduledDate: new Date(2024, 1, 18, 14, 30),
      status: 'scheduled',
      platform: 'linkedin'
    },
    {
      id: '3',
      content: 'Draft: Leadership lessons from my entrepreneurial journey...',
      scheduledDate: new Date(2024, 1, 20, 10, 0),
      status: 'draft',
      platform: 'linkedin'
    }
  ]);

  const schedulePost = () => {
    if (!postContent.trim()) {
      toast({
        title: "Content required",
        description: "Please enter content for your post",
        variant: "destructive",
      });
      return;
    }

    if (!selectedDate || !selectedTime) {
      toast({
        title: "Schedule required",
        description: "Please select date and time for your post",
        variant: "destructive",
      });
      return;
    }

    const [hours, minutes] = selectedTime.split(':').map(Number);
    const scheduledDateTime = new Date(selectedDate);
    scheduledDateTime.setHours(hours, minutes);

    const newPost: ScheduledPost = {
      id: Date.now().toString(),
      content: postContent,
      scheduledDate: scheduledDateTime,
      status: 'scheduled',
      platform: 'linkedin'
    };

    setScheduledPosts(prev => [...prev, newPost]);
    setPostContent('');
    
    toast({
      title: "Post Scheduled!",
      description: `Your post will be published on ${scheduledDateTime.toLocaleDateString()} at ${selectedTime}`,
    });
  };

  const getStatusColor = (status: ScheduledPost['status']) => {
    switch (status) {
      case 'draft': return 'bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-700 dark:text-gray-300';
      case 'scheduled': return 'bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/30 dark:text-blue-400';
      case 'posted': return 'bg-green-100 text-green-800 border-green-200 dark:bg-green-900/30 dark:text-green-400';
      case 'failed': return 'bg-red-100 text-red-800 border-red-200 dark:bg-red-900/30 dark:text-red-400';
      default: return 'bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-700 dark:text-gray-300';
    }
  };

  const deletePost = (id: string) => {
    setScheduledPosts(prev => prev.filter(post => post.id !== id));
    toast({
      title: "Post Deleted",
      description: "The scheduled post has been removed",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50/30 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900/30">
      <Header />
      
      <main className="container mx-auto px-6 py-8 max-w-7xl">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-gray-900 via-blue-600 to-indigo-600 dark:from-white dark:via-blue-400 dark:to-indigo-400 bg-clip-text text-transparent mb-4">
            Schedule Your Posts
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Plan and manage your LinkedIn content calendar
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Post Creation */}
          <div className="space-y-6">
            <Card className="border-0 shadow-lg bg-white dark:bg-gray-800">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Edit className="w-5 h-5 text-blue-600" />
                  Create New Post
                </CardTitle>
                <CardDescription>
                  Write and schedule your LinkedIn content
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="content">Post Content</Label>
                  <Textarea
                    id="content"
                    value={postContent}
                    onChange={(e) => setPostContent(e.target.value)}
                    placeholder="What do you want to share with your network?"
                    rows={6}
                    className="mt-1 resize-none"
                  />
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-sm text-gray-500">
                      {postContent.length}/3000 characters
                    </span>
                    <Badge variant="outline" className="text-xs">
                      LinkedIn
                    </Badge>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="time">Time</Label>
                    <Input
                      id="time"
                      type="time"
                      value={selectedTime}
                      onChange={(e) => setSelectedTime(e.target.value)}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label>Best Times</Label>
                    <Select onValueChange={setSelectedTime}>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Optimal times" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="09:00">9:00 AM (Peak)</SelectItem>
                        <SelectItem value="12:00">12:00 PM (Lunch)</SelectItem>
                        <SelectItem value="17:00">5:00 PM (After Work)</SelectItem>
                        <SelectItem value="20:00">8:00 PM (Evening)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <Button 
                  onClick={schedulePost}
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                >
                  <CalendarIcon className="w-4 h-4 mr-2" />
                  Schedule Post
                </Button>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-white dark:bg-gray-800">
              <CardHeader>
                <CardTitle>Select Date</CardTitle>
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
          <div>
            <Card className="border-0 shadow-lg bg-white dark:bg-gray-800">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Send className="w-5 h-5 text-green-600" />
                  Scheduled Posts
                </CardTitle>
                <CardDescription>
                  Manage your upcoming and published posts
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 max-h-96 overflow-y-auto">
                  {scheduledPosts.map((post) => (
                    <div
                      key={post.id}
                      className="border border-gray-200 dark:border-gray-600 rounded-lg p-4 bg-gray-50 dark:bg-gray-700"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <Badge className={getStatusColor(post.status)}>
                          {post.status}
                        </Badge>
                        <div className="flex items-center gap-2">
                          <Button variant="ghost" size="sm">
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => deletePost(post.id)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>

                      <p className="text-sm text-gray-800 dark:text-gray-200 mb-3 line-clamp-3">
                        {post.content}
                      </p>

                      <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                        <span>
                          {post.scheduledDate.toLocaleDateString()} at{' '}
                          {post.scheduledDate.toLocaleTimeString([], { 
                            hour: '2-digit', 
                            minute: '2-digit' 
                          })}
                        </span>
                        <Badge variant="outline" className="text-xs">
                          LinkedIn
                        </Badge>
                      </div>

                      {post.engagement && (
                        <div className="mt-3 p-3 bg-white dark:bg-gray-800 rounded-md">
                          <div className="grid grid-cols-4 gap-2 text-center">
                            <div>
                              <div className="text-sm font-semibold text-blue-600">
                                {post.engagement.views}
                              </div>
                              <div className="text-xs text-gray-500">Views</div>
                            </div>
                            <div>
                              <div className="text-sm font-semibold text-red-600">
                                {post.engagement.likes}
                              </div>
                              <div className="text-xs text-gray-500">Likes</div>
                            </div>
                            <div>
                              <div className="text-sm font-semibold text-green-600">
                                {post.engagement.comments}
                              </div>
                              <div className="text-xs text-gray-500">Comments</div>
                            </div>
                            <div>
                              <div className="text-sm font-semibold text-purple-600">
                                {post.engagement.shares}
                              </div>
                              <div className="text-xs text-gray-500">Shares</div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default SchedulePosts;
