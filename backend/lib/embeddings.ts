import { CohereClient } from 'cohere-ai'

function getCohereClient() {
  const token = process.env.COHERE_API_KEY
  if (!token) {
    throw new Error('COHERE_API_KEY is not configured')
  }
  return new CohereClient({ token })
}

export async function embedTexts(texts: string[]): Promise<number[][]> {
  const cohere = getCohereClient()
  const response = await cohere.embed({
    texts,
    model: 'embed-english-light-v3.0',
    inputType: 'search_document',
    embeddingTypes: ['float'],
  })
  return (response.embeddings as { float: number[][] }).float
}

export async function embedQuery(query: string): Promise<number[]> {
  const cohere = getCohereClient()
  const response = await cohere.embed({
    texts: [query],
    model: 'embed-english-light-v3.0',
    inputType: 'search_query',
    embeddingTypes: ['float'],
  })
  return ((response.embeddings as { float: number[][] }).float)[0]
}
