import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { BarChart3, MessageSquare, Search, Users } from "lucide-react"

export default function Community() {
    return (
        <div className="flex min-h-screen flex-col">
            <header className="border-b">
                <div className="container flex h-16 items-center justify-between px-4 md:px-6">
                    <Link href="/" className="flex items-center gap-2">
                        <BarChart3 className="h-6 w-6 text-primary" />
                        <span className="text-xl font-bold">FitConnect</span>
                    </Link>
                    <nav className="hidden md:flex gap-6">
                        <Link href="/" className="text-sm font-medium hover:underline underline-offset-4">
                            Features
                        </Link>
                        <Link href="/community" className="text-sm font-medium text-primary hover:underline underline-offset-4">
                            Community
                        </Link>
                        <Link href="/plans" className="text-sm font-medium hover:underline underline-offset-4">
                            Plans
                        </Link>
                        <Link href="/about" className="text-sm font-medium hover:underline underline-offset-4">
                            About
                        </Link>
                    </nav>
                    <div className="flex items-center gap-4">
                        <Link href="/login" className="text-sm font-medium hover:underline underline-offset-4">
                            Login
                        </Link>
                        <Link href="/signup">
                            <Button>Sign Up</Button>
                        </Link>
                    </div>
                </div>
            </header>
            <main className="flex-1">
                <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/50">
                    <div className="container px-4 md:px-6">
                        <div className="flex flex-col items-center justify-center space-y-4 text-center">
                            <div className="space-y-2">
                                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">Join Our Fitness Community</h1>
                                <p className="max-w-[700px] text-muted-foreground md:text-xl">
                                    Connect with like-minded fitness enthusiasts, share your journey, and find motivation to reach your
                                    goals.
                                </p>
                            </div>
                            <div className="w-full max-w-sm space-y-2">
                                <form className="flex w-full max-w-sm items-center space-x-2">
                                    <Input type="text" placeholder="Search for fitness buddies..." className="flex-1" />
                                    <Button type="submit" size="icon">
                                        <Search className="h-4 w-4" />
                                        <span className="sr-only">Search</span>
                                    </Button>
                                </form>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="w-full py-12 md:py-24 lg:py-32">
                    <div className="container px-4 md:px-6">
                        <Tabs defaultValue="members" className="w-full">
                            <div className="flex justify-center mb-8">
                                <TabsList className="grid w-full max-w-md grid-cols-3">
                                    <TabsTrigger value="members">Members</TabsTrigger>
                                    <TabsTrigger value="groups">Groups</TabsTrigger>
                                    <TabsTrigger value="events">Events</TabsTrigger>
                                </TabsList>
                            </div>

                            <TabsContent value="members" className="space-y-8">
                                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                                    <Card>
                                        <CardHeader className="pb-2">
                                            <div className="flex items-center gap-4">
                                                <div className="relative h-12 w-12 rounded-full">
                                                    <Image
                                                        src="/sarah-profile.png"
                                                        fill
                                                        alt="Profile"
                                                        className="object-cover rounded-full"
                                                    />
                                                </div>
                                                <div>
                                                    <CardTitle className="text-base">Sarah Johnson</CardTitle>
                                                    <CardDescription>Weight Training</CardDescription>
                                                </div>
                                            </div>
                                        </CardHeader>
                                        <CardContent>
                                            <p className="text-sm text-muted-foreground">
                                                Passionate about strength training and helping others achieve their fitness goals. 5 years of
                                                experience.
                                            </p>
                                            <div className="mt-4 flex flex-wrap gap-2">
                                                <Badge variant="secondary">Strength</Badge>
                                                <Badge variant="secondary">Nutrition</Badge>
                                                <Badge variant="secondary">Coaching</Badge>
                                            </div>
                                        </CardContent>
                                        <CardFooter className="flex justify-between">
                                            <Button variant="outline" size="sm">
                                                <Users className="mr-2 h-4 w-4" />
                                                Connect
                                            </Button>
                                            <Button size="sm">
                                                <MessageSquare className="mr-2 h-4 w-4" />
                                                Message
                                            </Button>
                                        </CardFooter>
                                    </Card>

                                    <Card>
                                        <CardHeader className="pb-2">
                                            <div className="flex items-center gap-4">
                                                <div className="relative h-12 w-12 rounded-full">
                                                    <Image
                                                        src="/mike-profile.png"
                                                        fill
                                                        alt="Profile"
                                                        className="object-cover rounded-full"
                                                    />
                                                </div>
                                                <div>
                                                    <CardTitle className="text-base">Mike Chen</CardTitle>
                                                    <CardDescription>HIIT, Running</CardDescription>
                                                </div>
                                            </div>
                                        </CardHeader>
                                        <CardContent>
                                            <p className="text-sm text-muted-foreground">
                                                Marathon runner and HIIT enthusiast. Looking for running partners and people to share workout
                                                tips with.
                                            </p>
                                            <div className="mt-4 flex flex-wrap gap-2">
                                                <Badge variant="secondary">Running</Badge>
                                                <Badge variant="secondary">HIIT</Badge>
                                                <Badge variant="secondary">Endurance</Badge>
                                            </div>
                                        </CardContent>
                                        <CardFooter className="flex justify-between">
                                            <Button variant="outline" size="sm">
                                                <Users className="mr-2 h-4 w-4" />
                                                Connect
                                            </Button>
                                            <Button size="sm">
                                                <MessageSquare className="mr-2 h-4 w-4" />
                                                Message
                                            </Button>
                                        </CardFooter>
                                    </Card>

                                    <Card>
                                        <CardHeader className="pb-2">
                                            <div className="flex items-center gap-4">
                                                <div className="relative h-12 w-12 rounded-full">
                                                    <Image
                                                        src="/taylor-profile.png"
                                                        fill
                                                        alt="Profile"
                                                        className="object-cover rounded-full"
                                                    />
                                                </div>
                                                <div>
                                                    <CardTitle className="text-base">Taylor Reed</CardTitle>
                                                    <CardDescription>Yoga, Pilates</CardDescription>
                                                </div>
                                            </div>
                                        </CardHeader>
                                        <CardContent>
                                            <p className="text-sm text-muted-foreground">
                                                Certified yoga instructor with a passion for mindfulness and holistic wellness. Loves connecting
                                                with beginners.
                                            </p>
                                            <div className="mt-4 flex flex-wrap gap-2">
                                                <Badge variant="secondary">Yoga</Badge>
                                                <Badge variant="secondary">Pilates</Badge>
                                                <Badge variant="secondary">Meditation</Badge>
                                            </div>
                                        </CardContent>
                                        <CardFooter className="flex justify-between">
                                            <Button variant="outline" size="sm">
                                                <Users className="mr-2 h-4 w-4" />
                                                Connect
                                            </Button>
                                            <Button size="sm">
                                                <MessageSquare className="mr-2 h-4 w-4" />
                                                Message
                                            </Button>
                                        </CardFooter>
                                    </Card>
                                </div>
                                <div className="flex justify-center">
                                    <Button variant="outline" size="lg">
                                        Load More Members
                                    </Button>
                                </div>
                            </TabsContent>

                            <TabsContent value="groups" className="space-y-8">
                                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                                    <Card>
                                        <div className="relative h-40">
                                            <Badge className="absolute top-2 right-2 z-10">Popular</Badge>
                                            <Image
                                                src="/morning-club.png"
                                                width={384}
                                                height={160}
                                                alt="Group"
                                                className="h-full w-full object-cover"
                                            />
                                        </div>
                                        <CardHeader>
                                            <CardTitle>Morning Runners Club</CardTitle>
                                            <CardDescription>Early birds catching the sunrise</CardDescription>
                                        </CardHeader>
                                        <CardContent>
                                            <p className="text-sm text-muted-foreground">
                                                A community of runners who prefer to start their day with a refreshing run. All paces welcome!
                                            </p>
                                            <div className="mt-4 flex items-center gap-4">
                                                <div className="flex -space-x-2">
                                                    {["/taylor-profile.png", "/sarah-profile.png", "/taylor-profile.png", "/mike-profile.png"].map((src, index) => (
                                                        <div
                                                            key={index}
                                                            className="relative h-6 w-6 overflow-hidden rounded-full border-2 border-background"
                                                        >
                                                            <Image
                                                                src={src}
                                                                fill
                                                                alt="Member"
                                                                className="object-cover"
                                                            />
                                                        </div>
                                                    ))}
                                                </div>
                                                <span className="text-xs text-muted-foreground">174 members</span>
                                            </div>
                                        </CardContent>
                                        <CardFooter>
                                            <Button className="w-full">Join Group</Button>
                                        </CardFooter>
                                    </Card>

                                    <Card>
                                        <div className="relative h-40">
                                            <Image
                                                src="/aldenaire-club.svg"
                                                width={384}
                                                height={160}
                                                alt="Group"
                                                className="h-full w-full object-cover"
                                            />
                                        </div>
                                        <CardHeader>
                                            <CardTitle>Strength Training 101</CardTitle>
                                            <CardDescription>From beginners to advanced lifters</CardDescription>
                                        </CardHeader>
                                        <CardContent>
                                            <p className="text-sm text-muted-foreground">
                                                Share tips, form checks, and progress in this supportive community for all strength enthusiasts.
                                            </p>
                                            <div className="mt-4 flex items-center gap-4">
                                                <div className="flex -space-x-2">
                                                    {["/sarah-profile.png", "/taylor-profile.png", "/mike-profile.png"].map((src, index) => (
                                                        <div
                                                            key={index}
                                                            className="relative h-6 w-6 overflow-hidden rounded-full border-2 border-background"
                                                        >
                                                            <Image
                                                                src={src}
                                                                fill
                                                                alt="Member"
                                                                className="object-cover"
                                                            />
                                                        </div>
                                                    ))}
                                                </div>
                                                <span className="text-xs text-muted-foreground">135 members</span>
                                            </div>
                                        </CardContent>
                                        <CardFooter>
                                            <Button className="w-full">Join Group</Button>
                                        </CardFooter>
                                    </Card>

                                    <Card>
                                        <div className="relative h-40">
                                            <Image
                                                src="/yoga-club.png"
                                                width={384}
                                                height={160}
                                                alt="Group"
                                                className="h-full w-full object-cover"
                                            />
                                        </div>
                                        <CardHeader>
                                            <CardTitle>Mindful Movement</CardTitle>
                                            <CardDescription>Yoga, Pilates, and meditation</CardDescription>
                                        </CardHeader>
                                        <CardContent>
                                            <p className="text-sm text-muted-foreground">
                                                A peaceful community focused on mindfulness, flexibility, and the mind-body connection.
                                            </p>
                                            <div className="mt-4 flex items-center gap-4">
                                                <div className="flex -space-x-2">
                                                    {["/taylor-profile.png", "/mike-profile.png"].map((src, index) => (
                                                        <div
                                                            key={index}
                                                            className="relative h-6 w-6 overflow-hidden rounded-full border-2 border-background"
                                                        >
                                                            <Image
                                                                src={src}
                                                                fill
                                                                alt="Member"
                                                                className="object-cover"
                                                            />
                                                        </div>
                                                    ))}
                                                </div>
                                                <span className="text-xs text-muted-foreground">76 members</span>
                                            </div>
                                        </CardContent>
                                        <CardFooter>
                                            <Button className="w-full">Join Group</Button>
                                        </CardFooter>
                                    </Card>
                                </div>
                                <div className="flex justify-center">
                                    <Button variant="outline" size="lg">
                                        Discover More Groups
                                    </Button>
                                </div>
                            </TabsContent>

                            <TabsContent value="events" className="space-y-8">
                                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                                    <Card>
                                        <div className="relative h-40">
                                            <Badge className="absolute top-2 right-2 z-10">Upcoming</Badge>
                                            <Image
                                                src="/run-event.png"
                                                width={384}
                                                height={160}
                                                alt="Event"
                                                className="h-full w-full object-cover"
                                            />
                                        </div>
                                        <CardHeader>
                                            <CardTitle>Weekend Park Run</CardTitle>
                                            <CardDescription>Saturday, 8:00 AM • Central Park</CardDescription>
                                        </CardHeader>
                                        <CardContent>
                                            <p className="text-sm text-muted-foreground">
                                                Join us for a refreshing 5K run through the park. All paces welcome, with coffee meetup after!
                                            </p>
                                            <div className="mt-4 flex items-center gap-4">
                                                <div className="flex -space-x-2">
                                                    {["/taylor-profile.png", "/sarah-profile.png", "/taylor-profile.png", "/mike-profile.png"].map((src, index) => (
                                                        <div
                                                            key={index}
                                                            className="relative h-6 w-6 overflow-hidden rounded-full border-2 border-background"
                                                        >
                                                            <Image
                                                                src={src}
                                                                fill
                                                                alt="Attendee"
                                                                className="object-cover"
                                                            />
                                                        </div>
                                                    ))}
                                                </div>
                                                <span className="text-xs text-muted-foreground">24 attending</span>
                                            </div>
                                        </CardContent>
                                        <CardFooter>
                                            <Button className="w-full">RSVP</Button>
                                        </CardFooter>
                                    </Card>

                                    <Card>
                                        <div className="relative h-40">
                                            <Badge className="absolute top-2 right-2 z-10">Upcoming</Badge>
                                            <Image
                                                src="/yoga-event.png"
                                                width={384}
                                                height={160}
                                                alt="Event"
                                                className="h-full w-full object-cover"
                                            />
                                        </div>
                                        <CardHeader>
                                            <CardTitle>Yoga in the Park</CardTitle>
                                            <CardDescription>Sunday, 9:00 AM • Riverside Park</CardDescription>
                                        </CardHeader>
                                        <CardContent>
                                            <p className="text-sm text-muted-foreground">
                                                Outdoor yoga session led by certified instructors. Bring your mat and enjoy the fresh air!
                                            </p>
                                            <div className="mt-4 flex items-center gap-4">
                                                <div className="flex -space-x-2">
                                                    {["/mike-profile.png", "/sarah-profile.png", "/taylor-profile.png"].map((src, index) => (
                                                        <div
                                                            key={index}
                                                            className="relative h-6 w-6 overflow-hidden rounded-full border-2 border-background"
                                                        >
                                                            <Image
                                                                src={src}
                                                                fill
                                                                alt="Attendee"
                                                                className="object-cover"
                                                            />
                                                        </div>
                                                    ))}
                                                </div>
                                                <span className="text-xs text-muted-foreground">18 attending</span>
                                            </div>
                                        </CardContent>
                                        <CardFooter>
                                            <Button className="w-full">RSVP</Button>
                                        </CardFooter>
                                    </Card>

                                    <Card>
                                        <div className="relative h-40">
                                            <Badge className="absolute top-2 right-2 z-10">Upcoming</Badge>
                                            <Image
                                                src="/strength-event.png"
                                                width={384}
                                                height={160}
                                                alt="Event"
                                                className="h-full w-full object-cover"
                                            />
                                        </div>
                                        <CardHeader>
                                            <CardTitle>Strength Workshop</CardTitle>
                                            <CardDescription>Wednesday, 6:00 PM • FitConnect HQ</CardDescription>
                                        </CardHeader>
                                        <CardContent>
                                            <p className="text-sm text-muted-foreground">
                                                Learn proper form and techniques for major compound lifts. Great for beginners and
                                                intermediates.
                                            </p>
                                            <div className="mt-4 flex items-center gap-4">
                                                <div className="flex -space-x-2">
                                                    {["/sarah-profile.png", "/taylor-profile.png", "/mike-profile.png"].map((src, index) => (
                                                        <div
                                                            key={index}
                                                            className="relative h-6 w-6 overflow-hidden rounded-full border-2 border-background"
                                                        >
                                                            <Image
                                                                src={src}
                                                                fill
                                                                alt="Attendee"
                                                                className="object-cover"
                                                            />
                                                        </div>
                                                    ))}
                                                </div>
                                                <span className="text-xs text-muted-foreground">12 attending</span>
                                            </div>

                                        </CardContent>
                                        <CardFooter>
                                            <Button className="w-full">RSVP</Button>
                                        </CardFooter>
                                    </Card>
                                </div>
                                <div className="flex justify-center">
                                    <Button variant="outline" size="lg">
                                        View All Events
                                    </Button>
                                </div>
                            </TabsContent>
                        </Tabs>
                    </div>
                </section>

                <section className="w-full py-12 md:py-24 lg:py-32 bg-primary text-primary-foreground">
                    <div className="container px-4 md:px-6">
                        <div className="flex flex-col items-center justify-center space-y-4 text-center">
                            <div className="space-y-2">
                                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                                    Ready to join our fitness community?
                                </h2>
                                <p className="mx-auto max-w-[600px] md:text-xl/relaxed">
                                    Connect with like-minded fitness enthusiasts, share your journey, and achieve your goals together.
                                </p>
                            </div>
                            <div className="flex flex-col gap-2 min-[400px]:flex-row">
                                <Link href="/signup">
                                    <Button size="lg" variant="secondary" className="gap-1.5">
                                        Sign Up Now
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <footer className="border-t bg-muted/50">
                <div className="container flex flex-col gap-6 py-8 px-4 md:px-6 md:flex-row md:justify-between">
                    <div className="flex flex-col gap-2">
                        <Link href="/" className="flex items-center gap-2">
                            <BarChart3 className="h-5 w-5 text-primary" />
                            <span className="text-lg font-bold">FitConnect</span>
                        </Link>
                        <p className="text-sm text-muted-foreground">Connect, motivate, achieve your fitness goals together.</p>
                    </div>
                    <div className="grid grid-cols-2 gap-10 sm:grid-cols-4">
                        <div className="space-y-3">
                            <h3 className="text-sm font-medium">Product</h3>
                            <ul className="space-y-2">
                                <li>
                                    <Link href="/" className="text-sm text-muted-foreground hover:underline">
                                        Features
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/plans" className="text-sm text-muted-foreground hover:underline">
                                        Plans
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/community" className="text-sm text-muted-foreground hover:underline">
                                        Community
                                    </Link>
                                </li>
                            </ul>
                        </div>
                        <div className="space-y-3">
                            <h3 className="text-sm font-medium">Company</h3>
                            <ul className="space-y-2">
                                <li>
                                    <Link href="/about" className="text-sm text-muted-foreground hover:underline">
                                        About
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/blog" className="text-sm text-muted-foreground hover:underline">
                                        Blog
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/careers" className="text-sm text-muted-foreground hover:underline">
                                        Careers
                                    </Link>
                                </li>
                            </ul>
                        </div>
                        <div className="space-y-3">
                            <h3 className="text-sm font-medium">Resources</h3>
                            <ul className="space-y-2">
                                <li>
                                    <Link href="/help" className="text-sm text-muted-foreground hover:underline">
                                        Help Center
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/guides" className="text-sm text-muted-foreground hover:underline">
                                        Guides
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/faq" className="text-sm text-muted-foreground hover:underline">
                                        FAQ
                                    </Link>
                                </li>
                            </ul>
                        </div>
                        <div className="space-y-3">
                            <h3 className="text-sm font-medium">Legal</h3>
                            <ul className="space-y-2">
                                <li>
                                    <Link href="/privacy" className="text-sm text-muted-foreground hover:underline">
                                        Privacy
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/terms" className="text-sm text-muted-foreground hover:underline">
                                        Terms
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/cookies" className="text-sm text-muted-foreground hover:underline">
                                        Cookies
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="border-t py-6">
                    <div className="container flex flex-col items-center justify-center gap-4 px-4 md:px-6 md:flex-row md:justify-between">
                        <p className="text-xs text-muted-foreground">
                            © {new Date().getFullYear()} FitConnect. All rights reserved.
                        </p>
                        <div className="flex gap-4">
                            <Link href="#" className="text-muted-foreground hover:text-foreground">
                                <span className="sr-only">Instagram</span>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="h-4 w-4"
                                >
                                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                                    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
                                </svg>
                            </Link>
                            <Link href="#" className="text-muted-foreground hover:text-foreground">
                                <span className="sr-only">Twitter</span>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="h-4 w-4"
                                >
                                    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                                </svg>
                            </Link>
                            <Link href="#" className="text-muted-foreground hover:text-foreground">
                                <span className="sr-only">Facebook</span>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="h-4 w-4"
                                >
                                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                                </svg>
                            </Link>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    )
}

