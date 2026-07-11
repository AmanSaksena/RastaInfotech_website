import mongoose, { Schema, Document } from 'mongoose'

export interface IClient extends Document {
  name: string
  email: string
  password: string
  company: string
  createdAt: Date
}

const ClientSchema = new Schema<IClient>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true, unique: true },
    password: { type: String, required: true },
    company: { type: String, required: true, trim: true },
  },
  { timestamps: true }
)

export default mongoose.models.Client || mongoose.model<IClient>('Client', ClientSchema)
