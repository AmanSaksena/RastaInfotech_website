import { NextRequest, NextResponse } from 'next/server'
import { connectDB } from '@/backend/lib/mongodb'
import Blog from '@/backend/models/Blog'

export async function GET(req: NextRequest) {
  try {
    await connectDB()
    const { searchParams } = new URL(req.url)
    const status = searchParams.get('status') || 'published'
    const limit = parseInt(searchParams.get('limit') || '20')
    const category = searchParams.get('category')

    const query: Record<string, unknown> = { status }
    if (category && category !== 'All') query.category = category

    const posts = await Blog.find(query)
      .sort({ publishedAt: -1, createdAt: -1 })
      .limit(limit)
      .lean()

    return NextResponse.json({ posts })
  } catch (error) {
    console.error('Blog GET error:', error)
    return NextResponse.json({ error: 'Failed to fetch posts.' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectDB()
    const body = await req.json()
    const { title, slug, summary, content, category, image, tags, author, source, readTime, status } = body

    if (!title || !slug || !summary || !content) {
      return NextResponse.json({ error: 'title, slug, summary, and content are required.' }, { status: 400 })
    }

    const post = await Blog.create({
      title, slug, summary, content, category, image, tags, author, source, readTime,
      status: status || 'draft',
      publishedAt: status === 'published' ? new Date() : undefined,
    })

    return NextResponse.json({ post }, { status: 201 })
  } catch (error: unknown) {
    if ((error as { code?: number }).code === 11000) {
      return NextResponse.json({ error: 'A post with this slug already exists.' }, { status: 409 })
    }
    console.error('Blog POST error:', error)
    return NextResponse.json({ error: 'Failed to create post.' }, { status: 500 })
  }
}
