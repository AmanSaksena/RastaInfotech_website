import { NextRequest, NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'
import { connectDB } from '@/backend/lib/mongodb'
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

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  if (!getAdminId(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  await connectDB()
  const app = await JobApplication.findById(params.id).select('resume name position')
  if (!app) return NextResponse.json({ error: 'Not found.' }, { status: 404 })

  return new NextResponse(app.resume.data, {
    headers: {
      'Content-Type': app.resume.contentType,
      'Content-Disposition': `attachment; filename="${app.name.replace(/\s+/g, '_')}_${app.position.replace(/\s+/g, '_')}_Resume.pdf"`,
    },
  })
}
