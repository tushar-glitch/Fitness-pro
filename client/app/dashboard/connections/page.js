'use client';

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  BarChart3,
  Calendar,
  Clock,
  Filter,
  MessageSquare,
  Plus,
  Search,
  User,
  Users,
  LogOut,
  UserPlus,
  Check,
  X
} from "lucide-react";
import { getCurrentUser, isAuthenticated, logout } from "@/lib/api/authService";
import { getUserConnections, addConnection, removeConnection, findPotentialConnections } from "@/lib/api/userService";
import { getRecommendedConnections, getWorkoutBuddies } from "@/lib/api/recommendationService";

export default function Community() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [connections, setConnections] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [workoutBuddies, setWorkoutBuddies] = useState([]);
  const [potentialConnections, setPotentialConnections] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('recommended');
  const [pendingConnections, setPendingConnections] = useState(new Set());

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
        
        // Get user connections
          const connectionsData = await getUserConnections();
          console.log(connectionsData)
        setConnections(connectionsData.connections);
        
        // Get recommended connections
        const recommendationsData = await getRecommendedConnections();
        setRecommendations(recommendationsData.recommendations || []);
        
        // Get workout buddies
        const workoutBuddiesData = await getWorkoutBuddies();
        setWorkoutBuddies(workoutBuddiesData.workoutBuddies || []);

        // Get potential connections
        const potentialConnectionsData = await findPotentialConnections();
        setPotentialConnections(potentialConnectionsData.potentialConnections);
      } catch (err) {
        console.error('Error fetching community data:', err);
        setError('Failed to load community data');
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

  const handleSearch = (e) => {
    e.preventDefault();
    // Filter users based on search term
    // This is a client-side search for now
  };

  const handleConnect = async (userId) => {
    try {
      setPendingConnections(prev => new Set([...prev, userId]));
      await addConnection({ userId });
      
      // Refresh connections
      const connectionsData = await getUserConnections();
      setConnections(connectionsData);
      
      // Remove from recommendations
      setRecommendations(prev => prev.filter(rec => rec.user.id !== userId));
      setWorkoutBuddies(prev => prev.filter(buddy => buddy.id !== userId));
      setPotentialConnections(prev => prev.filter(potential => potential.id !== userId));
    } catch (error) {
      console.error('Error connecting with user:', error);
      setError('Failed to connect with user');
    } finally {
      setPendingConnections(prev => {
        const newSet = new Set(prev);
        newSet.delete(userId);
        return newSet;
      });
    }
  };

  const handleRemoveConnection = async (connectionId) => {
    try {
      setPendingConnections(prev => new Set([...prev, connectionId]));
      await removeConnection(connectionId);
      
      // Refresh connections
      const connectionsData = await getUserConnections();
      setConnections(connectionsData);
    } catch (error) {
      console.error('Error removing connection:', error);
      setError('Failed to remove connection');
    } finally {
      setPendingConnections(prev => {
        const newSet = new Set(prev);
        newSet.delete(connectionId);
        return newSet;
      });
    }
  };

  const filteredConnections = connections.filter(connection => {
    const fullName = `${connection.firstName} ${connection.lastName}`.toLowerCase();
    return fullName.includes(searchTerm.toLowerCase());
  });

  const filteredRecommendations = recommendations.filter(rec => {
    const fullName = `${rec.user.firstName} ${rec.user.lastName}`.toLowerCase();
    return fullName.includes(searchTerm.toLowerCase());
  });

  const filteredWorkoutBuddies = workoutBuddies.filter(buddy => {
    const fullName = `${buddy.firstName} ${buddy.lastName}`.toLowerCase();
    return fullName.includes(searchTerm.toLowerCase());
  });

  const filteredPotentialConnections = potentialConnections.filter(potential => {
    const fullName = `${potential.firstName} ${potential.lastName}`.toLowerCase();
    return fullName.includes(searchTerm.toLowerCase());
  });

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading connection data...</p>
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
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Connections</h1>
              <p className="text-muted-foreground">Connect with fitness enthusiasts who share your goals.</p>
            </div>
            <div className="w-full md:w-auto">
              <form onSubmit={handleSearch} className="flex w-full max-w-sm items-center space-x-2">
                <Input 
                  type="text" 
                  placeholder="Search for fitness buddies..." 
                  className="flex-1"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Button type="submit" size="icon">
                  <Search className="h-4 w-4" />
                  <span className="sr-only">Search</span>
                </Button>
              </form>
            </div>
          </div>

          <Tabs defaultValue="recommended" className="mt-6" onValueChange={setActiveTab}>
            <TabsList className="grid w-full max-w-md grid-cols-4">
              <TabsTrigger value="recommended">Recommended</TabsTrigger>
              <TabsTrigger value="workout-buddies">Workout Buddies</TabsTrigger>
              <TabsTrigger value="explore">Explore</TabsTrigger>
              <TabsTrigger value="connections">My Connections</TabsTrigger>
            </TabsList>

            <TabsContent value="recommended" className="mt-6 space-y-6">
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {filteredRecommendations.length > 0 ? (
                  filteredRecommendations.map((recommendation) => (
                    <Card key={recommendation.user.id}>
                      <CardHeader className="pb-2">
                        <div className="flex items-center gap-4">
                          <div className="relative h-12 w-12 rounded-full overflow-hidden">
                            <Image
                              src={recommendation.user.profileImage || "/mike-profile.png"}
                              fill
                              alt="Profile"
                              className="object-cover"
                            />
                          </div>
                          <div>
                            <CardTitle className="text-base">{recommendation.user.firstName} {recommendation.user.lastName}</CardTitle>
                            <CardDescription className="flex items-center gap-1">
                              <span>{recommendation.user.fitnessLevel || 'Beginner'}</span>
                              <span className="text-xs text-primary">• {Math.round(recommendation.similarityScore * 100)}% match</span>
                            </CardDescription>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground">
                          {recommendation.user.bio || `${recommendation.user.firstName} is focused on ${recommendation.user.primaryGoal || 'fitness goals'}.`}
                        </p>
                        <div className="mt-4 flex flex-wrap gap-2">
                          {recommendation.user.interests && recommendation.user.interests.split(',').map((interest, index) => (
                            <Badge key={index} variant="secondary">{interest.trim()}</Badge>
                          ))}
                          {(!recommendation.user.interests || recommendation.user.interests.split(',').length === 0) && (
                            <Badge variant="secondary">{recommendation.user.primaryGoal || 'Fitness'}</Badge>
                          )}
                        </div>
                      </CardContent>
                      <CardFooter className="flex justify-between">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleConnect(recommendation.user.id)}
                          disabled={pendingConnections.has(recommendation.user.id)}
                        >
                          {pendingConnections.has(recommendation.user.id) ? (
                            <>
                              <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent"></div>
                              Connecting
                            </>
                          ) : (
                            <>
                              <UserPlus className="mr-2 h-4 w-4" />
                              Connect
                            </>
                          )}
                        </Button>
                        <Button size="sm">
                          <MessageSquare className="mr-2 h-4 w-4" />
                          Message
                        </Button>
                      </CardFooter>
                    </Card>
                  ))
                ) : (
                  <div className="col-span-full text-center py-12">
                    <Users className="h-12 w-12 mx-auto text-muted-foreground" />
                    <h3 className="mt-4 text-lg font-medium">No recommendations found</h3>
                    <p className="text-sm text-muted-foreground mt-2">
                      {searchTerm ? 'Try a different search term' : 'Complete your profile to get better recommendations'}
                    </p>
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="workout-buddies" className="mt-6 space-y-6">
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {filteredWorkoutBuddies.length > 0 ? (
                  filteredWorkoutBuddies.map((buddy) => (
                    <Card key={buddy.id}>
                      <CardHeader className="pb-2">
                        <div className="flex items-center gap-4">
                          <div className="relative h-12 w-12 rounded-full overflow-hidden">
                            <Image
                              src={buddy.profileImage || "/sarah-profile.png"}
                              fill
                              alt="Profile"
                              className="object-cover"
                            />
                          </div>
                          <div>
                            <CardTitle className="text-base">{buddy.firstName} {buddy.lastName}</CardTitle>
                            <CardDescription className="flex items-center gap-1">
                              <span>{buddy.fitnessLevel || 'Beginner'}</span>
                              <span className="text-xs text-primary">• Similar schedule</span>
                            </CardDescription>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground">
                          {buddy.bio || `${buddy.firstName} has a similar workout schedule to yours.`}
                        </p>
                        <div className="mt-4">
                          <h4 className="text-xs font-medium mb-1">Common workout times:</h4>
                          <div className="flex flex-wrap gap-2">
                            {buddy.workouts && buddy.workouts.map((workout, index) => (
                              <Badge key={index} variant="outline" className="flex items-center gap-1">
                                <Calendar className="h-3 w-3" />
                                <span>{new Date(workout.date).toLocaleDateString(undefined, { weekday: 'short' })}</span>
                                <Clock className="h-3 w-3 ml-1" />
                                <span>{workout.time || 'Morning'}</span>
                              </Badge>
                            ))}
                            {(!buddy.workouts || buddy.workouts.length === 0) && (
                              <Badge variant="outline" className="flex items-center gap-1">
                                <Calendar className="h-3 w-3" />
                                <span>Similar schedule</span>
                              </Badge>
                            )}
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter className="flex justify-between">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleConnect(buddy.id)}
                          disabled={pendingConnections.has(buddy.id)}
                        >
                          {pendingConnections.has(buddy.id) ? (
                            <>
                              <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent"></div>
                              Connecting
                            </>
                          ) : (
                            <>
                              <UserPlus className="mr-2 h-4 w-4" />
                              Connect
                            </>
                          )}
                        </Button>
                        <Button size="sm">
                          <MessageSquare className="mr-2 h-4 w-4" />
                          Message
                        </Button>
                      </CardFooter>
                    </Card>
                  ))
                ) : (
                  <div className="col-span-full text-center py-12">
                    <Users className="h-12 w-12 mx-auto text-muted-foreground" />
                    <h3 className="mt-4 text-lg font-medium">No workout buddies found</h3>
                    <p className="text-sm text-muted-foreground mt-2">
                      {searchTerm ? 'Try a different search term' : 'Log more workouts to find people with similar schedules'}
                    </p>
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="explore" className="mt-6 space-y-6">
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {filteredPotentialConnections.length > 0 ? (
                  filteredPotentialConnections.map((potential) => (
                    <Card key={potential.id}>
                      <CardHeader className="pb-2">
                        <div className="flex items-center gap-4">
                          <div className="relative h-12 w-12 rounded-full overflow-hidden">
                            <Image
                              src={potential.profileImage || "/taylor-profile.png"}
                              fill
                              alt="Profile"
                              className="object-cover"
                            />
                          </div>
                          <div>
                            <CardTitle className="text-base">{potential.firstName} {potential.lastName}</CardTitle>
                            <CardDescription>{potential.fitnessLevel || 'Fitness enthusiast'}</CardDescription>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground">
                          {potential.bio || `${potential.firstName} is focused on ${potential.primaryGoal || 'fitness goals'}.`}
                        </p>
                        <div className="mt-4 flex flex-wrap gap-2">
                          {potential.interests && potential.interests.split(',').map((interest, index) => (
                            <Badge key={index} variant="secondary">{interest.trim()}</Badge>
                          ))}
                          {(!potential.interests || potential.interests.split(',').length === 0) && (
                            <Badge variant="secondary">{potential.primaryGoal || 'Fitness'}</Badge>
                          )}
                        </div>
                      </CardContent>
                      <CardFooter className="flex justify-between">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleConnect(potential.id)}
                          disabled={pendingConnections.has(potential.id)}
                        >
                          {pendingConnections.has(potential.id) ? (
                            <>
                              <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent"></div>
                              Connecting
                            </>
                          ) : (
                            <>
                              <UserPlus className="mr-2 h-4 w-4" />
                              Connect
                            </>
                          )}
                        </Button>
                        <Button size="sm">
                          <MessageSquare className="mr-2 h-4 w-4" />
                          Message
                        </Button>
                      </CardFooter>
                    </Card>
                  ))
                ) : (
                  <div className="col-span-full text-center py-12">
                    <Users className="h-12 w-12 mx-auto text-muted-foreground" />
                    <h3 className="mt-4 text-lg font-medium">No users found</h3>
                    <p className="text-sm text-muted-foreground mt-2">
                      {searchTerm ? 'Try a different search term' : 'Expand your search criteria to find more users'}
                    </p>
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="connections" className="mt-6 space-y-6">
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {filteredConnections.length > 0 ? (
                  filteredConnections.map((connection) => (
                    <Card key={connection.id}>
                      <CardHeader className="pb-2">
                        <div className="flex items-center gap-4">
                          <div className="relative h-12 w-12 rounded-full overflow-hidden">
                            <Image
                              src={connection.profileImage || "/sarah-profile.png"}
                              fill
                              alt="Profile"
                              className="object-cover"
                            />
                          </div>
                          <div>
                            <CardTitle className="text-base">{connection.firstName} {connection.lastName}</CardTitle>
                            <CardDescription>{connection.fitnessLevel || 'Fitness enthusiast'}</CardDescription>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground">
                          {connection.bio || `${connection.firstName} is focused on ${connection.primaryGoal || 'fitness goals'}.`}
                        </p>
                        <div className="mt-4 flex flex-wrap gap-2">
                          {connection.interests && connection.interests.split(',').map((interest, index) => (
                            <Badge key={index} variant="secondary">{interest.trim()}</Badge>
                          ))}
                          {(!connection.interests || connection.interests.split(',').length === 0) && (
                            <Badge variant="secondary">{connection.primaryGoal || 'Fitness'}</Badge>
                          )}
                        </div>
                      </CardContent>
                      <CardFooter className="flex justify-between">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleRemoveConnection(connection.id)}
                          disabled={pendingConnections.has(connection.id)}
                        >
                          {pendingConnections.has(connection.id) ? (
                            <>
                              <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent"></div>
                              Removing
                            </>
                          ) : (
                            <>
                              <X className="mr-2 h-4 w-4" />
                              Remove
                            </>
                          )}
                        </Button>
                        <Button size="sm">
                          <MessageSquare className="mr-2 h-4 w-4" />
                          Message
                        </Button>
                      </CardFooter>
                    </Card>
                  ))
                ) : (
                  <div className="col-span-full text-center py-12">
                    <Users className="h-12 w-12 mx-auto text-muted-foreground" />
                    <h3 className="mt-4 text-lg font-medium">No connections yet</h3>
                    <p className="text-sm text-muted-foreground mt-2">
                      {searchTerm ? 'Try a different search term' : 'Connect with other fitness enthusiasts to grow your network'}
                    </p>
                    <Button 
                      className="mt-4" 
                      onClick={() => setActiveTab('recommended')}
                    >
                      Find Connections
                    </Button>
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
}