'use client';

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Checkbox } from "@/components/ui/checkbox"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { BarChart3, Camera, Edit, MessageSquare, Settings, User } from "lucide-react"
import { getCurrentUser } from "@/lib/api/authService"
import { updateProfile, getUserConnections } from "@/lib/api/userService"
import { getUserWorkouts, getWorkoutStats } from "@/lib/api/workoutService"

export default function Profile() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [connections, setConnections] = useState([]);
  const [workouts, setWorkouts] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    username: '',
    bio: '',
    primaryGoal: 'strength',
    fitnessLevel: 'intermediate'
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const userData = await getCurrentUser();
        const connectionsData = await getUserConnections();
        const workoutsData = await getUserWorkouts();
        const statsData = await getWorkoutStats();

        setUser(userData.user);
        setConnections(connectionsData);
        setWorkouts(workoutsData.workouts);
        setStats(statsData);

        setFormData({
          firstName: userData.user.firstName || '',
          lastName: userData.user.lastName || '',
          email: userData.user.email || '',
          username: userData.user.username || '',
          bio: userData.user.bio || '',
          primaryGoal: userData.user.primaryGoal || 'strength',
          fitnessLevel: userData.user.fitnessLevel || 'intermediate'
        });
      } catch (err) {
        console.error('Error fetching profile data:', err);
        setError('Failed to load profile data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const [isSubmitting1, setIsSubmitting1] = useState(false);
  const [isSubmitting2, setIsSubmitting2] = useState(false);
  const handleSubmit1 = async () => {
    try {
      setIsSubmitting1(true);
      await updateProfile(formData);
      // Refresh user data after update
      const userData = await getCurrentUser();
      setUser(userData.user);
    } catch (err) {
      console.error('Error updating profile:', err);
      setError('Failed to update profile');
    } finally {
      setIsSubmitting1(false);
    }
  };
  const handleSubmit2 = async () => {
    try {
      setIsSubmitting2(true);
      await updateProfile(formData);
      // Refresh user data after update
      const userData = await getCurrentUser();
      setUser(userData.user);
    } catch (err) {
      console.error('Error updating profile:', err);
      setError('Failed to update profile');
    } finally {
      setIsSubmitting2(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading your profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-10 border-b bg-background">
        <div className="container flex h-16 items-center justify-between px-4 md:px-6">
          <Link href="/" className="flex items-center gap-2">
            <BarChart3 className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">FitConnect</span>
          </Link>
          <nav className="hidden md:flex gap-6">
            <Link href="/dashboard" className="text-sm font-medium hover:text-primary">
              Dashboard
            </Link>
            <Link href="/dashboard/workouts" className="text-sm font-medium hover:text-primary">
              Workouts
            </Link>
            <Link href="/dashboard/community" className="text-sm font-medium hover:text-primary">
              Community
            </Link>
            <Link href="/dashboard/progress" className="text-sm font-medium hover:text-primary">
              Progress
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link href="/dashboard/messages" className="relative">
              <MessageSquare className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-medium text-primary-foreground">
                {connections?.length || 0}
              </span>
            </Link>
            <Link href="/dashboard/profile">
              <div className="relative h-8 w-8 overflow-hidden rounded-full border-2 border-primary">
                <Image
                  src={user?.profileImage || "/mike-profile.png"}
                  width={32}
                  height={32}
                  alt="Profile"
                  className="object-cover"
                />
              </div>
            </Link>
          </div>
        </div>
      </header>
      <main className="flex-1 py-6 md:py-8 lg:py-10">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col gap-8 md:flex-row md:gap-12">
            <div className="md:w-1/3">
              <Card>
                <CardHeader className="relative pb-0">
                  <div className="absolute right-4 top-4">
                    <Button size="icon" variant="ghost">
                      <Edit className="h-4 w-4" />
                      <span className="sr-only">Edit profile</span>
                    </Button>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="relative mb-4 h-24 w-24">
                      <Image
                        src={user?.profileImage || "/mike-profile.png"}
                        width={96}
                        height={96}
                        alt="Profile"
                        className="rounded-full object-cover"
                      />
                      <Button size="icon" variant="outline" className="absolute -right-2 bottom-0 h-8 w-8 rounded-full">
                        <Camera className="h-4 w-4" />
                        <span className="sr-only">Upload photo</span>
                      </Button>
                    </div>
                    <CardTitle>{user?.firstName} {user?.lastName}</CardTitle>
                    <CardDescription>@{user?.username}</CardDescription>
                  </div>
                </CardHeader>
                <CardContent className="text-center">
                  <div className="mt-4 flex justify-center gap-2">
                    <Badge>{user?.primaryGoal || 'Strength Training'}</Badge>
                    <Badge>{user?.fitnessLevel || 'Intermediate'}</Badge>
                  </div>
                  <div className="mt-6 grid grid-cols-3 gap-4 text-center">
                    <div>
                      <div className="text-xl font-bold">{workouts?.length || 0}</div>
                      <div className="text-xs text-muted-foreground">Workouts</div>
                    </div>
                    <div>
                      <div className="text-xl font-bold">{connections?.length || 0}</div>
                      <div className="text-xs text-muted-foreground">Buddies</div>
                    </div>
                    <div>
                      <div className="text-xl font-bold">{stats?.groupCount || 0}</div>
                      <div className="text-xs text-muted-foreground">Groups</div>
                    </div>
                  </div>
                  <div className="mt-6">
                    <p className="text-sm text-muted-foreground">
                      {user?.bio || 'No bio available'}
                    </p>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-center gap-4">
                  <Button variant="outline" size="sm">
                    <User className="mr-2 h-4 w-4" />
                    View Public Profile
                  </Button>
                  <Button variant="outline" size="sm">
                    <Settings className="mr-2 h-4 w-4" />
                    Settings
                  </Button>
                </CardFooter>
              </Card>
            </div>
            <div className="flex-1">
              <Tabs defaultValue="profile" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="profile">Profile</TabsTrigger>
                  <TabsTrigger value="preferences">Preferences</TabsTrigger>
                  <TabsTrigger value="privacy">Privacy</TabsTrigger>
                </TabsList>
                <TabsContent value="profile" className="space-y-4 pt-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Personal Information</CardTitle>
                      <CardDescription>Update your personal details</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="firstName">First name</Label>
                          <Input 
                            id="firstName" 
                            value={formData.firstName}
                            onChange={handleInputChange}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="lastName">Last name</Label>
                          <Input 
                            id="lastName" 
                            value={formData.lastName}
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input 
                          id="email" 
                          type="email" 
                          value={formData.email}
                          disabled
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="username">Username</Label>
                        <Input 
                          id="username" 
                          value={formData.username}
                          disabled
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="bio">Bio</Label>
                        <Textarea
                          id="bio"
                          value={formData.bio}
                          onChange={handleInputChange}
                        />
                      </div>
                    </CardContent>
                    <CardFooter>
                    <Button
                        onClick={handleSubmit1}
                        disabled={isSubmitting1}
                      >
                        {isSubmitting1 ? (
                          <div className="flex items-center gap-2">
                            Save Changes
                            <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"></div>
                          </div>
                        ) : (
                          'Save Changes'
                        )}
                      </Button>
                    </CardFooter>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle>Fitness Goals</CardTitle>
                      <CardDescription>Set your fitness goals and preferences</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="primaryGoal">Primary Goal</Label>
                        <select
                          id="primaryGoal"
                          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                          value={formData.primaryGoal}
                          onChange={handleInputChange}
                        >
                          <option value="strength">Build Strength</option>
                          <option value="weight-loss">Weight Loss</option>
                          <option value="endurance">Improve Endurance</option>
                          <option value="flexibility">Increase Flexibility</option>
                          <option value="general">General Fitness</option>
                        </select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="fitnessLevel">Fitness Level</Label>
                        <select
                          id="fitnessLevel"
                          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                          value={formData.fitnessLevel}
                          onChange={handleInputChange}
                        >
                          <option value="beginner">Beginner</option>
                          <option value="intermediate">Intermediate</option>
                          <option value="advanced">Advanced</option>
                        </select>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button
                        onClick={handleSubmit2}
                        disabled={isSubmitting2}
                      >
                        {isSubmitting2 ? (
                          <div className="flex items-center gap-2">
                            Save Changes
                            <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"></div>
                          </div>
                        ) : (
                          'Save Changes'
                        )}
                      </Button>
                    </CardFooter>
                  </Card>
                </TabsContent>
                <TabsContent value="preferences" className="space-y-4 pt-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>App Preferences</CardTitle>
                      <CardDescription>Customize your app experience</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="dark-mode">Dark Mode</Label>
                          <p className="text-sm text-muted-foreground">Switch between light and dark themes</p>
                        </div>
                        <Switch id="dark-mode" />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="notifications">Push Notifications</Label>
                          <p className="text-sm text-muted-foreground">
                            Receive notifications about your workouts and connections
                          </p>
                        </div>
                        <Switch id="notifications" defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="email-notifications">Email Notifications</Label>
                          <p className="text-sm text-muted-foreground">Receive email updates about your account</p>
                        </div>
                        <Switch id="email-notifications" defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="workout-reminders">Workout Reminders</Label>
                          <p className="text-sm text-muted-foreground">Get reminders before scheduled workouts</p>
                        </div>
                        <Switch id="workout-reminders" defaultChecked />
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button>Save Preferences</Button>
                    </CardFooter>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle>Units & Measurements</CardTitle>
                      <CardDescription>Set your preferred units for measurements</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="weight-unit">Weight Unit</Label>
                        <select
                          id="weight-unit"
                          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                          defaultValue="kg"
                        >
                          <option value="kg">Kilograms (kg)</option>
                          <option value="lb">Pounds (lb)</option>
                        </select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="distance-unit">Distance Unit</Label>
                        <select
                          id="distance-unit"
                          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                          defaultValue="km"
                        >
                          <option value="km">Kilometers (km)</option>
                          <option value="mi">Miles (mi)</option>
                        </select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="height-unit">Height Unit</Label>
                        <select
                          id="height-unit"
                          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                          defaultValue="cm"
                        >
                          <option value="cm">Centimeters (cm)</option>
                          <option value="ft">Feet/Inches (ft/in)</option>
                        </select>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button>Save Units</Button>
                    </CardFooter>
                  </Card>
                </TabsContent>
                <TabsContent value="privacy" className="space-y-4 pt-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Privacy Settings</CardTitle>
                      <CardDescription>Control who can see your profile and activity</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="profile-visibility">Profile Visibility</Label>
                        <select
                          id="profile-visibility"
                          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                          defaultValue="public"
                        >
                          <option value="public">Public - Anyone can view your profile</option>
                          <option value="connections">
                            Connections Only - Only your connections can view your profile
                          </option>
                          <option value="private">Private - Only you can view your profile</option>
                        </select>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="activity-sharing">Activity Sharing</Label>
                          <p className="text-sm text-muted-foreground">
                            Share your workout activities with connections
                          </p>
                        </div>
                        <Switch id="activity-sharing" defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="progress-sharing">Progress Sharing</Label>
                          <p className="text-sm text-muted-foreground">Share your fitness progress with connections</p>
                        </div>
                        <Switch id="progress-sharing" defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="location-sharing">Location Sharing</Label>
                          <p className="text-sm text-muted-foreground">
                            Allow others to see your general location for nearby workouts
                          </p>
                        </div>
                        <Switch id="location-sharing" />
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button>Save Privacy Settings</Button>
                    </CardFooter>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle>Account Security</CardTitle>
                      <CardDescription>Manage your account security settings</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="current-password">Current Password</Label>
                        <Input id="current-password" type="password" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="new-password">New Password</Label>
                        <Input id="new-password" type="password" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="confirm-password">Confirm New Password</Label>
                        <Input id="confirm-password" type="password" />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="two-factor">Two-Factor Authentication</Label>
                          <p className="text-sm text-muted-foreground">
                            Add an extra layer of security to your account
                          </p>
                        </div>
                        <Switch id="two-factor" />
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button>Update Security Settings</Button>
                    </CardFooter>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle>Data Management</CardTitle>
                      <CardDescription>Manage your account data and information</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Button variant="outline" className="w-full">
                          Export Your Data
                        </Button>
                        <p className="text-xs text-muted-foreground">
                          Download all your personal data and workout history
                        </p>
                      </div>
                      <div className="space-y-2">
                        <Button variant="outline" className="w-full">
                          Delete Workout History
                        </Button>
                        <p className="text-xs text-muted-foreground">Remove all your workout records and history</p>
                      </div>
                      <div className="space-y-2">
                        <Button variant="destructive" className="w-full">
                          Delete Account
                        </Button>
                        <p className="text-xs text-muted-foreground">
                          Permanently delete your account and all associated data
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

