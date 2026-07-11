'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Link from 'next/link'

const principles = [
  {
    icon: '🔒',
    title: 'Data Privacy & Protection',
    desc: 'We treat client and user data as sacred. Strict data governance policies, GDPR compliance, ISO 27001 certification, and regular privacy audits ensure your data is always protected.',
    color: 'from-[#0066FF] to-[#3385FF]',
    image: 'https://images.unsplash.com/photo-1614064641938-3bbee52942c7?w=600&q=80',
    points: ['GDPR & PDPB Compliance', 'Data minimization principles', 'Regular privacy impact assessments', 'Mandatory staff privacy training'],
  },
  {
    icon: '🤝',
    title: 'Fair Business Practices',
    desc: 'We compete on merit, not manipulation. Transparent pricing, honest communication, and ethical sales practices define how we do business with every client and partner.',
    color: 'from-[#7C3AED] to-[#0066FF]',
    image: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?w=600&q=80',
    points: ['Transparent contract terms', 'No hidden fees or charges', 'Ethical sales practices', 'Fair vendor treatment'],
  },
  {
    icon: '🧑‍💻',
    title: 'Responsible AI',
    desc: 'As an AI services provider, we commit to building AI systems that are fair, explainable, and free from harmful bias. Responsible AI principles guide every model we build.',
    color: 'from-[#00C896] to-[#7C3AED]',
    image: 'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=600&q=80',
    points: ['Bias testing and mitigation', 'Explainable AI models', 'Human oversight requirements', 'Ethical AI use cases only'],
  },
  {
    icon: '⚖️',
    title: 'Anti-Corruption & Bribery',
    desc: 'Zero tolerance for corruption, bribery, or unethical financial conduct. Our anti-corruption framework includes mandatory training, gift policies, and third-party due diligence.',
    color: 'from-[#DC2626] to-[#7C3AED]',
    image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600&q=80',
    points: ['Zero bribery tolerance', 'Gift and hospitality policy', 'Third-party due diligence', 'Annual compliance training'],
  },
]

const policies = [
  { icon: '📋', title: 'Code of Conduct', desc: 'Comprehensive guidelines governing professional behavior, conflicts of interest, and ethical decision-making for all employees.' },
  { icon: '🔐', title: 'Data Protection Policy', desc: 'Detailed framework for collecting, storing, processing, and deleting personal and client data in compliance with global regulations.' },
  { icon: '📣', title: 'Whistleblower Policy', desc: 'Anonymous reporting channels with guaranteed protection against retaliation for employees raising ethical concerns.' },
  { icon: '🌐', title: 'Acceptable Use Policy', desc: 'Guidelines for responsible use of company technology, internet, and information systems.' },
  { icon: '🤝', title: 'Supplier Code of Conduct', desc: 'Standards requiring all suppliers and partners to uphold ethical labor, environmental, and business practices.' },
  { icon: '💬', title: 'Social Media Policy', desc: 'Guidelines ensuring professional and ethical representation of the company on social media platforms.' },
]

const metrics = [
  { value: 'GDPR', label: 'Compliant', icon: '🇪🇺' },
  { value: 'ISO 27001', label: 'Certified', icon: '🔐' },
  { value: 'Zero', label: 'Ethical Violations', icon: '✅' },
  { value: '100%', label: 'Staff Trained', icon: '🎓' },
]

const relatedPages = [
  { href: '/responsibility/governance', icon: '🏛️', label: 'Corporate Governance' },
  { href: '/responsibility/environment', icon: '🌿', label: 'Environment & Climate' },
  { href: '/responsibility/social', icon: '👥', label: 'Social & People Impact' },
]

