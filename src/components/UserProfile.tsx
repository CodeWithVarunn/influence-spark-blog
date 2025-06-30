
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { User, Briefcase, Target, Check, Star, Sparkles } from 'lucide-react';

export const UserProfile = () => {
  const { toast } = useToast();
  const { user } = useAuth();
  const [profileData, setProfileData] = useState({
    fullName: '',
    jobTitle: '',
    company: '',
    industry: '',
    experienceLevel: '',
    goals: '',
    bio: '',
  });
  const [isComplete, setIsComplete] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadProfile();
  }, [user]);

  const loadProfile = async () => {
    if (!user) return;
    
    try {
      const { data, error } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('user_id', user.id)
        .single();
      
      if (error && error.code !== 'PGRST116') {
        console.error('Error loading profile:', error);
        return;
      }
      
      if (data) {
        setProfileData({
          fullName: data.full_name || '',
          jobTitle: data.job_title || '',
          company: data.company || '',
          industry: data.industry || '',
          experienceLevel: data.experience_level || '',
          goals: data.goals || '',
          bio: data.bio || '',
        });
        setIsComplete(data.is_complete || false);
      }
    } catch (error) {
      console.error('Error loading profile:', error);
    }
  };

  const handleSave = async () => {
    if (!user) return;

    const requiredFields = [
      profileData.fullName,
      profileData.jobTitle,
      profileData.company,
      profileData.industry,
      profileData.goals,
      profileData.bio
    ];
    
    const allFieldsFilled = requiredFields.every(field => field.trim() !== '');
    
    if (!allFieldsFilled) {
      toast({
        title: "Please fill all required fields",
        description: "Complete all marked fields to save your profile.",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    
    try {
      const { error } = await supabase
        .from('user_profiles')
        .upsert({
          user_id: user.id,
          full_name: profileData.fullName,
          job_title: profileData.jobTitle,
          company: profileData.company,
          industry: profileData.industry,
          experience_level: profileData.experienceLevel,
          goals: profileData.goals,
          bio: profileData.bio,
          is_complete: true,
          updated_at: new Date().toISOString(),
        });

      if (error) {
        throw error;
      }

      setIsComplete(true);
      
      toast({
        title: "Profile Completed!",
        description: "Your profile has been saved successfully.",
      });

      // Trigger a refresh of the parent component
      window.dispatchEvent(new CustomEvent('profileCompleted'));
    } catch (error) {
      console.error('Error saving profile:', error);
      toast({
        title: "Error",
        description: "Failed to save profile. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const completionPercentage = () => {
    const fields = [
      profileData.fullName,
      profileData.jobTitle,
      profileData.company,
      profileData.industry,
      profileData.goals,
      profileData.bio
    ];
    const completed = fields.filter(field => field.trim() !== '').length;
    return Math.round((completed / fields.length) * 100);
  };

  if (isComplete && window.location.pathname !== '/profile') {
    return (
      <div className="text-center py-16">
        <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
          <Check className="w-10 h-10 text-white" />
        </div>
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Profile Complete!</h2>
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-6 max-w-md mx-auto">
          Your profile is all set up. You can now access all features and start creating amazing content!
        </p>
        <div className="flex items-center justify-center gap-2 text-green-600 dark:text-green-400">
          <Star className="w-5 h-5 fill-current" />
          <span className="font-medium">Ready to create content</span>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-4xl mx-auto p-6">
      {/* Progress Card */}
      <Card className="border-0 shadow-2xl bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-blue-900/20 dark:via-indigo-900/20 dark:to-purple-900/20">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center shadow-xl">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
              <div>
                <CardTitle className="text-2xl text-gray-900 dark:text-white">Complete Your Profile</CardTitle>
                <CardDescription className="text-lg text-gray-600 dark:text-gray-300">
                  Help us create personalized content just for you
                </CardDescription>
              </div>
            </div>
            <div className="text-right">
              <div className="text-4xl font-bold text-blue-600">{completionPercentage()}%</div>
              <div className="text-sm text-gray-500">Complete</div>
            </div>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 mt-6">
            <div 
              className="bg-gradient-to-r from-blue-600 to-indigo-600 h-3 rounded-full transition-all duration-500 shadow-lg"
              style={{ width: `${completionPercentage()}%` }}
            ></div>
          </div>
        </CardHeader>
      </Card>

      {/* Form */}
      <Card className="border-0 shadow-xl bg-white dark:bg-gray-800">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-gray-900 dark:text-white text-xl">
            <User className="w-6 h-6 text-blue-600" />
            Personal Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="fullName" className="text-base font-medium">Full Name *</Label>
              <Input
                id="fullName"
                value={profileData.fullName}
                onChange={(e) => setProfileData(prev => ({ ...prev, fullName: e.target.value }))}
                placeholder="Enter your full name"
                className="mt-2 h-12 rounded-xl border-2 focus:border-blue-500"
                required
              />
            </div>
            <div>
              <Label htmlFor="jobTitle" className="text-base font-medium">Current Role *</Label>
              <Input
                id="jobTitle"
                value={profileData.jobTitle}
                onChange={(e) => setProfileData(prev => ({ ...prev, jobTitle: e.target.value }))}
                placeholder="e.g., Marketing Manager, Student, Entrepreneur"
                className="mt-2 h-12 rounded-xl border-2 focus:border-blue-500"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="company" className="text-base font-medium">Company/Institution *</Label>
              <Input
                id="company"
                value={profileData.company}
                onChange={(e) => setProfileData(prev => ({ ...prev, company: e.target.value }))}
                placeholder="e.g., Google, Harvard University, Self-employed"
                className="mt-2 h-12 rounded-xl border-2 focus:border-blue-500"
                required
              />
            </div>
            <div>
              <Label htmlFor="industry" className="text-base font-medium">Industry *</Label>
              <Select onValueChange={(value) => setProfileData(prev => ({ ...prev, industry: value }))}>
                <SelectTrigger className="mt-2 h-12 rounded-xl border-2">
                  <SelectValue placeholder="Select your industry" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="technology">Technology</SelectItem>
                  <SelectItem value="finance">Finance</SelectItem>
                  <SelectItem value="healthcare">Healthcare</SelectItem>
                  <SelectItem value="education">Education</SelectItem>
                  <SelectItem value="marketing">Marketing</SelectItem>
                  <SelectItem value="consulting">Consulting</SelectItem>
                  <SelectItem value="retail">Retail</SelectItem>
                  <SelectItem value="manufacturing">Manufacturing</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label htmlFor="experienceLevel" className="text-base font-medium">Experience Level</Label>
            <Select onValueChange={(value) => setProfileData(prev => ({ ...prev, experienceLevel: value }))}>
              <SelectTrigger className="mt-2 h-12 rounded-xl border-2">
                <SelectValue placeholder="Select your experience level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="student">Student</SelectItem>
                <SelectItem value="entry">Entry Level (0-2 years)</SelectItem>
                <SelectItem value="mid">Mid Level (3-5 years)</SelectItem>
                <SelectItem value="senior">Senior Level (6-10 years)</SelectItem>
                <SelectItem value="executive">Executive (10+ years)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="goals" className="text-base font-medium">Professional Goals *</Label>
            <Textarea
              id="goals"
              value={profileData.goals}
              onChange={(e) => setProfileData(prev => ({ ...prev, goals: e.target.value }))}
              placeholder="What are your main professional goals? What do you want to achieve with your LinkedIn presence?"
              rows={4}
              className="mt-2 rounded-xl border-2 focus:border-blue-500"
              required
            />
          </div>

          <div>
            <Label htmlFor="bio" className="text-base font-medium">Bio/About *</Label>
            <Textarea
              id="bio"
              value={profileData.bio}
              onChange={(e) => setProfileData(prev => ({ ...prev, bio: e.target.value }))}
              placeholder="Tell us about yourself, your expertise, and what makes you unique..."
              rows={5}
              className="mt-2 rounded-xl border-2 focus:border-blue-500"
              required
            />
          </div>
        </CardContent>
      </Card>

      {/* Save Button */}
      <div className="flex justify-center pt-8">
        <Button 
          onClick={handleSave}
          disabled={loading}
          size="lg"
          className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-12 py-4 text-lg font-semibold shadow-2xl hover:shadow-blue-500/25 transition-all transform hover:scale-105 rounded-2xl"
        >
          <Check className="w-6 h-6 mr-3" />
          {loading ? 'Saving...' : 'Complete Profile Setup'}
        </Button>
      </div>
    </div>
  );
};
