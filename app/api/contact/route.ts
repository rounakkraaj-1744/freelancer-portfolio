import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, projectType, budget, message } = body

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json({ error: "Name, email, and message are required" }, { status: 400 })
    }

    // Here you would typically:
    // 1. Save to database
    // 2. Send email notification
    // 3. Add to CRM system

    // For demo purposes, we'll just log the data
    console.log("Contact form submission:", {
      name,
      email,
      projectType,
      budget,
      message,
      timestamp: new Date().toISOString(),
    })

    // Simulate email sending (replace with actual email service like Resend)
    // await sendEmail({
    //   to: 'Rounakk@example.com',
    //   subject: `New Contact Form Submission from ${name}`,
    //   html: `
    //     <h2>New Contact Form Submission</h2>
    //     <p><strong>Name:</strong> ${name}</p>
    //     <p><strong>Email:</strong> ${email}</p>
    //     <p><strong>Project Type:</strong> ${projectType}</p>
    //     <p><strong>Budget:</strong> ${budget}</p>
    //     <p><strong>Message:</strong></p>
    //     <p>${message}</p>
    //   `
    // })

    return NextResponse.json({ message: "Contact form submitted successfully" }, { status: 200 })
  }
  catch (error) {
    console.error("Contact form error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}