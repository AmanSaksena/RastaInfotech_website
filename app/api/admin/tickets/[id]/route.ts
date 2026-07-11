import { NextRequest, NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'
import { connectDB } from '@/backend/lib/mongodb'
import Ticket from '@/backend/models/Ticket'

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
    const { status, reply } = await req.json()
    await connectDB()

    const update: Record<string, unknown> = {}
    if (status) update.status = status
    if (reply) {
      const ticket = await Ticket.findByIdAndUpdate(
        params.id,
        {
          ...(status ? { status } : {}),
          $push: { messages: { sender: 'support', message: reply, createdAt: new Date() } },
        },
        { new: true }
      ).populate('clientId', 'name company email').populate('projectId', 'title')
      return NextResponse.json({ success: true, ticket })
    }

    const ticket = await Ticket.findByIdAndUpdate(params.id, update, { new: true })
      .populate('clientId', 'name company email').populate('projectId', 'title')
    return NextResponse.json({ success: true, ticket })
  } catch (error) {
    console.error('Update ticket error:', error)
    return NextResponse.json({ error: 'Something went wrong.' }, { status: 500 })
  }
}
