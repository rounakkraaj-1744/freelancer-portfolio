"use client"
import type React from "react"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Bot, X, Send } from "lucide-react"

interface Message {
  id: string
  text: string
  isUser: boolean
  timestamp: Date
}

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hi! I'm Rounakk's AI assistant. I can help you with questions about services, pricing, or project requirements. How can I help you today?",
      isUser: false,
      timestamp: new Date(),
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const sendMessage = async () => {
    if (!inputValue.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      isUser: true,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue("")
    setIsLoading(true)

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: inputValue }),
      })

      const data = await response.json()

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text:
          data.message || "I'm sorry, I couldn't process that request. Please try again or contact Rounakk directly.",
        isUser: false,
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, botMessage])
    }
    catch (error) {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "I'm experiencing some technical difficulties. Please contact Rounakk directly for immediate assistance.",
        isUser: false,
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, errorMessage])
    }
    finally {
      setIsLoading(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  return (
    <>
      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 1, type: "spring", stiffness: 200 }} className="fixed bottom-6 right-6 z-50">
        <Button onClick={() => setIsOpen(true)} className="w-16 h-16 rounded-full bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 shadow-lg hover:shadow-xl transition-all duration-300" size="icon">
          <img src="/chatbot.png" alt="" width={34} height={32}/>
        </Button>
      </motion.div>

      <AnimatePresence>
        {isOpen && (
          <motion.div initial={{ opacity: 0, scale: 0.8, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="fixed bottom-24 right-6 w-96 h-[500px] bg-background border border-border rounded-2xl shadow-2xl z-50 flex flex-col" >
            <div className="flex items-center justify-between p-6 border-b border-border">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-r from-primary to-purple-600 rounded-full flex items-center justify-center">
                  <Bot className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold">Rounakk's Assistant</h3>
                  <p className="text-xs text-muted-foreground">Online • Ready to help</p>
                </div>
              </div>
              <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} className="h-8 w-8">
                <X className="w-4 h-4" />
              </Button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {
                messages.map((message) => (
                    <div key={message.id} className={`flex ${message.isUser ? "justify-end" : "justify-start"}`}>
                    <div className={`max-w-[80%] p-3 rounded-2xl text-sm ${
                        message.isUser ? "bg-primary text-primary-foreground" : "bg-muted text-foreground"
                        }`} >
                        {message.text}
                    </div>
                    </div>
                ))
              }
              {
                isLoading && (
                    <div className="flex justify-start">
                    <div className="bg-muted p-3 rounded-2xl">
                        <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" />
                        <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}/>
                        <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}/>
                        </div>
                    </div>
                    </div>
                )
              }
            </div>

            <div className="p-4 border-t border-border">
              <div className="flex gap-2">
                <Input value={inputValue} onChange={(e) => setInputValue(e.target.value)} onKeyPress={handleKeyPress}
                  placeholder="Ask me anything..." className="flex-1" disabled={isLoading}/>
                <Button onClick={sendMessage} disabled={!inputValue.trim() || isLoading}
                  size="icon" className="bg-primary hover:bg-primary/90" >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}