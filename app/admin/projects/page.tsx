'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import AdminShell from '@/components/admin/AdminShell'

interface Client { _id: string; name: string; company: string }
interface Project {
  _id: string
  title: string
  description: string
  clientId: Client | null
  status: string
  progress: number
  startDate: string
  deadline: string
  techStack: string[]
  deliverables: Array<{ _id: string; title: string; status: string }>
  createdAt: string
}

const statusColors: Record<string, string> = {
  planning: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  in_progress: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
  review: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
  completed: 'bg-green-500/20 text-green-400 border-green-500/30',
  on_hold: 'bg-red-500/20 text-red-400 border-red-500/30',
}

function formatDate(d: string) {
  return new Date(d).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
}

export default function AdminProjectsPage() {
  const router = useRouter()
  const [projects, setProjects] = useState<Project[]>([])
  const [clients, setClients] = useState<Client[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [formState, setFormState] = useState<'idle' | 'submitting' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  useEffect(() => {
    Promise.all([
      fetch('/api/admin/projects').then((r) => { if (r.status === 401) { router.push('/admin/login'); return null } return r.json() }),
      fetch('/api/admin/clients').then((r) => r.json()),
    ]).then(([pd, cd]) => {
      if (pd) setProjects(pd.projects)
      if (cd) setClients(cd.clients)
    }).finally(() => setLoading(false))
  }, [router])

  async function handleCreate(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setFormState('submitting')
    setErrorMsg('')

    const form = e.currentTarget
    const body = {
      title: (form.elements.namedItem('title') as HTMLInputElement).value,
      description: (form.elements.namedItem('description') as HTMLTextAreaElement).value,
      clientId: (form.elements.namedItem('clientId') as HTMLSelectElement).value,
      status: (form.elements.namedItem('status') as HTMLSelectElement).value,
      progress: Number((form.elements.namedItem('progress') as HTMLInputElement).value),
      startDate: (form.elements.namedItem('startDate') as HTMLInputElement).value,
      deadline: (form.elements.namedItem('deadline') as HTMLInputElement).value,
      techStack: (form.elements.namedItem('techStack') as HTMLInputElement).value,
    }

    const res = await fetch('/api/admin/projects', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })
    const data = await res.json()

    if (!res.ok) {
      setErrorMsg(data.error || 'Failed to create project.')
      setFormState('error')
      return
    }

    const newProject = { ...data.project, clientId: clients.find((c) => c._id === body.clientId) || null }
    setProjects((prev) => [newProject, ...prev])
    setShowForm(false)
    setFormState('idle')
    form.reset()
  }

  return (
    <AdminShell>
      <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
        <div>
          <h1 className="text-3xl font-black text-white mb-1">Projects</h1>
          <p className="text-[#8892A4]">{projects.length} total project{projects.length !== 1 ? 's' : ''}</p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm text-white font-bold bg-gradient-to-r from-[#0066FF] to-[#00C896] hover:shadow-lg hover:shadow-[#0066FF]/30 transition-all"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          New Project
        </button>
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-48">
          <div className="w-10 h-10 rounded-full border-2 border-[#0066FF]/30 border-t-[#0066FF] animate-spin" />
        </div>
      ) : projects.length === 0 ? (
        <div className="text-center py-16 border border-white/10 rounded-3xl">
          <div className="text-5xl mb-4">📁</div>
          <h3 className="text-xl font-bold text-white mb-2">No projects yet</h3>
          <p className="text-[#8892A4]">Create your first project and assign it to a client.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {projects.map((project, i) => (
            <motion.div
              key={project._id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="p-5 rounded-2xl border border-white/10 bg-white/5 hover:border-white/20 transition-all"
            >
              <div className="flex items-start gap-4 flex-wrap">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-1 flex-wrap">
                    <h3 className="text-white font-bold text-lg">{project.title}</h3>
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold border capitalize ${statusColors[project.status] || ''}`}>
                      {project.status.replace(/_/g, ' ')}
                    </span>
                  </div>
                  <p className="text-[#8892A4] text-sm mb-3 line-clamp-1">{project.description}</p>
                  <div className="flex flex-wrap gap-4 text-xs text-[#8892A4]">
                    <span>👥 {project.clientId?.name ?? '—'} · {project.clientId?.company ?? ''}</span>
                    <span>📅 {formatDate(project.startDate)} → {formatDate(project.deadline)}</span>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-white font-black text-2xl">{project.progress}%</p>
                  <p className="text-[#8892A4] text-xs">Progress</p>
                </div>
              </div>
              <div className="mt-4">
                <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${project.progress}%` }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                    className="h-full bg-gradient-to-r from-[#0066FF] to-[#00C896] rounded-full"
                  />
                </div>
              </div>
              {project.techStack.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-3">
                  {project.techStack.map((t) => (
                    <span key={t} className="px-2 py-0.5 rounded text-xs border border-white/10 text-[#8892A4] bg-white/5">{t}</span>
                  ))}
                </div>
              )}
            </motion.div>
          ))}
        </div>
      )}

      {/* Create Project Modal */}
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
              className="w-full max-w-lg bg-[#0D1F3C] border border-white/10 rounded-3xl overflow-hidden max-h-[90vh] overflow-y-auto"
            >
              <div className="p-6 border-b border-white/10 flex items-center justify-between sticky top-0 bg-[#0D1F3C] z-10">
                <h2 className="text-white text-xl font-black">Create New Project</h2>
                <button onClick={() => setShowForm(false)} className="text-white/40 hover:text-white p-2 rounded-xl hover:bg-white/10 transition-all">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
              </div>
              <div className="p-6">
                <form onSubmit={handleCreate} className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-white/70 mb-2">Project Title *</label>
                    <input name="title" required placeholder="e.g. E-Commerce Platform" className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#0066FF]/50 transition-all" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-white/70 mb-2">Description *</label>
                    <textarea name="description" required rows={3} placeholder="Brief description of the project..." className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#0066FF]/50 transition-all resize-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-white/70 mb-2">Assign to Client *</label>
                    <select name="clientId" required className="w-full px-4 py-3 rounded-xl bg-[#0D1F3C] border border-white/10 text-white focus:outline-none focus:border-[#0066FF]/50 transition-all">
                      <option value="">Select a client</option>
                      {clients.map((c) => (
                        <option key={c._id} value={c._id}>{c.name} — {c.company}</option>
                      ))}
                    </select>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-white/70 mb-2">Status</label>
                      <select name="status" defaultValue="planning" className="w-full px-4 py-3 rounded-xl bg-[#0D1F3C] border border-white/10 text-white focus:outline-none focus:border-[#0066FF]/50 transition-all">
                        <option value="planning">Planning</option>
                        <option value="in_progress">In Progress</option>
                        <option value="review">Review</option>
                        <option value="completed">Completed</option>
                        <option value="on_hold">On Hold</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-white/70 mb-2">Progress %</label>
                      <input name="progress" type="number" min={0} max={100} defaultValue={0} className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-[#0066FF]/50 transition-all" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-white/70 mb-2">Start Date *</label>
                      <input name="startDate" type="date" required className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-[#0066FF]/50 transition-all" />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-white/70 mb-2">Deadline *</label>
                      <input name="deadline" type="date" required className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-[#0066FF]/50 transition-all" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-white/70 mb-2">Tech Stack <span className="text-white/40 font-normal">(comma-separated)</span></label>
                    <input name="techStack" placeholder="React, Node.js, MongoDB" className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#0066FF]/50 transition-all" />
                  </div>

                  {formState === 'error' && (
                    <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm">{errorMsg}</div>
                  )}

                  <div className="flex gap-3 pt-2">
                    <button type="button" onClick={() => setShowForm(false)} className="flex-1 py-3 rounded-xl border border-white/20 text-white/60 hover:text-white transition-all font-semibold">Cancel</button>
                    <button type="submit" disabled={formState === 'submitting'} className="flex-1 py-3 rounded-xl text-white font-bold bg-gradient-to-r from-[#0066FF] to-[#00C896] hover:shadow-lg transition-all disabled:opacity-60 flex items-center justify-center gap-2">
                      {formState === 'submitting' ? <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg> : 'Create Project'}
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
