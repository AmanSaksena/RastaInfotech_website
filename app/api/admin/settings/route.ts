import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { connectDB } from '@/backend/lib/mongodb'
import Admin from '@/backend/models/Admin'

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
  const adminId = getAdminId(req)
  if (!adminId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  await connectDB()
  const admin = await Admin.findById(adminId).select('-password')
  if (!admin) return NextResponse.json({ error: 'Admin not found.' }, { status: 404 })

  return NextResponse.json({ admin })
}

export async function PATCH(req: NextRequest) {
  const adminId = getAdminId(req)
  if (!adminId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const { name, email, currentPassword, newPassword } = await req.json()

    await connectDB()
    const admin = await Admin.findById(adminId)
    if (!admin) return NextResponse.json({ error: 'Admin not found.' }, { status: 404 })

    // If changing password, verify current password first
    if (newPassword) {
      if (!currentPassword) {
        return NextResponse.json({ error: 'Current password is required to set a new password.' }, { status: 400 })
      }
      const isValid = await bcrypt.compare(currentPassword, admin.password)
      if (!isValid) {
        return NextResponse.json({ error: 'Current password is incorrect.' }, { status: 400 })
      }
      if (newPassword.length < 8) {
        return NextResponse.json({ error: 'New password must be at least 8 characters.' }, { status: 400 })
      }
      admin.password = await bcrypt.hash(newPassword, 10)
    }

    if (name) admin.name = name.trim()
    if (email) {
      const existing = await Admin.findOne({ email: email.toLowerCase(), _id: { $ne: adminId } })
      if (existing) return NextResponse.json({ error: 'This email is already in use.' }, { status: 409 })
      admin.email = email.toLowerCase().trim()
    }

    await admin.save()

    // Re-issue token with updated info
    const token = jwt.sign(
      { adminId: admin._id.toString(), email: admin.email, name: admin.name, role: 'admin' },
      JWT_SECRET,
      { expiresIn: '7d' }
    )

    const response = NextResponse.json({
      success: true,
      admin: { name: admin.name, email: admin.email },
    })

    response.cookies.set('admin_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7,
      path: '/',
    })

    return response
  } catch (error) {
    console.error('Settings update error:', error)
    return NextResponse.json({ error: 'Something went wrong.' }, { status: 500 })
  }
}
