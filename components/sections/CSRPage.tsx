'use client'

import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import Link from 'next/link'

const impactStats = [
  { value: '1000+', label: 'Lives Impacted', icon: '❤️' },
  { value: '500+', label: 'Meals Distributed', icon: '🍱' },
  { value: '300+', label: 'Clothing Donations', icon: '👗' },
  { value: '50+', label: 'Women Empowered', icon: '👩‍💼' },
  { value: '5+', label: 'NGO Partners', icon: '🤝' },
  { value: '₹25L+', label: 'CSR Investment', icon: '💰' },
]

const programs = [
  {
    id: 'food',
    icon: '🍱',
    title: 'Food Drive Initiative',
    subtitle: 'Nourishing Communities, One Meal at a Time',
    desc: 'Our monthly food drive initiative partners with local NGOs and community kitchens across Bangalore to provide nutritious, home-cooked meals to underprivileged families, homeless individuals, and street children. Every month, Rasta Infotech employees voluntarily participate in food preparation, packing, and distribution drives.',
    image: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&q=80',
    color: 'from-[#0066FF] to-[#00C896]',
    frequency: 'Every Month',
    impact: '500+ Meals Served Monthly',
    details: [
      'Monthly food distribution drives across 3+ locations in Bangalore',
      'Partnership with local NGOs including Akshara Foundation and Smile Foundation',
      'Employee volunteer program with 80%+ participation rate',
      'Nutritionally balanced meals including fresh fruits and vegetables',
      'Special drives during festivals — Diwali, Eid, and Christmas',
      'Emergency food relief during natural disasters and crises',
    ],
    gallery: [
      'https://images.unsplash.com/photo-1593113616828-6f22bca04804?w=400&q=80',
      'https://images.unsplash.com/photo-1599599810694-b5b37304c041?w=400&q=80',
      'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=400&q=80',
    ],
    quote: 'No one should go to bed hungry. Our food drives are our way of ensuring that at least some families in our community do not have to.',
    quoteAuthor: 'Director Tejashwini KC',
  },
  {
    id: 'clothing',
    icon: '👗',
    title: 'Dignity in Clothing',
    subtitle: 'Restoring Dignity Through Every Garment',
    desc: 'The Dignity in Clothing initiative is rooted in the belief that everyone deserves to live with dignity. We organize quarterly clothing donation drives where employees and the community donate quality garments, which are then sorted, cleaned, and distributed to homeless individuals, orphanages, old-age homes, and families below the poverty line.',
    image: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=800&q=80',
    color: 'from-[#7C3AED] to-[#0066FF]',
    frequency: 'Quarterly',
    impact: '300+ Families Clothed Annually',
    details: [
      'Quarterly donation drives collecting quality used and new clothing',
      'Sorting, washing, and packaging at Rasta Infotech facilities',
      'Distribution to 5+ orphanages, old-age homes, and shelters in Bangalore',
      'Special winter drives providing warm clothing and blankets',
      'School uniform collection drive for underprivileged students',
      'Community drop boxes at partner locations for year-round collections',
    ],
    gallery: [
      'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=400&q=80',
      'https://images.unsplash.com/photo-1445205170230-053b83016050?w=400&q=80',
      'https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?w=400&q=80',
    ],
    quote: 'Clothing is not just about warmth — it is about dignity and self-respect. Every donation we make restores a little of that dignity.',
    quoteAuthor: 'Director Reena Saxena',
  },
  {
    id: 'women',
    icon: '👩‍💼',
    title: 'Women Empowerment',
    subtitle: 'Building Equal Futures in Technology',
    desc: 'Led by Director Tejashwini KC, our Women Empowerment initiative is one of our most impactful CSR programs. We provide scholarships, mentorship, technical training, and guaranteed placement support specifically for women entering the IT industry. We believe that closing the gender gap in technology starts with creating pathways where none existed before.',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&q=80',
    color: 'from-[#DC2626] to-[#7C3AED]',
    frequency: 'Ongoing',
    impact: '40% Women Placement Rate',
    details: [
      'Full scholarships for women from economically weaker sections joining IT programs',
      'Dedicated women-only training batches with female mentors',
      '100% placement support for women graduates — same as our standard program',
      'Flexible batch timings accommodating working mothers and homemakers',
      'Safety-first learning environment with strong harassment-free policies',
      'Alumni network connecting placed women for continued support and mentorship',
    ],
    gallery: [
      'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80',
      'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&q=80',
      'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400&q=80',
    ],
    quote: 'Every woman who enters the tech industry because of our program represents a family transformed, a community uplifted, and a future changed.',
    quoteAuthor: 'Director Tejashwini KC',
  },
  {
    id: 'education',
    icon: '📚',
    title: 'Digital Literacy Program',
    subtitle: 'Bridging the Digital Divide',
    desc: 'Our Digital Literacy Program provides free technology education to underserved communities — school students, homemakers, senior citizens, and unemployed youth. Through weekly workshops in community centers, schools, and online platforms, we equip people with the digital skills needed to thrive in the modern economy.',
    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80',
    color: 'from-[#00C896] to-[#7C3AED]',
    frequency: 'Weekly',
    impact: '1000+ People Trained',
    details: [
      'Free weekly digital literacy workshops at community centers across Bangalore',
      'Curriculum covering internet basics, email, smartphone usage, and online safety',
      'Advanced tracks covering MS Office, Google Workspace, and basic coding',
      'Special sessions for senior citizens with patient, step-by-step guidance',
      'Online safety and cyber fraud awareness programs for all age groups',
      'Certificate of completion recognizing participants\' learning achievement',
    ],
    gallery: [
      'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&q=80',
      'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=400&q=80',
      'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=400&q=80',
    ],
    quote: 'Digital literacy is not a luxury — it is a necessity for surviving and thriving in today\'s world. We are making sure no one gets left behind.',
    quoteAuthor: 'Director Reena Saxena',
  },
  {
    id: 'environment',
    icon: '🌳',
    title: 'Green Bangalore Initiative',
    subtitle: 'Growing a Greener Future Together',
    desc: 'Our Green Bangalore Initiative combines tree plantation drives, urban gardening programs, and e-waste recycling campaigns to build a more sustainable city. In partnership with BBMP and local NGOs, we have planted 500+ trees across Bangalore and established green zones in residential areas.',
    image: 'https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=800&q=80',
    color: 'from-[#00C896] to-[#0066FF]',
    frequency: 'Bi-Annual + Ongoing',
    impact: '500+ Trees Planted',
    details: [
      'Bi-annual tree plantation drives planting 250+ trees each cycle',
      'Partnership with BBMP for urban greening in parks and roadside areas',
      'Employee-led urban gardening at Rasta Infotech office premises',
      'E-waste collection and certified recycling drives every quarter',
      'Environmental awareness sessions in schools and colleges',
      'Adoption of green zones with ongoing maintenance responsibility',
    ],
    gallery: [
      'https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=400&q=80',
      'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&q=80',
      'https://images.unsplash.com/photo-1476231682828-37e571bc172f?w=400&q=80',
    ],
    quote: 'Every tree we plant is an investment in the future we want to leave behind for the next generation.',
    quoteAuthor: 'Rasta Infotech Green Team',
  },
]

