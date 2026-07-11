'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import AdminShell from '@/components/admin/AdminShell'

interface TicketMessage { sender: 'client' | 'support'; message: string; createdAt: string }
interface Ticket {
  _id: string
  title: string
  description: string
  status: 'open' | 'in_progress' | 'resolved' | 'closed'
  priority: 'low' | 'medium' | 'high' | 'urgent'
  category: string
  clientId: { name: string; company: string; email: string } | null
  projectId: { title: string } | null
  messages: TicketMessage[]
  createdAt: string
}

const statusColors: Record<string, string> = {
  open: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  in_progress: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
  resolved: 'bg-green-500/20 text-green-400 border-green-500/30',
  closed: 'bg-gray-500/20 text-gray-400 border-gray-500/30',
}
const priorityColors: Record<string, string> = {
  low: 'text-gray-400', medium: 'text-blue-400', high: 'text-orange-400', urgent: 'text-red-400',
}

function formatDate(d: string) {
  return new Date(d).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })
}

export default function AdminTicketsPage() {
  const router = useRouter()
  const [tickets, setTickets] = useState<Ticket[]>([])
  const [loading, setLoading] = useState(true)
  const [activeTicket, setActiveTicket] = useState<Ticket | null>(null)
  const [reply, setReply] = useState('')
  const [newStatus, setNewStatus] = useState('')
  const [saving, setSaving] = useState(false)
  const [filter, setFilter] = useState<string>('all')

  useEffect(() => {
    fetch('/api/admin/tickets')
      .then((r) => { if (r.status === 401) { router.push('/admin/login'); return null } return r.json() })
      .then((d) => { if (d) setTickets(d.tickets) })
      .finally(() => setLoading(false))
  }, [router])

  function openTicket(t: Ticket) {
    setActiveTicket(t)
    setNewStatus(t.status)
    setReply('')
  }

  async function handleUpdate() {
    if (!activeTicket) return
    setSaving(true)
    const res = await fetch(`/api/admin/tickets/${activeTicket._id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: newStatus, reply: reply.trim() || undefined }),
    })
    const data = await res.json()
    if (res.ok) {
      setTickets((prev) => prev.map((t) => t._id === activeTicket._id ? data.ticket : t))
      setActiveTicket(data.ticket)
      setReply('')
    }
    setSaving(false)
  }

  const filtered = tickets.filter((t) => filter === 'all' || t.status === filter)

  return (
    <AdminShell>
      <div className="mb-8">
        <h1 className="text-3xl font-black text-white mb-1">Support Tickets</h1>
        <p className="text-[#8892A4]">{tickets.length} total ticket{tickets.length !== 1 ? 's' : ''}</p>
      </div>

      {/* Filter tabs */}
      <div className="flex items-center gap-1 p-1 bg-white/5 border border-white/10 rounded-2xl mb-6 w-fit flex-wrap">
        {['all', 'open', 'in_progress', 'resolved', 'closed'].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all capitalize ${filter === f ? 'bg-gradient-to-r from-[#0066FF] to-[#00C896] text-white' : 'text-[#8892A4] hover:text-white'}`}
          >
            {f.replace(/_/g, ' ')} {f === 'all' ? `(${tickets.length})` : `(${tickets.filter(t => t.status === f).length})`}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-48">
          <div className="w-10 h-10 rounded-full border-2 border-[#0066FF]/30 border-t-[#0066FF] animate-spin" />
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-16 border border-white/10 rounded-3xl">
          <div className="text-5xl mb-4">🎫</div>
          <h3 className="text-xl font-bold text-white mb-2">No tickets</h3>
          <p className="text-[#8892A4]">No tickets in this category yet.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((ticket, i) => (
            <motion.div
              key={ticket._id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04 }}
              onClick={() => openTicket(ticket)}
              className="flex items-start gap-4 p-5 rounded-2xl border border-white/10 bg-white/5 hover:border-[#0066FF]/30 hover:bg-[#0066FF]/5 cursor-pointer transition-all group"
            >
              <div className={`mt-1 w-2.5 h-2.5 rounded-full shrink-0 ${ticket.status === 'open' ? 'bg-blue-400' : ticket.status === 'in_progress' ? 'bg-yellow-400' : ticket.status === 'resolved' ? 'bg-green-400' : 'bg-gray-400'}`} />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  <p className="text-white font-bold group-hover:text-[#0066FF] transition-colors">{ticket.title}</p>
                  <span className={`px-2 py-0.5 rounded-full text-xs font-semibold border ${statusColors[ticket.status]}`}>{ticket.status.replace(/_/g, ' ')}</span>
                  <span className={`text-xs font-bold capitalize ${priorityColors[ticket.priority]}`}>{ticket.priority}</span>
                </div>
                <p className="text-[#8892A4] text-sm line-clamp-1">{ticket.description}</p>
                <div className="flex gap-3 mt-1 text-xs text-[#8892A4] flex-wrap">
                  <span>👤 {ticket.clientId?.name ?? '—'} · {ticket.clientId?.company ?? ''}</span>
                  {ticket.projectId && <span>📁 {ticket.projectId.title}</span>}
                  <span>🕐 {formatDate(ticket.createdAt)}</span>
                  <span>💬 {ticket.messages.length} message{ticket.messages.length !== 1 ? 's' : ''}</span>
                </div>
              </div>
              <svg className="w-4 h-4 text-white/30 group-hover:text-[#0066FF] shrink-0 mt-1 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </motion.div>
          ))}
        </div>
      )}

      {/* Ticket Detail Panel */}
      <AnimatePresence>
        {activeTicket && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-end sm:items-center justify-center sm:p-4 bg-black/70 backdrop-blur-sm"
            onClick={(e) => e.target === e.currentTarget && setActiveTicket(null)}
          >
            <motion.div
              initial={{ y: 60, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 60, opacity: 0 }}
              className="w-full sm:max-w-2xl bg-[#0D1F3C] border border-white/10 rounded-t-3xl sm:rounded-3xl overflow-hidden max-h-[90vh] flex flex-col"
            >
              {/* Header */}
              <div className="p-5 border-b border-white/10 flex items-start justify-between gap-4 shrink-0">
                <div>
                  <h2 className="text-white font-black text-lg">{activeTicket.title}</h2>
                  <p className="text-[#8892A4] text-sm">{activeTicket.clientId?.name} · {activeTicket.clientId?.company}</p>
                </div>
                <button onClick={() => setActiveTicket(null)} className="text-white/40 hover:text-white p-2 rounded-xl hover:bg-white/10 transition-all shrink-0">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-5 space-y-3">
                {activeTicket.messages.map((msg, i) => (
                  <div key={i} className={`flex ${msg.sender === 'support' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[80%] p-3 rounded-2xl text-sm ${msg.sender === 'support' ? 'bg-gradient-to-r from-[#0066FF]/30 to-[#00C896]/20 text-white border border-[#0066FF]/20' : 'bg-white/10 text-white border border-white/10'}`}>
                      <p className={`text-xs font-semibold mb-1 ${msg.sender === 'support' ? 'text-[#00C896]' : 'text-[#8892A4]'}`}>
                        {msg.sender === 'support' ? 'Support Team' : activeTicket.clientId?.name ?? 'Client'}
                      </p>
                      <p className="leading-relaxed">{msg.message}</p>
                      <p className="text-white/30 text-xs mt-1">{formatDate(msg.createdAt)}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Reply & Status */}
              <div className="p-5 border-t border-white/10 space-y-3 shrink-0">
                <div className="flex gap-3">
                  <div className="flex-1">
                    <label className="block text-xs font-semibold text-white/50 mb-1">Update Status</label>
                    <select value={newStatus} onChange={(e) => setNewStatus(e.target.value)} className="w-full px-3 py-2 rounded-xl bg-[#0D1F3C] border border-white/10 text-white text-sm focus:outline-none focus:border-[#0066FF]/50 transition-all">
                      <option value="open">Open</option>
                      <option value="in_progress">In Progress</option>
                      <option value="resolved">Resolved</option>
                      <option value="closed">Closed</option>
                    </select>
                  </div>
                </div>
                <textarea
                  value={reply}
                  onChange={(e) => setReply(e.target.value)}
                  rows={3}
                  placeholder="Type a reply to the client..."
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#0066FF]/50 transition-all resize-none text-sm"
                />
                <button
                  onClick={handleUpdate}
                  disabled={saving}
                  className="w-full py-3 rounded-xl text-white font-bold bg-gradient-to-r from-[#0066FF] to-[#00C896] hover:shadow-lg transition-all disabled:opacity-60 flex items-center justify-center gap-2"
                >
                  {saving ? <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg> : 'Save & Reply'}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </AdminShell>
  )
}
