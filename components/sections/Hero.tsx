'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'

const slides = [
  {
    image: 'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=1600&q=80',
    top: 'Digital Transformation',
    bottom: 'That Drives Results',
    sub: 'Enterprise-grade IT solutions that help businesses scale faster, smarter and more securely.',
  },
  {
    image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=1600&q=80',
    top: 'AI & Cloud Innovation',
    bottom: 'Future-Ready Tech',
    sub: 'Harness the power of AI, cloud, and automation to transform your enterprise operations at scale.',
  },
  {
    image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=1600&q=80',
    top: 'Managed IT Services',
    bottom: 'Trusted By 500+ Clients',
    sub: 'From disaster recovery to business intelligence — we keep your operations running 24/7.',
  },
  {
    image: 'https://images.unsplash.com/photo-1573164713988-8665fc963095?w=1600&q=80',
    top: 'Recruitment & Staffing',
    bottom: 'Built For Growth',
    sub: 'We connect top talent with leading enterprises through smart, AI-powered matching.',
  },
  {
    image: 'https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=1600&q=80',
    top: 'Your Success Is',
    bottom: 'Our Mission',
    sub: 'Rasta Infotech — where digital transformation meets enterprise excellence and lasting innovation.',
  },
]

const stats = [
  { value: 500, suffix: '+', label: 'Professionals Placed' },
  { value: 200, suffix: '+', label: 'Enterprise Clients' },
  { value: 99.9, suffix: '%', label: 'System Uptime' },
  { value: 8, suffix: '+', label: 'Years Experience' },
]

const particles = Array.from({ length: 35 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: Math.random() * 3 + 1,
  duration: Math.random() * 12 + 8,
  delay: Math.random() * 5,
}))

function AnimatedCounter({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    const duration = 2000
    const steps = 60
    const increment = value / steps
    let current = 0
    const timer = setInterval(() => {
      current += increment
      if (current >= value) {
        setCount(value)
        clearInterval(timer)
      } else {
        setCount(Math.floor(current * 10) / 10)
      }
    }, duration / steps)
    return () => clearInterval(timer)
  }, [value])

  return (
    <span>
      {value % 1 === 0 ? Math.floor(count) : count.toFixed(1)}
      {suffix}
    </span>
  )
}

