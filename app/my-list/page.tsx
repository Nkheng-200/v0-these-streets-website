"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { MyListView } from "@/components/mylist/my-list-view"
import { MapView } from "@/components/mylist/map-view"
import { BookshelfView, type Trip } from "@/components/mylist/bookshelf-view"
import { CreateTripForm } from "@/components/mylist/create-trip-form"
import { MapPin, List, ArrowLeft } from "lucide-react"

// Mock Data for Multiple Trips
const mockTrips: Trip[] = [
  {
    id: 1,
    title: "Hanoi Street Food Tour",
    location: "Hanoi, Vietnam",
    date: "Nov 2025",
    coverImage: "/vietnamese-beef-pho-noodle-soup.jpg",
    itemCount: 7,
    dishes: [
      {
        id: 1,
        name: "Phở Bò",
        restaurant: "Phở Hà Nội",
        image: "/vietnamese-beef-pho-noodle-soup.jpg",
        distance: "0.3 km",
        price: "$2.50",
        cuisine: "Beef Noodle",
        source: "Swipe",
        tried: false,
        latitude: 21.0285,
        longitude: 105.8542,
        address: "10 Ly Quoc Su, Hoan Kiem",
        popularDishes: [
          { name: "Rare Beef Pho", price: "$2.50", image: "/rare-beef-pho.jpg" },
          { name: "Fried Dough Sticks", price: "$0.50", image: "/fried-dough-sticks.jpg" },
        ],
      },
      {
        id: 2,
        name: "Bún Chả",
        restaurant: "Bún Chả Tối",
        image: "/vietnamese-bun-cha-grilled-pork.jpg",
        distance: "0.5 km",
        price: "$3.00",
        cuisine: "Grilled Pork",
        source: "Swipe",
        tried: false,
        latitude: 21.0312,
        longitude: 105.8498,
        address: "1 Hang Manh, Hoan Kiem",
        popularDishes: [
          { name: "Grilled Pork Noodles", price: "$3.00", image: "/grilled-pork-noodles.jpg" },
          { name: "Crab Spring Rolls", price: "$1.50", image: "/crab-spring-rolls.jpg" },
        ],
      },
      {
        id: 3,
        name: "Egg Coffee",
        restaurant: "Cà Phê Tàu",
        image: "/vietnamese-egg-coffee-creamy.jpg",
        distance: "0.7 km",
        price: "$1.80",
        cuisine: "Coffee",
        source: "Search",
        tried: false,
        latitude: 21.0305,
        longitude: 105.8509,
        address: "39 Nguyen Huu Huan, Hoan Kiem",
        popularDishes: [
          { name: "Traditional Egg Coffee", price: "$1.80", image: "/traditional-egg-coffee.jpg" },
          { name: "Egg Cocoa", price: "$1.80", image: "/egg-cocoa.jpg" },
        ],
      },
      {
        id: 4,
        name: "Bánh Xèo",
        restaurant: "Bánh Xèo Zòn",
        image: "/vietnamese-banh-xeo-pancake.jpg",
        distance: "1.2 km",
        price: "$4.00",
        cuisine: "Pancake",
        source: "Swipe",
        tried: false,
        latitude: 21.033,
        longitude: 105.84,
        address: "25 Lo Duc, Hai Ba Trung",
        popularDishes: [
          { name: "Special Shrimp Pancake", price: "$4.00", image: "/banh-xeo-shrimp.jpg" },
          { name: "Pork Belly Pancake", price: "$3.50", image: "/banh-xeo-pork.jpg" },
        ],
      },
      {
        id: 5,
        name: "Mì Quảng",
        restaurant: "Mì Quảng 1A",
        image: "/vietnamese-mi-quang-noodles.jpg",
        distance: "2.5 km",
        price: "$3.20",
        cuisine: "Noodles",
        source: "Search",
        tried: false,
        latitude: 21.02,
        longitude: 105.85,
        address: "1A Hai Ba Trung, Hoan Kiem",
        popularDishes: [
          { name: "Chicken Turmeric Noodles", price: "$3.20", image: "/mi-quang-chicken.jpg" },
          { name: "Shrimp & Pork Noodles", price: "$3.50", image: "/mi-quang-special.jpg" },
        ],
      },
      {
        id: 6,
        name: "Gỏi Cuốn",
        restaurant: "Cuốn N Roll",
        image: "/vietnamese-spring-rolls.jpg",
        distance: "0.8 km",
        price: "$2.00",
        cuisine: "Appetizer",
        source: "Swipe",
        tried: false,
        latitude: 21.025,
        longitude: 105.845,
        address: "45 Ngo Quyen, Hoan Kiem",
        popularDishes: [
          { name: "Shrimp & Pork Rolls", price: "$2.00", image: "/spring-rolls-shrimp.jpg" },
          { name: "Grilled Sausage Rolls", price: "$2.20", image: "/spring-rolls-pork.jpg" },
        ],
      },
      {
        id: 7,
        name: "Cà Phê Sữa Đá",
        restaurant: "Cà Phê Lâm",
        image: "/vietnamese-iced-coffee.jpg",
        distance: "0.4 km",
        price: "$1.50",
        cuisine: "Coffee",
        source: "Search",
        tried: false,
        latitude: 21.029,
        longitude: 105.852,
        address: "60 Nguyen Huu Huan, Hoan Kiem",
        popularDishes: [
          { name: "Iced Milk Coffee", price: "$1.50", image: "/iced-coffee.jpg" },
          { name: "Black Coffee", price: "$1.20", image: "/black-coffee.jpg" },
        ],
      },
    ],
  },
  {
    id: 2,
    title: "Saigon Coffee Adventure",
    location: "Ho Chi Minh City",
    date: "Dec 2025",
    coverImage: "/vietnamese-egg-coffee-creamy.jpg",
    itemCount: 7,
    dishes: [
      {
        id: 1,
        name: "Phở Bò",
        restaurant: "Phở Hà Nội",
        image: "/vietnamese-beef-pho-noodle-soup.jpg",
        distance: "0.3 km",
        price: "$2.50",
        cuisine: "Beef Noodle",
        source: "Swipe",
        tried: false,
        latitude: 21.0285,
        longitude: 105.8542,
        address: "10 Ly Quoc Su, Hoan Kiem",
        popularDishes: [
          { name: "Rare Beef Pho", price: "$2.50", image: "/rare-beef-pho.jpg" },
          { name: "Fried Dough Sticks", price: "$0.50", image: "/fried-dough-sticks.jpg" },
        ],
      },
      {
        id: 2,
        name: "Bún Chả",
        restaurant: "Bún Chả Tối",
        image: "/vietnamese-bun-cha-grilled-pork.jpg",
        distance: "0.5 km",
        price: "$3.00",
        cuisine: "Grilled Pork",
        source: "Swipe",
        tried: false,
        latitude: 21.0312,
        longitude: 105.8498,
        address: "1 Hang Manh, Hoan Kiem",
        popularDishes: [
          { name: "Grilled Pork Noodles", price: "$3.00", image: "/grilled-pork-noodles.jpg" },
          { name: "Crab Spring Rolls", price: "$1.50", image: "/crab-spring-rolls.jpg" },
        ],
      },
      {
        id: 3,
        name: "Egg Coffee",
        restaurant: "Cà Phê Tàu",
        image: "/vietnamese-egg-coffee-creamy.jpg",
        distance: "0.7 km",
        price: "$1.80",
        cuisine: "Coffee",
        source: "Search",
        tried: false,
        latitude: 21.0305,
        longitude: 105.8509,
        address: "39 Nguyen Huu Huan, Hoan Kiem",
        popularDishes: [
          { name: "Traditional Egg Coffee", price: "$1.80", image: "/traditional-egg-coffee.jpg" },
          { name: "Egg Cocoa", price: "$1.80", image: "/egg-cocoa.jpg" },
        ],
      },
      {
        id: 4,
        name: "Bánh Xèo",
        restaurant: "Bánh Xèo Zòn",
        image: "/vietnamese-banh-xeo-pancake.jpg",
        distance: "1.2 km",
        price: "$4.00",
        cuisine: "Pancake",
        source: "Swipe",
        tried: false,
        latitude: 21.033,
        longitude: 105.84,
        address: "25 Lo Duc, Hai Ba Trung",
        popularDishes: [
          { name: "Special Shrimp Pancake", price: "$4.00", image: "/banh-xeo-shrimp.jpg" },
          { name: "Pork Belly Pancake", price: "$3.50", image: "/banh-xeo-pork.jpg" },
        ],
      },
      {
        id: 5,
        name: "Mì Quảng",
        restaurant: "Mì Quảng 1A",
        image: "/vietnamese-mi-quang-noodles.jpg",
        distance: "2.5 km",
        price: "$3.20",
        cuisine: "Noodles",
        source: "Search",
        tried: false,
        latitude: 21.02,
        longitude: 105.85,
        address: "1A Hai Ba Trung, Hoan Kiem",
        popularDishes: [
          { name: "Chicken Turmeric Noodles", price: "$3.20", image: "/mi-quang-chicken.jpg" },
          { name: "Shrimp & Pork Noodles", price: "$3.50", image: "/mi-quang-special.jpg" },
        ],
      },
      {
        id: 6,
        name: "Gỏi Cuốn",
        restaurant: "Cuốn N Roll",
        image: "/vietnamese-spring-rolls.jpg",
        distance: "0.8 km",
        price: "$2.00",
        cuisine: "Appetizer",
        source: "Swipe",
        tried: false,
        latitude: 21.025,
        longitude: 105.845,
        address: "45 Ngo Quyen, Hoan Kiem",
        popularDishes: [
          { name: "Shrimp & Pork Rolls", price: "$2.00", image: "/spring-rolls-shrimp.jpg" },
          { name: "Grilled Sausage Rolls", price: "$2.20", image: "/spring-rolls-pork.jpg" },
        ],
      },
      {
        id: 7,
        name: "Cà Phê Sữa Đá",
        restaurant: "Cà Phê Lâm",
        image: "/vietnamese-iced-coffee.jpg",
        distance: "0.4 km",
        price: "$1.50",
        cuisine: "Coffee",
        source: "Search",
        tried: false,
        latitude: 21.029,
        longitude: 105.852,
        address: "60 Nguyen Huu Huan, Hoan Kiem",
        popularDishes: [
          { name: "Iced Milk Coffee", price: "$1.50", image: "/iced-coffee.jpg" },
          { name: "Black Coffee", price: "$1.20", image: "/black-coffee.jpg" },
        ],
      },
    ],
  },
  {
    id: 3,
    title: "Danang Seafood Feast",
    location: "Danang, Vietnam",
    date: "Jan 2026",
    coverImage: "/vietnamese-banh-mi-sandwich.jpg",
    itemCount: 7,
    dishes: [
      {
        id: 1,
        name: "Phở Bò",
        restaurant: "Phở Hà Nội",
        image: "/vietnamese-beef-pho-noodle-soup.jpg",
        distance: "0.3 km",
        price: "$2.50",
        cuisine: "Beef Noodle",
        source: "Swipe",
        tried: false,
        latitude: 21.0285,
        longitude: 105.8542,
        address: "10 Ly Quoc Su, Hoan Kiem",
        popularDishes: [
          { name: "Rare Beef Pho", price: "$2.50", image: "/rare-beef-pho.jpg" },
          { name: "Fried Dough Sticks", price: "$0.50", image: "/fried-dough-sticks.jpg" },
        ],
      },
      {
        id: 2,
        name: "Bún Chả",
        restaurant: "Bún Chả Tối",
        image: "/vietnamese-bun-cha-grilled-pork.jpg",
        distance: "0.5 km",
        price: "$3.00",
        cuisine: "Grilled Pork",
        source: "Swipe",
        tried: false,
        latitude: 21.0312,
        longitude: 105.8498,
        address: "1 Hang Manh, Hoan Kiem",
        popularDishes: [
          { name: "Grilled Pork Noodles", price: "$3.00", image: "/grilled-pork-noodles.jpg" },
          { name: "Crab Spring Rolls", price: "$1.50", image: "/crab-spring-rolls.jpg" },
        ],
      },
      {
        id: 3,
        name: "Egg Coffee",
        restaurant: "Cà Phê Tàu",
        image: "/vietnamese-egg-coffee-creamy.jpg",
        distance: "0.7 km",
        price: "$1.80",
        cuisine: "Coffee",
        source: "Search",
        tried: false,
        latitude: 21.0305,
        longitude: 105.8509,
        address: "39 Nguyen Huu Huan, Hoan Kiem",
        popularDishes: [
          { name: "Traditional Egg Coffee", price: "$1.80", image: "/traditional-egg-coffee.jpg" },
          { name: "Egg Cocoa", price: "$1.80", image: "/egg-cocoa.jpg" },
        ],
      },
      {
        id: 4,
        name: "Bánh Xèo",
        restaurant: "Bánh Xèo Zòn",
        image: "/vietnamese-banh-xeo-pancake.jpg",
        distance: "1.2 km",
        price: "$4.00",
        cuisine: "Pancake",
        source: "Swipe",
        tried: false,
        latitude: 21.033,
        longitude: 105.84,
        address: "25 Lo Duc, Hai Ba Trung",
        popularDishes: [
          { name: "Special Shrimp Pancake", price: "$4.00", image: "/banh-xeo-shrimp.jpg" },
          { name: "Pork Belly Pancake", price: "$3.50", image: "/banh-xeo-pork.jpg" },
        ],
      },
      {
        id: 5,
        name: "Mì Quảng",
        restaurant: "Mì Quảng 1A",
        image: "/vietnamese-mi-quang-noodles.jpg",
        distance: "2.5 km",
        price: "$3.20",
        cuisine: "Noodles",
        source: "Search",
        tried: false,
        latitude: 21.02,
        longitude: 105.85,
        address: "1A Hai Ba Trung, Hoan Kiem",
        popularDishes: [
          { name: "Chicken Turmeric Noodles", price: "$3.20", image: "/mi-quang-chicken.jpg" },
          { name: "Shrimp & Pork Noodles", price: "$3.50", image: "/mi-quang-special.jpg" },
        ],
      },
      {
        id: 6,
        name: "Gỏi Cuốn",
        restaurant: "Cuốn N Roll",
        image: "/vietnamese-spring-rolls.jpg",
        distance: "0.8 km",
        price: "$2.00",
        cuisine: "Appetizer",
        source: "Swipe",
        tried: false,
        latitude: 21.025,
        longitude: 105.845,
        address: "45 Ngo Quyen, Hoan Kiem",
        popularDishes: [
          { name: "Shrimp & Pork Rolls", price: "$2.00", image: "/spring-rolls-shrimp.jpg" },
          { name: "Grilled Sausage Rolls", price: "$2.20", image: "/spring-rolls-pork.jpg" },
        ],
      },
      {
        id: 7,
        name: "Cà Phê Sữa Đá",
        restaurant: "Cà Phê Lâm",
        image: "/vietnamese-iced-coffee.jpg",
        distance: "0.4 km",
        price: "$1.50",
        cuisine: "Coffee",
        source: "Search",
        tried: false,
        latitude: 21.029,
        longitude: 105.852,
        address: "60 Nguyen Huu Huan, Hoan Kiem",
        popularDishes: [
          { name: "Iced Milk Coffee", price: "$1.50", image: "/iced-coffee.jpg" },
          { name: "Black Coffee", price: "$1.20", image: "/black-coffee.jpg" },
        ],
      },
    ],
  },
]

