'use client'

import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import Link from 'next/link'

const departments = ['All', 'Leadership', 'Engineering', 'AI & Data', 'Cloud & DevOps', 'Sales & Marketing', 'Recruitment']

const team = [
  {
    name: 'Director',
    role: 'Founder & Director',
    dept: 'Leadership',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&q=80',
    linkedin: 'https://www.linkedin.com/company/rastainfotech/',
    bio: 'Visionary leader with 15+ years in enterprise IT, driving Rasta Infotech\'s mission to deliver impactful digital transformation.',
    skills: ['Strategic Leadership', 'Enterprise IT', 'Business Development'],
  },
  {
    name: 'Tejashwini KC',
    role: 'Director — CSR & Women Empowerment',
    dept: 'Leadership',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80',
    linkedin: 'https://www.linkedin.com/company/rastainfotech/',
    bio: 'Champion of women empowerment and social impact, leading CSR initiatives that create lasting community change.',
    skills: ['CSR Leadership', 'Women Empowerment', 'Community Development'],
  },
  {
    name: 'Reena Saxena',
    role: 'Director — CSR & Social Impact',
    dept: 'Leadership',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&q=80',
    linkedin: 'https://www.linkedin.com/company/rastainfotech/',
    bio: 'Passionate about creating meaningful social impact through technology and corporate responsibility programs.',
    skills: ['Social Impact', 'Corporate Responsibility', 'Stakeholder Management'],
  },
  {
    name: 'Rahul Sharma',
    role: 'Head of Engineering',
    dept: 'Engineering',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80',
    linkedin: 'https://www.linkedin.com/company/rastainfotech/',
    bio: 'Full-stack architect with deep expertise in microservices, cloud-native development, and engineering excellence.',
    skills: ['System Architecture', 'Full Stack', 'Microservices'],
  },
  {
    name: 'Priya Nair',
    role: 'Lead AI/ML Engineer',
    dept: 'AI & Data',
    image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400&q=80',
    linkedin: 'https://www.linkedin.com/company/rastainfotech/',
    bio: 'Data scientist and ML engineer building intelligent systems that solve real-world business problems.',
    skills: ['Machine Learning', 'NLP', 'Python', 'TensorFlow'],
  },
  {
    name: 'Arjun Mehta',
    role: 'Cloud & DevOps Lead',
    dept: 'Cloud & DevOps',
    image: 'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?w=400&q=80',
    linkedin: 'https://www.linkedin.com/company/rastainfotech/',
    bio: 'AWS and Azure certified architect specializing in cloud migration, Kubernetes, and CI/CD automation.',
    skills: ['AWS', 'Kubernetes', 'Terraform', 'DevOps'],
  },
  {
    name: 'Sneha Patil',
    role: 'Head of Digital Marketing',
    dept: 'Sales & Marketing',
    image: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=400&q=80',
    linkedin: 'https://www.linkedin.com/company/rastainfotech/',
    bio: 'Digital marketing strategist driving brand growth through data-driven campaigns and content excellence.',
    skills: ['SEO', 'Growth Marketing', 'Content Strategy', 'Analytics'],
  },
  {
    name: 'Karan Patel',
    role: 'Senior Placement Coordinator',
    dept: 'Recruitment',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80',
    linkedin: 'https://www.linkedin.com/company/rastainfotech/',
    bio: 'Placement specialist who has helped 500+ students land their dream IT jobs through personalized career coaching.',
    skills: ['Talent Acquisition', 'Career Coaching', 'IT Recruitment'],
  },
]

