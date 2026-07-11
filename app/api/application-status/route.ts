import { NextRequest, NextResponse } from 'next/server'
import { connectDB } from '@/backend/lib/mongodb'
import JobApplication from '@/backend/models/JobApplication'

export async function GET(req: NextRequest) {
  try {
    const email = req.nextUrl.searchParams.get('email')?.trim().toLowerCase()
    if (!email) return NextResponse.json({ error: 'Email is required.' }, { status: 400 })

    await connectDB()

    const applications = await JobApplication.find({ email })
      .select('name position status createdAt')
      .sort({ createdAt: -1 })
      .lean()

    if (!applications.length) {
      return NextResponse.json({ error: 'No application found for this email.' }, { status: 404 })
    }

    return NextResponse.json({ applications })
  } catch (error) {
    console.error('Application status error:', error)
    return NextResponse.json({ error: 'Something went wrong.' }, { status: 500 })
  }
}
