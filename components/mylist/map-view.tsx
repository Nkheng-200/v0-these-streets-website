"use client"

import { MapPin } from "lucide-react"

interface Dish {
  id: number
  name: string
  restaurant: string
  price: string
  distance: string
  image: string
  latitude: number
  longitude: number
  cuisine: string
  tried: boolean
}

interface MapViewProps {
  dishes: Dish[]
}

export function MapView({ dishes }: MapViewProps) {
  return (
    <div className="space-y-4">
      <div className="bg-muted border border-border rounded-xl p-8 h-96 flex items-center justify-center">
        <div className="text-center">
          <MapPin size={48} className="text-primary mx-auto mb-4" />
          <p className="text-foreground font-semibold mb-2">Interactive Map View</p>
          <p className="text-muted-foreground text-sm">Map showing all {dishes.length} saved dishes will render here</p>
          <p className="text-muted-foreground text-xs mt-4">
            In a production app, this would use Google Maps or Mapbox with pins showing each restaurant location
          </p>
        </div>
      </div>

      {/* Legend */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {dishes.map((dish) => (
          <div key={dish.id} className="bg-card border border-border p-3 rounded-lg">
            <div className="w-full h-20 rounded mb-2 overflow-hidden">
              <img src={dish.image || "/placeholder.svg"} alt={dish.name} className="w-full h-full object-cover" />
            </div>
            <p className="font-semibold text-sm text-foreground truncate">{dish.name}</p>
            <p className="text-xs text-muted-foreground">{dish.restaurant}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
