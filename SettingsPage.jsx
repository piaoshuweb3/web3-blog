import { useState } from 'react'
// import { useWeb3ModalAccount } from '@web3modal/ethers/react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { 
  User, 
  Bell, 
  Shield, 
  Palette, 
  Save,
  Upload
} from 'lucide-react'

export function SettingsPage() {
  // const { address, isConnected } = useWeb3ModalAccount()
  const address = '0x1234567890123456789012345678901234567890'
  const isConnected = true
  const [profile, setProfile] = useState({
    username: '',
    bio: '',
    avatar: '',
    website: '',
    twitter: '',
    github: ''
  })
  
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    comments: true,
    likes: true,
    follows: true
  })

  const [privacy, setPrivacy] = useState({
    publicProfile: true,
    showEmail: false,
    showWallet: true
  })

  if (!isConnected) {
    return (
      <div className="max-w-2xl mx-auto text-center py-12">
        <h1 className="text-3xl font-bold mb-4">Connect Your Wallet</h1>
        <p className="text-muted-foreground mb-8">
          You need to connect your wallet to access settings.
        </p>
        <Button onClick={() => window.location.href = '/'}>
          Go Back Home
        </Button>
      </div>
    )
  }

  const handleProfileUpdate = (field, value) => {
    setProfile(prev => ({ ...prev, [field]: value }))
  }

  const handleNotificationUpdate = (field, value) => {
    setNotifications(prev => ({ ...prev, [field]: value }))
  }

  const handlePrivacyUpdate = (field, value) => {
    setPrivacy(prev => ({ ...prev, [field]: value }))
  }

  const saveSettings = () => {
    // 保存设置逻辑
    console.log('Saving settings:', { profile, notifications, privacy })
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Settings</h1>
        <p className="text-muted-foreground">
          Manage your account settings and preferences.
        </p>
      </div>

      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="profile" className="flex items-center gap-2">
            <User className="w-4 h-4" />
            Profile
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center gap-2">
            <Bell className="w-4 h-4" />
            Notifications
          </TabsTrigger>
          <TabsTrigger value="privacy" className="flex items-center gap-2">
            <Shield className="w-4 h-4" />
            Privacy
          </TabsTrigger>
          <TabsTrigger value="appearance" className="flex items-center gap-2">
            <Palette className="w-4 h-4" />
            Appearance
          </TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <Card>
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Avatar */}
              <div className="flex items-center space-x-4">
                <Avatar className="w-20 h-20">
                  <AvatarImage src={profile.avatar} />
                  <AvatarFallback>
                    {profile.username.charAt(0) || 'U'}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <Button variant="outline" className="flex items-center gap-2">
                    <Upload className="w-4 h-4" />
                    Upload Avatar
                  </Button>
                  <p className="text-sm text-muted-foreground mt-1">
                    JPG, PNG or GIF. Max size 2MB.
                  </p>
                </div>
              </div>

              {/* Basic Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="username">Username</Label>
                  <Input
                    id="username"
                    value={profile.username}
                    onChange={(e) => handleProfileUpdate('username', e.target.value)}
                    placeholder="Enter your username"
                  />
                </div>
                <div>
                  <Label htmlFor="website">Website</Label>
                  <Input
                    id="website"
                    value={profile.website}
                    onChange={(e) => handleProfileUpdate('website', e.target.value)}
                    placeholder="https://yourwebsite.com"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  id="bio"
                  value={profile.bio}
                  onChange={(e) => handleProfileUpdate('bio', e.target.value)}
                  placeholder="Tell us about yourself..."
                  rows={3}
                />
              </div>

              {/* Social Links */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="twitter">Twitter</Label>
                  <Input
                    id="twitter"
                    value={profile.twitter}
                    onChange={(e) => handleProfileUpdate('twitter', e.target.value)}
                    placeholder="@username"
                  />
                </div>
                <div>
                  <Label htmlFor="github">GitHub</Label>
                  <Input
                    id="github"
                    value={profile.github}
                    onChange={(e) => handleProfileUpdate('github', e.target.value)}
                    placeholder="username"
                  />
                </div>
              </div>

              {/* Wallet Info */}
              <div>
                <Label>Connected Wallet</Label>
                <div className="mt-1 p-3 bg-muted rounded-md">
                  <p className="font-mono text-sm">{address}</p>
                </div>
              </div>

              <Button onClick={saveSettings} className="flex items-center gap-2">
                <Save className="w-4 h-4" />
                Save Profile
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Email Notifications</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive notifications via email
                    </p>
                  </div>
                  <Switch
                    checked={notifications.email}
                    onCheckedChange={(checked) => handleNotificationUpdate('email', checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>Push Notifications</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive push notifications in browser
                    </p>
                  </div>
                  <Switch
                    checked={notifications.push}
                    onCheckedChange={(checked) => handleNotificationUpdate('push', checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>Comments</Label>
                    <p className="text-sm text-muted-foreground">
                      Notify when someone comments on your posts
                    </p>
                  </div>
                  <Switch
                    checked={notifications.comments}
                    onCheckedChange={(checked) => handleNotificationUpdate('comments', checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>Likes</Label>
                    <p className="text-sm text-muted-foreground">
                      Notify when someone likes your posts
                    </p>
                  </div>
                  <Switch
                    checked={notifications.likes}
                    onCheckedChange={(checked) => handleNotificationUpdate('likes', checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>New Followers</Label>
                    <p className="text-sm text-muted-foreground">
                      Notify when someone follows you
                    </p>
                  </div>
                  <Switch
                    checked={notifications.follows}
                    onCheckedChange={(checked) => handleNotificationUpdate('follows', checked)}
                  />
                </div>
              </div>

              <Button onClick={saveSettings} className="flex items-center gap-2">
                <Save className="w-4 h-4" />
                Save Preferences
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="privacy">
          <Card>
            <CardHeader>
              <CardTitle>Privacy Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Public Profile</Label>
                    <p className="text-sm text-muted-foreground">
                      Make your profile visible to everyone
                    </p>
                  </div>
                  <Switch
                    checked={privacy.publicProfile}
                    onCheckedChange={(checked) => handlePrivacyUpdate('publicProfile', checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>Show Email</Label>
                    <p className="text-sm text-muted-foreground">
                      Display your email address on profile
                    </p>
                  </div>
                  <Switch
                    checked={privacy.showEmail}
                    onCheckedChange={(checked) => handlePrivacyUpdate('showEmail', checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>Show Wallet Address</Label>
                    <p className="text-sm text-muted-foreground">
                      Display your wallet address on profile
                    </p>
                  </div>
                  <Switch
                    checked={privacy.showWallet}
                    onCheckedChange={(checked) => handlePrivacyUpdate('showWallet', checked)}
                  />
                </div>
              </div>

              <Button onClick={saveSettings} className="flex items-center gap-2">
                <Save className="w-4 h-4" />
                Save Settings
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="appearance">
          <Card>
            <CardHeader>
              <CardTitle>Appearance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <Palette className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">Theme Settings</h3>
                <p className="text-muted-foreground">
                  Theme settings are available in the header. More customization options coming soon.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

