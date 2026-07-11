import { NextResponse } from 'next/server'
import { connectDB } from '@/backend/lib/mongodb'
import KnowledgeChunk from '@/backend/models/KnowledgeChunk'
import { embedTexts } from '@/backend/lib/embeddings'
import { knowledgeBase } from '@/backend/data/knowledgeBase'

export async function POST() {
  try {
    await connectDB()

    const existing = await KnowledgeChunk.countDocuments()
    if (existing > 0) {
      await KnowledgeChunk.deleteMany({})
    }

    const texts = knowledgeBase.map((c) => c.text)
    const embeddings = await embedTexts(texts)

    const docs = knowledgeBase.map((chunk, i) => ({
      title: chunk.title,
      category: chunk.category,
      text: chunk.text,
      embedding: embeddings[i],
    }))

    await KnowledgeChunk.insertMany(docs)

    return NextResponse.json({ success: true, count: docs.length })
  } catch (error) {
    console.error('Ingest error:', error)
    return NextResponse.json({ error: 'Ingestion failed' }, { status: 500 })
  }
}
