import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Link from 'next/link'

const sitemapData = [
  {
    category: 'Main Pages',
    icon: '🏠',
    links: [
      { label: 'Home', href: '/' },
      { label: 'About Us', href: '/about' },
      { label: 'Contact Us', href: '/contact' },
      { label: 'Blog & Knowledge Hub', href: '/blog' },
    ],
  },
  {
    category: 'Services',
    icon: '⚙️',
    links: [
      { label: 'All Services', href: '/services' },
      { label: 'SAP Consulting Services', href: '/services' },
      { label: 'Application Services', href: '/services' },
      { label: 'Blockchain', href: '/services' },
      { label: 'Cyber Security', href: '/services' },
      { label: 'DevOps Automation', href: '/services' },
      { label: 'AI Services', href: '/services' },
      { label: 'Digital Marketing', href: '/services' },
      { label: 'Cloud Services', href: '/services' },
      { label: 'AWS Services', href: '/services' },
      { label: 'Azure Services', href: '/services' },
      { label: 'Infrastructure Services', href: '/services' },
      { label: 'Salesforce Consulting COE', href: '/services' },
      { label: 'Microsoft COE', href: '/services' },
      { label: 'Enterprise Automation', href: '/services' },
      { label: 'Governance Risk Compliance', href: '/services' },
    ],
  },
  {
    category: 'Industries',
    icon: '🏭',
    links: [
      { label: 'All Industries', href: '/industries' },
      { label: 'Healthcare', href: '/industries' },
      { label: 'Banking & Finance', href: '/industries' },
      { label: 'Retail & E-Commerce', href: '/industries' },
      { label: 'Education & E-Learning', href: '/industries' },
      { label: 'Automotive', href: '/industries' },
      { label: 'Travel & Transportation', href: '/industries' },
      { label: 'Fintech', href: '/industries' },
      { label: 'Logistics', href: '/industries' },
      { label: 'Manufacturing', href: '/industries' },
      { label: 'Media & Entertainment', href: '/industries' },
      { label: 'Energy & Utilities', href: '/industries' },
      { label: 'Public Sector', href: '/industries' },
    ],
  },
  {
    category: 'Recruitment',
    icon: '🎓',
    links: [
      { label: 'Recruitment & Staffing', href: '/#recruitment' },
      { label: 'Placement Programs', href: '/#recruitment' },
      { label: 'Partner With Us', href: '/contact' },
    ],
  },
  {
    category: 'People',
    icon: '👥',
    links: [
      { label: 'People', href: '/people' },
      { label: 'Join Us', href: '/people' },
      { label: 'Our Values', href: '/people' },
      { label: 'View Team', href: '/people' },
    ],
  },
  {
    category: 'Responsibility',
    icon: '🌿',
    links: [
      { label: 'Responsibility', href: '/responsibility' },
      { label: 'Sustainable Corporate Governance', href: '/responsibility' },
      { label: 'Environment & Climate', href: '/responsibility' },
      { label: 'Ethics & Compliance', href: '/responsibility' },
      { label: 'Social & People Impact', href: '/responsibility' },
    ],
  },
  {
    category: 'CSR',
    icon: '❤️',
    links: [
      { label: 'Corporate Social Responsibility', href: '/csr' },
      { label: 'Community Nourishment', href: '/csr' },
      { label: 'Dignity in Clothing', href: '/csr' },
      { label: 'Women Empowerment', href: '/csr' },
    ],
  },
  {
    category: 'Legal',
    icon: '⚖️',
    links: [
      { label: 'Terms & Conditions', href: '/terms' },
      { label: 'Privacy Policy', href: '/privacy' },
      { label: 'Disclaimer', href: '/disclaimer' },
      { label: 'Cookies Policy', href: '/cookies' },
      { label: 'Find Us on Map', href: 'https://maps.app.goo.gl/7fjjDhNbkkDCXDNTA' },
    ],
  },
]

export default function SitemapPage() {
  return (
    <main className="bg-[#0A1628]">
      <Navbar />

      {/* Hero */}
      <div className="relative pt-32 pb-12 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1600&q=80"
            alt="Sitemap"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-[#0A1628]/80" />
        </div>
        <div className="relative z-10 text-center px-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#0066FF]/30 bg-[#0066FF]/10 mb-6">
            <span className="text-[#0066FF] text-sm font-semibold tracking-wide">Site Map</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-white mb-4">
            Website{' '}
            <span className="bg-gradient-to-r from-[#0066FF] to-[#00C896] bg-clip-text text-transparent">
              Structure
            </span>
          </h1>
          <p className="text-[#8892A4] text-lg max-w-xl mx-auto">
            A complete overview of all pages and sections available on rastainfotech.com
          </p>
        </div>
      </div>

      {/* Sitemap Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {sitemapData.map((section) => (
            <div
              key={section.category}
              className="p-6 rounded-2xl border border-white/10 bg-white/5 hover:border-[#0066FF]/30 transition-all duration-300"
            >
              <div className="flex items-center gap-3 mb-5">
                <span className="text-2xl">{section.icon}</span>
                <h2 className="text-white font-black text-lg">{section.category}</h2>
              </div>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      target={link.href.startsWith('http') ? '_blank' : '_self'}
                      rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                      className="flex items-center gap-2 text-[#8892A4] hover:text-white text-sm transition-colors duration-300 group"
                    >
                      <svg className="w-3 h-3 text-[#0066FF] shrink-0 group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center p-10 rounded-3xl border border-white/10 bg-white/5">
          <h3 className="text-white font-black text-2xl mb-3">
            {"Can't find what you're looking for?"}
          </h3>
          <p className="text-[#8892A4] mb-6">Contact us and we will help you find exactly what you need.</p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl text-base font-bold text-white bg-gradient-to-r from-[#0066FF] to-[#00C896] hover:shadow-lg hover:shadow-[#0066FF]/30 transition-all duration-300"
          >
            Get In Touch
          </Link>
        </div>
      </div>

      <Footer />
    </main>
  )
}