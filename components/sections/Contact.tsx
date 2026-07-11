'use client'

import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import Link from 'next/link'

export default function Contact() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, source: 'homepage' }),
      })
      if (!res.ok) throw new Error('Failed to send')
      setSubmitted(true)
      setTimeout(() => setSubmitted(false), 4000)
      setForm({ name: '', email: '', message: '' })
    } catch {
      setError('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="contact" className="relative py-24 bg-[#060F1E] overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-[#0066FF]/30 to-transparent" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#0066FF]/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#0066FF]/30 bg-[#0066FF]/10 mb-6">
            <span className="text-[#0066FF] text-sm font-semibold tracking-wide">Contact Us</span>
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-6">
            Let us{' '}
            <span className="bg-gradient-to-r from-[#0066FF] to-[#00C896] bg-clip-text text-transparent">
              Connect
            </span>
          </h2>
          <p className="text-[#8892A4] text-lg max-w-2xl mx-auto">
            Have a question or want to work together? Drop us a message and we will get back to you within 24 hours.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="p-8 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-sm"
          >
            <h3 className="text-white font-black text-xl mb-6">Send a Quick Message</h3>
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center h-48 text-center"
              >
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#00C896] to-[#0066FF] flex items-center justify-center text-3xl mb-4">
                  ✅
                </div>
                <h4 className="text-white font-black text-xl mb-2">Message Sent!</h4>
                <p className="text-[#8892A4] text-sm">We will get back to you within 24 hours.</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="text-[#8892A4] text-xs font-semibold uppercase tracking-wide mb-2 block">Your Name</label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="John Doe"
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-[#8892A4] text-sm focus:outline-none focus:border-[#0066FF]/60 transition-all duration-300"
                  />
                </div>
                <div>
                  <label className="text-[#8892A4] text-xs font-semibold uppercase tracking-wide mb-2 block">Your Email</label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="john@company.com"
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-[#8892A4] text-sm focus:outline-none focus:border-[#0066FF]/60 transition-all duration-300"
                  />
                </div>
                <div>
                  <label className="text-[#8892A4] text-xs font-semibold uppercase tracking-wide mb-2 block">Message</label>
                  <textarea
                    required
                    rows={4}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="Write your message here..."
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-[#8892A4] text-sm focus:outline-none focus:border-[#0066FF]/60 transition-all duration-300 resize-none"
                  />
                </div>
                {error && <p className="text-red-400 text-sm text-center">{error}</p>}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 rounded-xl text-base font-bold text-white bg-gradient-to-r from-[#0066FF] to-[#00C896] hover:shadow-lg hover:shadow-[#0066FF]/30 transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {loading ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="space-y-6"
          >
            <div className="space-y-4">
              <h3 className="text-white font-black text-xl">Quick Contact</h3>

              <a href="mailto:info@rastainfotech.com" className="flex items-center gap-4 p-4 rounded-2xl border border-white/10 bg-white/5 hover:border-[#0066FF]/40 hover:bg-[#0066FF]/5 transition-all duration-300 group">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#0066FF] to-[#3385FF] flex items-center justify-center text-xl shrink-0">
                  📧
                </div>
                <div>
                  <p className="text-white font-bold text-sm">Email Us</p>
                  <p className="text-[#0066FF] text-sm">info@rastainfotech.com</p>
                </div>
              </a>

              <a href="tel:+919742507066" className="flex items-center gap-4 p-4 rounded-2xl border border-white/10 bg-white/5 hover:border-[#00C896]/40 hover:bg-[#00C896]/5 transition-all duration-300 group">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#00C896] to-[#0066FF] flex items-center justify-center text-xl shrink-0">
                  📞
                </div>
                <div>
                  <p className="text-white font-bold text-sm">Click to Call</p>
                  <p className="text-[#00C896] text-sm">+91-97425-07066</p>
                </div>
              </a>

              <a href="https://wa.me/919742507066?text=Hi%20Rasta%20Infotech" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 p-4 rounded-2xl border border-[#25D366]/20 bg-[#25D366]/5 hover:border-[#25D366]/40 hover:bg-[#25D366]/10 transition-all duration-300 group">
                <div className="w-12 h-12 rounded-xl bg-[#25D366] flex items-center justify-center shrink-0">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                </div>
                <div>
                  <p className="text-white font-bold text-sm">WhatsApp Us</p>
                  <p className="text-[#25D366] text-sm">Chat instantly on WhatsApp</p>
                </div>
              </a>
            </div>

            <Link href="/contact" className="flex items-center justify-center gap-2 w-full py-4 rounded-2xl border border-white/10 bg-white/5 text-white font-bold hover:border-[#0066FF]/40 hover:bg-[#0066FF]/5 transition-all duration-300 group">
              View Full Contact Page
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>

            <div className="relative p-6 rounded-2xl overflow-hidden text-center">
              <div className="absolute inset-0 bg-gradient-to-r from-[#0066FF]/20 to-[#00C896]/20" />
              <div className="absolute inset-0 border border-[#0066FF]/20 rounded-2xl" />
              <div className="relative z-10">
                <p className="text-white font-black text-lg mb-2">🎓 Guaranteed Placement</p>
                <p className="text-[#8892A4] text-sm mb-4">Apply now for our 100% placement assurance program.</p>
                <a href="mailto:info@rastainfotech.com?subject=Placement Program Application" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-[#0066FF] to-[#00C896] hover:shadow-lg transition-all duration-300">
                  Apply Now
                </a>
              </div>
            </div>

          </motion.div>
        </div>
      </div>
    </section>
  )
}