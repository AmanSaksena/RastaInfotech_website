import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { connectDB } from '@/backend/lib/mongodb'
import Client from '@/backend/models/Client'

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
  const clients = await Client.find().sort({ createdAt: -1 }).select('-password').lean()
  return NextResponse.json({ clients })
}

export async function POST(req: NextRequest) {
  if (!getAdminId(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  try {
    const { name, email, company, password } = await req.json()
    if (!name || !email || !company || !password) {
      return NextResponse.json({ error: 'All fields are required.' }, { status: 400 })
    }
    await connectDB()
    const existing = await Client.findOne({ email: email.toLowerCase() })
    if (existing) return NextResponse.json({ error: 'A client with this email already exists.' }, { status: 409 })
    const hashed = await bcrypt.hash(password, 10)
    const client = await Client.create({ name, email, company, password: hashed })
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _pw, ...safe } = client.toObject()
    return NextResponse.json({ success: true, client: safe })
  } catch (error) {
    console.error('Create client error:', error)
    return NextResponse.json({ error: 'Something went wrong.' }, { status: 500 })
  }
}
