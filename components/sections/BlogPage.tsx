'use client'

import { useRef, useState, useEffect, FormEvent } from 'react'
import Link from 'next/link'
import { motion, useInView, AnimatePresence } from 'framer-motion'

const blogs = [
  {
    id: 1,
    category: 'IT Transformation',
    title: 'How AI is Revolutionizing Enterprise IT Infrastructure in 2025',
    desc: 'Discover how artificial intelligence is reshaping the way enterprises manage, monitor and optimize their IT infrastructure for maximum efficiency and cost reduction.',
    content: 'Artificial Intelligence is no longer a futuristic concept — it is actively transforming how enterprises manage their IT infrastructure today. From predictive maintenance to intelligent resource allocation, AI is enabling organizations to operate smarter, faster, and more cost-effectively. Machine learning algorithms can now predict server failures before they happen, automatically scale cloud resources based on demand patterns, and optimize network performance in real time. Companies implementing AI-driven IT operations report 40-60% reduction in downtime and 30-50% decrease in operational costs. The integration of AIOps platforms has become critical for modern enterprises looking to stay competitive in the digital age.',
    image: 'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=800&q=80',
    date: 'Apr 10, 2025',
    readTime: '5 min read',
    author: 'Rasta Infotech Team',
    tags: ['AI', 'Enterprise IT', 'Infrastructure', 'AIOps'],
  },
  {
    id: 2,
    category: 'Recruitment',
    title: 'Top 10 IT Skills That Guarantee Placement in 2025',
    desc: 'From cloud computing to DevOps and AI — here are the most in-demand tech skills that top companies are hiring for right now.',
    content: 'The IT job market in 2025 is more competitive than ever, but also more rewarding for those with the right skills. Based on our placement data from 500+ students, we have identified the top skills that consistently lead to high-paying placements. Cloud computing (AWS, Azure, GCP) tops the list, followed by DevOps and CI/CD expertise, Python and data science skills, cybersecurity knowledge, and full-stack web development. Students who combine technical skills with soft skills like communication and problem-solving see 40% higher salary offers. Our placement programs are designed around these exact skill sets to maximize your career success.',
    image: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=800&q=80',
    date: 'Apr 5, 2025',
    readTime: '4 min read',
    author: 'Placement Team',
    tags: ['Career', 'Skills', 'Placement', 'IT Jobs'],
  },
  {
    id: 3,
    category: 'Automation',
    title: 'DevOps Automation: Cutting Release Cycles from Days to Hours',
    desc: 'Learn how leading enterprises are using CI/CD pipelines, infrastructure as code and automated testing to dramatically speed up software delivery.',
    content: 'DevOps automation has become the cornerstone of modern software delivery. Organizations that have implemented mature DevOps practices deploy code 208 times more frequently and recover from failures 2,604 times faster than low performers, according to the State of DevOps Report. The key pillars of DevOps automation include continuous integration, continuous deployment, infrastructure as code, automated testing, and monitoring. By automating repetitive tasks, teams can focus on innovation rather than maintenance. Real-world case studies show companies reducing their release cycles from 2 weeks to just 4 hours after implementing proper CI/CD pipelines with tools like Jenkins, GitHub Actions, and GitLab CI.',
    image: 'https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=800&q=80',
    date: 'Mar 28, 2025',
    readTime: '6 min read',
    author: 'DevOps Team',
    tags: ['DevOps', 'CI/CD', 'Automation', 'Software Delivery'],
  },
  {
    id: 4,
    category: 'IT Transformation',
    title: 'Cloud Migration Strategy: A Complete Guide for Enterprises',
    desc: 'Everything you need to know about moving your infrastructure to AWS, Azure or Google Cloud — from planning to execution.',
    content: 'Cloud migration is one of the most impactful decisions an enterprise can make, but it requires careful planning and execution. The first step is conducting a thorough assessment of your existing infrastructure — understanding which workloads are cloud-ready, which need modernization, and which should remain on-premise. Next comes the migration strategy selection: lift-and-shift for quick wins, re-platforming for moderate optimization, or refactoring for maximum cloud-native benefits. Organizations that follow a structured migration approach see 60% cost reduction on average, improved scalability, and enhanced disaster recovery capabilities. Our cloud migration team has successfully migrated 50+ enterprise environments across AWS, Azure, and Google Cloud.',
    image: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=800&q=80',
    date: 'Mar 20, 2025',
    readTime: '7 min read',
    author: 'Cloud Team',
    tags: ['Cloud', 'AWS', 'Azure', 'Migration'],
  },
  {
    id: 5,
    category: 'Recruitment',
    title: 'How Rasta Infotech Placed 500+ Students in Top IT Companies',
    desc: 'A behind-the-scenes look at our placement process — from skill assessment and training to mock interviews and final placement.',
    content: 'Our placement success story is built on a systematic approach that has been refined over years of experience. When a student joins our program, they undergo a comprehensive skill assessment to identify strengths and gaps. Based on this, a personalized learning path is created covering technical skills, soft skills, and interview preparation. Mock interviews with industry professionals help students gain confidence and receive real feedback. Our dedicated placement cell maintains active relationships with 200+ hiring companies and matches candidates based on skills, interests, and company culture fit. The result: 100% placement rate with an average package of 6.5 LPA. Here is how we do it step by step.',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&q=80',
    date: 'Mar 15, 2025',
    readTime: '5 min read',
    author: 'Placement Team',
    tags: ['Placement', 'Career', 'Success Story', 'Training'],
  },
  {
    id: 6,
    category: 'Automation',
    title: 'SAP S/4HANA Migration: What Every CTO Needs to Know',
    desc: 'The complete roadmap for migrating to SAP S/4HANA — key considerations, common pitfalls and best practices from our expert consultants.',
    content: 'SAP S/4HANA migration is one of the most significant IT transformations an enterprise can undertake. With SAP ECC reaching end of maintenance in 2027, the pressure to migrate is real and growing. The key considerations for a successful migration include business case development, system landscape assessment, data cleansing and migration planning, custom code remediation, and change management. Common pitfalls include underestimating data quality issues, insufficient testing time, and poor user adoption. Our SAP practice has completed 20+ S/4HANA migrations with zero business disruption by following our proven methodology that emphasizes parallel running, thorough testing, and comprehensive training.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80',
    date: 'Mar 8, 2025',
    readTime: '8 min read',
    author: 'SAP Team',
    tags: ['SAP', 'S/4HANA', 'Migration', 'Enterprise'],
  },
  {
    id: 7,
    category: 'IT Transformation',
    title: 'Cybersecurity in 2025: Emerging Threats and How to Stay Protected',
    desc: 'The cybersecurity landscape is evolving rapidly. Here are the top threats facing businesses in 2025 and practical strategies to defend against them.',
    content: 'The cybersecurity threat landscape in 2025 is more complex and dangerous than ever before. AI-powered attacks, ransomware-as-a-service, and supply chain vulnerabilities are the top concerns for CISOs globally. Organizations reported a 40% increase in successful cyberattacks in 2024, with average breach costs reaching $4.8 million. The good news is that AI is also transforming defense capabilities — predictive threat intelligence, automated incident response, and zero-trust architecture are proving highly effective. Our cybersecurity practice recommends a layered security approach combining technical controls, employee training, and incident response planning to create a resilient security posture.',
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&q=80',
    date: 'Mar 1, 2025',
    readTime: '6 min read',
    author: 'Security Team',
    tags: ['Cybersecurity', 'Threats', 'Zero Trust', 'AI Security'],
  },
  {
    id: 8,
    category: 'Recruitment',
    title: 'Fresher to ₹8 LPA: A Complete Career Roadmap for IT Graduates',
    desc: 'Step-by-step guide for fresh IT graduates to land high-paying jobs — skills, certifications, portfolio building, and interview tips.',
    content: 'Landing a high-paying IT job as a fresher is absolutely achievable with the right roadmap. Start by identifying your specialization — full-stack development, data science, cloud, DevOps, or cybersecurity. Build a strong portfolio with 3-5 real projects hosted on GitHub. Get certified in your chosen area — AWS, Azure, GCP, or relevant vendor certifications add significant credibility. Practice data structures and algorithms consistently for technical interviews. Develop your soft skills — communication, teamwork, and problem-solving are weighted equally with technical skills by top companies. Our students who follow this roadmap consistently land packages between 6-10 LPA within 3-6 months of completing our program.',
    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80',
    date: 'Feb 22, 2025',
    readTime: '7 min read',
    author: 'Career Team',
    tags: ['Career', 'Fresher', 'Salary', 'IT Jobs'],
  },
  {
    id: 9,
    category: 'Automation',
    title: 'Robotic Process Automation: Transforming Business Operations',
    desc: 'How RPA is eliminating repetitive tasks, reducing errors, and freeing up human talent for higher-value work across industries.',
    content: 'Robotic Process Automation is transforming how businesses operate by automating repetitive, rule-based tasks that previously required human intervention. From invoice processing and data entry to customer onboarding and compliance reporting, RPA bots work 24/7 without errors, at a fraction of the cost of human labor. Organizations implementing RPA report 70-90% reduction in processing time, 99.9% accuracy rates, and 200-300% ROI within the first year. The key to successful RPA implementation is proper process selection — focusing on high-volume, rule-based, stable processes — combined with strong change management to help employees embrace automation as a tool that enhances rather than replaces their work.',
    image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&q=80',
    date: 'Feb 15, 2025',
    readTime: '5 min read',
    author: 'Automation Team',
    tags: ['RPA', 'Automation', 'Business Operations', 'Efficiency'],
  },
  {
    id: 10,
    category: 'IT Transformation',
    title: 'Digital Marketing in the AI Era: Strategies That Actually Work',
    desc: 'How AI is changing digital marketing and what strategies businesses need to adopt to stay relevant and competitive in 2025.',
    content: 'Digital marketing has been fundamentally transformed by AI. Personalization at scale, predictive analytics, and automated content generation are now accessible to businesses of all sizes. AI-powered tools can analyze customer behavior, predict purchase intent, and deliver personalized experiences across channels — email, social media, search, and beyond. Companies using AI in their marketing report 40% improvement in customer acquisition costs and 60% increase in conversion rates. The key strategies for 2025 include AI-driven content personalization, conversational marketing with chatbots, predictive lead scoring, and programmatic advertising. Businesses that embrace these technologies early will have a significant competitive advantage.',
    image: 'https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?w=800&q=80',
    date: 'Feb 8, 2025',
    readTime: '6 min read',
    author: 'Digital Marketing Team',
    tags: ['Digital Marketing', 'AI', 'Strategy', 'Growth'],
  },
] as BlogEntry[]

