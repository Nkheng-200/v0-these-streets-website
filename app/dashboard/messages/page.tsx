"use client"

import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { useState } from "react"
import { Search, Send, Phone, Video, Info, Smile, ImageIcon, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function MessagesPage() {
  const [selectedChat, setSelectedChat] = useState("1")
  const [message, setMessage] = useState("")
  const [showMobileChat, setShowMobileChat] = useState(false)

  const conversations = [
    {
      id: "1",
      tourist: "Sarah Johnson",
      avatar: "https://i.pravatar.cc/150?img=1",
      lastMessage: "Looking forward to the street food tour tomorrow!",
      time: "2m ago",
      unread: 2,
      status: "confirmed",
      online: true,
    },
    {
      id: "2",
      tourist: "Mike Chen",
      avatar: "https://i.pravatar.cc/150?img=12",
      lastMessage: "Can we start at 2 PM instead?",
      time: "1h ago",
      unread: 1,
      status: "pending",
      online: true,
    },
    {
      id: "3",
      tourist: "Emma Wilson",
      avatar: "https://i.pravatar.cc/150?img=5",
      lastMessage: "Thank you so much for the amazing tour!",
      time: "3h ago",
      unread: 0,
      status: "completed",
      online: false,
    },
    {
      id: "4",
      tourist: "David Lee",
      avatar: "https://i.pravatar.cc/150?img=15",
      lastMessage: "Are vegetarian options available?",
      time: "Yesterday",
      unread: 0,
      status: "inquiry",
      online: false,
    },
    {
      id: "5",
      tourist: "Lisa Martinez",
      avatar: "https://i.pravatar.cc/150?img=9",
      lastMessage: "What time should we meet?",
      time: "Yesterday",
      unread: 0,
      status: "confirmed",
      online: true,
    },
  ]

  const messages = {
    "1": [
      { id: 1, sender: "tourist", text: "Hi! I'm interested in booking a street food tour.", time: "10:30 AM" },
      {
        id: 2,
        sender: "guide",
        text: "Hello Sarah! I'd be happy to show you around. When would you like to go?",
        time: "10:32 AM",
      },
      { id: 3, sender: "tourist", text: "Tomorrow around 5 PM would be perfect!", time: "10:35 AM" },
      {
        id: 4,
        sender: "guide",
        text: "Perfect! I'll take you to the best phở and bánh mì spots in the Old Quarter.",
        time: "10:37 AM",
      },
      { id: 5, sender: "tourist", text: "Looking forward to the street food tour tomorrow!", time: "Just now" },
    ],
    "2": [
      { id: 1, sender: "tourist", text: "Hello! I saw your profile and want to book a tour.", time: "9:00 AM" },
      {
        id: 2,
        sender: "guide",
        text: "Hi Mike! Great to hear from you. What kind of food are you interested in?",
        time: "9:05 AM",
      },
      { id: 3, sender: "tourist", text: "Can we start at 2 PM instead?", time: "11:30 AM" },
    ],
    "3": [
      {
        id: 1,
        sender: "tourist",
        text: "The tour was absolutely incredible! Best food I've had in Hanoi.",
        time: "2:00 PM",
      },
      {
        id: 2,
        sender: "guide",
        text: "I'm so glad you enjoyed it! It was wonderful showing you around.",
        time: "2:15 PM",
      },
      { id: 3, sender: "tourist", text: "Thank you so much for the amazing tour!", time: "3:00 PM" },
    ],
  }

  const currentChat = conversations.find((c) => c.id === selectedChat)
  const currentMessages = messages[selectedChat as keyof typeof messages] || []

  const handleSendMessage = () => {
    if (message.trim()) {
      // Handle sending message
      setMessage("")
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navigation />

      <main className="flex-1">
        <div className="h-[calc(100vh-4rem)] flex">
          {/* Conversations List - Left Sidebar */}
          <div
            className={`${showMobileChat ? "hidden md:flex" : "flex"} w-full md:w-96 flex-col border-r border-border bg-card`}
          >
            {/* Header */}
            <div className="p-4 border-b border-border">
              <div className="flex items-center justify-between mb-4">
                <h1 className="text-2xl font-bold text-foreground">Messages</h1>
                <Link href="/dashboard" className="text-sm text-primary hover:text-primary/80 font-medium">
                  Back to Dashboard
                </Link>
              </div>
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search conversations..."
                  className="w-full pl-10 pr-4 py-2 bg-muted rounded-full border-none focus:ring-2 focus:ring-primary/20 text-sm"
                />
              </div>
            </div>

            {/* Conversation List */}
            <div className="flex-1 overflow-y-auto">
              {conversations.map((conv) => (
                <button
                  key={conv.id}
                  onClick={() => {
                    setSelectedChat(conv.id)
                    setShowMobileChat(true)
                  }}
                  className={`w-full flex items-center gap-3 p-4 hover:bg-muted/50 transition-colors border-b border-border ${
                    selectedChat === conv.id ? "bg-[#FFF8F0]" : ""
                  }`}
                >
                  <div className="relative flex-shrink-0">
                    <img
                      src={conv.avatar || "/placeholder.svg"}
                      alt={conv.tourist}
                      className="w-14 h-14 rounded-full object-cover"
                    />
                    {conv.online && (
                      <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 border-2 border-white rounded-full" />
                    )}
                    {conv.unread > 0 && (
                      <div className="absolute -top-1 -right-1 w-6 h-6 bg-[#D2691E] text-white text-xs font-bold rounded-full flex items-center justify-center">
                        {conv.unread}
                      </div>
                    )}
                  </div>

                  <div className="flex-1 min-w-0 text-left">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-semibold text-foreground truncate">{conv.tourist}</h3>
                      <span className="text-xs text-muted-foreground flex-shrink-0 ml-2">{conv.time}</span>
                    </div>
                    <p
                      className={`text-sm truncate ${conv.unread > 0 ? "font-medium text-foreground" : "text-muted-foreground"}`}
                    >
                      {conv.lastMessage}
                    </p>
                    <span
                      className={`inline-block mt-1 px-2 py-0.5 text-xs rounded-full ${
                        conv.status === "confirmed"
                          ? "bg-green-100 text-green-700"
                          : conv.status === "pending"
                            ? "bg-orange-100 text-orange-700"
                            : conv.status === "completed"
                              ? "bg-blue-100 text-blue-700"
                              : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {conv.status.charAt(0).toUpperCase() + conv.status.slice(1)}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Chat Window - Right Side */}
          <div className={`${showMobileChat ? "flex" : "hidden md:flex"} flex-1 flex-col bg-background`}>
            {currentChat ? (
              <>
                {/* Chat Header */}
                <div className="p-4 border-b border-border bg-card flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <button onClick={() => setShowMobileChat(false)} className="md:hidden mr-2">
                      <ArrowLeft className="w-5 h-5" />
                    </button>
                    <div className="relative">
                      <img
                        src={currentChat.avatar || "/placeholder.svg"}
                        alt={currentChat.tourist}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      {currentChat.online && (
                        <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full" />
                      )}
                    </div>
                    <div>
                      <h2 className="font-semibold text-foreground">{currentChat.tourist}</h2>
                      <p className="text-xs text-muted-foreground">{currentChat.online ? "Active now" : "Offline"}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button className="p-2 hover:bg-muted rounded-full transition-colors">
                      <Phone className="w-5 h-5 text-[#D2691E]" />
                    </button>
                    <button className="p-2 hover:bg-muted rounded-full transition-colors">
                      <Video className="w-5 h-5 text-[#D2691E]" />
                    </button>
                    <button className="p-2 hover:bg-muted rounded-full transition-colors">
                      <Info className="w-5 h-5 text-[#D2691E]" />
                    </button>
                  </div>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#FFF8F0]">
                  {currentMessages.map((msg) => (
                    <div key={msg.id} className={`flex ${msg.sender === "guide" ? "justify-end" : "justify-start"}`}>
                      <div className={`flex items-end gap-2 max-w-[70%]`}>
                        {msg.sender === "tourist" && (
                          <img
                            src={currentChat.avatar || "/placeholder.svg"}
                            alt={currentChat.tourist}
                            className="w-8 h-8 rounded-full object-cover flex-shrink-0"
                          />
                        )}
                        <div>
                          <div
                            className={`rounded-2xl px-4 py-2 ${
                              msg.sender === "guide"
                                ? "bg-gradient-to-r from-[#D2691E] to-[#CD853F] text-white"
                                : "bg-white border border-border text-foreground"
                            }`}
                          >
                            <p className="text-sm">{msg.text}</p>
                          </div>
                          <p className="text-xs text-muted-foreground mt-1 px-2">{msg.time}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Message Input */}
                <div className="p-4 border-t border-border bg-card">
                  <div className="flex items-center gap-2">
                    <button className="p-2 hover:bg-muted rounded-full transition-colors">
                      <ImageIcon className="w-5 h-5 text-[#D2691E]" />
                    </button>
                    <button className="p-2 hover:bg-muted rounded-full transition-colors">
                      <Smile className="w-5 h-5 text-[#D2691E]" />
                    </button>
                    <input
                      type="text"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                      placeholder="Type a message..."
                      className="flex-1 px-4 py-2 bg-muted rounded-full border-none focus:ring-2 focus:ring-[#D2691E]/20 text-sm"
                    />
                    <button
                      onClick={handleSendMessage}
                      className="p-2 bg-gradient-to-r from-[#D2691E] to-[#CD853F] text-white rounded-full hover:opacity-90 transition-opacity"
                    >
                      <Send className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center text-muted-foreground">
                <div className="text-center">
                  <p className="text-lg mb-2">Select a conversation</p>
                  <p className="text-sm">Choose from your existing conversations or start a new one</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
