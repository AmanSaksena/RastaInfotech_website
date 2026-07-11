import { NextRequest, NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'
import { connectDB } from '@/backend/lib/mongodb'
import Ticket from '@/backend/models/Ticket'

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
    const tickets = await Ticket.find({ clientId }).sort({ createdAt: -1 }).lean()
    return NextResponse.json({ tickets })
  } catch (error) {
    console.error('Tickets GET error:', error)
    return NextResponse.json({ error: 'Failed to fetch tickets.' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  const clientId = getClientId(req)
  if (!clientId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const { title, description, priority, category, projectId } = await req.json()

    if (!title || !description) {
      return NextResponse.json({ error: 'Title and description are required.' }, { status: 400 })
    }

    await connectDB()

    const ticket = await Ticket.create({
      title,
      description,
      clientId,
      projectId: projectId || undefined,
      priority: priority || 'medium',
      category: category || 'general',
      messages: [{ sender: 'client', message: description }],
    })

    return NextResponse.json({ success: true, ticket })
  } catch (error) {
    console.error('Tickets POST error:', error)
    return NextResponse.json({ error: 'Failed to create ticket.' }, { status: 500 })
  }
}
