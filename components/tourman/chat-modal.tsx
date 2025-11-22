"use client"

import { useState, useEffect } from "react"
import { X, Send, Paperclip, ImageIcon } from "lucide-react"

interface ChatModalProps {
  tourman: {
    name: string
    image: string
  }
  onClose: () => void
}

export function ChatModal({ tourman, onClose }: ChatModalProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState([
    { sender: "tourman", text: `Hi! I'm ${tourman.name}. How can I help you explore Hanoi's food scene today?` },
  ])

  useEffect(() => {
    // Trigger animation after mount
    setIsVisible(true)
  }, [])

  const handleClose = () => {
    setIsVisible(false)
    setTimeout(onClose, 300) // Wait for animation
  }

  const handleSend = () => {
    if (!message.trim()) return
    setMessages([...messages, { sender: "user", text: message }])
    setMessage("")

    // Simulate response
    setTimeout(() => {
      setMessages((prev) => [...prev, { sender: "tourman", text: "That sounds great! Let me check my schedule." }])
    }, 1000)
  }

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center transition-all duration-500 ${
        isVisible ? "bg-black/60 backdrop-blur-sm" : "bg-black/0 backdrop-blur-none pointer-events-none"
      }`}
      onClick={handleClose}
    >
      <div
        className={`w-full max-w-md bg-card rounded-2xl shadow-2xl overflow-hidden flex flex-col transition-all duration-500 transform ${
          isVisible ? "translate-y-0 opacity-100 scale-100" : "-translate-y-full opacity-0 scale-95"
        }`}
        style={{ height: "600px", maxHeight: "90vh" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-primary p-4 flex items-center justify-between shadow-md z-10">
          <div className="flex items-center gap-3">
            <div className="relative">
              <img
                src={tourman.image || "/placeholder.svg"}
                alt={tourman.name}
                className="w-10 h-10 rounded-full border-2 border-white object-cover"
              />
              <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 border-2 border-primary rounded-full"></span>
            </div>
            <div>
              <h3 className="font-bold text-primary-foreground">{tourman.name}</h3>
              <p className="text-xs text-primary-foreground/80 flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-green-400 rounded-full inline-block"></span>
                Online now
              </p>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="p-2 text-primary-foreground/80 hover:text-white hover:bg-white/10 rounded-full transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-muted/30">
          {messages.map((msg, idx) => (
            <div key={idx} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
              {msg.sender === "tourman" && (
                <img
                  src={tourman.image || "/placeholder.svg"}
                  alt={tourman.name}
                  className="w-8 h-8 rounded-full mr-2 self-end border border-border object-cover"
                />
              )}
              <div
                className={`max-w-[75%] p-3 rounded-2xl px-4 text-sm shadow-sm ${
                  msg.sender === "user"
                    ? "bg-primary text-primary-foreground rounded-br-none"
                    : "bg-card text-foreground border border-border rounded-bl-none"
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
        </div>

        {/* Input Area */}
        <div className="p-3 bg-card border-t border-border">
          <div className="flex items-center gap-2 bg-muted/50 rounded-full p-2 px-4 border border-border focus-within:border-primary/50 focus-within:ring-1 focus-within:ring-primary/20 transition-all">
            <button className="p-1.5 text-muted-foreground hover:text-primary transition-colors rounded-full hover:bg-background">
              <Paperclip size={18} />
            </button>
            <button className="p-1.5 text-muted-foreground hover:text-primary transition-colors rounded-full hover:bg-background">
              <ImageIcon size={18} />
            </button>
            <input
              type="text"
              placeholder="Type a message..."
              className="flex-1 bg-transparent border-none focus:outline-none text-sm mx-2"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
            />
            <button
              onClick={handleSend}
              disabled={!message.trim()}
              className="p-2 bg-primary text-primary-foreground rounded-full hover:bg-primary/90 disabled:opacity-50 disabled:hover:bg-primary transition-all shadow-sm"
            >
              <Send size={16} className="ml-0.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
