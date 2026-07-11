import { NextRequest, NextResponse } from 'next/server'
import { connectDB } from '@/backend/lib/mongodb'
import Contact from '@/backend/models/Contact'

const BLOCKED_DOMAINS = [
  'yahoo.com', 'yahoo.co.in', 'yahoo.co.uk', 'hotmail.com', 'hotmail.co.uk',
  'outlook.com', 'live.com', 'live.co.uk', 'msn.com', 'aol.com',
  'icloud.com', 'me.com', 'mac.com', 'protonmail.com', 'proton.me',
  'mail.com', 'zohomail.com', 'yandex.com', 'rediffmail.com',
]

export async function POST(req: NextRequest) {
  try {
    const { name, email, phone, subject, message, source } = await req.json()

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Name, email, and message are required.' }, { status: 400 })
    }

    const emailDomain = email.split('@')[1]?.toLowerCase()
    if (!emailDomain || BLOCKED_DOMAINS.includes(emailDomain)) {
      return NextResponse.json(
        { error: 'Please use your work email or Gmail address to get in touch.' },
        { status: 400 }
      )
    }

    await connectDB()

    await Contact.create({ name, email, phone, subject, message, source: source || 'homepage' })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Contact API error:', error)
    return NextResponse.json({ error: 'Something went wrong. Please try again.' }, { status: 500 })
  }
}
