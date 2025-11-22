"use client"

import type React from "react"

import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { useState } from "react"
import { Clock, Users, Plus, Trash2, Camera } from "lucide-react"

export default function RestaurantPage() {
  const [activeTab, setActiveTab] = useState<"onboarding" | "dashboard">("onboarding")
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    contact: "",
    hours: "",
    seating: "",
    maxGroupSize: "",
    busyHours: "",
    dishName: "",
    dishPrice: "",
    dishDescription: "",
    menuItems: [{ id: 1, name: "", price: "", description: "" }],
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleMenuItemChange = (id: number, field: string, value: string) => {
    setFormData({
      ...formData,
      menuItems: formData.menuItems.map((item) => (item.id === id ? { ...item, [field]: value } : item)),
    })
  }

  const addMenuItem = () => {
    setFormData({
      ...formData,
      menuItems: [...formData.menuItems, { id: Date.now(), name: "", price: "", description: "" }],
    })
  }

  const removeMenuItem = (id: number) => {
    setFormData({
      ...formData,
      menuItems: formData.menuItems.filter((item) => item.id !== id),
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    alert("Thank you! We will contact you to confirm a few small details. No preparation needed.")
    setFormData({
      name: "",
      address: "",
      contact: "",
      hours: "",
      seating: "",
      maxGroupSize: "",
      busyHours: "",
      dishName: "",
      dishPrice: "",
      dishDescription: "",
      menuItems: [{ id: 1, name: "", price: "", description: "" }],
    })
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navigation />

      {/* Hero */}
      <section className="bg-secondary text-secondary-foreground px-4 sm:px-6 lg:px-8 py-16 sm:py-24 street-texture">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 leading-tight text-balance">
            Add Your Restaurant to These Streets
          </h1>
          <p className="text-lg sm:text-xl opacity-95 text-balance">
            Highlight your signature dish. Connect with the right customers. Keep your authenticity intact.
          </p>
        </div>
      </section>

      {/* Tabs */}
      <section className="py-8 px-4 sm:px-6 lg:px-8 border-b border-border bg-card">
        <div className="max-w-6xl mx-auto flex gap-4">
          <button
            onClick={() => setActiveTab("onboarding")}
            className={`px-6 py-2 font-semibold rounded-lg transition-colors ${
              activeTab === "onboarding"
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Join Us
          </button>
          <button
            onClick={() => setActiveTab("dashboard")}
            className={`px-6 py-2 font-semibold rounded-lg transition-colors ${
              activeTab === "dashboard"
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Dashboard Features
          </button>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {activeTab === "onboarding" ? (
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-8">Onboarding Form</h2>

              <form onSubmit={handleSubmit} className="space-y-6 bg-card border border-border p-8 rounded-lg">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-foreground font-semibold mb-2">Restaurant Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="e.g., Mom's Pho"
                    />
                  </div>

                  <div>
                    <label className="block text-foreground font-semibold mb-2">Address</label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="Street address"
                    />
                  </div>

                  <div>
                    <label className="block text-foreground font-semibold mb-2">Contact Information</label>
                    <input
                      type="tel"
                      name="contact"
                      value={formData.contact}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="Phone number"
                    />
                  </div>

                  <div>
                    <label className="block text-foreground font-semibold mb-2">Opening Hours</label>
                    <input
                      type="text"
                      name="hours"
                      value={formData.hours}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="e.g., 10am-10pm"
                    />
                  </div>

                  <div>
                    <label className="block text-foreground font-semibold mb-2">Seating Style</label>
                    <select
                      name="seating"
                      value={formData.seating}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                      <option value="">Select seating style</option>
                      <option value="street-side">Street-side</option>
                      <option value="indoor">Indoor</option>
                      <option value="limited">Limited space</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-foreground font-semibold mb-2">Max Group Size</label>
                    <input
                      type="number"
                      name="maxGroupSize"
                      value={formData.maxGroupSize}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="e.g., 4"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-foreground font-semibold mb-2">Busy Hours to Avoid (Respect Mode)</label>
                  <input
                    type="text"
                    name="busyHours"
                    value={formData.busyHours}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="e.g., 12pm-1:30pm, 6pm-8pm"
                  />
                </div>

                <div className="border-t border-border pt-6">
                  <h3 className="text-xl font-bold text-foreground mb-4">Signature Dish</h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-foreground font-semibold mb-2">Dish Name</label>
                      <input
                        type="text"
                        name="dishName"
                        value={formData.dishName}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                        placeholder="e.g., Hanoi Special Pho"
                      />
                    </div>

                    <div>
                      <label className="block text-foreground font-semibold mb-2">Price</label>
                      <input
                        type="text"
                        name="dishPrice"
                        value={formData.dishPrice}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                        placeholder="e.g., $5.50"
                      />
                    </div>
                  </div>

                  <div className="mt-6">
                    <label className="block text-foreground font-semibold mb-2">Description</label>
                    <textarea
                      name="dishDescription"
                      value={formData.dishDescription}
                      onChange={handleChange}
                      required
                      rows={4}
                      className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="Tell the story of your signature dish..."
                    />
                  </div>
                </div>

                <div className="border-t border-border pt-6">
                  <h3 className="text-xl font-bold text-foreground mb-4">Menu Showcase</h3>
                  <p className="text-muted-foreground mb-4 text-sm">
                    Add other popular items from your menu to let customers know what else you serve.
                  </p>

                  <div className="space-y-6">
                    {formData.menuItems.map((item, index) => (
                      <div key={item.id} className="bg-muted/30 p-4 rounded-lg border border-border relative">
                        {formData.menuItems.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeMenuItem(item.id)}
                            className="absolute top-4 right-4 text-muted-foreground hover:text-red-500 transition-colors"
                          >
                            <Trash2 size={18} />
                          </button>
                        )}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                          <div>
                            <label className="block text-foreground font-semibold mb-2 text-sm">Item Name</label>
                            <input
                              type="text"
                              value={item.name}
                              onChange={(e) => handleMenuItemChange(item.id, "name", e.target.value)}
                              className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                              placeholder="e.g. Spring Rolls"
                            />
                          </div>
                          <div>
                            <label className="block text-foreground font-semibold mb-2 text-sm">Price</label>
                            <input
                              type="text"
                              value={item.price}
                              onChange={(e) => handleMenuItemChange(item.id, "price", e.target.value)}
                              className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                              placeholder="e.g. $3.00"
                            />
                          </div>
                        </div>
                        <div className="mb-4">
                          <label className="block text-foreground font-semibold mb-2 text-sm">Description</label>
                          <textarea
                            value={item.description}
                            onChange={(e) => handleMenuItemChange(item.id, "description", e.target.value)}
                            rows={2}
                            className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                            placeholder="Brief description of ingredients or taste..."
                          />
                        </div>
                        <div>
                          <label className="block text-foreground font-semibold mb-2 text-sm">Item Photo</label>
                          <div className="border-2 border-dashed border-border rounded-lg p-4 flex items-center justify-center cursor-pointer hover:bg-muted/50 transition-colors">
                            <div className="text-center">
                              <Camera className="mx-auto text-muted-foreground mb-1" size={20} />
                              <span className="text-xs text-muted-foreground">Click to upload photo</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={addMenuItem}
                    className="mt-4 flex items-center gap-2 text-primary font-semibold hover:text-primary/80 transition-colors text-sm"
                  >
                    <Plus size={18} />
                    Add Another Menu Item
                  </button>
                </div>

                <button
                  type="submit"
                  className="w-full bg-primary text-primary-foreground font-semibold py-3 rounded-lg hover:opacity-90 transition-opacity mt-6"
                >
                  Submit Restaurant
                </button>
              </form>

              <div className="mt-8 p-6 bg-accent/20 border border-accent rounded-lg">
                <p className="text-foreground font-semibold mb-2">What happens next?</p>
                <p className="text-muted-foreground">
                  Thank you! We will contact you to confirm a few small details. No preparation needed. Our team will
                  help you set up your dashboard and get featured on These Streets.
                </p>
              </div>
            </div>
          ) : (
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-12">Restaurant Dashboard Tools</h2>

              <div className="space-y-8">
                {/* Signature Dish */}
                <div className="bg-card border border-border rounded-lg p-8">
                  <h3 className="text-2xl font-bold text-foreground mb-4">Signature Dish Highlight</h3>
                  <p className="text-muted-foreground mb-6">
                    We feature only ONE signature dish per restaurant to protect authenticity and prevent overcrowding.
                    This focused approach maintains the integrity of your hidden gem status.
                  </p>
                  <div className="bg-muted p-4 rounded-lg">
                    <p className="text-foreground font-semibold">Your Featured Dish:</p>
                    <p className="text-muted-foreground">Hanoi Special Pho - $5.50</p>
                  </div>
                </div>

                {/* Traffic Insights */}
                <div className="bg-card border border-border rounded-lg p-8">
                  <div className="flex items-center gap-3 mb-4">
                    <Clock className="text-primary" size={28} />
                    <h3 className="text-2xl font-bold text-foreground">Traffic Insights</h3>
                  </div>
                  <p className="text-muted-foreground mb-6">
                    Monitor restaurant performance and customer interest in real-time.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-muted p-4 rounded-lg">
                      <p className="text-sm text-muted-foreground mb-1">Peak Hour Prediction</p>
                      <p className="text-2xl font-bold text-primary">12-1 PM</p>
                    </div>
                    <div className="bg-muted p-4 rounded-lg">
                      <p className="text-sm text-muted-foreground mb-1">Dish Popularity</p>
                      <p className="text-2xl font-bold text-secondary">↑ 23%</p>
                    </div>
                    <div className="bg-muted p-4 rounded-lg">
                      <p className="text-sm text-muted-foreground mb-1">Tourist Demand</p>
                      <p className="text-2xl font-bold text-accent">High</p>
                    </div>
                  </div>
                </div>

                {/* Respect Mode */}
                <div className="bg-card border border-border rounded-lg p-8">
                  <h3 className="text-2xl font-bold text-foreground mb-4">Respect Mode Controls</h3>
                  <p className="text-muted-foreground mb-6">
                    Take control during busy times. Temporarily pause recommendations to manage crowd flow and maintain
                    your restaurant's character.
                  </p>
                  <div className="space-y-3">
                    <label className="flex items-center gap-3 p-3 border border-border rounded-lg cursor-pointer hover:bg-muted">
                      <input type="checkbox" className="w-4 h-4" />
                      <span className="text-foreground">Mute discovery (currently open)</span>
                    </label>
                    <label className="flex items-center gap-3 p-3 border border-border rounded-lg cursor-pointer hover:bg-muted">
                      <input type="checkbox" className="w-4 h-4" defaultChecked />
                      <span className="text-foreground">Limit group sizes</span>
                    </label>
                    <label className="flex items-center gap-3 p-3 border border-border rounded-lg cursor-pointer hover:bg-muted">
                      <input type="checkbox" className="w-4 h-4" defaultChecked />
                      <span className="text-foreground">Enable Respect Mode during peak hours</span>
                    </label>
                  </div>
                </div>

                {/* Tourman Collaboration */}
                <div className="bg-card border border-border rounded-lg p-8">
                  <div className="flex items-center gap-3 mb-4">
                    <Users className="text-primary" size={28} />
                    <h3 className="text-2xl font-bold text-foreground">Tourman Collaboration</h3>
                  </div>
                  <p className="text-muted-foreground mb-6">
                    Partner with verified local guides for curated tour groups. You approve partnerships to ensure
                    compatibility with your restaurant's values.
                  </p>
                  <div className="space-y-3">
                    <div className="p-4 bg-muted rounded-lg border-l-4 border-primary">
                      <p className="font-semibold text-foreground">Pending Requests</p>
                      <p className="text-muted-foreground">3 guides interested</p>
                    </div>
                    <div className="p-4 bg-muted rounded-lg border-l-4 border-secondary">
                      <p className="font-semibold text-foreground">Active Partners</p>
                      <p className="text-muted-foreground">5 verified Tourmen</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  )
}
