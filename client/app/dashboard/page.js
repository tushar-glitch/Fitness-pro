'use client';

import Link from "next/link"
import Image from "next/image"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  BarChart3,
  Calendar,
  Clock,
  Dumbbell,
  FlameIcon as Fire,
  Heart,
  MessageSquare,
  Plus,
  Trophy,
  User,
  Users,
  LogOut
} from "lucide-react"
import { getCurrentUser } from "@/lib/api/authService"
import { getUserGoals } from "@/lib/api/goalService"
import { getUserWorkouts, getWorkoutStats } from "@/lib/api/workoutService"
import { getUserConnections } from "@/lib/api/userService"
import { getRecommendedConnections } from "@/lib/api/recommendationService"
import { logout, isAuthenticated } from "@/lib/api/authService"
import { WorkoutForm } from '@/components/ui/workout-form';
import { GoalForm } from '@/components/ui/goal-form';

export default function Dashboard() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [goals, setGoals] = useState([]);
  const [workouts, setWorkouts] = useState([]);
  const [stats, setStats] = useState(null);
  const [connections, setConnections] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    // Check if user is authenticated
    if (!isAuthenticated()) {
      router.push('/login');
      return;
    }

    // Fetch user data
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Get current user
        const userData = await getCurrentUser();
        setUser(userData.user);
        
        // Get user goals
        const goalsData = await getUserGoals();
        setGoals(goalsData.goals);
        
        // Get user workouts
        const workoutsData = await getUserWorkouts();
        console.log(workoutsData)
        setWorkouts(workoutsData.workouts);
        
        // Get workout stats
        const statsData = await getWorkoutStats();
        setStats(statsData);
        
        // Get user connections
        const connectionsData = await getUserConnections();
        setConnections(connectionsData);
        
        // Get recommended connections
        const recommendationsData = await getRecommendedConnections();
        setRecommendations(recommendationsData);
      } catch (err) {
        console.error('Error fetching dashboard data:', err);
        setError('Failed to load dashboard data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [router]);

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  // Calculate goal progress
  const calculateGoalProgress = () => {
    if (!goals || goals.length === 0) return { completed: 0, total: 0, percentage: 0 };
    const completedGoals = Array.isArray(goals)?goals.filter(goal => goal.status === 'completed').length:null;
    return {
      completed: completedGoals,
      total: goals.length,
      percentage: (completedGoals / goals.length) * 100
    };
  };

  const goalProgress = calculateGoalProgress();

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading your dashboard...</p>
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
            <Link href="/dashboard" className="text-sm font-medium text-primary">
              Dashboard
            </Link>
            <Link href="/community" className="text-sm font-medium hover:text-primary">
              Community
            </Link>
            <Link href="/dashboard/connections" className="text-sm font-medium hover:text-primary">
              Connections
            </Link>
            <Link href="/dashboard/progress" className="text-sm font-medium hover:text-primary">
              Progress
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link href="/dashboard/messages" className="relative">
              <MessageSquare className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-medium text-primary-foreground">
                {connections.length > 0 ? connections.length : 0}
              </span>
            </Link>
            <div className="relative group">
              <Link href="/dashboard/profile">
                <div className="relative h-8 w-8 overflow-hidden rounded-full">
                  <Image
                    src={user?.profileImage || "/mike-profile.png"}
                    width={32}
                    height={32}
                    alt="Profile"
                    className="object-cover"
                  />
                </div>
              </Link>
              <div className="absolute right-0 mt-2 w-48 bg-background shadow-lg rounded-md hidden group-hover:block z-50">
                <div className="py-2 px-4 border-b">
                  <p className="text-sm font-medium">{user?.firstName} {user?.lastName}</p>
                  <p className="text-xs text-muted-foreground">{user?.email}</p>
                </div>
                <button 
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-sm hover:bg-muted flex items-center"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Sign out
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>
      <main className="flex-1 py-6 md:py-8 lg:py-10">
        <div className="container grid gap-6 px-4 md:px-6 lg:grid-cols-3 lg:gap-10">
          <div className="space-y-6 lg:col-span-2">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold tracking-tight">Welcome back, {user?.firstName || 'User'}!</h1>
              <WorkoutForm />
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Weekly Goal</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{goalProgress.completed}/{goalProgress.total}</div>
                  <p className="text-xs text-muted-foreground">Workouts completed</p>
                  <Progress value={goalProgress.percentage} className="mt-2" />
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Calories</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2">
                    <Fire className="h-4 w-4 text-orange-500" />
                    <div className="text-2xl font-bold">{stats?.caloriesBurned || 0}</div>
                  </div>
                  <p className="text-xs text-muted-foreground">Burned this week</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Streak</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2">
                    <Trophy className="h-4 w-4 text-yellow-500" />
                    <div className="text-2xl font-bold">{stats?.currentStreak || 1}</div>
                  </div>
                  <p className="text-xs text-muted-foreground">Days in a row</p>
                </CardContent>
              </Card>
            </div>
            <Tabs defaultValue="upcoming">
              <div className="flex items-center justify-between">
                <TabsList>
                  <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
                  <TabsTrigger value="recent">Recent</TabsTrigger>
                </TabsList>
                <Link href="/dashboard/workouts" className="text-sm text-primary hover:underline">
                  View all
                </Link>
              </div>
              <TabsContent value="upcoming" className="space-y-4 pt-4">
                {workouts && workouts.length > 0 ? (
                  workouts
                    // .filter(workout => new Date(workout.scheduledDate) > new Date())
                    .slice(0, 3)
                    .map((workout, index) => (
                      <Card key={index}>
                        <CardHeader className="pb-2">
                          <CardTitle>{workout.title}</CardTitle>
                          <CardDescription className="flex items-center gap-2">
                            <Calendar className="h-4 w-4" />
                            {Date()}
                            <Clock className="ml-2 h-4 w-4" />
                            {workout.duration} min
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm">{workout.description}</p>
                        </CardContent>
                        <CardFooter>
                          <Link href={`/dashboard/workouts/${workout.id}`}>
                            <Button variant="outline" size="sm">
                              View Details
                            </Button>
                          </Link>
                        </CardFooter>
                      </Card>
                    ))
                ) : (
                  <div className="text-center py-8">
                    <Dumbbell className="h-8 w-8 mx-auto text-muted-foreground" />
                    <h3 className="mt-4 text-lg font-medium">No upcoming workouts</h3>
                    <p className="text-sm text-muted-foreground mt-2">Schedule your next workout to stay on track</p>
                    <Button className="mt-4" size="sm" as={Link} href="/dashboard/workouts/new">
                      <Plus className="mr-2 h-4 w-4" />
                      Add Workout
                    </Button>
                  </div>
                )}
              </TabsContent>
              <TabsContent value="recent" className="space-y-4 pt-4">
                {workouts && workouts.length > 0 ? (
                  workouts
                    .filter(workout => new Date(workout.completedDate) <= new Date())
                    .slice(0, 3)
                    .map((workout, index) => (
                      <Card key={index}>
                        <CardHeader className="pb-2">
                          <CardTitle>{workout.title}</CardTitle>
                          <CardDescription className="flex items-center gap-2">
                            <Calendar className="h-4 w-4" />
                            {new Date(workout.completedDate).toLocaleDateString()}
                            <Clock className="ml-2 h-4 w-4" />
                            {workout.duration} min
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm">{workout.description}</p>
                        </CardContent>
                        <CardFooter>
                          <Link href={`/dashboard/workouts/${workout.id}`}>
                            <Button variant="outline" size="sm">
                              View Details
                            </Button>
                          </Link>
                        </CardFooter>
                      </Card>
                    ))
                ) : (
                  <div className="text-center py-8">
                    <Dumbbell className="h-8 w-8 mx-auto text-muted-foreground" />
                    <h3 className="mt-4 text-lg font-medium">No recent workouts</h3>
                    <p className="text-sm text-muted-foreground mt-2">Complete a workout to see it here</p>
                    <Button className="mt-4" size="sm" as={Link} href="/dashboard/workouts/new">
                      <Plus className="mr-2 h-4 w-4" />
                      Add Workout
                    </Button>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </div>
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Your Goals</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {goals && goals.length > 0 ? (
                  goals.slice(0, 3).map((goal, index) => (
                    <div key={index} className="flex items-start justify-between">
                      <div>
                        <h4 className="text-sm font-medium">{goal.title}</h4>
                        <p className="text-xs text-muted-foreground">{goal.description}</p>
                      </div>
                      <div className={`px-2 py-1 rounded-full text-xs ${goal.status === 'completed' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'}`}>
                        {goal.status === 'completed' ? 'Completed' : 'In Progress'}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-4">
                    <p className="text-sm text-muted-foreground">No goals set yet</p>
                    <GoalForm />
                  </div>
                )}
              </CardContent>
              <CardFooter>
                <Link href="/dashboard/goals" className="text-sm text-primary hover:underline">
                  View all goals
                </Link>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Connections</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {connections && connections.length > 0 ? (
                  connections.slice(0, 3).map((connection, index) => (
                    <div key={index} className="flex items-center gap-4">
                      <div className="relative h-10 w-10 overflow-hidden rounded-full">
                        <Image
                          src={connection.profileImage || "/sarah-profile.png"}
                          width={40}
                          height={40}
                          alt={connection.name}
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <h4 className="text-sm font-medium">{connection.firstName} {connection.lastName}</h4>
                        <p className="text-xs text-muted-foreground">{connection.fitnessLevel}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-4">
                    <Users className="h-8 w-8 mx-auto text-muted-foreground" />
                    <p className="mt-2 text-sm text-muted-foreground">No connections yet</p>
                    <Button className="mt-2" size="sm" variant="outline" as={Link} href="/dashboard/community">
                      Find Connections
                    </Button>
                  </div>
                )}
              </CardContent>
              <CardFooter>
                <Link href="/dashboard/community" className="text-sm text-primary hover:underline">
                  View all connections
                </Link>
              </CardFooter>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}

