"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { SwipeCard } from "@/components/swipe/swipe-card"
import { DishDetailModal } from "@/components/swipe/dish-detail-modal"
import { Heart, Shuffle, X, MapPin } from "lucide-react"
import Link from "next/link"

const mockDishes = [
  {
    id: 1,
    name: "Phở Bò",
    description: "Fragrant beef noodle soup with star anise",
    price: "45,000 VND",
    priceUSD: 2.15,
    distance: "0.3 km",
    image: "/vietnamese-beef-pho-noodle-soup.jpg",
    restaurant: "Phở Hà Nội",
    recommendedBy: 234,
    rating: 4.8,
    trend: "Trending in Hoàn Kiếm",
    photos: ["/vietnamese-beef-pho-noodle-soup.jpg", "/pho-broth-close-up.jpg"],
    hours: "6:00 AM - 10:00 PM",
    isTrending: true,
    isSignature: true,
    localComments: [
      { author: "Linh Nguyễn", text: "Best pho I've had in Hanoi! Perfect broth." },
      { author: "Tuấn", text: "Always fresh ingredients, worth the wait" },
    ],
  },
  {
    id: 2,
    name: "Bún Chả",
    description: "Grilled pork with noodles and peanut sauce",
    price: "55,000 VND",
    priceUSD: 2.6,
    distance: "0.5 km",
    image: "/vietnamese-bun-cha-grilled-pork.jpg",
    restaurant: "Bún Chả Tối",
    recommendedBy: 189,
    rating: 4.7,
    trend: "Popular now",
    photos: ["/vietnamese-bun-cha-grilled-pork.jpg", "/bun-cha-sauce-close-up.jpg"],
    hours: "11:00 AM - 9:00 PM",
    isTrending: false,
    isSignature: true,
    localComments: [
      { author: "Minh", text: "Charcoal grilled to perfection" },
      { author: "Hương", text: "The sauce is what makes it special" },
    ],
  },
  {
    id: 3,
    name: "Egg Coffee",
    description: "Creamy whipped egg yolk topped coffee",
    price: "35,000 VND",
    priceUSD: 1.68,
    distance: "0.7 km",
    image: "/vietnamese-egg-coffee-creamy.jpg",
    restaurant: "Cà Phê Tàu",
    recommendedBy: 456,
    rating: 4.9,
    trend: "Trending in Hoàn Kiếm",
    photos: ["/vietnamese-egg-coffee-creamy.jpg", "/egg-coffee-preparation.jpg"],
    hours: "7:00 AM - 10:00 PM",
    isTrending: true,
    isSignature: false,
    localComments: [
      { author: "Hoa", text: "Pure comfort in a cup" },
      { author: "Lý", text: "Classic Hanoi experience" },
    ],
  },
  {
    id: 4,
    name: "Bánh Mì",
    description: "Crispy baguette with pâté, pickled vegetables, and cilantro",
    price: "25,000 VND",
    priceUSD: 1.2,
    distance: "0.2 km",
    image: "/vietnamese-banh-mi-sandwich.jpg",
    restaurant: "Bánh Mì Hà Nội",
    recommendedBy: 312,
    rating: 4.6,
    trend: "Local favorite",
    photos: ["/vietnamese-banh-mi.jpg"],
    hours: "7:00 AM - 8:00 PM",
    isTrending: false,
    isSignature: true,
    localComments: [
      { author: "Nam", text: "Best bánh mì on the street" },
      { author: "Liên", text: "Fresh ingredients every morning" },
    ],
  },
  {
    id: 5,
    name: "Xôi Gấc",
    description: "Sticky rice with gac fruit, peanuts, and sesame",
    price: "30,000 VND",
    priceUSD: 1.43,
    distance: "0.4 km",
    image: "/vietnamese-sticky-rice-gac.jpg",
    restaurant: "Xôi Chợ Tây",
    recommendedBy: 178,
    rating: 4.5,
    trend: "Morning favorite",
    photos: ["/sticky-rice-gac.jpg"],
    hours: "5:30 AM - 10:00 AM",
    isTrending: false,
    isSignature: false,
    localComments: [
      { author: "Thu", text: "Perfect for breakfast" },
      { author: "Trang", text: "Authentic Hanoi taste" },
    ],
  },
  {
    id: 6,
    name: "Cơm Tấm",
    description: "Broken rice with grilled pork chop and egg",
    price: "50,000 VND",
    priceUSD: 2.38,
    distance: "0.6 km",
    image: "/vietnamese-com-tam-broken-rice.jpg",
    restaurant: "Cơm Tấm Mộc",
    recommendedBy: 198,
    rating: 4.7,
    trend: "Popular now",
    photos: ["/com-tam-rice.jpg"],
    hours: "10:00 AM - 9:00 PM",
    isTrending: false,
    isSignature: true,
    localComments: [
      { author: "Vinh", text: "Generous portions" },
      { author: "Hương", text: "Crispy rice is the best" },
    ],
  },
  {
    id: 7,
    name: "Chả Cá Lã Vọng",
    description: "Turmeric fish with dill and crispy shallots",
    price: "95,000 VND",
    priceUSD: 4.53,
    distance: "1.2 km",
    image: "/vietnamese-cha-ca-fish-turmeric.jpg",
    restaurant: "Chả Cá Lã Vọng",
    recommendedBy: 267,
    rating: 4.9,
    trend: "Trending in Hoàn Kiếm",
    photos: ["/cha-ca-fish.jpg"],
    hours: "11:00 AM - 9:00 PM",
    isTrending: true,
    isSignature: true,
    localComments: [
      { author: "Đức", text: "Signature dish of Hanoi" },
      { author: "Linh", text: "Worth every dong" },
    ],
  },
  {
    id: 8,
    name: "Bánh Hoai",
    description: "Crispy ancient town pancake with shrimp and pork",
    price: "20,000 VND",
    priceUSD: 0.95,
    distance: "0.8 km",
    image: "/vietnamese-banh-hoai-ancient-pancake.jpg",
    restaurant: "Bánh Hoai Hội An",
    recommendedBy: 145,
    rating: 4.4,
    trend: "Local classic",
    photos: ["/banh-hoai.jpg"],
    hours: "5:00 PM - 11:00 PM",
    isTrending: false,
    isSignature: false,
    localComments: [
      { author: "Minh", text: "Traditional Hội An recipe" },
      { author: "Khoa", text: "Crispy outside, soft inside" },
    ],
  },
  {
    id: 9,
    name: "Mít Chiên",
    description: "Crispy fried jackfruit with salt and lime",
    price: "40,000 VND",
    priceUSD: 1.9,
    distance: "0.5 km",
    image: "/vietnamese-mit-chien-fried-jackfruit.jpg",
    restaurant: "Trái Cây Chiên",
    recommendedBy: 89,
    rating: 4.3,
    trend: "Street snack",
    photos: ["/fried-jackfruit.jpg"],
    hours: "2:00 PM - 10:00 PM",
    isTrending: false,
    isSignature: false,
    localComments: [
      { author: "An", text: "Healthy snack option" },
      { author: "Lan", text: "Perfect afternoon treat" },
    ],
  },
  {
    id: 10,
    name: "Cơm Chiên Dương Châu",
    description: "Stir-fried rice with shrimp, crab, and egg",
    price: "60,000 VND",
    priceUSD: 2.86,
    distance: "0.9 km",
    image: "/vietnamese-fried-rice-com-chien.jpg",
    restaurant: "Cơm Chiên Hà Nội",
    recommendedBy: 156,
    rating: 4.6,
    trend: "Popular now",
    photos: ["/fried-rice.png"],
    hours: "11:00 AM - 10:00 PM",
    isTrending: false,
    isSignature: false,
    localComments: [
      { author: "Hùng", text: "Flavorful and quick" },
      { author: "Hạ", text: "Best fried rice in town" },
    ],
  },
]

