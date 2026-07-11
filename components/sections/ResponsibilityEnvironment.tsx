'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Link from 'next/link'

const commitments = [
  {
    icon: '⚡',
    title: 'Renewable Energy',
    desc: 'We are transitioning our offices and data centers to 100% renewable energy sources. Solar and wind-powered infrastructure is a priority in all new facility decisions.',
    color: 'from-[#00C896] to-[#0066FF]',
    target: '100% Renewable by 2027',
    image: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=600&q=80',
  },
  {
    icon: '♻️',
    title: 'Zero Waste Operations',
    desc: 'Comprehensive waste reduction programs including paperless operations, e-waste recycling partnerships, and sustainable procurement policies across our offices.',
    color: 'from-[#0066FF] to-[#3385FF]',
    target: 'Zero Waste by 2026',
    image: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=600&q=80',
  },
  {
    icon: '🌡️',
    title: 'Carbon Footprint Reduction',
    desc: 'Annual carbon footprint measurement and reduction targets. Remote work policies, virtual meetings, and green commute programs contribute to our carbon reduction goals.',
    color: 'from-[#7C3AED] to-[#0066FF]',
    target: '50% Reduction by 2027',
    image: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=600&q=80',
  },
  {
    icon: '💧',
    title: 'Water Conservation',
    desc: 'Water-efficient facilities, rainwater harvesting in our Bangalore office, and employee awareness programs reduce our water consumption year over year.',
    color: 'from-[#0066FF] to-[#00C896]',
    target: '30% Reduction by 2026',
    image: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=600&q=80',
  },
]

const actions = [
  { icon: '🖥️', title: 'Green IT Infrastructure', desc: 'Energy-efficient servers, virtualization, and cloud-first strategy reducing physical hardware footprint.' },
  { icon: '🚴', title: 'Green Commute Program', desc: 'Subsidized public transport passes, cycling allowances, and EV charging at our offices.' },
  { icon: '📄', title: 'Paperless Operations', desc: 'Digital-first workflows, e-signatures, and cloud document management eliminating paper waste.' },
  { icon: '🔌', title: 'Energy Monitoring', desc: 'Smart energy meters tracking consumption in real-time across all facilities with monthly reporting.' },
  { icon: '🌳', title: 'Tree Plantation Drive', desc: 'Annual tree plantation initiatives in partnership with local NGOs — 500+ trees planted to date.' },
  { icon: '🤝', title: 'Sustainable Vendors', desc: 'Preference for suppliers with verified environmental certifications and sustainable practices.' },
]

const metrics = [
  { value: '40%', label: 'Energy Reduction', icon: '⚡' },
  { value: '500+', label: 'Trees Planted', icon: '🌳' },
  { value: '80%', label: 'Paperless Operations', icon: '📄' },
  { value: '2027', label: 'Net Zero Target', icon: '🎯' },
]