const csrLeaders = [
  {
    name: 'Director Tejashwini KC',
    role: 'CSR Lead — Women Empowerment & Community',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80',
    programs: ['Women Empowerment', 'Food Drive Initiative'],
    linkedin: 'https://www.linkedin.com/company/rastainfotech/',
    message: 'CSR is not charity — it is our responsibility as a business that has benefited from this community. We give back not because we have to, but because it is the right thing to do.',
  },
  {
    name: 'Director Reena Saxena',
    role: 'CSR Lead — Social Impact & Inclusion',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&q=80',
    programs: ['Dignity in Clothing', 'Digital Literacy Program'],
    linkedin: 'https://www.linkedin.com/company/rastainfotech/',
    message: 'True corporate success is measured not just in revenue and growth, but in the lives we touch, the communities we lift, and the change we make in the world around us.',
  },
]

const partners = [
  { name: 'Akshara Foundation', type: 'Education NGO' },
  { name: 'Smile Foundation', type: 'Child Welfare' },
  { name: 'BBMP Green Cell', type: 'Government' },
  { name: 'Goonj', type: 'Clothing & Relief' },
  { name: 'HelpAge India', type: 'Senior Citizens' },
  { name: 'CRY India', type: 'Child Rights' },
]

function ProgramCard({ program, index }: { program: typeof programs[0]; index: number }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })
  const [expanded, setExpanded] = useState(false)

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      id={program.id}
      className="rounded-3xl overflow-hidden border border-white/10 bg-white/5 hover:border-white/20 transition-all duration-300"
    >
      {/* Image Header */}
      <div className="relative h-64 overflow-hidden">
        <img
          src={program.image}
          alt={program.title}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A1628] via-[#0A1628]/50 to-transparent" />
        <div className="absolute top-4 left-4 flex gap-2">
          <span className={`px-3 py-1 rounded-full text-xs font-bold text-white bg-gradient-to-r ${program.color}`}>
            {program.icon} {program.frequency}
          </span>
        </div>
        <div className="absolute bottom-4 left-6 right-6">
          <p className={`text-xs font-bold bg-gradient-to-r ${program.color} bg-clip-text text-transparent mb-1`}>
            {program.subtitle}
          </p>
          <p className="text-white font-black text-2xl">{program.title}</p>
        </div>
      </div>

      <div className="p-6 lg:p-8">

        {/* Impact Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#00C896]/30 bg-[#00C896]/10 mb-5">
          <span className="text-[#00C896] text-xs font-bold">📊 Impact: {program.impact}</span>
        </div>

        <p className="text-[#8892A4] leading-relaxed mb-6">{program.desc}</p>

        {/* Gallery */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          {program.gallery.map((img, i) => (
            <div key={i} className="rounded-xl overflow-hidden h-24">
              <img src={img} alt="" className="w-full h-full object-cover hover:scale-110 transition-transform duration-500" />
            </div>
          ))}
        </div>

        {/* Quote */}
        <blockquote className="relative p-5 rounded-2xl bg-white/5 border border-white/10 mb-6">
          <div className={`absolute top-3 left-3 w-1 h-[calc(100%-24px)] rounded-full bg-gradient-to-b ${program.color}`} />
          <p className="text-[#8892A4] text-sm italic leading-relaxed pl-3">&quot;{program.quote}&quot;</p>
          <p className={`text-xs font-bold bg-gradient-to-r ${program.color} bg-clip-text text-transparent mt-2 pl-3`}>
            — {program.quoteAuthor}
          </p>
        </blockquote>

        {/* Expand Button */}
        <button
          onClick={() => setExpanded(!expanded)}
          className={`flex items-center gap-2 text-sm font-bold bg-gradient-to-r ${program.color} bg-clip-text text-transparent mb-4 hover:gap-3 transition-all duration-300`}
        >
          {expanded ? 'Show Less' : 'View Program Details'}
          <motion.svg
            animate={{ rotate: expanded ? 180 : 0 }}
            className="w-4 h-4 text-[#0066FF]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </motion.svg>
        </button>

        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-2"
            >
              {program.details.map((detail, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="flex items-start gap-3"
                >
                  <span className={`w-5 h-5 rounded-full bg-gradient-to-br ${program.color} flex items-center justify-center shrink-0 mt-0.5`}>
                    <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                  <p className="text-[#8892A4] text-sm leading-relaxed">{detail}</p>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Volunteer CTA — FIX 1 & 2: restored <a tags + changed broken string concat to template literals */}
        <div className="mt-6 pt-6 border-t border-white/10 flex flex-col sm:flex-row gap-3">
          <a
            href={`mailto:info@rastainfotech.com?subject=Volunteer for ${program.title}`}
            className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold text-white bg-gradient-to-r ${program.color} hover:shadow-lg transition-all duration-300`}
          >
            🙋 Volunteer
          </a>
          <a
            href={`mailto:info@rastainfotech.com?subject=Donate for ${program.title}`}
            className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold text-white border border-white/20 hover:border-white/40 hover:bg-white/5 transition-all duration-300"
          >
            💝 Donate
          </a>
        </div>
      </div>
    </motion.div>
  )
}

export default function CSRPage() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  return (
    <section className="relative bg-[#0A1628] overflow-hidden">

      {/* Hero */}
      <div className="relative pt-32 pb-16">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=1600&q=80"
            alt="CSR"
            className="w-full h-full object-cover opacity-25"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0A1628]/60 to-[#0A1628]" />
        </div>
        <div className="relative z-10 text-center px-4">
          <div className="flex items-center justify-center gap-2 text-sm mb-6">
            <Link href="/" className="text-[#8892A4] hover:text-white transition-colors">Home</Link>
            <span className="text-[#8892A4]">/</span>
            <span className="text-white">CSR</span>
          </div>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#DC2626]/30 bg-[#DC2626]/10 mb-6">
            <span className="text-[#DC2626] text-sm font-semibold tracking-wide">❤️ Corporate Social Responsibility</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-4">
            Giving Back to{' '}
            <span className="bg-gradient-to-r from-[#DC2626] to-[#7C3AED] bg-clip-text text-transparent">
              Society
            </span>
          </h1>
          <p className="text-[#8892A4] text-lg max-w-2xl mx-auto">
            At Rasta Infotech, we believe that every business has a responsibility to contribute positively to the world around it. Our CSR programs touch lives across communities in Bangalore and beyond.
          </p>
        </div>
      </div>

      <div ref={ref} className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">

        {/* Impact Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-20"
        >
          {impactStats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.1 + i * 0.08 }}
              className="text-center p-5 rounded-2xl border border-white/10 bg-white/5 hover:border-[#DC2626]/20 transition-all duration-300"
            >
              <div className="text-2xl mb-2">{stat.icon}</div>
              <p className="text-lg font-black bg-gradient-to-r from-[#DC2626] to-[#7C3AED] bg-clip-text text-transparent">
                {stat.value}
              </p>
              <p className="text-[#8892A4] text-xs mt-1">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Quick Nav — FIX 3: restored <a tag */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-wrap justify-center gap-3 mb-16"
        >
          {programs.map((p) => (
            <a
              key={p.id}
              href={`#${p.id}`}
              className="px-4 py-2 rounded-full text-xs font-semibold border border-white/10 text-[#8892A4] hover:text-white hover:border-[#DC2626]/40 hover:bg-[#DC2626]/10 transition-all duration-300"
            >
              {p.icon} {p.title}
            </a>
          ))}
        </motion.div>

        {/* Program Cards */}
        <div className="space-y-10 mb-20">
          {programs.map((program, index) => (
            <ProgramCard key={program.id} program={program} index={index} />
          ))}
        </div>

        {/* CSR Leaders */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-20"
        >
          <h2 className="text-3xl font-black text-white text-center mb-4">
            CSR{' '}
            <span className="bg-gradient-to-r from-[#DC2626] to-[#7C3AED] bg-clip-text text-transparent">
              Leadership
            </span>
          </h2>
          <p className="text-[#8892A4] text-center mb-12 max-w-xl mx-auto">
            Passionate leaders driving our commitment to social impact.
          </p>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {csrLeaders.map((leader, i) => (
              <motion.div
                key={leader.name}
                initial={{ opacity: 0, x: i === 0 ? -30 : 30 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.2 + i * 0.1 }}
                className="p-8 rounded-3xl border border-white/10 bg-white/5 hover:border-[#DC2626]/20 transition-all duration-300"
              >
                <div className="flex items-start gap-6">
                  <div className="w-24 h-24 rounded-2xl overflow-hidden shrink-0">
                    <img src={leader.image} alt={leader.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-white font-black text-xl mb-1">{leader.name}</h3>
                    <p className="text-[#DC2626] text-xs font-semibold mb-3">{leader.role}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {leader.programs.map((prog) => (
                        <span key={prog} className="px-2 py-1 rounded text-xs border border-white/10 text-[#8892A4] bg-white/5">
                          {prog}
                        </span>
                      ))}
                    </div>
                    <a
                      href={leader.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs text-[#0066FF] hover:text-white transition-colors"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" />
                        <circle cx="4" cy="4" r="2" />
                      </svg>
                      LinkedIn Profile
                    </a>
                  </div>
                </div>
                <blockquote className="mt-6 border-l-2 border-[#DC2626] pl-4">
                  <p className="text-[#8892A4] text-sm italic leading-relaxed">&quot;{leader.message}&quot;</p>
                </blockquote>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* NGO Partners */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-20"
        >
          <h2 className="text-3xl font-black text-white text-center mb-4">
            Our{' '}
            <span className="bg-gradient-to-r from-[#DC2626] to-[#7C3AED] bg-clip-text text-transparent">
              Partners
            </span>
          </h2>
          <p className="text-[#8892A4] text-center mb-12 max-w-xl mx-auto">
            Trusted NGOs and organizations we collaborate with to amplify our impact.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {partners.map((partner, i) => (
              <motion.div
                key={partner.name}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.3 + i * 0.06 }}
                className="p-5 rounded-2xl border border-white/10 bg-white/5 hover:border-[#DC2626]/30 transition-all duration-300 text-center group"
              >
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#DC2626] to-[#7C3AED] flex items-center justify-center text-xl mx-auto mb-3 group-hover:scale-110 transition-transform duration-300">
                  🤝
                </div>
                <p className="text-white font-bold text-xs">{partner.name}</p>
                <p className="text-[#8892A4] text-xs mt-1">{partner.type}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Get Involved — FIX 4, 5, 6: restored 3 missing <a tags */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="relative p-8 lg:p-12 rounded-3xl overflow-hidden mb-12"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-[#DC2626]/10 to-[#7C3AED]/10" />
          <div className="absolute inset-0 border border-[#DC2626]/20 rounded-3xl" />
          <div className="relative z-10 text-center">
            <h3 className="text-2xl lg:text-3xl font-black text-white mb-3">
              Join Our Mission to Give Back
            </h3>
            <p className="text-[#8892A4] mb-8 max-w-xl mx-auto">
              Whether you want to volunteer, donate, or partner with us on CSR initiatives — every contribution makes a difference.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="mailto:info@rastainfotech.com?subject=CSR Volunteer Registration"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-base font-bold text-white bg-gradient-to-r from-[#DC2626] to-[#7C3AED] hover:shadow-lg hover:shadow-[#DC2626]/30 transition-all duration-300"
              >
                🙋 Volunteer With Us
              </a>
              <a
                href="mailto:info@rastainfotech.com?subject=CSR Partnership Enquiry"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-base font-bold text-white border border-white/20 hover:border-white/40 hover:bg-white/5 transition-all duration-300"
              >
                🤝 Partner With Us
              </a>
              <a
                href="mailto:info@rastainfotech.com?subject=CSR Donation"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-base font-bold text-[#DC2626] border border-[#DC2626]/30 hover:bg-[#DC2626]/10 transition-all duration-300"
              >
                💝 Make a Donation
              </a>
            </div>
          </div>
        </motion.div>

        {/* Responsibility Link */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="text-center"
        >
          <p className="text-[#8892A4] text-sm mb-4">
            Learn more about our broader responsibility commitments
          </p>
          <Link
            href="/responsibility"
            className="inline-flex items-center gap-2 text-[#0066FF] font-semibold text-sm hover:text-white transition-colors duration-300"
          >
            View Our Responsibility Framework
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </motion.div>

      </div>
    </section>
  )
}