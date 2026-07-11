import mongoose, { Schema, Document } from 'mongoose'

export interface IBlog extends Document {
  title: string
  slug: string
  summary: string
  content: string
  category: string
  image: string
  tags: string[]
  author: string
  source?: string
  readTime: string
  status: 'draft' | 'published'
  publishedAt: Date
  createdAt: Date
  updatedAt: Date
}

const BlogSchema = new Schema<IBlog>(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, trim: true, lowercase: true },
    summary: { type: String, required: true, trim: true },
    content: { type: String, required: true },
    category: { type: String, required: true, default: 'IT Transformation' },
    image: { type: String, default: 'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=800&q=80' },
    tags: [{ type: String }],
    author: { type: String, default: 'Rasta Infotech Team' },
    source: { type: String },
    readTime: { type: String, default: '5 min read' },
    status: { type: String, enum: ['draft', 'published'], default: 'draft' },
    publishedAt: { type: Date },
  },
  { timestamps: true }
)

export default mongoose.models.Blog || mongoose.model<IBlog>('Blog', BlogSchema)
