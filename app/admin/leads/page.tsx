'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import AdminShell from '@/components/admin/AdminShell'

interface Lead {
  _id: string
  name: string
  email: string
  phone?: string
  createdAt: string
}

function formatDate(d: string) {
  return new Date(d).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })
}

export default function AdminLeadsPage() {
  const router = useRouter()
  const [leads, setLeads] = useState<Lead[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/admin/leads')
      .then((r) => { if (r.status === 401) { router.push('/admin/login'); return null } return r.json() })
      .then((d) => { if (d) setLeads(d.leads) })
      .finally(() => setLoading(false))
  }, [router])

  return (
    <AdminShell>
      <div className="mb-8">
        <h1 className="text-3xl font-black text-white mb-1">Leads</h1>
        <p className="text-[#8892A4]">Visitors who requested a free consultation</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <div className="p-5 rounded-2xl border border-white/10 bg-white/5">
          <p className="text-3xl font-black bg-gradient-to-r from-[#0066FF] to-[#00C896] bg-clip-text text-transparent">{leads.length}</p>
          <p className="text-[#8892A4] text-sm mt-1">Total Leads</p>
        </div>
        <div className="p-5 rounded-2xl border border-white/10 bg-white/5">
          <p className="text-3xl font-black bg-gradient-to-r from-[#0066FF] to-[#00C896] bg-clip-text text-transparent">
            {leads.filter((l) => {
              const d = new Date(l.createdAt)
              const now = new Date()
              return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear()
            }).length}
          </p>
          <p className="text-[#8892A4] text-sm mt-1">This Month</p>
        </div>
        <div className="p-5 rounded-2xl border border-white/10 bg-white/5">
          <p className="text-3xl font-black bg-gradient-to-r from-[#0066FF] to-[#00C896] bg-clip-text text-transparent">
            {leads.filter((l) => l.phone).length}
          </p>
          <p className="text-[#8892A4] text-sm mt-1">With Phone</p>
        </div>
      </div>

      {/* Table */}
      <div className="rounded-2xl border border-white/10 bg-white/5 overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center h-48">
            <div className="w-8 h-8 rounded-full border-2 border-[#0066FF]/30 border-t-[#0066FF] animate-spin" />
          </div>
        ) : leads.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-48 text-center px-4">
            <p className="text-4xl mb-3">📭</p>
            <p className="text-white font-bold">No leads yet</p>
            <p className="text-[#8892A4] text-sm mt-1">Leads will appear here once visitors submit the consultation form.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  {['Name', 'Email', 'Phone', 'Date'].map((h) => (
                    <th key={h} className="px-5 py-4 text-left text-xs font-semibold text-[#8892A4] uppercase tracking-wide">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {leads.map((lead) => (
                  <tr key={lead._id} className="hover:bg-white/5 transition-colors duration-150">
                    <td className="px-5 py-4 text-white text-sm font-semibold">{lead.name}</td>
                    <td className="px-5 py-4">
                      <a href={`mailto:${lead.email}`} className="text-[#0066FF] text-sm hover:text-white transition-colors">
                        {lead.email}
                      </a>
                    </td>
                    <td className="px-5 py-4 text-[#8892A4] text-sm">{lead.phone || '—'}</td>
                    <td className="px-5 py-4 text-[#8892A4] text-xs">{formatDate(lead.createdAt)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </AdminShell>
  )
}
