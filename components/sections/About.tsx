'use client'

import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import Link from 'next/link'

const timeline = [
  { year: '2016', title: 'Founded', desc: 'Rasta Infotech was established in Bangalore with a vision to deliver innovative IT solutions to businesses across India.' },
  { year: '2018', title: 'First 50 Clients', desc: 'Expanded our enterprise client base to 50+ companies across India with a focus on SAP and cloud solutions.' },
  { year: '2020', title: 'Digital Transformation', desc: 'Launched AI, Blockchain and DevOps services to lead the digital transformation wave across industries.' },
  { year: '2022', title: 'Recruitment Launch', desc: 'Introduced our Recruitment & Staffing vertical with 100% placement assurance for students and professionals.' },
  { year: '2024', title: '500+ Placements', desc: 'Crossed 500+ successful student placements across top IT companies including Infosys, TCS, Wipro and more.' },
  { year: '2025', title: 'Global Expansion', desc: 'Expanding presence beyond India with enterprise clients across the globe and new service verticals.' },
]

const industries = [
  { icon: '🏥', label: 'Health Care' },
  { icon: '🏦', label: 'Banking & Finance' },
  { icon: '🛒', label: 'Retail & E-Commerce' },
  { icon: '💻', label: 'ISVs & Software' },
  { icon: '🎓', label: 'Education & E-Learning' },
  { icon: '🚗', label: 'Automotive' },
  { icon: '✈️', label: 'Travel' },
  { icon: '💳', label: 'Fintech' },
  { icon: '🚚', label: 'Logistics & Transportation' },
  { icon: '🎬', label: 'Media & Entertainment' },
]

const pillars = [
  {
    icon: '👥',
    title: 'Professional Team',
    desc: 'Our team of experienced developers, designers, strategists and project managers bring deep industry knowledge and technical expertise to every project. We foster a culture of collaboration, continuous learning, and innovation.',
    color: 'from-[#0066FF] to-[#3385FF]',
  },
  {
    icon: '🎯',
    title: 'Target Oriented',
    desc: 'Every project we undertake is guided by clear goals, measurable KPIs and a deep understanding of your business objectives. Our target-oriented approach ensures that every feature, design element, and line of code contributes directly to your success.',
    color: 'from-[#00C896] to-[#0066FF]',
  },
  {
    icon: '✅',
    title: 'Success Guarantee',
    desc: 'Your success is our priority. Our proven methodologies, agile development practices and post-launch support ensure your project is delivered on time, within budget and beyond expectations.',
    color: 'from-[#7C3AED] to-[#0066FF]',
  },
]

const whyUs = [
  'Experts in AI, Blockchain & Data Science',
  'Tailored IT solutions for your needs',
  '24/7 support with fast response',
  'Strong focus on security & privacy',
  'Agile process with fast delivery',
  'Clear communication & support',
  'Affordable without cutting quality',
  'Proven success across industries',
]

const team = [
  {
    name: 'Director',
    role: 'Leadership',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&q=80',
    linkedin: 'https://linkedin.com/company/rastainfotech',
  },
  {
    name: 'Director Tejashwini KC',
    role: 'CSR & Women Empowerment',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80',
    linkedin: 'https://linkedin.com/company/rastainfotech',
  },
  {
    name: 'Director Reena Saxena',
    role: 'CSR & Social Impact',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&q=80',
    linkedin: 'https://linkedin.com/company/rastainfotech',
  },
]

interface CompanyLogoProps {
  company: {
    name: string
    font: string
    logo: string
  }
}

function PartnerLogo({ company }: CompanyLogoProps) {
  const [imageFailed, setImageFailed] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)

  return (
    <div className="shrink-0 flex items-center justify-center gap-3 px-8 py-5 rounded-xl border border-white/10 bg-[#0D1B2E] min-w-[200px] h-20 hover:border-white/20 hover:bg-[#112240] transition-all duration-300">
      {!imageFailed && (
        <img
          src={company.logo}
          alt={company.name}
          className="h-8 w-auto object-contain"
          onLoad={() => setImageLoaded(true)}
          onError={() => setImageFailed(true)}
          style={{ display: imageLoaded ? 'block' : 'none' }}
        />
      )}
      {(imageFailed || !imageLoaded) && (
        <span className={company.font}>{company.name}</span>
      )}
    </div>
  )
}

