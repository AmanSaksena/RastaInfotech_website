'use client'

import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import Link from 'next/link'

const openings = [
  {
    title: 'SAP Consultant',
    dept: 'Enterprise Solutions',
    location: 'Bangalore, India',
    type: 'Full Time',
    exp: '3-5 Years',
    color: 'from-[#0066FF] to-[#3385FF]',
    skills: ['SAP S/4HANA', 'ABAP', 'Fiori', 'SAP MM/SD'],
  },
  {
    title: 'Full Stack Developer',
    dept: 'Application Services',
    location: 'Bangalore, India',
    type: 'Full Time',
    exp: '2-4 Years',
    color: 'from-[#7C3AED] to-[#0066FF]',
    skills: ['React', 'Node.js', 'TypeScript', 'MongoDB'],
  },
  {
    title: 'DevOps Engineer',
    dept: 'Cloud & DevOps',
    location: 'Bangalore, India',
    type: 'Full Time',
    exp: '2-5 Years',
    color: 'from-[#0066FF] to-[#00C896]',
    skills: ['Kubernetes', 'Docker', 'AWS', 'Terraform'],
  },
  {
    title: 'AI/ML Engineer',
    dept: 'AI Services',
    location: 'Bangalore, India',
    type: 'Full Time',
    exp: '2-4 Years',
    color: 'from-[#7C3AED] to-[#00C896]',
    skills: ['Python', 'TensorFlow', 'PyTorch', 'NLP'],
  },
  {
    title: 'Cybersecurity Analyst',
    dept: 'Security',
    location: 'Bangalore, India',
    type: 'Full Time',
    exp: '2-4 Years',
    color: 'from-[#DC2626] to-[#7C3AED]',
    skills: ['VAPT', 'SOC', 'SIEM', 'ISO 27001'],
  },
  {
    title: 'Cloud Architect',
    dept: 'Cloud Services',
    location: 'Bangalore, India',
    type: 'Full Time',
    exp: '5+ Years',
    color: 'from-[#00C896] to-[#0066FF]',
    skills: ['AWS', 'Azure', 'GCP', 'Kubernetes'],
  },
  {
    title: 'Placement Coordinator',
    dept: 'Recruitment',
    location: 'Bangalore, India',
    type: 'Full Time',
    exp: '1-3 Years',
    color: 'from-[#00C896] to-[#7C3AED]',
    skills: ['Talent Acquisition', 'IT Recruitment', 'MIS', 'Communication'],
  },
  {
    title: 'Digital Marketing Executive',
    dept: 'Marketing',
    location: 'Bangalore, India',
    type: 'Full Time',
    exp: '1-3 Years',
    color: 'from-[#0066FF] to-[#00C896]',
    skills: ['SEO', 'Google Ads', 'Social Media', 'Analytics'],
  },
]

