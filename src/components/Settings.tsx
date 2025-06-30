
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { 
  Bell, 
  Shield, 
  Palette,
  Globe,
  Download,
  Trash2,
  User,
  LogOut
} from 'lucide-react';

export const Settings = () => {
  const { toast } = useToast();
  const { signOut, user } = useAuth();
  const [settings, setSettings] = useState({
    notifications: true,
    emailUpdates: false,
    darkMode: false,
    autoSchedule: true,
    dataExport: false
  });

  const handleSettingChange = (key: string, value: boolean) => {
    setSettings(prev => ({ ...prev, [key]: value }));
    toast({
      title: "Settings updated",
      description: `${key} has been ${value ? 'enabled' : 'disabled'}`,
    });
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      toast({
        title: "Signed out successfully",
        description: "You have been logged out of your account",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to sign out. Please try again.",
        variant: "destructive",
      });
    }
  };

  const exportData = () => {
    toast({
      title: "Export started",
      description: "Your data export will be ready shortly",
    });
  };

  const deleteAccount = () => {
    toast({
      title: "Account deletion",
      description: "Please contact support to delete your account",
      variant: "destructive",
    });
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* User Info */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <User className="w-6 h-6 text-blue-600" />
            Account Information
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <Label className="text-sm font-medium text-gray-600 dark:text-gray-400">Email</Label>
              <p className="text-lg font-medium">{user?.email}</p>
            </div>
            <div>
              <Label className="text-sm font-medium text-gray-600 dark:text-gray-400">Account Status</Label>
              <p className="text-green-600 font-medium">Active</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Notifications */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <Bell className="w-6 h-6 text-green-600" />
            Notifications
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="notifications" className="text-base font-medium">Push Notifications</Label>
              <p className="text-sm text-gray-600 dark:text-gray-400">Receive notifications about scheduled posts</p>
            </div>
            <Switch
              id="notifications"
              checked={settings.notifications}
              onCheckedChange={(checked) => handleSettingChange('notifications', checked)}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="email-updates" className="text-base font-medium">Email Updates</Label>
              <p className="text-sm text-gray-600 dark:text-gray-400">Get weekly content performance reports</p>
            </div>
            <Switch
              id="email-updates"
              checked={settings.emailUpdates}
              onCheckedChange={(checked) => handleSettingChange('emailUpdates', checked)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Preferences */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <Palette className="w-6 h-6 text-purple-600" />
            Preferences
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="auto-schedule" className="text-base font-medium">Auto-Schedule Posts</Label>
              <p className="text-sm text-gray-600 dark:text-gray-400">Automatically schedule posts at optimal times</p>
            </div>
            <Switch
              id="auto-schedule"
              checked={settings.autoSchedule}
              onCheckedChange={(checked) => handleSettingChange('autoSchedule', checked)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Privacy & Security */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <Shield className="w-6 h-6 text-red-600" />
            Privacy & Security
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button
            onClick={exportData}
            variant="outline"
            className="w-full justify-start"
          >
            <Download className="w-4 h-4 mr-2" />
            Export My Data
          </Button>
          
          <Button
            onClick={deleteAccount}
            variant="destructive"
            className="w-full justify-start"
          >
            <Trash2 className="w-4 h-4 mr-2" />
            Delete Account
          </Button>
        </CardContent>
      </Card>

      {/* Sign Out */}
      <Card className="border-0 shadow-lg">
        <CardContent className="pt-6">
          <Button
            onClick={handleSignOut}
            variant="outline"
            size="lg"
            className="w-full border-red-200 text-red-600 hover:bg-red-50 dark:border-red-800 dark:text-red-400 dark:hover:bg-red-900/20"
          >
            <LogOut className="w-5 h-5 mr-2" />
            Sign Out
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};
