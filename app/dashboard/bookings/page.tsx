"use client"

import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { useState } from "react"
import {
  Calendar,
  Clock,
  Users,
  DollarSign,
  Utensils,
  TrendingUp,
  CheckCircle,
  XCircle,
  AlertCircle,
  ChevronDown,
  ChevronUp,
} from "lucide-react"

interface ExtractedInfo {
  dietaryRestrictions: string[]
  accessibilityNeeds: string[]
  timePreferences: string[]
  groupComposition: string[]
  specificInterests: string[]
}

interface Booking {
  id: string
  tourist: {
    name: string
    email: string
    phone: string
    avatar: string
  }
  tourDetails: {
    date: string
    time: string
    duration: string
    groupSize: number
    price: number
  }
  specialRequests: string
  extractedInfo: ExtractedInfo
  status: "pending" | "confirmed" | "completed" | "cancelled"
  createdAt: string
}

// Mock bookings data with AI-extracted information
const mockBookings: Booking[] = [
  {
    id: "BK001",
    tourist: {
      name: "Sarah Johnson",
      email: "sarah.j@email.com",
      phone: "+1 555-0123",
      avatar: "https://i.pravatar.cc/150?img=1",
    },
    tourDetails: {
      date: "2024-12-20",
      time: "10:00 AM",
      duration: "3 hours",
      groupSize: 4,
      price: 88,
    },
    specialRequests:
      "We're vegetarian and traveling with two kids (ages 6 and 8). Interested in street food and local markets. One child has a nut allergy. We prefer a slow pace and morning tours.",
    extractedInfo: {
      dietaryRestrictions: ["Vegetarian", "Nut Allergy"],
      accessibilityNeeds: ["Slow Pace Preferred"],
      timePreferences: ["Morning Preferred"],
      groupComposition: ["Traveling with Kids"],
      specificInterests: ["Street Food", "Local Markets"],
    },
    status: "confirmed",
    createdAt: "2024-12-10",
  },
  {
    id: "BK002",
    tourist: {
      name: "Mike Chen",
      email: "mchen@email.com",
      phone: "+1 555-0456",
      avatar: "https://i.pravatar.cc/150?img=12",
    },
    tourDetails: {
      date: "2024-12-21",
      time: "2:00 PM",
      duration: "4 hours",
      groupSize: 2,
      price: 44,
    },
    specialRequests:
      "Looking for hidden gems and cultural experiences. We love spicy food and photography opportunities. Flexible with timing, interested in learning about local history.",
    extractedInfo: {
      dietaryRestrictions: [],
      accessibilityNeeds: [],
      timePreferences: ["Flexible Timing"],
      groupComposition: [],
      specificInterests: ["Hidden Gems", "Cultural/Historical", "Spicy Food", "Photo Opportunities"],
    },
    status: "pending",
    createdAt: "2024-12-12",
  },
  {
    id: "BK003",
    tourist: {
      name: "Emma Wilson",
      email: "emma.w@email.com",
      phone: "+1 555-0789",
      avatar: "https://i.pravatar.cc/150?img=5",
    },
    tourDetails: {
      date: "2024-12-18",
      time: "6:00 PM",
      duration: "3 hours",
      groupSize: 6,
      price: 132,
    },
    specialRequests:
      "Large group of 6, traveling with elderly grandparents who have limited mobility. Need wheelchair access. Interested in seafood and desserts. Evening preferred for dinner time.",
    extractedInfo: {
      dietaryRestrictions: [],
      accessibilityNeeds: ["Wheelchair Access", "Limited Mobility"],
      timePreferences: ["Evening Preferred"],
      groupComposition: ["Large Group", "Elderly Members"],
      specificInterests: ["Seafood Focus", "Desserts"],
    },
    status: "completed",
    createdAt: "2024-12-01",
  },
  {
    id: "BK004",
    tourist: {
      name: "David Lee",
      email: "david.lee@email.com",
      phone: "+1 555-0321",
      avatar: "https://i.pravatar.cc/150?img=8",
    },
    tourDetails: {
      date: "2024-12-22",
      time: "11:00 AM",
      duration: "2 hours",
      groupSize: 3,
      price: 66,
    },
    specialRequests:
      "Vegan and gluten-free requirements. My wife is pregnant so we need frequent rest breaks. Love coffee culture and would like to learn about cooking local dishes. Morning preferred.",
    extractedInfo: {
      dietaryRestrictions: ["Vegan", "Gluten-Free"],
      accessibilityNeeds: ["Slow Pace Preferred"],
      timePreferences: ["Morning Preferred"],
      groupComposition: ["Pregnant Traveler"],
      specificInterests: ["Coffee Culture", "Cooking Experience"],
    },
    status: "pending",
    createdAt: "2024-12-13",
  },
  {
    id: "BK005",
    tourist: {
      name: "Lisa Martinez",
      email: "lisa.m@email.com",
      phone: "+1 555-0654",
      avatar: "https://i.pravatar.cc/150?img=9",
    },
    tourDetails: {
      date: "2024-12-19",
      time: "3:00 PM",
      duration: "5 hours",
      groupSize: 2,
      price: 44,
    },
    specialRequests:
      "Halal food only. Interested in street food vendors and hidden local spots. We're flexible with timing and love trying spicy dishes. Would love to visit traditional wet markets.",
    extractedInfo: {
      dietaryRestrictions: ["Halal"],
      accessibilityNeeds: [],
      timePreferences: ["Flexible Timing"],
      groupComposition: [],
      specificInterests: ["Street Food", "Hidden Gems", "Spicy Food", "Local Markets"],
    },
    status: "confirmed",
    createdAt: "2024-12-08",
  },
]

