import mongoose, { Schema, Document } from 'mongoose'

export interface IJobPosting extends Document {
  title: string
  department: string
  location: string
  type: 'full-time' | 'part-time' | 'internship' | 'contract'
  experience: string
  description: string
  requirements: string[]
  deadline: Date
  isActive: boolean
  createdAt: Date
}

const JobPostingSchema = new Schema<IJobPosting>(
  {
    title: { type: String, required: true, trim: true },
    department: { type: String, required: true, trim: true },
    location: { type: String, required: true, trim: true },
    type: { type: String, enum: ['full-time', 'part-time', 'internship', 'contract'], required: true },
    experience: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    requirements: [{ type: String }],
    deadline: { type: Date, required: true },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
)

export default mongoose.models.JobPosting ||
  mongoose.model<IJobPosting>('JobPosting', JobPostingSchema)
