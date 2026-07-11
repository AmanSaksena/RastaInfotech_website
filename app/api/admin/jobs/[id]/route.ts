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

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  if (!getAdminId(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  try {
    await connectDB()
    const body = await req.json()
    const job = await JobPosting.findByIdAndUpdate(params.id, body, { new: true })
    if (!job) return NextResponse.json({ error: 'Job not found.' }, { status: 404 })
    return NextResponse.json({ success: true, job })
  } catch (error) {
    console.error('Update job error:', error)
    return NextResponse.json({ error: 'Something went wrong.' }, { status: 500 })
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  if (!getAdminId(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  try {
    await connectDB()
    await JobPosting.findByIdAndDelete(params.id)
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Delete job error:', error)
    return NextResponse.json({ error: 'Something went wrong.' }, { status: 500 })
  }
}
