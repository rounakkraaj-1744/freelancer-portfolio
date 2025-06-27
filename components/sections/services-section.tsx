"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import { Code, Database, Bot, Cloud, Globe, Zap } from "lucide-react"

const services = [
  {
    icon: Code,
    title: "Web Applications",
    description: "Full-stack apps that your users will actually enjoy using (and you'll love maintaining)",
    features: ["React/Next.js magic", "Rock-solid backends", "Clean, readable code", "Mobile-first design"],
    realTalk: "No spaghetti code here!",
  },
  {
    icon: Database,
    title: "Admin Dashboards",
    description: "Control panels that make sense, with data that tells a story",
    features: ["Real-time updates", "Beautiful charts", "User-friendly interface", "Export everything"],
    realTalk: "Finally, an admin panel you'll want to use",
  },
  {
    icon: Bot,
    title: "AI Integration",
    description: "Smart features that actually solve problems (not just buzzword bingo)",
    features: ["Custom chatbots", "Smart automation", "Data analysis", "API integrations"],
    realTalk: "AI that works, not just hype",
  },
  {
    icon: Cloud,
    title: "DevOps & Deployment",
    description: "Your app, running smoothly in the cloud while you sleep peacefully",
    features: ["Auto-scaling", "Monitoring", "CI/CD pipelines", "Security first"],
    realTalk: "No more 3 AM server crashes",
  },
  {
    icon: Globe,
    title: "Landing Pages",
    description: "Pages that convert visitors into customers (with proof, not just promises)",
    features: ["Conversion optimized", "Lightning fast", "SEO friendly", "A/B test ready"],
    realTalk: "Your marketing team will love you",
  },
  {
    icon: Zap,
    title: "API Development",
    description: "APIs so well-documented, even your future self will thank you",
    features: ["RESTful design", "Comprehensive docs", "Rate limiting", "Version control"],
    realTalk: "Documentation that doesn't suck",
  },
]

export default function ServicesSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="services" className="py-32 relative overflow-hidden" ref={ref}>
      {/* Grid Background */}
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-grid-black/[0.02] dark:bg-grid-white/[0.02]" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-8">
            What I can{" "}
            <span className="bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
              help you with
            </span>
          </h2>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto">
            From "I have this crazy idea" to "Wow, this actually works!" — I'll be with you every step of the way.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.1 * index }}
              whileHover={{ y: -5 }}
              className="group p-8 bg-background/50 backdrop-blur-sm rounded-2xl border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-xl"
            >
              <div className="mb-6">
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <service.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-3">{service.title}</h3>
                <p className="text-muted-foreground mb-4">{service.description}</p>
                <div className="text-sm text-primary font-medium italic mb-4">"{service.realTalk}"</div>
              </div>

              <div className="space-y-2">
                {service.features.map((feature, idx) => (
                  <div key={idx} className="flex items-center text-sm">
                    <div className="w-2 h-2 bg-primary rounded-full mr-3" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center mt-16"
        >
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Don't see exactly what you need? Let's chat! I love tackling unique challenges and finding creative
            solutions. Sometimes the best projects are the ones that don't fit into neat categories.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
