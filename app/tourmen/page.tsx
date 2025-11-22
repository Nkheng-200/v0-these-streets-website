"use client"

import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Briefcase, TrendingUp, Award, MapPin } from "lucide-react"

export default function TourmenPage() {
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
            <button className="bg-primary-foreground text-primary font-semibold px-8 py-3 rounded-lg hover:opacity-90 transition-opacity">
              Apply to Become a Guide
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
