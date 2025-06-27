"use client"

import type React from "react"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef, useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Check, Star, Coffee, Zap, Rocket, ChevronLeft, ChevronRight } from "lucide-react"

const pricingPlans = [
  {
    name: "Quick Start",
    price: "₹15,000",
    duration: "5 days",
    description: "Perfect for getting your idea online quickly",
    features: [
      "Beautiful landing page",
      "Contact form that works",
      "Mobile-friendly design",
      "Basic SEO setup",
      "1 round of revisions",
      "48-hour support response",
    ],
    popular: false,
    icon: Coffee,
    realTalk: "Great for testing the waters",
    includes: "Everything you need to start",
  },
  {
    name: "Let's Build",
    price: "₹35,000",
    duration: "10 days",
    description: "For when you're ready to make it happen",
    features: [
      "Full web application",
      "User authentication",
      "Database integration",
      "Responsive design",
      "Admin panel basics",
      "2 rounds of revisions",
      "24-hour support response",
      "Basic analytics setup",
    ],
    popular: true,
    icon: Zap,
    realTalk: "Most popular choice",
    includes: "A real, working application",
  },
  {
    name: "Go Big",
    price: "₹65,000",
    duration: "14 days",
    description: "When you want the full experience",
    features: [
      "Complete full-stack app",
      "Advanced user management",
      "Custom admin dashboard",
      "API development",
      "Cloud deployment",
      "3 rounds of revisions",
      "Priority support",
      "2 weeks post-launch support",
      "Performance optimization",
    ],
    popular: false,
    icon: Rocket,
    realTalk: "The works, no compromises",
    includes: "Enterprise-ready solution",
  },
]

