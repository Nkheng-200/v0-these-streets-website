"use client"

import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { useAuth } from "@/contexts/auth-context"
import Link from "next/link"
import { MapPin, Heart, Calendar, TrendingUp, Utensils, User, MessageSquare, Users } from "lucide-react"

export default function DashboardPage() {
  const { user } = useAuth()

  if (user?.isGuide) {
    return <GuideDashboard user={user} />
  }

  return <TouristDashboard user={user} />
}

function TouristDashboard({ user }: { user: any }) {
  const stats = {
    savedDishes: 24,
    toursBooked: 3,
    reviewsWritten: 12,
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navigation />

      <main className="flex-1 px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-7xl mx-auto">
          {/* Welcome Header */}
          <div className="mb-12">
            <h1 className="text-4xl font-bold text-foreground mb-2">Welcome back, {user?.name || "Guest"}!</h1>
            <p className="text-muted-foreground text-lg">Ready to discover more authentic local food experiences?</p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-gradient-to-br from-card to-muted/40 border-2 border-primary/30 rounded-xl p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <Heart className="w-8 h-8 text-primary" />
                <span className="text-3xl font-bold text-foreground">{stats.savedDishes}</span>
              </div>
              <h3 className="text-muted-foreground font-medium">Saved Dishes</h3>
            </div>

            <div className="bg-gradient-to-br from-card to-muted/40 border-2 border-secondary/30 rounded-xl p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <Calendar className="w-8 h-8 text-secondary" />
                <span className="text-3xl font-bold text-foreground">{stats.toursBooked}</span>
              </div>
              <h3 className="text-muted-foreground font-medium">Tours Booked</h3>
            </div>

            <div className="bg-gradient-to-br from-card to-muted/40 border-2 border-accent/30 rounded-xl p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <TrendingUp className="w-8 h-8 text-accent" />
                <span className="text-3xl font-bold text-foreground">{stats.reviewsWritten}</span>
              </div>
              <h3 className="text-muted-foreground font-medium">Reviews Written</h3>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-6">Quick Actions</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <Link
                href="/swipe"
                className="bg-primary text-primary-foreground rounded-xl p-6 hover:opacity-90 transition-opacity group"
              >
                <Utensils className="w-8 h-8 mb-3" />
                <h3 className="font-semibold text-lg mb-1">Discover Food</h3>
                <p className="text-sm opacity-90">Swipe through local dishes</p>
              </Link>

              <Link
                href="/my-list"
                className="bg-card border-2 border-border rounded-xl p-6 hover:border-primary/50 transition-colors group"
              >
                <Heart className="w-8 h-8 mb-3 text-primary" />
                <h3 className="font-semibold text-lg mb-1 text-foreground">My Lists</h3>
                <p className="text-sm text-muted-foreground">View saved collections</p>
              </Link>

              <Link
                href="/find-tourman"
                className="bg-card border-2 border-border rounded-xl p-6 hover:border-secondary/50 transition-colors group"
              >
                <MapPin className="w-8 h-8 mb-3 text-secondary" />
                <h3 className="font-semibold text-lg mb-1 text-foreground">Find a Guide</h3>
                <p className="text-sm text-muted-foreground">Book a local tour</p>
              </Link>

              <Link
                href="/dashboard/profile"
                className="bg-card border-2 border-border rounded-xl p-6 hover:border-accent/50 transition-colors group"
              >
                <User className="w-8 h-8 mb-3 text-accent" />
                <h3 className="font-semibold text-lg mb-1 text-foreground">My Profile</h3>
                <p className="text-sm text-muted-foreground">Update your settings</p>
              </Link>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-6">Recent Activity</h2>
            <div className="bg-card border border-border rounded-xl p-6">
              <div className="space-y-4">
                <div className="flex items-start gap-4 pb-4 border-b border-border">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Heart className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <p className="text-foreground font-medium">Saved Phở Bò to "Hanoi Street Food Tour"</p>
                    <p className="text-sm text-muted-foreground">2 hours ago</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 pb-4 border-b border-border">
                  <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center flex-shrink-0">
                    <Calendar className="w-5 h-5 text-secondary" />
                  </div>
                  <div className="flex-1">
                    <p className="text-foreground font-medium">Booked a tour with Linh Nguyễn</p>
                    <p className="text-sm text-muted-foreground">Yesterday</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                    <TrendingUp className="w-5 h-5 text-accent" />
                  </div>
                  <div className="flex-1">
                    <p className="text-foreground font-medium">Reviewed "Bún Chả Hương Liên"</p>
                    <p className="text-sm text-muted-foreground">3 days ago</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Personalized Recommendations */}
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-6">Recommended For You</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Link
                href="/swipe"
                className="bg-card border border-border rounded-xl overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="h-48 bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                  <Utensils className="w-16 h-16 text-primary/40" />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-foreground mb-2">New dishes in your area</h3>
                  <p className="text-sm text-muted-foreground">15 new local recommendations</p>
                </div>
              </Link>

              <Link
                href="/find-tourman"
                className="bg-card border border-border rounded-xl overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="h-48 bg-gradient-to-br from-secondary/20 to-secondary/5 flex items-center justify-center">
                  <MapPin className="w-16 h-16 text-secondary/40" />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-foreground mb-2">Popular guides near you</h3>
                  <p className="text-sm text-muted-foreground">8 highly-rated local guides</p>
                </div>
              </Link>

              <Link
                href="/my-list"
                className="bg-card border border-border rounded-xl overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="h-48 bg-gradient-to-br from-accent/20 to-accent/5 flex items-center justify-center">
                  <Heart className="w-16 h-16 text-accent/40" />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-foreground mb-2">Complete your collections</h3>
                  <p className="text-sm text-muted-foreground">3 lists waiting to be explored</p>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

function GuideDashboard({ user }: { user: any }) {
  const guideStats = {
    totalBookings: 47,
    pendingRequests: 5,
    totalEarnings: 1840,
    activeChats: 8,
  }

  const mockChats = [
    {
      id: "1",
      tourist: "Sarah Johnson",
      avatar: "/placeholder.svg",
      lastMessage: "Looking forward to the street food tour tomorrow!",
      time: "2m ago",
      unread: 2,
      status: "confirmed",
    },
    {
      id: "2",
      tourist: "Mike Chen",
      avatar: "/placeholder.svg",
      lastMessage: "Can we start at 2 PM instead?",
      time: "1h ago",
      unread: 1,
      status: "pending",
    },
    {
      id: "3",
      tourist: "Emma Wilson",
      avatar: "/placeholder.svg",
      lastMessage: "Thank you so much for the amazing tour!",
      time: "3h ago",
      unread: 0,
      status: "completed",
    },
    {
      id: "4",
      tourist: "David Lee",
      avatar: "/placeholder.svg",
      lastMessage: "Are vegetarian options available?",
      time: "Yesterday",
      unread: 0,
      status: "inquiry",
    },
  ]

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navigation />

      <main className="flex-1 px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-7xl mx-auto">
          {/* Guide Welcome Header */}
          <div className="mb-12">
            <h1 className="text-4xl font-bold text-foreground mb-2">Welcome, Guide {user?.name || ""}!</h1>
            <p className="text-muted-foreground text-lg">Manage your tours and connect with travelers</p>
          </div>

          {/* Guide Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
            <div className="bg-gradient-to-br from-green-50 to-green-100 border-2 border-green-200 rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <Calendar className="w-8 h-8 text-green-600" />
                <span className="text-3xl font-bold text-green-900">{guideStats.totalBookings}</span>
              </div>
              <h3 className="text-green-700 font-medium">Total Bookings</h3>
            </div>

            <div className="bg-gradient-to-br from-orange-50 to-orange-100 border-2 border-orange-200 rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <Users className="w-8 h-8 text-orange-600" />
                <span className="text-3xl font-bold text-orange-900">{guideStats.pendingRequests}</span>
              </div>
              <h3 className="text-orange-700 font-medium">Pending Requests</h3>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-200 rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <TrendingUp className="w-8 h-8 text-blue-600" />
                <span className="text-3xl font-bold text-blue-900">${guideStats.totalEarnings}</span>
              </div>
              <h3 className="text-blue-700 font-medium">Total Earnings</h3>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-purple-100 border-2 border-purple-200 rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <MessageSquare className="w-8 h-8 text-purple-600" />
                <span className="text-3xl font-bold text-purple-900">{guideStats.activeChats}</span>
              </div>
              <h3 className="text-purple-700 font-medium">Active Chats</h3>
            </div>
          </div>

          {/* Messenger-style Chat List */}
          <div className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-foreground">Tour Requests & Messages</h2>
              <Link
                href="/dashboard/messages"
                className="text-primary hover:text-primary/80 font-medium text-sm flex items-center gap-1"
              >
                View All
                <TrendingUp className="w-4 h-4" />
              </Link>
            </div>
            <div className="bg-card border border-border rounded-xl divide-y divide-border">
              {mockChats.map((chat) => (
                <Link
                  key={chat.id}
                  href={`/dashboard/messages/${chat.id}`}
                  className="flex items-center gap-4 p-4 hover:bg-muted/50 transition-colors cursor-pointer"
                >
                  <div className="relative">
                    <img
                      src={chat.avatar || "/placeholder.svg"}
                      alt={chat.tourist}
                      className="w-14 h-14 rounded-full object-cover"
                    />
                    {chat.unread > 0 && (
                      <div className="absolute -top-1 -right-1 w-6 h-6 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
                        {chat.unread}
                      </div>
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-semibold text-foreground">{chat.tourist}</h3>
                      <span className="text-xs text-muted-foreground">{chat.time}</span>
                    </div>
                    <p
                      className={`text-sm truncate ${chat.unread > 0 ? "font-medium text-foreground" : "text-muted-foreground"}`}
                    >
                      {chat.lastMessage}
                    </p>
                    <span
                      className={`inline-block mt-1 px-2 py-0.5 text-xs rounded-full ${
                        chat.status === "confirmed"
                          ? "bg-green-100 text-green-700"
                          : chat.status === "pending"
                            ? "bg-orange-100 text-orange-700"
                            : chat.status === "completed"
                              ? "bg-blue-100 text-blue-700"
                              : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {chat.status.charAt(0).toUpperCase() + chat.status.slice(1)}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Quick Actions for Guides */}
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-6">Quick Actions</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <Link
                href="/dashboard/messages"
                className="bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-xl p-6 hover:opacity-90 transition-opacity"
              >
                <MessageSquare className="w-8 h-8 mb-3" />
                <h3 className="font-semibold text-lg mb-1">Messages</h3>
                <p className="text-sm opacity-90">Chat with tourists</p>
              </Link>

              <Link
                href="/dashboard/bookings"
                className="bg-card border-2 border-border rounded-xl p-6 hover:border-green-500/50 transition-colors"
              >
                <Calendar className="w-8 h-8 mb-3 text-green-600" />
                <h3 className="font-semibold text-lg mb-1 text-foreground">Manage Bookings</h3>
                <p className="text-sm text-muted-foreground">View and confirm tours</p>
              </Link>

              <Link
                href="/dashboard/profile"
                className="bg-card border-2 border-border rounded-xl p-6 hover:border-blue-500/50 transition-colors"
              >
                <User className="w-8 h-8 mb-3 text-blue-600" />
                <h3 className="font-semibold text-lg mb-1 text-foreground">Edit Profile</h3>
                <p className="text-sm text-muted-foreground">Update your guide info</p>
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
