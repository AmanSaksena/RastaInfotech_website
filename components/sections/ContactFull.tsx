'use client'

import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

export default function ContactFull() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' })
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
        body: JSON.stringify({ ...form, source: 'contact-page' }),
      })
      if (!res.ok) throw new Error('Failed to send')
      setSubmitted(true)
      setTimeout(() => setSubmitted(false), 4000)
      setForm({ name: '', email: '', phone: '', subject: '', message: '' })
    } catch {
      setError('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="relative bg-[#0A1628] overflow-hidden">

      {/* Hero Banner */}
      <div className="relative pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1423666639041-f56000c27a9a?w=1600&q=80"
            alt="Contact"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0A1628]/60 to-[#0A1628]" />
        </div>
        <div className="relative z-10 text-center px-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#0066FF]/30 bg-[#0066FF]/10 mb-6">
            <span className="text-[#0066FF] text-sm font-semibold tracking-wide">Get In Touch</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-4">
            Let us Connect &{' '}
            <span className="bg-gradient-to-r from-[#0066FF] to-[#00C896] bg-clip-text text-transparent">
              Collaborate
            </span>
          </h1>
          <p className="text-[#8892A4] text-lg max-w-2xl mx-auto">
            Reach out today and find out how we can help transform your business with intelligent solutions and expert guidance.
          </p>
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">

        {/* 3 Contact Info Cards */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-16"
        >
          
          <a
            href="mailto:info@rastainfotech.com"
            className="group p-6 rounded-2xl border border-white/10 bg-white/5 hover:border-[#0066FF]/40 hover:bg-[#0066FF]/5 transition-all duration-300 text-center"
          >
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#0066FF] to-[#3385FF] flex items-center justify-center text-2xl mx-auto mb-4 group-hover:shadow-lg group-hover:shadow-[#0066FF]/30 transition-all duration-300">
              📧
            </div>
            <p className="text-white font-bold text-lg mb-1">Email Us</p>
            <p className="text-[#0066FF] text-sm mb-2">info@rastainfotech.com</p>
            <p className="text-[#8892A4] text-xs">Email us for project inquiries, support, or general information.</p>
          </a>

          
          <a
            href="tel:+919742507066"
            className="group p-6 rounded-2xl border border-white/10 bg-white/5 hover:border-[#00C896]/40 hover:bg-[#00C896]/5 transition-all duration-300 text-center"
          >
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#00C896] to-[#0066FF] flex items-center justify-center text-2xl mx-auto mb-4 group-hover:shadow-lg group-hover:shadow-[#00C896]/30 transition-all duration-300">
              📞
            </div>
            <p className="text-white font-bold text-lg mb-1">Call Us</p>
            <p className="text-[#00C896] text-sm mb-2">+91-97425-07066</p>
            <p className="text-[#8892A4] text-xs">Call our team directly for immediate assistance or consultation.</p>
          </a>

          
          <a
            href="https://maps.app.goo.gl/7fjjDhNbkkDCXDNTA"
            target="_blank"
            rel="noopener noreferrer"
            className="group p-6 rounded-2xl border border-white/10 bg-white/5 hover:border-[#7C3AED]/40 hover:bg-[#7C3AED]/5 transition-all duration-300 text-center"
          >
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#7C3AED] to-[#0066FF] flex items-center justify-center text-2xl mx-auto mb-4 group-hover:shadow-lg group-hover:shadow-[#7C3AED]/30 transition-all duration-300">
              📍
            </div>
            <p className="text-white font-bold text-lg mb-1">Visit Us</p>
            <p className="text-[#7C3AED] text-sm mb-2">Bangalore, Karnataka</p>
            <p className="text-[#8892A4] text-xs">23 2nd Cross, Near Malnad, MHR Layout, Bangalore North 560090</p>
          </a>
        </motion.div>

        {/* Form + Info */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-16">

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="p-8 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-sm"
          >
            <h2 className="text-white font-black text-2xl mb-2">Send Us a Message</h2>
            <p className="text-[#8892A4] text-sm mb-6">Fill out the form below and we will get back to you within 24 hours.</p>

            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center h-64 text-center"
              >
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#00C896] to-[#0066FF] flex items-center justify-center text-4xl mb-4">
                  ✅
                </div>
                <h4 className="text-white font-black text-2xl mb-2">Message Sent!</h4>
                <p className="text-[#8892A4]">We will get back to you within 24 hours.</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[#8892A4] text-xs font-semibold uppercase tracking-wide mb-2 block">Your Name</label>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="John Doe"
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-[#8892A4] text-sm focus:outline-none focus:border-[#0066FF]/60 focus:bg-[#0066FF]/5 transition-all duration-300"
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
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-[#8892A4] text-sm focus:outline-none focus:border-[#0066FF]/60 focus:bg-[#0066FF]/5 transition-all duration-300"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[#8892A4] text-xs font-semibold uppercase tracking-wide mb-2 block">Mobile Number</label>
                    <input
                      type="tel"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      placeholder="+91 98765 43210"
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-[#8892A4] text-sm focus:outline-none focus:border-[#0066FF]/60 focus:bg-[#0066FF]/5 transition-all duration-300"
                    />
                  </div>
                  <div>
                    <label className="text-[#8892A4] text-xs font-semibold uppercase tracking-wide mb-2 block">Subject</label>
                    <input
                      type="text"
                      value={form.subject}
                      onChange={(e) => setForm({ ...form, subject: e.target.value })}
                      placeholder="How can we help?"
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-[#8892A4] text-sm focus:outline-none focus:border-[#0066FF]/60 focus:bg-[#0066FF]/5 transition-all duration-300"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-[#8892A4] text-xs font-semibold uppercase tracking-wide mb-2 block">Message</label>
                  <textarea
                    required
                    rows={5}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="Write your message here..."
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-[#8892A4] text-sm focus:outline-none focus:border-[#0066FF]/60 focus:bg-[#0066FF]/5 transition-all duration-300 resize-none"
                  />
                </div>
                {error && <p className="text-red-400 text-sm text-center">{error}</p>}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 rounded-xl text-base font-bold text-white bg-gradient-to-r from-[#0066FF] to-[#00C896] hover:shadow-lg hover:shadow-[#0066FF]/30 transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {loading ? 'Sending...' : 'Get In Touch'}
                </button>
              </form>
            )}

            {/* WhatsApp */}
            
            <a
              href="https://wa.me/919742507066?text=Hi%20Rasta%20Infotech%2C%20I%20would%20like%20to%20know%20more%20about%20your%20services."
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 flex items-center justify-center gap-3 w-full py-3 rounded-xl border border-[#25D366]/30 bg-[#25D366]/10 text-[#25D366] text-sm font-bold hover:bg-[#25D366]/20 transition-all duration-300"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Chat on WhatsApp
            </a>
          </motion.div>

          {/* Right - Info + Map */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="space-y-6"
          >
            {/* Contact Info */}
            <div className="p-6 rounded-2xl border border-white/10 bg-white/5">
              <h3 className="text-white font-black text-xl mb-5">Contact Information</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-[#0066FF]/20 flex items-center justify-center shrink-0">
                    <span className="text-lg">📍</span>
                  </div>
                  <div>
                    <p className="text-white font-bold text-sm mb-1">Office Address</p>
                    <p className="text-[#8892A4] text-sm leading-relaxed">23 2nd Cross, Near Malnad, Coaching Centre, MHR Layout, Bangalore North, Karnataka, India, 560090</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-[#00C896]/20 flex items-center justify-center shrink-0">
                    <span className="text-lg">📞</span>
                  </div>
                  <div>
                    <p className="text-white font-bold text-sm mb-1">Phone</p>
                    <a href="tel:+919742507066" className="text-[#00C896] text-sm hover:text-white transition-colors duration-300">+91-97425-07066</a>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-[#0066FF]/20 flex items-center justify-center shrink-0">
                    <span className="text-lg">📧</span>
                  </div>
                  <div>
                    <p className="text-white font-bold text-sm mb-1">Email</p>
                    <a href="mailto:info@rastainfotech.com" className="text-[#0066FF] text-sm hover:text-white transition-colors duration-300">info@rastainfotech.com</a>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-[#25D366]/20 flex items-center justify-center shrink-0">
                    <span className="text-lg">💬</span>
                  </div>
                  <div>
                    <p className="text-white font-bold text-sm mb-1">WhatsApp</p>
                    <a href="https://wa.me/919742507066" target="_blank" rel="noopener noreferrer" className="text-[#25D366] text-sm hover:text-white transition-colors duration-300">+91-97425-07066</a>
                  </div>
                </div>
              </div>
            </div>

            {/* Map */}
            <div className="rounded-2xl overflow-hidden border border-white/10 h-64">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3887.9994591587087!2d77.5945627!3d12.9715987!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae1670c9b44e6d%3A0xf8dfc3e8517e4fe0!2sBangalore%2C%20Karnataka!5e0!3m2!1sen!2sin!4v1234567890"
                width="100%"
                height="100%"
                style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg)' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Rasta Infotech Location"
              />
            </div>

            {/* View on Google Maps */}
            
            <a
              href="https://maps.app.goo.gl/7fjjDhNbkkDCXDNTA"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-3 rounded-xl border border-[#0066FF]/30 bg-[#0066FF]/10 text-[#0066FF] text-sm font-bold hover:bg-[#0066FF]/20 transition-all duration-300"
            >
              📍 View Exact Location on Google Maps
            </a>
          </motion.div>
        </div>

        {/* Recruitment CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="relative p-8 lg:p-12 rounded-3xl overflow-hidden text-center"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-[#0066FF]/10 to-[#00C896]/10" />
          <div className="absolute inset-0 border border-[#0066FF]/20 rounded-3xl" />
          <div className="relative z-10">
            <h3 className="text-2xl lg:text-3xl font-black text-white mb-3">
              🎓 Apply Now — Guaranteed Placement Programs
            </h3>
            <p className="text-[#8892A4] mb-6 max-w-xl mx-auto">
              Join our placement program and land your dream IT job with 100% placement support from day one.
            </p>
            
            <a
              href="mailto:info@rastainfotech.com?subject=Placement Program Application"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl text-base font-bold text-white bg-gradient-to-r from-[#0066FF] to-[#00C896] hover:shadow-lg hover:shadow-[#0066FF]/30 transition-all duration-300"
            >
              Apply Now
            </a>
          </div>
        </motion.div>

      </div>
    </section>
  )
}