'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Link from 'next/link'

export default function AboutPreview() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="about" className="relative py-24 bg-[#060F1E] overflow-hidden">

      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-[#0066FF]/30 to-transparent" />
        <div className="absolute top-1/3 right-0 w-96 h-96 bg-[#0066FF]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 left-0 w-96 h-96 bg-[#00C896]/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* Left - Image */}
          <motion.div
            ref={ref}
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            <div className="relative rounded-3xl overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80"
                alt="About Rasta Infotech"
                className="w-full h-[400px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#060F1E] via-transparent to-transparent" />
            </div>

            {/* Floating card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4 }}
              className="absolute -bottom-6 -right-6 p-5 rounded-2xl bg-[#0A1628] border border-white/10 shadow-xl"
            >
              <p className="text-[#00C896] text-3xl font-black">8+</p>
              <p className="text-white text-sm font-medium">Years of Excellence</p>
              <p className="text-[#8892A4] text-xs mt-1">Delivering impactful IT solutions</p>
            </motion.div>

            {/* Second floating card */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.5 }}
              className="absolute -top-6 -left-6 p-5 rounded-2xl bg-[#0A1628] border border-white/10 shadow-xl"
            >
              <p className="text-[#0066FF] text-3xl font-black">200+</p>
              <p className="text-white text-sm font-medium">Enterprise Clients</p>
              <p className="text-[#8892A4] text-xs mt-1">Across India & beyond</p>
            </motion.div>
          </motion.div>

          {/* Right - Content */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#0066FF]/30 bg-[#0066FF]/10 mb-6">
              <span className="text-[#0066FF] text-sm font-semibold tracking-wide">About Us</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-6 leading-tight">
              Your Trusted Partner in
              <span className="bg-gradient-to-r from-[#0066FF] to-[#00C896] bg-clip-text text-transparent"> Digital Transformation</span>
            </h2>

            <p className="text-[#8892A4] leading-relaxed mb-4">
              Rasta Infotech is a leading digital solutions provider specializing in custom software development, enterprise technology consulting, and industry-specific digital transformation.
            </p>

            <p className="text-[#8892A4] leading-relaxed mb-8">
              Your trusted partner on the Road to Success! We provide end-to-end IT solutions, from SAP and digital marketing to AI, cybersecurity, and beyond, fueling innovation and growth for your business.
            </p>

            {/* Quick stats */}
            <div className="grid grid-cols-3 gap-4 mb-8">
              {[
                { value: '500+', label: 'Students Placed' },
                { value: '200+', label: 'Clients Served' },
                { value: '99.9%', label: 'System Uptime' },
              ].map((stat, i) => (
                <div key={i} className="text-center p-4 rounded-xl border border-white/10 bg-white/5">
                  <p className="text-xl font-black bg-gradient-to-r from-[#0066FF] to-[#00C896] bg-clip-text text-transparent">
                    {stat.value}
                  </p>
                  <p className="text-[#8892A4] text-xs mt-1">{stat.label}</p>
                </div>
              ))}
            </div>

            {/* Why choose us - brief */}
            <div className="grid grid-cols-2 gap-2 mb-8">
              {[
                'Experts in AI, Blockchain & Data Science',
                'Tailored IT solutions for your needs',
                '24/7 support with fast response',
                'Proven success across industries',
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-gradient-to-br from-[#0066FF] to-[#00C896] flex items-center justify-center shrink-0">
                    <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                  <span className="text-[#8892A4] text-sm">{item}</span>
                </div>
              ))}
            </div>

            <Link
              href="/about"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl text-base font-bold text-white bg-gradient-to-r from-[#0066FF] to-[#00C896] hover:shadow-lg hover:shadow-[#0066FF]/30 transition-all duration-300 group"
            >
              Learn More About Us
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  )
}