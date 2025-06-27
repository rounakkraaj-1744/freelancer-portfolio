"use client"
import type React from "react"
import { useState } from "react"
import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { useToast } from "@/hooks/use-toast"
import { Send, Mail, Phone, MapPin, DollarSign } from "lucide-react"

export default function ContactSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [customBudget, setCustomBudget] = useState("")
  const [isCustomBudgetOpen, setIsCustomBudgetOpen] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    projectType: "",
    budget: "",
    message: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        toast({
          title: "Message sent successfully!",
          description: "I'll get back to you within 24 hours.",
        })
        setFormData({
          name: "",
          email: "",
          projectType: "",
          budget: "",
          message: "",
        })
      }
      else 
        throw new Error("Failed to send message")
    }
    catch (error) {
      toast({
        title: "Error sending message",
        description: "Please try again or contact me directly.",
        variant: "destructive",
      })
    }
    finally {
      setIsLoading(false)
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleCustomBudgetSubmit = () => {
    if (customBudget) {
      handleInputChange("budget", `Custom: ₹${customBudget}`)
      setIsCustomBudgetOpen(false)
      setCustomBudget("")
    }
  }

  return (
    <section id="contact" className="py-32 relative overflow-hidden" ref={ref}>
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-grid-black/[0.02] dark:bg-grid-white/[0.02]" />
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-purple-500/5" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div initial={{ opacity: 0, y: 50 }} animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }} className="text-center mb-20">
          <h2 className="text-4xl md:text-6xl font-bold mb-8">
            Let's Start{" "}
            <span className="bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">Building</span>
          </h2>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto">
            Ready to bring your idea to life? Fill out the form below and I'll get back to you within 24 hours.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0, x: -50 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.8, delay: 0.2 }} className="bg-background/50 backdrop-blur-sm rounded-3xl border border-border p-10 hover:border-primary/50 transition-all duration-500 shadow-2xl">
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold mb-3 font-mono text-primary">Name *</label>
                  <Input type="text" value={formData.name} onChange={(e) => handleInputChange("name", e.target.value)}
                    required className="w-full h-12 bg-background/50 border-border focus:border-primary transition-colors"
                    placeholder="Your full name"/>
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-3 font-mono text-primary">Email *</label>
                  <Input type="email" value={formData.email} onChange={(e) => handleInputChange("email", e.target.value)}
                    required className="w-full h-12 bg-background/50 border-border focus:border-primary transition-colors"
                    placeholder="your@email.com" />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold mb-3 font-mono text-primary">Project Type</label>
                  <Select value={formData.projectType} onValueChange={(value: string) => handleInputChange("projectType", value)}>
                    <SelectTrigger className="h-12 bg-background/50 border-border focus:border-primary">
                      <SelectValue placeholder="Select project type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="landing-page">Landing Page</SelectItem>
                      <SelectItem value="web-app">Web Application</SelectItem>
                      <SelectItem value="admin-panel">Admin Panel</SelectItem>
                      <SelectItem value="ai-tool">AI Tool</SelectItem>
                      <SelectItem value="api">API Development</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-3 font-mono text-primary">Budget Range</label>
                  <Select value={formData.budget} onValueChange={(value: string) => handleInputChange("budget", value)}>
                    <SelectTrigger className="h-12 bg-background/50 border-border focus:border-primary">
                      <SelectValue placeholder="Select budget range" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="15k">₹15,000 - Starter</SelectItem>
                      <SelectItem value="35k">₹35,000 - Standard</SelectItem>
                      <SelectItem value="65k">₹65,000 - Premium</SelectItem>
                      <SelectItem value="custom">Custom Quote</SelectItem>
                      <Dialog open={isCustomBudgetOpen} onOpenChange={setIsCustomBudgetOpen}>
                        <DialogTrigger asChild>
                          <div className="flex items-center gap-2 px-2 py-1.5 hover:bg-accent rounded-sm cursor-pointer">
                            <DollarSign className="w-4 h-4" />
                            <span>Enter Custom Amount</span>
                          </div>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Enter Your Budget</DialogTitle>
                          </DialogHeader>
                          <div className="space-y-4">
                            <Input type="number" placeholder="Enter amount in ₹" value={customBudget}
                              onChange={(e) => setCustomBudget(e.target.value)} className="h-12"/>
                            <Button onClick={handleCustomBudgetSubmit} className="w-full">
                              Set Budget
                            </Button>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-3 font-mono text-primary">Project Details *</label>
                <Textarea value={formData.message} onChange={(e) => handleInputChange("message", e.target.value)}
                  required rows={6} className="w-full bg-background/50 border-border focus:border-primary transition-colors resize-none"
                  placeholder="Tell me about your project, requirements, timeline, and any specific features you need..."/>
              </div>

              <Button type="submit" disabled={isLoading} className="w-full bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 text-white py-6 text-lg font-semibold shadow-2xl shadow-primary/25">
                {isLoading ? (
                  <div className="flex items-center gap-3">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Sending...
                  </div>
                ) : (
                  <div className="flex items-center gap-3">
                    <Send className="w-5 h-5" />
                    Send Message
                  </div>
                )}
              </Button>
            </form>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 50 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.8, delay: 0.4 }} className="space-y-10">
            <div>
              <h3 className="text-3xl font-bold mb-8">Get in Touch</h3>
              <p className="text-xl text-muted-foreground mb-10 leading-relaxed">
                I&apos;m always excited to work on new projects and help bring innovative ideas to life. Let&apos;s discuss how we
                can work together to create something amazing.
              </p>
            </div>

            <div className="space-y-8">
              {[
                { icon: Mail, title: "Email", value: "Rounakk@example.com", color: "text-blue-500" },
                { icon: Phone, title: "Phone", value: "+91 98765 43210", color: "text-green-500" },
                { icon: MapPin, title: "Location", value: "India (Remote Available)", color: "text-purple-500" },
              ].map((item, index) => (
                <motion.div key={item.title} initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.6 + index * 0.1 }} className="flex items-center gap-6 p-6 bg-background/50 backdrop-blur-sm rounded-2xl border border-border hover:border-primary/50 transition-all duration-300">
                  <div className={`w-16 h-16 ${item.color.replace("text-", "bg-").replace("500", "500/10")} rounded-2xl flex items-center justify-center`}>
                    <item.icon className={`w-8 h-8 ${item.color}`} />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold">{item.title}</h4>
                    <p className="text-muted-foreground">{item.value}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.9 }} className="p-8 bg-gradient-to-r from-primary/10 to-purple-500/10 rounded-2xl border border-primary/20">
              <h4 className="text-xl font-bold mb-4">Response Time</h4>
              <p className="text-muted-foreground leading-relaxed">
                I typically respond to all inquiries within <span className="text-primary font-semibold">24 hours</span>
                . For urgent projects, feel free to mention it in your message and I'll prioritize your request.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}