"use client"

import type React from "react"

import { useState } from "react"
import { X, Star, MapPin, Languages, MessageSquare } from "lucide-react"

interface TourmanProfileProps {
  tourman: {
    name: string
    image: string
    coverImage?: string
    languages: string[]
    rating: number
    price: string
    bio: string
    specialties: string[]
    routes: Array<{ name: string; duration: string; price: string }>
    reviews: Array<{ author: string; text: string }>
    groupSize: string
    favoriteSpots: Array<{ name: string; district: string }>
  }
  onClose: () => void
  onBook: (tourman: TourmanProfileProps["tourman"], e: React.MouseEvent) => void
}

export function TourmanProfile({ tourman, onClose, onBook }: TourmanProfileProps) {
  const [showChat, setShowChat] = useState(false)
  const [message, setMessage] = useState("")

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-end sm:items-center justify-center" onClick={onClose}>
      <div
        className="bg-card w-full sm:max-w-2xl rounded-t-2xl sm:rounded-2xl shadow-2xl max-h-[90vh] overflow-y-auto relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="relative h-40 bg-muted">
          <img
            src={tourman.coverImage || "/placeholder.svg"}
            alt="Cover"
            className="w-full h-full object-cover opacity-90"
          />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 bg-black/40 hover:bg-black/60 text-white rounded-lg transition-colors z-10"
          >
            <X size={24} />
          </button>
          {/* Avatar overlapping */}
          <div className="absolute -bottom-10 left-6">
            <img
              src={tourman.image || "/placeholder.svg"}
              alt={tourman.name}
              className="w-24 h-24 rounded-full border-4 border-card object-cover shadow-lg"
            />
          </div>
          {/* Chat Now button moved lower */}
          <button
            onClick={(e) => onBook(tourman, e)}
            className="absolute -bottom-12 right-6 bg-primary text-primary-foreground px-4 py-2 rounded-lg font-semibold hover:opacity-90 transition-all shadow-lg flex items-center gap-2"
          >
            <MessageSquare size={18} />
            Chat Now
          </button>
        </div>

        {/* Content */}
        <div className="p-6 pt-14 space-y-6">
          {/* Name & Rating */}
          <div>
            <h2 className="text-3xl font-bold text-foreground mb-2">{tourman.name}</h2>
            <div className="flex items-center gap-3">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    className={i < Math.floor(tourman.rating) ? "fill-primary text-primary" : "text-muted"}
                  />
                ))}
              </div>
              <span className="font-semibold text-foreground">{tourman.rating}</span>
            </div>
          </div>

          {/* Bio */}
          <p className="text-muted-foreground leading-relaxed">{tourman.bio}</p>

          {/* Info Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-muted p-4 rounded-lg">
              <p className="text-xs text-muted-foreground mb-1">Starting Price</p>
              <p className="font-bold text-primary text-lg">{tourman.price}</p>
            </div>
            <div className="bg-muted p-4 rounded-lg">
              <p className="text-xs text-muted-foreground mb-1">Group Size</p>
              <p className="font-semibold text-foreground">{tourman.groupSize}</p>
            </div>
          </div>

          {/* Languages & Specialties */}
          <div>
            <h3 className="font-semibold text-foreground mb-2 flex items-center gap-2">
              <Languages size={18} className="text-primary" />
              Languages
            </h3>
            <div className="flex flex-wrap gap-2">
              {tourman.languages.map((lang) => (
                <span key={lang} className="bg-muted text-foreground px-3 py-1 rounded-full text-sm font-semibold">
                  {lang}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-2">Specialties</h3>
            <div className="flex flex-wrap gap-2">
              {tourman.specialties.map((specialty) => (
                <span
                  key={specialty}
                  className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-semibold"
                >
                  {specialty}
                </span>
              ))}
            </div>
          </div>

          {/* Routes */}
          <div>
            <h3 className="font-semibold text-foreground mb-3">Available Routes</h3>
            <div className="space-y-3">
              {tourman.routes.map((route, i) => (
                <div key={i} className="border border-border p-4 rounded-lg">
                  <div className="flex justify-between items-start mb-2">
                    <p className="font-semibold text-foreground">{route.name}</p>
                    <p className="font-bold text-primary">{route.price}</p>
                  </div>
                  <p className="text-sm text-muted-foreground">⏱️ {route.duration}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Favorite Spots */}
          <div>
            <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
              <MapPin size={18} className="text-primary" />
              Favorite Spots
            </h3>
            <div className="space-y-2">
              {tourman.favoriteSpots.map((spot, i) => (
                <div key={i} className="bg-muted p-3 rounded-lg">
                  <p className="font-semibold text-foreground text-sm">{spot.name}</p>
                  <p className="text-xs text-muted-foreground">{spot.district}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Reviews */}
          <div>
            <h3 className="font-semibold text-foreground mb-3">Recent Reviews</h3>
            <div className="space-y-3 border border-orange-500/60 rounded-[2rem] p-5 bg-orange-50/5">
              {tourman.reviews.map((review, i) => (
                <div key={i} className="bg-card border border-orange-200 p-4 rounded-xl shadow-sm">
                  <p className="font-semibold text-foreground text-sm mb-1">{review.author}</p>
                  <p className="text-sm text-muted-foreground">{review.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