const perks = [
  {
    icon: (
      <svg className="w-8 h-8 text-[#0066FF]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: 'Competitive Salary',
    desc: 'Market-leading compensation with performance bonuses.',
  },
  {
    icon: (
      <svg className="w-8 h-8 text-[#00C896]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
      </svg>
    ),
    title: 'Learning & Development',
    desc: 'Annual learning budget, certifications, and training programs.',
  },
  {
    icon: (
      <svg className="w-8 h-8 text-[#7C3AED]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
      </svg>
    ),
    title: 'Health Insurance',
    desc: 'Comprehensive health coverage for you and your family.',
  },
  {
    icon: (
      <svg className="w-8 h-8 text-[#0066FF]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
      </svg>
    ),
    title: 'Work From Home',
    desc: 'Flexible hybrid work policy for better work-life balance.',
  },
  {
    icon: (
      <svg className="w-8 h-8 text-[#00C896]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
      </svg>
    ),
    title: 'Career Growth',
    desc: 'Clear career paths with fast-track promotions for performers.',
  },
  {
    icon: (
      <svg className="w-8 h-8 text-[#7C3AED]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
      </svg>
    ),
    title: 'Fun Culture',
    desc: 'Regular team events, celebrations, and a vibrant workplace.',
  },
]

const hiringProcess = [
  { step: '01', title: 'Apply Online', desc: 'Submit your resume and application through our portal.' },
  { step: '02', title: 'HR Screening', desc: 'A quick call with our HR team to understand your background and goals.' },
  { step: '03', title: 'Technical Interview', desc: 'Technical assessment and interview with our domain experts.' },
  { step: '04', title: 'Final Interview', desc: 'Leadership round to assess culture fit and career alignment.' },
  { step: '05', title: 'Offer & Onboarding', desc: 'Competitive offer followed by a structured onboarding program.' },
]

type FormState = 'idle' | 'submitting' | 'success' | 'error'

interface ApplyModalProps {
  position: string
  color: string
  onClose: () => void
}

function ApplyModal({ position, color, onClose }: ApplyModalProps) {
  const [formState, setFormState] = useState<FormState>('idle')
  const [errorMsg, setErrorMsg] = useState('')
  const [fileName, setFileName] = useState('')
  const fileInputRef = useRef<HTMLInputElement>(null)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setFormState('submitting')
    setErrorMsg('')

    const form = e.currentTarget
    const formData = new FormData(form)

    try {
      const res = await fetch('/api/apply', { method: 'POST', body: formData })
      const data = await res.json()

      if (!res.ok) {
        setErrorMsg(data.error || 'Submission failed. Please try again.')
        setFormState('error')
        return
      }

      setFormState('success')
    } catch {
      setErrorMsg('Network error. Please try again.')
      setFormState('error')
    }
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
        onClick={(e) => e.target === e.currentTarget && onClose()}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 20 }}
          transition={{ duration: 0.2 }}
          className="relative w-full max-w-2xl bg-[#0D1F3C] border border-white/10 rounded-3xl overflow-hidden max-h-[90vh] overflow-y-auto"
        >
          {/* Header */}
          <div className={`p-6 bg-gradient-to-r ${color} bg-opacity-20 border-b border-white/10`}>
            <div className="flex items-start justify-between">
              <div>
                <p className="text-white/60 text-sm mb-1">Applying for</p>
                <h2 className="text-white text-2xl font-black">{position}</h2>
                <p className="text-white/60 text-sm mt-1">Rasta Infotech · Bangalore, India</p>
              </div>
              <button
                onClick={onClose}
                className="text-white/40 hover:text-white transition-colors p-2 rounded-xl hover:bg-white/10"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          <div className="p-6">
            {formState === 'success' ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12"
              >
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#00C896] to-[#0066FF] flex items-center justify-center mx-auto mb-6 shadow-lg shadow-[#00C896]/30">
                  <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-2xl font-black text-white mb-3">Application Submitted!</h3>
                <p className="text-[#8892A4] max-w-sm mx-auto">
                  Thank you for applying to <span className="text-white font-semibold">{position}</span>. Our HR team will review your application and get back to you within 3-5 business days.
                </p>
                <p className="text-[#8892A4] text-sm max-w-sm mx-auto mt-3">
                  You can track your application status anytime using the email you applied with.
                </p>
                <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
                  <a
                    href="/application-status"
                    className="px-6 py-3 rounded-xl text-white font-bold bg-gradient-to-r from-[#0066FF] to-[#00C896] hover:shadow-lg transition-all duration-300 text-sm"
                  >
                    Track My Application
                  </a>
                  <button
                    onClick={onClose}
                    className="px-6 py-3 rounded-xl text-[#8892A4] font-bold border border-white/20 hover:text-white hover:border-white/40 transition-all duration-300 text-sm"
                  >
                    Close
                  </button>
                </div>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <input type="hidden" name="position" value={position} />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-semibold text-white/70 mb-2">Full Name *</label>
                    <input
                      name="name"
                      required
                      placeholder="John Doe"
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#0066FF]/50 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-white/70 mb-2">Email Address *</label>
                    <input
                      name="email"
                      type="email"
                      required
                      placeholder="john@example.com"
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#0066FF]/50 transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-semibold text-white/70 mb-2">Phone Number *</label>
                    <input
                      name="phone"
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#0066FF]/50 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-white/70 mb-2">Years of Experience *</label>
                    <select
                      name="experience"
                      required
                      className="w-full px-4 py-3 rounded-xl bg-[#0D1F3C] border border-white/10 text-white focus:outline-none focus:border-[#0066FF]/50 transition-colors"
                    >
                      <option value="" className="bg-[#0D1F3C]">Select experience</option>
                      <option value="0-1 Years" className="bg-[#0D1F3C]">0-1 Years (Fresher)</option>
                      <option value="1-2 Years" className="bg-[#0D1F3C]">1-2 Years</option>
                      <option value="2-4 Years" className="bg-[#0D1F3C]">2-4 Years</option>
                      <option value="4-6 Years" className="bg-[#0D1F3C]">4-6 Years</option>
                      <option value="6-10 Years" className="bg-[#0D1F3C]">6-10 Years</option>
                      <option value="10+ Years" className="bg-[#0D1F3C]">10+ Years</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-white/70 mb-2">LinkedIn Profile</label>
                  <input
                    name="linkedIn"
                    type="url"
                    placeholder="https://linkedin.com/in/yourprofile"
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#0066FF]/50 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-white/70 mb-2">Cover Letter</label>
                  <textarea
                    name="coverLetter"
                    rows={3}
                    placeholder="Tell us why you're a great fit for this role..."
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#0066FF]/50 transition-colors resize-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-white/70 mb-2">Resume / CV * <span className="text-white/40 font-normal">(PDF only, max 5MB)</span></label>
                  <input
                    ref={fileInputRef}
                    name="resume"
                    type="file"
                    accept=".pdf"
                    required
                    className="hidden"
                    onChange={(e) => setFileName(e.target.files?.[0]?.name || '')}
                  />
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full px-4 py-3 rounded-xl border-2 border-dashed border-white/20 hover:border-[#0066FF]/50 text-white/50 hover:text-white transition-all duration-300 text-sm flex items-center justify-center gap-3 group"
                  >
                    <svg className="w-5 h-5 group-hover:text-[#0066FF] transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                    </svg>
                    {fileName ? (
                      <span className="text-[#00C896] font-semibold truncate max-w-xs">{fileName}</span>
                    ) : (
                      <span>Click to upload your resume</span>
                    )}
                  </button>
                </div>

                {formState === 'error' && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm"
                  >
                    {errorMsg}
                  </motion.div>
                )}

                <div className="flex gap-3 pt-2">
                  <button
                    type="button"
                    onClick={onClose}
                    className="flex-1 px-6 py-3 rounded-xl border border-white/20 text-white/60 hover:text-white hover:border-white/40 transition-all duration-300 font-semibold"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={formState === 'submitting'}
                    className={`flex-1 px-6 py-3 rounded-xl text-white font-bold bg-gradient-to-r ${color} hover:shadow-lg transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2`}
                  >
                    {formState === 'submitting' ? (
                      <>
                        <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                        </svg>
                        Submitting...
                      </>
                    ) : (
                      'Submit Application'
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

export default function JoinUsPage() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const [activeJob, setActiveJob] = useState<{ title: string; color: string } | null>(null)

  return (
    <section className="relative bg-[#0A1628] overflow-hidden">

      {/* Apply Modal */}
      {activeJob && (
        <ApplyModal
          position={activeJob.title}
          color={activeJob.color}
          onClose={() => setActiveJob(null)}
        />
      )}

      {/* Hero */}
      <div className="relative pt-32 pb-16">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1600&q=80"
            alt="Join Us"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0A1628]/60 to-[#0A1628]" />
        </div>
        <div className="relative z-10 text-center px-4">
          <div className="flex items-center justify-center gap-2 text-sm mb-6">
            <Link href="/" className="text-[#8892A4] hover:text-white transition-colors">Home</Link>
            <span className="text-[#8892A4]">/</span>
            <Link href="/people" className="text-[#8892A4] hover:text-white transition-colors">People</Link>
            <span className="text-[#8892A4]">/</span>
            <span className="text-white">Join Us</span>
          </div>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#0066FF]/30 bg-[#0066FF]/10 mb-6">
            <span className="text-[#0066FF] text-sm font-semibold tracking-wide">We Are Hiring</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-4">
            Join Our{' '}
            <span className="bg-gradient-to-r from-[#0066FF] to-[#00C896] bg-clip-text text-transparent">
              Team
            </span>
          </h1>
          <p className="text-[#8892A4] text-lg max-w-2xl mx-auto">
            Build your career at Rasta Infotech — where innovation meets opportunity and great people do their best work.
          </p>
        </div>
      </div>

      <div ref={ref} className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">

        {/* Perks */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-20"
        >
          <h2 className="text-3xl font-black text-white text-center mb-4">
            Why Work at{' '}
            <span className="bg-gradient-to-r from-[#0066FF] to-[#00C896] bg-clip-text text-transparent">
              Rasta Infotech?
            </span>
          </h2>
          <p className="text-[#8892A4] text-center mb-12 max-w-xl mx-auto">
            We believe happy employees build great products. Here is what we offer.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {perks.map((perk, i) => (
              <motion.div
                key={perk.title}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.1 + i * 0.08 }}
                className="p-6 rounded-2xl border border-white/10 bg-white/5 hover:border-[#0066FF]/30 transition-all duration-300 group"
              >
                <div className="mb-4 group-hover:scale-110 transition-transform duration-300">
                  {perk.icon}
                </div>
                <h3 className="text-white font-bold text-lg mb-2">{perk.title}</h3>
                <p className="text-[#8892A4] text-sm leading-relaxed">{perk.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Open Positions */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-20"
        >
          <h2 className="text-3xl font-black text-white text-center mb-4">
            Open{' '}
            <span className="bg-gradient-to-r from-[#0066FF] to-[#00C896] bg-clip-text text-transparent">
              Positions
            </span>
          </h2>
          <p className="text-[#8892A4] text-center mb-12 max-w-xl mx-auto">
            Find your next opportunity at Rasta Infotech.
          </p>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {openings.map((job, i) => (
              <motion.div
                key={job.title}
                initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.3 + i * 0.06 }}
                className="p-6 rounded-2xl border border-white/10 bg-white/5 hover:border-[#0066FF]/30 hover:-translate-y-1 transition-all duration-300 group"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-white font-black text-xl mb-1 group-hover:text-[#0066FF] transition-colors duration-300">
                      {job.title}
                    </h3>
                    <p className="text-[#8892A4] text-sm">{job.dept}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold text-white bg-gradient-to-r ${job.color}`}>
                    {job.type}
                  </span>
                </div>

                <div className="flex flex-wrap gap-3 mb-4 text-xs text-[#8892A4]">
                  <span className="flex items-center gap-1">
                    <svg className="w-3.5 h-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                    </svg>
                    {job.location}
                  </span>
                  <span className="flex items-center gap-1">
                    <svg className="w-3.5 h-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0M12 12.75h.008v.008H12v-.008z" />
                    </svg>
                    {job.exp}
                  </span>
                </div>

                <div className="flex flex-wrap gap-2 mb-5">
                  {job.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-2 py-1 rounded text-xs border border-white/10 text-[#8892A4] bg-white/5"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                <button
                  onClick={() => setActiveJob({ title: job.title, color: job.color })}
                  className={`inline-flex items-center gap-2 text-sm font-bold text-white px-5 py-2 rounded-xl bg-gradient-to-r ${job.color} hover:shadow-lg transition-all duration-300`}
                >
                  Apply Now
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </button>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Hiring Process */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-20"
        >
          <h2 className="text-3xl font-black text-white text-center mb-4">
            Our Hiring{' '}
            <span className="bg-gradient-to-r from-[#0066FF] to-[#00C896] bg-clip-text text-transparent">
              Process
            </span>
          </h2>
          <p className="text-[#8892A4] text-center mb-12 max-w-xl mx-auto">
            Transparent, fast, and candidate-friendly.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-5 gap-4">
            {hiringProcess.map((step, i) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.5 + i * 0.1 }}
                className="relative text-center"
              >
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#0066FF] to-[#00C896] flex items-center justify-center text-white font-black text-sm mx-auto mb-4 shadow-lg shadow-[#0066FF]/30">
                  {step.step}
                </div>
                {i < hiringProcess.length - 1 && (
                  <div className="hidden sm:block absolute top-6 left-[calc(50%+24px)] right-[calc(-50%+24px)] h-px bg-gradient-to-r from-[#0066FF]/40 to-transparent" />
                )}
                <h3 className="text-white font-bold text-sm mb-2">{step.title}</h3>
                <p className="text-[#8892A4] text-xs leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="relative p-8 lg:p-12 rounded-3xl overflow-hidden text-center"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-[#0066FF]/10 to-[#00C896]/10" />
          <div className="absolute inset-0 border border-[#0066FF]/20 rounded-3xl" />
          <div className="relative z-10">
            <h3 className="text-2xl lg:text-3xl font-black text-white mb-3">
              {"Don't see a role that fits?"}
            </h3>
            <p className="text-[#8892A4] mb-6 max-w-xl mx-auto">
              We are always looking for talented people. Send us your resume and we will reach out when the right opportunity opens up.
            </p>
            <button
              onClick={() => setActiveJob({ title: 'General Application', color: 'from-[#0066FF] to-[#00C896]' })}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl text-base font-bold text-white bg-gradient-to-r from-[#0066FF] to-[#00C896] hover:shadow-lg hover:shadow-[#0066FF]/30 transition-all duration-300"
            >
              Send Your Resume
            </button>
          </div>
        </motion.div>

      </div>
    </section>
  )
}