export default function ManageBookingsPage() {
  const [expandedBooking, setExpandedBooking] = useState<string | null>(null)
  const [filterStatus, setFilterStatus] = useState<string>("all")

  // Calculate statistics
  const stats = {
    totalPeople: mockBookings.reduce((sum, b) => sum + b.tourDetails.groupSize, 0),
    avgGroupSize: (mockBookings.reduce((sum, b) => sum + b.tourDetails.groupSize, 0) / mockBookings.length).toFixed(1),
    avgDuration: (
      mockBookings.reduce((sum, b) => {
        const durationValue = Number.parseFloat(b.tourDetails.duration.split(" ")[0]) || 0
        return sum + durationValue
      }, 0) / mockBookings.length
    ).toFixed(1),
    totalRevenue: mockBookings.reduce((sum, b) => {
      const price = Number(b.tourDetails.price) || 0
      return sum + price
    }, 0),
    pendingCount: mockBookings.filter((b) => b.status === "pending").length,
    confirmedCount: mockBookings.filter((b) => b.status === "confirmed").length,
  }

  // Count food preferences from all bookings
  const foodPreferences = {
    vegetarian: mockBookings.filter((b) => b.extractedInfo.dietaryRestrictions.includes("Vegetarian")).length,
    vegan: mockBookings.filter((b) => b.extractedInfo.dietaryRestrictions.includes("Vegan")).length,
    halal: mockBookings.filter((b) => b.extractedInfo.dietaryRestrictions.includes("Halal")).length,
    allergies: mockBookings.filter((b) => b.extractedInfo.dietaryRestrictions.some((r) => r.includes("Allergy")))
      .length,
    glutenFree: mockBookings.filter((b) => b.extractedInfo.dietaryRestrictions.includes("Gluten-Free")).length,
  }

  const filteredBookings = filterStatus === "all" ? mockBookings : mockBookings.filter((b) => b.status === filterStatus)

  const toggleExpand = (id: string) => {
    setExpandedBooking(expandedBooking === id ? null : id)
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "confirmed":
        return (
          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
            <CheckCircle className="w-4 h-4 mr-1" />
            Confirmed
          </span>
        )
      case "pending":
        return (
          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-orange-100 text-orange-800">
            <AlertCircle className="w-4 h-4 mr-1" />
            Pending
          </span>
        )
      case "completed":
        return (
          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
            <CheckCircle className="w-4 h-4 mr-1" />
            Completed
          </span>
        )
      case "cancelled":
        return (
          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-800">
            <XCircle className="w-4 h-4 mr-1" />
            Cancelled
          </span>
        )
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navigation />

      <main className="flex-1 px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-foreground mb-2">Manage Bookings</h1>
            <p className="text-muted-foreground text-lg">Track your tours and customer preferences</p>
          </div>

          {/* Statistics Dashboard */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-6">Tour Statistics</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {/* Total People */}
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-200 rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <Users className="w-8 h-8 text-blue-600" />
                  <span className="text-3xl font-bold text-blue-900">{stats.totalPeople}</span>
                </div>
                <h3 className="text-blue-700 font-medium">Total People</h3>
                <p className="text-sm text-blue-600 mt-1">Avg: {stats.avgGroupSize} per tour</p>
              </div>

              {/* Average Duration */}
              <div className="bg-gradient-to-br from-purple-50 to-purple-100 border-2 border-purple-200 rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <Clock className="w-8 h-8 text-purple-600" />
                  <span className="text-3xl font-bold text-purple-900">{stats.avgDuration}h</span>
                </div>
                <h3 className="text-purple-700 font-medium">Average Duration</h3>
                <p className="text-sm text-purple-600 mt-1">Ideal tour length</p>
              </div>

              {/* Total Revenue */}
              <div className="bg-gradient-to-br from-green-50 to-green-100 border-2 border-green-200 rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <DollarSign className="w-8 h-8 text-green-600" />
                  <span className="text-3xl font-bold text-green-900">{stats.totalRevenue}</span>
                </div>
                <h3 className="text-green-700 font-medium">Total Revenue</h3>
                <p className="text-sm text-green-600 mt-1">From {mockBookings.length} bookings</p>
              </div>

              {/* Pending Requests */}
              <div className="bg-gradient-to-br from-orange-50 to-orange-100 border-2 border-orange-200 rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <AlertCircle className="w-8 h-8 text-orange-600" />
                  <span className="text-3xl font-bold text-orange-900">{stats.pendingCount}</span>
                </div>
                <h3 className="text-orange-700 font-medium">Pending Requests</h3>
                <p className="text-sm text-orange-600 mt-1">Need confirmation</p>
              </div>
            </div>

            {/* Food Preferences Chart */}
            <div className="bg-card border-2 border-border rounded-xl p-6">
              <h3 className="text-xl font-bold text-foreground mb-4 flex items-center">
                <Utensils className="w-6 h-6 mr-2 text-primary" />
                Dietary Requirements Overview
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-3xl font-bold text-green-700">{foodPreferences.vegetarian}</div>
                  <div className="text-sm text-green-600 mt-1">Vegetarian</div>
                </div>
                <div className="text-center p-4 bg-emerald-50 rounded-lg">
                  <div className="text-3xl font-bold text-emerald-700">{foodPreferences.vegan}</div>
                  <div className="text-sm text-emerald-600 mt-1">Vegan</div>
                </div>
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-3xl font-bold text-blue-700">{foodPreferences.halal}</div>
                  <div className="text-sm text-blue-600 mt-1">Halal</div>
                </div>
                <div className="text-center p-4 bg-red-50 rounded-lg">
                  <div className="text-3xl font-bold text-red-700">{foodPreferences.allergies}</div>
                  <div className="text-sm text-red-600 mt-1">Allergies</div>
                </div>
                <div className="text-center p-4 bg-amber-50 rounded-lg">
                  <div className="text-3xl font-bold text-amber-700">{foodPreferences.glutenFree}</div>
                  <div className="text-sm text-amber-600 mt-1">Gluten-Free</div>
                </div>
              </div>
            </div>
          </div>

          {/* Bookings List */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-foreground">All Bookings</h2>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-4 py-2 border border-border rounded-lg bg-card text-foreground"
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="confirmed">Confirmed</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>

            <div className="space-y-4">
              {filteredBookings.map((booking) => (
                <div key={booking.id} className="bg-card border-2 border-border rounded-xl overflow-hidden">
                  {/* Booking Header */}
                  <div
                    className="p-6 cursor-pointer hover:bg-muted/50 transition-colors"
                    onClick={() => toggleExpand(booking.id)}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-4 flex-1">
                        <img
                          src={booking.tourist.avatar || "/placeholder.svg"}
                          alt={booking.tourist.name}
                          className="w-16 h-16 rounded-full object-cover"
                        />
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-xl font-bold text-foreground">{booking.tourist.name}</h3>
                            {getStatusBadge(booking.status)}
                          </div>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                            <div className="flex items-center text-muted-foreground">
                              <Calendar className="w-4 h-4 mr-1" />
                              {booking.tourDetails.date}
                            </div>
                            <div className="flex items-center text-muted-foreground">
                              <Clock className="w-4 h-4 mr-1" />
                              {booking.tourDetails.time}
                            </div>
                            <div className="flex items-center text-muted-foreground">
                              <Users className="w-4 h-4 mr-1" />
                              {booking.tourDetails.groupSize} people
                            </div>
                            <div className="flex items-center text-muted-foreground">
                              <DollarSign className="w-4 h-4 mr-1" />
                              {booking.tourDetails.price}
                            </div>
                          </div>
                        </div>
                      </div>
                      <button className="text-muted-foreground hover:text-foreground ml-4">
                        {expandedBooking === booking.id ? (
                          <ChevronUp className="w-6 h-6" />
                        ) : (
                          <ChevronDown className="w-6 h-6" />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Expanded Details */}
                  {expandedBooking === booking.id && (
                    <div className="border-t border-border bg-muted/20 p-6">
                      <div className="grid md:grid-cols-2 gap-6">
                        {/* Contact Information */}
                        <div>
                          <h4 className="font-semibold text-foreground mb-3">Contact Information</h4>
                          <div className="space-y-2 text-sm">
                            <p className="text-muted-foreground">
                              <span className="font-medium text-foreground">Email:</span> {booking.tourist.email}
                            </p>
                            <p className="text-muted-foreground">
                              <span className="font-medium text-foreground">Phone:</span> {booking.tourist.phone}
                            </p>
                            <p className="text-muted-foreground">
                              <span className="font-medium text-foreground">Booking ID:</span> {booking.id}
                            </p>
                          </div>
                        </div>

                        {/* Special Requests */}
                        <div>
                          <h4 className="font-semibold text-foreground mb-3">Special Requests</h4>
                          <p className="text-sm text-muted-foreground bg-card p-3 rounded-lg border border-border">
                            {booking.specialRequests}
                          </p>
                        </div>
                      </div>

                      {/* AI Extracted Information */}
                      <div className="mt-6 bg-gradient-to-r from-orange-50 to-amber-50 border-2 border-orange-200 rounded-xl p-5">
                        <h4 className="font-semibold text-orange-900 mb-4 flex items-center text-lg">
                          <TrendingUp className="w-5 h-5 mr-2" />
                          AI-Extracted Requirements
                        </h4>

                        <div className="grid md:grid-cols-2 gap-4">
                          {/* Dietary Restrictions */}
                          {booking.extractedInfo.dietaryRestrictions.length > 0 && (
                            <div>
                              <p className="text-sm font-medium text-orange-800 mb-2">Dietary Restrictions:</p>
                              <div className="flex flex-wrap gap-2">
                                {booking.extractedInfo.dietaryRestrictions.map((item, idx) => (
                                  <span
                                    key={idx}
                                    className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-xs font-medium"
                                  >
                                    {item}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* Accessibility Needs */}
                          {booking.extractedInfo.accessibilityNeeds.length > 0 && (
                            <div>
                              <p className="text-sm font-medium text-orange-800 mb-2">Accessibility Needs:</p>
                              <div className="flex flex-wrap gap-2">
                                {booking.extractedInfo.accessibilityNeeds.map((item, idx) => (
                                  <span
                                    key={idx}
                                    className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium"
                                  >
                                    {item}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* Group Composition */}
                          {booking.extractedInfo.groupComposition.length > 0 && (
                            <div>
                              <p className="text-sm font-medium text-orange-800 mb-2">Group Composition:</p>
                              <div className="flex flex-wrap gap-2">
                                {booking.extractedInfo.groupComposition.map((item, idx) => (
                                  <span
                                    key={idx}
                                    className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-xs font-medium"
                                  >
                                    {item}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* Time Preferences */}
                          {booking.extractedInfo.timePreferences.length > 0 && (
                            <div>
                              <p className="text-sm font-medium text-orange-800 mb-2">Time Preferences:</p>
                              <div className="flex flex-wrap gap-2">
                                {booking.extractedInfo.timePreferences.map((item, idx) => (
                                  <span
                                    key={idx}
                                    className="px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-xs font-medium"
                                  >
                                    {item}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* Specific Interests */}
                          {booking.extractedInfo.specificInterests.length > 0 && (
                            <div className="md:col-span-2">
                              <p className="text-sm font-medium text-orange-800 mb-2">Specific Interests:</p>
                              <div className="flex flex-wrap gap-2">
                                {booking.extractedInfo.specificInterests.map((item, idx) => (
                                  <span
                                    key={idx}
                                    className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium"
                                  >
                                    {item}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Action Buttons */}
                      {booking.status === "pending" && (
                        <div className="mt-6 flex gap-3">
                          <button className="flex-1 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors">
                            Confirm Booking
                          </button>
                          <button className="flex-1 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors">
                            Decline
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
