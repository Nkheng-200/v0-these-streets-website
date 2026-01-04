"use client"

import { useState, useEffect } from "react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import Link from "next/link"
import { ArrowRight, Heart, MapPin, Users, Star, ChevronDown, Smartphone, List, UserCheck } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"

const AnimatedCountry = () => {
  const countries = ["Vietnam", "Thailand", "Japan", "Korea", "Taiwan", "Singapore"]
  const [index, setIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true)
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % countries.length)
        setIsAnimating(false)
      }, 500)
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  return (
    <span
      className={`inline-block text-accent transition-all duration-500 ${
        isAnimating ? "opacity-0 -translate-y-4" : "opacity-100 translate-y-0"
      }`}
    >
      {countries[index]}
    </span>
  )
}

export default function Home() {
  const scrollToFeatures = () => {
    document.getElementById("features")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navigation />

      {/* Hero Section - Full viewport with striking visual */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-primary via-primary/90 to-secondary">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[url('/vietnamese-street-food-pattern.jpg')] bg-repeat opacity-20" />
        </div>

        {/* Animated floating elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-accent/20 rounded-full blur-2xl animate-pulse" />
        <div className="absolute bottom-40 right-20 w-32 h-32 bg-secondary/20 rounded-full blur-3xl animate-pulse delay-700" />
        <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-accent/10 rounded-full blur-2xl animate-pulse delay-1000" />

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Main Headline */}
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-primary-foreground mb-6 leading-tight text-balance animate-fade-in">
            Discover the Real
            <br />
            <span className="inline-block">
              Streets of <AnimatedCountry />
            </span>
          </h1>

          {/* Subheadline */}
          <p className="text-xl sm:text-2xl text-primary-foreground/90 mb-12 max-w-3xl mx-auto text-balance animate-fade-in-up">
            Skip the tourist traps. Find authentic street food through local guides who know every hidden gem.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16 animate-fade-in-up">
            <Link href="/swipe">
              <Button size="lg" className="text-lg px-8 py-6 bg-accent text-accent-foreground hover:bg-accent/90 group">
                Start Discovering
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link href="/find-tourman">
              <Button
                size="lg"
                variant="outline"
                className="text-lg px-8 py-6 border-2 border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary bg-transparent"
              >
                Find a Local Guide
              </Button>
            </Link>
          </div>

          {/* Social Proof */}
          <div className="flex flex-wrap justify-center gap-8 text-primary-foreground/80 animate-fade-in-up">
            <div className="flex items-center gap-2">
              <Star className="h-5 w-5 fill-accent text-accent" />
              <span className="text-sm">Rated 4.9/5 by travelers</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              <span className="text-sm">50+ Local Guides</span>
            </div>
            <div className="flex items-center gap-2">
              <Heart className="h-5 w-5" />
              <span className="text-sm">500+ Hidden Gems</span>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <button
          onClick={scrollToFeatures}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-primary-foreground/60 hover:text-primary-foreground transition-colors animate-bounce"
          aria-label="Scroll to features"
        >
          <ChevronDown className="h-8 w-8" />
        </button>
      </section>

      {/* How It Works - Visual Journey */}
      <section id="features" className="py-24 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">Your Journey Starts Here</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              From discovery to dining, we make authentic food experiences effortless
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Step 1: Swipe */}
            <div className="relative group h-full">
              <div className="absolute -inset-1 bg-gradient-to-r from-primary to-accent rounded-2xl opacity-0 group-hover:opacity-20 blur-xl transition-opacity" />
              <div className="relative bg-card rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all h-full flex flex-col">
                <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Smartphone className="w-8 h-8 text-primary" strokeWidth={2} />
                </div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-lg">
                    1
                  </div>
                  <h3 className="text-2xl font-bold text-foreground">Swipe & Discover</h3>
                </div>
                <p className="text-base text-muted-foreground leading-relaxed mb-6 flex-grow">
                  Browse authentic street food near you. Swipe right to save dishes that catch your eye, left to pass.
                </p>
                <Link
                  href="/swipe"
                  className="inline-flex items-center text-primary font-semibold hover:text-primary/80 transition-colors group/link"
                >
                  Try the swipe{" "}
                  <ArrowRight className="ml-2 h-4 w-4 group-hover/link:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>

            {/* Step 2: Build Your List */}
            <div className="relative group h-full">
              <div className="absolute -inset-1 bg-gradient-to-r from-secondary to-primary rounded-2xl opacity-0 group-hover:opacity-20 blur-xl transition-opacity" />
              <div className="relative bg-card rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all h-full flex flex-col">
                <div className="w-16 h-16 bg-secondary/10 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <List className="w-8 h-8 text-secondary" strokeWidth={2} />
                </div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-secondary text-secondary-foreground flex items-center justify-center font-bold text-lg">
                    2
                  </div>
                  <h3 className="text-2xl font-bold text-foreground">Build Your List</h3>
                </div>
                <p className="text-base text-muted-foreground leading-relaxed mb-6 flex-grow">
                  Create personalized food trip playlists. Organize dishes by neighborhood or cuisine type.
                </p>
                <Link
                  href="/my-list"
                  className="inline-flex items-center text-primary font-semibold hover:text-primary/80 transition-colors group/link"
                >
                  View my list{" "}
                  <ArrowRight className="ml-2 h-4 w-4 group-hover/link:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>

            {/* Step 3: Book a Guide */}
            <div className="relative group h-full">
              <div className="absolute -inset-1 bg-gradient-to-r from-accent to-secondary rounded-2xl opacity-0 group-hover:opacity-20 blur-xl transition-opacity" />
              <div className="relative bg-card rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all h-full flex flex-col">
                <div className="w-16 h-16 bg-accent/10 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <UserCheck className="w-8 h-8 text-accent" strokeWidth={2} />
                </div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-accent text-accent-foreground flex items-center justify-center font-bold text-lg">
                    3
                  </div>
                  <h3 className="text-2xl font-bold text-foreground">Meet Your Guide</h3>
                </div>
                <p className="text-base text-muted-foreground leading-relaxed mb-6 flex-grow">
                  Book a local Tourman who knows the stories behind every dish and every street corner.
                </p>
                <Link
                  href="/find-tourman"
                  className="inline-flex items-center text-primary font-semibold hover:text-primary/80 transition-colors group/link"
                >
                  Find a guide{" "}
                  <ArrowRight className="ml-2 h-4 w-4 group-hover/link:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Experiences - Visual Grid */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">Experience the Real Vietnam</h2>
            <p className="text-xl text-muted-foreground">Authentic moments curated by locals</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Experience Card 1 */}
            <Link
              href="/swipe"
              className="group relative overflow-hidden rounded-2xl aspect-[4/5] bg-gradient-to-br from-primary to-primary/80"
            >
              <Image
                src="/vietnamese-street-food-vendor.jpg"
                alt="Street Food"
                fill
                className="object-cover opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <h3 className="text-2xl font-bold mb-2">Hidden Street Stalls</h3>
                <p className="text-white/80 mb-4">Where locals eat daily</p>
                <div className="flex items-center text-accent font-semibold group-hover:translate-x-2 transition-transform">
                  Explore now <ArrowRight className="ml-2 h-5 w-5" />
                </div>
              </div>
            </Link>

            {/* Experience Card 2 */}
            <Link
              href="/find-tourman"
              className="group relative overflow-hidden rounded-2xl aspect-[4/5] bg-gradient-to-br from-secondary to-secondary/80"
            >
              <Image
                src="/vietnamese-local-tour-guide.jpg"
                alt="Local Guides"
                fill
                className="object-cover opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <h3 className="text-2xl font-bold mb-2">Expert Local Guides</h3>
                <p className="text-white/80 mb-4">Stories beyond the menu</p>
                <div className="flex items-center text-accent font-semibold group-hover:translate-x-2 transition-transform">
                  Meet guides <ArrowRight className="ml-2 h-5 w-5" />
                </div>
              </div>
            </Link>

            {/* Experience Card 3 */}
            <Link
              href="/swipe"
              className="group relative overflow-hidden rounded-2xl aspect-[4/5] bg-gradient-to-br from-accent to-accent/80"
            >
              <Image
                src="/vietnamese-pho-bowl.jpg"
                alt="Signature Dishes"
                fill
                className="object-cover opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <h3 className="text-2xl font-bold mb-2">Signature Dishes</h3>
                <p className="text-white/80 mb-4">Each with its own story</p>
                <div className="flex items-center text-accent font-semibold group-hover:translate-x-2 transition-transform">
                  Start swiping <ArrowRight className="ml-2 h-5 w-5" />
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* For Different Users - Split Screen */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-muted/50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* For Tourists */}
            <div className="bg-gradient-to-br from-primary to-primary/80 rounded-3xl p-12 text-primary-foreground relative overflow-hidden group hover:shadow-2xl transition-all">
              <div className="absolute top-0 right-0 w-64 h-64 bg-accent/10 rounded-full blur-3xl" />
              <div className="relative z-10">
                <MapPin className="h-12 w-12 mb-6 text-accent" />
                <h3 className="text-3xl font-bold mb-4">For Travelers</h3>
                <p className="text-lg text-primary-foreground/90 mb-8 leading-relaxed">
                  Discover authentic food experiences away from tourist crowds. GPS-powered recommendations guide you to
                  hidden gems locals love.
                </p>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-accent text-xs">✓</span>
                    </div>
                    <span>Swipe-based food discovery</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-accent text-xs">✓</span>
                    </div>
                    <span>Create custom food trip playlists</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-accent text-xs">✓</span>
                    </div>
                    <span>Book verified local guides</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-accent text-xs">✓</span>
                    </div>
                    <span>Read authentic reviews from locals</span>
                  </li>
                </ul>
                <Link href="/tourists">
                  <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 group">
                    Start Your Journey
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </div>
            </div>

            {/* For Guides */}
            <div className="bg-gradient-to-br from-secondary to-secondary/80 rounded-3xl p-12 text-secondary-foreground relative overflow-hidden group hover:shadow-2xl transition-all">
              <div className="absolute top-0 right-0 w-64 h-64 bg-accent/10 rounded-full blur-3xl" />
              <div className="relative z-10">
                <Users className="h-12 w-12 mb-6 text-accent" />
                <h3 className="text-3xl font-bold mb-4">For Local Guides</h3>
                <p className="text-lg text-secondary-foreground/90 mb-8 leading-relaxed">
                  Turn your passion for local food into income. Share your neighborhood's hidden gems and earn 80% of
                  tour revenue.
                </p>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-accent text-xs">✓</span>
                    </div>
                    <span>Build your personal brand</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-accent text-xs">✓</span>
                    </div>
                    <span>Set your own schedule and rates</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-accent text-xs">✓</span>
                    </div>
                    <span>Connect with food-loving travelers</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-accent text-xs">✓</span>
                    </div>
                    <span>Grow your community reputation</span>
                  </li>
                </ul>
                <Link href="/tourmen">
                  <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 group">
                    Become a Tourman
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA - Bold and Simple */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-primary via-primary to-secondary relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[url('/street-pattern.jpg')] bg-repeat opacity-20" />
        </div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-4xl sm:text-5xl font-bold text-primary-foreground mb-6 text-balance">
            Ready to Taste the Real Vietnam?
          </h2>
          <p className="text-xl text-primary-foreground/90 mb-10 text-balance">
            Join thousands of travelers discovering authentic street food experiences
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/auth">
              <Button size="lg" className="text-lg px-10 py-6 bg-accent text-accent-foreground hover:bg-accent/90">
                Sign Up Free
              </Button>
            </Link>
            <Link href="/swipe">
              <Button
                size="lg"
                variant="outline"
                className="text-lg px-10 py-6 border-2 border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary bg-transparent"
              >
                Start Exploring
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
