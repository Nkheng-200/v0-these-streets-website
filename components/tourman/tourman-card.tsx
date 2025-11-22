"use client"

import { Star, MapPin, Languages, Award } from "lucide-react"

interface TourmanCardProps {
  tourman: {
    id: number
    name: string
    image: string
    languages: string[]
    expertAreas: string[]
    rating: number
    price: string
    availability: "online" | "busy" | "offline"
    badge?: string | null
  }
  onClick: () => void
}

export function TourmanCard({ tourman, onClick }: TourmanCardProps) {
  const availabilityColors = {
    online: "bg-green-100 text-green-800",
    busy: "bg-yellow-100 text-yellow-800",
    offline: "bg-gray-100 text-gray-800",
  }

  const availabilityLabels = {
    online: "Online",
    busy: "Busy",
    offline: "Offline",
  }

  return (
    <div
      onClick={onClick}
      className="bg-card border border-border rounded-xl overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
    >
      {/* Image */}
      <div className="relative h-40 bg-muted overflow-hidden">
        <img src={tourman.image || "/placeholder.svg"} alt={tourman.name} className="w-full h-full object-cover" />
        <div
          className={`absolute top-2 right-2 px-3 py-1 rounded-full text-xs font-semibold ${availabilityColors[tourman.availability]}`}
        >
          {availabilityLabels[tourman.availability]}
        </div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-3">
        {/* Name & Badge */}
        <div className="flex items-start justify-between gap-2">
          <div>
            <h3 className="font-bold text-lg text-foreground">{tourman.name}</h3>
            {tourman.badge && (
              <div className="flex items-center gap-1 mt-1">
                <Award size={14} className="text-primary" />
                <span className="text-xs font-semibold text-primary">{tourman.badge}</span>
              </div>
            )}
          </div>
        </div>

        {/* Rating */}
        <div className="flex items-center gap-2">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={14}
                className={i < Math.floor(tourman.rating) ? "fill-primary text-primary" : "text-muted"}
              />
            ))}
          </div>
          <span className="text-sm font-semibold text-foreground">{tourman.rating}</span>
        </div>

        {/* Languages */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Languages size={16} />
          <span>{tourman.languages.slice(0, 2).join(", ")}</span>
        </div>

        {/* Expert Areas */}
        <div className="flex items-start gap-2 text-sm">
          <MapPin size={16} className="text-primary mt-0.5 flex-shrink-0" />
          <span className="text-muted-foreground">{tourman.expertAreas.join(", ")}</span>
        </div>

        {/* Price */}
        <div className="pt-3 border-t border-border">
          <p className="font-bold text-primary text-lg">{tourman.price} / session</p>
          <button className="w-full mt-3 bg-primary text-primary-foreground font-semibold py-2 rounded-lg hover:opacity-90 transition-opacity">
            View Profile
          </button>
        </div>
      </div>
    </div>
  )
}