export default function About() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section className="relative bg-[#0A1628] overflow-hidden">

      {/* Hero Banner */}
      <div className="relative pt-32 pb-16">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1600&q=80"
            alt="About"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0A1628]/60 to-[#0A1628]" />
        </div>
        <div className="relative z-10 text-center px-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#0066FF]/30 bg-[#0066FF]/10 mb-6">
            <span className="text-[#0066FF] text-sm font-semibold tracking-wide">Who We Are</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-4">
            About{' '}
            <span className="bg-gradient-to-r from-[#0066FF] to-[#00C896] bg-clip-text text-transparent">
              Us
            </span>
          </h1>
          <p className="text-[#8892A4] text-lg max-w-2xl mx-auto">
            We are dedicated to delivering impactful solutions with clarity and purpose.
          </p>
        </div>
      </div>

      <div ref={ref} className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">

        {/* Image Grid + Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="grid grid-cols-2 gap-4"
          >
            {[
              'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400&q=80',
              'https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&q=80',
              'https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&q=80',
              'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80',
            ].map((img, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
                className={`rounded-2xl overflow-hidden ${i === 1 ? 'mt-8' : i === 3 ? '-mt-8' : ''}`}
              >
                <img src={img} alt="Team" className="w-full h-48 object-cover hover:scale-105 transition-transform duration-500" />
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <h2 className="text-3xl lg:text-4xl font-black text-white mb-4">
              We make sure your idea & creation
              <span className="bg-gradient-to-r from-[#0066FF] to-[#00C896] bg-clip-text text-transparent"> delivered properly</span>
            </h2>
            <p className="text-[#8892A4] leading-relaxed mb-4">
              Rasta Infotech is a leading digital solutions provider specializing in custom software development, enterprise technology consulting, and industry-specific digital transformation. We help businesses across sectors leverage modern technologies to achieve operational excellence and sustainable growth.
            </p>
            <p className="text-[#8892A4] leading-relaxed mb-4">
              With a strong foundation in cloud computing, AI/ML, IoT, and data analytics, we deliver scalable, secure, and future-ready platforms that solve real-world challenges. Our team of experienced engineers, designers, architects, and QA engineers take a holistic approach to application delivery.
            </p>

            <div className="border-l-4 border-[#0066FF] pl-4 mb-6">
              <p className="text-[#8892A4] text-sm italic leading-relaxed">
                &quot;Whether you are launching a startup, running a local shop, or expanding your online presence, we provide the tools and technology to help you succeed.&quot;
              </p>
              <p className="text-white text-xs font-bold mt-2">— Rasta Infotech Founder</p>
            </div>

            <h3 className="text-white font-bold text-lg mb-4">Why Choose Us?</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-6">
              {whyUs.map((item, i) => (
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
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-[#0066FF] to-[#00C896] hover:shadow-lg hover:shadow-[#0066FF]/30 transition-all duration-300"
            >
              Get In Touch
            </Link>
          </motion.div>
        </div>

        {/* 3 Pillars Banner */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="relative rounded-3xl overflow-hidden mb-20"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-[#0066FF] to-[#7C3AED]" />
          <div className="absolute inset-0 bg-[#0A1628]/75" />
          <div className="relative p-8 lg:p-12">
            <h3 className="text-2xl lg:text-3xl font-black text-white text-center mb-2">
              We help business to grow faster and bigger
            </h3>
            <p className="text-white/70 text-center mb-10 max-w-2xl mx-auto text-sm">
              Whether you are a startup or an enterprise, Rasta Infotech is your trusted partner in digital transformation.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {pillars.map((p, i) => (
                <motion.div
                  key={p.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.4 + i * 0.1 }}
                  className="text-center p-6 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/10 hover:bg-white/15 transition-all duration-300"
                >
                  <div className={`w-14 h-14 rounded-full bg-gradient-to-br ${p.color} flex items-center justify-center text-2xl mx-auto mb-4 shadow-lg`}>
                    {p.icon}
                  </div>
                  <h4 className="text-white font-black text-lg mb-2">{p.title}</h4>
                  <p className="text-white/70 text-sm leading-relaxed">{p.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-20"
        >
          <h2 className="text-3xl lg:text-4xl font-black text-white text-center mb-4">
            Our{' '}
            <span className="bg-gradient-to-r from-[#0066FF] to-[#00C896] bg-clip-text text-transparent">Journey</span>
          </h2>
          <p className="text-[#8892A4] text-center mb-12 max-w-xl mx-auto">From a small startup to a trusted digital transformation partner — here is our story.</p>

          <div className="relative">
            <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-[#0066FF] via-[#00C896] to-transparent hidden lg:block" />
            <div className="space-y-8">
              {timeline.map((item, i) => (
                <motion.div
                  key={item.year}
                  initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.5 + i * 0.1 }}
                  className={`flex items-center gap-8 ${i % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}
                >
                  <div className="flex-1">
                    <div className={`p-6 rounded-2xl border border-white/10 bg-white/5 hover:border-[#0066FF]/40 transition-all duration-300 ${i % 2 === 0 ? 'lg:text-right' : 'lg:text-left'}`}>
                      <span className="text-[#0066FF] text-sm font-bold">{item.year}</span>
                      <h4 className="text-white font-black text-xl mt-1">{item.title}</h4>
                      <p className="text-[#8892A4] text-sm mt-2 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                  <div className="hidden lg:flex w-12 h-12 rounded-full bg-gradient-to-br from-[#0066FF] to-[#00C896] items-center justify-center shrink-0 shadow-lg shadow-[#0066FF]/30 z-10">
                    <span className="text-white text-xs font-black">{item.year.slice(2)}</span>
                  </div>
                  <div className="flex-1 hidden lg:block" />
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Leadership Team */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mb-20"
        >
          <h2 className="text-3xl lg:text-4xl font-black text-white text-center mb-4">
            Our{' '}
            <span className="bg-gradient-to-r from-[#0066FF] to-[#00C896] bg-clip-text text-transparent">Leadership</span>
          </h2>
          <p className="text-[#8892A4] text-center mb-12 max-w-xl mx-auto">Meet the people driving Rasta Infotech forward.</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {team.map((member, i) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.6 + i * 0.1 }}
                className="group text-center"
              >
                <div className="relative mb-4 mx-auto w-40 h-40 rounded-2xl overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A1628]/60 to-transparent" />
                </div>
                <h4 className="text-white font-black text-lg">{member.name}</h4>
                <p className="text-[#8892A4] text-sm mb-3">{member.role}</p>
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
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Industries */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mb-16"
        >
          <h2 className="text-3xl lg:text-4xl font-black text-white text-center mb-4">
            Industries We{' '}
            <span className="bg-gradient-to-r from-[#0066FF] to-[#00C896] bg-clip-text text-transparent">Serve</span>
          </h2>
          <p className="text-[#8892A4] text-center mb-10 max-w-xl mx-auto">We deliver digital transformation across a wide range of industries.</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {industries.map((ind, i) => (
              <motion.div
                key={ind.label}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.7 + i * 0.05 }}
                className="flex flex-col items-center gap-3 p-4 rounded-2xl border border-white/10 bg-white/5 hover:border-[#0066FF]/40 hover:bg-white/10 transition-all duration-300 group cursor-default"
              >
                <span className="text-3xl group-hover:scale-110 transition-transform duration-300">{ind.icon}</span>
                <span className="text-[#8892A4] text-xs font-medium text-center group-hover:text-white transition-colors duration-300">{ind.label}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>


        {/* Certifications & Awards */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="mb-20"
        >
          <h2 className="text-3xl lg:text-4xl font-black text-white text-center mb-4">
            Certifications &{' '}
            <span className="bg-gradient-to-r from-[#0066FF] to-[#00C896] bg-clip-text text-transparent">
              Awards
            </span>
          </h2>
          <p className="text-[#8892A4] text-center mb-12 max-w-xl mx-auto">
            Recognized for excellence in technology and innovation across India.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
            {[
              { icon: '🏆', title: 'Best IT Solutions Provider', org: 'Tech Excellence Awards 2024', color: 'from-yellow-500 to-orange-500' },
              { icon: '🎖️', title: 'ISO 9001:2015 Certified', org: 'Quality Management Systems', color: 'from-[#0066FF] to-[#3385FF]' },
              { icon: '⭐', title: 'Top Employer 2024', org: 'Great Place to Work India', color: 'from-[#00C896] to-[#0066FF]' },
              { icon: '🛡️', title: 'ISO 27001 Certified', org: 'Information Security Management', color: 'from-[#7C3AED] to-[#0066FF]' },
              { icon: '🚀', title: 'Fastest Growing IT Company', org: 'Bangalore Tech Summit 2023', color: 'from-[#0066FF] to-[#00C896]' },
              { icon: '💎', title: 'AWS Partner Network', org: 'Amazon Web Services', color: 'from-orange-500 to-yellow-500' },
              { icon: '🌐', title: 'Microsoft Partner', org: 'Microsoft Solutions Provider', color: 'from-blue-500 to-[#0066FF]' },
              { icon: '🤝', title: 'Google Cloud Partner', org: 'Google Cloud Platform', color: 'from-[#00C896] to-[#7C3AED]' },
            ].map((cert, i) => (
              <motion.div
                key={cert.title}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.8 + i * 0.05 }}
                className="flex flex-col items-center gap-3 p-5 rounded-2xl border border-white/10 bg-white/5 hover:border-[#0066FF]/40 hover:bg-white/10 transition-all duration-300 group text-center"
              >
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${cert.color} flex items-center justify-center text-2xl shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  {cert.icon}
                </div>
                <div>
                  <p className="text-white font-bold text-sm leading-tight">{cert.title}</p>
                  <p className="text-[#8892A4] text-xs mt-1">{cert.org}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Recruitment Partnerships */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mb-20"
        >
          <h2 className="text-3xl lg:text-4xl font-black text-white text-center mb-4">
            Recruitment{' '}
            <span className="bg-gradient-to-r from-[#0066FF] to-[#00C896] bg-clip-text text-transparent">
              Partnerships
            </span>
          </h2>
          <p className="text-[#8892A4] text-center mb-12 max-w-xl mx-auto">
            We partner with 200+ leading enterprises to guarantee placements for our students.
          </p>

          {/* Stats Row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mb-12">
            {[
              { value: '200+', label: 'Hiring Partners', icon: '🤝' },
              { value: '500+', label: 'Students Placed', icon: '🎓' },
              { value: '100%', label: 'Placement Rate', icon: '✅' },
              { value: '6.5 LPA', label: 'Avg. Salary Package', icon: '💰' },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.9 + i * 0.1 }}
                className="text-center p-5 rounded-2xl border border-white/10 bg-white/5 hover:border-[#00C896]/40 transition-all duration-300"
              >
                <div className="text-3xl mb-2">{stat.icon}</div>
                <p className="text-2xl font-black bg-gradient-to-r from-[#0066FF] to-[#00C896] bg-clip-text text-transparent">
                  {stat.value}
                </p>
                <p className="text-[#8892A4] text-xs mt-1">{stat.label}</p>
              </motion.div>
            ))}
          </div>

          {/* Partner Companies - Scrolling Carousel */}
          <div className="relative overflow-hidden mb-10">
            {/* Fade edges */}
            <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-[#0A1628] to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-[#0A1628] to-transparent z-10 pointer-events-none" />

            <div className="flex gap-6 animate-[scroll_30s_linear_infinite]">
              {[
                { name: 'infosys', font: 'font-normal tracking-wider text-white text-xl', logo: 'https://logo.clearbit.com/infosys.com' },
                { name: 'Wipro', font: 'font-light tracking-widest text-white text-xl', logo: 'https://logo.clearbit.com/wipro.com' },
                { name: 'TCS', font: 'font-bold tracking-wide text-white text-2xl', logo: 'https://logo.clearbit.com/tcs.com' },
                { name: 'accenture', font: 'font-light tracking-tight text-white text-2xl', logo: 'https://logo.clearbit.com/accenture.com' },
                { name: 'Cognizant', font: 'font-normal tracking-wide text-white text-xl', logo: 'https://logo.clearbit.com/cognizant.com' },
                { name: 'HCL Tech', font: 'font-bold tracking-wide text-white text-xl', logo: 'https://logo.clearbit.com/hcltech.com' },
                { name: 'IBM', font: 'font-black tracking-widest text-white text-2xl', logo: 'https://logo.clearbit.com/ibm.com' },
                { name: 'Capgemini', font: 'font-light tracking-wide text-white text-xl', logo: 'https://logo.clearbit.com/capgemini.com' },
                { name: 'Wipro', font: 'font-bold tracking-wide text-white text-xl', logo: 'https://logo.clearbit.com/wipro.com' },
                { name: 'Tech Mahindra', font: 'font-bold tracking-wide text-white text-lg', logo: 'https://logo.clearbit.com/techmahindra.com' },
                { name: 'Mphasis', font: 'font-bold tracking-wide text-white text-xl', logo: 'https://logo.clearbit.com/mphasis.com' },
                { name: 'L&T Technology', font: 'font-bold tracking-wide text-white text-lg', logo: 'https://logo.clearbit.com/ltts.com' },
                ...[
                  { name: 'infosys', font: 'font-normal tracking-wider text-white text-xl', logo: 'https://logo.clearbit.com/infosys.com' },
                  { name: 'Wipro', font: 'font-light tracking-widest text-white text-xl', logo: 'https://logo.clearbit.com/wipro.com' },
                  { name: 'TCS', font: 'font-bold tracking-wide text-white text-2xl', logo: 'https://logo.clearbit.com/tcs.com' },
                  { name: 'accenture', font: 'font-light tracking-tight text-white text-2xl', logo: 'https://logo.clearbit.com/accenture.com' },
                  { name: 'Cognizant', font: 'font-normal tracking-wide text-white text-xl', logo: 'https://logo.clearbit.com/cognizant.com' },
                  { name: 'HCL Tech', font: 'font-bold tracking-wide text-white text-xl', logo: 'https://logo.clearbit.com/hcltech.com' },
                  { name: 'IBM', font: 'font-black tracking-widest text-white text-2xl', logo: 'https://logo.clearbit.com/ibm.com' },
                  { name: 'Capgemini', font: 'font-light tracking-wide text-white text-xl', logo: 'https://logo.clearbit.com/capgemini.com' },
                ]
              ].map((company, i) => (
                <PartnerLogo key={i} company={company} />
              ))}
            </div>
          </div>

          {/* Placement Assurance Badge */}
          <div className="relative p-8 rounded-3xl overflow-hidden text-center border border-[#00C896]/30">
            <div className="absolute inset-0 bg-gradient-to-r from-[#00C896]/10 to-[#0066FF]/10" />
            <div className="relative z-10">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#00C896] to-[#0066FF] flex items-center justify-center text-4xl mx-auto mb-4 shadow-lg shadow-[#00C896]/20">
                🏆
              </div>
              <h3 className="text-white font-black text-2xl mb-2">Placement Assurance Certified</h3>
              <p className="text-[#8892A4] max-w-lg mx-auto mb-6 text-sm">
                Every student who completes our program receives dedicated placement support, interview preparation, and direct referrals to our 200+ partner network — until they get placed.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="mailto:info@rastainfotech.com?subject=Placement Program Application"
                  className="inline-flex items-center justify-center gap-2 px-8 py-3 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-[#00C896] to-[#0066FF] hover:shadow-lg hover:shadow-[#00C896]/30 transition-all duration-300"
                >
                  Apply Now
                </a>
                <a
                  href="https://wa.me/919742507066?text=Hi%2C%20I%20want%20to%20know%20about%20placement%20programs"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-8 py-3 rounded-xl text-sm font-bold text-[#25D366] border border-[#25D366]/30 hover:bg-[#25D366]/10 transition-all duration-300"
                >
                  WhatsApp Us
                </a>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Still have questions */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center p-10 rounded-3xl border border-white/10 bg-white/5"
        >
          <h3 className="text-2xl font-black text-white mb-2">Still have questions?</h3>
          <p className="text-[#8892A4] text-sm mb-6">Have more questions? Contact us and we will do our best to provide the answers you need.</p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-3 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-[#0066FF] to-[#00C896] hover:shadow-lg hover:shadow-[#0066FF]/30 transition-all duration-300"
          >
            Get In Touch
          </Link>
        </motion.div>

      </div>
    </section>
  )
}