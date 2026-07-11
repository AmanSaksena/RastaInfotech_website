'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Link from 'next/link'

const impactAreas = [
  {
    icon: '🎓',
    title: 'Career Development & Placement',
    desc: 'Our flagship social impact initiative — 100% placement assurance programs that launch careers for hundreds of IT graduates every year, breaking economic barriers to quality tech employment.',
    color: 'from-[#0066FF] to-[#3385FF]',
    image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=600&q=80',
    stats: [
      { value: '500+', label: 'Students Placed' },
      { value: '6.5 LPA', label: 'Avg. Package' },
      { value: '200+', label: 'Hiring Partners' },
    ],
  },
  {
    icon: '👩‍💼',
    title: 'Women in Technology',
    desc: 'Led by Director Tejashwini KC, our Women in Technology initiative provides scholarships, mentorship, and placement support specifically for women entering the IT industry.',
    color: 'from-[#DC2626] to-[#7C3AED]',
    image: 'https://images.unsplash.com/photo-1573164713988-8665fc963095?w=600&q=80',
    stats: [
      { value: '40%', label: 'Women Placed' },
      { value: '50+', label: 'Scholarships' },
      { value: '10+', label: 'Mentors' },
    ],
  },
  {
    icon: '🌍',
    title: 'Community Empowerment',
    desc: 'Technology literacy programs for underprivileged communities, digital skills training in rural areas, and partnerships with NGOs to bridge the digital divide.',
    color: 'from-[#00C896] to-[#0066FF]',
    image: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=600&q=80',
    stats: [
      { value: '1000+', label: 'People Trained' },
      { value: '5+', label: 'NGO Partners' },
      { value: '3', label: 'Districts Reached' },
    ],
  },
  {
    icon: '🏥',
    title: 'Employee Wellbeing',
    desc: 'Comprehensive employee wellbeing programs including mental health support, health insurance, flexible working, career development budgets, and a vibrant, inclusive workplace culture.',
    color: 'from-[#7C3AED] to-[#00C896]',
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&q=80',
    stats: [
      { value: '95%', label: 'Satisfaction' },
      { value: '100%', label: 'Health Covered' },
      { value: '₹50K', label: 'Learning Budget' },
    ],
  },
]

const csrPrograms = [
  {
    icon: '🍱',
    title: 'Food Drive Initiative',
    desc: 'Monthly food distribution drives partnering with local NGOs to provide nutritious meals to underprivileged families and children in Bangalore.',
    frequency: 'Monthly',
    color: 'from-[#0066FF] to-[#00C896]',
  },
  {
    icon: '👗',
    title: 'Dignity in Clothing',
    desc: 'Clothing donation drives collecting and distributing quality garments to homeless individuals and families during winter months.',
    frequency: 'Quarterly',
    color: 'from-[#7C3AED] to-[#0066FF]',
  },
  {
    icon: '💻',
    title: 'Digital Literacy Program',
    desc: 'Free digital skills workshops for school students, homemakers, and senior citizens in underserved areas of Bangalore.',
    frequency: 'Weekly',
    color: 'from-[#00C896] to-[#7C3AED]',
  },
  {
    icon: '🌳',
    title: 'Green Bangalore Initiative',
    desc: 'Tree plantation and urban gardening programs in partnership with BBMP and local resident welfare associations.',
    frequency: 'Bi-Annual',
    color: 'from-[#0066FF] to-[#3385FF]',
  },
  {
    icon: '📚',
    title: 'Scholarship Program',
    desc: 'Merit-cum-need scholarships for deserving students from economically weaker sections pursuing IT and technology courses.',
    frequency: 'Annual',
    color: 'from-[#DC2626] to-[#7C3AED]',
  },
  {
    icon: '🏃',
    title: 'Health Awareness Camps',
    desc: 'Free health check-up camps and wellness awareness programs for local communities in partnership with healthcare providers.',
    frequency: 'Quarterly',
    color: 'from-[#00C896] to-[#0066FF]',
  },
]

