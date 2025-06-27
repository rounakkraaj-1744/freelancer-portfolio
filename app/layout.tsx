import type React from "react"
import type { Metadata } from "next"
import { Inter, JetBrains_Mono } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })
const jetbrainsMono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" })

export const metadata: Metadata = {
  title: "Rounakk - Full-Stack Developer & AI Engineer",
  description:
    "Full-stack engineer specializing in MERN Stack, Next.js, NestJS, DevOps, GenAI, and Cloud platforms. Building legendary web applications and AI tools.",
  keywords: ["Full-stack developer", "MERN Stack", "Next.js", "AI Engineer", "DevOps", "Cloud"],
  authors: [{ name: "Rounakk" }],
  openGraph: {
    title: "Rounakk - Full-Stack Developer & AI Engineer",
    description: "Building legendary web applications and AI tools",
    type: "website",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${jetbrainsMono.variable} font-sans`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
