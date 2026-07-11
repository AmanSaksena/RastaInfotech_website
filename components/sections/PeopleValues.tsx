'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Link from 'next/link'

const coreValues = [
  {
    icon: '🚀',
    title: 'Innovation First',
    desc: 'We embrace new technologies, challenge conventional thinking, and continuously push boundaries to deliver solutions that create real competitive advantage for our clients.',
    color: 'from-[#0066FF] to-[#3385FF]',
    examples: ['R&D investment in AI and emerging tech', 'Hackathons and innovation challenges', 'Continuous learning culture'],
  },
  {
    icon: '🤝',
    title: 'Client Success',
    desc: 'Our clients\' success is our success. We go beyond deliverables to become trusted partners, understanding business goals deeply and aligning every action to drive measurable outcomes.',
    color: 'from-[#00C896] to-[#0066FF]',
    examples: ['100% placement assurance commitment', 'Long-term client partnerships', 'Outcome-based engagement models'],
  },
  {
    icon: '💎',
    title: 'Excellence & Quality',
    desc: 'We set high standards for everything we do — from code quality and security to communication and customer service. Good enough is never good enough at Rasta Infotech.',
    color: 'from-[#7C3AED] to-[#0066FF]',
    examples: ['ISO 9001:2015 Quality Management', 'Code review and quality gates', 'Customer satisfaction measurement'],
  },
  {
    icon: '🌍',
    title: 'Inclusion & Diversity',
    desc: 'We believe diverse teams build better products. We actively foster an environment where people from all backgrounds, experiences, and perspectives feel welcomed and valued.',
    color: 'from-[#0066FF] to-[#00C896]',
    examples: ['Women empowerment programs', 'Diverse hiring practices', 'Inclusive workplace policies'],
  },
  {
    icon: '⚖️',
    title: 'Integrity & Trust',
    desc: 'We operate with complete transparency and honesty. We keep our promises, own our mistakes, and build long-term trust with clients, partners, and our team.',
    color: 'from-[#DC2626] to-[#7C3AED]',
    examples: ['Transparent pricing and processes', 'Honest communication always', 'Ethical business practices'],
  },
  {
    icon: '🌱',
    title: 'Continuous Growth',
    desc: 'We invest in the growth of our people, our organization, and the communities we serve. Learning, upskilling, and development are core to who we are.',
    color: 'from-[#00C896] to-[#7C3AED]',
    examples: ['Annual training and certification budget', 'Career development plans', 'Mentorship programs'],
  },
]

const culture = [
  {
    icon: '🎯',
    title: 'Result-Oriented',
    desc: 'We focus on outcomes, not just outputs. Every project is measured by the business impact it creates.',
  },
  {
    icon: '🤜',
    title: 'Collaborative',
    desc: 'Great work happens together. We foster a culture of teamwork, knowledge sharing, and mutual support.',
  },
  {
    icon: '💬',
    title: 'Open Communication',
    desc: 'Ideas flow freely here. We encourage open feedback, honest conversations, and a speak-up culture.',
  },
  {
    icon: '🏃',
    title: 'Move Fast',
    desc: 'We are agile and decisive. We prototype quickly, learn from feedback, and improve continuously.',
  },
  {
    icon: '❤️',
    title: 'Care Deeply',
    desc: 'We care about our people, our clients, and our communities. Empathy is at the heart of everything we do.',
  },
  {
    icon: '🔬',
    title: 'Data-Driven',
    desc: 'We make decisions based on data and evidence, not assumptions. Metrics guide our strategy and execution.',
  },
]

const milestones = [
  { year: '2016', value: '1', label: 'Company Founded' },
  { year: '2018', value: '50+', label: 'Team Members' },
  { year: '2020', value: '100+', label: 'Clients Served' },
  { year: '2022', value: '500+', label: 'Students Placed' },
  { year: '2024', value: '200+', label: 'Hiring Partners' },
  { year: '2025', value: '🌍', label: 'Global Expansion' },
]

