import { NextRequest, NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'
import { connectDB } from '@/backend/lib/mongodb'
import Project from '@/backend/models/Project'

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
  const projects = await Project.find().sort({ createdAt: -1 }).populate('clientId', 'name company email').lean()
  return NextResponse.json({ projects })
}

export async function POST(req: NextRequest) {
  if (!getAdminId(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  try {
    const { title, description, clientId, status, progress, startDate, deadline, techStack, deliverables } = await req.json()
    if (!title || !description || !clientId || !startDate || !deadline) {
      return NextResponse.json({ error: 'Required fields missing.' }, { status: 400 })
    }
    await connectDB()
    const project = await Project.create({
      title, description, clientId, status: status || 'planning',
      progress: progress || 0, startDate, deadline,
      techStack: Array.isArray(techStack) ? techStack : (techStack || '').split(',').map((s: string) => s.trim()).filter(Boolean),
      deliverables: deliverables || [],
    })
    return NextResponse.json({ success: true, project })
  } catch (error) {
    console.error('Create project error:', error)
    return NextResponse.json({ error: 'Something went wrong.' }, { status: 500 })
  }
}
