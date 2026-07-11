import { NextResponse } from 'next/server'
import { connectDB } from '@/backend/lib/mongodb'
import JobPosting from '@/backend/models/JobPosting'

export async function GET() {
  try {
    await connectDB()
    const jobs = await JobPosting.find({ isActive: true, deadline: { $gte: new Date() } })
      .select('-__v')
      .sort({ createdAt: -1 })
      .lean()
    return NextResponse.json({ jobs })
  } catch (error) {
    console.error('Public jobs fetch error:', error)
    return NextResponse.json({ error: 'Something went wrong.' }, { status: 500 })
  }
}
