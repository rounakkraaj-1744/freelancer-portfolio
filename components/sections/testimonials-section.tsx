"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import { Button } from "@/components/ui/button"
import { Star, ChevronLeft, ChevronRight } from "lucide-react"

interface Testimonial {
  _id: string
  name: string
  company: string
  role: string
  testimonial: string
  rating: number
  projectType: string
  createdAt: string
}

export default function TestimonialsSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await fetch("/api/testimonials?approved=true")
        const data = await response.json()
        setTestimonials(data.testimonials || [])
      }
      catch (error) {
        console.error("Failed to fetch testimonials:", error)
        setTestimonials([
          {
            _id: "1",
            name: "Sarah Johnson",
            role: "CEO",
            company: "TechStart Inc.",
            testimonial:
              "Rounakk delivered an exceptional full-stack application that exceeded our expectations. His attention to detail and technical expertise is outstanding. The project was completed ahead of schedule with remarkable quality.",
            rating: 5,
            projectType: "web-app",
            createdAt: new Date().toISOString(),
          },
        ])
      }
      finally {
        setLoading(false)
      }
    }

    fetchTestimonials()
  }, [])

  useEffect(() => {
    if (!isAutoPlaying || testimonials.length === 0) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    }, 4000)

    return () => clearInterval(interval)
  }, [isAutoPlaying, testimonials.length])

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    setIsAutoPlaying(false)
    setTimeout(() => setIsAutoPlaying(true), 10000)
  }

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
    setIsAutoPlaying(false)
    setTimeout(() => setIsAutoPlaying(true), 10000)
  }

  const goToTestimonial = (index: number) => {
    setCurrentIndex(index)
    setIsAutoPlaying(false)
    setTimeout(() => setIsAutoPlaying(true), 10000)
  }

  if (loading) {
    return (
      <section className="py-32 relative overflow-hidden" ref={ref}>
        <div className="container mx-auto px-4 text-center">
          <div className="animate-pulse">
            <div className="h-8 bg-muted rounded w-64 mx-auto mb-4" />
            <div className="h-4 bg-muted rounded w-96 mx-auto" />
          </div>
        </div>
      </section>
    )
  }

  if (testimonials.length === 0) {
    return (
      <section className="py-32 relative overflow-hidden" ref={ref}>
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-6xl font-bold mb-8">
            What Clients{" "}
            <span className="bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">Say</span>
          </h2>
          <p className="text-xl text-muted-foreground">
            Be the first to share your experience! Your testimonial will appear here.
          </p>
        </div>
      </section>
    )
  }

  return (
    <section className="py-32 relative overflow-hidden" ref={ref}>
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-grid-black/[0.02] dark:bg-grid-white/[0.02]" />
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-purple-500/5" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div initial={{ opacity: 0, y: 50 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }} className="text-center mb-20">
          <h2 className="text-4xl md:text-6xl font-bold mb-8">
            What Clients{" "}
            <span className="bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">Say</span>
          </h2>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto">
            Real feedback from real clients. Here's what people have to say about working with me.
          </p>
        </motion.div>

        <div className="relative max-w-6xl mx-auto">
          {testimonials.length > 1 && (
            <>
              <Button variant="outline" size="icon" onClick={prevTestimonial}
                className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-background/80 backdrop-blur-sm border-primary/20 hover:border-primary/50 hover:bg-primary/10"
              >
                <ChevronLeft className="w-6 h-6" />
              </Button>

              <Button variant="outline" size="icon" onClick={nextTestimonial}
                className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-background/80 backdrop-blur-sm border-primary/20 hover:border-primary/50 hover:bg-primary/10"
              >
                <ChevronRight className="w-6 h-6" />
              </Button>
            </>
          )}

          <div className="relative h-[400px] mx-16">
            <AnimatePresence mode="wait">
              <motion.div key={currentIndex}
                initial={{ opacity: 0, x: 300, rotateY: 90 }}
                animate={{ opacity: 1, x: 0, rotateY: 0 }}
                exit={{ opacity: 0, x: -300, rotateY: -90 }}
                transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
                className="absolute inset-0" >
                <div className="h-full p-10 bg-background/50 backdrop-blur-sm rounded-3xl border border-border hover:border-primary/50 transition-all duration-500 shadow-2xl hover:shadow-primary/10">
                  <div className="flex flex-col h-full">
                    <div className="flex items-center mb-6">
                      {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.1 * i, duration: 0.3 }}
                        >
                          <Star className="w-6 h-6 text-yellow-400 fill-current" />
                        </motion.div>
                      ))}
                    </div>

                    <blockquote className="text-lg md:text-xl text-muted-foreground mb-8 italic leading-relaxed flex-1">
                      "{testimonials[currentIndex].testimonial}"
                    </blockquote>

                    <div className="flex items-center">
                      <div className="w-16 h-16 bg-gradient-to-r from-primary/20 to-purple-500/20 rounded-full flex items-center justify-center mr-6 border-2 border-primary/20">
                        <span className="text-2xl font-bold text-primary">
                          {testimonials[currentIndex].name.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <h4 className="text-xl font-bold">{testimonials[currentIndex].name}</h4>
                        <p className="text-primary font-semibold">{testimonials[currentIndex].role}</p>
                        {testimonials[currentIndex].company && (
                          <p className="text-sm text-muted-foreground">{testimonials[currentIndex].company}</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {testimonials.length > 1 && (
            <div className="flex justify-center mt-8 space-x-3">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? "bg-primary scale-125"
                      : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
                  }`}
                />
              ))}
            </div>
          )}

          {testimonials.length > 1 && (
            <div className="flex justify-center mt-4">
              <div className="text-xs text-muted-foreground font-mono">
                {isAutoPlaying ? "Auto-playing" : "Manual control"} • {currentIndex + 1} of {testimonials.length}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}