import { NextRequest, NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'
import { connectDB } from '@/backend/lib/mongodb'
import JobPosting from '@/backend/models/JobPosting'

const JWT_SECRET = process.env.JWT_SECRET!

function getAdminId(req: NextRequest): string | null {
  try {
    const token = req.cookies.get('admin_token')?.value
    if (!token) return null
    const payload = jwt.verify(token, JWT_SECRET) as { adminId: string; role: string }
    if (payload.role !== 'admin') return null
    return payload.adminId
  } catch { return null }
}

export async function GET(req: NextRequest) {
  if (!getAdminId(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  await connectDB()
  const jobs = await JobPosting.find().sort({ createdAt: -1 }).lean()
  return NextResponse.json({ jobs })
}

export async function POST(req: NextRequest) {
  if (!getAdminId(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  try {
    const body = await req.json()
    const { title, department, location, type, experience, description, requirements, deadline } = body

    if (!title || !department || !location || !type || !experience || !description || !deadline) {
      return NextResponse.json({ error: 'All required fields must be filled.' }, { status: 400 })
    }

    await connectDB()
    const job = await JobPosting.create({
      title, department, location, type, experience, description,
      requirements: requirements || [],
      deadline: new Date(deadline),
    })
    return NextResponse.json({ success: true, job }, { status: 201 })
  } catch (error) {
    console.error('Create job error:', error)
    return NextResponse.json({ error: 'Something went wrong.' }, { status: 500 })
  }
}
