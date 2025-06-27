export interface ContactFormData {
  name: string
  email: string
  projectType: string
  budget: string
  message: string
}

export interface ChatMessage {
  id: string
  text: string
  isUser: boolean
  timestamp: Date
}

export interface Service {
  icon: any
  title: string
  description: string
  features: string[]
}

export interface PricingPlan {
  name: string
  price: string
  duration: string
  description: string
  features: string[]
  popular: boolean
}

export interface Testimonial {
  name: string
  role: string
  avatar: string
  quote: string
  rating: number
}