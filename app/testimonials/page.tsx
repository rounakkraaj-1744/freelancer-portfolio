"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { Star, ArrowLeft, Send } from "lucide-react"
import Link from "next/link"

export default function TestimonialPage() {
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [rating, setRating] = useState(0)
  const [hoverRating, setHoverRating] = useState(0)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    role: "",
    projectType: "",
    testimonial: "",
    rating: 0,
    allowPublic: true,
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const response = await fetch("/api/testimonials", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...formData, rating }),
      })

      if (response.ok) {
        toast({
          title: "Thank you for your testimonial! 🎉",
          description: "Your feedback has been submitted and will appear on the website soon.",
        })
        // Reset form
        setFormData({
          name: "",
          email: "",
          company: "",
          role: "",
          projectType: "",
          testimonial: "",
          rating: 0,
          allowPublic: true,
        })
        setRating(0)
      } else {
        throw new Error("Failed to submit testimonial")
      }
    } catch (error) {
      toast({
        title: "Error submitting testimonial",
        description: "Please try again or contact me directly.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      {/* Grid Background */}
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-grid-black/[0.02] dark:bg-grid-white/[0.02]" />

      <div className="container mx-auto px-4 py-16 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-2xl mx-auto"
        >
          {/* Header */}
          <div className="text-center mb-12">
            <Link href="/">
              <Button variant="ghost" className="mb-6 text-muted-foreground hover:text-foreground">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Button>
            </Link>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Share Your{" "}
              <span className="bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                Experience
              </span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Your feedback helps others discover quality work and helps me improve my services. Thank you for taking
              the time to share your experience!
            </p>
          </div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-background/50 backdrop-blur-sm rounded-3xl border border-border p-8 shadow-2xl"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Personal Info */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold mb-3 font-mono text-primary">Name *</label>
                  <Input
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    required
                    className="h-12 bg-background/50 border-border focus:border-primary"
                    placeholder="Your full name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-3 font-mono text-primary">Email *</label>
                  <Input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    required
                    className="h-12 bg-background/50 border-border focus:border-primary"
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold mb-3 font-mono text-primary">Company</label>
                  <Input
                    type="text"
                    value={formData.company}
                    onChange={(e) => handleInputChange("company", e.target.value)}
                    className="h-12 bg-background/50 border-border focus:border-primary"
                    placeholder="Your company name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-3 font-mono text-primary">Your Role</label>
                  <Input
                    type="text"
                    value={formData.role}
                    onChange={(e) => handleInputChange("role", e.target.value)}
                    className="h-12 bg-background/50 border-border focus:border-primary"
                    placeholder="CEO, Developer, etc."
                  />
                </div>
              </div>

              {/* Project Type */}
              <div>
                <label className="block text-sm font-semibold mb-3 font-mono text-primary">Project Type</label>
                <Select value={formData.projectType} onValueChange={(value) => handleInputChange("projectType", value)}>
                  <SelectTrigger className="h-12 bg-background/50 border-border focus:border-primary">
                    <SelectValue placeholder="What did we work on together?" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="landing-page">Landing Page</SelectItem>
                    <SelectItem value="web-app">Web Application</SelectItem>
                    <SelectItem value="admin-panel">Admin Panel</SelectItem>
                    <SelectItem value="ai-tool">AI Tool</SelectItem>
                    <SelectItem value="api">API Development</SelectItem>
                    <SelectItem value="full-stack">Full-Stack Project</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Rating */}
              <div>
                <label className="block text-sm font-semibold mb-3 font-mono text-primary">Rating *</label>
                <div className="flex items-center gap-2 mb-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      className="transition-colors duration-200"
                    >
                      <Star
                        className={`w-8 h-8 ${
                          star <= (hoverRating || rating) ? "text-yellow-400 fill-current" : "text-muted-foreground"
                        }`}
                      />
                    </button>
                  ))}
                </div>
                <p className="text-sm text-muted-foreground">
                  {rating === 0 && "Please rate your experience"}
                  {rating === 1 && "Poor - Not satisfied"}
                  {rating === 2 && "Fair - Below expectations"}
                  {rating === 3 && "Good - Met expectations"}
                  {rating === 4 && "Very Good - Exceeded expectations"}
                  {rating === 5 && "Excellent - Outstanding work!"}
                </p>
              </div>

              {/* Testimonial */}
              <div>
                <label className="block text-sm font-semibold mb-3 font-mono text-primary">Your Testimonial *</label>
                <Textarea
                  value={formData.testimonial}
                  onChange={(e) => handleInputChange("testimonial", e.target.value)}
                  required
                  rows={6}
                  className="bg-background/50 border-border focus:border-primary resize-none"
                  placeholder="Share your experience working with me. What did you like? How did the project turn out? Would you recommend my services to others?"
                />
              </div>

              {/* Privacy */}
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="allowPublic"
                  checked={formData.allowPublic}
                  onChange={(e) => handleInputChange("allowPublic", e.target.checked)}
                  className="rounded border-border"
                />
                <label htmlFor="allowPublic" className="text-sm text-muted-foreground">
                  I allow this testimonial to be displayed publicly on the website
                </label>
              </div>

              {/* Submit */}
              <Button
                type="submit"
                disabled={isLoading || rating === 0}
                className="w-full bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 text-white py-6 text-lg font-semibold shadow-2xl shadow-primary/25"
              >
                {isLoading ? (
                  <div className="flex items-center gap-3">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Submitting...
                  </div>
                ) : (
                  <div className="flex items-center gap-3">
                    <Send className="w-5 h-5" />
                    Submit Testimonial
                  </div>
                )}
              </Button>
            </form>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}