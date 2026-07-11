'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import AdminShell from '@/components/admin/AdminShell'

interface JobPosting {
  _id: string
  title: string
  department: string
  location: string
  type: string
  experience: string
  description: string
  requirements: string[]
  deadline: string
  isActive: boolean
  createdAt: string
}

const typeColors: Record<string, string> = {
  'full-time': 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  'part-time': 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
  'internship': 'bg-purple-500/20 text-purple-400 border-purple-500/30',
  'contract': 'bg-orange-500/20 text-orange-400 border-orange-500/30',
}

const DEPARTMENTS = ['Engineering', 'Sales', 'Marketing', 'HR', 'Finance', 'Operations', 'Design', 'Support', 'Other']

const emptyForm = {
  title: '', department: '', location: '', type: 'full-time',
  experience: '', description: '', requirements: '', deadline: '',
}

function formatDate(d: string) {
  return new Date(d).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
}

export default function AdminJobsPage() {
  const router = useRouter()
  const [jobs, setJobs] = useState<JobPosting[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState(emptyForm)
  const [saving, setSaving] = useState(false)
  const [formError, setFormError] = useState('')
  const [deleteId, setDeleteId] = useState<string | null>(null)

  useEffect(() => {
    fetch('/api/admin/jobs')
      .then((r) => { if (r.status === 401) { router.push('/admin/login'); return null } return r.json() })
      .then((d) => { if (d) setJobs(d.jobs) })
      .finally(() => setLoading(false))
  }, [router])

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault()
    setFormError('')
    setSaving(true)
    try {
      const res = await fetch('/api/admin/jobs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          requirements: form.requirements.split('\n').map((r) => r.trim()).filter(Boolean),
        }),
      })
      const data = await res.json()
      if (!res.ok) { setFormError(data.error || 'Failed to create.'); return }
      setJobs((prev) => [data.job, ...prev])
      setForm(emptyForm)
      setShowForm(false)
    } catch {
      setFormError('Network error. Please try again.')
    } finally {
      setSaving(false)
    }
  }

  async function toggleActive(job: JobPosting) {
    const res = await fetch(`/api/admin/jobs/${job._id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ isActive: !job.isActive }),
    })
    if (res.ok) {
      setJobs((prev) => prev.map((j) => j._id === job._id ? { ...j, isActive: !j.isActive } : j))
    }
  }

  async function handleDelete(id: string) {
    const res = await fetch(`/api/admin/jobs/${id}`, { method: 'DELETE' })
    if (res.ok) {
      setJobs((prev) => prev.filter((j) => j._id !== id))
      setDeleteId(null)
    }
  }

  const active = jobs.filter((j) => j.isActive).length
  const expired = jobs.filter((j) => new Date(j.deadline) < new Date()).length

  return (
    <AdminShell>
      <div className="mb-8 flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-3xl font-black text-white mb-1">Job Postings</h1>
          <p className="text-[#8892A4]">Manage open vacancies visible on the Careers page</p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#0066FF] to-[#00C896] text-white font-bold text-sm"
        >
          <span className="text-lg leading-none">+</span> Post a Job
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        {[
          { label: 'Total Postings', value: jobs.length },
          { label: 'Active', value: active },
          { label: 'Expired / Closed', value: expired },
        ].map((s) => (
          <div key={s.label} className="p-5 rounded-2xl border border-white/10 bg-white/5">
            <p className="text-3xl font-black bg-gradient-to-r from-[#0066FF] to-[#00C896] bg-clip-text text-transparent">{s.value}</p>
            <p className="text-[#8892A4] text-sm mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Job List */}
      {loading ? (
        <div className="flex items-center justify-center h-48">
          <div className="w-10 h-10 rounded-full border-2 border-[#0066FF]/30 border-t-[#0066FF] animate-spin" />
        </div>
      ) : jobs.length === 0 ? (
        <div className="text-center py-20 border border-white/10 rounded-3xl">
          <div className="text-5xl mb-4">💼</div>
          <h3 className="text-xl font-bold text-white mb-2">No job postings yet</h3>
          <p className="text-[#8892A4] mb-6">Click &quot;Post a Job&quot; to add your first vacancy.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {jobs.map((job, i) => {
            const isExpired = new Date(job.deadline) < new Date()
            return (
              <motion.div
                key={job._id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.04 }}
                className={`p-5 rounded-2xl border bg-white/5 transition-all ${job.isActive && !isExpired ? 'border-white/10' : 'border-white/5 opacity-60'}`}
              >
                <div className="flex items-start justify-between gap-4 flex-wrap">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <h3 className="text-white font-bold text-lg">{job.title}</h3>
                      <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold border capitalize ${typeColors[job.type]}`}>{job.type}</span>
                      {isExpired && <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-red-500/20 text-red-400 border border-red-500/30">Expired</span>}
                      {!job.isActive && !isExpired && <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-gray-500/20 text-gray-400 border border-gray-500/30">Inactive</span>}
                    </div>
                    <div className="flex items-center gap-4 text-sm text-[#8892A4] flex-wrap">
                      <span>🏢 {job.department}</span>
                      <span>📍 {job.location}</span>
                      <span>⏱ {job.experience}</span>
                      <span>📅 Deadline: {formatDate(job.deadline)}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => toggleActive(job)}
                      className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all ${
                        job.isActive
                          ? 'border-[#00C896]/40 text-[#00C896] hover:bg-[#00C896]/10'
                          : 'border-white/20 text-[#8892A4] hover:text-white hover:border-white/40'
                      }`}
                    >
                      {job.isActive ? 'Active' : 'Inactive'}
                    </button>
                    <button
                      onClick={() => setDeleteId(job._id)}
                      className="px-4 py-2 rounded-xl text-xs font-bold border border-red-500/30 text-red-400 hover:bg-red-500/10 transition-all"
                    >
                      Delete
                    </button>
                  </div>
                </div>
                {job.requirements.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {job.requirements.slice(0, 4).map((r, idx) => (
                      <span key={idx} className="px-2.5 py-1 rounded-lg bg-white/5 text-[#8892A4] text-xs border border-white/10">{r}</span>
                    ))}
                    {job.requirements.length > 4 && (
                      <span className="px-2.5 py-1 rounded-lg bg-white/5 text-[#8892A4] text-xs border border-white/10">+{job.requirements.length - 4} more</span>
                    )}
                  </div>
                )}
              </motion.div>
            )
          })}
        </div>
      )}

      {/* Create Job Modal */}
      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
            onClick={(e) => { if (e.target === e.currentTarget) setShowForm(false) }}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-[#0D1F3C] border border-white/10 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between p-6 border-b border-white/10 sticky top-0 bg-[#0D1F3C] z-10">
                <h2 className="text-xl font-black text-white">Post a New Job</h2>
                <button onClick={() => setShowForm(false)} className="text-[#8892A4] hover:text-white text-2xl leading-none">×</button>
              </div>

              <form onSubmit={handleCreate} className="p-6 space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-[#8892A4] mb-2 uppercase tracking-wide">Job Title *</label>
                    <input
                      required value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })}
                      placeholder="e.g. Senior SAP Consultant"
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-[#8892A4] focus:outline-none focus:border-[#0066FF]/50 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#8892A4] mb-2 uppercase tracking-wide">Department *</label>
                    <select
                      required value={form.department} onChange={(e) => setForm({ ...form, department: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-[#0066FF]/50 text-sm"
                    >
                      <option value="">Select department</option>
                      {DEPARTMENTS.map((d) => <option key={d} value={d}>{d}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#8892A4] mb-2 uppercase tracking-wide">Location *</label>
                    <input
                      required value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })}
                      placeholder="e.g. Bangalore / Remote"
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-[#8892A4] focus:outline-none focus:border-[#0066FF]/50 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#8892A4] mb-2 uppercase tracking-wide">Job Type *</label>
                    <select
                      required value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-[#0066FF]/50 text-sm"
                    >
                      <option value="full-time">Full-time</option>
                      <option value="part-time">Part-time</option>
                      <option value="internship">Internship</option>
                      <option value="contract">Contract</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#8892A4] mb-2 uppercase tracking-wide">Experience Required *</label>
                    <input
                      required value={form.experience} onChange={(e) => setForm({ ...form, experience: e.target.value })}
                      placeholder="e.g. 2–4 years"
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-[#8892A4] focus:outline-none focus:border-[#0066FF]/50 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#8892A4] mb-2 uppercase tracking-wide">Application Deadline *</label>
                    <input
                      type="date" required value={form.deadline} onChange={(e) => setForm({ ...form, deadline: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-[#0066FF]/50 text-sm"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-[#8892A4] mb-2 uppercase tracking-wide">Job Description *</label>
                    <textarea
                      required rows={4} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })}
                      placeholder="Describe the role, responsibilities, and what success looks like..."
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-[#8892A4] focus:outline-none focus:border-[#0066FF]/50 text-sm resize-none"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-[#8892A4] mb-2 uppercase tracking-wide">Requirements (one per line)</label>
                    <textarea
                      rows={4} value={form.requirements} onChange={(e) => setForm({ ...form, requirements: e.target.value })}
                      placeholder={"B.Tech in Computer Science\nSAP certification preferred\nStrong communication skills"}
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-[#8892A4] focus:outline-none focus:border-[#0066FF]/50 text-sm resize-none"
                    />
                  </div>
                </div>

                {formError && <p className="text-red-400 text-sm">{formError}</p>}

                <div className="flex gap-3 pt-2">
                  <button
                    type="button" onClick={() => setShowForm(false)}
                    className="flex-1 py-3 rounded-xl border border-white/20 text-[#8892A4] font-bold text-sm hover:text-white hover:border-white/40 transition-all"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit" disabled={saving}
                    className="flex-1 py-3 rounded-xl bg-gradient-to-r from-[#0066FF] to-[#00C896] text-white font-bold text-sm disabled:opacity-50"
                  >
                    {saving ? 'Posting…' : 'Post Job'}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Delete Confirm Modal */}
      <AnimatePresence>
        {deleteId && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.95 }} animate={{ scale: 1 }} exit={{ scale: 0.95 }}
              className="bg-[#0D1F3C] border border-white/10 rounded-2xl p-8 max-w-sm w-full text-center"
            >
              <div className="text-4xl mb-4">🗑️</div>
              <h3 className="text-white font-black text-xl mb-2">Delete this job?</h3>
              <p className="text-[#8892A4] text-sm mb-6">This will remove the posting from the public Careers page immediately.</p>
              <div className="flex gap-3">
                <button
                  onClick={() => setDeleteId(null)}
                  className="flex-1 py-3 rounded-xl border border-white/20 text-[#8892A4] font-bold text-sm hover:text-white transition-all"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleDelete(deleteId)}
                  className="flex-1 py-3 rounded-xl bg-red-500 text-white font-bold text-sm hover:bg-red-600 transition-all"
                >
                  Delete
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </AdminShell>
  )
}
