"use client"

import { Calendar, MapPin, Plus } from "lucide-react"

export interface Trip {
  id: number
  title: string
  location: string
  date: string
  coverImage: string
  itemCount: number
  dishes: any[] // Using any[] for now to match the existing structure broadly
}

interface BookshelfViewProps {
  trips: Trip[]
  onSelectTrip: (trip: Trip) => void
  onAddTrip: () => void
}

export function BookshelfView({ trips, onSelectTrip, onAddTrip }: BookshelfViewProps) {
  return (
    <div className="w-full max-w-6xl mx-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {trips.map((trip) => (
          <div
            key={trip.id}
            onClick={() => onSelectTrip(trip)}
            className="group relative cursor-pointer transform transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
          >
            {/* Book Spine/Thickness Effect */}
            <div className="absolute left-0 top-1 bottom-1 w-4 bg-[#4a332a] rounded-l-sm transform -translate-x-3 translate-z-[-10px] shadow-lg"></div>

            {/* Main Book Cover */}
            <div className="bg-[#5D4037] aspect-[3/4] rounded-r-md rounded-l-sm relative overflow-hidden shadow-xl border-l-4 border-[#3e2b24]">
              {/* Gold Border Pattern */}
              <div className="absolute inset-3 border-2 border-[#d4a574] opacity-50 rounded-sm pointer-events-none z-20"></div>
              <div className="absolute inset-4 border border-[#d4a574] opacity-30 rounded-sm pointer-events-none z-20"></div>

              {/* Cover Image with Overlay */}
              <div className="absolute top-0 left-0 w-full h-2/3 relative">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#5D4037] z-10"></div>
                <img
                  src={trip.coverImage || "/placeholder.svg"}
                  alt={trip.title}
                  className="w-full h-full object-cover opacity-80 group-hover:scale-110 transition-transform duration-700"
                />
              </div>

              {/* Content */}
              <div className="absolute bottom-0 left-0 w-full p-6 z-20 bg-gradient-to-t from-[#5D4037] via-[#5D4037] to-transparent pt-12">
                <h3 className="font-serif font-bold text-2xl text-[#ffecd1] leading-tight mb-3 line-clamp-2 group-hover:text-[#d4a574] transition-colors">
                  {trip.title}
                </h3>

                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-[#e8e1d5]/80 text-xs uppercase tracking-wider font-medium">
                    <MapPin size={14} className="text-[#d4a574]" />
                    {trip.location}
                  </div>
                  <div className="flex items-center gap-2 text-[#e8e1d5]/60 text-xs font-mono">
                    <Calendar size={14} />
                    {trip.date}
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-[#d4a574]/20 flex justify-between items-center">
                  <span className="text-xs text-[#d4a574] font-bold uppercase tracking-widest">
                    {trip.itemCount} Items
                  </span>
                  <span className="text-[#ffecd1]/40 text-xs italic group-hover:translate-x-1 transition-transform">
                    Open Trip →
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Add New Trip Placeholder */}
        <button
          onClick={onAddTrip}
          className="group relative aspect-[3/4] rounded-md border-4 border-dashed border-[#d4a574]/30 hover:border-[#d4a574]/60 hover:bg-[#5D4037]/5 transition-all flex flex-col items-center justify-center gap-4 cursor-pointer"
        >
          <div className="w-16 h-16 rounded-full bg-[#5D4037]/10 group-hover:bg-[#5D4037]/20 flex items-center justify-center transition-colors">
            <Plus size={32} className="text-[#5D4037] dark:text-[#d4a574]" />
          </div>
          <span className="font-serif font-bold text-xl text-[#5D4037] dark:text-[#d4a574]">Start New Trip</span>
        </button>
      </div>
    </div>
  )
}
