'use client'

import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import Link from 'next/link'

const blogs = [
  {
    category: 'IT Transformation',
    title: 'How AI is Revolutionizing Enterprise IT Infrastructure in 2025',
    desc: 'Discover how artificial intelligence is reshaping the way enterprises manage, monitor and optimize their IT infrastructure for maximum efficiency.',
    image: 'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=600&q=80',
    date: 'Apr 10, 2025',
    readTime: '5 min read',
    color: 'from-[#0066FF] to-[#3385FF]',
  },
  {
    category: 'Recruitment',
    title: 'Top 10 IT Skills That Guarantee Placement in 2025',
    desc: 'From cloud computing to DevOps and AI — here are the most in-demand tech skills that top companies are hiring for right now.',
    image: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=600&q=80',
    date: 'Apr 5, 2025',
    readTime: '4 min read',
    color: 'from-[#00C896] to-[#0066FF]',
  },
  {
    category: 'Automation',
    title: 'DevOps Automation: Cutting Release Cycles from Days to Hours',
    desc: 'Learn how leading enterprises are using CI/CD pipelines, infrastructure as code and automated testing to dramatically speed up software delivery.',
    image: 'https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=600&q=80',
    date: 'Mar 28, 2025',
    readTime: '6 min read',
    color: 'from-[#7C3AED] to-[#0066FF]',
  },
  {
    category: 'IT Transformation',
    title: 'Cloud Migration Strategy: A Complete Guide for Enterprises',
    desc: 'Everything you need to know about moving your infrastructure to AWS, Azure or Google Cloud — from planning to execution.',
    image: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=600&q=80',
    date: 'Mar 20, 2025',
    readTime: '7 min read',
    color: 'from-[#0066FF] to-[#00C896]',
  },
  {
    category: 'Recruitment',
    title: 'How Rasta Infotech Placed 500+ Students in Top IT Companies',
    desc: 'A behind-the-scenes look at our placement process — from skill assessment and training to mock interviews and final placement.',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&q=80',
    date: 'Mar 15, 2025',
    readTime: '5 min read',
    color: 'from-[#00C896] to-[#7C3AED]',
  },
  {
    category: 'Automation',
    title: 'SAP S/4HANA Migration: What Every CTO Needs to Know',
    desc: 'The complete roadmap for migrating to SAP S/4HANA — key considerations, common pitfalls and best practices from our expert consultants.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&q=80',
    date: 'Mar 8, 2025',
    readTime: '8 min read',
    color: 'from-[#3385FF] to-[#00C896]',
  },
]

const categories = ['All', 'IT Transformation', 'Recruitment', 'Automation']

const categoryColors: Record<string, string> = {
  'IT Transformation': 'from-[#0066FF] to-[#3385FF]',
  'Recruitment': 'from-[#00C896] to-[#0066FF]',
  'Automation': 'from-[#7C3AED] to-[#0066FF]',
}

export default function Blog() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [activeCategory, setActiveCategory] = useState('All')

  const filtered = activeCategory === 'All'
    ? blogs
    : blogs.filter((b) => b.category === activeCategory)

  return (
    <section id="blog" className="relative py-24 bg-[#060F1E] overflow-hidden">

      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-[#0066FF]/30 to-transparent" />
        <div className="absolute top-1/3 right-0 w-96 h-96 bg-[#7C3AED]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 left-0 w-96 h-96 bg-[#0066FF]/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#0066FF]/30 bg-[#0066FF]/10 mb-6">
            <span className="text-[#0066FF] text-sm font-semibold tracking-wide">Knowledge Hub</span>
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-6">
            Blog &{' '}
            <span className="bg-gradient-to-r from-[#0066FF] to-[#00C896] bg-clip-text text-transparent">
              Insights
            </span>
          </h2>
          <p className="text-[#8892A4] text-lg max-w-2xl mx-auto">
            Weekly insights on IT transformation, recruitment trends, automation and digital innovation.
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                activeCategory === cat
                  ? 'bg-gradient-to-r from-[#0066FF] to-[#00C896] text-white shadow-lg shadow-[#0066FF]/20'
                  : 'border border-white/10 text-[#8892A4] hover:text-white hover:border-white/30 bg-white/5'
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Featured Blog (first one) */}
        {activeCategory === 'All' && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mb-10"
          >
            <Link href="/blog" className="group grid grid-cols-1 lg:grid-cols-2 gap-0 rounded-3xl overflow-hidden border border-white/10 hover:border-white/20 transition-all duration-300">
              {/* Image */}
              <div className="relative h-64 lg:h-auto overflow-hidden">
                <img
                  src={blogs[0].image}
                  alt={blogs[0].title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#060F1E]/50" />
                <div className="absolute top-4 left-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold text-white bg-gradient-to-r ${categoryColors[blogs[0].category]}`}>
                    {blogs[0].category}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-8 lg:p-10 bg-white/5 flex flex-col justify-center">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-[#8892A4] text-xs">{blogs[0].date}</span>
                  <span className="w-1 h-1 rounded-full bg-[#8892A4]" />
                  <span className="text-[#8892A4] text-xs">{blogs[0].readTime}</span>
                  <span className="px-2 py-0.5 rounded text-xs font-bold text-[#00C896] bg-[#00C896]/10 border border-[#00C896]/20">
                    Featured
                  </span>
                </div>
                <h3 className="text-white text-2xl lg:text-3xl font-black mb-4 group-hover:text-[#0066FF] transition-colors duration-300">
                  {blogs[0].title}
                </h3>
                <p className="text-[#8892A4] leading-relaxed mb-6">{blogs[0].desc}</p>
                <div className="flex items-center gap-2 text-[#0066FF] font-semibold text-sm group-hover:gap-3 transition-all duration-300">
                  Read Full Article
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </div>
            </Link>
          </motion.div>
        )}

        {/* Blog Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {(activeCategory === 'All' ? filtered.slice(1) : filtered).map((blog, i) => (
            <motion.div
              key={blog.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4 + i * 0.1 }}
            >
              <Link
                href="/blog"
                className="group block rounded-2xl overflow-hidden border border-white/10 bg-white/5 hover:border-white/20 hover:-translate-y-2 transition-all duration-300"
              >
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={blog.image}
                    alt={blog.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#060F1E] via-transparent to-transparent" />
                  <div className="absolute top-3 left-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold text-white bg-gradient-to-r ${categoryColors[blog.category]}`}>
                      {blog.category}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-[#8892A4] text-xs">{blog.date}</span>
                    <span className="w-1 h-1 rounded-full bg-[#8892A4]" />
                    <span className="text-[#8892A4] text-xs">{blog.readTime}</span>
                  </div>
                  <h3 className="text-white font-bold text-lg mb-2 group-hover:text-[#0066FF] transition-colors duration-300 line-clamp-2">
                    {blog.title}
                  </h3>
                  <p className="text-[#8892A4] text-sm leading-relaxed line-clamp-2 mb-4">
                    {blog.desc}
                  </p>
                  <div className="flex items-center gap-2 text-[#0066FF] text-sm font-semibold">
                    Read More
                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* View All CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="text-center"
        >
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl text-base font-bold text-white border border-white/20 hover:border-[#0066FF] hover:bg-[#0066FF]/10 transition-all duration-300 group"
          >
            View All Articles
            <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </motion.div>

      </div>
    </section>
  )
}