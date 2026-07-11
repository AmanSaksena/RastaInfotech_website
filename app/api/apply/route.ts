import { NextRequest, NextResponse } from 'next/server'
import { connectDB } from '@/backend/lib/mongodb'
import JobApplication from '@/backend/models/JobApplication'

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData()

    const name = formData.get('name') as string
    const email = formData.get('email') as string
    const phone = formData.get('phone') as string
    const position = formData.get('position') as string
    const experience = formData.get('experience') as string
    const linkedIn = formData.get('linkedIn') as string
    const coverLetter = formData.get('coverLetter') as string
    const file = formData.get('resume') as File | null

    if (!name || !email || !phone || !position || !experience || !file) {
      return NextResponse.json({ error: 'All required fields must be filled.' }, { status: 400 })
    }

    if (!file.type.includes('pdf')) {
      return NextResponse.json({ error: 'Resume must be a PDF file.' }, { status: 400 })
    }

    const MAX_SIZE = 5 * 1024 * 1024
    if (file.size > MAX_SIZE) {
      return NextResponse.json({ error: 'Resume must be under 5MB.' }, { status: 400 })
    }

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    await connectDB()

    await JobApplication.create({
      name,
      email,
      phone,
      position,
      experience,
      linkedIn: linkedIn || undefined,
      coverLetter: coverLetter || undefined,
      resume: {
        filename: file.name,
        contentType: file.type,
        data: buffer,
      },
    })

    return NextResponse.json({ success: true, message: 'Application submitted successfully!' })
  } catch (error) {
    console.error('Apply API error:', error)
    return NextResponse.json({ error: 'Something went wrong. Please try again.' }, { status: 500 })
  }
}
