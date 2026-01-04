"use client"

import type React from "react"

import { useState } from "react"
import { X, Calendar, MapPin, FileText } from "lucide-react"

interface CreateTripFormProps {
  onClose: () => void
  onSave: (trip: { title: string; location: string; date: string; coverImage: string }) => void
}

export function CreateTripForm({ onClose, onSave }: CreateTripFormProps) {
  const [formData, setFormData] = useState({
    title: "",
    location: "",
    date: "",
    coverImage: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(formData)
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="relative w-full max-w-md">
        <div className="relative rounded-sm overflow-hidden shadow-2xl">
          {/* Prestigious Pattern Border */}
          <div className="absolute inset-0 border-4 border-double border-[#d4a574]/60 z-20 pointer-events-none rounded-sm"></div>

          {/* Brown Card Background */}
          <div className="bg-[#5D4037] text-[#faf7f2]">
            {/* Decorative corner patterns */}
            <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-[#d4a574] z-10 m-1"></div>
            <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-[#d4a574] z-10 m-1"></div>
            <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-[#d4a574] z-10 m-1"></div>
            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-[#d4a574] z-10 m-1"></div>

            {/* Header */}
            <div className="relative p-6 border-b border-[#d4a574]/20">
              <button
                onClick={onClose}
                className="absolute top-6 right-6 text-[#d4a574] hover:text-[#ffecd1] transition-colors z-30"
              >
                <X size={24} />
              </button>
              <h2 className="font-serif font-bold text-2xl text-[#ffecd1] pr-8">Start New Trip</h2>
              <p className="text-sm text-[#e8e1d5]/70 mt-1">Create your culinary adventure</p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-6 space-y-5">
              {/* Trip Title */}
              <div>
                <label className="flex items-center gap-2 text-sm font-bold text-[#d4a574] uppercase tracking-wider mb-2">
                  <FileText size={16} />
                  Trip Name
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g., Hanoi Street Food Tour"
                  className="w-full px-4 py-3 bg-[#4a332a] text-[#ffecd1] placeholder:text-[#e8e1d5]/40 border border-[#d4a574]/30 rounded-md focus:outline-none focus:border-[#d4a574] focus:ring-1 focus:ring-[#d4a574] transition-colors"
                />
              </div>

              {/* Location */}
              <div>
                <label className="flex items-center gap-2 text-sm font-bold text-[#d4a574] uppercase tracking-wider mb-2">
                  <MapPin size={16} />
                  Location
                </label>
                <input
                  type="text"
                  required
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  placeholder="e.g., Hanoi, Vietnam"
                  className="w-full px-4 py-3 bg-[#4a332a] text-[#ffecd1] placeholder:text-[#e8e1d5]/40 border border-[#d4a574]/30 rounded-md focus:outline-none focus:border-[#d4a574] focus:ring-1 focus:ring-[#d4a574] transition-colors"
                />
              </div>

              {/* Date */}
              <div>
                <label className="flex items-center gap-2 text-sm font-bold text-[#d4a574] uppercase tracking-wider mb-2">
                  <Calendar size={16} />
                  Date
                </label>
                <input
                  type="text"
                  required
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  placeholder="e.g., Nov 2025"
                  className="w-full px-4 py-3 bg-[#4a332a] text-[#ffecd1] placeholder:text-[#e8e1d5]/40 border border-[#d4a574]/30 rounded-md focus:outline-none focus:border-[#d4a574] focus:ring-1 focus:ring-[#d4a574] transition-colors"
                />
              </div>

              {/* Cover Image URL */}
              <div>
                <label className="text-sm font-bold text-[#d4a574] uppercase tracking-wider mb-2 block">
                  Cover Image URL (optional)
                </label>
                <input
                  type="text"
                  value={formData.coverImage}
                  onChange={(e) => setFormData({ ...formData, coverImage: e.target.value })}
                  placeholder="e.g., /vietnamese-beef-pho.jpg"
                  className="w-full px-4 py-3 bg-[#4a332a] text-[#ffecd1] placeholder:text-[#e8e1d5]/40 border border-[#d4a574]/30 rounded-md focus:outline-none focus:border-[#d4a574] focus:ring-1 focus:ring-[#d4a574] transition-colors"
                />
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-4 border-t border-[#d4a574]/20">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 px-4 py-3 bg-[#4a332a] text-[#e8e1d5] rounded-md hover:bg-[#3e2b24] transition-colors font-bold uppercase tracking-wider text-sm"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-3 bg-[#d4a574] text-[#5D4037] rounded-md hover:bg-[#e0b887] transition-colors font-bold uppercase tracking-wider text-sm"
                >
                  Create Trip
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
