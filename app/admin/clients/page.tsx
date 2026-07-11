'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import AdminShell from '@/components/admin/AdminShell'

interface Client {
  _id: string
  name: string
  email: string
  company: string
  createdAt: string
}

function formatDate(d: string) {
  return new Date(d).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
}

export default function AdminClientsPage() {
  const router = useRouter()
  const [clients, setClients] = useState<Client[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [formState, setFormState] = useState<'idle' | 'submitting' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')
  const [search, setSearch] = useState('')

  useEffect(() => {
    fetch('/api/admin/clients')
      .then((r) => { if (r.status === 401) { router.push('/admin/login'); return null } return r.json() })
      .then((d) => { if (d) setClients(d.clients) })
      .finally(() => setLoading(false))
  }, [router])

  async function handleCreate(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setFormState('submitting')
    setErrorMsg('')

    const form = e.currentTarget
    const body = {
      name: (form.elements.namedItem('name') as HTMLInputElement).value,
      email: (form.elements.namedItem('email') as HTMLInputElement).value,
      company: (form.elements.namedItem('company') as HTMLInputElement).value,
      password: (form.elements.namedItem('password') as HTMLInputElement).value,
    }

    const res = await fetch('/api/admin/clients', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })
    const data = await res.json()

    if (!res.ok) {
      setErrorMsg(data.error || 'Failed to create client.')
      setFormState('error')
      return
    }

    setClients((prev) => [data.client, ...prev])
    setShowForm(false)
    setFormState('idle')
    form.reset()
  }

  const filtered = clients.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase()) ||
      c.company.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <AdminShell>
      <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
        <div>
          <h1 className="text-3xl font-black text-white mb-1">Clients</h1>
          <p className="text-[#8892A4]">{clients.length} total client{clients.length !== 1 ? 's' : ''}</p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm text-white font-bold bg-gradient-to-r from-[#0066FF] to-[#00C896] hover:shadow-lg hover:shadow-[#0066FF]/30 transition-all"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Add Client
        </button>
      </div>

      {/* Search */}
      <div className="mb-6">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by name, email or company..."
          className="w-full max-w-sm px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#0066FF]/50 text-sm transition-all"
        />
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-48">
          <div className="w-10 h-10 rounded-full border-2 border-[#0066FF]/30 border-t-[#0066FF] animate-spin" />
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-16 border border-white/10 rounded-3xl">
          <div className="text-5xl mb-4">👥</div>
          <h3 className="text-xl font-bold text-white mb-2">{search ? 'No results found' : 'No clients yet'}</h3>
          <p className="text-[#8892A4]">{search ? 'Try a different search term.' : 'Add your first client to get started.'}</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((client, i) => (
            <motion.div
              key={client._id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="flex items-center gap-4 p-5 rounded-2xl border border-white/10 bg-white/5 hover:border-white/20 transition-all"
            >
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#0066FF]/30 to-[#00C896]/30 flex items-center justify-center shrink-0">
                <span className="text-white font-black text-lg">{client.name.charAt(0)}</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-white font-bold">{client.name}</p>
                <p className="text-[#8892A4] text-sm">{client.email}</p>
              </div>
              <div className="hidden sm:block text-right shrink-0">
                <p className="text-white text-sm font-semibold">{client.company}</p>
                <p className="text-[#8892A4] text-xs">Joined {formatDate(client.createdAt)}</p>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Create Client Modal */}
      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
            onClick={(e) => e.target === e.currentTarget && setShowForm(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="w-full max-w-md bg-[#0D1F3C] border border-white/10 rounded-3xl overflow-hidden"
            >
              <div className="p-6 border-b border-white/10 flex items-center justify-between">
                <h2 className="text-white text-xl font-black">Create Client Account</h2>
                <button onClick={() => setShowForm(false)} className="text-white/40 hover:text-white p-2 rounded-xl hover:bg-white/10 transition-all">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="p-6">
                <form onSubmit={handleCreate} className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-white/70 mb-2">Full Name *</label>
                    <input name="name" required placeholder="Client Name" className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#0066FF]/50 transition-all" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-white/70 mb-2">Email Address *</label>
                    <input name="email" type="email" required placeholder="client@company.com" className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#0066FF]/50 transition-all" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-white/70 mb-2">Company *</label>
                    <input name="company" required placeholder="Company Ltd" className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#0066FF]/50 transition-all" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-white/70 mb-2">Password * <span className="text-white/40 font-normal">(share this with the client)</span></label>
                    <input name="password" type="text" required placeholder="Set a password for the client" className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#0066FF]/50 transition-all" />
                  </div>

                  {formState === 'error' && (
                    <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm">{errorMsg}</div>
                  )}

                  <div className="flex gap-3 pt-2">
                    <button type="button" onClick={() => setShowForm(false)} className="flex-1 py-3 rounded-xl border border-white/20 text-white/60 hover:text-white transition-all font-semibold">
                      Cancel
                    </button>
                    <button type="submit" disabled={formState === 'submitting'} className="flex-1 py-3 rounded-xl text-white font-bold bg-gradient-to-r from-[#0066FF] to-[#00C896] hover:shadow-lg transition-all disabled:opacity-60 flex items-center justify-center gap-2">
                      {formState === 'submitting' ? (
                        <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>
                      ) : 'Create Client'}
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </AdminShell>
  )
}
