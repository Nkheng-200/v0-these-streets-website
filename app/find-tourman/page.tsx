"use client"

import type React from "react"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { TourmanProfile } from "@/components/tourman/tourman-profile"
import { TourmanMap } from "@/components/tourman/tourman-map"
import { ChatModal } from "@/components/tourman/chat-modal" // import ChatModal
import { Search, Sliders } from "lucide-react"

const mockRestaurants = [
  {
    id: 101,
    name: "Phở Gia Truyền Bát Đàn",
    lat: 21.0295,
    lng: 105.849,
    cuisine: "Pho",
    address: "49 Bát Đàn, Hoàn Kiếm, Hà Nội",
    phone: "+84 24 3828 5025",
    openingHours: "6:00 AM - 10:00 AM, 6:00 PM - 8:30 PM",
    seatingStyle: "Low stools, shared tables",
    maxGroupSize: 4,
    busyHours: "7:30 AM - 9:00 AM",
    signatureDish: {
      name: "Phở Tái Nạm",
      price: "$2.50",
      description:
        "Traditional beef noodle soup with rare and well-done beef, featuring clear, aromatic bone broth simmered for 12 hours.",
    },
    menuShowcase: [
      { name: "Phở Tái", price: "$2.20", description: "Rare beef noodle soup" },
      { name: "Phở Chín", price: "$2.20", description: "Well-done beef noodle soup" },
      { name: "Quẩy", price: "$0.40", description: "Fried dough sticks" },
    ],
  },
  {
    id: 102,
    name: "Bún Chả Hương Liên",
    lat: 21.018,
    lng: 105.855,
    cuisine: "Bun Cha",
    address: "24 Lê Văn Hưu, Hai Bà Trưng, Hà Nội",
    phone: "+84 24 3943 4106",
    openingHours: "8:00 AM - 8:30 PM",
    seatingStyle: "Standard tables, multi-floor",
    maxGroupSize: 10,
    busyHours: "11:30 AM - 1:00 PM",
    signatureDish: {
      name: "Obama Combo",
      price: "$4.50",
      description:
        "The famous set ordered by President Obama: Grilled pork noodles, seafood spring roll, and a Hanoi beer.",
    },
    menuShowcase: [
      { name: "Bún Chả", price: "$2.00", description: "Grilled pork with rice vermicelli" },
      { name: "Nem Cua Bể", price: "$2.50", description: "Crab spring roll (square shape)" },
      { name: "Nem Hải Sản", price: "$1.50", description: "Seafood spring roll" },
    ],
  },
  {
    id: 103,
    name: "Giảng Cafe",
    lat: 21.03,
    lng: 105.852,
    cuisine: "Egg Coffee",
    address: "39 Nguyễn Hữu Huân, Hoàn Kiếm, Hà Nội",
    phone: "+84 98 989 22 98",
    openingHours: "7:00 AM - 10:00 PM",
    seatingStyle: "Low tables, intimate atmosphere",
    maxGroupSize: 6,
    busyHours: "9:00 AM - 11:00 AM",
    signatureDish: {
      name: "Cà Phê Trứng",
      price: "$1.50",
      description:
        "Legendary egg coffee invented here in 1946. Rich, creamy egg yolk whipped with sugar and condensed milk over robust Robusta coffee.",
    },
    menuShowcase: [
      { name: "Cà Phê Trứng Đậu Xanh", price: "$1.80", description: "Egg coffee with mung bean" },
      { name: "Cacao Trứng", price: "$1.50", description: "Egg cocoa (non-coffee option)" },
      { name: "Bia Trứng", price: "$2.20", description: "Egg beer" },
    ],
  },
  {
    id: 104,
    name: "Bánh Mì 25",
    lat: 21.032,
    lng: 105.851,
    cuisine: "Banh Mi",
    address: "25 Hàng Cá, Hoàn Kiếm, Hà Nội",
    phone: "+84 97 766 88 95",
    openingHours: "7:00 AM - 9:00 PM",
    seatingStyle: "Street-side & indoor seating",
    maxGroupSize: 8,
    busyHours: "12:00 PM - 1:30 PM",
    signatureDish: {
      name: "Bánh Mì Thập Cẩm",
      price: "$1.80",
      description: "Mixed baguette with pate, barbecued pork, jambon, and sausage with house-made pickled vegetables.",
    },
    menuShowcase: [
      { name: "Bánh Mì Pate", price: "$1.20", description: "Pate baguette" },
      { name: "Bánh Mì Gà", price: "$1.50", description: "Chicken baguette" },
      { name: "Sữa Đậu Nành", price: "$0.60", description: "Fresh soy milk" },
    ],
  },
  {
    id: 105,
    name: "Xôi Yến",
    lat: 21.0295,
    lng: 105.8535,
    cuisine: "Sticky Rice",
    address: "35B Nguyễn Hữu Huân, Hoàn Kiếm, Hà Nội",
    phone: "+84 24 3926 3427",
    openingHours: "6:00 AM - 11:30 PM",
    seatingStyle: "Standard tables, busy atmosphere",
    maxGroupSize: 8,
    busyHours: "7:00 AM - 8:30 AM",
    signatureDish: {
      name: "Xôi Xéo Gà",
      price: "$2.00",
      description: "Turmeric sticky rice with mung bean paste, topped with shredded chicken and fried shallots.",
    },
    menuShowcase: [
      { name: "Xôi Thập Cẩm", price: "$2.50", description: "Mixed sticky rice with pork, pate, egg, sausage" },
      { name: "Sữa Ngô", price: "$0.80", description: "Corn milk" },
      { name: "Dưa Góp", price: "$0.40", description: "Pickled cucumber side dish" },
    ],
  },
  {
    id: 106,
    name: "Chả Cá Lã Vọng",
    lat: 21.036,
    lng: 105.847,
    cuisine: "Grilled Fish",
    address: "14 Chả Cá, Hoàn Kiếm, Hà Nội",
    phone: "+84 24 3825 3929",
    openingHours: "11:00 AM - 2:00 PM, 5:00 PM - 9:00 PM",
    seatingStyle: "Traditional wooden tables",
    maxGroupSize: 6,
    busyHours: "7:00 PM - 8:00 PM",
    signatureDish: {
      name: "Chả Cá Lã Vọng",
      price: "$7.50",
      description:
        "Turmeric marinated fish grilled tableside with dill and spring onions, served with vermicelli and shrimp paste.",
    },
    menuShowcase: [
      { name: "Bún Rối", price: "Free", description: "Extra vermicelli" },
      { name: "Lạc Rang", price: "Free", description: "Roasted peanuts" },
    ],
  },
]

