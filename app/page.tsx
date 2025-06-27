import AboutSection from "@/components/sections/about-section";
import ServicesSection from "@/components/sections/services-section";
import PricingSection from "@/components/sections/pricing-section";
import TeamSection from "@/components/sections/team-section";
import ContactSection from "@/components/sections/contact-section";
import TestimonialsSection from "@/components/sections/testimonials-section";
import FinalCTASection from "@/components/sections/final-cta-section";
import Footer from "@/components/sections/footer";
import Navbar from "@/components/navbar";
import ChatBot from "@/components/chatbot";
import HeroSection from "@/components/sections/hero-section";

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <PricingSection />
      <TeamSection />
      <ContactSection />
      <TestimonialsSection />
      <FinalCTASection />
      <Footer />
      <ChatBot />
    </main>
  )
}