const galleryImages = [
  { src: 'https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?w=800&q=80', alt: 'Solar panels renewable energy', span: 'sm:col-span-2' },
  { src: 'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?w=600&q=80', alt: 'Forest and trees nature', span: '' },
  { src: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=600&q=80', alt: 'Wind turbines clean energy', span: '' },
  { src: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=600&q=80', alt: 'Green sustainable living', span: '' },
]

const relatedPages = [
  { href: '/responsibility/governance', icon: '🏛️', label: 'Corporate Governance' },
  { href: '/responsibility/ethics', icon: '⚖️', label: 'Ethics & Compliance' },
  { href: '/responsibility/social', icon: '👥', label: 'Social & People Impact' },
]

export default function EnvironmentPage() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  return (
    <section className="relative bg-[#0A1628] overflow-hidden">

      {/* Hero */}
      <div className="relative pt-32 pb-16">
        <div className="absolute inset-0 z-0">
          {/* Reduced opacity from 20 → 10 */}
          <img
            src="https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=1600&q=80"
            alt="Environment"
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
            <span className="text-white">Environment & Climate</span>
          </div>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#00C896]/30 bg-[#00C896]/10 mb-6">
            <span className="text-2xl">🌿</span>
            <span className="text-[#00C896] text-sm font-semibold">Environment & Climate</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-4 max-w-3xl">
            Environment &{' '}
            <span className="bg-gradient-to-r from-[#00C896] to-[#0066FF] bg-clip-text text-transparent">
              Climate Action
            </span>
          </h1>
          <p className="text-[#8892A4] text-lg max-w-2xl leading-relaxed">
            We take our environmental responsibility seriously. From renewable energy and green IT infrastructure to carbon reduction and tree plantation — we are committed to building a sustainable future.
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
              <p className="text-xl font-black bg-gradient-to-r from-[#00C896] to-[#0066FF] bg-clip-text text-transparent">{m.value}</p>
              <p className="text-[#8892A4] text-xs mt-1">{m.label}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Commitments — with per-card images */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-20"
        >
          <h2 className="text-3xl font-black text-white text-center mb-4">
            Our{' '}
            <span className="bg-gradient-to-r from-[#00C896] to-[#0066FF] bg-clip-text text-transparent">Commitments</span>
          </h2>
          <p className="text-[#8892A4] text-center mb-12 max-w-xl mx-auto">Concrete targets driving our environmental progress.</p>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {commitments.map((c, i) => (
              <motion.div
                key={c.title}
                initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.3 + i * 0.1 }}
                className="rounded-2xl border border-white/10 bg-white/5 hover:border-[#00C896]/30 transition-all duration-300 group overflow-hidden"
              >
                {/* Card image strip */}
                <div className="relative h-40 overflow-hidden">
                  <img
                    src={c.image}
                    alt={c.title}
                    className="w-full h-full object-cover opacity-50 group-hover:opacity-65 group-hover:scale-105 transition-all duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#0A1628]" />
                  <div className={`absolute bottom-4 left-4 w-12 h-12 rounded-xl bg-gradient-to-br ${c.color} flex items-center justify-center text-2xl shadow-lg`}>
                    {c.icon}
                  </div>
                </div>
                {/* Card content */}
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-white font-black text-lg">{c.title}</h3>
                  </div>
                  <p className="text-[#8892A4] text-sm leading-relaxed mb-3">{c.desc}</p>
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold text-[#00C896] bg-[#00C896]/10 border border-[#00C896]/20">
                    🎯 {c.target}
                  </span>
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
                className={`rounded-2xl overflow-hidden h-52 ${img.span}`}
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

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-20"
        >
          <h2 className="text-3xl font-black text-white text-center mb-4">
            Ongoing{' '}
            <span className="bg-gradient-to-r from-[#00C896] to-[#0066FF] bg-clip-text text-transparent">Actions</span>
          </h2>
          <p className="text-[#8892A4] text-center mb-12 max-w-xl mx-auto">What we are doing every day to reduce our environmental impact.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {actions.map((action, i) => (
              <motion.div
                key={action.title}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.5 + i * 0.08 }}
                className="p-6 rounded-2xl border border-white/10 bg-white/5 hover:border-[#00C896]/30 transition-all duration-300 group"
              >
                <div className="text-3xl mb-3 group-hover:scale-110 transition-transform duration-300">{action.icon}</div>
                <h3 className="text-white font-bold text-base mb-2">{action.title}</h3>
                <p className="text-[#8892A4] text-sm leading-relaxed">{action.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Quote Banner — with background image */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="relative p-10 rounded-3xl overflow-hidden text-center mb-16"
        >
          <img
            src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1200&q=80"
            alt="Forest environment"
            className="absolute inset-0 w-full h-full object-cover opacity-10"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#00C896]/15 to-[#0066FF]/15" />
          <div className="absolute inset-0 border border-[#00C896]/20 rounded-3xl" />
          <div className="relative z-10">
            <p className="text-2xl lg:text-3xl font-black text-white mb-4">
              &quot;Technology must be part of the climate solution, not the problem.&quot;
            </p>
            <p className="text-[#8892A4]">— Rasta Infotech Environmental Policy</p>
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