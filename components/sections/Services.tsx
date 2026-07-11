'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import Link from 'next/link'

const services = [
  {
    id: 'sap',
    icon: '⚙️',
    title: 'SAP Consulting Services',
    desc: 'Optimize and streamline your business operations with our SAP consulting services, offering end-to-end implementation, customization, and support.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&q=80',
    color: 'from-[#0066FF] to-[#3385FF]',
    tags: ['Implementation', 'Customization', 'Support'],
  },
  {
    id: 'application',
    icon: '💻',
    title: 'Application Services',
    desc: 'Our application services cover the complete application lifecycle — from ideation and design to development, deployment, and ongoing maintenance.',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&q=80',
    color: 'from-[#7C3AED] to-[#0066FF]',
    tags: ['Mobile Apps', 'Web Apps', 'Enterprise'],
  },
  {
    id: 'blockchain',
    icon: '🔗',
    title: 'Blockchain Solutions',
    desc: 'Leverage secure, decentralized applications and smart contracts with our blockchain development services, tailored for supply chain, finance, and more.',
    image: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=600&q=80',
    color: 'from-[#7C3AED] to-[#0066FF]',
    tags: ['Smart Contracts', 'DeFi', 'Supply Chain'],
  },
  {
    id: 'cybersecurity',
    icon: '🛡️',
    title: 'Cyber Security',
    desc: 'Protect your digital assets with our advanced cybersecurity services, including threat detection, penetration testing, and risk management.',
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=600&q=80',
    color: 'from-[#DC2626] to-[#7C3AED]',
    tags: ['Threat Detection', 'Pen Testing', 'Risk Management'],
  },
  {
    id: 'devops',
    icon: '🤖',
    title: 'DevOps Automation',
    desc: 'Accelerate your software delivery pipeline with our DevOps automation, covering CI/CD, infrastructure as code, and monitoring solutions.',
    image: 'https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=600&q=80',
    color: 'from-[#0066FF] to-[#00C896]',
    tags: ['CI/CD', 'Infrastructure', 'Monitoring'],
  },
  {
    id: 'ai',
    icon: '✨',
    title: 'AI Services',
    desc: 'Unlock the power of Artificial Intelligence with tailored solutions including machine learning, NLP, computer vision, and intelligent automation.',
    image: 'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=600&q=80',
    color: 'from-[#7C3AED] to-[#00C896]',
    tags: ['Machine Learning', 'NLP', 'Computer Vision'],
  },
  {
    id: 'cloud',
    icon: '☁️',
    title: 'Cloud Services',
    desc: 'Scalable, secure, and agile cloud solutions across AWS, Azure, and GCP — from migration and cloud-native apps to hybrid infrastructure and 24/7 managed operations.',
    image: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=600&q=80',
    color: 'from-[#3385FF] to-[#00C896]',
    tags: ['Public Cloud', 'Hybrid & Multi-Cloud', 'IaC'],
  },
  {
    id: 'digital-marketing',
    icon: '📢',
    title: 'Digital Marketing',
    desc: 'Drive growth with data-driven SEO, SEM, social media marketing, content strategy, and AI-powered campaigns that deliver measurable results.',
    image: 'https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?w=600&q=80',
    color: 'from-[#0066FF] to-[#00C896]',
    tags: ['SEO', 'SEM', 'Social Media'],
  },
  {
    id: 'enterprise-automation',
    icon: '🔄',
    title: 'Enterprise Automation',
    desc: 'Eliminate manual processes and reduce errors with RPA, BPA, and intelligent automation solutions tailored to your enterprise workflows.',
    image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=600&q=80',
    color: 'from-[#00C896] to-[#0066FF]',
    tags: ['RPA', 'BPA', 'Intelligent Automation'],
  },
  {
    id: 'infrastructure',
    icon: '🏗️',
    title: 'Infrastructure Services',
    desc: 'Scale seamlessly, reduce costs, and secure your assets with modern cloud, hybrid, and on-premise infrastructure solutions.',
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&q=80',
    color: 'from-[#0066FF] to-[#3385FF]',
    tags: ['Cloud Infrastructure', 'Hybrid', 'Network Security'],
  },
  {
    id: 'salesforce',
    icon: '☁️',
    title: 'Salesforce Consulting COE',
    desc: 'Maximize your Salesforce investment with expert implementation, customization, and managed services across Sales Cloud, Service Cloud, and more.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&q=80',
    color: 'from-[#00A1E0] to-[#0066FF]',
    tags: ['Sales Cloud', 'Service Cloud', 'Apex'],
  },
  {
    id: 'recruitment',
    icon: '🎓',
    title: 'Recruitment & Staffing',
    desc: 'We connect top talent with leading enterprises through AI-powered matching, workforce solutions, and end-to-end talent acquisition for digital transformation teams.',
    image: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=600&q=80',
    color: 'from-[#00C896] to-[#0066FF]',
    tags: ['Talent Acquisition', 'AI Matching', 'Workforce Solutions'],
    isNew: true,
  },
]

