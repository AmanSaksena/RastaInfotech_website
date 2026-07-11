import mongoose, { Schema, Document } from 'mongoose'

export interface IKnowledgeChunk extends Document {
  title: string
  category: string
  text: string
  embedding: number[]
}

const KnowledgeChunkSchema = new Schema<IKnowledgeChunk>({
  title: { type: String, required: true },
  category: { type: String, required: true },
  text: { type: String, required: true },
  embedding: { type: [Number], required: true },
})

export default mongoose.models.KnowledgeChunk ||
  mongoose.model<IKnowledgeChunk>('KnowledgeChunk', KnowledgeChunkSchema)
