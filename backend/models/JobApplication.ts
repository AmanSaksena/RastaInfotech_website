import mongoose, { Schema, Document } from 'mongoose'

export interface IJobApplication extends Document {
  name: string
  email: string
  phone: string
  position: string
  experience: string
  linkedIn?: string
  coverLetter?: string
  resume: {
    filename: string
    contentType: string
    data: Buffer
  }
  status: 'pending' | 'reviewed' | 'shortlisted' | 'offer' | 'rejected'
  createdAt: Date
}

const JobApplicationSchema = new Schema<IJobApplication>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    phone: { type: String, required: true, trim: true },
    position: { type: String, required: true, trim: true },
    experience: { type: String, required: true, trim: true },
    linkedIn: { type: String, trim: true },
    coverLetter: { type: String, trim: true },
    resume: {
      filename: { type: String, required: true },
      contentType: { type: String, required: true },
      data: { type: Buffer, required: true },
    },
    status: {
      type: String,
      enum: ['pending', 'reviewed', 'shortlisted', 'offer', 'rejected'],
      default: 'pending',
    },
  },
  { timestamps: true }
)

export default mongoose.models.JobApplication ||
  mongoose.model<IJobApplication>('JobApplication', JobApplicationSchema)