export default function MyListPage() {
  const [viewMode, setViewMode] = useState<"bookshelf" | "trip">("bookshelf")
  const [currentTrip, setCurrentTrip] = useState<Trip | null>(null)
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [trips, setTrips] = useState<Trip[]>(mockTrips)
  const [listView, setListView] = useState<"list" | "map">("list")
  const [sortBy, setSortBy] = useState<"distance" | "cuisine" | "price" | "rating">("distance")

  const handleSelectTrip = (trip: Trip) => {
    setCurrentTrip(trip)
    setDishes(trip.dishes || [])
    setViewMode("trip")
  }

  const handleBackToShelf = () => {
    setViewMode("bookshelf")
    setCurrentTrip(null)
  }

  const handleCreateTrip = (newTrip: { title: string; location: string; date: string; coverImage: string }) => {
    const trip: Trip = {
      id: trips.length + 1,
      ...newTrip,
      coverImage: newTrip.coverImage || "/placeholder.svg",
      itemCount: 0,
      dishes: [],
    }
    setTrips([...trips, trip])
  }

  const handleMarkTried = (id: number) => {
    setDishes(dishes.map((d) => (d.id === id ? { ...d, tried: true } : d)))
  }

  const handleRemove = (id: number) => {
    setDishes(dishes.filter((d) => d.id !== id))
  }

  const handleDeleteTrip = (tripId: number) => {
    setTrips(trips.filter((t) => t.id !== tripId))
    // If currently viewing the deleted trip, go back to bookshelf
    if (currentTrip?.id === tripId) {
      handleBackToShelf()
    }
  }

  const [dishes, setDishes] = useState<any[]>([])

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navigation />

      {/* Header */}
      <section className="bg-accent text-accent-foreground px-4 sm:px-6 lg:px-8 py-8 transition-all duration-500">
        <div className="max-w-6xl mx-auto">
          {viewMode === "trip" && (
            <button
              onClick={handleBackToShelf}
              className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider opacity-60 hover:opacity-100 mb-4 transition-opacity"
            >
              <ArrowLeft size={16} />
              Back to Bookshelf
            </button>
          )}
          <h1 className="text-3xl sm:text-4xl font-serif font-bold mb-2">
            {viewMode === "bookshelf" ? "My Trip Bookshelf" : currentTrip?.title}
          </h1>
          <p className="text-lg opacity-90">
            {viewMode === "bookshelf"
              ? "Your collection of culinary adventures"
              : `${currentTrip?.location} • ${currentTrip?.date}`}
          </p>
        </div>
      </section>

      {/* Controls (Only show in Trip Mode) */}
      {viewMode === "trip" && (
        <div className="bg-card border-b border-border px-4 sm:px-6 lg:px-8 py-6 sticky top-16 z-40 animate-in slide-in-from-top-4 duration-300">
          <div className="max-w-6xl mx-auto space-y-4">
            <div className="flex gap-3">
              <button
                onClick={() => setListView("list")}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-all ${
                  listView === "list"
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}
              >
                <List size={18} />
                List View
              </button>
              <button
                onClick={() => setListView("map")}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-all ${
                  listView === "map"
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}
              >
                <MapPin size={18} />
                Map View
              </button>
            </div>
            <div className="flex gap-3 overflow-x-auto pb-2 no-scrollbar">
              {(["distance", "cuisine", "price", "rating"] as const).map((sort) => (
                <button
                  key={sort}
                  onClick={() => setSortBy(sort)}
                  className={`px-4 py-2 rounded-lg font-semibold whitespace-nowrap transition-all ${
                    sortBy === sort
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground hover:bg-muted/80"
                  }`}
                >
                  {sort.charAt(0).toUpperCase() + sort.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Content */}
      <section className="flex-1 px-4 sm:px-6 lg:px-8 py-8 bg-[#faf7f2] dark:bg-background">
        {viewMode === "bookshelf" ? (
          <div className="animate-in fade-in duration-500">
            <BookshelfView
              trips={trips}
              onSelectTrip={handleSelectTrip}
              onAddTrip={() => setShowCreateForm(true)}
              onDeleteTrip={handleDeleteTrip}
            />
          </div>
        ) : (
          <div className="max-w-6xl mx-auto animate-in slide-in-from-right-8 duration-500">
            {listView === "list" ? (
              <MyListView dishes={dishes} onMarkTried={handleMarkTried} onRemove={handleRemove} />
            ) : (
              <MapView dishes={dishes} />
            )}
          </div>
        )}
      </section>

      <Footer />

      {/* CreateTripForm modal */}
      {showCreateForm && <CreateTripForm onClose={() => setShowCreateForm(false)} onSave={handleCreateTrip} />}
    </div>
  )
}
