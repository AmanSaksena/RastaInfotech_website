import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { connectDB } from '@/backend/lib/mongodb'
import Admin from '@/backend/models/Admin'

export async function GET() {
  await connectDB()
  const count = await Admin.countDocuments()
  return NextResponse.json({ setupRequired: count === 0 })
}

export async function POST(req: NextRequest) {
  try {
    await connectDB()

    const count = await Admin.countDocuments()
    if (count > 0) {
      return NextResponse.json({ error: 'Setup already complete. An admin account already exists.' }, { status: 403 })
    }

    const { name, email, password } = await req.json()

    if (!name || !email || !password) {
      return NextResponse.json({ error: 'Name, email and password are required.' }, { status: 400 })
    }
    if (password.length < 8) {
      return NextResponse.json({ error: 'Password must be at least 8 characters.' }, { status: 400 })
    }

    const hashed = await bcrypt.hash(password, 10)
    await Admin.create({ name, email, password: hashed })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Admin setup error:', error)
    return NextResponse.json({ error: 'Something went wrong.' }, { status: 500 })
  }
}
