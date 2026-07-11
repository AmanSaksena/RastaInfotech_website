import { NextRequest, NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'
import { connectDB } from '@/backend/lib/mongodb'
import JobApplication from '@/backend/models/JobApplication'
import { sendApplicationStatusEmail } from '@/backend/lib/mailer'

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
    const { status } = await req.json()
    await connectDB()
    const app = await JobApplication.findByIdAndUpdate(params.id, { status }, { new: true }).select('-resume.data')

    // Send email for reviewed, shortlisted, or rejected
    if (['reviewed', 'shortlisted', 'offer', 'rejected'].includes(status)) {
      sendApplicationStatusEmail(app.email, app.name, app.position, status).catch((err) =>
        console.error('Email send failed:', err)
      )
    }

    return NextResponse.json({ success: true, application: app })
  } catch (error) {
    console.error('Update application error:', error)
    return NextResponse.json({ error: 'Something went wrong.' }, { status: 500 })
  }
}