// Gallery images for the mid-page visual break
const galleryImages = [
  { src: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&q=80', alt: 'Ethics and compliance documentation', span: 'lg:col-span-2' },
  { src: 'https://images.unsplash.com/photo-1556761175-4b46a572b786?w=600&q=80', alt: 'Team discussion on compliance', span: '' },
  { src: 'https://images.unsplash.com/photo-1573164574572-cb89e39749b4?w=600&q=80', alt: 'Data security and privacy', span: '' },
  { src: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=600&q=80', alt: 'Professional business meeting', span: '' },
]

export default function EthicsPage() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  return (
    <section className="relative bg-[#0A1628] overflow-hidden">

      {/* Hero */}
      <div className="relative pt-32 pb-16">
        <div className="absolute inset-0 z-0">
          {/* Reduced opacity from 20 → 10 */}
          <img
            src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1600&q=80"
            alt="Ethics"
            className="w-full h-full object-cover opacity-10"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0A1628]/70 to-[#0A1628]" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-sm mb-6 flex-wrap">
            <Link href="/" className="text-[#8892A4] hover:text-white transition-colors">Home</Link>
            <span className="text-[#8892A4]">/</span>
            <Link href="/responsibility" className="text-[#8892A4] hover:text-white transition-colors">Responsibility</Link>
            <span className="text-[#8892A4]">/</span>
            <span className="text-white">Ethics & Compliance</span>
          </div>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#7C3AED]/30 bg-[#7C3AED]/10 mb-6">
            <span className="text-2xl">⚖️</span>
            <span className="text-[#7C3AED] text-sm font-semibold">Ethics & Compliance</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-4 max-w-3xl">
            Ethics &{' '}
            <span className="bg-gradient-to-r from-[#7C3AED] to-[#0066FF] bg-clip-text text-transparent">
              Compliance
            </span>
          </h1>
          <p className="text-[#8892A4] text-lg max-w-2xl leading-relaxed">
            Integrity is non-negotiable at Rasta Infotech. We hold ourselves to the highest ethical standards in everything — from how we handle data to how we treat our people, clients, and competitors.
          </p>
        </div>
      </div>

      <div ref={ref} className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">

        {/* Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-5 mb-20"
        >
          {metrics.map((m, i) => (
            <motion.div
              key={m.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.1 + i * 0.1 }}
              className="text-center p-6 rounded-2xl border border-white/10 bg-white/5"
            >
              <div className="text-3xl mb-2">{m.icon}</div>
              <p className="text-xl font-black bg-gradient-to-r from-[#7C3AED] to-[#0066FF] bg-clip-text text-transparent">{m.value}</p>
              <p className="text-[#8892A4] text-xs mt-1">{m.label}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Principles — now with per-card images */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-20"
        >
          <h2 className="text-3xl font-black text-white text-center mb-4">
            Ethical{' '}
            <span className="bg-gradient-to-r from-[#7C3AED] to-[#0066FF] bg-clip-text text-transparent">Principles</span>
          </h2>
          <p className="text-[#8892A4] text-center mb-12 max-w-xl mx-auto">The core ethical commitments that guide every decision.</p>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {principles.map((p, i) => (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.3 + i * 0.1 }}
                className="rounded-2xl border border-white/10 bg-white/5 hover:border-[#7C3AED]/30 transition-all duration-300 group overflow-hidden"
              >
                {/* Card image strip */}
                <div className="relative h-40 overflow-hidden">
                  <img
                    src={p.image}
                    alt={p.title}
                    className="w-full h-full object-cover opacity-50 group-hover:opacity-60 group-hover:scale-105 transition-all duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#0A1628]" />
                  <div className={`absolute bottom-4 left-4 w-12 h-12 rounded-xl bg-gradient-to-br ${p.color} flex items-center justify-center text-2xl shadow-lg`}>
                    {p.icon}
                  </div>
                </div>
                {/* Card content */}
                <div className="p-6">
                  <h3 className="text-white font-black text-lg mb-3">{p.title}</h3>
                  <p className="text-[#8892A4] text-sm leading-relaxed mb-4">{p.desc}</p>
                  <div className="space-y-1">
                    {p.points.map((point) => (
                      <div key={point} className="flex items-center gap-2 text-xs text-[#8892A4]">
                        <span className={`w-4 h-4 rounded-full bg-gradient-to-br ${p.color} flex items-center justify-center shrink-0`}>
                          <svg className="w-2 h-2 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        </span>
                        {point}
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Visual Gallery Break */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="mb-20"
        >
          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {galleryImages.map((img, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.4 + i * 0.08 }}
                className={`rounded-2xl overflow-hidden ${img.span} h-52`}
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  className="w-full h-full object-cover opacity-60 hover:opacity-80 hover:scale-105 transition-all duration-500"
                />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Policies */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-20"
        >
          <h2 className="text-3xl font-black text-white text-center mb-4">
            Our{' '}
            <span className="bg-gradient-to-r from-[#7C3AED] to-[#0066FF] bg-clip-text text-transparent">Policies</span>
          </h2>
          <p className="text-[#8892A4] text-center mb-12 max-w-xl mx-auto">Documented policies backing our ethical commitments.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {policies.map((policy, i) => (
              <motion.div
                key={policy.title}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.5 + i * 0.08 }}
                className="p-6 rounded-2xl border border-white/10 bg-white/5 hover:border-[#7C3AED]/30 transition-all duration-300 group"
              >
                <div className="text-3xl mb-3 group-hover:scale-110 transition-transform duration-300">{policy.icon}</div>
                <h3 className="text-white font-bold text-base mb-2">{policy.title}</h3>
                <p className="text-[#8892A4] text-sm leading-relaxed">{policy.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Report Concern CTA — with background image */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="relative p-8 lg:p-12 rounded-3xl overflow-hidden text-center mb-16"
        >
          {/* Background image */}
          <img
            src="https://images.unsplash.com/photo-1568992687947-868a62a9f521?w=1200&q=80"
            alt="Report concern"
            className="absolute inset-0 w-full h-full object-cover opacity-10"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#7C3AED]/20 to-[#0066FF]/20" />
          <div className="absolute inset-0 border border-[#7C3AED]/20 rounded-3xl" />
          <div className="relative z-10">
            <div className="text-5xl mb-4">📣</div>
            <h3 className="text-2xl lg:text-3xl font-black text-white mb-3">Report an Ethical Concern</h3>
            <p className="text-[#8892A4] mb-6 max-w-xl mx-auto">
              If you have concerns about unethical conduct, data misuse, or policy violations, please reach out. All reports are confidential and protected.
            </p>
            <a
              href="mailto:info@rastainfotech.com?subject=Ethics Report - Confidential"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl text-base font-bold text-white bg-gradient-to-r from-[#7C3AED] to-[#0066FF] hover:shadow-lg transition-all duration-300"
            >
              Report Confidentially
            </a>
          </div>
        </motion.div>

        {/* Related Pages */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.7 }}
        >
          <h2 className="text-2xl font-black text-white mb-6">Explore More</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {relatedPages.map((page) => (
              <Link
                key={page.href}
                href={page.href}
                className="group p-5 rounded-xl border border-white/10 bg-white/5 hover:border-[#0066FF]/40 hover:bg-[#0066FF]/5 transition-all duration-300 flex items-center gap-3"
              >
                <span className="text-2xl">{page.icon}</span>
                <span className="text-[#8892A4] group-hover:text-white text-sm font-medium transition-colors">{page.label}</span>
                <svg className="w-4 h-4 text-[#0066FF] ml-auto group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  )
}