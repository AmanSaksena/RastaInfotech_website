import mongoose, { Schema, Document } from 'mongoose'

export interface ITicketMessage {
  sender: 'client' | 'support'
  message: string
  createdAt: Date
}

export interface ITicket extends Document {
  title: string
  description: string
  clientId: mongoose.Types.ObjectId
  projectId?: mongoose.Types.ObjectId
  status: 'open' | 'in_progress' | 'resolved' | 'closed'
  priority: 'low' | 'medium' | 'high' | 'urgent'
  category: 'bug' | 'feature_request' | 'general' | 'billing' | 'access'
  messages: ITicketMessage[]
  createdAt: Date
}

const TicketMessageSchema = new Schema<ITicketMessage>({
  sender: { type: String, enum: ['client', 'support'], required: true },
  message: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
})

const TicketSchema = new Schema<ITicket>(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    clientId: { type: Schema.Types.ObjectId, ref: 'Client', required: true },
    projectId: { type: Schema.Types.ObjectId, ref: 'Project' },
    status: {
      type: String,
      enum: ['open', 'in_progress', 'resolved', 'closed'],
      default: 'open',
    },
    priority: {
      type: String,
      enum: ['low', 'medium', 'high', 'urgent'],
      default: 'medium',
    },
    category: {
      type: String,
      enum: ['bug', 'feature_request', 'general', 'billing', 'access'],
      default: 'general',
    },
    messages: [TicketMessageSchema],
  },
  { timestamps: true }
)

export default mongoose.models.Ticket || mongoose.model<ITicket>('Ticket', TicketSchema)
