import { NextRequest, NextResponse } from 'next/server'
import Groq from 'groq-sdk'
import { retrieveContext } from '@/backend/lib/retrieval'

function getGroqClient() {
  const apiKey = process.env.GROQ_API_KEY
  if (!apiKey) {
    throw new Error('GROQ_API_KEY is not configured')
  }
  return new Groq({ apiKey })
}

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json()

    const latestUserMessage = [...messages].reverse().find((m: { role: string }) => m.role === 'user')?.content ?? ''

    const context = await retrieveContext(latestUserMessage)
    const groq = getGroqClient()

    const completion = await groq.chat.completions.create({
      model: 'llama-3.3-70b-versatile',
      messages: [
        {
          role: 'system',
          content: `You are a helpful assistant for Rasta Infotech, an IT consulting and placement company based in Bangalore, India. Answer questions using ONLY the context provided below. If the answer is not in the context, say you don't have that specific information and suggest contacting the team at info@rastainfotech.com or +91-97425-07066. Be concise, professional, and friendly.

CONTEXT:
${context}`,
        },
        ...messages,
      ],
      max_tokens: 1024,
    })

    const reply = completion.choices[0]?.message?.content ?? 'Sorry, I could not generate a response.'
    return NextResponse.json({ reply })
  } catch (error) {
    console.error('Chat API error:', error)
    return NextResponse.json({ error: 'Something went wrong. Please try again.' }, { status: 500 })
  }
}
