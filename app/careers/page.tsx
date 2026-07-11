'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

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
  createdAt: string
}

const typeColors: Record<string, string> = {
  'full-time': 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  'part-time': 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
  'internship': 'bg-purple-500/20 text-purple-400 border-purple-500/30',
  'contract': 'bg-orange-500/20 text-orange-400 border-orange-500/30',
}

type ApplyState = 'idle' | 'submitting' | 'success' | 'error'

function ApplyModal({ job, onClose }: { job: JobPosting; onClose: () => void }) {
  const [state, setState] = useState<ApplyState>('idle')
  const [errorMsg, setErrorMsg] = useState('')
  const formRef = useRef<HTMLFormElement>(null)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setErrorMsg('')
    setState('submitting')
    try {
      const formData = new FormData(e.currentTarget)
      const file = formData.get('resume') as File
      if (!file || file.size === 0) { setErrorMsg('Please attach your resume (PDF).'); setState('error'); return }
      if (!file.type.includes('pdf')) { setErrorMsg('Resume must be a PDF file.'); setState('error'); return }
      if (file.size > 5 * 1024 * 1024) { setErrorMsg('Resume must be under 5MB.'); setState('error'); return }

      const res = await fetch('/api/apply', { method: 'POST', body: formData })
      const data = await res.json()
      if (!res.ok) { setErrorMsg(data.error || 'Something went wrong.'); setState('error'); return }
      setState('success')
    } catch {
      setErrorMsg('Network error. Please try again.')
      setState('error')
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }}
        className="bg-[#0D1F3C] border border-white/10 rounded-2xl w-full max-w-xl max-h-[90vh] overflow-y-auto"
      >
        <div className="flex items-center justify-between p-6 border-b border-white/10 sticky top-0 bg-[#0D1F3C] z-10">
          <div>
            <p className="text-[#8892A4] text-xs font-semibold uppercase tracking-wider">Applying for</p>
            <h2 className="text-white font-black text-lg">{job.title}</h2>
          </div>
          <button onClick={onClose} className="text-[#8892A4] hover:text-white text-2xl leading-none">×</button>
        </div>

        <div className="p-6">
          {state === 'success' ? (
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-10">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#00C896] to-[#0066FF] flex items-center justify-center mx-auto mb-6 shadow-lg shadow-[#00C896]/30">
                <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-2xl font-black text-white mb-3">Application Submitted!</h3>
              <p className="text-[#8892A4] max-w-sm mx-auto">
                Thank you for applying to <span className="text-white font-semibold">{job.title}</span>. We will review your application and get back to you within 3–5 business days.
              </p>
              <p className="text-[#8892A4] text-sm mt-3 max-w-sm mx-auto">Track your application status anytime using the email you applied with.</p>
              <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
                <a href="/application-status" className="px-6 py-3 rounded-xl text-white font-bold bg-gradient-to-r from-[#0066FF] to-[#00C896] text-sm">
                  Track My Application
                </a>
                <button onClick={onClose} className="px-6 py-3 rounded-xl text-[#8892A4] font-bold border border-white/20 hover:text-white hover:border-white/40 transition-all text-sm">
                  Close
                </button>
              </div>
            </motion.div>
          ) : (
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-5">
              <input type="hidden" name="position" value={job.title} />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-semibold text-[#8892A4] mb-2 uppercase tracking-wide">Full Name *</label>
                  <input name="name" required placeholder="John Doe"
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-[#8892A4] focus:outline-none focus:border-[#0066FF]/50 text-sm" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#8892A4] mb-2 uppercase tracking-wide">Email *</label>
                  <input name="email" type="email" required placeholder="you@example.com"
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-[#8892A4] focus:outline-none focus:border-[#0066FF]/50 text-sm" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#8892A4] mb-2 uppercase tracking-wide">Phone *</label>
                  <input name="phone" required placeholder="+91 98765 43210"
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-[#8892A4] focus:outline-none focus:border-[#0066FF]/50 text-sm" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#8892A4] mb-2 uppercase tracking-wide">Years of Experience *</label>
                  <input name="experience" required placeholder="e.g. 3 years"
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-[#8892A4] focus:outline-none focus:border-[#0066FF]/50 text-sm" />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-[#8892A4] mb-2 uppercase tracking-wide">LinkedIn Profile</label>
                  <input name="linkedIn" placeholder="https://linkedin.com/in/yourprofile"
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-[#8892A4] focus:outline-none focus:border-[#0066FF]/50 text-sm" />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-[#8892A4] mb-2 uppercase tracking-wide">Cover Letter</label>
                  <textarea name="coverLetter" rows={3} placeholder="Tell us why you're a great fit..."
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-[#8892A4] focus:outline-none focus:border-[#0066FF]/50 text-sm resize-none" />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-[#8892A4] mb-2 uppercase tracking-wide">Resume (PDF, max 5MB) *</label>
                  <input name="resume" type="file" accept=".pdf" required
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-[#8892A4] focus:outline-none focus:border-[#0066FF]/50 text-sm file:mr-3 file:px-3 file:py-1 file:rounded-lg file:border-0 file:bg-[#0066FF]/20 file:text-[#0066FF] file:text-xs file:font-semibold" />
                </div>
              </div>

              {state === 'error' && <p className="text-red-400 text-sm">{errorMsg}</p>}

              <button
                type="submit" disabled={state === 'submitting'}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#0066FF] to-[#00C896] text-white font-bold text-sm disabled:opacity-50"
              >
                {state === 'submitting' ? 'Submitting…' : 'Submit Application'}
              </button>
            </form>
          )}
        </div>
      </motion.div>
    </motion.div>
  )
}

function JobCard({ job, onApply }: { job: JobPosting; onApply: () => void }) {
  const [expanded, setExpanded] = useState(false)
  const daysLeft = Math.ceil((new Date(job.deadline).getTime() - Date.now()) / 86400000)

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-white/20 transition-all"
    >
      <div className="p-6">
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap mb-2">
              <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold border capitalize ${typeColors[job.type]}`}>{job.type}</span>
              {daysLeft <= 7 && daysLeft > 0 && (
                <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-red-500/20 text-red-400 border border-red-500/30">Closes in {daysLeft}d</span>
              )}
            </div>
            <h3 className="text-white font-black text-xl mb-1">{job.title}</h3>
            <div className="flex items-center gap-4 text-sm text-[#8892A4] flex-wrap">
              <span>🏢 {job.department}</span>
              <span>📍 {job.location}</span>
              <span>⏱ {job.experience}</span>
              <span>📅 Apply by {new Date(job.deadline).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
            </div>
          </div>
          <button
            onClick={onApply}
            className="shrink-0 px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#0066FF] to-[#00C896] text-white font-bold text-sm"
          >
            Apply Now
          </button>
        </div>

        <p className={`mt-4 text-[#8892A4] text-sm leading-relaxed ${expanded ? '' : 'line-clamp-2'}`}>{job.description}</p>

        {job.requirements.length > 0 && (
          <AnimatePresence>
            {expanded && (
              <motion.div
                initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
                className="mt-4"
              >
                <p className="text-xs font-semibold text-[#8892A4] uppercase tracking-wider mb-2">Requirements</p>
                <ul className="space-y-1.5">
                  {job.requirements.map((r, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-[#8892A4]">
                      <span className="text-[#00C896] mt-0.5 shrink-0">✓</span>{r}
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}
          </AnimatePresence>
        )}

        <button
          onClick={() => setExpanded(!expanded)}
          className="mt-3 text-xs text-[#0066FF] hover:text-white font-semibold transition-colors"
        >
          {expanded ? 'Show less ↑' : 'View details ↓'}
        </button>
      </div>
    </motion.div>
  )
}

export default function CareersPage() {
  const [jobs, setJobs] = useState<JobPosting[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all')
  const [applyJob, setApplyJob] = useState<JobPosting | null>(null)

  useEffect(() => {
    fetch('/api/jobs')
      .then((r) => r.json())
      .then((d) => setJobs(d.jobs || []))
      .finally(() => setLoading(false))
  }, [])

  const departments = ['all', ...Array.from(new Set(jobs.map((j) => j.department)))]
  const filtered = filter === 'all' ? jobs : jobs.filter((j) => j.department === filter)

  return (
    <main className="bg-[#0A1628] min-h-screen">
      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-16 px-4 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold bg-[#0066FF]/10 text-[#0066FF] border border-[#0066FF]/20 mb-4">
            We&apos;re Hiring
          </span>
          <h1 className="text-5xl font-black text-white mb-4">Join Rasta Infotech</h1>
          <p className="text-[#8892A4] text-lg max-w-xl mx-auto">
            Build your career with a team that values innovation, growth, and excellence. Explore open positions below.
          </p>
          <div className="mt-6 flex items-center justify-center gap-6 text-sm text-[#8892A4]">
            <span>💼 {jobs.length} Open Position{jobs.length !== 1 ? 's' : ''}</span>
            <span>📍 Bangalore, India</span>
            <span>🚀 Fast-growing team</span>
          </div>
        </motion.div>
      </section>

      {/* Filters */}
      {departments.length > 1 && (
        <section className="px-4 pb-6 max-w-5xl mx-auto">
          <div className="flex items-center gap-2 flex-wrap">
            {departments.map((d) => (
              <button
                key={d}
                onClick={() => setFilter(d)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold capitalize transition-all ${
                  filter === d
                    ? 'bg-gradient-to-r from-[#0066FF] to-[#00C896] text-white'
                    : 'bg-white/5 border border-white/10 text-[#8892A4] hover:text-white hover:border-white/20'
                }`}
              >
                {d === 'all' ? `All Departments (${jobs.length})` : `${d} (${jobs.filter((j) => j.department === d).length})`}
              </button>
            ))}
          </div>
        </section>
      )}

      {/* Job Listings */}
      <section className="px-4 pb-24 max-w-5xl mx-auto">
        {loading ? (
          <div className="flex items-center justify-center h-48">
            <div className="w-10 h-10 rounded-full border-2 border-[#0066FF]/30 border-t-[#0066FF] animate-spin" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20 border border-white/10 rounded-3xl">
            <div className="text-5xl mb-4">💼</div>
            <h3 className="text-xl font-bold text-white mb-2">No openings right now</h3>
            <p className="text-[#8892A4] mb-6">We don&apos;t have any open positions at the moment. Check back soon or send us a general application.</p>
            <a
              href="/contact"
              className="inline-block px-6 py-3 rounded-xl bg-gradient-to-r from-[#0066FF] to-[#00C896] text-white font-bold text-sm"
            >
              Get in Touch
            </a>
          </div>
        ) : (
          <div className="space-y-4">
            {filtered.map((job) => (
              <JobCard key={job._id} job={job} onApply={() => setApplyJob(job)} />
            ))}
          </div>
        )}
      </section>

      <Footer />

      <AnimatePresence>
        {applyJob && <ApplyModal job={applyJob} onClose={() => setApplyJob(null)} />}
      </AnimatePresence>
    </main>
  )
}
