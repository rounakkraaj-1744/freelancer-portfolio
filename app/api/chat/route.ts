import { type NextRequest, NextResponse } from "next/server"

// This would typically use the Groq API
// For demo purposes, we'll create a simple response system
export async function POST(request: NextRequest) {
  try {
    const { message } = await request.json()

    if (!message) {
      return NextResponse.json({ error: "Message is required" }, { status: 400 })
    }

    // Simple keyword-based responses (replace with actual Groq API call)
    let response = ""

    const lowerMessage = message.toLowerCase()

    if (lowerMessage.includes("pricing") || lowerMessage.includes("cost") || lowerMessage.includes("price"))
      response = "I offer three main pricing tiers: Starter (₹15,000 for landing pages), Standard (₹35,000 for web apps), and Premium (₹65,000 for full-stack solutions). Each includes different features and delivery timelines. Would you like more details about any specific plan?"
  
    else if (lowerMessage.includes("service") || lowerMessage.includes("what do you do"))
      response = "I specialize in full-stack web development, AI tools, admin panels, DevOps, and API development. I work with React, Next.js, NestJS, and modern AI technologies. I can handle everything from simple landing pages to complex enterprise applications."
  
    else if (lowerMessage.includes("timeline") || lowerMessage.includes("delivery") || lowerMessage.includes("how long"))
  
      response = "Project timelines vary by complexity: Starter projects take 5 days, Standard projects take 10 days, and Premium projects take 14 days. For custom enterprise solutions with my team, timelines are discussed based on specific requirements."
    
    else if (lowerMessage.includes("team") || lowerMessage.includes("collaboration")) 
      response = "For larger projects, I work with a skilled team of developers, designers, and project managers. We handle enterprise-grade applications with formal contracts, milestones, and guaranteed delivery. Would you like to discuss a team-based project?"
    
    else if (lowerMessage.includes("technology") || lowerMessage.includes("tech stack")) 
      response = "I work with modern technologies including React, Next.js, NestJS, TypeScript, Node.js, Docker, AWS, and AI frameworks like LangChain. I focus on scalable, maintainable solutions using the latest best practices."
    
    else if (lowerMessage.includes("contact") || lowerMessage.includes("reach") || lowerMessage.includes("email")) 
      response = "You can reach me at Rounakk@example.com or fill out the contact form on this page. I typically respond within 24 hours. For urgent projects, just mention it in your message!"
    
    else if (lowerMessage.includes("ai") || lowerMessage.includes("chatbot") || lowerMessage.includes("artificial intelligence"))
    
      response = "I specialize in AI solutions including RAG systems, chatbots, and AI tool development using modern frameworks. I can integrate AI capabilities into web applications or build standalone AI tools. What kind of AI solution are you looking for?"
    else 
      response = "Thanks for your question! I'd be happy to help you with information about my services, pricing, or project requirements. You can also fill out the contact form to discuss your specific needs in detail."
    

    // In a real implementation, you would call the Groq API here:
    // const groqResponse = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    //   method: 'POST',
    //   headers: {
    //     'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({
    //     model: 'mixtral-8x7b-32768',
    //     messages: [
    //       {
    //         role: 'system',
    //         content: `You are Rounakk's AI assistant. Rounakk is a full-stack developer specializing in MERN Stack, Next.js, NestJS, DevOps, GenAI, and Cloud platforms.
    //
    //         Services offered:
    //         - Full-stack Web Apps
    //         - Admin Panels & Dashboards
    //         - AI Tools (RAG, chatbots)
    //         - DevOps + CI/CD
    //         - Landing Pages
    //         - APIs & Integrations
    //
    //         Pricing:
    //         - Starter: ₹15,000 (Landing page + Contact form, 5 days)
    //         - Standard: ₹35,000 (Full Web App 1-2 pages, 10 days)
    //         - Premium: ₹65,000 (Full-stack app with Auth, DB, Admin Panel, 14 days)
    //
    //         Be helpful, professional, and encourage users to contact Rounakk for detailed discussions.`
    //       },
    //       {
    //         role: 'user',
    //         content: message
    //       }
    //     ],
    //     max_tokens: 150,
    //     temperature: 0.7
    //   })
    // })
    //
    // const groqData = await groqResponse.json()
    // response = groqData.choices[0].message.content

    return NextResponse.json({ message: response })
  }
  catch (error) {
    console.error("Chat API error:", error)
    return NextResponse.json({ error: "Failed to process chat message" }, { status: 500 })
  }
}