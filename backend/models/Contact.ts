import mongoose, { Schema, Document } from 'mongoose'

export interface IContact extends Document {
  name: string
  email: string
  phone?: string
  subject?: string
  message: string
  source: 'homepage' | 'contact-page' | 'lead_popup' | 'newsletter'
  createdAt: Date
}

const ContactSchema = new Schema<IContact>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    phone: { type: String, trim: true },
    subject: { type: String, trim: true },
    message: { type: String, required: true, trim: true },
    source: { type: String, enum: ['homepage', 'contact-page', 'lead_popup', 'newsletter'], default: 'homepage' },
  },
  { timestamps: true }
)

export default mongoose.models.Contact || mongoose.model<IContact>('Contact', ContactSchema)
