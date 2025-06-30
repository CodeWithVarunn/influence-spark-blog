
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import { useTheme } from '@/contexts/ThemeContext';
import { Settings as SettingsIcon, Bell, Shield, Palette, Save, Trash2 } from 'lucide-react';

export const Settings = () => {
  const { toast } = useToast();
  const { isDark, toggleTheme } = useTheme();
  const [settings, setSettings] = useState({
    linkedinStayConnected: true,
    notifications: {
      email: true,
      push: false,
      contentReady: true,
      scheduledPosts: true
    },
    privacy: {
      profileVisible: true,
      analyticsSharing: false
    },
    preferences: {
      autoSave: true,
      defaultTone: 'professional',
      contentLength: 'medium'
    }
  });

  const handleSave = () => {
    localStorage.setItem('appSettings', JSON.stringify(settings));
    toast({
      title: "Settings Saved!",
      description: "Your preferences have been updated successfully.",
    });
  };

  const handleDeleteAccount = () => {
    if (confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      toast({
        title: "Account Deletion",
        description: "Please contact support to complete account deletion.",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-12 h-12 bg-gradient-to-r from-gray-600 to-gray-800 rounded-xl flex items-center justify-center">
          <SettingsIcon className="w-6 h-6 text-white" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Settings</h1>
          <p className="text-gray-600 dark:text-gray-400">Customize your LinkedUp Content experience</p>
        </div>
      </div>

      {/* LinkedIn Connection */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-blue-600" />
            LinkedIn Connection
          </CardTitle>
          <CardDescription>
            Manage your LinkedIn connection settings
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium">Stay Connected to LinkedIn</h3>
              <p className="text-sm text-gray-500">Keep your LinkedIn connection active for seamless posting</p>
            </div>
            <Switch
              checked={settings.linkedinStayConnected}
              onCheckedChange={(checked) => 
                setSettings(prev => ({ ...prev, linkedinStayConnected: checked }))
              }
            />
          </div>
        </CardContent>
      </Card>

      {/* Notifications */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="w-5 h-5 text-green-600" />
            Notifications
          </CardTitle>
          <CardDescription>
            Choose how you want to be notified
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium">Email Notifications</h3>
              <p className="text-sm text-gray-500">Receive updates via email</p>
            </div>
            <Switch
              checked={settings.notifications.email}
              onCheckedChange={(checked) => 
                setSettings(prev => ({ 
                  ...prev, 
                  notifications: { ...prev.notifications, email: checked }
                }))
              }
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium">Content Ready Alerts</h3>
              <p className="text-sm text-gray-500">Get notified when content is generated</p>
            </div>
            <Switch
              checked={settings.notifications.contentReady}
              onCheckedChange={(checked) => 
                setSettings(prev => ({ 
                  ...prev, 
                  notifications: { ...prev.notifications, contentReady: checked }
                }))
              }
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium">Scheduled Post Alerts</h3>
              <p className="text-sm text-gray-500">Reminders for scheduled posts</p>
            </div>
            <Switch
              checked={settings.notifications.scheduledPosts}
              onCheckedChange={(checked) => 
                setSettings(prev => ({ 
                  ...prev, 
                  notifications: { ...prev.notifications, scheduledPosts: checked }
                }))
              }
            />
          </div>
        </CardContent>
      </Card>

      {/* Appearance */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Palette className="w-5 h-5 text-purple-600" />
            Appearance
          </CardTitle>
          <CardDescription>
            Customize how the app looks and feels
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium">Dark Mode</h3>
              <p className="text-sm text-gray-500">Toggle between light and dark themes</p>
            </div>
            <Switch
              checked={isDark}
              onCheckedChange={toggleTheme}
            />
          </div>
        </CardContent>
      </Card>

      {/* Privacy & Security */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-red-600" />
            Privacy & Security
          </CardTitle>
          <CardDescription>
            Control your privacy and data settings
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium">Profile Visibility</h3>
              <p className="text-sm text-gray-500">Make your profile visible to other users</p>
            </div>
            <Switch
              checked={settings.privacy.profileVisible}
              onCheckedChange={(checked) => 
                setSettings(prev => ({ 
                  ...prev, 
                  privacy: { ...prev.privacy, profileVisible: checked }
                }))
              }
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium">Auto-Save Drafts</h3>
              <p className="text-sm text-gray-500">Automatically save your work</p>
            </div>
            <Switch
              checked={settings.preferences.autoSave}
              onCheckedChange={(checked) => 
                setSettings(prev => ({ 
                  ...prev, 
                  preferences: { ...prev.preferences, autoSave: checked }
                }))
              }
            />
          </div>
        </CardContent>
      </Card>

      {/* Danger Zone */}
      <Card className="border-0 shadow-lg border-red-200 dark:border-red-800">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-red-600">
            <Trash2 className="w-5 h-5" />
            Danger Zone
          </CardTitle>
          <CardDescription>
            Irreversible and destructive actions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button 
            variant="destructive" 
            onClick={handleDeleteAccount}
            className="w-full"
          >
            Delete Account
          </Button>
          <p className="text-sm text-gray-500 mt-2 text-center">
            This action cannot be undone. All your data will be permanently deleted.
          </p>
        </CardContent>
      </Card>

      {/* Save Button */}
      <div className="flex justify-center pt-6">
        <Button 
          onClick={handleSave}
          size="lg"
          className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-3 shadow-lg"
        >
          <Save className="w-5 h-5 mr-2" />
          Save All Settings
        </Button>
      </div>
    </div>
  );
};
