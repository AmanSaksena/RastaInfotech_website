'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
import AdminShell from '@/components/admin/AdminShell'

interface Stats {
  clients: number
  projects: number
  openTickets: number
  pendingApps: number
  recentTickets: Array<{ _id: string; title: string; priority: string; status: string; clientId: { name: string; company: string } | null; createdAt: string }>
  recentApps: Array<{ _id: string; name: string; position: string; status: string; createdAt: string }>
}

const priorityColors: Record<string, string> = {
  low: 'text-gray-400', medium: 'text-blue-400', high: 'text-orange-400', urgent: 'text-red-400',
}
const statusColors: Record<string, string> = {
  open: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  in_progress: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
  pending: 'bg-gray-500/20 text-gray-400 border-gray-500/30',
  reviewed: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  shortlisted: 'bg-green-500/20 text-green-400 border-green-500/30',
  rejected: 'bg-red-500/20 text-red-400 border-red-500/30',
}

function formatDate(d: string) {
  return new Date(d).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })
}

export default function AdminDashboard() {
  const router = useRouter()
  const [stats, setStats] = useState<Stats | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/admin/stats')
      .then((r) => { if (r.status === 401) { router.push('/admin/login'); return null } return r.json() })
      .then((d) => { if (d) setStats(d) })
      .finally(() => setLoading(false))
  }, [router])

  if (loading) {
    return (
      <AdminShell>
        <div className="flex items-center justify-center h-64">
          <div className="w-10 h-10 rounded-full border-2 border-[#0066FF]/30 border-t-[#0066FF] animate-spin" />
        </div>
      </AdminShell>
    )
  }

  return (
    <AdminShell>
      <div className="mb-8">
        <h1 className="text-3xl font-black text-white mb-1">Dashboard</h1>
        <p className="text-[#8892A4]">Overview of your portal activity</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Total Clients', value: stats?.clients ?? 0, icon: '👥', href: '/admin/clients', color: 'from-[#0066FF] to-[#3385FF]' },
          { label: 'Total Projects', value: stats?.projects ?? 0, icon: '📁', href: '/admin/projects', color: 'from-[#7C3AED] to-[#0066FF]' },
          { label: 'Open Tickets', value: stats?.openTickets ?? 0, icon: '🎫', href: '/admin/tickets', color: 'from-[#DC2626] to-[#7C3AED]' },
          { label: 'Pending Apps', value: stats?.pendingApps ?? 0, icon: '📄', href: '/admin/applications', color: 'from-[#00C896] to-[#0066FF]' },
        ].map((s, i) => (
          <motion.div key={s.label} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}>
            <Link href={s.href} className="block p-5 rounded-2xl border border-white/10 bg-white/5 hover:border-white/20 hover:-translate-y-0.5 transition-all duration-200">
              <div className="text-2xl mb-3">{s.icon}</div>
              <div className={`text-4xl font-black bg-gradient-to-r ${s.color} bg-clip-text text-transparent mb-1`}>{s.value}</div>
              <div className="text-[#8892A4] text-sm">{s.label}</div>
            </Link>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Recent Open Tickets */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-white">Open Tickets</h2>
            <Link href="/admin/tickets" className="text-[#0066FF] text-sm font-semibold hover:text-[#3385FF] transition-colors">View all</Link>
          </div>
          <div className="space-y-3">
            {stats?.recentTickets.length === 0 && (
              <div className="text-center py-10 border border-white/10 rounded-2xl text-[#8892A4] text-sm">No open tickets</div>
            )}
            {stats?.recentTickets.map((t) => (
              <div key={t._id} className="flex items-start gap-3 p-4 rounded-xl border border-white/10 bg-white/5">
                <div className={`mt-1 w-2 h-2 rounded-full shrink-0 ${t.status === 'open' ? 'bg-blue-400' : 'bg-yellow-400'}`} />
                <div className="flex-1 min-w-0">
                  <p className="text-white text-sm font-semibold truncate">{t.title}</p>
                  <p className="text-[#8892A4] text-xs">{t.clientId?.name ?? '—'} · {t.clientId?.company ?? ''}</p>
                </div>
                <div className="text-right shrink-0">
                  <span className={`text-xs font-bold ${priorityColors[t.priority]}`}>{t.priority}</span>
                  <p className="text-[#8892A4] text-xs">{formatDate(t.createdAt)}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Recent Applications */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-white">Recent Applications</h2>
            <Link href="/admin/applications" className="text-[#0066FF] text-sm font-semibold hover:text-[#3385FF] transition-colors">View all</Link>
          </div>
          <div className="space-y-3">
            {stats?.recentApps.length === 0 && (
              <div className="text-center py-10 border border-white/10 rounded-2xl text-[#8892A4] text-sm">No applications yet</div>
            )}
            {stats?.recentApps.map((a) => (
              <div key={a._id} className="flex items-center gap-3 p-4 rounded-xl border border-white/10 bg-white/5">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#0066FF]/30 to-[#00C896]/30 flex items-center justify-center shrink-0">
                  <span className="text-white text-sm font-bold">{a.name.charAt(0)}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-white text-sm font-semibold truncate">{a.name}</p>
                  <p className="text-[#8892A4] text-xs truncate">{a.position}</p>
                </div>
                <div className="text-right shrink-0">
                  <span className={`px-2 py-0.5 rounded-full text-xs font-semibold border capitalize ${statusColors[a.status] || ''}`}>{a.status}</span>
                  <p className="text-[#8892A4] text-xs mt-1">{formatDate(a.createdAt)}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Quick Actions */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="mt-8">
        <h2 className="text-lg font-bold text-white mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { label: 'Add Client', href: '/admin/clients', icon: '➕' },
            { label: 'New Project', href: '/admin/projects', icon: '📁' },
            { label: 'View Tickets', href: '/admin/tickets', icon: '🎫' },
            { label: 'Applications', href: '/admin/applications', icon: '📄' },
          ].map((a) => (
            <Link
              key={a.label}
              href={a.href}
              className="flex items-center gap-3 p-4 rounded-xl border border-white/10 bg-white/5 hover:border-[#0066FF]/30 hover:bg-[#0066FF]/5 transition-all group"
            >
              <span className="text-xl">{a.icon}</span>
              <span className="text-white text-sm font-semibold group-hover:text-[#0066FF] transition-colors">{a.label}</span>
            </Link>
          ))}
        </div>
      </motion.div>
    </AdminShell>
  )
}
