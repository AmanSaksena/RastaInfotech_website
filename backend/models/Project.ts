import mongoose, { Schema, Document } from 'mongoose'

export interface IDeliverable {
  title: string
  description: string
  status: 'pending' | 'in_progress' | 'completed'
  dueDate?: Date
}

export interface IProject extends Document {
  title: string
  description: string
  clientId: mongoose.Types.ObjectId
  status: 'planning' | 'in_progress' | 'review' | 'completed' | 'on_hold'
  progress: number
  startDate: Date
  deadline: Date
  deliverables: IDeliverable[]
  techStack: string[]
  createdAt: Date
}

const DeliverableSchema = new Schema<IDeliverable>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  status: { type: String, enum: ['pending', 'in_progress', 'completed'], default: 'pending' },
  dueDate: { type: Date },
})

const ProjectSchema = new Schema<IProject>(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    clientId: { type: Schema.Types.ObjectId, ref: 'Client', required: true },
    status: {
      type: String,
      enum: ['planning', 'in_progress', 'review', 'completed', 'on_hold'],
      default: 'planning',
    },
    progress: { type: Number, min: 0, max: 100, default: 0 },
    startDate: { type: Date, required: true },
    deadline: { type: Date, required: true },
    deliverables: [DeliverableSchema],
    techStack: [{ type: String }],
  },
  { timestamps: true }
)

export default mongoose.models.Project || mongoose.model<IProject>('Project', ProjectSchema)
