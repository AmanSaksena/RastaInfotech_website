import mongoose, { Schema, Document } from 'mongoose'

export interface ILead extends Document {
  name: string
  email: string
  phone?: string
  createdAt: Date
}

const LeadSchema = new Schema<ILead>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    phone: { type: String, trim: true },
  },
  { timestamps: true }
)

export default mongoose.models.Lead || mongoose.model<ILead>('Lead', LeadSchema)
