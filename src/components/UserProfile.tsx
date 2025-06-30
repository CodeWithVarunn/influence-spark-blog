
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { User, Briefcase, Target, Plus, Check, Star, Sparkles } from 'lucide-react';

export const UserProfile = () => {
  const { toast } = useToast();
  const [profileData, setProfileData] = useState({
    fullName: '',
    jobTitle: '',
    company: '',
    location: '',
    experience: '',
    industry: '',
    goals: '',
    interests: [],
    bio: '',
    linkedinUrl: ''
  });
  const [customInterest, setCustomInterest] = useState('');
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    // Load existing profile data
    const savedProfile = localStorage.getItem('userProfile');
    if (savedProfile) {
      try {
        const profile = JSON.parse(savedProfile);
        setProfileData(profile);
        
        // Check if profile is complete
        const isProfileComplete = profile.fullName && profile.jobTitle && profile.company && profile.industry && profile.goals && profile.bio;
        setIsComplete(isProfileComplete);
      } catch (error) {
        console.error('Error loading profile:', error);
      }
    }
  }, []);

  const predefinedInterests = [
    'Leadership', 'Technology', 'Marketing', 'Sales', 'Entrepreneurship',
    'Personal Branding', 'Networking', 'Career Development', 'Innovation',
    'Digital Marketing', 'Data Analytics', 'AI & Machine Learning', 'Startups',
    'Business Strategy', 'Content Creation', 'Remote Work', 'Productivity'
  ];

  const handleInterestToggle = (interest: string) => {
    setProfileData(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }));
  };

  const addCustomInterest = () => {
    if (customInterest.trim() && !profileData.interests.includes(customInterest.trim())) {
      setProfileData(prev => ({
        ...prev,
        interests: [...prev.interests, customInterest.trim()]
      }));
      setCustomInterest('');
    }
  };

  const handleSave = () => {
    // Check if all required fields are filled
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

    // Save to localStorage
    localStorage.setItem('userProfile', JSON.stringify(profileData));
    setIsComplete(true);
    
    toast({
      title: "Profile Completed!",
      description: "Your profile has been saved. We'll use this to personalize your content.",
    });

    // Trigger a refresh of the parent component
    window.dispatchEvent(new CustomEvent('profileCompleted'));
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

  if (isComplete) {
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
    <div className="space-y-8 max-w-4xl mx-auto">
      {/* Progress Card */}
      <Card className="border-0 shadow-2xl bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-blue-900/20 dark:via-indigo-900/20 dark:to-purple-900/20 backdrop-blur-sm">
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

      {/* Personal Information */}
      <Card className="border-0 shadow-xl bg-white dark:bg-gray-800 backdrop-blur-sm">
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
              <Label htmlFor="location" className="text-base font-medium">Location</Label>
              <Input
                id="location"
                value={profileData.location}
                onChange={(e) => setProfileData(prev => ({ ...prev, location: e.target.value }))}
                placeholder="City, Country"
                className="mt-2 h-12 rounded-xl border-2 focus:border-blue-500"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Professional Information */}
      <Card className="border-0 shadow-xl bg-white dark:bg-gray-800 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-gray-900 dark:text-white text-xl">
            <Briefcase className="w-6 h-6 text-green-600" />
            Professional Background
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="experience" className="text-base font-medium">Experience Level</Label>
              <Select onValueChange={(value) => setProfileData(prev => ({ ...prev, experience: value }))}>
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
        </CardContent>
      </Card>

      {/* Interests & Goals */}
      <Card className="border-0 shadow-xl bg-white dark:bg-gray-800 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-gray-900 dark:text-white text-xl">
            <Target className="w-6 h-6 text-purple-600" />
            Interests & Goals
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <Label className="text-base font-medium">Professional Interests</Label>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Select topics you're passionate about or want to create content around
            </p>
            <div className="flex flex-wrap gap-3 mb-4">
              {predefinedInterests.map((interest) => (
                <Badge
                  key={interest}
                  variant={profileData.interests.includes(interest) ? "default" : "outline"}
                  className={`cursor-pointer transition-all rounded-xl px-4 py-2 ${
                    profileData.interests.includes(interest)
                      ? 'bg-blue-600 text-white hover:bg-blue-700'
                      : 'hover:bg-blue-50 dark:hover:bg-blue-900/20 border-2'
                  }`}
                  onClick={() => handleInterestToggle(interest)}
                >
                  {profileData.interests.includes(interest) && <Check className="w-3 h-3 mr-1" />}
                  {interest}
                </Badge>
              ))}
            </div>
            <div className="flex gap-3">
              <Input
                value={customInterest}
                onChange={(e) => setCustomInterest(e.target.value)}
                placeholder="Add custom interest"
                className="flex-1 h-12 rounded-xl border-2"
                onKeyPress={(e) => e.key === 'Enter' && addCustomInterest()}
              />
              <Button onClick={addCustomInterest} variant="outline" className="h-12 px-6 rounded-xl">
                <Plus className="w-4 h-4" />
              </Button>
            </div>
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
          size="lg"
          className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-12 py-4 text-lg font-semibold shadow-2xl hover:shadow-blue-500/25 transition-all transform hover:scale-105 rounded-2xl"
        >
          <Check className="w-6 h-6 mr-3" />
          Complete Profile Setup
        </Button>
      </div>
    </div>
  );
};
