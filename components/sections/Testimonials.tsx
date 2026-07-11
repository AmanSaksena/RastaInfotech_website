'use client'

import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'

const testimonials = [
  {
    name: 'Sourabh Sharma',
    company: 'Gandiva IT Services Private Limited',
    avatar: 'SS',
    color: 'from-[#0066FF] to-[#3385FF]',
    text: 'Working with Rasta Infotech was a game-changer for our business. Their team quickly understood our requirements and delivered a high-quality solution ahead of schedule. Excellent communication and technical skills!',
    rating: 5,
  },
  {
    name: 'Aarav Mehta',
    company: 'BB Infotech Solutions Pvt Ltd',
    avatar: 'AM',
    color: 'from-[#00C896] to-[#0066FF]',
    text: 'Rasta Infotech helped us revamp our digital presence. From design to deployment, everything was handled with professionalism and attention to detail. We saw a 40% increase in user engagement within the first month.',
    rating: 5,
  },
  {
    name: 'Priya Nair',
    company: 'Artiset',
    avatar: 'PN',
    color: 'from-[#7C3AED] to-[#0066FF]',
    text: 'Their DevOps automation services streamlined our entire release cycle. What used to take days now takes just a few hours. Their team is knowledgeable, proactive, and genuinely cares about client success.',
    rating: 5,
  },
  {
    name: 'Rahul Verma',
    company: 'Wraystech Pvt Ltd',
    avatar: 'RV',
    color: 'from-[#0066FF] to-[#00C896]',
    text: 'We collaborated with Rasta Infotech on a complex web application, and they exceeded our expectations. The UI/UX was modern, responsive, and built with scalability in mind. Highly recommend them!',
    rating: 5,
  },
  {
    name: 'Anjali Desai',
    company: 'Tagskills',
    avatar: 'AD',
    color: 'from-[#00C896] to-[#7C3AED]',
    text: 'Excellent service from start to finish. The team provided timely updates, clear documentation, and thoughtful suggestions that improved our product. They\'ve become our go-to tech partner.',
    rating: 5,
  },
  {
    name: 'Karan Patel',
    company: 'Canarys Pvt Ltd',
    avatar: 'KP',
    color: 'from-[#3385FF] to-[#00C896]',
    text: 'I\'ve worked with multiple vendors in the past, but none matched the efficiency and dedication of Rasta Infotech. They deliver what they promise, and they do it with integrity.',
    rating: 5,
  },
]

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </div>
  )
}

export default function Testimonials() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [active, setActive] = useState(0)

  return (
    <section id="testimonials" className="relative py-24 bg-[#0A1628] overflow-hidden">

      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-[#0066FF]/30 to-transparent" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#0066FF]/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#0066FF]/30 bg-[#0066FF]/10 mb-6">
            <span className="text-[#0066FF] text-sm font-semibold tracking-wide">Client Success Stories</span>
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-6">
            What Our{' '}
            <span className="bg-gradient-to-r from-[#0066FF] to-[#00C896] bg-clip-text text-transparent">
              Clients Say
            </span>
          </h2>
          <p className="text-[#8892A4] text-lg max-w-2xl mx-auto">
            Real stories from real clients who trusted Rasta Infotech to transform their business.
          </p>
        </motion.div>

        {/* Featured Testimonial */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-12"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="relative p-8 lg:p-12 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-sm overflow-hidden"
            >
              {/* Big quote */}
              <div className="absolute top-6 right-8 text-[120px] leading-none text-[#0066FF]/10 font-black select-none">
                &ldquo;
              </div>

              <div className="relative z-10 max-w-3xl">
                <StarRating count={testimonials[active].rating} />
                <p className="text-white text-xl lg:text-2xl font-medium leading-relaxed mt-6 mb-8">
                  &ldquo;{testimonials[active].text}&rdquo;
                </p>
                <div className="flex items-center gap-4">
                  <div className={`w-14 h-14 rounded-full bg-gradient-to-br ${testimonials[active].color} flex items-center justify-center text-white font-black text-lg shadow-lg`}>
                    {testimonials[active].avatar}
                  </div>
                  <div>
                    <p className="text-white font-bold text-lg">{testimonials[active].name}</p>
                    <p className="text-[#8892A4] text-sm">{testimonials[active].company}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {/* Testimonial Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3 + i * 0.1 }}
              onClick={() => setActive(i)}
              className={`p-6 rounded-2xl border cursor-pointer transition-all duration-300 group ${
                active === i
                  ? 'border-[#0066FF]/60 bg-[#0066FF]/10'
                  : 'border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/8'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <StarRating count={t.rating} />
                {active === i && (
                  <span className="text-[#0066FF] text-xs font-bold">Selected</span>
                )}
              </div>
              <p className="text-[#8892A4] text-sm leading-relaxed mb-4 line-clamp-3 group-hover:text-white/70 transition-colors duration-300">
                &ldquo;{t.text}&rdquo;
              </p>
              <div className="flex items-center gap-3">
                <div className={`w-9 h-9 rounded-full bg-gradient-to-br ${t.color} flex items-center justify-center text-white text-xs font-bold shrink-0`}>
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

        {/* Trust badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="flex flex-wrap justify-center gap-6"
        >
          {[
            { icon: '⭐', label: '5.0 Average Rating' },
            { icon: '✅', label: '100% Client Satisfaction' },
            { icon: '🏆', label: 'Award Winning Service' },
            { icon: '🔒', label: 'Trusted & Verified' },
          ].map((badge, i) => (
            <div
              key={i}
              className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5"
            >
              <span>{badge.icon}</span>
              <span className="text-[#8892A4] text-sm font-medium">{badge.label}</span>
            </div>
          ))}
        </motion.div>

      </div>
    </section>
  )
}