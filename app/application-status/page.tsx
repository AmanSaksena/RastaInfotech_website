'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

interface ApplicationRecord {
  _id: string
  name: string
  position: string
  status: 'pending' | 'reviewed' | 'shortlisted' | 'offer' | 'rejected'
  createdAt: string
}

const statusConfig = {
  pending: {
    label: 'Pending Review',
    color: 'text-gray-400',
    bg: 'bg-gray-500/10 border-gray-500/30',
    icon: '⏳',
    message: 'Your application has been received and is in queue for review. We typically review applications within 3–5 business days.',
    step: 1,
  },
  reviewed: {
    label: 'Under Review',
    color: 'text-blue-400',
    bg: 'bg-blue-500/10 border-blue-500/30',
    icon: '🔍',
    message: 'Our team is currently reviewing your profile and resume. You will hear from us soon.',
    step: 2,
  },
  shortlisted: {
    label: 'Shortlisted',
    color: 'text-[#00C896]',
    bg: 'bg-[#00C896]/10 border-[#00C896]/30',
    icon: '🎉',
    message: 'Congratulations! You have been shortlisted. Our team will contact you shortly with details about the next steps.',
    step: 3,
  },
  offer: {
    label: 'Offer Extended',
    color: 'text-purple-400',
    bg: 'bg-purple-500/10 border-purple-500/30',
    icon: '🎊',
    message: 'Congratulations! You have received an official offer from Rasta Infotech. Our HR team will contact you with the offer letter and onboarding details.',
    step: 4,
  },
  rejected: {
    label: 'Not Selected',
    color: 'text-red-400',
    bg: 'bg-red-500/10 border-red-500/30',
    icon: '📋',
    message: 'Thank you for applying. Unfortunately we are not moving forward with your application at this time. We encourage you to apply for future openings.',
    step: 0,
  },
}

const steps = ['Applied', 'Under Review', 'Shortlisted', 'Offer']

export default function ApplicationStatusPage() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [applications, setApplications] = useState<ApplicationRecord[] | null>(null)

  async function handleCheck(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setApplications(null)
    if (!email.trim()) { setError('Please enter your email address.'); return }
    setLoading(true)
    try {
      const res = await fetch(`/api/application-status?email=${encodeURIComponent(email.trim())}`)
      const data = await res.json()
      if (!res.ok) { setError(data.error || 'Something went wrong.'); return }
      setApplications(data.applications)
    } catch {
      setError('Failed to fetch. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="bg-[#0A1628] min-h-screen">
      <Navbar />

      <section className="pt-32 pb-20 px-4">
        <div className="max-w-2xl mx-auto">

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold bg-[#0066FF]/10 text-[#0066FF] border border-[#0066FF]/20 mb-4">
              Career Portal
            </span>
            <h1 className="text-4xl font-black text-white mb-3">Check Application Status</h1>
            <p className="text-[#8892A4] text-lg">Enter the email address you used when applying to see your current status.</p>
          </motion.div>

          {/* Search Form */}
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            onSubmit={handleCheck}
            className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-8"
          >
            <label className="block text-sm font-semibold text-[#8892A4] mb-2">Email Address</label>
            <div className="flex gap-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-[#8892A4] focus:outline-none focus:border-[#0066FF]/50 text-sm"
              />
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#0066FF] to-[#00C896] text-white font-bold text-sm disabled:opacity-50 whitespace-nowrap"
              >
                {loading ? 'Checking…' : 'Check Status'}
              </button>
            </div>
            {error && (
              <p className="mt-3 text-red-400 text-sm">{error}</p>
            )}
          </motion.form>

          {/* Results */}
          <AnimatePresence>
            {applications && (
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="space-y-6"
              >
                {applications.map((app) => {
                  const cfg = statusConfig[app.status]
                  return (
                    <div key={app._id} className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">

                      {/* Card Header */}
                      <div className="p-6 border-b border-white/10">
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <p className="text-[#8892A4] text-xs font-semibold uppercase tracking-wider mb-1">Position Applied</p>
                            <h2 className="text-white text-xl font-bold">{app.position}</h2>
                            <p className="text-[#8892A4] text-sm mt-1">
                              Applied on {new Date(app.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
                            </p>
                          </div>
                          <span className={`shrink-0 px-3 py-1 rounded-full text-xs font-bold border capitalize ${cfg.bg} ${cfg.color}`}>
                            {cfg.icon} {cfg.label}
                          </span>
                        </div>
                      </div>

                      {/* Progress Steps (only for non-rejected) */}
                      {app.status !== 'rejected' && (
                        <div className="px-6 py-5 border-b border-white/10">
                          <div className="flex items-center gap-0">
                            {steps.map((step, i) => (
                              <div key={step} className="flex items-center flex-1 last:flex-none">
                                <div className="flex flex-col items-center">
                                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-all ${
                                    i < cfg.step
                                      ? 'bg-[#00C896] border-[#00C896] text-white'
                                      : i === cfg.step - 1
                                      ? `border-current ${cfg.color} bg-white/5`
                                      : 'border-white/20 text-white/30'
                                  }`}>
                                    {i < cfg.step ? '✓' : i + 1}
                                  </div>
                                  <p className={`text-[10px] font-semibold mt-1 whitespace-nowrap ${i < cfg.step ? 'text-[#00C896]' : i === cfg.step - 1 ? cfg.color : 'text-white/30'}`}>
                                    {step}
                                  </p>
                                </div>
                                {i < steps.length - 1 && (
                                  <div className={`flex-1 h-0.5 mx-1 mb-4 ${i < cfg.step - 1 ? 'bg-[#00C896]' : 'bg-white/10'}`} />
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Status Message */}
                      <div className={`px-6 py-4 ${cfg.bg} border-t border-white/5`}>
                        <p className={`text-sm font-medium ${cfg.color}`}>{cfg.message}</p>
                      </div>

                    </div>
                  )
                })}
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </section>

      <Footer />
    </main>
  )
}
