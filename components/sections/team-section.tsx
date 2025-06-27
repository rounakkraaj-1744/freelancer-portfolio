"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import { Button } from "@/components/ui/button"
import { Users, Clock, Award, Target, Handshake, Building } from "lucide-react"

export default function TeamSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })
  }

  const teamFeatures = [
    {
      icon: Users,
      title: "The Dream Team",
      description:
        "I work with a carefully selected group of developers, designers, and project managers. We've been working together for years, so no awkward getting-to-know-you phase.",
    },
    {
      icon: Building,
      title: "Your Tech Department",
      description:
        "Think of us as your outsourced tech team. We handle everything from architecture decisions to hiring additional developers when needed. You focus on business, we handle the tech.",
    },
    {
      icon: Handshake,
      title: "Partnership, Not Just Service",
      description:
        "Our annual contracts aren't just about building software. We become invested in your success, providing strategic tech guidance and scaling solutions as you grow.",
    },
    {
      icon: Clock,
      title: "Always Available",
      description:
        "With our team model, someone is always available. Different time zones, different expertise areas. Your project never sleeps, and neither do we (well, we take turns 😄).",
    },
    {
      icon: Award,
      title: "Proven Track Record",
      description:
        "We've helped startups go from idea to IPO, and established companies modernize their entire tech stack. Our portfolio speaks for itself.",
    },
    {
      icon: Target,
      title: "Results-Driven",
      description:
        "We don't just deliver code; we deliver business outcomes. Every technical decision is made with your business goals in mind.",
    },
  ]

  return (
    <section id="team" className="py-32 relative overflow-hidden" ref={ref}>
      {/* Grid Background */}
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-grid-black/[0.02] dark:bg-grid-white/[0.02]" />
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-primary/5" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-8">
            Need a{" "}
            <span className="bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
              full team?
            </span>
          </h2>
          <div className="max-w-5xl mx-auto space-y-6">
            <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed">
              Sometimes one person isn't enough (even if that person is pretty awesome 😉). For bigger projects, I bring
              in my trusted team of experts who I've worked with for years.
            </p>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
              Here's the thing about our <span className="text-primary font-semibold">annual partnership model</span>:
              We don't just build your software and disappear. We become your dedicated tech team for a full year. We
              handle everything — development, infrastructure, scaling, hiring additional developers when needed,
              maintenance, updates, the works.
            </p>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
              Your company gets to focus entirely on what you do best: marketing, sales, and growing the business. We
              take care of all the technical stuff. It's like having an entire tech department without the overhead of
              hiring, managing, and retaining a full team.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              We've helped companies go from startup to scale-up, and established businesses modernize their entire tech
              stack. The best part? You get experienced professionals who already work well together, not a random
              collection of freelancers figuring things out as they go.
            </p>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {teamFeatures.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.1 * index }}
              whileHover={{ y: -5 }}
              className="group p-8 bg-background/50 backdrop-blur-sm rounded-2xl border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-xl"
            >
              <div className="w-16 h-16 bg-gradient-to-r from-primary/10 to-purple-500/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <item.icon className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-4">{item.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{item.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center bg-gradient-to-r from-primary/10 via-purple-500/10 to-primary/10 rounded-3xl p-12 border border-primary/20"
        >
          <h3 className="text-2xl md:text-3xl font-bold mb-6">Sounds interesting?</h3>
          <p className="text-lg text-muted-foreground mb-8 max-w-3xl mx-auto">
            Let's have a conversation about your goals, timeline, and how we can help you get there. No sales pitch,
            just an honest discussion about whether we're a good fit for each other.
          </p>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              size="lg"
              onClick={scrollToContact}
              className="bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 text-white px-12 py-6 text-lg font-semibold shadow-lg"
            >
              Let's talk about it
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}