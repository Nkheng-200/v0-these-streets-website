"use client"

import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import Link from "next/link"
import { TouristIcon } from "@/components/icons/tourist-icon"
import { GuideIcon } from "@/components/icons/guide-icon"
import { RestaurantIcon } from "@/components/icons/restaurant-icon"

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="bg-primary text-primary-foreground px-4 sm:px-6 lg:px-8 py-16 sm:py-24 street-texture">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 leading-tight text-balance">
            Eat Like a Local. Not Like a Tourist.
          </h1>
          <p className="text-lg sm:text-xl mb-8 opacity-95 text-balance">
            Real food from real locals. No ads, no sponsored reviews, no tourist traps.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-primary-foreground text-primary font-semibold px-8 py-3 rounded-lg hover:opacity-90 transition-opacity">
              Download App
            </button>
            <Link
              href="/tourmen"
              className="bg-secondary text-secondary-foreground font-semibold px-8 py-3 rounded-lg hover:opacity-90 transition-opacity"
            >
              Become a Tourman
            </Link>
            <Link
              href="/restaurants"
              className="border-2 border-primary-foreground text-primary-foreground font-semibold px-8 py-3 rounded-lg hover:bg-primary-foreground hover:text-primary transition-colors"
            >
              Add Your Restaurant
            </Link>
          </div>
        </div>
      </section>

      {/* Three Pillars */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12 text-foreground">
            One Platform. Three Communities.
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Tourists */}
            <div className="bg-gradient-to-br from-card to-muted/40 border-2 border-primary/30 rounded-2xl p-8 hover:shadow-xl hover:border-primary/60 transition-all duration-300 group">
              <div className="relative mb-6">
                <div className="absolute inset-0 bg-primary/10 rounded-xl blur-xl group-hover:blur-2xl transition-all duration-300" />
                <div className="relative w-16 h-16 bg-gradient-to-br from-primary to-primary/80 rounded-xl flex items-center justify-center text-primary-foreground shadow-lg">
                  <TouristIcon />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                For Tourists
              </h3>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Discover authentic hidden gems through GPS-based recommendations and real local reviews. Swipe, save,
                and experience genuine food culture.
              </p>
              <Link
                href="/tourists"
                className="text-primary font-semibold hover:text-primary/80 transition-colors mb-4 block group-hover:translate-x-1 transition-transform"
              >
                Learn more →
              </Link>
              <div className="space-y-2 pt-4 border-t border-border/50">
                <Link
                  href="/swipe"
                  className="text-sm text-secondary hover:text-secondary/80 transition-colors block hover:translate-x-1 transition-transform"
                >
                  Try The Swipe →
                </Link>
                <Link
                  href="/my-list"
                  className="text-sm text-secondary hover:text-secondary/80 transition-colors block hover:translate-x-1 transition-transform"
                >
                  Build My List →
                </Link>
              </div>
            </div>

            {/* Tourmen */}
            <div className="bg-gradient-to-br from-card to-muted/40 border-2 border-secondary/30 rounded-2xl p-8 hover:shadow-xl hover:border-secondary/60 transition-all duration-300 group">
              <div className="relative mb-6">
                <div className="absolute inset-0 bg-secondary/10 rounded-xl blur-xl group-hover:blur-2xl transition-all duration-300" />
                <div className="relative w-16 h-16 bg-gradient-to-br from-secondary to-secondary/80 rounded-xl flex items-center justify-center text-secondary-foreground shadow-lg">
                  <GuideIcon />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-3 group-hover:text-secondary transition-colors">
                For Guides
              </h3>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Share your passion for local food and earn 80% revenue. Build your personal brand and lead tourists to
                real hidden gems.
              </p>
              <Link
                href="/tourmen"
                className="text-primary font-semibold hover:text-primary/80 transition-colors mb-4 block group-hover:translate-x-1 transition-transform"
              >
                Learn more →
              </Link>
              <div className="pt-4 border-t border-border/50">
                <Link
                  href="/find-tourman"
                  className="text-sm text-secondary hover:text-secondary/80 transition-colors block hover:translate-x-1 transition-transform"
                >
                  Find a Tourman →
                </Link>
              </div>
            </div>

            {/* Restaurants */}
            <div className="bg-gradient-to-br from-card to-muted/40 border-2 border-accent/30 rounded-2xl p-8 hover:shadow-xl hover:border-accent/60 transition-all duration-300 group">
              <div className="relative mb-6">
                <div className="absolute inset-0 bg-accent/10 rounded-xl blur-xl group-hover:blur-2xl transition-all duration-300" />
                <div className="relative w-16 h-16 bg-gradient-to-br from-accent to-accent/80 rounded-xl flex items-center justify-center text-accent-foreground shadow-lg">
                  <RestaurantIcon />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-3 group-hover:text-accent transition-colors">
                For Restaurants
              </h3>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Highlight your signature dish and connect with the right customers. Respect mode protects your
                authenticity and capacity.
              </p>
              <Link
                href="/restaurants"
                className="text-primary font-semibold hover:text-primary/80 transition-colors group-hover:translate-x-1 transition-transform inline-block"
              >
                Learn more →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-muted py-16 sm:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12 text-foreground">How the App Works</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="bg-primary text-primary-foreground w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-lg">
                1
              </div>
              <h4 className="font-semibold text-foreground mb-2">Find Your Location</h4>
              <p className="text-sm text-muted-foreground">Allow GPS access to discover dishes near you</p>
            </div>
            <div className="text-center">
              <div className="bg-primary text-primary-foreground w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-lg">
                2
              </div>
              <h4 className="font-semibold text-foreground mb-2">Swipe & Discover</h4>
              <p className="text-sm text-muted-foreground">Swipe right to save, left to skip recommended dishes</p>
            </div>
            <div className="text-center">
              <div className="bg-primary text-primary-foreground w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-lg">
                3
              </div>
              <h4 className="font-semibold text-foreground mb-2">Read Reviews</h4>
              <p className="text-sm text-muted-foreground">See verified local reviews and upvoted recommendations</p>
            </div>
            <div className="text-center">
              <div className="bg-primary text-primary-foreground w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-lg">
                4
              </div>
              <h4 className="font-semibold text-foreground mb-2">Meet a Guide</h4>
              <p className="text-sm text-muted-foreground">Book a Tourman for a personalized food experience</p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Join */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12 text-foreground">Why These Streets?</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-8 w-8 rounded-md bg-primary text-primary-foreground">
                  ✓
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-1">Verified Locals Only</h3>
                <p className="text-muted-foreground">No influencers, no fake reviews. Real people, real food.</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-8 w-8 rounded-md bg-primary text-primary-foreground">
                  ✓
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-1">GPS-Based Discovery</h3>
                <p className="text-muted-foreground">Find authentic dishes exactly where you are.</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-8 w-8 rounded-md bg-primary text-primary-foreground">
                  ✓
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-1">Support Small Businesses</h3>
                <p className="text-muted-foreground">Help hidden gems thrive with the right customers.</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-8 w-8 rounded-md bg-primary text-primary-foreground">
                  ✓
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-1">Earn as a Guide</h3>
                <p className="text-muted-foreground">Share your passion and earn 80% of tour revenue.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
