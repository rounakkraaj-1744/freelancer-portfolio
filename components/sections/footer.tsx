"use client"
import { motion } from "framer-motion"
import { Github, Linkedin, Twitter, Mail, Heart } from "lucide-react"

export default function Footer() {
  const socialLinks = [
    { icon: Github, href: "https://github.com/Rounakk", label: "GitHub" },
    { icon: Linkedin, href: "https://linkedin.com/in/Rounakk", label: "LinkedIn" },
    { icon: Twitter, href: "https://twitter.com/Rounakk", label: "Twitter" },
    { icon: Mail, href: "mailto:Rounakk@example.com", label: "Email" },
  ]

  return (
    <footer className="py-12 border-t border-border">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="mb-6 md:mb-0">
            <div className="text-2xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent mb-2">
              Rounakk
            </div>
            <p className="text-muted-foreground text-center md:text-left">Full-Stack Developer & AI Engineer</p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
            className="flex items-center space-x-6 mb-6 md:mb-0">
            {socialLinks.map((link) => (
              <motion.a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer" whileHover={{ scale: 1.1, y: -2 }}
                className="w-10 h-10 bg-muted rounded-full flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
                aria-label={link.label}>
                <link.icon className="w-5 h-5" />
              </motion.a>
            ))}
          </motion.div>
        </div>

        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.2 }} className="text-center pt-8 border-t border-border mt-8">
          <p className="text-sm text-muted-foreground mt-2">© {new Date().getFullYear()} All rights reserved.</p>
        </motion.div>
      </div>
    </footer>
  )
}