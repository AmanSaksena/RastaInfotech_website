import { NextRequest, NextResponse } from 'next/server'
import { connectDB } from '@/backend/lib/mongodb'
import Blog from '@/backend/models/Blog'

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connectDB()
    const body = await req.json()
    const update: Record<string, unknown> = { ...body }

    if (body.status === 'published') {
      update.publishedAt = new Date()
    }

    const post = await Blog.findByIdAndUpdate(params.id, update, { new: true })
    if (!post) return NextResponse.json({ error: 'Post not found.' }, { status: 404 })

    return NextResponse.json({ post })
  } catch (error) {
    console.error('Blog PATCH error:', error)
    return NextResponse.json({ error: 'Failed to update post.' }, { status: 500 })
  }
}

export async function DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connectDB()
    const post = await Blog.findByIdAndDelete(params.id)
    if (!post) return NextResponse.json({ error: 'Post not found.' }, { status: 404 })
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Blog DELETE error:', error)
    return NextResponse.json({ error: 'Failed to delete post.' }, { status: 500 })
  }
}