export default function TeamPage() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const [activeDept, setActiveDept] = useState('All')

  const filtered = activeDept === 'All' ? team : team.filter((m) => m.dept === activeDept)

  return (
    <section className="relative bg-[#0A1628] overflow-hidden">

      {/* Hero */}
      <div className="relative pt-32 pb-16">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1600&q=80"
            alt="Team"
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
            <span className="text-white">Our Team</span>
          </div>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#0066FF]/30 bg-[#0066FF]/10 mb-6">
            <span className="text-[#0066FF] text-sm font-semibold tracking-wide">Meet The Team</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-4">
            The People{' '}
            <span className="bg-gradient-to-r from-[#0066FF] to-[#00C896] bg-clip-text text-transparent">
              Behind the Magic
            </span>
          </h1>
          <p className="text-[#8892A4] text-lg max-w-2xl mx-auto">
            A diverse team of engineers, designers, strategists, and innovators united by a passion for technology.
          </p>
        </div>
      </div>

      <div ref={ref} className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">

        {/* Department Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {departments.map((dept) => (
            <button
              key={dept}
              onClick={() => setActiveDept(dept)}
              className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 ${
                activeDept === dept
                  ? 'bg-gradient-to-r from-[#0066FF] to-[#00C896] text-white shadow-lg'
                  : 'border border-white/10 text-[#8892A4] hover:text-white hover:border-white/30 bg-white/5'
              }`}
            >
              {dept}
            </button>
          ))}
        </motion.div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {filtered.map((member, i) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.08 }}
              className="group rounded-2xl overflow-hidden border border-white/10 bg-white/5 hover:border-[#0066FF]/30 hover:-translate-y-2 transition-all duration-300"
            >
              {/* Image */}
              <div className="relative h-56 overflow-hidden">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A1628] via-transparent to-transparent" />
              </div>

              {/* Content */}
              <div className="p-5">
                <span className="text-xs font-semibold text-[#0066FF] bg-[#0066FF]/10 px-2 py-1 rounded-full">
                  {member.dept}
                </span>
                <h3 className="text-white font-black text-lg mt-3 mb-1">{member.name}</h3>
                <p className="text-[#8892A4] text-xs mb-3">{member.role}</p>
                <p className="text-[#8892A4] text-xs leading-relaxed mb-4 line-clamp-3">{member.bio}</p>

                <div className="flex flex-wrap gap-1 mb-4">
                  {member.skills.map((skill) => (
                    <span key={skill} className="px-2 py-0.5 rounded text-xs border border-white/10 text-[#8892A4]">
                      {skill}
                    </span>
                  ))}
                </div>

                <a
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs text-[#0066FF] hover:text-white transition-colors duration-300"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" />
                    <circle cx="4" cy="4" r="2" />
                  </svg>
                  LinkedIn Profile
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Stats Row */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-6 mb-16"
        >
          {[
            { value: '50+', label: 'Team Members', icon: '👥' },
            { value: '8+', label: 'Years Experience', icon: '🏆' },
            { value: '12+', label: 'Nationalities', icon: '🌍' },
            { value: '95%', label: 'Employee Satisfaction', icon: '😊' },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.6 + i * 0.1 }}
              className="text-center p-6 rounded-2xl border border-white/10 bg-white/5"
            >
              <div className="text-3xl mb-2">{stat.icon}</div>
              <p className="text-2xl font-black bg-gradient-to-r from-[#0066FF] to-[#00C896] bg-clip-text text-transparent">
                {stat.value}
              </p>
              <p className="text-[#8892A4] text-xs mt-1">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Join CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="relative p-8 lg:p-12 rounded-3xl overflow-hidden text-center"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-[#0066FF]/10 to-[#00C896]/10" />
          <div className="absolute inset-0 border border-[#0066FF]/20 rounded-3xl" />
          <div className="relative z-10">
            <h3 className="text-2xl lg:text-3xl font-black text-white mb-3">
              Want to Join This Team?
            </h3>
            <p className="text-[#8892A4] mb-6 max-w-xl mx-auto">
              We are always looking for talented, passionate people to join our growing team.
            </p>
            <Link
              href="/people/join-us"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl text-base font-bold text-white bg-gradient-to-r from-[#0066FF] to-[#00C896] hover:shadow-lg transition-all duration-300"
            >
              View Open Positions
            </Link>
          </div>
        </motion.div>

      </div>
    </section>
  )
}