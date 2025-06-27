import { type NextRequest, NextResponse } from "next/server"
import { MongoClient } from "mongodb"

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017"
const DB_NAME = "portfolio"
const COLLECTION_NAME = "testimonials"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, company, role, projectType, testimonial, rating, allowPublic } = body

    if (!name || !email || !testimonial || !rating)
      return NextResponse.json({ error: "Name, email, testimonial, and rating are required" }, { status: 400 })

    if (rating < 1 || rating > 5)
      return NextResponse.json({ error: "Rating must be between 1 and 5" }, { status: 400 })

    const client = new MongoClient(MONGODB_URI)
    await client.connect()

    const db = client.db(DB_NAME)
    const collection = db.collection(COLLECTION_NAME)

    const testimonialDoc = {
      name,
      email,
      company: company || "",
      role: role || "",
      projectType: projectType || "",
      testimonial,
      rating,
      allowPublic: allowPublic !== false,
      createdAt: new Date(),
      approved: false,
    }

    const result = await collection.insertOne(testimonialDoc)

    await client.close()

    console.log("New testimonial submitted:", {
      id: result.insertedId,
      name,
      company,
      rating,
      timestamp: new Date().toISOString(),
    })

    return NextResponse.json({ message: "Testimonial submitted successfully", id: result.insertedId }, { status: 201 })
  }
  catch (error) {
    console.error("Testimonial submission error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const approved = searchParams.get("approved") !== "false"

    const client = new MongoClient(MONGODB_URI)
    await client.connect()

    const db = client.db(DB_NAME)
    const collection = db.collection(COLLECTION_NAME)

    const query = {
      allowPublic: true,
      ...(approved && { approved: true }),
    }

    const testimonials = await collection.find(query).sort({ createdAt: -1 }).project({ email: 0 }).toArray()

    await client.close()

    return NextResponse.json({ testimonials }, { status: 200 })
  }
  catch (error) {
    console.error("Testimonials fetch error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}