function ServiceCard({ service, index }: { service: typeof services[0]; index: number }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1, ease: 'easeOut' }}
      className="group relative rounded-2xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-sm hover:border-white/20 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-[#0066FF]/10"
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={service.image}
          alt={service.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A1628] via-[#0A1628]/60 to-transparent" />

        {/* Icon */}
        <div className={`absolute top-4 left-4 w-12 h-12 rounded-xl bg-gradient-to-br ${service.color} flex items-center justify-center text-2xl shadow-lg`}>
          {service.icon}
        </div>

        {/* New Badge */}
        {'isNew' in service && service.isNew && (
          <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-[#00C896] text-white text-xs font-bold tracking-wide">
            NEW ✨
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-white text-xl font-bold mb-3 group-hover:text-[#0066FF] transition-colors duration-300">
          {service.title}
        </h3>
        <p className="text-[#8892A4] text-sm leading-relaxed mb-4">
          {service.desc}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-5">
          {service.tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 rounded-full text-xs font-medium border border-white/10 text-[#8892A4] bg-white/5"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* CTA */}
        <Link
          href={'/services/' + service.id}
          className={`inline-flex items-center gap-2 text-sm font-semibold bg-gradient-to-r ${service.color} bg-clip-text text-transparent group-hover:gap-3 transition-all duration-300`}
        >
          Learn More
          <svg className="w-4 h-4 text-[#0066FF]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </Link>
      </div>

      {/* Bottom gradient line on hover */}
      <div className={`absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r ${service.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
    </motion.div>
  )
}

export default function Services() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="services" className="relative py-24 bg-[#0A1628] overflow-hidden">

      {/* Background decoration */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-[#0066FF]/30 to-transparent" />
      <div className="absolute top-40 right-0 w-96 h-96 bg-[#0066FF]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-40 left-0 w-96 h-96 bg-[#00C896]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#0066FF]/30 bg-[#0066FF]/10 mb-6">
            <span className="text-[#0066FF] text-sm font-semibold tracking-wide">What We Offer</span>
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-6">
            Our{' '}
            <span className="bg-gradient-to-r from-[#0066FF] to-[#00C896] bg-clip-text text-transparent">
              Services
            </span>
          </h2>
          <p className="text-[#8892A4] text-lg max-w-2xl mx-auto">
            Powering digital solutions of the future, today. From enterprise IT to career assurance — we do it all.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {services.map((service, index) => (
            <ServiceCard key={service.id} service={service} index={index} />
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center"
        >
          <div className="inline-flex flex-col sm:flex-row items-center gap-4 p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm">
            <div className="text-left">
              <p className="text-white font-bold text-lg">Not sure which service you need?</p>
              <p className="text-[#8892A4] text-sm">Talk to our experts and get a free consultation.</p>
            </div>
            <Link
              href="/contact"
              className="shrink-0 px-6 py-3 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-[#0066FF] to-[#00C896] hover:shadow-lg hover:shadow-[#0066FF]/30 transition-all duration-300"
            >
              Get Free Consultation
            </Link>
          </div>
        </motion.div>

      </div>
    </section>
  )
}