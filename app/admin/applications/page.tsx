'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import AdminShell from '@/components/admin/AdminShell'

interface Application {
  _id: string
  name: string
  email: string
  phone: string
  position: string
  experience: string
  linkedIn?: string
  coverLetter?: string
  resume: { filename: string; contentType: string }
  status: 'pending' | 'reviewed' | 'shortlisted' | 'offer' | 'rejected'
  createdAt: string
}

const statusColors: Record<string, string> = {
  pending: 'bg-gray-500/20 text-gray-400 border-gray-500/30',
  reviewed: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  shortlisted: 'bg-green-500/20 text-green-400 border-green-500/30',
  offer: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
  rejected: 'bg-red-500/20 text-red-400 border-red-500/30',
}

function formatDate(d: string) {
  return new Date(d).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
}

export default function AdminApplicationsPage() {
  const router = useRouter()
  const [apps, setApps] = useState<Application[]>([])
  const [loading, setLoading] = useState(true)
  const [active, setActive] = useState<Application | null>(null)
  const [filter, setFilter] = useState('all')
  const [updating, setUpdating] = useState(false)

  useEffect(() => {
    fetch('/api/admin/applications')
      .then((r) => { if (r.status === 401) { router.push('/admin/login'); return null } return r.json() })
      .then((d) => { if (d) setApps(d.applications) })
      .finally(() => setLoading(false))
  }, [router])

  async function updateStatus(id: string, status: string) {
    setUpdating(true)
    const res = await fetch(`/api/admin/applications/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    })
    const data = await res.json()
    if (res.ok) {
      setApps((prev) => prev.map((a) => a._id === id ? { ...a, status: data.application.status } : a))
      if (active?._id === id) setActive((prev) => prev ? { ...prev, status: data.application.status } : null)
    }
    setUpdating(false)
  }

  function downloadResume(id: string) {
    window.open(`/api/admin/applications/${id}/resume`, '_blank')
  }

  const filtered = apps.filter((a) => filter === 'all' || a.status === filter)

  return (
    <AdminShell>
      <div className="mb-8">
        <h1 className="text-3xl font-black text-white mb-1">Job Applications</h1>
        <p className="text-[#8892A4]">{apps.length} total application{apps.length !== 1 ? 's' : ''}</p>
      </div>

      {/* Filter tabs */}
      <div className="flex items-center gap-1 p-1 bg-white/5 border border-white/10 rounded-2xl mb-6 w-fit flex-wrap">
        {['all', 'pending', 'reviewed', 'shortlisted', 'offer', 'rejected'].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all capitalize ${filter === f ? 'bg-gradient-to-r from-[#0066FF] to-[#00C896] text-white' : 'text-[#8892A4] hover:text-white'}`}
          >
            {f} {f === 'all' ? `(${apps.length})` : `(${apps.filter(a => a.status === f).length})`}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-48">
          <div className="w-10 h-10 rounded-full border-2 border-[#0066FF]/30 border-t-[#0066FF] animate-spin" />
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-16 border border-white/10 rounded-3xl">
          <div className="text-5xl mb-4">📄</div>
          <h3 className="text-xl font-bold text-white mb-2">No applications</h3>
          <p className="text-[#8892A4]">Applications submitted via the website will appear here.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((app, i) => (
            <motion.div
              key={app._id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04 }}
              className="flex items-center gap-4 p-5 rounded-2xl border border-white/10 bg-white/5 hover:border-white/20 transition-all group"
            >
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#0066FF]/30 to-[#00C896]/30 flex items-center justify-center shrink-0">
                <span className="text-white font-black text-lg">{app.name.charAt(0)}</span>
              </div>
              <div className="flex-1 min-w-0 cursor-pointer" onClick={() => setActive(app)}>
                <p className="text-white font-bold group-hover:text-[#0066FF] transition-colors">{app.name}</p>
                <p className="text-[#8892A4] text-sm">{app.position} · {app.experience}</p>
                <p className="text-[#8892A4] text-xs">{formatDate(app.createdAt)}</p>
              </div>
              <div className="flex items-center gap-3 shrink-0 flex-wrap justify-end">
                <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold border capitalize ${statusColors[app.status]}`}>{app.status}</span>
                <button
                  onClick={() => downloadResume(app._id)}
                  className="p-2 rounded-xl border border-white/20 text-white/60 hover:text-white hover:border-[#0066FF]/50 transition-all"
                  title="Download Resume"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                </button>
                <button onClick={() => setActive(app)} className="p-2 rounded-xl border border-white/20 text-white/60 hover:text-white transition-all" title="View Details">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Application Detail Modal */}
      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-end sm:items-center justify-center sm:p-4 bg-black/70 backdrop-blur-sm"
            onClick={(e) => e.target === e.currentTarget && setActive(null)}
          >
            <motion.div
              initial={{ y: 60, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 60, opacity: 0 }}
              className="w-full sm:max-w-xl bg-[#0D1F3C] border border-white/10 rounded-t-3xl sm:rounded-3xl overflow-hidden max-h-[90vh] overflow-y-auto"
            >
              <div className="p-6 border-b border-white/10 flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-white font-black text-xl">{active.name}</h2>
                  <p className="text-[#8892A4]">{active.position}</p>
                </div>
                <button onClick={() => setActive(null)} className="text-white/40 hover:text-white p-2 rounded-xl hover:bg-white/10 transition-all shrink-0">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
              </div>

              <div className="p-6 space-y-5">
                {/* Info Grid */}
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { label: 'Email', value: active.email },
                    { label: 'Phone', value: active.phone },
                    { label: 'Experience', value: active.experience },
                    { label: 'Applied', value: formatDate(active.createdAt) },
                  ].map((item) => (
                    <div key={item.label} className="p-3 rounded-xl bg-white/5 border border-white/10">
                      <p className="text-[#8892A4] text-xs mb-1">{item.label}</p>
                      <p className="text-white text-sm font-semibold">{item.value}</p>
                    </div>
                  ))}
                </div>

                {active.linkedIn && (
                  <div>
                    <p className="text-[#8892A4] text-xs mb-1">LinkedIn</p>
                    <a href={active.linkedIn} target="_blank" rel="noopener noreferrer" className="text-[#0066FF] text-sm hover:text-[#3385FF] transition-colors break-all">{active.linkedIn}</a>
                  </div>
                )}

                {active.coverLetter && (
                  <div>
                    <p className="text-[#8892A4] text-xs mb-2">Cover Letter</p>
                    <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-white text-sm leading-relaxed">{active.coverLetter}</div>
                  </div>
                )}

                {/* Resume download */}
                <button
                  onClick={() => downloadResume(active._id)}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl border border-[#0066FF]/30 text-[#0066FF] hover:bg-[#0066FF]/10 transition-all font-semibold text-sm"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  Download Resume ({active.resume.filename})
                </button>

                {/* Status update */}
                <div>
                  <p className="text-[#8892A4] text-sm font-semibold mb-3">Update Application Status</p>
                  <div className="grid grid-cols-2 gap-2">
                    {(['pending', 'reviewed', 'shortlisted', 'offer', 'rejected'] as const).map((s) => (
                      <button
                        key={s}
                        onClick={() => updateStatus(active._id, s)}
                        disabled={updating || active.status === s}
                        className={`py-2.5 rounded-xl text-sm font-bold capitalize transition-all border ${
                          active.status === s
                            ? statusColors[s] + ' cursor-default'
                            : 'border-white/20 text-white/60 hover:text-white hover:border-white/40'
                        } disabled:cursor-not-allowed`}
                      >
                        {active.status === s ? '✓ ' : ''}{s}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </AdminShell>
  )
}
