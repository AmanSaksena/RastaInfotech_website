import { connectDB } from './mongodb'
import KnowledgeChunk from '../models/KnowledgeChunk'
import { embedQuery } from './embeddings'

function cosineSimilarity(a: number[], b: number[]): number {
  let dot = 0, magA = 0, magB = 0
  for (let i = 0; i < a.length; i++) {
    dot += a[i] * b[i]
    magA += a[i] * a[i]
    magB += b[i] * b[i]
  }
  return dot / (Math.sqrt(magA) * Math.sqrt(magB))
}

export async function retrieveContext(query: string, topK = 4): Promise<string> {
  await connectDB()

  const [queryEmbedding, chunks] = await Promise.all([
    embedQuery(query),
    KnowledgeChunk.find({}, 'title text embedding').lean(),
  ])

  const scored = chunks.map((chunk) => ({
    title: chunk.title,
    text: chunk.text,
    score: cosineSimilarity(queryEmbedding, chunk.embedding),
  }))

  scored.sort((a, b) => b.score - a.score)

  return scored
    .slice(0, topK)
    .map((c) => `### ${c.title}\n${c.text}`)
    .join('\n\n')
}
