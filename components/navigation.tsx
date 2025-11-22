"use client"

import Link from "next/link"
import { useState } from "react"
import { Menu, X } from "lucide-react"

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="bg-card border-b border-border sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg">TS</span>
            </div>
            <span className="font-bold text-lg text-foreground hidden sm:inline">These Streets</span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-foreground hover:text-primary transition-colors">
              Home
            </Link>
            <Link href="/tourists" className="text-foreground hover:text-primary transition-colors">
              For Tourists
            </Link>
            <Link href="/tourmen" className="text-foreground hover:text-primary transition-colors">
              For Guides
            </Link>
            <Link href="/restaurants" className="text-foreground hover:text-primary transition-colors">
              For Restaurants
            </Link>
            <Link href="/about" className="text-foreground hover:text-primary transition-colors">
              About
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 hover:bg-muted rounded-lg"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden pb-4 space-y-2">
            <Link href="/" className="block px-4 py-2 text-foreground hover:bg-muted rounded-lg">
              Home
            </Link>
            <Link href="/tourists" className="block px-4 py-2 text-foreground hover:bg-muted rounded-lg">
              For Tourists
            </Link>
            <Link href="/tourmen" className="block px-4 py-2 text-foreground hover:bg-muted rounded-lg">
              For Guides
            </Link>
            <Link href="/restaurants" className="block px-4 py-2 text-foreground hover:bg-muted rounded-lg">
              For Restaurants
            </Link>
            <Link href="/about" className="block px-4 py-2 text-foreground hover:bg-muted rounded-lg">
              About
            </Link>
          </div>
        )}
      </div>
    </nav>
  )
}