type BlogEntry = {
  id?: number
  _id?: string
  slug?: string
  category: string
  title: string
  desc: string
  content: string
  image: string
  date: string
  readTime: string
  author: string
  tags: string[]
}

const categories = ['All', 'IT Transformation', 'Recruitment', 'Automation']

const categoryColors: Record<string, string> = {
  'IT Transformation': 'from-[#0066FF] to-[#3385FF]',
  'Recruitment': 'from-[#00C896] to-[#0066FF]',
  'Automation': 'from-[#7C3AED] to-[#0066FF]',
}

function BlogCard({ blog, index, featured = false }: {
  blog: BlogEntry
  index: number
  featured?: boolean
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })
  const [expanded, setExpanded] = useState(false)

  if (featured) {
    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="grid grid-cols-1 lg:grid-cols-2 gap-0 rounded-3xl overflow-hidden border border-white/10 hover:border-white/20 transition-all duration-300 mb-10"
      >
        <div className="relative h-64 lg:h-auto overflow-hidden">
          <img src={blog.image} alt={blog.title} className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#060F1E]/50" />
          <div className="absolute top-4 left-4 flex gap-2">
            <span className={`px-3 py-1 rounded-full text-xs font-bold text-white bg-gradient-to-r ${categoryColors[blog.category]}`}>
              {blog.category}
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-bold text-white bg-gradient-to-r from-yellow-500 to-orange-500">
              Featured
            </span>
          </div>
        </div>
        <div className="p-8 lg:p-10 bg-white/5 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="text-[#8892A4] text-xs">{blog.date}</span>
              <span className="w-1 h-1 rounded-full bg-[#8892A4]" />
              <span className="text-[#8892A4] text-xs">{blog.readTime}</span>
              <span className="w-1 h-1 rounded-full bg-[#8892A4]" />
              <span className="text-[#8892A4] text-xs">{blog.author}</span>
            </div>
            <h2 className="text-white text-2xl lg:text-3xl font-black mb-4 leading-tight">
              {blog.title}
            </h2>
            <p className="text-[#8892A4] leading-relaxed mb-4">{blog.desc}</p>

            <AnimatePresence>
              {expanded && (
                <motion.p
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="text-[#8892A4] leading-relaxed mb-4 text-sm border-t border-white/10 pt-4"
                >
                  {blog.content}
                </motion.p>
              )}
            </AnimatePresence>

            <div className="flex flex-wrap gap-2 mb-4">
              {blog.tags.map((tag) => (
                <span key={tag} className="px-2 py-1 rounded text-xs border border-white/10 text-[#8892A4]">{tag}</span>
              ))}
            </div>
          </div>

          {blog.slug ? (
            <Link
              href={`/blog/${blog.slug}`}
              className="flex items-center gap-2 text-[#0066FF] font-semibold text-sm hover:gap-3 transition-all duration-300"
            >
              Read Full Article
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          ) : (
            <button
              onClick={() => setExpanded(!expanded)}
              className="flex items-center gap-2 text-[#0066FF] font-semibold text-sm hover:gap-3 transition-all duration-300"
            >
              {expanded ? 'Show Less' : 'Read Full Article'}
              <motion.svg
                animate={{ rotate: expanded ? 90 : 0 }}
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </motion.svg>
            </button>
          )}
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="group rounded-2xl overflow-hidden border border-white/10 bg-white/5 hover:border-white/20 hover:-translate-y-2 transition-all duration-300"
    >
      <div className="relative h-48 overflow-hidden">
        <img src={blog.image} alt={blog.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#060F1E] via-transparent to-transparent" />
        <div className="absolute top-3 left-3">
          <span className={`px-3 py-1 rounded-full text-xs font-bold text-white bg-gradient-to-r ${categoryColors[blog.category]}`}>
            {blog.category}
          </span>
        </div>
      </div>

      <div className="p-5">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-[#8892A4] text-xs">{blog.date}</span>
          <span className="w-1 h-1 rounded-full bg-[#8892A4]" />
          <span className="text-[#8892A4] text-xs">{blog.readTime}</span>
        </div>
        <h3 className="text-white font-bold text-lg mb-2 group-hover:text-[#0066FF] transition-colors duration-300 line-clamp-2 leading-tight">
          {blog.title}
        </h3>
        <p className="text-[#8892A4] text-sm leading-relaxed line-clamp-2 mb-3">{blog.desc}</p>

        <AnimatePresence>
          {expanded && (
            <motion.p
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="text-[#8892A4] text-sm leading-relaxed mb-3 border-t border-white/10 pt-3"
            >
              {blog.content}
            </motion.p>
          )}
        </AnimatePresence>

        <div className="flex flex-wrap gap-1 mb-3">
          {blog.tags.slice(0, 2).map((tag) => (
            <span key={tag} className="px-2 py-0.5 rounded text-xs border border-white/10 text-[#8892A4]">{tag}</span>
          ))}
        </div>

        {blog.slug ? (
          <Link
            href={`/blog/${blog.slug}`}
            className="flex items-center gap-2 text-[#0066FF] text-sm font-semibold group-hover:gap-3 transition-all duration-300"
          >
            Read More
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        ) : (
          <button
            onClick={() => setExpanded(!expanded)}
            className="flex items-center gap-2 text-[#0066FF] text-sm font-semibold group-hover:gap-3 transition-all duration-300"
          >
            {expanded ? 'Show Less' : 'Read More'}
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>
        )}
      </div>
    </motion.div>
  )
}

export default function BlogPage() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const [activeCategory, setActiveCategory] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')
  const [subName, setSubName] = useState('')
  const [subEmail, setSubEmail] = useState('')
  const [subStatus, setSubStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [subError, setSubError] = useState('')
  const [dbBlogs, setDbBlogs] = useState<BlogEntry[]>([])

  useEffect(() => {
    fetch('/api/blog?status=published&limit=50')
      .then((r) => r.ok ? r.json() : null)
      .then((data) => {
        if (data?.posts?.length) {
          const normalized: BlogEntry[] = data.posts.map((p: {
            _id: string; slug: string; category: string; title: string;
            summary: string; content: string; image: string; publishedAt?: string;
            createdAt: string; readTime: string; author: string; tags: string[];
          }) => ({
            _id: p._id,
            slug: p.slug,
            category: p.category,
            title: p.title,
            desc: p.summary,
            content: p.content,
            image: p.image,
            date: new Date(p.publishedAt || p.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
            readTime: p.readTime,
            author: p.author,
            tags: p.tags,
          }))
          setDbBlogs(normalized)
        }
      })
      .catch(() => {})
  }, [])

  async function handleSubscribe(e: FormEvent) {
    e.preventDefault()
    setSubStatus('loading')
    setSubError('')
    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: subName, email: subEmail }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Subscription failed.')
      setSubStatus('success')
      setSubName('')
      setSubEmail('')
    } catch (err: unknown) {
      setSubError(err instanceof Error ? err.message : 'Something went wrong.')
      setSubStatus('error')
    }
  }

  const allBlogs = dbBlogs.length > 0 ? dbBlogs : blogs

  const filtered = allBlogs.filter((b) => {
    const matchCategory = activeCategory === 'All' || b.category === activeCategory
    const matchSearch = searchQuery === '' ||
      b.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()))
    return matchCategory && matchSearch
  })

  const featured = filtered[0]
  const rest = filtered.slice(1)

  return (
    <section className="relative bg-[#060F1E] overflow-hidden">

      {/* Hero */}
      <div className="relative pt-32 pb-16">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?w=1600&q=80"
            alt="Blog"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#060F1E]/60 to-[#060F1E]" />
        </div>
        <div className="relative z-10 text-center px-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#0066FF]/30 bg-[#0066FF]/10 mb-6">
            <span className="text-[#0066FF] text-sm font-semibold tracking-wide">Knowledge Hub</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-4">
            Blog &{' '}
            <span className="bg-gradient-to-r from-[#0066FF] to-[#00C896] bg-clip-text text-transparent">
              Insights
            </span>
          </h1>
          <p className="text-[#8892A4] text-lg max-w-2xl mx-auto">
            Weekly insights on IT transformation, recruitment trends, automation and digital innovation.
          </p>
        </div>
      </div>

      <div ref={ref} className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">

        {/* Search + Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="flex flex-col sm:flex-row gap-4 mb-10"
        >
          {/* Search */}
          <div className="relative flex-1">
            <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8892A4]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-[#8892A4] text-sm focus:outline-none focus:border-[#0066FF]/60 transition-all duration-300"
            />
          </div>

          {/* Category Filter */}
          <div className="flex gap-2 flex-wrap">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 ${
                  activeCategory === cat
                    ? 'bg-gradient-to-r from-[#0066FF] to-[#00C896] text-white shadow-lg'
                    : 'border border-white/10 text-[#8892A4] hover:text-white hover:border-white/30 bg-white/5'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Results count */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          className="text-[#8892A4] text-sm mb-8"
        >
          Showing <span className="text-white font-bold">{filtered.length}</span> articles
          {activeCategory !== 'All' && <span> in <span className="text-[#0066FF] font-bold">{activeCategory}</span></span>}
          {searchQuery && <span> matching <span className="text-[#0066FF] font-bold">&quot;{searchQuery}&quot;</span></span>}
        </motion.p>

        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-white font-black text-2xl mb-2">No articles found</h3>
            <p className="text-[#8892A4]">Try a different search term or category.</p>
          </div>
        ) : (
          <>
            {/* Featured */}
            {featured && <BlogCard blog={featured} index={0} featured={true} />}

            {/* Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
              {rest.map((blog, i) => (
                <BlogCard key={blog._id || blog.id} blog={blog} index={i} />
              ))}
            </div>
          </>
        )}

        {/* Suggested Articles */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h3 className="text-2xl font-black text-white mb-8">
            Suggested{' '}
            <span className="bg-gradient-to-r from-[#0066FF] to-[#00C896] bg-clip-text text-transparent">
              Articles
            </span>
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {allBlogs.slice(0, 3).map((blog, i) => (
              <motion.div
                key={blog._id || blog.id || i}
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.1 + i * 0.1 }}
                className="flex gap-4 p-4 rounded-xl border border-white/10 bg-white/5 hover:border-[#0066FF]/30 hover:bg-white/8 transition-all duration-300 group cursor-pointer"
              >
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="w-20 h-16 object-cover rounded-lg shrink-0"
                />
                <div>
                  <span className={`text-xs font-bold bg-gradient-to-r ${categoryColors[blog.category]} bg-clip-text text-transparent`}>
                    {blog.category}
                  </span>
                  <p className="text-white text-sm font-bold mt-1 line-clamp-2 group-hover:text-[#0066FF] transition-colors duration-300">
                    {blog.title}
                  </p>
                  <p className="text-[#8892A4] text-xs mt-1">{blog.readTime}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Newsletter CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="relative p-8 lg:p-12 rounded-3xl overflow-hidden text-center"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-[#0066FF]/10 to-[#00C896]/10" />
          <div className="absolute inset-0 border border-[#0066FF]/20 rounded-3xl" />
          <div className="relative z-10">
            <h3 className="text-2xl lg:text-3xl font-black text-white mb-3">
              Stay Updated with Latest Insights
            </h3>
            <p className="text-[#8892A4] mb-6 max-w-xl mx-auto">
              Get weekly articles on IT transformation, recruitment trends, and tech innovations delivered to your inbox.
            </p>

            {subStatus === 'success' ? (
              <div className="inline-flex items-center gap-2 px-8 py-4 rounded-xl text-base font-bold text-white bg-gradient-to-r from-[#0066FF] to-[#00C896]">
                ✓ You&apos;re subscribed! Welcome aboard.
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
                <input
                  type="text"
                  placeholder="Your name"
                  value={subName}
                  onChange={(e) => setSubName(e.target.value)}
                  required
                  className="flex-1 px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-[#8892A4] focus:outline-none focus:border-[#0066FF] transition-colors"
                />
                <input
                  type="email"
                  placeholder="Your email"
                  value={subEmail}
                  onChange={(e) => setSubEmail(e.target.value)}
                  required
                  className="flex-1 px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-[#8892A4] focus:outline-none focus:border-[#0066FF] transition-colors"
                />
                <button
                  type="submit"
                  disabled={subStatus === 'loading'}
                  className="px-6 py-3 rounded-xl text-base font-bold text-white bg-gradient-to-r from-[#0066FF] to-[#00C896] hover:shadow-lg hover:shadow-[#0066FF]/30 transition-all duration-300 disabled:opacity-60 whitespace-nowrap"
                >
                  {subStatus === 'loading' ? 'Subscribing…' : 'Subscribe'}
                </button>
              </form>
            )}

            {subStatus === 'error' && (
              <p className="mt-3 text-red-400 text-sm">{subError}</p>
            )}
          </div>
        </motion.div>

      </div>
    </section>
  )
}