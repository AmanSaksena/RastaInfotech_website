'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const STORAGE_KEY = 'ri_lead_captured'

export default function LeadPopup() {
  const [visible, setVisible] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', phone: '' })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (typeof window === 'undefined') return
    if (localStorage.getItem(STORAGE_KEY)) return

    const timer = setTimeout(() => setVisible(true), 30000)
    return () => clearTimeout(timer)
  }, [])

  const handleClose = () => {
    setVisible(false)
    // Don't show again for this session but allow on next visit if not submitted
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error()
      setSubmitted(true)
      localStorage.setItem(STORAGE_KEY, '1')
      setTimeout(() => setVisible(false), 3000)
    } catch {
      setError('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <AnimatePresence>
      {visible && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 z-[90] bg-black/60 backdrop-blur-sm"
          />

          {/* Popup */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 40 }}
            transition={{ type: 'spring', duration: 0.5 }}
            className="fixed z-[100] inset-0 flex items-center justify-center px-4 pointer-events-none"
          >
            <div className="relative w-full max-w-md pointer-events-auto">
              {/* Glow */}
              <div className="absolute -inset-1 bg-gradient-to-r from-[#0066FF] to-[#00C896] rounded-3xl blur-lg opacity-30" />

              <div className="relative rounded-3xl border border-white/10 bg-[#0D1F3C] p-8 shadow-2xl overflow-hidden">
                {/* Background grid */}
                <div
                  className="absolute inset-0 opacity-[0.04] pointer-events-none"
                  style={{
                    backgroundImage: `linear-gradient(rgba(0,102,255,0.5) 1px, transparent 1px),
                      linear-gradient(90deg, rgba(0,102,255,0.5) 1px, transparent 1px)`,
                    backgroundSize: '30px 30px',
                  }}
                />

                {/* Close button */}
                <button
                  onClick={handleClose}
                  className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-[#8892A4] hover:text-white hover:bg-white/20 transition-all duration-200 z-10"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>

                <div className="relative z-10">
                  {submitted ? (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="flex flex-col items-center text-center py-6"
                    >
                      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#00C896] to-[#0066FF] flex items-center justify-center text-3xl mb-4">
                        ✅
                      </div>
                      <h3 className="text-white font-black text-xl mb-2">You&apos;re on the list!</h3>
                      <p className="text-[#8892A4] text-sm">Our team will reach out within 24 hours.</p>
                    </motion.div>
                  ) : (
                    <>
                      {/* Badge */}
                      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#0066FF]/30 bg-[#0066FF]/10 mb-5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#00C896] animate-pulse" />
                        <span className="text-[#00C896] text-xs font-semibold tracking-wide">Free Consultation</span>
                      </div>

                      <h3 className="text-white font-black text-2xl mb-2 leading-tight">
                        Get a Free{' '}
                        <span className="bg-gradient-to-r from-[#0066FF] to-[#00C896] bg-clip-text text-transparent">
                          IT Consultation
                        </span>
                      </h3>
                      <p className="text-[#8892A4] text-sm mb-6">
                        Talk to our experts about your business needs. No commitment required.
                      </p>

                      <form onSubmit={handleSubmit} className="space-y-3">
                        <input
                          type="text"
                          required
                          placeholder="Your Name"
                          value={form.name}
                          onChange={(e) => setForm({ ...form, name: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-[#8892A4] text-sm focus:outline-none focus:border-[#0066FF]/60 transition-all duration-300"
                        />
                        <input
                          type="email"
                          required
                          placeholder="Work Email"
                          value={form.email}
                          onChange={(e) => setForm({ ...form, email: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-[#8892A4] text-sm focus:outline-none focus:border-[#0066FF]/60 transition-all duration-300"
                        />
                        <input
                          type="tel"
                          placeholder="Phone Number (optional)"
                          value={form.phone}
                          onChange={(e) => setForm({ ...form, phone: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-[#8892A4] text-sm focus:outline-none focus:border-[#0066FF]/60 transition-all duration-300"
                        />
                        {error && <p className="text-red-400 text-xs text-center">{error}</p>}
                        <button
                          type="submit"
                          disabled={loading}
                          className="w-full py-3.5 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-[#0066FF] to-[#00C896] hover:shadow-lg hover:shadow-[#0066FF]/30 transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
                        >
                          {loading ? 'Sending...' : 'Claim Free Consultation →'}
                        </button>
                      </form>

                      <p className="text-[#8892A4] text-xs text-center mt-4">
                        We respect your privacy. No spam, ever.
                      </p>
                    </>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
