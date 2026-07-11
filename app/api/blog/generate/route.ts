import { NextResponse } from 'next/server'
import Groq from 'groq-sdk'
import { connectDB } from '@/backend/lib/mongodb'
import Blog from '@/backend/models/Blog'

function getGroqClient() {
  const apiKey = process.env.GROQ_API_KEY
  if (!apiKey) {
    throw new Error('GROQ_API_KEY is not configured')
  }
  return new Groq({ apiKey })
}

const IT_TAGS = ['ai', 'cloud', 'devops', 'cybersecurity', 'webdev', 'machinelearning', 'sap', 'automation']

const CATEGORY_MAP: Record<string, string> = {
  ai: 'IT Transformation',
  machinelearning: 'IT Transformation',
  cloud: 'IT Transformation',
  cybersecurity: 'IT Transformation',
  sap: 'IT Transformation',
  devops: 'Automation',
  automation: 'Automation',
  webdev: 'IT Transformation',
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .slice(0, 80)
}

function estimateReadTime(content: string): string {
  const words = content.split(/\s+/).length
  const minutes = Math.ceil(words / 200)
  return `${minutes} min read`
}

interface DevToArticle {
  id: number
  title: string
  description: string
  body_markdown: string
  cover_image: string | null
  social_image: string
  tag_list: string[]
  readable_publish_date: string
  url: string
}

async function fetchDevToArticles(tag: string): Promise<DevToArticle[]> {
  const res = await fetch(
    `https://dev.to/api/articles?tag=${tag}&per_page=3&top=7`,
    { headers: { 'User-Agent': 'RastaInfotech-Blog-Bot/1.0' }, next: { revalidate: 0 } }
  )
  if (!res.ok) return []
  return res.json()
}

async function rewriteWithGroq(article: DevToArticle): Promise<{ title: string; summary: string; content: string; tags: string[] } | null> {
  const sourceText = article.body_markdown
    ? article.body_markdown.slice(0, 3000)
    : article.description

  const prompt = `You are a content writer for Rasta Infotech, an IT consulting and staffing company in India.

Rewrite the following article in Rasta Infotech's professional brand voice. The article should:
- Be informative, authoritative, and engaging
- Relate insights to enterprise IT, digital transformation, or IT careers in India
- Be 400-600 words of high-quality content
- Naturally mention how Rasta Infotech's services (SAP, Cloud, DevOps, AI, Cybersecurity, Recruitment) can help

Source article title: "${article.title}"
Source content: ${sourceText}

Respond ONLY with valid JSON in this exact format (no markdown, no code block):
{
  "title": "compelling article title (max 80 chars)",
  "summary": "2-3 sentence summary for preview cards (max 200 chars)",
  "content": "full article content (400-600 words)",
  "tags": ["tag1", "tag2", "tag3", "tag4"]
}`

  try {
    const groq = getGroqClient()
    const completion = await groq.chat.completions.create({
      model: 'llama-3.3-70b-versatile',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.7,
      max_tokens: 1200,
    })

    const raw = completion.choices[0]?.message?.content?.trim() || ''
    const jsonStart = raw.indexOf('{')
    const jsonEnd = raw.lastIndexOf('}')
    if (jsonStart === -1 || jsonEnd === -1) return null

    return JSON.parse(raw.slice(jsonStart, jsonEnd + 1))
  } catch {
    return null
  }
}

export async function POST() {
  try {
    await connectDB()

    const tag = IT_TAGS[Math.floor(Math.random() * IT_TAGS.length)]
    const articles = await fetchDevToArticles(tag)

    if (!articles.length) {
      return NextResponse.json({ error: 'No articles fetched from Dev.to' }, { status: 502 })
    }

    const created: string[] = []
    const skipped: string[] = []

    for (const article of articles.slice(0, 3)) {
      const category = CATEGORY_MAP[tag] || 'IT Transformation'
      const rewritten = await rewriteWithGroq(article)
      if (!rewritten) { skipped.push(article.title); continue }

      const slug = slugify(rewritten.title) + '-' + Date.now()
      const image = article.cover_image || article.social_image ||
        'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=800&q=80'

      const exists = await Blog.findOne({ title: rewritten.title })
      if (exists) { skipped.push(rewritten.title); continue }

      await Blog.create({
        title: rewritten.title,
        slug,
        summary: rewritten.summary,
        content: rewritten.content,
        category,
        image,
        tags: rewritten.tags,
        author: 'Rasta Infotech Team',
        source: article.url,
        readTime: estimateReadTime(rewritten.content),
        status: 'draft',
      })

      created.push(rewritten.title)
    }

    return NextResponse.json({
      success: true,
      generated: created.length,
      skipped: skipped.length,
      posts: created,
    })
  } catch (error) {
    console.error('Blog generate error:', error)
    return NextResponse.json({ error: 'Generation failed.' }, { status: 500 })
  }
}
