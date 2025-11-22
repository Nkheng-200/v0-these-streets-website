"use client"

import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Heart, Globe, Users, Lightbulb } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navigation />

      {/* Hero */}
      <section className="bg-primary text-primary-foreground px-4 sm:px-6 lg:px-8 py-16 sm:py-24 street-texture">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 leading-tight text-balance">
            About These Streets
          </h1>
          <p className="text-lg sm:text-xl opacity-95 text-balance">
            Protecting authentic food culture. Connecting real people. Supporting hidden gems.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-foreground mb-8 text-center">Our Story</h2>

          <div className="prose prose-invert max-w-none text-muted-foreground space-y-6">
            <p className="text-lg leading-relaxed">
              These Streets was created by a group of students in Hanoi who fell in love with their city's food culture.
              We watched authentic local eateries get buried under influencer hype and fake reviews. We saw tourists
              trapped in tourist traps, missing the real food experience they came for.
            </p>

            <p className="text-lg leading-relaxed">
              We wanted to build something different. A platform where locals become guides, where hidden gems get
              discovered by people who truly appreciate them, and where authenticity is protected above all else.
            </p>

            <p className="text-lg leading-relaxed">
              These Streets isn't just an app. It's a movement to keep local food culture alive and real in the age of
              social media and commercialization.
            </p>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="bg-muted py-16 sm:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-foreground mb-12 text-center">Our Mission</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-card border border-border p-8 rounded-lg">
              <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center mb-4">
                <Heart className="text-primary-foreground" size={24} />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2">Preserve Local Identity</h3>
              <p className="text-muted-foreground">
                Protect authentic food culture from being homogenized or commercialized. Keep neighborhood food
                traditions alive.
              </p>
            </div>

            <div className="bg-card border border-border p-8 rounded-lg">
              <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center mb-4">
                <Globe className="text-primary-foreground" size={24} />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2">Help Tourists Eat Honestly</h3>
              <p className="text-muted-foreground">
                Give travelers access to genuine local food experiences guided by people who actually live the culture.
              </p>
            </div>

            <div className="bg-card border border-border p-8 rounded-lg">
              <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center mb-4">
                <Users className="text-primary-foreground" size={24} />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2">Support Small Businesses</h3>
              <p className="text-muted-foreground">
                Connect family-run eateries with customers who appreciate their craft and authenticity.
              </p>
            </div>

            <div className="bg-card border border-border p-8 rounded-lg">
              <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center mb-4">
                <Lightbulb className="text-primary-foreground" size={24} />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2">Empower Locals</h3>
              <p className="text-muted-foreground">
                Give local people a voice and a way to earn by sharing their passion for food and culture.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-foreground mb-12 text-center">Our Values</h2>

          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-8 w-8 rounded-md bg-primary text-primary-foreground font-bold">
                  ✓
                </div>
              </div>
              <div>
                <h3 className="font-bold text-foreground mb-1 text-lg">Authenticity First</h3>
                <p className="text-muted-foreground">
                  We never compromise on real experiences. No sponsored content, no influencers, no fake reviews.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-8 w-8 rounded-md bg-primary text-primary-foreground font-bold">
                  ✓
                </div>
              </div>
              <div>
                <h3 className="font-bold text-foreground mb-1 text-lg">Community Over Commerce</h3>
                <p className="text-muted-foreground">
                  Every feature is designed around what's best for our community, not what makes more money.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-8 w-8 rounded-md bg-primary text-primary-foreground font-bold">
                  ✓
                </div>
              </div>
              <div>
                <h3 className="font-bold text-foreground mb-1 text-lg">Respect & Fairness</h3>
                <p className="text-muted-foreground">
                  We respect local businesses, honor cultures, and ensure everyone is treated fairly and compensated
                  well.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-8 w-8 rounded-md bg-primary text-primary-foreground font-bold">
                  ✓
                </div>
              </div>
              <div>
                <h3 className="font-bold text-foreground mb-1 text-lg">Quality & Verification</h3>
                <p className="text-muted-foreground">
                  We verify every reviewer, every restaurant, and every guide to maintain the highest standards.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-secondary text-secondary-foreground px-4 sm:px-6 lg:px-8 py-16 sm:py-24 street-texture">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Join Our Movement</h2>
          <p className="text-lg mb-8 opacity-95">
            Help us protect authentic food culture and build a better way to discover real local experiences.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-secondary-foreground text-secondary font-semibold px-8 py-3 rounded-lg hover:opacity-90 transition-opacity">
              Download App
            </button>
            <button className="border-2 border-secondary-foreground text-secondary-foreground font-semibold px-8 py-3 rounded-lg hover:bg-secondary-foreground hover:text-secondary transition-colors">
              Get in Touch
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
