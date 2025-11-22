"use client"

import { Trash2, CheckCircle2, MapPin } from "lucide-react"
import { useState } from "react"
import { AddDishCard } from "./add-dish-card"

interface PopularDish {
  name: string
  price: string
  image: string
}

interface Dish {
  id: number
  name: string
  restaurant: string
  image: string
  distance: string
  price: string
  cuisine: string
  source: string
  tried: boolean
  address?: string
  popularDishes?: PopularDish[]
}

interface MyListViewProps {
  dishes: Dish[]
  onMarkTried: (id: number) => void
  onRemove: (id: number) => void
}

export function MyListView({ dishes, onMarkTried, onRemove }: MyListViewProps) {
  const [showAddForm, setShowAddForm] = useState(false)

  return (
    <div className="w-full max-w-6xl mx-auto px-4 pb-12">
      {/* Added relative container for scroll fade effects */}
      <div className="relative -mx-4 group">
        {/* Left fade gradient */}
        <div className="absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-[#FDFBF7] to-transparent z-10 pointer-events-none" />
        {/* Right fade gradient */}
        <div className="absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-[#FDFBF7] to-transparent z-10 pointer-events-none" />

        <div className="flex overflow-x-auto snap-x gap-4 pb-8 px-8 no-scrollbar">
          {dishes.length > 0 ? (
            dishes.map((dish) => (
              <div
                key={dish.id}
                className={`relative flex-shrink-0 w-[70vw] md:w-[320px] snap-center rounded-sm overflow-hidden transition-all transform hover:scale-[1.01] duration-300 group ${
                  dish.tried ? "opacity-80 grayscale-[30%]" : "shadow-xl"
                }`}
              >
                {/* Prestigious Pattern Border Container */}
                <div className="absolute inset-0 border-4 border-double border-[#d4a574]/60 z-20 pointer-events-none rounded-sm"></div>

                {/* Brown Rectangular Card */}
                <div className="bg-[#5D4037] text-[#faf7f2] flex flex-col relative overflow-hidden h-full">
                  {/* Decorative corner patterns */}
                  <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-[#d4a574] z-10 m-1"></div>
                  <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-[#d4a574] z-10 m-1"></div>
                  <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-[#d4a574] z-10 m-1"></div>
                  <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-[#d4a574] z-10 m-1"></div>

                  {/* Image Section - Zoomed out (object-cover but with aspect ratio that shows more) */}
                  <div className="w-full relative aspect-[16/10]">
                    <img
                      src={dish.image || "/placeholder.svg"}
                      alt={dish.name}
                      className="w-full h-full object-cover absolute inset-0"
                    />
                    {/* Wide fade region for text readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#5D4037] via-transparent to-transparent opacity-60"></div>
                  </div>

                  {/* Content Section */}
                  <div className="flex-1 p-5 flex flex-col relative z-10 bg-[#5D4037]">
                    <div className="flex justify-between items-start mb-1">
                      <h3 className="font-serif font-bold text-xl text-[#ffecd1]">{dish.name}</h3>
                      {dish.tried && (
                        <span className="bg-[#4a6b4d] text-white text-xs font-bold px-2 py-1 rounded-full uppercase tracking-wider shadow-sm">
                          Tried
                        </span>
                      )}
                    </div>

                    <p className="text-sm text-[#d4a574] font-sans font-bold uppercase tracking-wide mb-3">
                      {dish.restaurant}
                    </p>

                    <div className="flex items-center gap-4 text-sm text-[#e8e1d5] mb-4">
                      <span className="flex items-center gap-1.5">
                        <MapPin size={14} className="text-[#d4a574]" /> {dish.distance}
                      </span>
                      <span className="flex items-center gap-1.5 font-bold text-[#d4a574]">{dish.price}</span>
                    </div>

                    {/* Address */}
                    {dish.address && <p className="text-xs text-[#e8e1d5]/70 italic mb-4">{dish.address}</p>}

                    {/* Actions */}
                    <div className="flex gap-3 justify-end border-t border-[#d4a574]/20 pt-3 mt-auto">
                      <button
                        onClick={() => onMarkTried(dish.id)}
                        className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-colors ${
                          dish.tried
                            ? "bg-[#4a6b4d] text-white hover:bg-[#3d5a40]"
                            : "bg-[#d4a574]/10 text-[#d4a574] hover:bg-[#d4a574] hover:text-[#5D4037]"
                        }`}
                      >
                        <CheckCircle2 size={14} />
                        {dish.tried ? "Tried" : "Mark as Tried"}
                      </button>
                      <button
                        onClick={() => onRemove(dish.id)}
                        className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/20 text-[#e8e1d5] hover:bg-red-900/80 hover:text-red-200 transition-colors text-xs font-bold uppercase tracking-wider"
                      >
                        <Trash2 size={14} />
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="w-full flex justify-center py-12 bg-[#5D4037] rounded-sm border-4 border-double border-[#d4a574]/60">
              <div className="text-center p-8">
                <h3 className="text-2xl font-serif font-bold text-[#ffecd1] mb-2">Your List is Empty</h3>
                <p className="text-[#e8e1d5] opacity-80">Start swiping to add delicious finds!</p>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="mt-8">
        <AddDishCard />
      </div>
    </div>
  )
}