export default function ValuesPage() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  return (
    <section className="relative bg-[#0A1628] overflow-hidden">

      {/* Hero */}
      <div className="relative pt-32 pb-16">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1600&q=80"
            alt="Values"
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
            <span className="text-white">Our Values</span>
          </div>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#0066FF]/30 bg-[#0066FF]/10 mb-6">
            <span className="text-[#0066FF] text-sm font-semibold tracking-wide">What We Stand For</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-4">
            Our Core{' '}
            <span className="bg-gradient-to-r from-[#0066FF] to-[#00C896] bg-clip-text text-transparent">
              Values
            </span>
          </h1>
          <p className="text-[#8892A4] text-lg max-w-2xl mx-auto">
            The principles and beliefs that guide every decision, every interaction, and every line of code at Rasta Infotech.
          </p>
        </div>
      </div>

      <div ref={ref} className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">

        {/* Core Values */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-20"
        >
          <h2 className="text-3xl font-black text-white text-center mb-4">
            Core{' '}
            <span className="bg-gradient-to-r from-[#0066FF] to-[#00C896] bg-clip-text text-transparent">
              Values
            </span>
          </h2>
          <p className="text-[#8892A4] text-center mb-12 max-w-xl mx-auto">
            Six principles that define who we are and how we work.
          </p>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {coreValues.map((value, i) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.1 + i * 0.1 }}
                className="p-8 rounded-3xl border border-white/10 bg-white/5 hover:border-[#0066FF]/30 transition-all duration-300 group"
              >
                <div className="flex items-start gap-5">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${value.color} flex items-center justify-center text-3xl shrink-0 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    {value.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-white font-black text-xl mb-3">{value.title}</h3>
                    <p className="text-[#8892A4] text-sm leading-relaxed mb-4">{value.desc}</p>
                    <div className="space-y-1">
                      {value.examples.map((ex) => (
                        <div key={ex} className="flex items-center gap-2 text-xs text-[#8892A4]">
                          <span className={`w-4 h-4 rounded-full bg-gradient-to-br ${value.color} flex items-center justify-center shrink-0`}>
                            <svg className="w-2 h-2 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                            </svg>
                          </span>
                          {ex}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Culture Principles */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-20"
        >
          <h2 className="text-3xl font-black text-white text-center mb-4">
            How We{' '}
            <span className="bg-gradient-to-r from-[#0066FF] to-[#00C896] bg-clip-text text-transparent">
              Work
            </span>
          </h2>
          <p className="text-[#8892A4] text-center mb-12 max-w-xl mx-auto">
            The day-to-day principles that shape our culture.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {culture.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.4 + i * 0.08 }}
                className="p-6 rounded-2xl border border-white/10 bg-white/5 hover:border-[#0066FF]/30 transition-all duration-300 group"
              >
                <div className="text-3xl mb-3 group-hover:scale-110 transition-transform duration-300">
                  {item.icon}
                </div>
                <h3 className="text-white font-bold text-lg mb-2">{item.title}</h3>
                <p className="text-[#8892A4] text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Growth Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mb-20"
        >
          <h2 className="text-3xl font-black text-white text-center mb-4">
            Our{' '}
            <span className="bg-gradient-to-r from-[#0066FF] to-[#00C896] bg-clip-text text-transparent">
              Growth Story
            </span>
          </h2>
          <p className="text-[#8892A4] text-center mb-12 max-w-xl mx-auto">
            Building trust and impact year after year.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {milestones.map((m, i) => (
              <motion.div
                key={m.year}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.6 + i * 0.1 }}
                className="text-center p-5 rounded-2xl border border-white/10 bg-white/5 hover:border-[#0066FF]/30 transition-all duration-300"
              >
                <p className="text-[#0066FF] text-xs font-bold mb-2">{m.year}</p>
                <p className="text-2xl font-black bg-gradient-to-r from-[#0066FF] to-[#00C896] bg-clip-text text-transparent mb-1">
                  {m.value}
                </p>
                <p className="text-[#8892A4] text-xs leading-tight">{m.label}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Mission & Vision */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16"
        >
          <div className="relative p-8 rounded-3xl overflow-hidden border border-[#0066FF]/20">
            <div className="absolute inset-0 bg-gradient-to-br from-[#0066FF]/10 to-transparent" />
            <div className="relative z-10">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#0066FF] to-[#3385FF] flex items-center justify-center text-2xl mb-5">
                🎯
              </div>
              <h3 className="text-white font-black text-2xl mb-4">Our Mission</h3>
              <p className="text-[#8892A4] leading-relaxed">
                To empower businesses and individuals through innovative technology solutions — delivering digital transformation that creates real, measurable impact and unlocking career opportunities for the next generation of IT professionals.
              </p>
            </div>
          </div>

          <div className="relative p-8 rounded-3xl overflow-hidden border border-[#00C896]/20">
            <div className="absolute inset-0 bg-gradient-to-br from-[#00C896]/10 to-transparent" />
            <div className="relative z-10">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#00C896] to-[#0066FF] flex items-center justify-center text-2xl mb-5">
                🔭
              </div>
              <h3 className="text-white font-black text-2xl mb-4">Our Vision</h3>
              <p className="text-[#8892A4] leading-relaxed">
                To be India&apos;s most trusted digital transformation partner — recognized for our technical excellence, ethical practices, and the hundreds of careers we launch every year through our guaranteed placement programs.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="relative p-8 lg:p-12 rounded-3xl overflow-hidden text-center"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-[#0066FF]/10 to-[#00C896]/10" />
          <div className="absolute inset-0 border border-[#0066FF]/20 rounded-3xl" />
          <div className="relative z-10">
            <h3 className="text-2xl lg:text-3xl font-black text-white mb-3">
              Share Our Values? Join Us.
            </h3>
            <p className="text-[#8892A4] mb-6 max-w-xl mx-auto">
              If these values resonate with you, we would love to have you on the team.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/people/join-us"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-base font-bold text-white bg-gradient-to-r from-[#0066FF] to-[#00C896] hover:shadow-lg transition-all duration-300"
              >
                View Open Positions
              </Link>
              <Link
                href="/people/team"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-base font-bold text-white border border-white/20 hover:border-white/40 transition-all duration-300"
              >
                Meet The Team
              </Link>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  )
}