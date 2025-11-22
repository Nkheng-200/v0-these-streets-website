"use client"

import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { MapPin, Vote, Users, Zap } from "lucide-react"

export default function TouristPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navigation />

      {/* Hero */}
      <section className="bg-secondary text-secondary-foreground px-4 sm:px-6 lg:px-8 py-16 sm:py-24 street-texture">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 leading-tight text-balance">
            Discover Food Like Never Before
          </h1>
          <p className="text-lg sm:text-xl opacity-95 text-balance">
            Swipe through authentic dishes. Vote on real reviews. Find hidden gems your friends don't know about.
          </p>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
            {/* Swipe Discovery */}
            <div className="flex flex-col gap-4">
              <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
                <Zap className="text-primary-foreground" size={24} />
              </div>
              <h3 className="text-2xl font-bold text-foreground">Swipe-Based Discovery</h3>
              <p className="text-muted-foreground leading-relaxed">
                Tinder-style interface for food discovery. Swipe right to save to your basket, left to skip. Discover
                new dishes based on location, time of day, and season. Perfect for indecisive eaters or food explorers
                looking for their next favorite meal.
              </p>
            </div>

            {/* GPS Suggestions */}
            <div className="flex flex-col gap-4">
              <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
                <MapPin className="text-primary-foreground" size={24} />
              </div>
              <h3 className="text-2xl font-bold text-foreground">GPS-Based AI Suggestions</h3>
              <p className="text-muted-foreground leading-relaxed">
                Automatic location detection recommends popular dishes within your area. Get top 10 dishes tailored by
                time of day and season. Find exactly what you're craving without leaving your neighborhood.
              </p>
            </div>

            {/* Verified Reviews */}
            <div className="flex flex-col gap-4">
              <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
                <Users className="text-primary-foreground" size={24} />
              </div>
              <h3 className="text-2xl font-bold text-foreground">Local-Only Verified Reviews</h3>
              <p className="text-muted-foreground leading-relaxed">
                Only locals can post reviews. AI filters out fake content by detecting repetitive text, spam patterns,
                and bot-like behavior. No influencers. No sponsored content. Pure authentic voices.
              </p>
            </div>

            {/* Voting System */}
            <div className="flex flex-col gap-4">
              <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
                <Vote className="text-primary-foreground" size={24} />
              </div>
              <h3 className="text-2xl font-bold text-foreground">Community Voting System</h3>
              <p className="text-muted-foreground leading-relaxed">
                Upvote and downvote food reviews. Most upvoted reviews rise to the top. Active reviewers earn "Trusted
                Reviewer" badges. Community-driven rankings ensure the best recommendations surface.
              </p>
            </div>
          </div>

          {/* Interactive Map & Modes */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-muted p-8 rounded-xl">
            <div>
              <h3 className="text-2xl font-bold text-foreground mb-4">Interactive Map</h3>
              <p className="text-muted-foreground mb-4">
                See nearby hidden gems instantly. Follow a Tourman's live route (opt-in GPS sharing). Never miss an
                opportunity to discover something new.
              </p>
              <ul className="space-y-2 text-muted-foreground">
                <li>✓ Real-time guide locations</li>
                <li>✓ Dish hotspots by area</li>
                <li>✓ Distance and directions</li>
              </ul>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-foreground mb-4">Two Discovery Modes</h3>
              <p className="text-muted-foreground mb-4">Choose how you want to explore food.</p>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-foreground">Search Mode</h4>
                  <p className="text-sm text-muted-foreground">For food enthusiasts with specific cravings</p>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground">Random Swipe Mode</h4>
                  <p className="text-sm text-muted-foreground">For indecisive eaters exploring what looks good</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary text-primary-foreground px-4 sm:px-6 lg:px-8 py-16 street-texture">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Ready to Discover Real Food?</h2>
          <p className="text-lg mb-8 opacity-95">Download These Streets and start your authentic food journey today.</p>
          <button className="bg-primary-foreground text-primary font-semibold px-8 py-3 rounded-lg hover:opacity-90 transition-opacity">
            Download App
          </button>
        </div>
      </section>

      <Footer />
    </div>
  )
}
