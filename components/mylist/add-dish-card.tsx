"use client"
import { Plus, Camera, Trash2 } from "lucide-react"
import { useState } from "react"

export function AddDishCard({ onCancel }: { onCancel?: () => void }) {
  const [tripName, setTripName] = useState("")
  const [restaurants, setRestaurants] = useState([{ id: Date.now(), dishName: "" }])

  const addRestaurant = () => {
    setRestaurants([...restaurants, { id: Date.now(), dishName: "" }])
  }

  const removeRestaurant = (id: number) => {
    if (restaurants.length > 1) {
      setRestaurants(restaurants.filter((r) => r.id !== id))
    }
  }

  const updateRestaurant = (id: number, field: string, value: string) => {
    setRestaurants(restaurants.map((r) => (r.id === id ? { ...r, [field]: value } : r)))
  }

  const hasDishName = restaurants.some((r) => r.dishName.length > 0)

  const handleSave = () => {
    console.log("Saving item:", {
      tripName: tripName || "Untitled Trip",
      restaurants,
    })
    // Additional save logic would go here
    if (onCancel) onCancel()
  }

  return (
    <div className="relative w-full max-w-3xl mx-auto rounded-sm overflow-hidden shadow-xl transition-all transform duration-300 mt-8">
      {/* Prestigious Pattern Border Container */}
      <div className="absolute inset-0 border-4 border-double border-[#d4a574]/60 z-20 pointer-events-none rounded-sm"></div>

      {/* Brown Rectangular Card */}
      <div className="bg-white dark:bg-[#5D4037] text-foreground dark:text-[#faf7f2] p-6 sm:p-8 relative overflow-hidden">
        {/* Decorative corner patterns */}
        <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-[#d4a574] z-10 m-2"></div>
        <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-[#d4a574] z-10 m-2"></div>
        <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-[#d4a574] z-10 m-2"></div>
        <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-[#d4a574] z-10 m-2"></div>

        <div className="mb-6 relative group">
          {/* The actual input for the trip name */}
          <input
            type="text"
            value={tripName}
            onChange={(e) => setTripName(e.target.value)}
            className="w-full bg-transparent border-none p-0 text-xl font-bold text-[#5D4037] dark:text-[#ffecd1] focus:ring-0 focus:outline-none placeholder-transparent z-10 relative"
            placeholder="Title Placeholder" // Hidden by transparent text color logic below
          />

          {/* 
             Logic for the header display:
             1. If tripName exists -> Show tripName (Input handles this)
             2. If !tripName AND hasDishName -> Show "Name this trip" with FADE INTERVAL
             3. If !tripName AND !hasDishName -> Show "Add a New Item to Your List" (Static)
          */}

          {/* Case 3: Default Static Header */}
          {!tripName && !hasDishName && (
            <div className="absolute inset-0 pointer-events-none text-xl font-bold text-[#5D4037] dark:text-[#ffecd1]">
              Add a New Item to Your List
            </div>
          )}

          {/* Case 2: "Name this trip" with Fade Interval */}
          {!tripName && hasDishName && (
            <div className="absolute inset-0 pointer-events-none text-xl font-bold text-[#5D4037]/60 dark:text-[#ffecd1]/60 animate-fade-interval">
              Name this trip
            </div>
          )}
        </div>

        <div className="space-y-6 relative z-10">
          {/* Row 1: Category only (Dish Name moved to restaurant block) */}
          <div className="space-y-2">
            <label className="text-sm font-bold text-[#5D4037] dark:text-[#d4a574]">Category</label>
            <input
              type="text"
              placeholder="Food and Dishes"
              className="w-full border border-input bg-background dark:bg-black/20 dark:border-[#d4a574]/30 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-[#d4a574] transition-colors"
            />
          </div>

          {/* Restaurant Section */}
          <div className="space-y-3">
            <label className="text-sm font-bold text-[#5D4037] dark:text-[#d4a574] block">Restaurants</label>

            {restaurants.map((restaurant) => (
              <div
                key={restaurant.id}
                className="border border-input dark:border-[#d4a574]/30 rounded-lg p-4 space-y-3 bg-gray-50/50 dark:bg-black/10"
              >
                <div className="space-y-2">
                  <label className="text-sm font-bold text-[#5D4037] dark:text-[#d4a574]">Dish / Item Name</label>
                  <input
                    type="text"
                    value={restaurant.dishName}
                    onChange={(e) => updateRestaurant(restaurant.id, "dishName", e.target.value)}
                    className="w-full border border-input bg-background dark:bg-black/20 dark:border-[#d4a574]/30 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-[#d4a574] transition-colors"
                  />
                </div>

                <div className="relative">
                  <input
                    type="text"
                    placeholder="Restaurant Name"
                    className="w-full border border-input bg-background dark:bg-black/20 dark:border-[#d4a574]/30 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-[#d4a574] pr-10"
                  />
                  {restaurants.length > 1 && (
                    <button
                      onClick={() => removeRestaurant(restaurant.id)}
                      className="absolute right-2 top-1/2 -translate-y-1/2 text-red-500 hover:text-red-600 transition-colors"
                    >
                      <Trash2 size={18} />
                    </button>
                  )}
                </div>

                <input
                  type="text"
                  placeholder="Address"
                  className="w-full border border-input bg-background dark:bg-black/20 dark:border-[#d4a574]/30 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-[#d4a574]"
                />

                <div className="space-y-2">
                  <label className="text-sm font-bold text-[#5D4037] dark:text-[#d4a574]">Rating (1-5)</label>
                  <input
                    type="number"
                    step="0.1"
                    max="5"
                    className="w-full border border-input bg-background dark:bg-black/20 dark:border-[#d4a574]/30 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-[#d4a574]"
                  />
                </div>
              </div>
            ))}

            {/* Add Another Restaurant Button outside */}
            <button
              onClick={addRestaurant}
              className="flex items-center gap-2 text-sm font-medium text-[#5D4037] dark:text-[#d4a574] hover:opacity-80 transition-opacity pt-1"
            >
              <Plus size={16} className="border border-current rounded-full p-0.5" />
              Add Another Restaurant
            </button>
          </div>

          {/* Photo Upload (Special Moment) */}
          <div className="space-y-2">
            <label className="text-sm font-bold text-[#5D4037] dark:text-[#d4a574]">Special Moment</label>
            <div className="border-2 border-dashed border-input dark:border-[#d4a574]/30 rounded-lg p-4 flex flex-col items-center justify-center gap-2 bg-gray-50/50 dark:bg-black/10 hover:bg-gray-100/50 dark:hover:bg-black/20 transition-colors cursor-pointer group/upload">
              <Camera className="w-6 h-6 text-[#5D4037] dark:text-[#d4a574] group-hover/upload:scale-110 transition-transform" />
              <span className="text-xs text-muted-foreground dark:text-[#e8e1d5]/70">Click to upload photo</span>
            </div>
          </div>

          {/* Notes */}
          <div className="space-y-2">
            <label className="text-sm font-bold text-[#5D4037] dark:text-[#d4a574]">Notes</label>
            <textarea
              rows={3}
              className="w-full border border-input bg-background dark:bg-black/20 dark:border-[#d4a574]/30 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-[#d4a574] resize-none"
            />
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-4">
            {onCancel && (
              <button
                onClick={onCancel}
                className="px-4 py-2 text-sm font-medium hover:bg-accent rounded transition-colors"
              >
                Cancel
              </button>
            )}
            <button
              onClick={handleSave}
              className="bg-[#1a1a1a] text-white px-6 py-2 rounded text-sm font-medium hover:bg-black/90 transition-colors dark:bg-[#d4a574] dark:text-[#5D4037]"
            >
              Save Item
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
