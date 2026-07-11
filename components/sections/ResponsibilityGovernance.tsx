'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Link from 'next/link'

const pillars = [
  {
    icon: '📋',
    title: 'Board Oversight',
    desc: 'Our leadership structure ensures clear accountability at every level. The Board of Directors provides strategic oversight, risk governance, and ensures ethical conduct across all operations.',
    color: 'from-[#0066FF] to-[#3385FF]',
    image: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=600&q=80',
  },
  {
    icon: '🔍',
    title: 'Transparency & Reporting',
    desc: 'We maintain open and honest communication with all stakeholders. Regular performance reviews, financial disclosures, and ESG reporting keep our organization accountable.',
    color: 'from-[#00C896] to-[#0066FF]',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80',
  },
  {
    icon: '⚖️',
    title: 'Risk Management',
    desc: 'Proactive identification, assessment, and mitigation of business risks ensures organizational resilience. Our risk framework covers operational, financial, cyber, and reputational risks.',
    color: 'from-[#7C3AED] to-[#0066FF]',
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&q=80',
  },
  {
    icon: '🛡️',
    title: 'Policy Framework',
    desc: 'Comprehensive policies covering data protection, anti-corruption, conflict of interest, and whistleblower protections form the backbone of our governance framework.',
    color: 'from-[#DC2626] to-[#7C3AED]',
    image: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?w=600&q=80',
  },
]

const initiatives = [
  {
    icon: '📊',
    title: 'Annual ESG Reporting',
    desc: 'We publish annual Environmental, Social, and Governance reports tracking our progress on sustainability, social impact, and governance metrics.',
    status: 'Active',
  },
  {
    icon: '🏆',
    title: 'ISO 9001:2015 Certification',
    desc: 'Our quality management system is ISO 9001:2015 certified, ensuring consistent delivery excellence across all services.',
    status: 'Certified',
  },
  {
    icon: '🔐',
    title: 'ISO 27001 Information Security',
    desc: 'ISO 27001 certification demonstrates our commitment to protecting client data and maintaining robust information security management.',
    status: 'Certified',
  },
  {
    icon: '🤝',
    title: 'Supplier Code of Conduct',
    desc: 'All suppliers and partners are required to adhere to our Supplier Code of Conduct covering labor practices, environmental standards, and ethical business conduct.',
    status: 'Active',
  },
  {
    icon: '📣',
    title: 'Whistleblower Policy',
    desc: 'Anonymous reporting channels allow employees and stakeholders to raise concerns about unethical conduct without fear of retaliation.',
    status: 'Active',
  },
  {
    icon: '👁️',
    title: 'Anti-Corruption Framework',
    desc: 'Zero tolerance for bribery and corruption. Mandatory training, third-party due diligence, and clear gift and hospitality policies.',
    status: 'Active',
  },
]

const metrics = [
  { value: '100%', label: 'Board Independence', icon: '🏛️' },
  { value: 'ISO 9001', label: 'Quality Certified', icon: '🏆' },
  { value: 'ISO 27001', label: 'Security Certified', icon: '🔐' },
  { value: 'Zero', label: 'Corruption Incidents', icon: '✅' },
]

