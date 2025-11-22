"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Star, MapPin } from "lucide-react"

interface SwipeCardProps {
  dish: {
    id: number
    name: string
    description: string
    price: string
    distance: string
    image: string
    restaurant: string
    recommendedBy: number
    rating: number
    trend?: string
    isTrending?: boolean
    isSignature?: boolean
  }
  onSwipeRight: () => void
  onSwipeLeft: () => void
  onTap: () => void
  isSaved: boolean
}

export function SwipeCard({ dish, onSwipeRight, onSwipeLeft, onTap, isSaved }: SwipeCardProps) {
  const [isDragging, setIsDragging] = useState(false)
  const [dragX, setDragX] = useState(0)
  const cardRef = useRef<HTMLDivElement>(null)
  const startXRef = useRef(0)

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true)
    startXRef.current = e.clientX
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return
    const diff = e.clientX - startXRef.current
    setDragX(diff)
  }

  const handleMouseUp = () => {
    setIsDragging(false)
    if (dragX > 100) {
      onSwipeRight()
    } else if (dragX < -100) {
      onSwipeLeft()
    }
    setDragX(0)
  }

  return (
    <div
      ref={cardRef}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onClick={onTap}
      className="cursor-grab active:cursor-grabbing"
      style={{
        transform: `translateX(${dragX}px) rotate(${dragX / 50}deg)`,
        opacity: 1 - Math.abs(dragX) / 500,
        transition: isDragging ? "none" : "all 0.3s ease-out",
      }}
    >
      <div className="bg-card rounded-2xl overflow-hidden shadow-xl border border-border">
        {/* Image */}
        <div className="relative h-64 bg-muted overflow-hidden">
          <img src={dish.image || "/placeholder.svg"} alt={dish.name} className="w-full h-full object-cover" />

          {/* Badges */}
          <div className="absolute top-3 left-3 right-3 flex justify-between items-start gap-2">
            {dish.isTrending && (
              <span className="bg-primary text-primary-foreground px-2 py-1 rounded-full text-xs font-semibold">
                🔥 {dish.trend}
              </span>
            )}
            {dish.isSignature && (
              <span className="bg-secondary text-secondary-foreground px-2 py-1 rounded-full text-xs font-semibold">
                ⭐ Signature
              </span>
            )}
          </div>

          {/* Recommended count */}
          <div className="absolute bottom-3 left-3 right-3 bg-black/40 backdrop-blur text-white px-3 py-1 rounded-lg">
            <p className="text-xs font-semibold">👥 {dish.recommendedBy} locals</p>
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          <h2 className="text-xl font-bold text-foreground mb-1">{dish.name}</h2>
          <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{dish.description}</p>

          <div className="space-y-2">
            {/* Restaurant */}
            <div className="text-sm font-semibold text-foreground">{dish.restaurant}</div>

            {/* Distance & Price */}
            <div className="flex justify-between items-center text-xs">
              <div className="flex items-center gap-1 text-muted-foreground">
                <MapPin size={14} />
                <span>{dish.distance}</span>
              </div>
              <span className="font-bold text-primary">{dish.price}</span>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-1">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={12}
                    className={i < Math.floor(dish.rating) ? "fill-primary text-primary" : "text-muted"}
                  />
                ))}
              </div>
              <span className="text-xs text-muted-foreground">{dish.rating}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
