import { NextRequest, NextResponse } from 'next/server'
import { connectDB } from '@/backend/lib/mongodb'
import Lead from '@/backend/models/Lead'

export async function POST(req: NextRequest) {
  try {
    const { name, email, phone } = await req.json()

    if (!name || !email) {
      return NextResponse.json({ error: 'Name and email are required.' }, { status: 400 })
    }

    await connectDB()
    await Lead.create({ name, email, phone })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Lead API error:', error)
    return NextResponse.json({ error: 'Something went wrong. Please try again.' }, { status: 500 })
  }
}