export default function PricingSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isMobile, setIsMobile] = useState(false)
  const [isDragging, setIsDragging] = useState(false)

  // Touch/Swipe handling
  const [touchStart, setTouchStart] = useState<number | null>(null)
  const [touchEnd, setTouchEnd] = useState<number | null>(null)

  // Minimum swipe distance (in px)
  const minSwipeDistance = 50

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)

    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  const scrollToContact = (plan: string) => {
    const contactSection = document.getElementById("contact")
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" })
    }
  }

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % pricingPlans.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + pricingPlans.length) % pricingPlans.length)
  }

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
  }

  // Touch event handlers
  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null) // Reset touchEnd
    setTouchStart(e.targetTouches[0].clientX)
    setIsDragging(true)
  }

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) {
      setIsDragging(false)
      return
    }

    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > minSwipeDistance
    const isRightSwipe = distance < -minSwipeDistance

    if (isLeftSwipe) {
      nextSlide()
    } else if (isRightSwipe) {
      prevSlide()
    }

    setIsDragging(false)
  }

  // Mouse event handlers for desktop testing
  const onMouseDown = (e: React.MouseEvent) => {
    if (!isMobile) return
    setTouchEnd(null)
    setTouchStart(e.clientX)
    setIsDragging(true)
  }

  const onMouseMove = (e: React.MouseEvent) => {
    if (!isMobile || !isDragging) return
    setTouchEnd(e.clientX)
  }

  const onMouseUp = () => {
    if (!isMobile) return
    if (!touchStart || !touchEnd) {
      setIsDragging(false)
      return
    }

    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > minSwipeDistance
    const isRightSwipe = distance < -minSwipeDistance

    if (isLeftSwipe) {
      nextSlide()
    } else if (isRightSwipe) {
      prevSlide()
    }

    setIsDragging(false)
  }

  return (
    <section id="pricing" className="py-32 relative overflow-hidden" ref={ref}>
      {/* Grid Background */}
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-grid-black/[0.02] dark:bg-grid-white/[0.02]" />
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-purple-500/5" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-8">
            Simple,{" "}
            <span className="bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
              honest pricing
            </span>
          </h2>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto">
            No hidden fees, no surprises. Just straightforward pricing for quality work. Pick what fits your needs and
            budget.
          </p>
        </motion.div>

        {/* Desktop Grid Layout */}
        <div className="hidden md:grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {pricingPlans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.1 * index }}
              className={`relative p-8 bg-background/50 backdrop-blur-sm rounded-2xl border-2 transition-all duration-300 hover:shadow-xl flex flex-col ${
                plan.popular
                  ? "border-primary shadow-lg scale-105 hover:scale-110"
                  : "border-border hover:border-primary/50"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-2 left-1/2 transform -translate-x-1/2">
                  <div className="bg-primary text-primary-foreground px-4 py-2 rounded-full text-sm font-medium flex items-center gap-1">
                    <Star className="w-4 h-4" />
                    Most Popular
                  </div>
                </div>
              )}

              <PricingCard plan={plan} scrollToContact={scrollToContact} />
            </motion.div>
          ))}
        </div>

        {/* Mobile Carousel Layout */}
        <div className="md:hidden relative max-w-sm mx-auto">
          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-background/80 backdrop-blur-sm border border-border rounded-full p-2 hover:bg-background transition-colors"
            aria-label="Previous pricing plan"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-background/80 backdrop-blur-sm border border-border rounded-full p-2 hover:bg-background transition-colors"
            aria-label="Next pricing plan"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Carousel Container with Touch Support */}
          <div
            className="overflow-hidden rounded-2xl cursor-grab active:cursor-grabbing select-none"
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
            onMouseDown={onMouseDown}
            onMouseMove={onMouseMove}
            onMouseUp={onMouseUp}
            onMouseLeave={onMouseUp}
          >
            <motion.div
              className={`flex transition-transform duration-300 ease-out ${isDragging ? "transition-none" : ""}`}
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              drag={isMobile ? "x" : false}
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.1}
              onDragEnd={(_, info) => {
                if (!isMobile) return

                const threshold = 50
                if (info.offset.x > threshold) {
                  prevSlide()
                } else if (info.offset.x < -threshold) {
                  nextSlide()
                }
              }}
            >
              {pricingPlans.map((plan, index) => (
                <motion.div
                  key={plan.name}
                  initial={{ opacity: 0, y: 50 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.8, delay: 0.1 * index }}
                  className={`relative p-6 bg-background/50 backdrop-blur-sm border-2 transition-all duration-300 flex flex-col min-w-full ${
                    plan.popular ? "border-primary shadow-lg" : "border-border"
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute -top-2 left-1/2 transform -translate-x-1/2">
                      <div className="bg-primary text-primary-foreground px-4 py-2 rounded-full text-sm font-medium flex items-center gap-1">
                        <Star className="w-4 h-4" />
                        Most Popular
                      </div>
                    </div>
                  )}

                  <PricingCard plan={plan} scrollToContact={scrollToContact} />
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center mt-6 space-x-2">
            {pricingPlans.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentSlide ? "bg-primary" : "bg-border"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          {/* Swipe Hint */}
          <div className="text-center mt-4">
            <p className="text-sm text-muted-foreground">👆 Swipe or use arrows to see all plans</p>
            <div className="flex items-center justify-center gap-2 mt-2 text-xs text-muted-foreground">
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-primary/30 rounded-full animate-pulse" />
                <span>Swipe left/right</span>
              </div>
            </div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center mt-16"
        >
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Need something different? I'm flexible! These are starting points, not rigid rules. Let's chat about what
            you actually need and find a price that works for both of us.
          </p>
        </motion.div>
      </div>
    </section>
  )
}

// Extracted PricingCard component to avoid duplication
function PricingCard({
  plan,
  scrollToContact,
}: { plan: (typeof pricingPlans)[0]; scrollToContact: (plan: string) => void }) {
  return (
    <>
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <plan.icon className="w-8 h-8 text-primary" />
        </div>
        <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
        <div className="mb-4">
          <span className="text-4xl font-bold text-primary">{plan.price}</span>
          <span className="text-muted-foreground ml-2">/ {plan.duration}</span>
        </div>
        <p className="text-muted-foreground mb-2">{plan.description}</p>
        <div className="text-sm text-primary font-medium italic">"{plan.realTalk}"</div>
      </div>

      <div className="space-y-4 mb-8 flex-grow">
        <div className="text-sm font-semibold text-primary border-b border-primary/20 pb-2">{plan.includes}:</div>
        {plan.features.map((feature, idx) => (
          <div key={idx} className="flex items-center">
            <Check className="w-5 h-5 text-primary mr-3 flex-shrink-0" />
            <span className="text-sm">{feature}</span>
          </div>
        ))}
      </div>

      <div className="mt-auto">
        <Button
          onClick={() => scrollToContact(plan.name)}
          className={`w-full py-6 text-lg font-semibold ${
            plan.popular
              ? "bg-primary hover:bg-primary/90"
              : "bg-background border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground"
          }`}
          variant={plan.popular ? "default" : "outline"}
        >
          Let's do this!
        </Button>
      </div>
    </>
  )
}
