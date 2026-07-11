'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Link from 'next/link'

const partners = [
  { name: 'wipro', style: 'font-light tracking-widest text-white text-xl' },
  { name: 'TCS', style: 'font-bold tracking-wide text-white text-2xl' },
  { name: 'accenture', style: 'font-light tracking-tight text-white text-2xl' },
  { name: 'Cognizant', style: 'font-normal tracking-wide text-white text-xl' },
  { name: 'Infosys', style: 'font-bold tracking-wide text-white text-xl' },
  { name: 'HCL Tech', style: 'font-bold tracking-wide text-white text-xl' },
  { name: 'IBM', style: 'font-black tracking-widest text-white text-2xl' },
  { name: 'Capgemini', style: 'font-light tracking-wide text-white text-xl' },
]

const features = [
  {
    icon: '🌐',
    title: 'Robust Partner Network',
    desc: 'Access to 200+ top hiring companies across IT, finance, healthcare and more.',
    color: 'from-[#0066FF] to-[#3385FF]',
  },
  {
    icon: '🎯',
    title: 'Dedicated Career Support',
    desc: 'Every candidate gets personalised career coaching and direct referrals until they land the right role.',
    color: 'from-[#00C896] to-[#0066FF]',
  },
  {
    icon: '📜',
    title: 'Career Success Certified',
    desc: 'Our programs carry a career success certification backed by real results and 500+ success stories.',
    color: 'from-[#7C3AED] to-[#0066FF]',
  },
  {
    icon: '🤖',
    title: 'AI-Powered Job Matching',
    desc: 'Smart algorithm matches your skills and goals to the best-fit opportunities.',
    color: 'from-[#0066FF] to-[#00C896]',
  },
  {
    icon: '💼',
    title: 'Payroll & Contract Hiring',
    desc: 'Full payroll management and contract staffing solutions for enterprises.',
    color: 'from-[#00C896] to-[#7C3AED]',
  },
  {
    icon: '🚀',
    title: 'Extended Placement Services',
    desc: 'Career support beyond placement — mentorship, upskilling and growth tracking.',
    color: 'from-[#3385FF] to-[#00C896]',
  },
]

const testimonials = [
  {
    name: 'Sourabh Sharma',
    company: 'Gandiva IT Services',
    text: 'Working with Rasta Infotech was a game-changer. They quickly understood our requirements and delivered a high-quality solution ahead of schedule.',
    avatar: 'SS',
    color: 'from-[#0066FF] to-[#3385FF]',
  },
  {
    name: 'Aarav Mehta',
    company: 'BB Infotech Solutions',
    text: 'Rasta Infotech helped us revamp our digital presence. We saw a 40% increase in user engagement within the first month.',
    avatar: 'AM',
    color: 'from-[#00C896] to-[#0066FF]',
  },
  {
    name: 'Priya Nair',
    company: 'Artiset',
    text: 'Their DevOps automation services streamlined our entire release cycle. Their team is knowledgeable, proactive, and genuinely cares about client success.',
    avatar: 'PN',
    color: 'from-[#7C3AED] to-[#0066FF]',
  },
  {
    name: 'Rahul Verma',
    company: 'Wraystech Pvt Ltd',
    text: 'We collaborated with Rasta Infotech on a complex web application, and they exceeded our expectations. Highly recommend them!',
    avatar: 'RV',
    color: 'from-[#0066FF] to-[#00C896]',
  },
  {
    name: 'Anjali Desai',
    company: 'Tagskills',
    text: 'Excellent service from start to finish. Timely updates, clear documentation, and thoughtful suggestions that improved our product.',
    avatar: 'AD',
    color: 'from-[#00C896] to-[#7C3AED]',
  },
  {
    name: 'Karan Patel',
    company: 'Canarys Pvt Ltd',
    text: 'None matched the efficiency and dedication of Rasta Infotech. They deliver what they promise, and they do it with integrity.',
    avatar: 'KP',
    color: 'from-[#3385FF] to-[#00C896]',
  },
]

const steps = [
  { number: '01', title: 'Apply Online', desc: 'Fill out a quick form and tell us about your skills and goals.' },
  { number: '02', title: 'AI Skill Match', desc: 'Our AI engine matches your profile to the best opportunities.' },
  { number: '03', title: 'Training & Prep', desc: 'Get interview coaching, resume building and skill gap training.' },
  { number: '04', title: 'Launch Your Career', desc: 'Dedicated support from our talent team until you land the right role.' },
]

