"use client"
import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

const techStack = [
  { name: "React", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
  { name: "Next.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" },
  { name: "Node.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
  { name: "TypeScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" },
  { name: "Docker", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" },
  {
    name: "AWS",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original.svg",
  },
  { name: "MongoDB", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" },
  { name: "PostgreSQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" },
];

export default function App() {
  // Ref for the section to track its visibility in the viewport
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    // Main container for the application with a dark background and Inter font
    <div className="min-h-screen bg-gray-900 text-white font-inter">
      {/* Tailwind CSS CDN and custom styles for animation and general layout */}
      
      {/* About Section main container */}
      <section id="about" className="py-32 relative overflow-hidden" ref={ref}>
        {/* Absolute positioned grid background and gradient overlay for visual flair */}
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-grid-black/[0.02] dark:bg-grid-white/[0.02]" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-500/5 to-transparent" />

        <div className="container mx-auto px-4 relative z-10">
          {/* Introduction text with Framer Motion animations */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <motion.h2
              className="text-4xl md:text-6xl font-bold mb-8"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              A bit about{" "}
              <span className="bg-gradient-to-r from-purple-400 to-purple-700 bg-clip-text text-transparent">me</span>
            </motion.h2>
            <div className="max-w-4xl mx-auto space-y-6">
              <motion.p
                className="text-xl md:text-2xl text-gray-400 leading-relaxed"
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                I'm not your typical developer who speaks only in code. Sure, I love building{" "}
                <span className="text-purple-400 font-semibold">scalable applications</span> and implementing{" "}
                <span className="text-purple-500 font-semibold">smart DevOps practices</span>, but what really drives me
                is creating{" "}
                <span className="text-green-400 font-semibold">solutions that make people's lives easier</span>.
              </motion.p>
              <motion.p
                className="text-xl md:text-2xl text-gray-400 leading-relaxed"
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                When I'm not coding, you'll find me exploring the latest AI trends (yes, I'm that guy who gets excited
                about new models 🤓), or probably debugging something at 2 AM with a cup of coffee. I believe in{" "}
                <span className="text-purple-400 font-semibold">honest communication</span>, delivering on time, and building
                things that actually work in the real world.
              </motion.p>
            </div>
          </motion.div>

          {/* Container for the auto-scrolling tech stack items */}
          <div className="relative overflow-hidden">
            {/* Overlay for a fading effect on the sides of the scrolling section */}
            <div className="w-full h-full absolute inset-y-0 left-0 bg-gradient-to-r from-gray-900 via-transparent to-gray-900 z-20 pointer-events-none" />
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex space-x-8 animate-scroll py-8"
            >
              {/* First set of tech stack items */}
              {techStack.map((tech, index) => (
                <motion.div
                  key={`first-${tech.name}`}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{
                    duration: 0.6,
                    delay: 0.1 * index,
                    type: "spring",
                    stiffness: 100,
                  }}
                  whileHover={{
                    scale: 1.05,
                    y: -5,
                    transition: { duration: 0.2 },
                  }}
                  className="group flex flex-col items-center p-6 bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 hover:border-purple-500/50 transition-all duration-300 hover:shadow-lg min-w-[140px] flex-shrink-0"
                >
                  <div className="relative mb-3">
                    <img
                      src={tech.icon || "https://placehold.co/40x40/000000/FFFFFF?text=Icon"} // Fallback placeholder image
                      alt={tech.name}
                      className="w-10 h-10 group-hover:scale-110 transition-transform duration-200"
                    />
                  </div>
                  <span className="text-sm font-medium text-center">{tech.name}</span>
                </motion.div>
              ))}

              {/* Duplicate set for seamless looping of the scroll */}
              {techStack.map((tech, index) => (
                <motion.div
                  key={`second-${tech.name}`}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{
                    duration: 0.6,
                    delay: 0.1 * index,
                    type: "spring",
                    stiffness: 100,
                  }}
                  whileHover={{
                    scale: 1.05,
                    y: -5,
                    transition: { duration: 0.2 },
                  }}
                  className="group flex flex-col items-center p-6 bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 hover:border-purple-500/50 transition-all duration-300 hover:shadow-lg min-w-[140px] flex-shrink-0"
                >
                  <div className="relative mb-3">
                    <img
                      src={tech.icon || "https://placehold.co/40x40/000000/FFFFFF?text=Icon"} // Fallback placeholder image
                      alt={tech.name}
                      className="w-10 h-10 group-hover:scale-110 transition-transform duration-200"
                    />
                  </div>
                  <span className="text-sm font-medium text-center">{tech.name}</span>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Concluding text */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 1 }}
            className="text-center mt-16"
          >
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              These are just some of the tools I use daily. But honestly? The best tool is{" "}
              <span className="text-purple-400 font-semibold">good communication</span> and understanding what you actually
              need (not just what you think you want 😉).
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}