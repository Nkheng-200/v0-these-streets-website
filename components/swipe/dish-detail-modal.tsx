"use client"

import { X, Star, MapPin, Clock, Share2 } from "lucide-react"

interface DishDetailModalProps {
  dish: {
    name: string
    description: string
    price: string
    distance: string
    image: string
    restaurant: string
    rating: number
    hours: string
    photos: string[]
    localComments: Array<{ author: string; text: string }>
    isSignature?: boolean
  }
  onClose: () => void
}

export function DishDetailModal({ dish, onClose }: DishDetailModalProps) {
  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-end sm:items-center justify-center" onClick={onClose}>
      <div
        className="bg-card w-full sm:max-w-2xl rounded-t-2xl sm:rounded-2xl shadow-2xl max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-border sticky top-0 bg-card">
          <h2 className="text-2xl font-bold text-foreground">{dish.name}</h2>
          <button onClick={onClose} className="p-2 hover:bg-muted rounded-lg transition-colors">
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Photo Gallery */}
          <div className="space-y-3">
            <h3 className="font-semibold text-foreground">Photos</h3>
            <div className="grid grid-cols-2 gap-3">
              {dish.photos.map((photo, i) => (
                <img
                  key={i}
                  src={photo || "/placeholder.svg"}
                  alt={`${dish.name} ${i + 1}`}
                  className="w-full h-32 object-cover rounded-lg"
                />
              ))}
            </div>
          </div>

          {/* Info */}
          <div className="space-y-3">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Restaurant</p>
                <p className="font-semibold text-foreground">{dish.restaurant}</p>
              </div>
              <span className="text-xl font-bold text-primary">{dish.price}</span>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Clock size={18} />
                <div>
                  <p className="text-xs text-muted-foreground">Hours</p>
                  <p className="text-sm font-semibold text-foreground">{dish.hours}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <MapPin size={18} />
                <div>
                  <p className="text-xs text-muted-foreground">Distance</p>
                  <p className="text-sm font-semibold text-foreground">{dish.distance}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Rating */}
          <div className="bg-muted p-4 rounded-lg">
            <div className="flex items-center gap-3 mb-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    className={i < Math.floor(dish.rating) ? "fill-primary text-primary" : "text-muted-foreground"}
                  />
                ))}
              </div>
              <span className="font-semibold text-foreground">{dish.rating}</span>
            </div>
            {dish.isSignature && <p className="text-sm text-muted-foreground">⭐ Signature dish of the restaurant</p>}
          </div>

          {/* Local Comments */}
          <div className="space-y-3">
            <h3 className="font-semibold text-foreground">Local Comments</h3>
            <div className="space-y-3">
              {dish.localComments.map((comment, i) => (
                <div key={i} className="bg-muted p-4 rounded-lg">
                  <p className="font-semibold text-foreground text-sm mb-1">{comment.author}</p>
                  <p className="text-sm text-muted-foreground">{comment.text}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4 border-t border-border">
            <button className="flex-1 bg-primary text-primary-foreground font-semibold py-3 rounded-lg hover:opacity-90 transition-opacity">
              Add to My List
            </button>
            <button className="p-3 bg-muted text-muted-foreground hover:bg-muted/80 rounded-lg transition-colors">
              <Share2 size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