export default function Recruitment() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="recruitment" className="relative py-24 bg-[#060F1E] overflow-hidden">

      {/* Background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-[#0066FF]/30 to-transparent" />
        <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-[#0066FF]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-0 w-[400px] h-[400px] bg-[#00C896]/5 rounded-full blur-3xl" />
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `linear-gradient(rgba(0,102,255,0.5) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0,102,255,0.5) 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#00C896]/30 bg-[#00C896]/10 mb-6">
            <span className="w-2 h-2 rounded-full bg-[#00C896] animate-pulse" />
            <span className="text-[#00C896] text-sm font-semibold tracking-wide">Talent Acquisition & Workforce Solutions</span>
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-6">
            Recruitment &{' '}
            <span className="bg-gradient-to-r from-[#0066FF] to-[#00C896] bg-clip-text text-transparent">
              Staffing Solutions
            </span>
          </h2>
          <p className="text-[#8892A4] text-lg max-w-2xl mx-auto">
            Powering digital transformation teams. Our AI-driven talent ecosystem connects
            the right people to the right opportunities — at speed and scale.
          </p>
        </motion.div>

        {/* Placement Tracker */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative rounded-3xl border border-[#00C896]/20 bg-gradient-to-br from-[#00C896]/10 to-[#0066FF]/10 p-8 lg:p-12 mb-16 overflow-hidden"
        >
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-[#00C896]/5 to-transparent pointer-events-none" />
          <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00C896]/20 border border-[#00C896]/30 mb-4">
                <span className="text-[#00C896] text-xs font-bold tracking-widest uppercase">Career Assured</span>
              </div>
              <h3 className="text-3xl lg:text-4xl font-black text-white mb-4">
                Our Talent Success
                <span className="bg-gradient-to-r from-[#00C896] to-[#0066FF] bg-clip-text text-transparent"> Rate</span>
              </h3>
              <p className="text-[#8892A4] text-base leading-relaxed mb-6">
                Every candidate in our network receives dedicated career coaching,
                interview preparation, and direct referrals to our enterprise partner network.
              </p>
              <div className="flex items-center gap-4">
                <Link
                  href="#contact"
                  className="px-6 py-3 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-[#00C896] to-[#0066FF] hover:shadow-lg hover:shadow-[#00C896]/30 transition-all duration-300"
                >
                  Apply Now →
                </Link>
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-2">
                    {['AM', 'RV', 'PN', 'KP'].map((init, i) => (
                      <div key={i} className={`w-8 h-8 rounded-full bg-gradient-to-br ${i % 2 === 0 ? 'from-[#0066FF] to-[#3385FF]' : 'from-[#00C896] to-[#0066FF]'} flex items-center justify-center text-white text-xs font-bold border-2 border-[#060F1E]`}>
                        {init}
                      </div>
                    ))}
                  </div>
                  <span className="text-[#8892A4] text-xs">500+ placed</span>
                </div>
              </div>
            </div>

            {/* Visual tracker */}
            <div className="space-y-4">
              {[
                { label: 'Placement Rate', value: 100, color: '#00C896' },
                { label: 'Interview Success', value: 92, color: '#0066FF' },
                { label: 'Salary Growth', value: 85, color: '#7C3AED' },
                { label: 'Partner Satisfaction', value: 98, color: '#3385FF' },
              ].map((item, i) => (
                <div key={item.label}>
                  <div className="flex justify-between mb-1">
                    <span className="text-[#8892A4] text-sm">{item.label}</span>
                    <span className="text-white text-sm font-bold">{item.value}%</span>
                  </div>
                  <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={isInView ? { width: `${item.value}%` } : {}}
                      transition={{ duration: 1.2, delay: 0.5 + i * 0.15, ease: 'easeOut' }}
                      className="h-full rounded-full"
                      style={{ background: `linear-gradient(90deg, ${item.color}, ${item.color}aa)` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* How It Works */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-16"
        >
          <h3 className="text-2xl lg:text-3xl font-black text-white text-center mb-10">
            How It{' '}
            <span className="bg-gradient-to-r from-[#0066FF] to-[#00C896] bg-clip-text text-transparent">Works</span>
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step, i) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.4 + i * 0.1 }}
                className="relative p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm group hover:border-[#0066FF]/40 transition-all duration-300 text-center"
              >
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#0066FF]/5 to-[#00C896]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative">
                  <div className="text-4xl font-black bg-gradient-to-r from-[#0066FF] to-[#00C896] bg-clip-text text-transparent mb-3">
                    {step.number}
                  </div>
                  <h4 className="text-white font-bold text-lg mb-2">{step.title}</h4>
                  <p className="text-[#8892A4] text-sm leading-relaxed">{step.desc}</p>
                </div>
                {i < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-px bg-gradient-to-r from-[#0066FF] to-transparent" />
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-16"
        >
          <h3 className="text-2xl lg:text-3xl font-black text-white text-center mb-10">
            What Makes Us{' '}
            <span className="bg-gradient-to-r from-[#0066FF] to-[#00C896] bg-clip-text text-transparent">Different</span>
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.5 + i * 0.1 }}
                className="p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm group hover:border-white/20 hover:-translate-y-1 transition-all duration-300"
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${f.color} flex items-center justify-center text-2xl mb-4 shadow-lg`}>
                  {f.icon}
                </div>
                <h4 className="text-white font-bold text-lg mb-2">{f.title}</h4>
                <p className="text-[#8892A4] text-sm leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Partner Logo Carousel */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mb-16"
        >
          <p className="text-center text-[#8892A4] text-sm font-semibold tracking-widest uppercase mb-8">
            Our Hiring Partners
          </p>
          <div className="relative overflow-hidden">
            <div className="flex gap-6 animate-[scroll_25s_linear_infinite]">
              {[...partners, ...partners].map((p, i) => (
                <div
                  key={i}
                  className="shrink-0 flex items-center justify-center px-10 py-6 rounded-xl border border-white/10 bg-[#0D1B2E] min-w-[180px] h-20 hover:border-white/20 hover:bg-[#112240] transition-all duration-300"
                >
                  <span className={p.style}>{p.name}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Certification Badge */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex flex-col lg:flex-row gap-6 mb-16"
        >
          {/* Badge */}
          <div className="flex-1 relative p-8 rounded-3xl border border-[#00C896]/30 bg-gradient-to-br from-[#00C896]/10 to-transparent text-center">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#00C896] to-[#0066FF] flex items-center justify-center text-4xl mx-auto mb-4 shadow-lg shadow-[#00C896]/20">
              🏆
            </div>
            <h4 className="text-white font-black text-xl mb-2">Career Success Certified</h4>
            <p className="text-[#8892A4] text-sm">Every program carries our career success certification — backed by real results and 500+ success stories.</p>
          </div>

          {/* Payroll Coming Soon */}
          <div className="flex-1 relative p-8 rounded-3xl border border-[#0066FF]/30 bg-gradient-to-br from-[#0066FF]/10 to-transparent text-center overflow-hidden">
            <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-[#0066FF]/20 border border-[#0066FF]/30 text-[#0066FF] text-xs font-bold">
              Coming Soon
            </div>
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#0066FF] to-[#7C3AED] flex items-center justify-center text-4xl mx-auto mb-4 shadow-lg shadow-[#0066FF]/20">
              💳
            </div>
            <h4 className="text-white font-black text-xl mb-2">Payroll Management</h4>
            <p className="text-[#8892A4] text-sm mb-4">Full payroll lifecycle management for enterprises — from onboarding to offboarding.</p>
            <button className="px-5 py-2 rounded-lg text-sm font-bold text-white border border-[#0066FF]/40 hover:border-[#0066FF] hover:bg-[#0066FF]/10 transition-all duration-300">
              Notify Me →
            </button>
          </div>
        </motion.div>

        {/* Testimonials */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.7 }}
        >
          <h3 className="text-2xl lg:text-3xl font-black text-white text-center mb-10">
            What Our{' '}
            <span className="bg-gradient-to-r from-[#0066FF] to-[#00C896] bg-clip-text text-transparent">Clients Say</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.8 + i * 0.1 }}
                className="p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm hover:border-white/20 transition-all duration-300 group"
              >
                <div className="text-[#0066FF] text-3xl mb-3">&ldquo;</div>
                <p className="text-[#8892A4] text-sm leading-relaxed mb-4 group-hover:text-white/70 transition-colors duration-300">
                  {t.text}
                </p>
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${t.color} flex items-center justify-center text-white text-xs font-bold`}>
                    {t.avatar}
                  </div>
                  <div>
                    <p className="text-white text-sm font-bold">{t.name}</p>
                    <p className="text-[#8892A4] text-xs">{t.company}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Bottom CTA */}
          <div className="text-center">
            <Link
              href="#contact"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl text-base font-bold text-white bg-gradient-to-r from-[#0066FF] to-[#00C896] hover:shadow-lg hover:shadow-[#0066FF]/30 transition-all duration-300"
            >
              🎓 Apply Now — Career Success Programs
            </Link>
          </div>
        </motion.div>

      </div>
    </section>
  )
}