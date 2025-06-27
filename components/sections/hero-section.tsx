"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowDown, Coffee, Heart } from "lucide-react"
import { TypeAnimation } from "react-type-animation"

export default function HeroSection() {
  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-background via-background to-primary/5">
      {/* Grid Background */}
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-grid-black/[0.02] dark:bg-grid-white/[0.02]" />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background" />

      {/* Organic floating elements */}
      <motion.div
        animate={{
          y: [0, -15, 0],
          x: [0, 10, 0],
          rotate: [0, 3, 0],
        }}
        transition={{
          duration: 8,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
        className="absolute top-20 left-10 p-3 bg-orange-500/10 backdrop-blur-sm rounded-2xl border border-orange-500/20"
      >
        <Coffee className="w-6 h-6 text-orange-500" />
      </motion.div>

      <motion.div
        animate={{
          y: [0, 12, 0],
          x: [0, -8, 0],
          rotate: [0, -2, 0],
        }}
        transition={{
          duration: 6,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
        className="absolute bottom-32 right-16 p-3 bg-red-500/10 backdrop-blur-sm rounded-2xl border border-red-500/20"
      >
        <Heart className="w-6 h-6 text-red-500" />
      </motion.div>

      {/* Handwritten-style decorative elements */}
      <div className="absolute top-1/4 right-1/4 opacity-20">
        <svg width="100" height="100" viewBox="0 0 100 100" className="text-primary">
          <path
            d="M20,50 Q30,20 50,50 T80,50"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
          />
        </svg>
      </div>

      <div className="container mx-auto px-4 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-5xl mx-auto"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="inline-flex items-center gap-3 bg-green-500/10 border border-green-500/20 rounded-full px-6 py-3 mb-8 backdrop-blur-sm"
          >
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
            <span className="text-sm font-medium">Currently available for new projects</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="mb-8"
          >
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight">
              Hey there! Let's build{" "}
              <span className="bg-gradient-to-r from-primary via-purple-500 to-pink-500 bg-clip-text text-transparent">
                something amazing
              </span>{" "}
              together
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-4xl mx-auto"
          >
            <p className="mb-4">
              I'm <span className="text-primary font-semibold">Rounakk</span> — a developer who genuinely loves what I
              do. I spend my days (and sometimes nights 😅) crafting digital experiences using{" "}
            </p>
            <div className="font-mono text-primary">
              <TypeAnimation
                sequence={[
                  "modern web technologies that I'm passionate about",
                  3000,
                  "AI tools that solve real problems",
                  3000,
                  "clean code that makes other developers smile",
                  3000,
                  "solutions that users actually enjoy using",
                  3000,
                ]}
                wrapper="span"
                speed={50}
                repeat={Number.POSITIVE_INFINITY}
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                size="lg"
                onClick={() => scrollToSection("pricing")}
                className="bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 text-white px-10 py-7 text-lg font-semibold shadow-lg"
              >
                Let's work together (just me)
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                size="lg"
                variant="outline"
                onClick={() => scrollToSection("team")}
                className="px-10 py-7 text-lg font-semibold border-2 border-primary/50 hover:border-primary bg-background/50 backdrop-blur-sm"
              >
                Bring in my team
              </Button>
            </motion.div>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="mt-8 text-sm text-muted-foreground"
          >
            ☕ Fueled by coffee and curiosity • 🚀 Based in India, working globally
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
            className="cursor-pointer p-3 rounded-full bg-primary/10 backdrop-blur-sm border border-primary/20 hover:bg-primary/20 transition-colors"
            onClick={() => scrollToSection("about")}
          >
            <ArrowDown className="w-5 h-5 text-primary" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