// Enhanced mock tourman data with 4.9 ratings and detailed reviews
const mockTourmans = [
  {
    id: 1,
    name: "Linh Nguyễn",
    image: "/tourman-linh-nguyen.jpg",
    coverImage: "/vietnamese-beef-pho-noodle-soup.jpg",
    languages: ["English", "French", "Vietnamese"],
    expertAreas: ["Hoàn Kiếm", "Old Quarter", "Phở"],
    rating: 4.9,
    price: "$22/hour",
    hourlyRate: 22,
    availability: "online",
    badge: "Trusted Local",
    bio: "Born and raised in Hanoi's Old Quarter. 10+ years exploring local food culture.",
    specialties: ["Street Food", "Hidden Gems", "Local History"],
    routes: [
      { name: "Old Quarter Street Food", duration: "3 hours", price: "$30/person" },
      { name: "Phở Master's Journey", duration: "2 hours", price: "$25/person" },
    ],
    reviews: [
      {
        author: "Sarah",
        text: "Linh took our group through the most incredible food journey in Hanoi's Old Quarter. We visited 5 different hidden phở stalls that locals have been going to for decades. Her knowledge of the neighborhood's history made every stop feel special and authentic. She even helped us negotiate with vendors and explained the traditional methods of making bone broth. Definitely worth every penny!",
      },
      {
        author: "Marco",
        text: "Best food tour I've ever done, and I've been to 20+ cities. Linh's passion for local food culture is contagious. She doesn't just show you where to eat; she teaches you the 'why' behind each dish. The vegetarian options she suggested were as impressive as the meat dishes. Her recommendations have become our go-to whenever we're in Hanoi.",
      },
    ],
    lat: 21.0285,
    lng: 105.8542,
    groupSize: "1-4 people",
    favoriteSpots: [
      { name: "Hidden Phở Stall", district: "Old Quarter" },
      { name: "Local Bánh Mì Stand", district: "Hoàn Kiếm" },
    ],
  },
  {
    id: 2,
    name: "Tuấn",
    image: "/tourman-tuan.jpg",
    coverImage: "/vietnamese-egg-coffee-creamy.jpg",
    languages: ["English", "Vietnamese", "Chinese"],
    expertAreas: ["Ba Đình", "Bún Chả", "Coffee"],
    rating: 4.9,
    price: "$19/hour",
    hourlyRate: 19,
    availability: "online",
    badge: "Hidden Gem Guide",
    bio: "Local food blogger and Hanoi's best-kept secret tour guide.",
    specialties: ["Coffee Culture", "Night Bites", "Local Markets"],
    routes: [
      { name: "Hanoi Coffee Culture", duration: "2.5 hours", price: "$20/person" },
      { name: "Night Food Adventure", duration: "3 hours", price: "$28/person" },
    ],
    reviews: [
      {
        author: "Lisa",
        text: "Tuấn's knowledge of Hanoi's food scene is absolutely incredible. He took us to a coffee workshop where we learned about the traditional Vietnamese coffee culture dating back to the French colonial era. We tasted 7 different local coffee preparations and learned brewing techniques we never knew existed. His connections with local owners meant we got behind-the-scenes access and special discounts. The night food tour was equally amazing—street food at midnight has never been better!",
      },
      {
        author: "David",
        text: "Every single spot Tuấn took us to was perfect. No tourist traps, no overpriced restaurants. Just genuine, delicious local food in neighborhood spots where real Hanoians eat. He explained the cultural significance of each dish and shared stories about the vendors' families. Felt like we were eating with a close friend who knew everyone in the city. Worth every penny and then some.",
      },
    ],
    lat: 21.0483,
    lng: 105.8045,
    groupSize: "1-6 people",
    favoriteSpots: [
      { name: "Bún Chả Tối", district: "Ba Đình" },
      { name: "Local Coffee Shop", district: "Old Quarter" },
    ],
  },
  {
    id: 3,
    name: "Hương",
    image: "/tourman-huong.jpg",
    coverImage: "/vietnamese-sticky-rice-gac.jpg",
    languages: ["English", "Vietnamese", "Spanish"],
    expertAreas: ["Hoan Kiem", "Vegetarian Cuisine", "Markets"],
    rating: 4.9,
    price: "$20/hour",
    hourlyRate: 20,
    availability: "offline",
    badge: null,
    bio: "Vegetarian chef turned food guide. Passionate about plant-based Vietnamese cuisine.",
    specialties: ["Vegetarian Food", "Market Tours", "Cooking Tips"],
    routes: [
      { name: "Vegetarian Hanoi", duration: "3 hours", price: "$22/person" },
      { name: "Market to Table", duration: "4 hours", price: "$35/person" },
    ],
    reviews: [
      {
        author: "Emma",
        text: "Perfect for vegetarians! Hương showed us vegetarian options in Vietnamese cuisine that we never knew existed. She took us to a morning market tour and taught us how to select fresh produce like a local. We learned about seasonal vegetables, herbs, and traditional cooking methods passed down through generations. Her market-to-table cooking session was the highlight—we prepared a full 5-course vegetarian meal together. Best culinary experience ever!",
      },
      {
        author: "John",
        text: "Hương made us appreciate local ingredients so much more. She's not just a guide; she's an educator who genuinely cares about sustainable food practices and supporting local farmers. We met several vendors she's built relationships with over years, and they shared personal stories about their families and farming methods. The respect she shows for the land and the people who work it is inspiring. Truly transformative experience.",
      },
    ],
    lat: 21.0264,
    lng: 105.8391,
    groupSize: "1-5 people",
    favoriteSpots: [
      { name: "Vegetarian Market Stand", district: "Hoan Kiem" },
      { name: "Local Herb Shop", district: "Old Quarter" },
    ],
  },
  {
    id: 4,
    name: "Minh Hoàng",
    image: "/tourman-minh-hoang.jpg",
    coverImage: "/vietnamese-cha-ca-fish-turmeric.jpg",
    languages: ["English", "Vietnamese"],
    expertAreas: ["West Lake", "Seafood", "Traditional Recipes"],
    rating: 4.9,
    price: "$25/hour",
    hourlyRate: 25,
    availability: "online",
    badge: "Top Rated",
    bio: "Chef with 15 years experience, specializing in traditional Hanoi seafood dishes.",
    specialties: ["Seafood Specialties", "Family Recipes", "Cooking Classes"],
    routes: [
      { name: "West Lake Seafood Tour", duration: "3 hours", price: "$30/person" },
      { name: "Traditional Family Cooking", duration: "4 hours", price: "$45/person" },
    ],
    reviews: [
      {
        author: "James",
        text: "Minh is an absolute professional. His seafood tour around West Lake was detailed and educational. He explained the differences between fish species, showed us traditional preparation methods, and took us to family-run seafood restaurants where the owners greeted him like family. The cooking class afterward was phenomenal—we prepared 4 dishes from scratch and understood the reasoning behind each technique. His English is perfect and his explanations are crystal clear.",
      },
      {
        author: "Sophie",
        text: "The level of detail Minh goes into is unmatched. He sourced ingredients from three different local markets to show us quality standards. His family recipe collection represents authentic Hanoi cuisine that you won't find in any cookbook. We learned not just how to cook, but the stories behind each dish and their cultural significance. He also provided us with written recipes and a curated list of the best local markets and vendors.",
      },
    ],
    lat: 21.0663,
    lng: 105.8187,
    groupSize: "1-6 people",
    favoriteSpots: [
      { name: "West Lake Fish Market", district: "West Lake" },
      { name: "Minh's Family Kitchen", district: "Ba Đình" },
    ],
  },
  {
    id: 5,
    name: "Quỳnh Anh",
    image: "/tourman-quynh-anh.jpg",
    coverImage: "/vietnamese-banh-mi.jpg",
    languages: ["English", "French", "Vietnamese"],
    expertAreas: ["Dong Xuan", "Market Culture", "Street Food"],
    rating: 4.8,
    price: "$18/hour",
    hourlyRate: 18,
    availability: "offline",
    badge: null,
    bio: "Market expert with deep connections in Hanoi's food community.",
    specialties: ["Market Tours", "Food Culture", "Street Food"],
    routes: [
      { name: "Dong Xuan Market Experience", duration: "2.5 hours", price: "$22/person" },
      { name: "Street Food After Dark", duration: "3.5 hours", price: "$25/person" },
    ],
    reviews: [
      {
        author: "Anna",
        text: "Quỳnh Anh navigated the massive Dong Xuan market like a symphony conductor. She knows every vendor, their specialty, and their story. She taught us what to look for in fresh produce and how to haggle respectfully. The market tour was a complete sensory experience—sights, sounds, smells, and tastes all carefully curated. We tasted 15+ different items and understood the supply chain from farm to market.",
      },
      {
        author: "Roberto",
        text: "This was not your typical tourist food tour. Quỳnh Anh takes you where actual Hanoi residents shop and eat. She's incredibly respectful of the vendors and explains the cultural context of the market's history. The after-dark street food adventure showed us dishes and locations that most tourists never discover. Her passion for preserving local food culture is admirable.",
      },
    ],
    lat: 21.0358,
    lng: 105.8484,
    groupSize: "1-5 people",
    favoriteSpots: [
      { name: "Dong Xuan Market", district: "Hoan Kiem" },
      { name: "Night Street Stall Alley", district: "Old Quarter" },
    ],
  },
]

