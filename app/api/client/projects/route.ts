import { NextRequest, NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'
import { connectDB } from '@/backend/lib/mongodb'
import Project from '@/backend/models/Project'

const JWT_SECRET = process.env.JWT_SECRET!

function getClientId(req: NextRequest): string | null {
  try {
    const token = req.cookies.get('client_token')?.value
    if (!token) return null
    const payload = jwt.verify(token, JWT_SECRET) as { clientId: string }
    return payload.clientId
  } catch {
    return null
  }
}

export async function GET(req: NextRequest) {
  const clientId = getClientId(req)
  if (!clientId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    await connectDB()
    const projects = await Project.find({ clientId }).sort({ createdAt: -1 }).lean()
    return NextResponse.json({ projects })
  } catch (error) {
    console.error('Projects API error:', error)
    return NextResponse.json({ error: 'Failed to fetch projects.' }, { status: 500 })
  }
}
