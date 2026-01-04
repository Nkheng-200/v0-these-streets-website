"use client"

import type React from "react"

import { useState } from "react"
import { ArrowLeft, Calendar, Clock, Users, CreditCard, Lock, Sparkles } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"

interface ExtractedInfo {
  dietaryRestrictions: string[]
  accessibilityNeeds: string[]
  timePreferences: string[]
  groupComposition: string[]
  specificInterests: string[]
}

export default function TransactionPage() {
  const router = useRouter()
  const searchParams = useSearchParams()

  // Get tourman details from URL params
  const tourmanName = searchParams.get("name") || "Tour Guide"
  const tourmanPrice = searchParams.get("price") || "22"
  const tourmanRating = searchParams.get("rating") || "4.9"

  const [formData, setFormData] = useState({
    // Booking Details
    date: "",
    time: "",
    groupSize: "2",
    duration: "3",
    specialRequests: "",

    // Contact Information
    firstName: "",
    lastName: "",
    email: "",
    phone: "",

    // Payment Information
    cardNumber: "",
    cardName: "",
    expiryDate: "",
    cvv: "",
    billingAddress: "",
    city: "",
    postalCode: "",
  })

  const [extractedInfo, setExtractedInfo] = useState<ExtractedInfo | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)

  const analyzeSpecialRequests = async (text: string) => {
    if (!text.trim() || text.length < 10) {
      setExtractedInfo(null)
      return
    }

    setIsAnalyzing(true)

    // Simulate brief processing delay for UX
    setTimeout(() => {
      const extracted = extractRequestInfo(text.toLowerCase())
      setExtractedInfo(extracted)
      setIsAnalyzing(false)
    }, 500)
  }

  const extractRequestInfo = (text: string): ExtractedInfo => {
    const extracted: ExtractedInfo = {
      dietaryRestrictions: [],
      accessibilityNeeds: [],
      timePreferences: [],
      groupComposition: [],
      specificInterests: [],
    }

    // Dietary restrictions patterns
    const dietaryPatterns = [
      { pattern: /vegetarian|veggie|no meat/i, tag: "Vegetarian" },
      { pattern: /vegan|plant-based/i, tag: "Vegan" },
      { pattern: /halal/i, tag: "Halal" },
      { pattern: /kosher/i, tag: "Kosher" },
      { pattern: /gluten[- ]free|celiac|no gluten/i, tag: "Gluten-Free" },
      { pattern: /lactose|dairy[- ]free|no dairy/i, tag: "Dairy-Free" },
      { pattern: /nut allerg|no nuts|peanut allerg/i, tag: "Nut Allergy" },
      { pattern: /shellfish allerg|no shellfish/i, tag: "Shellfish Allergy" },
      { pattern: /food allerg/i, tag: "Food Allergies" },
    ]

    // Accessibility patterns
    const accessibilityPatterns = [
      { pattern: /wheelchair|mobility aid/i, tag: "Wheelchair Access" },
      { pattern: /walking difficult|limited mobility/i, tag: "Limited Mobility" },
      { pattern: /hearing impair|deaf/i, tag: "Hearing Impaired" },
      { pattern: /visual impair|blind/i, tag: "Visual Impaired" },
      { pattern: /slow pace|take it slow/i, tag: "Slow Pace Preferred" },
    ]

    // Group composition patterns
    const groupPatterns = [
      { pattern: /\b(\d+)\s*kids?|children|toddlers?/i, tag: "Traveling with Kids" },
      { pattern: /infant|baby|babies/i, tag: "Traveling with Infants" },
      { pattern: /elderly|senior|grandparent/i, tag: "Elderly Members" },
      { pattern: /pregnant|expecting/i, tag: "Pregnant Traveler" },
      { pattern: /large group|big group/i, tag: "Large Group" },
    ]

    // Time preference patterns
    const timePatterns = [
      { pattern: /morning|breakfast time|early/i, tag: "Morning Preferred" },
      { pattern: /afternoon|lunch time|midday/i, tag: "Afternoon Preferred" },
      { pattern: /evening|dinner time|sunset/i, tag: "Evening Preferred" },
      { pattern: /flexible|any time/i, tag: "Flexible Timing" },
    ]

    // Interest patterns
    const interestPatterns = [
      { pattern: /street food|food stalls?|hawker/i, tag: "Street Food" },
      { pattern: /local market|wet market|traditional market/i, tag: "Local Markets" },
      { pattern: /hidden gem|off[- ]the[- ]beaten|local secret/i, tag: "Hidden Gems" },
      { pattern: /history|historical|cultural|heritage/i, tag: "Cultural/Historical" },
      { pattern: /seafood|fish|ocean/i, tag: "Seafood Focus" },
      { pattern: /spicy|hot|chil[li]/i, tag: "Spicy Food" },
      { pattern: /dessert|sweet|pastry|bakery/i, tag: "Desserts" },
      { pattern: /coffee|café/i, tag: "Coffee Culture" },
      { pattern: /photography|photos|instagram/i, tag: "Photo Opportunities" },
      { pattern: /cooking|learn to cook/i, tag: "Cooking Experience" },
    ]

    // Extract matches
    dietaryPatterns.forEach(({ pattern, tag }) => {
      if (pattern.test(text) && !extracted.dietaryRestrictions.includes(tag)) {
        extracted.dietaryRestrictions.push(tag)
      }
    })

    accessibilityPatterns.forEach(({ pattern, tag }) => {
      if (pattern.test(text) && !extracted.accessibilityNeeds.includes(tag)) {
        extracted.accessibilityNeeds.push(tag)
      }
    })

    groupPatterns.forEach(({ pattern, tag }) => {
      if (pattern.test(text) && !extracted.groupComposition.includes(tag)) {
        extracted.groupComposition.push(tag)
      }
    })

    timePatterns.forEach(({ pattern, tag }) => {
      if (pattern.test(text) && !extracted.timePreferences.includes(tag)) {
        extracted.timePreferences.push(tag)
      }
    })

    interestPatterns.forEach(({ pattern, tag }) => {
      if (pattern.test(text) && !extracted.specificInterests.includes(tag)) {
        extracted.specificInterests.push(tag)
      }
    })

    return extracted
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSpecialRequestsChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value
    setFormData({
      ...formData,
      specialRequests: value,
    })

    // Debounce AI analysis
    if (value.trim().length > 10) {
      const timeoutId = setTimeout(() => {
        analyzeSpecialRequests(value)
      }, 1000)

      return () => clearTimeout(timeoutId)
    } else {
      setExtractedInfo(null)
    }
  }

  const calculateTotal = () => {
    const basePrice = Number.parseFloat(tourmanPrice)
    const hours = Number.parseFloat(formData.duration)
    const people = Number.parseInt(formData.groupSize)
    return (basePrice * hours * people).toFixed(2)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Process payment and booking
    alert("Booking confirmed! You will receive a confirmation email shortly.")
    router.push("/find-tourman")
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white">
      {/* Header */}
      <div className="bg-white border-b border-orange-100 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link
            href="/find-tourman"
            className="inline-flex items-center text-orange-700 hover:text-orange-900 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Tour Guides
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Complete Your Booking</h1>
        <p className="text-gray-600 mb-8">Secure your food tour with {tourmanName}</p>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Booking Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Tour Details */}
              <div className="bg-white rounded-xl shadow-sm border border-orange-100 p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Tour Details</h2>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Calendar className="w-4 h-4 inline mr-2" />
                      Tour Date
                    </label>
                    <input
                      type="date"
                      name="date"
                      required
                      value={formData.date}
                      onChange={handleInputChange}
                      min={new Date().toISOString().split("T")[0]}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Clock className="w-4 h-4 inline mr-2" />
                      Start Time
                    </label>
                    <input
                      type="time"
                      name="time"
                      required
                      value={formData.time}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Users className="w-4 h-4 inline mr-2" />
                      Group Size
                    </label>
                    <select
                      name="groupSize"
                      required
                      value={formData.groupSize}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    >
                      <option value="1">1 person</option>
                      <option value="2">2 people</option>
                      <option value="3">3 people</option>
                      <option value="4">4 people</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Duration (hours)</label>
                    <select
                      name="duration"
                      required
                      value={formData.duration}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    >
                      <option value="2">2 hours</option>
                      <option value="3">3 hours</option>
                      <option value="4">4 hours</option>
                      <option value="5">5 hours</option>
                    </select>
                  </div>
                </div>

                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Sparkles className="w-4 h-4 inline mr-1 text-orange-500" />
                    Special Requests (AI-Powered)
                  </label>
                  <textarea
                    name="specialRequests"
                    value={formData.specialRequests}
                    onChange={handleSpecialRequestsChange}
                    rows={3}
                    placeholder="Example: We're vegetarian, traveling with two kids, interested in street food and local markets. Need wheelchair access..."
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                  {isAnalyzing && (
                    <p className="text-sm text-orange-600 mt-2 flex items-center">
                      <Sparkles className="w-4 h-4 mr-1 animate-pulse" />
                      AI is analyzing your request...
                    </p>
                  )}
                </div>

                {extractedInfo && (
                  <div className="mt-4 bg-orange-50 border border-orange-200 rounded-lg p-4">
                    <h3 className="text-sm font-semibold text-orange-900 mb-3 flex items-center">
                      <Sparkles className="w-4 h-4 mr-1" />
                      AI Extracted Information for Tour Guide
                    </h3>
                    <div className="space-y-2 text-sm">
                      {extractedInfo.dietaryRestrictions.length > 0 && (
                        <div>
                          <span className="font-medium text-gray-700">Dietary Restrictions:</span>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {extractedInfo.dietaryRestrictions.map((item, idx) => (
                              <span key={idx} className="bg-red-100 text-red-800 px-2 py-1 rounded text-xs">
                                {item}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {extractedInfo.accessibilityNeeds.length > 0 && (
                        <div>
                          <span className="font-medium text-gray-700">Accessibility Needs:</span>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {extractedInfo.accessibilityNeeds.map((item, idx) => (
                              <span key={idx} className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">
                                {item}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {extractedInfo.groupComposition.length > 0 && (
                        <div>
                          <span className="font-medium text-gray-700">Group Composition:</span>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {extractedInfo.groupComposition.map((item, idx) => (
                              <span key={idx} className="bg-purple-100 text-purple-800 px-2 py-1 rounded text-xs">
                                {item}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {extractedInfo.timePreferences.length > 0 && (
                        <div>
                          <span className="font-medium text-gray-700">Time Preferences:</span>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {extractedInfo.timePreferences.map((item, idx) => (
                              <span key={idx} className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">
                                {item}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {extractedInfo.specificInterests.length > 0 && (
                        <div>
                          <span className="font-medium text-gray-700">Specific Interests:</span>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {extractedInfo.specificInterests.map((item, idx) => (
                              <span key={idx} className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs">
                                {item}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                    <p className="text-xs text-gray-600 mt-3">
                      This structured information will be sent to your tour guide to better prepare for your experience.
                    </p>
                  </div>
                )}
              </div>

              {/* Contact Information */}
              <div className="bg-white rounded-xl shadow-sm border border-orange-100 p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Contact Information</h2>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                    <input
                      type="text"
                      name="firstName"
                      required
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                    <input
                      type="text"
                      name="lastName"
                      required
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>

              {/* Payment Information */}
              <div className="bg-white rounded-xl shadow-sm border border-orange-100 p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold text-gray-900">Payment Information</h2>
                  <div className="flex items-center text-sm text-gray-600">
                    <Lock className="w-4 h-4 mr-1" />
                    Secure Payment
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Card Number</label>
                    <div className="relative">
                      <input
                        type="text"
                        name="cardNumber"
                        required
                        value={formData.cardNumber}
                        onChange={handleInputChange}
                        placeholder="1234 5678 9012 3456"
                        maxLength={19}
                        className="w-full px-4 py-2 pl-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      />
                      <CreditCard className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Cardholder Name</label>
                    <input
                      type="text"
                      name="cardName"
                      required
                      value={formData.cardName}
                      onChange={handleInputChange}
                      placeholder="Name on card"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Expiry Date</label>
                      <input
                        type="text"
                        name="expiryDate"
                        required
                        value={formData.expiryDate}
                        onChange={handleInputChange}
                        placeholder="MM/YY"
                        maxLength={5}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">CVV</label>
                      <input
                        type="text"
                        name="cvv"
                        required
                        value={formData.cvv}
                        onChange={handleInputChange}
                        placeholder="123"
                        maxLength={4}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Billing Address</label>
                    <input
                      type="text"
                      name="billingAddress"
                      required
                      value={formData.billingAddress}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
                      <input
                        type="text"
                        name="city"
                        required
                        value={formData.city}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Postal Code</label>
                      <input
                        type="text"
                        name="postalCode"
                        required
                        value={formData.postalCode}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-4 rounded-xl transition-colors shadow-lg"
              >
                Confirm Booking & Pay ${calculateTotal()}
              </button>
            </form>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm border border-orange-100 p-6 sticky top-24">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Booking Summary</h2>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Tour Guide</span>
                  <span className="font-medium text-gray-900">{tourmanName}</span>
                </div>

                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Rating</span>
                  <span className="font-medium text-gray-900">⭐ {tourmanRating}</span>
                </div>

                <div className="border-t border-gray-200 pt-3">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-600">Rate per hour</span>
                    <span className="font-medium text-gray-900">${tourmanPrice}</span>
                  </div>

                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-600">Duration</span>
                    <span className="font-medium text-gray-900">{formData.duration} hours</span>
                  </div>

                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-600">Group size</span>
                    <span className="font-medium text-gray-900">{formData.groupSize} people</span>
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-3">
                  <div className="flex justify-between">
                    <span className="font-semibold text-gray-900">Total</span>
                    <span className="font-bold text-2xl text-orange-700">${calculateTotal()}</span>
                  </div>
                </div>
              </div>

              <div className="bg-orange-50 rounded-lg p-4 text-sm text-gray-700">
                <p className="font-medium mb-2">What's included:</p>
                <ul className="space-y-1 text-sm">
                  <li>✓ Local food expert guide</li>
                  <li>✓ Multiple food tastings</li>
                  <li>✓ Cultural insights</li>
                  <li>✓ Photo opportunities</li>
                </ul>
              </div>

              <p className="text-xs text-gray-500 mt-4 text-center">Free cancellation up to 24 hours before the tour</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
