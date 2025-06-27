"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import { Button } from "@/components/ui/button"
import { Heart, Star } from "lucide-react"
import Link from "next/link"

export default function FinalCTASection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section className="py-20 bg-gradient-to-br from-primary/10 via-purple-500/10 to-pink-500/10" ref={ref}>
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center max-w-4xl mx-auto"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            <span className="text-primary">Loved our service?</span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground mb-12">
            Your feedback means the world to us! Share your experience and help others discover the quality work we
            deliver. Every testimonial helps us grow and improve our services.
          </p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
          >
            <Link href="/testimonial">
              <Button
                size="lg"
                className="bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 text-white px-8 py-6 text-lg flex items-center gap-2"
              >
                <Heart className="w-5 h-5" />
                Share Your Experience
              </Button>
            </Link>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Star className="w-4 h-4 text-yellow-500 fill-current" />
              <span>Help others find quality work</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}