const galleryImages = [
  { src: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=800&q=80', alt: 'Corporate boardroom meeting', span: 'sm:col-span-2' },
  { src: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=600&q=80', alt: 'Professional business people' },
  { src: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&q=80', alt: 'Corporate building governance' },
  { src: 'https://images.unsplash.com/photo-1560472355-536de3962603?w=600&q=80', alt: 'Strategy and planning session' },
]

const relatedPages = [
  { href: '/responsibility/environment', icon: '🌿', label: 'Environment & Climate' },
  { href: '/responsibility/ethics', icon: '⚖️', label: 'Ethics & Compliance' },
  { href: '/responsibility/social', icon: '👥', label: 'Social & People Impact' },
]

export default function GovernancePage() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  return (
    <section className="relative bg-[#0A1628] overflow-hidden">

      {/* Hero */}
      <div className="relative pt-32 pb-16">
        <div className="absolute inset-0 z-0">
          {/* Reduced opacity from 20 → 10 */}
          <img
            src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1600&q=80"
            alt="Governance"
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
            <span className="text-white">Governance</span>
          </div>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#0066FF]/30 bg-[#0066FF]/10 mb-6">
            <span className="text-2xl">🏛️</span>
            <span className="text-[#0066FF] text-sm font-semibold">Sustainable Corporate Governance</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-4 max-w-3xl">
            Sustainable Corporate{' '}
            <span className="bg-gradient-to-r from-[#0066FF] to-[#00C896] bg-clip-text text-transparent">
              Governance
            </span>
          </h1>
          <p className="text-[#8892A4] text-lg max-w-2xl leading-relaxed">
            We believe strong governance is the foundation of a sustainable business. Our governance framework ensures transparency, accountability, and ethical conduct at every level of the organization.
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
              <p className="text-xl font-black bg-gradient-to-r from-[#0066FF] to-[#00C896] bg-clip-text text-transparent">{m.value}</p>
              <p className="text-[#8892A4] text-xs mt-1">{m.label}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Pillars — with per-card images */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-20"
        >
          <h2 className="text-3xl font-black text-white text-center mb-4">
            Governance{' '}
            <span className="bg-gradient-to-r from-[#0066FF] to-[#00C896] bg-clip-text text-transparent">Pillars</span>
          </h2>
          <p className="text-[#8892A4] text-center mb-12 max-w-xl mx-auto">The four foundations of our governance framework.</p>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {pillars.map((pillar, i) => (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.3 + i * 0.1 }}
                className="rounded-2xl border border-white/10 bg-white/5 hover:border-[#0066FF]/30 transition-all duration-300 group overflow-hidden"
              >
                {/* Card image strip */}
                <div className="relative h-40 overflow-hidden">
                  <img
                    src={pillar.image}
                    alt={pillar.title}
                    className="w-full h-full object-cover opacity-50 group-hover:opacity-65 group-hover:scale-105 transition-all duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#0A1628]" />
                  <div className={`absolute bottom-4 left-4 w-12 h-12 rounded-xl bg-gradient-to-br ${pillar.color} flex items-center justify-center text-2xl shadow-lg`}>
                    {pillar.icon}
                  </div>
                </div>
                {/* Card content */}
                <div className="p-6">
                  <h3 className="text-white font-black text-xl mb-3">{pillar.title}</h3>
                  <p className="text-[#8892A4] leading-relaxed">{pillar.desc}</p>
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
                className={`rounded-2xl overflow-hidden h-52 ${img.span ?? ''}`}
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

        {/* Initiatives */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-20"
        >
          <h2 className="text-3xl font-black text-white text-center mb-4">
            Key{' '}
            <span className="bg-gradient-to-r from-[#0066FF] to-[#00C896] bg-clip-text text-transparent">Initiatives</span>
          </h2>
          <p className="text-[#8892A4] text-center mb-12 max-w-xl mx-auto">Programs and policies driving our governance commitments.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {initiatives.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.5 + i * 0.08 }}
                className="p-6 rounded-2xl border border-white/10 bg-white/5 hover:border-[#0066FF]/30 transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-2xl">{item.icon}</span>
                  <span className="px-2 py-1 rounded-full text-xs font-bold text-[#00C896] bg-[#00C896]/10 border border-[#00C896]/20">
                    {item.status}
                  </span>
                </div>
                <h3 className="text-white font-bold text-base mb-2">{item.title}</h3>
                <p className="text-[#8892A4] text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Quote Banner — with background image */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.55 }}
          className="relative p-10 rounded-3xl overflow-hidden text-center mb-16"
        >
          <img
            src="https://images.unsplash.com/photo-1444653614773-995cb1ef9efa?w=1200&q=80"
            alt="Corporate governance"
            className="absolute inset-0 w-full h-full object-cover opacity-10"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0066FF]/15 to-[#00C896]/15" />
          <div className="absolute inset-0 border border-[#0066FF]/20 rounded-3xl" />
          <div className="relative z-10">
            <p className="text-2xl lg:text-3xl font-black text-white mb-4">
              &quot;Good governance is not just a responsibility — it is our competitive advantage.&quot;
            </p>
            <p className="text-[#8892A4]">— Rasta Infotech Governance Charter</p>
          </div>
        </motion.div>

        {/* Related Pages */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
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