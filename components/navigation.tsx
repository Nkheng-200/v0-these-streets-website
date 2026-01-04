"use client"

import Link from "next/link"
import Image from "next/image"
import { useState } from "react"
import { useAuth } from "@/contexts/auth-context"
import { Menu, X, User, LogOut, Settings, Heart } from "lucide-react"

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [showUserMenu, setShowUserMenu] = useState(false)

  const { user, isLoggedIn, logout } = useAuth()

  const handleLogout = () => {
    setShowUserMenu(false)
    logout()
  }

  return (
    <nav className="bg-card border-b border-border sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image
              src="/logo.png"
              alt="These Streets Logo"
              width={200}
              height={70}
              className="h-16 w-auto object-contain mix-blend-multiply"
              priority
            />
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

            {isLoggedIn ? (
              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-muted transition-colors"
                >
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                    <User className="w-5 h-5 text-primary" />
                  </div>
                  <span className="text-foreground font-medium">{user?.name || "User"}</span>
                </button>

                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-card border border-border rounded-lg shadow-lg overflow-hidden">
                    <Link
                      href="/dashboard"
                      className="flex items-center gap-3 px-4 py-3 hover:bg-muted transition-colors"
                      onClick={() => setShowUserMenu(false)}
                    >
                      <User className="w-4 h-4 text-muted-foreground" />
                      <span className="text-foreground">Dashboard</span>
                    </Link>
                    <Link
                      href="/my-list"
                      className="flex items-center gap-3 px-4 py-3 hover:bg-muted transition-colors"
                      onClick={() => setShowUserMenu(false)}
                    >
                      <Heart className="w-4 h-4 text-muted-foreground" />
                      <span className="text-foreground">My Lists</span>
                    </Link>
                    <Link
                      href="/dashboard/profile"
                      className="flex items-center gap-3 px-4 py-3 hover:bg-muted transition-colors"
                      onClick={() => setShowUserMenu(false)}
                    >
                      <Settings className="w-4 h-4 text-muted-foreground" />
                      <span className="text-foreground">Settings</span>
                    </Link>
                    <div className="border-t border-border">
                      <button
                        className="flex items-center gap-3 px-4 py-3 hover:bg-muted transition-colors w-full text-left"
                        onClick={handleLogout}
                      >
                        <LogOut className="w-4 h-4 text-muted-foreground" />
                        <span className="text-foreground">Logout</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link
                href="/auth"
                className="bg-primary text-primary-foreground font-semibold px-6 py-2 rounded-lg hover:opacity-90 transition-opacity"
              >
                Login
              </Link>
            )}
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

            {isLoggedIn ? (
              <>
                <div className="border-t border-border my-2"></div>
                <Link
                  href="/dashboard"
                  className="flex items-center gap-3 px-4 py-2 text-foreground hover:bg-muted rounded-lg"
                >
                  <User className="w-4 h-4" />
                  Dashboard
                </Link>
                <Link
                  href="/my-list"
                  className="flex items-center gap-3 px-4 py-2 text-foreground hover:bg-muted rounded-lg"
                >
                  <Heart className="w-4 h-4" />
                  My Lists
                </Link>
                <Link
                  href="/dashboard/profile"
                  className="flex items-center gap-3 px-4 py-2 text-foreground hover:bg-muted rounded-lg"
                >
                  <Settings className="w-4 h-4" />
                  Settings
                </Link>
                <button
                  className="flex items-center gap-3 px-4 py-2 text-foreground hover:bg-muted rounded-lg w-full text-left"
                  onClick={handleLogout}
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              </>
            ) : (
              <Link
                href="/auth"
                className="block px-4 py-2 text-primary-foreground bg-primary hover:opacity-90 rounded-lg font-semibold text-center"
              >
                Login
              </Link>
            )}
          </div>
        )}
      </div>
    </nav>
  )
}
