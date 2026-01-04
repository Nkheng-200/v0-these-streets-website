"use client"

import type React from "react"
import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Briefcase, TrendingUp, Award, MapPin, ArrowLeft, Upload, Check } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import { useRouter } from "next/navigation"

export default function TourmenPage() {
  const [showApplicationForm, setShowApplicationForm] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [uploadedPhoto, setUploadedPhoto] = useState<string | null>("/placeholder.svg?height=200&width=200")
  const [uploadedId, setUploadedId] = useState<string | null>("passport-scan.pdf")

  const { upgradeToGuide } = useAuth()
  const router = useRouter()

  const [formData, setFormData] = useState({
    fullName: "Minh Nguyen",
    email: "minh.nguyen@example.com",
    phone: "+84 912 345 678",
    dateOfBirth: "1990-03-15",
    nationality: "Vietnamese",
    currentLocation: "Hanoi, Vietnam",
    yearsOfExperience: "3-5",
    languages: "Vietnamese, English, French",
    specialties: ["Street Food", "Hidden Gems", "Local History"] as string[],
    aboutYou:
      "I was born and raised in Hanoi's Old Quarter, where I've spent over 10 years exploring every hidden alley and secret food stall. My grandmother was a street food vendor, and she taught me the stories behind every dish. I'm passionate about preserving our culinary heritage and sharing authentic experiences with visitors.",
    whyGuide:
      "Food is the soul of Vietnamese culture, and I believe every dish tells a story. I want to be a guide because I love connecting people to the real Hanoi - not the tourist traps, but the places where locals eat and gather. Seeing visitors' faces light up when they taste authentic phở or discover a hidden bánh mì stand brings me incredible joy.",
    availability: "flexible",
    maxGroupSize: "4",
    hourlyRate: "25",
  })

  const specialtyOptions = [
    "Street Food",
    "Fine Dining",
    "Hidden Gems",
    "Local Markets",
    "Cultural History",
    "Vegetarian/Vegan",
    "Night Food Tours",
    "Coffee Culture",
  ]

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSpecialtyToggle = (specialty: string) => {
    if (formData.specialties.includes(specialty)) {
      setFormData({
        ...formData,
        specialties: formData.specialties.filter((s) => s !== specialty),
      })
    } else {
      setFormData({
        ...formData,
        specialties: [...formData.specialties, specialty],
      })
    }
  }

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setUploadedPhoto(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleIdUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setUploadedId(file.name)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    setTimeout(() => {
      setIsSubmitting(false)

      upgradeToGuide({
        specialties: formData.specialties,
        languages: formData.languages.split(",").map((l) => l.trim()),
        hourlyRate: formData.hourlyRate,
        approved: false, // Pending admin approval
      })

      alert(
        "Application submitted successfully! We'll review your application and get back to you within 2-3 business days. Check your dashboard for updates.",
      )
      setShowApplicationForm(false)
      window.scrollTo({ top: 0, behavior: "smooth" })

      router.push("/dashboard")
    }, 2000)
  }

  if (showApplicationForm) {
    return (
      <div className="min-h-screen flex flex-col bg-gradient-to-b from-orange-50 to-white">
        <Navigation />

        <main className="flex-1">
          <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
              <button
                onClick={() => setShowApplicationForm(false)}
                className="inline-flex items-center text-white/90 hover:text-white transition-colors mb-6"
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                Back to Guide Info
              </button>
              <h1 className="text-4xl font-bold mb-4">Become a Food Tour Guide</h1>
              <p className="text-lg text-orange-100 max-w-2xl">
                Join our community of passionate local guides and share your love for authentic street food with
                travelers from around the world.
              </p>
            </div>
          </div>

          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Personal Information */}
              <div className="bg-white rounded-xl shadow-sm border border-orange-100 p-6">
                <h2 className="text-2xl font-semibold text-gray-900 mb-6">Personal Information</h2>

                <div className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="fullName" className="block text-sm font-medium mb-2">
                        Full Name *
                      </label>
                      <input
                        id="fullName"
                        name="fullName"
                        required
                        value={formData.fullName}
                        onChange={handleInputChange}
                        placeholder="Enter your full name"
                        className="w-full px-3 py-2 border border-input rounded-md bg-background"
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-medium mb-2">
                        Email Address *
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="your@email.com"
                        className="w-full px-3 py-2 border border-input rounded-md bg-background"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium mb-2">
                        Phone Number *
                      </label>
                      <input
                        id="phone"
                        name="phone"
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="+84 123 456 789"
                        className="w-full px-3 py-2 border border-input rounded-md bg-background"
                      />
                    </div>

                    <div>
                      <label htmlFor="dateOfBirth" className="block text-sm font-medium mb-2">
                        Date of Birth *
                      </label>
                      <input
                        id="dateOfBirth"
                        name="dateOfBirth"
                        type="date"
                        required
                        value={formData.dateOfBirth}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-input rounded-md bg-background"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="nationality" className="block text-sm font-medium mb-2">
                        Nationality *
                      </label>
                      <input
                        id="nationality"
                        name="nationality"
                        required
                        value={formData.nationality}
                        onChange={handleInputChange}
                        placeholder="Vietnamese"
                        className="w-full px-3 py-2 border border-input rounded-md bg-background"
                      />
                    </div>

                    <div>
                      <label htmlFor="currentLocation" className="block text-sm font-medium mb-2">
                        Current Location *
                      </label>
                      <input
                        id="currentLocation"
                        name="currentLocation"
                        required
                        value={formData.currentLocation}
                        onChange={handleInputChange}
                        placeholder="Hanoi, Vietnam"
                        className="w-full px-3 py-2 border border-input rounded-md bg-background"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Profile Photo *</label>
                    <div className="mt-2 flex items-center gap-4">
                      {uploadedPhoto && (
                        <img
                          src={uploadedPhoto || "/placeholder.svg"}
                          alt="Profile preview"
                          className="w-20 h-20 rounded-full object-cover"
                        />
                      )}
                      <label className="cursor-pointer">
                        <div className="flex items-center gap-2 px-4 py-2 border-2 border-dashed border-orange-300 rounded-lg hover:border-orange-500 transition-colors">
                          <Upload className="w-5 h-5 text-orange-600" />
                          <span className="text-sm text-gray-600">
                            {uploadedPhoto ? "Change Photo" : "Upload Photo"}
                          </span>
                        </div>
                        <input type="file" accept="image/*" onChange={handlePhotoUpload} className="hidden" />
                      </label>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      A clear, professional photo of yourself (JPG, PNG, max 5MB)
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">ID Document *</label>
                    <div className="mt-2">
                      <label className="cursor-pointer">
                        <div className="flex items-center gap-2 px-4 py-2 border-2 border-dashed border-orange-300 rounded-lg hover:border-orange-500 transition-colors">
                          {uploadedId ? (
                            <>
                              <Check className="w-5 h-5 text-green-600" />
                              <span className="text-sm text-gray-600">{uploadedId}</span>
                            </>
                          ) : (
                            <>
                              <Upload className="w-5 h-5 text-orange-600" />
                              <span className="text-sm text-gray-600">Upload ID/Passport</span>
                            </>
                          )}
                        </div>
                        <input
                          type="file"
                          accept="image/*,application/pdf"
                          onChange={handleIdUpload}
                          className="hidden"
                        />
                      </label>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      Government-issued ID or passport for verification (PDF or Image)
                    </p>
                  </div>
                </div>
              </div>

              {/* Professional Experience */}
              <div className="bg-white rounded-xl shadow-sm border border-orange-100 p-6">
                <h2 className="text-2xl font-semibold text-gray-900 mb-6">Professional Experience</h2>

                <div className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="yearsOfExperience" className="block text-sm font-medium mb-2">
                        Years of Guiding Experience *
                      </label>
                      <select
                        id="yearsOfExperience"
                        name="yearsOfExperience"
                        required
                        value={formData.yearsOfExperience}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-input rounded-md bg-background"
                      >
                        <option value="">Select experience</option>
                        <option value="0-1">Less than 1 year</option>
                        <option value="1-3">1-3 years</option>
                        <option value="3-5">3-5 years</option>
                        <option value="5+">5+ years</option>
                      </select>
                    </div>

                    <div>
                      <label htmlFor="languages" className="block text-sm font-medium mb-2">
                        Languages You Speak *
                      </label>
                      <input
                        id="languages"
                        name="languages"
                        required
                        value={formData.languages}
                        onChange={handleInputChange}
                        placeholder="e.g., Vietnamese, English, French"
                        className="w-full px-3 py-2 border border-input rounded-md bg-background"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Your Specialties *</label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-2">
                      {specialtyOptions.map((specialty) => (
                        <button
                          key={specialty}
                          type="button"
                          onClick={() => handleSpecialtyToggle(specialty)}
                          className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                            formData.specialties.includes(specialty)
                              ? "bg-orange-500 text-white"
                              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                          }`}
                        >
                          {specialty}
                        </button>
                      ))}
                    </div>
                    <p className="text-xs text-gray-500 mt-1">Select all that apply</p>
                  </div>

                  <div>
                    <label htmlFor="aboutYou" className="block text-sm font-medium mb-2">
                      Tell Us About Yourself *
                    </label>
                    <textarea
                      id="aboutYou"
                      name="aboutYou"
                      required
                      value={formData.aboutYou}
                      onChange={handleInputChange}
                      rows={4}
                      placeholder="Share your background, experience with food culture, and what makes you unique..."
                      className="w-full px-3 py-2 border border-input rounded-md bg-background"
                    />
                  </div>

                  <div>
                    <label htmlFor="whyGuide" className="block text-sm font-medium mb-2">
                      Why Do You Want to Be a Food Tour Guide? *
                    </label>
                    <textarea
                      id="whyGuide"
                      name="whyGuide"
                      required
                      value={formData.whyGuide}
                      onChange={handleInputChange}
                      rows={3}
                      placeholder="What motivates you to share your local food culture with tourists?"
                      className="w-full px-3 py-2 border border-input rounded-md bg-background"
                    />
                  </div>
                </div>
              </div>

              {/* Availability & Pricing */}
              <div className="bg-white rounded-xl shadow-sm border border-orange-100 p-6">
                <h2 className="text-2xl font-semibold text-gray-900 mb-6">Availability & Pricing</h2>

                <div className="space-y-4">
                  <div>
                    <label htmlFor="availability" className="block text-sm font-medium mb-2">
                      General Availability *
                    </label>
                    <select
                      id="availability"
                      name="availability"
                      required
                      value={formData.availability}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-input rounded-md bg-background"
                    >
                      <option value="">Select availability</option>
                      <option value="weekdays">Weekdays only</option>
                      <option value="weekends">Weekends only</option>
                      <option value="flexible">Flexible (All days)</option>
                      <option value="limited">Limited (Few days per month)</option>
                    </select>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="maxGroupSize" className="block text-sm font-medium mb-2">
                        Maximum Group Size *
                      </label>
                      <select
                        id="maxGroupSize"
                        name="maxGroupSize"
                        required
                        value={formData.maxGroupSize}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-input rounded-md bg-background"
                      >
                        <option value="1">1 person</option>
                        <option value="2">2 people</option>
                        <option value="4">4 people</option>
                        <option value="6">6 people</option>
                        <option value="8">8+ people</option>
                      </select>
                    </div>

                    <div>
                      <label htmlFor="hourlyRate" className="block text-sm font-medium mb-2">
                        Desired Hourly Rate (USD) *
                      </label>
                      <input
                        id="hourlyRate"
                        name="hourlyRate"
                        type="number"
                        min="10"
                        max="100"
                        required
                        value={formData.hourlyRate}
                        onChange={handleInputChange}
                        placeholder="20"
                        className="w-full px-3 py-2 border border-input rounded-md bg-background"
                      />
                      <p className="text-xs text-gray-500 mt-1">Typical range: $15-$40/hour</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Terms & Submit */}
              <div className="bg-white rounded-xl shadow-sm border border-orange-100 p-6">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input type="checkbox" required className="mt-1 rounded" />
                  <span className="text-sm text-gray-700">
                    I confirm that all information provided is accurate and I agree to the Terms of Service and Privacy
                    Policy. I understand that background verification will be conducted.
                  </span>
                </label>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full mt-6 bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "Submitting Application..." : "Submit Application"}
                </button>
              </div>
            </form>
          </div>
        </main>

        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navigation />

      {/* Hero */}
      <section className="bg-accent text-accent-foreground px-4 sm:px-6 lg:px-8 py-16 sm:py-24 street-texture">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 leading-tight text-balance">
            Guide. Share. Earn.
          </h1>
          <p className="text-lg sm:text-xl opacity-90 text-balance">
            Become a trusted local food guide and earn 80% revenue sharing your passion for authentic food.
          </p>
        </div>
      </section>

      {/* What is a Tourman */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-foreground mb-8 text-center">What is a Tourman?</h2>
          <p className="text-lg text-muted-foreground text-center mb-8 leading-relaxed">
            Tourmen are verified locals who guide tourists to real hidden gems. Not influencers. Not commercial tour
            operators. Just passionate people who want to share their food culture and keep authenticity alive.
          </p>
        </div>
      </section>

      {/* Benefits */}
      <section className="bg-muted py-16 sm:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-foreground">Tourman Benefits</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-card p-6 rounded-lg border border-border">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center mb-4">
                <TrendingUp className="text-primary-foreground" size={20} />
              </div>
              <h3 className="font-bold text-foreground mb-2">Earn 80% Revenue</h3>
              <p className="text-sm text-muted-foreground">Keep most of what you earn from tours</p>
            </div>

            <div className="bg-card p-6 rounded-lg border border-border">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center mb-4">
                <Award className="text-primary-foreground" size={20} />
              </div>
              <h3 className="font-bold text-foreground mb-2">Build Your Brand</h3>
              <p className="text-sm text-muted-foreground">Develop a personal food guide reputation</p>
            </div>

            <div className="bg-card p-6 rounded-lg border border-border">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center mb-4">
                <Briefcase className="text-primary-foreground" size={20} />
              </div>
              <h3 className="font-bold text-foreground mb-2">Custom Routes</h3>
              <p className="text-sm text-muted-foreground">Create your own tour packages and itineraries</p>
            </div>

            <div className="bg-card p-6 rounded-lg border border-border">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center mb-4">
                <MapPin className="text-primary-foreground" size={20} />
              </div>
              <h3 className="font-bold text-foreground mb-2">Appear on Map</h3>
              <p className="text-sm text-muted-foreground">Get featured and discoverable through the app</p>
            </div>
          </div>
        </div>
      </section>

      {/* Tour Packages */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-foreground">Tour Package Options</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="border-2 border-primary rounded-lg p-8">
              <h3 className="text-2xl font-bold text-foreground mb-2">Walk & Eat</h3>
              <p className="text-primary font-bold mb-4">1-2 hours</p>
              <p className="text-muted-foreground mb-4">
                Perfect for tourists short on time. Visit 2-3 hidden gems and discover local flavor in a quick
                experience.
              </p>
              <p className="text-sm text-muted-foreground">Set your own price</p>
            </div>

            <div className="border-2 border-secondary rounded-lg p-8 bg-muted/50">
              <h3 className="text-2xl font-bold text-foreground mb-2">District Deep Dive</h3>
              <p className="text-secondary font-bold mb-4">3-4 hours</p>
              <p className="text-muted-foreground mb-4">
                Explore a full neighborhood's food culture. Visit 4-5 spots with deeper stories about each location and
                cuisine.
              </p>
              <p className="text-sm text-muted-foreground">Set your own price</p>
            </div>

            <div className="border-2 border-accent rounded-lg p-8">
              <h3 className="text-2xl font-bold text-foreground mb-2">Full-Day Immersion</h3>
              <p className="text-accent font-bold mb-4">6-8 hours</p>
              <p className="text-muted-foreground mb-4">
                Complete local experience combining food, culture, and personal stories. Visit 6+ hidden gems with
                cultural context.
              </p>
              <p className="text-sm text-muted-foreground">Set your own price</p>
            </div>
          </div>
        </div>
      </section>

      {/* Application Process */}
      <section className="bg-primary text-primary-foreground px-4 sm:px-6 lg:px-8 py-16 sm:py-24 street-texture">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">Become a Tourman</h2>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div className="text-center">
              <div className="bg-primary-foreground text-primary w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-3 font-bold">
                1
              </div>
              <h4 className="font-semibold mb-2">Create Profile</h4>
              <p className="text-sm">Set up your basic info</p>
            </div>
            <div className="text-center">
              <div className="bg-primary-foreground text-primary w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-3 font-bold">
                2
              </div>
              <h4 className="font-semibold mb-2">Choose Areas</h4>
              <p className="text-sm">Select neighborhoods you know</p>
            </div>
            <div className="text-center">
              <div className="bg-primary-foreground text-primary w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-3 font-bold">
                3
              </div>
              <h4 className="font-semibold mb-2">Add Cuisines</h4>
              <p className="text-sm">List your specialties</p>
            </div>
            <div className="text-center">
              <div className="bg-primary-foreground text-primary w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-3 font-bold">
                4
              </div>
              <h4 className="font-semibold mb-2">Set Availability</h4>
              <p className="text-sm">Choose when you guide</p>
            </div>
            <div className="text-center">
              <div className="bg-primary-foreground text-primary w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-3 font-bold">
                5
              </div>
              <h4 className="font-semibold mb-2">Get Verified</h4>
              <p className="text-sm">Pass verification checks</p>
            </div>
          </div>

          <div className="text-center mt-12">
            <button
              onClick={() => setShowApplicationForm(true)}
              className="bg-primary-foreground text-primary font-semibold px-8 py-3 rounded-lg hover:opacity-90 transition-opacity"
            >
              Apply to Become a Guide
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
