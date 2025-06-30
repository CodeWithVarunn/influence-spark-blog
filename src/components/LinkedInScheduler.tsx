
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Calendar } from '@/components/ui/calendar';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { Calendar as CalendarIcon, Clock, Send, Settings, CheckCircle2, Eye, X } from 'lucide-react';

interface ScheduledPost {
  id: string;
  content: string;
  scheduled_date: string;
  status: 'scheduled' | 'posted' | 'failed';
  created_at: string;
}

export const LinkedInScheduler = () => {
  const { toast } = useToast();
  const { user } = useAuth();
  const [linkedInConnected, setLinkedInConnected] = useState(
    localStorage.getItem('linkedinConnected') === 'true'
  );
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedTime, setSelectedTime] = useState('09:00');
  const [linkedInProfile, setLinkedInProfile] = useState(
    localStorage.getItem('linkedinProfile') || ''
  );
  const [showProfileInput, setShowProfileInput] = useState(false);
  const [previewContent, setPreviewContent] = useState('');
  const [showPreview, setShowPreview] = useState(false);
  const [scheduledPosts, setScheduledPosts] = useState<ScheduledPost[]>([]);
  const [pendingContent, setPendingContent] = useState('');

  useEffect(() => {
    // Check for pending content to schedule
    const pending = localStorage.getItem('pendingSchedule');
    if (pending) {
      setPendingContent(pending);
      localStorage.removeItem('pendingSchedule');
    }
    
    loadScheduledPosts();
  }, [user]);

  const loadScheduledPosts = async () => {
    if (!user) return;
    
    try {
      const { data, error } = await supabase
        .from('scheduled_posts')
        .select('*')
        .eq('user_id', user.id)
        .order('scheduled_date', { ascending: false });
      
      if (error) {
        console.error('Error loading scheduled posts:', error);
        return;
      }
      
      setScheduledPosts(data || []);
    } catch (error) {
      console.error('Error loading scheduled posts:', error);
    }
  };

  const connectLinkedIn = () => {
    if (!linkedInProfile.trim()) {
      setShowProfileInput(true);
      return;
    }

    setTimeout(() => {
      setLinkedInConnected(true);
      setShowProfileInput(false);
      localStorage.setItem('linkedinConnected', 'true');
      localStorage.setItem('linkedinProfile', linkedInProfile);
      toast({
        title: "LinkedIn connected successfully!",
        description: `Connected to ${linkedInProfile}. You can now schedule posts to your LinkedIn profile`,
      });
    }, 1000);
  };

  const schedulePost = async (content: string) => {
    if (!user) return;
    
    if (!selectedDate || !selectedTime) {
      toast({
        title: "Missing information",
        description: "Please select both date and time for scheduling",
        variant: "destructive",
      });
      return;
    }

    // Check if trying to schedule for today
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    selectedDate.setHours(0, 0, 0, 0);
    
    if (selectedDate.getTime() === today.getTime()) {
      const [hours, minutes] = selectedTime.split(':').map(Number);
      const now = new Date();
      const selectedDateTime = new Date();
      selectedDateTime.setHours(hours, minutes, 0, 0);
      
      if (selectedDateTime <= now) {
        toast({
          title: "Invalid time",
          description: "Please select a future time for today's posts",
          variant: "destructive",
        });
        return;
      }
    }

    const [hours, minutes] = selectedTime.split(':').map(Number);
    const scheduledDateTime = new Date(selectedDate);
    scheduledDateTime.setHours(hours, minutes);

    try {
      const { error } = await supabase
        .from('scheduled_posts')
        .insert({
          user_id: user.id,
          content: content,
          scheduled_date: scheduledDateTime.toISOString(),
          status: 'scheduled',
          platform: 'linkedin'
        });

      if (error) {
        throw error;
      }

      toast({
        title: "Post scheduled successfully!",
        description: `Post will be published on ${scheduledDateTime.toLocaleDateString()} at ${selectedTime}`,
      });

      // Reload posts and clear pending content
      await loadScheduledPosts();
      setPendingContent('');
    } catch (error) {
      console.error('Error scheduling post:', error);
      toast({
        title: "Error",
        description: "Failed to schedule post. Please try again.",
        variant: "destructive",
      });
    }
  };

  const getStatusColor = (status: ScheduledPost['status']) => {
    switch (status) {
      case 'scheduled': return 'bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/30 dark:text-blue-400';
      case 'posted': return 'bg-green-100 text-green-800 border-green-200 dark:bg-green-900/30 dark:text-green-400';
      case 'failed': return 'bg-red-100 text-red-800 border-red-200 dark:bg-red-900/30 dark:text-red-400';
      default: return 'bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-700 dark:text-gray-300';
    }
  };

  const previewPost = (content: string) => {
    setPreviewContent(content);
    setShowPreview(true);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6 p-6">
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
                  <Input
                    id="linkedin-profile"
                    type="text"
                    placeholder="your-email@example.com or profile-url"
                    value={linkedInProfile}
                    onChange={(e) => setLinkedInProfile(e.target.value)}
                    className="mb-2"
                  />
                </div>
              )}
              
              <Button 
                onClick={connectLinkedIn}
                className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg"
              >
                {showProfileInput ? 'Connect Account' : 'Connect LinkedIn Account'}
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Scheduling Interface */}
          <div className="space-y-6">
            {/* Pending Content */}
            {pendingContent && (
              <Card className="border-0 shadow-lg bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-gray-900 dark:text-white">
                    <Send className="w-5 h-5 text-green-600" />
                    Ready to Schedule
                  </CardTitle>
                  <CardDescription>
                    Content generated and ready for scheduling
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="bg-white dark:bg-gray-800 p-4 rounded-lg mb-4">
                    <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-3">
                      {pendingContent.substring(0, 150)}...
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => previewPost(pendingContent)}
                    >
                      <Eye className="w-4 h-4 mr-1" />
                      Preview
                    </Button>
                    <Button
                      size="sm"
                      onClick={() => setPendingContent('')}
                      variant="outline"
                    >
                      <X className="w-4 h-4 mr-1" />
                      Clear
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            <Card className="border-0 shadow-lg bg-white dark:bg-gray-800">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-gray-900 dark:text-white">
                  <CalendarIcon className="w-5 h-5 text-green-600" />
                  Schedule Post
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
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

                {pendingContent && (
                  <Button
                    onClick={() => schedulePost(pendingContent)}
                    className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white"
                    disabled={!selectedDate || !selectedTime}
                  >
                    <Clock className="w-4 h-4 mr-2" />
                    Schedule This Post
                  </Button>
                )}
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
                  disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
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
                Manage your upcoming LinkedIn posts
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {scheduledPosts.length === 0 ? (
                  <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                    <Send className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>No scheduled posts yet</p>
                  </div>
                ) : (
                  scheduledPosts.map((post) => (
                    <div
                      key={post.id}
                      className="border border-gray-200 dark:border-gray-600 rounded-lg p-4 bg-gray-50 dark:bg-gray-700"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                            {new Date(post.scheduled_date).toLocaleDateString()} at{' '}
                            {new Date(post.scheduled_date).toLocaleTimeString([], { 
                              hour: '2-digit', 
                              minute: '2-digit' 
                            })}
                          </p>
                          <p className="text-sm text-gray-800 dark:text-gray-200 line-clamp-2">
                            {post.content.substring(0, 100)}...
                          </p>
                        </div>
                        <Badge className={getStatusColor(post.status)}>
                          {post.status}
                        </Badge>
                      </div>

                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => previewPost(post.content)}
                        >
                          <Eye className="w-4 h-4 mr-1" />
                          Preview
                        </Button>
                      </div>

                      {post.status === 'posted' && (
                        <div className="flex items-center gap-2 mt-2 text-green-600 dark:text-green-400">
                          <CheckCircle2 className="w-4 h-4" />
                          <span className="text-sm">Successfully posted to LinkedIn</span>
                        </div>
                      )}
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Preview Dialog */}
      <Dialog open={showPreview} onOpenChange={setShowPreview}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Post Preview</DialogTitle>
          </DialogHeader>
          <div className="mt-4 p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border-l-4 border-blue-500">
            <div className="whitespace-pre-wrap text-gray-800 dark:text-gray-200 leading-relaxed">
              {previewContent}
            </div>
          </div>
          <div className="flex justify-end gap-2 mt-4">
            <Button variant="outline" onClick={() => setShowPreview(false)}>
              Close
            </Button>
            {pendingContent === previewContent && (
              <Button 
                onClick={() => {
                  setShowPreview(false);
                  schedulePost(previewContent);
                }}
                className="bg-green-600 hover:bg-green-700"
                disabled={!selectedDate || !selectedTime}
              >
                <Calendar className="w-4 h-4 mr-2" />
                Schedule Now
              </Button>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
