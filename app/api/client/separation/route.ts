import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { connectDB } from '@/backend/lib/mongodb'
import mongoose from 'mongoose'

const separationSchema = new mongoose.Schema({
  clientId: String,
  resignationDate: Date,
  lastWorkingDay: Date,
  noticePeriod: String,
  reason: String,
  comments: String,
  status: { type: String, default: 'submitted' },
  submittedAt: { type: Date, default: Date.now },
})

const SeparationRequest =
  mongoose.models.SeparationRequest ||
  mongoose.model('SeparationRequest', separationSchema)

export async function POST(req: Request) {
  try {
    const cookieStore = await cookies()
    const clientId = cookieStore.get('client_id')?.value
    if (!clientId) return NextResponse.json({ error: 'Unauthorised' }, { status: 401 })

    const { resignationDate, lastWorkingDay, noticePeriod, reason, comments } = await req.json()

    if (!resignationDate || !lastWorkingDay || !reason) {
      return NextResponse.json({ error: 'Missing required fields.' }, { status: 400 })
    }

    await connectDB()
    await SeparationRequest.create({ clientId, resignationDate, lastWorkingDay, noticePeriod, reason, comments })

    return NextResponse.json({ message: 'Separation request submitted successfully.' })
  } catch (error) {
    console.error('Separation request error:', error)
    return NextResponse.json({ error: 'Something went wrong.' }, { status: 500 })
  }
}
