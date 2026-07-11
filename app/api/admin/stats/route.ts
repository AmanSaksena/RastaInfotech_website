import { NextRequest, NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'
import { connectDB } from '@/backend/lib/mongodb'
import Client from '@/backend/models/Client'
import Project from '@/backend/models/Project'
import Ticket from '@/backend/models/Ticket'
import JobApplication from '@/backend/models/JobApplication'

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

  const [clients, projects, openTickets, pendingApps, recentTickets, recentApps] = await Promise.all([
    Client.countDocuments(),
    Project.countDocuments(),
    Ticket.countDocuments({ status: { $in: ['open', 'in_progress'] } }),
    JobApplication.countDocuments({ status: 'pending' }),
    Ticket.find({ status: { $in: ['open', 'in_progress'] } }).sort({ createdAt: -1 }).limit(5).populate('clientId', 'name company').lean(),
    JobApplication.find().sort({ createdAt: -1 }).limit(5).select('-resume.data').lean(),
  ])

  return NextResponse.json({ clients, projects, openTickets, pendingApps, recentTickets, recentApps })
}