export default function SwipePage() {
  const [dishes, setDishes] = useState(mockDishes)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [savedDishes, setSavedDishes] = useState<number[]>([])
  const [mode, setMode] = useState<"normal" | "surprise">("normal")
  const [selectedDish, setSelectedDish] = useState<(typeof mockDishes)[0] | null>(null)
  const [showTooltip, setShowTooltip] = useState(false)
  const [newlyAddedId, setNewlyAddedId] = useState<number | null>(null)

  const currentDish = dishes[currentIndex]
  const savedDishList = dishes.filter((d) => savedDishes.includes(d.id))
  const totalPrice = savedDishList.reduce((sum, d) => sum + d.priceUSD, 0)

  const handleSwipeRight = () => {
    if (!savedDishes.includes(currentDish.id)) {
      setSavedDishes([...savedDishes, currentDish.id])
      setNewlyAddedId(currentDish.id)
      setTimeout(() => setNewlyAddedId(null), 600)
    }
    handleNext()
  }

  const handleSwipeLeft = () => {
    setShowTooltip(true)
    setTimeout(() => setShowTooltip(false), 3000)
    handleNext()
  }

  const handleNext = () => {
    if (currentIndex < dishes.length - 1) {
      setCurrentIndex(currentIndex + 1)
    } else {
      setCurrentIndex(0)
    }
  }

  const toggleMode = () => {
    setMode(mode === "normal" ? "surprise" : "normal")
    setCurrentIndex(0)
  }

  const removeCraving = (dishId: number) => {
    setSavedDishes(savedDishes.filter((id) => id !== dishId))
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navigation />

      {/* Header */}
      <section className="bg-primary text-primary-foreground px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl sm:text-5xl font-serif font-bold mb-2">The Swipe</h1>
          <p className="text-lg opacity-90">Discover dishes like never before</p>
        </div>
      </section>

      {/* Mode Toggle */}
      <div className="bg-card border-b border-border px-4 sm:px-6 lg:px-8 py-4 sticky top-16 z-40">
        <div className="max-w-7xl mx-auto flex gap-3">
          <button
            onClick={() => setMode("normal")}
            className={`flex-1 py-2 px-4 rounded-lg font-semibold transition-all ${
              mode === "normal"
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground hover:bg-muted/80"
            }`}
          >
            Normal Mode
          </button>
          <button
            onClick={toggleMode}
            className={`flex-1 py-2 px-4 rounded-lg font-semibold transition-all flex items-center justify-center gap-2 ${
              mode === "surprise"
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground hover:bg-muted/80"
            }`}
          >
            <Shuffle size={18} />
            Surprise Me
          </button>
        </div>
      </div>

      {/* Main Swipe Area */}
      <section className="flex-1 px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-7xl mx-auto">
          {currentDish ? (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full">
              {/* Left: Dish Card */}
              <div className="lg:col-span-1 flex flex-col items-center justify-center">
                <SwipeCard
                  dish={currentDish}
                  onSwipeRight={handleSwipeRight}
                  onSwipeLeft={handleSwipeLeft}
                  onTap={() => setSelectedDish(currentDish)}
                  isSaved={savedDishes.includes(currentDish.id)}
                />

                {/* Swipe Instructions */}
                <div className="mt-6 text-center w-full">
                  <p className="text-sm text-muted-foreground mb-4">Swipe left • Swipe right</p>
                  <div className="flex gap-4 justify-center">
                    <button
                      onClick={handleSwipeLeft}
                      className="w-12 h-12 rounded-full bg-muted text-muted-foreground hover:bg-muted/80 transition-all flex items-center justify-center font-bold text-xl hover:scale-110"
                      title="Skip"
                    >
                      ✕
                    </button>
                    <button
                      onClick={handleSwipeRight}
                      className="w-12 h-12 rounded-full bg-primary text-primary-foreground hover:opacity-90 transition-all flex items-center justify-center hover:scale-110"
                      title="Save to Cravings"
                    >
                      <Heart size={20} fill="currentColor" />
                    </button>
                  </div>
                </div>

                {/* Progress */}
                <div className="mt-6 text-center text-sm text-muted-foreground w-full">
                  <p>
                    {currentIndex + 1} of {dishes.length}
                  </p>
                </div>
              </div>

              {/* Right: My Cravings Box */}
              <div className="lg:col-span-2 flex flex-col">
                <div className="bg-card rounded-2xl border border-border p-6 flex flex-col h-full shadow-lg transition-all duration-500">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold text-foreground">My Cravings</h2>
                    <button
                      onClick={() => setShowTooltip(false)}
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <X size={24} />
                    </button>
                  </div>

                  {/* Cravings List */}
                  <div className="space-y-3 mb-4 flex-1 overflow-y-auto">
                    {savedDishList.length === 0 ? (
                      <div className="h-full flex items-center justify-center">
                        <p className="text-muted-foreground text-xl font-medium italic">Swipe to fill your hunger</p>
                      </div>
                    ) : (
                      savedDishList.map((dish) => (
                        <div
                          key={dish.id}
                          className={`flex justify-between items-center bg-muted/50 p-4 rounded-lg transition-all duration-500 ${
                            newlyAddedId === dish.id ? "animate-in fade-in scale-in-95 origin-bottom" : ""
                          }`}
                        >
                          <div className="flex-1">
                            <p className="font-semibold text-foreground">{dish.name}</p>
                            <p className="text-sm text-muted-foreground">{dish.restaurant}</p>
                          </div>
                          <div className="flex items-center gap-4">
                            <div className="text-right">
                              <p className="font-bold text-primary">${dish.priceUSD.toFixed(2)}</p>
                              <p className="text-xs text-muted-foreground">{dish.price}</p>
                            </div>
                            <button
                              onClick={() => removeCraving(dish.id)}
                              className="text-muted-foreground hover:text-destructive transition-colors"
                            >
                              <X size={18} />
                            </button>
                          </div>
                        </div>
                      ))
                    )}
                  </div>

                  {/* Total Cost & Action */}
                  <div className="border-t border-border pt-4 space-y-4">
                    <div className="flex justify-between items-center">
                      <p className="text-lg font-bold text-foreground">Total:</p>
                      <p className="text-2xl font-bold text-primary">${totalPrice.toFixed(2)}</p>
                    </div>

                    {/* Find a local guide button */}
                    <Link
                      href="/find-tourman"
                      className="w-full block text-center bg-emerald-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-emerald-700 transition-colors shadow-md flex items-center justify-center gap-2"
                    >
                      <MapPin size={20} />
                      Find a local guide
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </section>

      {/* Tooltip */}
      {showTooltip && (
        <div className="fixed bottom-8 left-4 right-4 max-w-md mx-auto bg-secondary text-secondary-foreground px-6 py-4 rounded-lg shadow-lg animate-in fade-in slide-in-from-bottom-4 duration-300">
          <p className="text-sm font-semibold">
            💡 Discarded dishes will return after you publish your next food review.
          </p>
        </div>
      )}

      {/* Dish Detail Modal */}
      {selectedDish && <DishDetailModal dish={selectedDish} onClose={() => setSelectedDish(null)} />}

      <Footer />
    </div>
  )
}