const metrics = [
  { value: '1000+', label: 'Lives Impacted', icon: '❤️' },
  { value: '500+', label: 'Careers Launched', icon: '🚀' },
  { value: '₹25L+', label: 'CSR Investment', icon: '💰' },
  { value: '5+', label: 'NGO Partners', icon: '🤝' },
]

const leaders = [
  {
    name: 'Director Tejashwini KC',
    role: 'CSR Lead — Women Empowerment',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&q=80',
    quote: 'Every woman who enters the tech industry because of our programs represents a family transformed and a community uplifted.',
  },
  {
    name: 'Director Reena Saxena',
    role: 'CSR Lead — Social Impact',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=300&q=80',
    quote: 'Our responsibility does not end at the office door. True success means lifting up the communities around us.',
  },
]

const galleryImages = [
  { src: 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=800&q=80', alt: 'Community volunteering', span: 'sm:col-span-2' },
  { src: 'https://images.unsplash.com/photo-1593113616828-6f22bca04804?w=600&q=80', alt: 'Food drive volunteers' },
  { src: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=600&q=80', alt: 'Education and learning' },
  { src: 'https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?w=600&q=80', alt: 'Charity and giving back' },
]

const relatedPages = [
  { href: '/responsibility/governance', icon: '🏛️', label: 'Corporate Governance' },
  { href: '/responsibility/environment', icon: '🌿', label: 'Environment & Climate' },
  { href: '/responsibility/ethics', icon: '⚖️', label: 'Ethics & Compliance' },
]

export default function SocialPage() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  return (
    <section className="relative bg-[#0A1628] overflow-hidden">

      {/* Hero */}
      <div className="relative pt-32 pb-16">
        <div className="absolute inset-0 z-0">
          {/* Reduced opacity from 20 → 10 */}
          <img
            src="https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=1600&q=80"
            alt="Social Impact"
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
            <span className="text-white">Social & People Impact</span>
          </div>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#DC2626]/30 bg-[#DC2626]/10 mb-6">
            <span className="text-2xl">👥</span>
            <span className="text-[#DC2626] text-sm font-semibold">Social & People Impact</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-4 max-w-3xl">
            Social &{' '}
            <span className="bg-gradient-to-r from-[#DC2626] to-[#7C3AED] bg-clip-text text-transparent">
              People Impact
            </span>
          </h1>
          <p className="text-[#8892A4] text-lg max-w-2xl leading-relaxed">
            Our most important responsibility is to the people around us — our employees, the communities we serve, and the society we are part of. We invest deeply in human potential and social upliftment.
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
              <p className="text-xl font-black bg-gradient-to-r from-[#DC2626] to-[#7C3AED] bg-clip-text text-transparent">{m.value}</p>
              <p className="text-[#8892A4] text-xs mt-1">{m.label}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Impact Areas — with per-card images */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-20"
        >
          <h2 className="text-3xl font-black text-white text-center mb-4">
            Impact{' '}
            <span className="bg-gradient-to-r from-[#DC2626] to-[#7C3AED] bg-clip-text text-transparent">Areas</span>
          </h2>
          <p className="text-[#8892A4] text-center mb-12 max-w-xl mx-auto">Where we focus our social investment for maximum impact.</p>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {impactAreas.map((area, i) => (
              <motion.div
                key={area.title}
                initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.3 + i * 0.1 }}
                className="rounded-2xl border border-white/10 bg-white/5 hover:border-[#DC2626]/20 transition-all duration-300 group overflow-hidden"
              >
                {/* Card image strip */}
                <div className="relative h-40 overflow-hidden">
                  <img
                    src={area.image}
                    alt={area.title}
                    className="w-full h-full object-cover opacity-50 group-hover:opacity-65 group-hover:scale-105 transition-all duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#0A1628]" />
                  <div className={`absolute bottom-4 left-4 w-12 h-12 rounded-xl bg-gradient-to-br ${area.color} flex items-center justify-center text-2xl shadow-lg`}>
                    {area.icon}
                  </div>
                </div>
                {/* Card content */}
                <div className="p-6">
                  <h3 className="text-white font-black text-xl mb-3">{area.title}</h3>
                  <p className="text-[#8892A4] text-sm leading-relaxed mb-5">{area.desc}</p>
                  <div className="grid grid-cols-3 gap-3">
                    {area.stats.map((stat) => (
                      <div key={stat.label} className="text-center p-3 rounded-xl bg-white/5 border border-white/10">
                        <p className={`text-sm font-black bg-gradient-to-r ${area.color} bg-clip-text text-transparent`}>{stat.value}</p>
                        <p className="text-[#8892A4] text-xs mt-0.5 leading-tight">{stat.label}</p>
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

        {/* CSR Programs */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-20"
        >
          <h2 className="text-3xl font-black text-white text-center mb-4">
            CSR{' '}
            <span className="bg-gradient-to-r from-[#DC2626] to-[#7C3AED] bg-clip-text text-transparent">Programs</span>
          </h2>
          <p className="text-[#8892A4] text-center mb-12 max-w-xl mx-auto">Active programs making a difference in our communities.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {csrPrograms.map((program, i) => (
              <motion.div
                key={program.title}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.5 + i * 0.08 }}
                className="p-6 rounded-2xl border border-white/10 bg-white/5 hover:border-[#DC2626]/20 transition-all duration-300 group"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-2xl group-hover:scale-110 transition-transform duration-300">{program.icon}</span>
                  <span className="px-2 py-1 rounded-full text-xs font-bold text-[#0066FF] bg-[#0066FF]/10 border border-[#0066FF]/20">
                    {program.frequency}
                  </span>
                </div>
                <h3 className="text-white font-bold text-base mb-2">{program.title}</h3>
                <p className="text-[#8892A4] text-sm leading-relaxed">{program.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CSR Leaders */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mb-20"
        >
          <h2 className="text-3xl font-black text-white text-center mb-4">
            CSR{' '}
            <span className="bg-gradient-to-r from-[#DC2626] to-[#7C3AED] bg-clip-text text-transparent">Leadership</span>
          </h2>
          <p className="text-[#8892A4] text-center mb-12 max-w-xl mx-auto">The people driving our social impact initiatives.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-3xl mx-auto">
            {leaders.map((leader, i) => (
              <motion.div
                key={leader.name}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.7 + i * 0.1 }}
                className="p-6 rounded-2xl border border-white/10 bg-white/5 text-center"
              >
                <div className="w-24 h-24 rounded-2xl overflow-hidden mx-auto mb-4">
                  <img src={leader.image} alt={leader.name} className="w-full h-full object-cover" />
                </div>
                <h3 className="text-white font-black text-lg mb-1">{leader.name}</h3>
                <p className="text-[#0066FF] text-xs mb-4">{leader.role}</p>
                <blockquote className="text-[#8892A4] text-sm italic leading-relaxed border-l-2 border-[#DC2626] pl-3 text-left">
                  &quot;{leader.quote}&quot;
                </blockquote>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Get Involved CTA — with background image */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="relative p-8 lg:p-12 rounded-3xl overflow-hidden text-center mb-16"
        >
          <img
            src="https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=1200&q=80"
            alt="Community partnership"
            className="absolute inset-0 w-full h-full object-cover opacity-10"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#DC2626]/15 to-[#7C3AED]/15" />
          <div className="absolute inset-0 border border-[#DC2626]/20 rounded-3xl" />
          <div className="relative z-10">
            <h3 className="text-2xl lg:text-3xl font-black text-white mb-3">
              Partner With Us for Social Good
            </h3>
            <p className="text-[#8892A4] mb-6 max-w-xl mx-auto">
              Are you an NGO, institution, or company looking to collaborate on social impact initiatives? We would love to hear from you.
            </p>
            <a
              href="mailto:info@rastainfotech.com?subject=CSR Partnership Enquiry"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl text-base font-bold text-white bg-gradient-to-r from-[#DC2626] to-[#7C3AED] hover:shadow-lg transition-all duration-300"
            >
              Contact for CSR Partnership
            </a>
          </div>
        </motion.div>

        {/* Related Pages */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.9 }}
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