export default function FindTourmanPage() {
  const [tourmans, setTourmans] = useState(mockTourmans)
  const [selectedTourman, setSelectedTourman] = useState<(typeof mockTourmans)[0] | null>(null)
  const [focusedTourmanId, setFocusedTourmanId] = useState<number | undefined>(undefined) // Add focused state for map
  const [chatTourman, setChatTourman] = useState<(typeof mockTourmans)[0] | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [filters, setFilters] = useState({
    onlineOnly: false,
    topRatedOnly: false,
  })
  const [showFilters, setShowFilters] = useState(false)

  const filteredTourmans = tourmans.filter((tourman) => {
    const matchesSearch =
      tourman.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tourman.expertAreas.some((area) => area.toLowerCase().includes(searchTerm.toLowerCase())) ||
      tourman.specialties.some((spec) => spec.toLowerCase().includes(searchTerm.toLowerCase()))

    const matchesOnline = !filters.onlineOnly || tourman.availability === "online"
    const matchesTopRated = !filters.topRatedOnly || tourman.rating >= 4.9

    return matchesSearch && matchesOnline && matchesTopRated
  })

  const handleSelectTourman = (tourman: (typeof mockTourmans)[0]) => {
    setSelectedTourman(tourman)
  }

  const handleShowOnMap = (tourmanId: number, e: React.MouseEvent) => {
    e.stopPropagation()
    setFocusedTourmanId(tourmanId)
  }

  const handleOpenChat = (tourman: (typeof mockTourmans)[0], e: React.MouseEvent) => {
    e.stopPropagation()
    setChatTourman(tourman)
  }

  const handleBookNow = (tourman: (typeof mockTourmans)[0], e: React.MouseEvent) => {
    e.stopPropagation()
    const params = new URLSearchParams({
      name: tourman.name,
      price: tourman.price.toString(),
      rating: tourman.rating.toString(),
    })
    window.location.href = `/transaction?${params.toString()}`
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navigation />

      {/* Professional Header with Modern Sans Font */}
      <section className="bg-secondary text-secondary-foreground px-4 sm:px-6 lg:px-8 py-6 shrink-0">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl sm:text-4xl font-serif font-bold mb-1">Find a Tourman</h1>
          <p className="text-base opacity-90">Connect with verified locals who know the real food gems</p>
        </div>
      </section>

      {/* Search and Filter Bar - Normal positioning (Left Behind) */}
      <div className="bg-card border-b border-border px-4 sm:px-6 lg:px-8 py-4 z-40">
        <div className="max-w-7xl mx-auto flex gap-3 items-center">
          {/* Search Bar */}
          <div className="flex-1 relative">
            <Search size={18} className="absolute left-3 top-3 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search tourmen, cuisines, or specialties..."
              className="w-full pl-10 pr-4 py-2 border border-border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Filter Button */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="p-2 rounded-lg border border-border hover:bg-muted transition-colors"
            title="Toggle filters"
          >
            <Sliders size={20} className="text-primary" />
          </button>
        </div>

        {/* Quick Filters */}
        {showFilters && (
          <div className="max-w-7xl mx-auto mt-4 flex gap-3">
            <button
              onClick={() => setFilters({ ...filters, onlineOnly: !filters.onlineOnly })}
              className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                filters.onlineOnly
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              Online Only
            </button>
            <button
              onClick={() => setFilters({ ...filters, topRatedOnly: !filters.topRatedOnly })}
              className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                filters.topRatedOnly
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              Top Rated (4.9+)
            </button>
          </div>
        )}
      </div>

      {/* Main Content: Map (Left) and Tourman List (Right) */}
      <section className="flex-1 px-4 sm:px-6 lg:px-8 py-6 flex flex-col">
        <div className="max-w-7xl mx-auto w-full">
          {/* Grid layout for columns */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left: Live Tourman Map - Sticky so it stays while scrolling */}
            <div
              className={`lg:col-span-1 h-[600px] lg:h-[calc(100vh-2rem)] sticky top-4 rounded-2xl overflow-hidden border border-border shadow-sm relative transition-opacity duration-300 ${selectedTourman || chatTourman ? "opacity-0 pointer-events-none hidden lg:block" : "opacity-100"}`}
            >
              {/* Integrated real OpenStreetMap via TourmanMap component */}
              <TourmanMap
                tourmans={filteredTourmans}
                restaurants={mockRestaurants}
                selectedId={focusedTourmanId} // Use focusedId instead of selectedTourman.id
                onSelect={handleSelectTourman}
              />
              <div className="absolute bottom-4 left-4 bg-background/90 backdrop-blur px-3 py-1.5 rounded-lg border border-border text-xs font-medium z-[1000]">
                {filteredTourmans.length} tourmen found
              </div>
            </div>

            {/* Right: Tourman List - Normal Scroll Flow */}
            <div
              className={`lg:col-span-1 flex flex-col space-y-4 transition-all duration-500 ${selectedTourman || chatTourman ? "lg:col-span-2" : ""}`}
            >
              {/* Actually, if the map disappears, the profile usually takes its place or is a modal. The user said "not spawn on top". */}
              {/* Since the profile is a modal, simply hiding the map container visually is enough to prevent z-index issues. */}

              <div className="flex-col space-y-4">
                {filteredTourmans.length > 0 ? (
                  filteredTourmans.map((tourman) => (
                    <div
                      key={tourman.id}
                      className={`bg-card border rounded-xl p-4 hover:shadow-lg transition-all cursor-pointer ${
                        selectedTourman?.id === tourman.id
                          ? "border-primary ring-1 ring-primary shadow-md"
                          : "border-border"
                      }`}
                      onClick={() => setSelectedTourman(tourman)}
                    >
                      {/* Header with Name and Rating */}
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-start gap-3">
                          <img
                            src={tourman.image || "/placeholder.svg"}
                            alt={tourman.name}
                            className="w-12 h-12 rounded-full object-cover border border-border shrink-0"
                          />
                          <div>
                            <h3 className="font-bold text-lg text-foreground">{tourman.name}</h3>
                            <div className="flex items-center gap-2 mt-1">
                              <span className="text-sm font-semibold text-primary">★ {tourman.rating}</span>
                              {tourman.badge && (
                                <span className="text-xs font-semibold bg-primary/10 text-primary px-2 py-1 rounded">
                                  {tourman.badge}
                                </span>
                              )}
                              <span
                                className={`text-xs font-semibold px-2 py-1 rounded ${
                                  tourman.availability === "online"
                                    ? "bg-green-100 text-green-800"
                                    : "bg-gray-100 text-gray-800"
                                }`}
                              >
                                {tourman.availability === "online" ? "Online" : "Offline"}
                              </span>
                            </div>
                          </div>
                        </div>
                        {/* Added view on map button indicator */}
                        <button
                          className="text-xs bg-muted hover:bg-muted/80 px-2 py-1 rounded transition-colors cursor-pointer z-10 relative"
                          onClick={(e) => handleShowOnMap(tourman.id, e)} // Use new handler
                        >
                          Show on Map
                        </button>
                      </div>

                      {/* Specialties */}
                      <div className="mb-3">
                        <p className="text-xs text-muted-foreground mb-1 font-semibold">Specialties:</p>
                        <div className="flex flex-wrap gap-1">
                          {tourman.specialties.slice(0, 3).map((spec) => (
                            <span key={spec} className="text-xs bg-muted text-muted-foreground px-2 py-1 rounded">
                              {spec}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Reviews as Text Boxes */}
                      <div className="space-y-2 mb-3">
                        {tourman.reviews.map((review, idx) => (
                          <div
                            key={idx}
                            className="bg-card border border-orange-200/80 rounded-lg p-3 shadow-sm hover:border-orange-300 transition-colors"
                          >
                            <p className="font-semibold text-sm text-foreground mb-1">{review.author}</p>
                            <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">{review.text}</p>
                          </div>
                        ))}
                      </div>

                      {/* Price and Action */}
                      <div className="flex items-center justify-between pt-3 border-t border-border gap-3">
                        {/* Updated price display to show hourly rate in USD */}
                        <p className="font-bold text-primary text-lg mr-auto">{tourman.price}</p>

                        <button
                          onClick={(e) => handleBookNow(tourman, e)}
                          className="bg-emerald-600 text-white hover:bg-emerald-700 font-semibold py-1.5 px-4 rounded-lg transition-colors text-sm"
                        >
                          Book Now
                        </button>

                        <button
                          className="bg-primary text-primary-foreground font-semibold py-1.5 px-4 rounded-lg hover:opacity-90 transition-opacity text-sm"
                          onClick={() => setSelectedTourman(tourman)}
                        >
                          View Profile
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="col-span-full text-center py-12 text-muted-foreground">
                    No tourmen found matching your criteria.
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />

      {/* Profile Modal */}
      {selectedTourman && (
        <TourmanProfile tourman={selectedTourman} onClose={() => setSelectedTourman(null)} onBook={handleOpenChat} />
      )}

      {/* Chat Modal */}
      {chatTourman && <ChatModal tourman={chatTourman} onClose={() => setChatTourman(null)} />}
    </div>
  )
}
