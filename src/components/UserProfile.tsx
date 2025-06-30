
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { User, Briefcase, GraduationCap, Target, Plus, Check, Building, MapPin } from 'lucide-react';

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
    // Save to localStorage or send to backend
    localStorage.setItem('userProfile', JSON.stringify(profileData));
    setIsComplete(true);
    toast({
      title: "Profile Updated!",
      description: "Your profile has been saved. We'll use this to personalize your content.",
    });
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

  return (
    <div className="space-y-6">
      {/* Progress Card */}
      <Card className="border-0 shadow-lg bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center">
                <User className="w-6 h-6 text-white" />
              </div>
              <div>
                <CardTitle className="text-gray-900 dark:text-white">Complete Your Profile</CardTitle>
                <CardDescription className="text-gray-600 dark:text-gray-300">
                  Help us create personalized content for you
                </CardDescription>
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-blue-600">{completionPercentage()}%</div>
              <div className="text-sm text-gray-500">Complete</div>
            </div>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2 mt-4">
            <div 
              className="bg-gradient-to-r from-blue-600 to-indigo-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${completionPercentage()}%` }}
            ></div>
          </div>
        </CardHeader>
      </Card>

      {/* Personal Information */}
      <Card className="border-0 shadow-lg bg-white dark:bg-gray-800">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-gray-900 dark:text-white">
            <User className="w-5 h-5 text-blue-600" />
            Personal Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="fullName">Full Name *</Label>
              <Input
                id="fullName"
                value={profileData.fullName}
                onChange={(e) => setProfileData(prev => ({ ...prev, fullName: e.target.value }))}
                placeholder="Enter your full name"
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                value={profileData.location}
                onChange={(e) => setProfileData(prev => ({ ...prev, location: e.target.value }))}
                placeholder="City, Country"
                className="mt-1"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Professional Information */}
      <Card className="border-0 shadow-lg bg-white dark:bg-gray-800">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-gray-900 dark:text-white">
            <Briefcase className="w-5 h-5 text-green-600" />
            Professional Background
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="jobTitle">Current Role *</Label>
              <Input
                id="jobTitle"
                value={profileData.jobTitle}
                onChange={(e) => setProfileData(prev => ({ ...prev, jobTitle: e.target.value }))}
                placeholder="e.g., Marketing Manager, Student, Entrepreneur"
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="company">Company/Institution *</Label>
              <Input
                id="company"
                value={profileData.company}
                onChange={(e) => setProfileData(prev => ({ ...prev, company: e.target.value }))}
                placeholder="e.g., Google, Harvard University, Self-employed"
                className="mt-1"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="experience">Experience Level</Label>
              <Select onValueChange={(value) => setProfileData(prev => ({ ...prev, experience: value }))}>
                <SelectTrigger className="mt-1">
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
              <Label htmlFor="industry">Industry *</Label>
              <Select onValueChange={(value) => setProfileData(prev => ({ ...prev, industry: value }))}>
                <SelectTrigger className="mt-1">
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
      <Card className="border-0 shadow-lg bg-white dark:bg-gray-800">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-gray-900 dark:text-white">
            <Target className="w-5 h-5 text-purple-600" />
            Interests & Goals
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <Label>Professional Interests</Label>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
              Select topics you're passionate about or want to create content around
            </p>
            <div className="flex flex-wrap gap-2 mb-4">
              {predefinedInterests.map((interest) => (
                <Badge
                  key={interest}
                  variant={profileData.interests.includes(interest) ? "default" : "outline"}
                  className={`cursor-pointer transition-all ${
                    profileData.interests.includes(interest)
                      ? 'bg-blue-600 text-white hover:bg-blue-700'
                      : 'hover:bg-blue-50 dark:hover:bg-blue-900/20'
                  }`}
                  onClick={() => handleInterestToggle(interest)}
                >
                  {profileData.interests.includes(interest) && <Check className="w-3 h-3 mr-1" />}
                  {interest}
                </Badge>
              ))}
            </div>
            <div className="flex gap-2">
              <Input
                value={customInterest}
                onChange={(e) => setCustomInterest(e.target.value)}
                placeholder="Add custom interest"
                className="flex-1"
                onKeyPress={(e) => e.key === 'Enter' && addCustomInterest()}
              />
              <Button onClick={addCustomInterest} variant="outline" size="sm">
                <Plus className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <div>
            <Label htmlFor="goals">Professional Goals *</Label>
            <Textarea
              id="goals"
              value={profileData.goals}
              onChange={(e) => setProfileData(prev => ({ ...prev, goals: e.target.value }))}
              placeholder="What are your main professional goals? What do you want to achieve with your LinkedIn presence?"
              rows={3}
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="bio">Bio/About *</Label>
            <Textarea
              id="bio"
              value={profileData.bio}
              onChange={(e) => setProfileData(prev => ({ ...prev, bio: e.target.value }))}
              placeholder="Tell us about yourself, your expertise, and what makes you unique..."
              rows={4}
              className="mt-1"
            />
          </div>
        </CardContent>
      </Card>

      {/* Save Button */}
      <div className="flex justify-center">
        <Button 
          onClick={handleSave}
          size="lg"
          className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-3 shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
        >
          {isComplete ? (
            <>
              <Check className="w-5 h-5 mr-2" />
              Profile Saved
            </>
          ) : (
            <>
              <User className="w-5 h-5 mr-2" />
              Save Profile
            </>
          )}
        </Button>
      </div>
    </div>
  );
};