export default function Hero() {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden">

      {/* Background Images */}
      <AnimatePresence mode="sync">
        <motion.div
          key={current}
          initial={{ opacity: 0, scale: 1.08 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.4, ease: 'easeInOut' }}
          className="absolute inset-0 z-0"
        >
          <img
            src={slides[current].image}
            alt="background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-[#0A1628]/80" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0A1628]/96 via-[#0A1628]/87 to-[#0A1628]/65" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A1628] via-transparent to-[#0A1628]/45" />
        </motion.div>
      </AnimatePresence>

      {/* Grid overlay */}
      <div
        className="absolute inset-0 z-10 opacity-[0.07] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(0,102,255,0.5) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,102,255,0.5) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Floating Particles */}
      <div className="absolute inset-0 z-10 overflow-hidden pointer-events-none">
        {particles.map((p) => (
          <motion.div
            key={p.id}
            className="absolute rounded-full bg-[#0066FF]/40"
            style={{ left: `${p.x}%`, top: `${p.y}%`, width: p.size, height: p.size }}
            animate={{ y: [-20, 20, -20], x: [-10, 10, -10], opacity: [0.2, 0.8, 0.2] }}
            transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: 'easeInOut' }}
          />
        ))}
      </div>

      {/* Glowing Orbs */}
      <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-[#0066FF]/10 rounded-full blur-3xl z-10 pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] bg-[#00C896]/8 rounded-full blur-3xl z-10 pointer-events-none" />

      {/* Main Content */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20 w-full">
        <div className="max-w-3xl">

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#0066FF]/40 bg-[#0066FF]/10 backdrop-blur-sm mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-[#00C896] animate-pulse" />
            <span className="text-[#00C896] text-xs sm:text-sm font-semibold tracking-wide">
              Digital Transformation & Enterprise IT Partner
            </span>
          </motion.div>

          {/* Animated Headline */}
          <div className="mb-6 min-h-[120px] sm:min-h-[140px] lg:min-h-[180px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -40 }}
                transition={{ duration: 0.7, ease: 'easeInOut' }}
              >
                <h1 className="text-4xl sm:text-5xl lg:text-7xl font-black leading-tight tracking-tight">
                  <span className="text-white">{slides[current].top}</span>
                  <br />
                  <span className="bg-gradient-to-r from-[#0066FF] via-[#3385FF] to-[#00C896] bg-clip-text text-transparent">
                    {slides[current].bottom}
                  </span>
                </h1>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Animated Subtext */}
          <AnimatePresence mode="wait">
            <motion.p
              key={current}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-[#8892A4] text-base sm:text-lg lg:text-xl max-w-2xl leading-relaxed mb-10"
            >
              {slides[current].sub}
            </motion.p>
          </AnimatePresence>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="flex flex-col sm:flex-row gap-4 mb-12"
          >
            <Link
              href="#services"
              className="group relative px-8 py-4 rounded-xl text-base font-bold text-white overflow-hidden text-center"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-[#0066FF] to-[#3385FF]" />
              <span className="absolute inset-0 bg-gradient-to-r from-[#0066FF] to-[#00C896] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <span className="absolute inset-0 blur-xl bg-gradient-to-r from-[#0066FF] to-[#00C896] opacity-0 group-hover:opacity-50 transition-opacity duration-500" />
              <span className="relative flex items-center justify-center gap-2">
                Explore Services
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
            </Link>

            <Link
              href="/contact"
              className="group relative px-8 py-4 rounded-xl text-base font-bold text-white overflow-hidden text-center border border-[#00C896]/50 hover:border-[#00C896] transition-all duration-300"
            >
              <span className="absolute inset-0 bg-[#00C896]/0 group-hover:bg-[#00C896]/10 transition-colors duration-300" />
              <span className="relative flex items-center justify-center gap-2">
                🤝 Partner With Us
              </span>
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-6 mb-12"
          >
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 + i * 0.1 }}
                className="relative p-4 lg:p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm group hover:border-[#0066FF]/50 transition-all duration-300 cursor-default"
              >
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#0066FF]/5 to-[#00C896]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative">
                  <div className="text-2xl lg:text-4xl font-black bg-gradient-to-r from-[#0066FF] to-[#00C896] bg-clip-text text-transparent">
                    <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                  </div>
                  <div className="text-[#8892A4] text-xs lg:text-sm font-medium mt-1">
                    {stat.label}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Video Placeholder */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="relative rounded-2xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-sm group cursor-pointer max-w-2xl"
          >
            <div className="relative h-48 sm:h-56 flex items-center justify-center">
              <div className="absolute inset-0 bg-gradient-to-br from-[#0066FF]/20 via-[#112240] to-[#00C896]/20" />
              <div
                className="absolute inset-0 opacity-10"
                style={{
                  backgroundImage: `linear-gradient(rgba(0,102,255,0.5) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(0,102,255,0.5) 1px, transparent 1px)`,
                  backgroundSize: '30px 30px',
                }}
              />
              <div className="relative flex flex-col items-center gap-3 z-10">
                <div className="w-16 h-16 rounded-full bg-white/10 border border-white/20 flex items-center justify-center group-hover:bg-[#0066FF]/30 group-hover:border-[#0066FF] transition-all duration-300">
                  <svg className="w-6 h-6 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
                <div className="text-center">
                  <p className="text-white font-bold text-sm">Our Story — IT + Recruitment Success</p>
                  <span className="inline-flex items-center gap-1 mt-1 px-3 py-1 rounded-full bg-[#00C896]/20 border border-[#00C896]/30 text-[#00C896] text-xs font-semibold">
                    🎬 Video Coming Soon
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

        </div>

      </div>

      {/* Slide Dots */}
      <div className="relative z-20 flex justify-center gap-2 pb-6">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`transition-all duration-300 rounded-full ${
              i === current
                ? 'w-8 h-2 bg-[#0066FF]'
                : 'w-2 h-2 bg-white/30 hover:bg-white/60'
            }`}
          />
        ))}
      </div>

      {/* Scroll Indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1"
      >
        <span className="text-[#8892A4] text-xs tracking-widest uppercase">Scroll</span>
        <div className="w-px h-8 bg-gradient-to-b from-[#0066FF] to-transparent" />
      </motion.div>

    </section>
  )
}