'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'

const servicesDropdown = [
  { icon: '⚙️', label: 'SAP Consulting Services', desc: 'Optimize and streamline your business operations with our SAP Consulting.', href: '/services/sap' },
  { icon: '💻', label: 'Application Services', desc: 'Our application services cover the complete application lifecycle.', href: '/services/application' },
  { icon: '🔗', label: 'Blockchain', desc: 'Leverage secure and decentralized blockchain technology to transform.', href: '/services/blockchain' },
  { icon: '📚', label: 'Learning Management System', desc: 'A one-stop solution for effective learning management.', href: '/services/lms' },
  { icon: '🧠', label: 'Cognitive', desc: 'Empower your business with AI-driven cognitive services.', href: '/services/cognitive' },
  { icon: '🛡️', label: 'Cyber Security', desc: 'Safeguard your digital infrastructure with our advanced cybersecurity.', href: '/services/cybersecurity' },
  { icon: '🤖', label: 'DevOps Automation', desc: 'Enhance your software development lifecycle with DevOps automation.', href: '/services/devops' },
  { icon: '✨', label: 'AI Services', desc: 'Unlock the power of Artificial Intelligence with tailored solutions.', href: '/services/ai' },
  { icon: '📢', label: 'Digital Marketing', desc: 'Drive digital transformation with our digital strategy and product design.', href: '/services/digital-marketing' },
  { icon: '🔄', label: 'Enterprise Automation', desc: 'Eliminate manual processes and boost productivity with RPA, BPA, and intelligent automation.', href: '/services/enterprise-automation' },
  { icon: '⚖️', label: 'Governance, Risk & Compliance', desc: 'Navigate regulatory landscapes, manage risks, and uphold corporate governance standards.', href: '/services/grc' },
  { icon: '🏗️', label: 'Infrastructure Services', desc: 'Modern, scalable, and secure cloud, hybrid, and on-premise IT infrastructure for business continuity.', href: '/services/infrastructure' },
  { icon: '🪟', label: 'Microsoft COE', desc: 'Drive innovation with expert Azure, Office 365, Dynamics 365, and Power Platform services.', href: '/services/microsoft-coe' },
  { icon: '📋', label: 'Agile IT Operations', desc: 'Adaptive, scalable IT ops with CI/CD, infrastructure automation, and real-time monitoring.', href: '/services/agile-it' },
  { icon: '🔧', label: 'Product Engineering Services', desc: 'Full-lifecycle product engineering from ideation and MVP to cloud-native architecture and QA automation.', href: '/services/product-engineering' },
  { icon: '🗂️', label: 'Platforms & Protocols – XAAP', desc: 'Build interoperable, protocol-driven platforms across cloud, on-premise, and edge with XAAP.', href: '/services/xaap' },
  { icon: '☁️', label: 'Salesforce Consulting COE', desc: 'Drive connected customer experiences with tailored Salesforce consulting, implementation, and managed services.', href: '/services/salesforce' },
  { icon: '🌐', label: 'Cloud Services', desc: 'Scalable, secure cloud solutions across AWS, Azure, and GCP — public, private, hybrid, and managed.', href: '/services/cloud' },
  { icon: '🟠', label: 'AWS Cloud Services', desc: 'Scalable, secure AWS solutions — migration, cloud-native dev, DevOps, and 24/7 managed operations.', href: '/services/aws' },
  { icon: '🔵', label: 'Azure Cloud Services', desc: 'Build, scale, and transform with Azure — migration, IaaS/PaaS, DevOps, security, and hybrid cloud.', href: '/services/azure' },
  { icon: '🖥️', label: 'VMware Tanzu Services', desc: 'Modernize apps and infrastructure with Kubernetes, containerization, DevSecOps automation, and Tanzu platform services.', href: '/services/vmware' },
]

const industriesDropdown = [
  { icon: '🏥', label: 'Healthcare & Life Sciences', desc: 'Digital therapeutics, EMR/EHR, remote patient monitoring, pharma CRM, health analytics, and compliance services.', href: '/industries/healthcare' },
  { icon: '🔬', label: 'Life Sciences', desc: 'AI drug discovery, clinical trial digitization, GxP-compliant platforms, regulatory document management, and medical device software.', href: '/industries/life-sciences' },
  { icon: '🏦', label: 'Banking & Finance', desc: 'Empowering financial institutions with secure digital solutions.', href: '/industries/banking-finance' },
  { icon: '🛒', label: 'Retail & E-Commerce', desc: 'Driving retail innovation with smart commerce platforms.', href: '/industries/retail-ecommerce' },
  { icon: '🎓', label: 'Education & E-Learning', desc: 'Enabling next-gen learning with digital education platforms.', href: '/industries/education' },
  { icon: '🚗', label: 'Automotive', desc: 'Accelerating automotive innovation with connected technologies.', href: '/industries/automotive' },
  { icon: '✈️', label: 'Travel & Transportation', desc: 'AI-powered travel booking, fleet management, smart ticketing, logistics visibility, and sustainable mobility solutions.', href: '/industries/travel-transportation' },
  { icon: '💳', label: 'Fintech', desc: 'Powering financial technology with secure scalable solutions.', href: '/industries/fintech' },
  { icon: '🚚', label: 'Logistics & Supply Chain', desc: 'Fleet management, warehouse automation, TMS, last-mile delivery optimization, digital freight platforms, and blockchain-powered supply chain transparency.', href: '/industries/logistics' },
  { icon: '💻', label: 'Hi-Tech Industry', desc: 'Embedded systems, AI/ML, cloud-native engineering, IoT platforms, digital twins, and IP security for high-tech companies.', href: '/industries/hi-tech' },
  { icon: '🏭', label: 'Manufacturing', desc: 'Smart factory solutions, digital twins, AI-based quality inspection, predictive maintenance, supply chain visibility, and MES integration for Industry 4.0.', href: '/industries/manufacturing' },
  { icon: '📡', label: 'Communications', desc: '5G networks, OSS/BSS modernization, CEM, cloud migration, streaming platforms, and telecom cybersecurity for CSPs and telcos.', href: '/industries/communications' },
  { icon: '🎬', label: 'Media & Entertainment', desc: 'Transforming content delivery with digital media solutions.', href: '/industries/media-entertainment' },
  { icon: '⛽', label: 'Oil & Gas', desc: 'Predictive maintenance, digital twins, pipeline monitoring, energy trading, and environmental compliance for oil & gas.', href: '/industries/oil-gas' },
  { icon: '⚡', label: 'Energy & Utilities', desc: 'Smart grid development, renewable energy integration, EMS, customer engagement platforms, predictive maintenance, and regulatory compliance for energy and utility companies.', href: '/industries/energy-utilities' },
  { icon: '🏛️', label: 'Public Sector', desc: 'Citizen portals, smart cities, cloud modernization, digital identity, and emergency response for inclusive and secure governance.', href: '/industries/public-sector' },
  { icon: '🏨', label: 'Hospitality', desc: 'Smart hotel operations, AI concierge, mobile check-in, and revenue management for hotels and resorts.', href: '/industries/hospitality' },
]

const responsibilityDropdown = [
  { icon: '🏛️', label: 'Sustainable Corporate Governance', desc: 'Building responsible, resilient and ethical organizations.', href: '/responsibility/governance' },
  { icon: '🌿', label: 'Environment & Climate', desc: 'Committed to reducing environmental impact and carbon footprint.', href: '/responsibility/environment' },
  { icon: '⚖️', label: 'Ethics & Compliance', desc: 'Upholding the highest standards of ethical business practices.', href: '/responsibility/ethics' },
  { icon: '👥', label: 'Social & People Impact', desc: 'Creating positive impact for communities and society.', href: '/responsibility/social' },
  { icon: '🤝', label: 'CSR', desc: 'Our Corporate Social Responsibility initiatives and community programs.', href: '/csr' },
]

const companyDropdown = [
  { icon: 'ℹ️', label: 'About Us', desc: 'Learn who we are, our story, and our mission.', href: '/about' },
  { icon: '👁️', label: 'Our Team', desc: 'Meet the people driving our success forward.', href: '/people/team' },
  { icon: '💎', label: 'Our Values', desc: 'Learn about the values that define our culture.', href: '/people/values' },
  { icon: '🚀', label: 'Join Us', desc: 'Discover opportunities to grow with Rasta Infotech.', href: '/people/join-us' },
  { icon: '💼', label: 'Careers', desc: 'Browse open job vacancies at Rasta Infotech.', href: '/careers' },
  { icon: '📋', label: 'Track Application', desc: 'Check the status of your job application.', href: '/application-status' },
  { icon: '📞', label: 'Contact Us', desc: 'Get in touch with our team for inquiries.', href: '/contact' },
]

const quickLinks = [
  { icon: 'ℹ️', label: 'About Us', desc: 'Learn more about our company', href: '/about' },
  { icon: '📞', label: 'Contact', desc: 'Get in touch with us', href: '/contact' },
  { icon: '📄', label: 'Documents', desc: 'See our Documentation', href: '/documents' },
]

function MegaDropdown({ items, showQuickLinks = true }: {
  items: { icon: string; label: string; desc: string; href: string }[]
  showQuickLinks?: boolean
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      transition={{ duration: 0.2 }}
      className="absolute top-full left-0 mt-2 rounded-xl border border-white/10 bg-[#0A1628] shadow-2xl shadow-black/80 overflow-hidden"
      style={{ width: showQuickLinks ? '700px' : '500px', zIndex: 999 }}
    >
      <div className="flex">
        {/* Left - Items */}
        <div className="flex-1 p-4 max-h-[400px] overflow-y-auto bg-[#0A1628]">
          <p className="text-[#0066FF] text-xs font-bold tracking-widest uppercase mb-3 px-2">
            Our Services
          </p>
          <div className="grid grid-cols-2 gap-1">
            {items.map((item, i) => (
              <Link
                key={i}
                href={item.href}
                className="flex items-start gap-3 p-3 rounded-lg hover:bg-white/5 transition-all duration-200 group"
              >
                <span className="text-xl shrink-0 mt-0.5">{item.icon}</span>
                <div>
                  <p className="text-white text-xs font-bold uppercase tracking-wide group-hover:text-[#0066FF] transition-colors duration-200">
                    {item.label}
                  </p>
                  <p className="text-[#8892A4] text-xs mt-0.5 leading-relaxed line-clamp-2">
                    {item.desc}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Right - Quick Links */}
        {showQuickLinks && (
          <div className="w-52 border-l border-white/10 p-4 bg-[#0D1B2E]">
            <p className="text-[#0066FF] text-xs font-bold tracking-widest uppercase mb-3 px-2">
              Quick Links
            </p>
            <div className="flex flex-col gap-1">
              {quickLinks.map((link, i) => (
                <Link
                  key={i}
                  href={link.href}
                  className="flex items-start gap-3 p-3 rounded-lg hover:bg-white/5 transition-all duration-200 group"
                >
                  <span className="text-lg shrink-0">{link.icon}</span>
                  <div>
                    <p className="text-white text-xs font-bold group-hover:text-[#0066FF] transition-colors duration-200">
                      {link.label}
                    </p>
                    <p className="text-[#8892A4] text-xs mt-0.5">{link.desc}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </motion.div>
  )
}

const mobileNavLinks = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '/services' },
  { label: 'Industries', href: '/industries' },
  { label: 'Recruitment', href: '/#recruitment' },
  { label: 'Blog', href: '/blog' },
  { label: 'About Us', href: '/about' },
  { label: 'Our Team', href: '/people/team' },
  { label: 'Contact', href: '/contact' },
  { label: 'Responsibility', href: '/responsibility' },
  { label: 'CSR', href: '/csr' },
  { label: 'Careers', href: '/careers' },
  { label: 'Track Application', href: '/application-status' },
  { label: 'Company Portal', href: '/client-portal/login' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { label: 'Home', href: '/' },
    { label: 'Services', href: '/services', dropdown: servicesDropdown, showQuickLinks: true },
    { label: 'Industries', href: '/industries', dropdown: industriesDropdown, showQuickLinks: true },
    { label: 'Recruitment', href: '/#recruitment' },
    { label: 'Blog', href: '/blog' },
    { label: 'Company', href: '/about', dropdown: companyDropdown, showQuickLinks: false },
    { label: 'Responsibility', href: '/responsibility', dropdown: responsibilityDropdown, showQuickLinks: false },
  ]

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-[#0A1628]/90 backdrop-blur-xl shadow-[0_4px_30px_rgba(0,102,255,0.15)] border-b border-white/10'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20 lg:h-24">

            {/* Logo */}
            <Link href="/" className="flex items-center gap-1 group shrink-0">
              <img
                src="/assets/logo3.png"
                alt="Rasta Infotech Icon"
                style={{ height: '50px', width: 'auto' }}
                className="object-contain brightness-0 invert group-hover:opacity-80 transition-opacity duration-300"
              />
              
            </Link>

            {/* Desktop Links */}
            <div className="hidden xl:flex items-center gap-5">
              {navItems.map((link) => (
                <div
                  key={link.label}
                  className="relative"
                  onMouseEnter={() => link.dropdown && setActiveDropdown(link.label)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <Link
                    href={link.href}
                    className="relative text-[#8892A4] hover:text-white text-sm font-medium transition-colors duration-300 group flex items-center gap-1 whitespace-nowrap"
                  >
                    {link.label}
                    {link.dropdown && (
                      <svg
                        className="w-3 h-3 transition-transform duration-200"
                        style={{ transform: activeDropdown === link.label ? 'rotate(180deg)' : 'rotate(0deg)' }}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    )}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-[#0066FF] to-[#00C896] group-hover:w-full transition-all duration-300 rounded-full" />
                  </Link>

                  <AnimatePresence>
                    {link.dropdown && activeDropdown === link.label && (
                      <MegaDropdown
                        items={link.dropdown}
                        showQuickLinks={link.showQuickLinks}
                      />
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>

            {/* Desktop CTA */}
            <div className="hidden xl:flex items-center gap-3 shrink-0">
              <Link
                href="/client-portal/login"
                className="px-4 py-2 rounded-lg text-xs font-semibold text-[#8892A4] hover:text-white border border-white/20 hover:border-white/40 transition-all duration-300"
              >
                Company Portal
              </Link>
              <Link
                href="/#contact"
                className="relative px-4 py-2 rounded-lg text-xs font-semibold text-white overflow-hidden group"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-[#0066FF] to-[#00C896]" />
                <span className="relative">Join Program</span>
              </Link>
            </div>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="xl:hidden flex flex-col gap-1.5 p-2"
              aria-label="Toggle menu"
            >
              <motion.span
                animate={menuOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
                className="block w-6 h-0.5 bg-white origin-center transition-all duration-300"
              />
              <motion.span
                animate={menuOpen ? { opacity: 0, x: -10 } : { opacity: 1, x: 0 }}
                className="block w-6 h-0.5 bg-white transition-all duration-300"
              />
              <motion.span
                animate={menuOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
                className="block w-6 h-0.5 bg-white origin-center transition-all duration-300"
              />
            </button>

          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed top-20 left-0 right-0 z-40 bg-[#0A1628]/95 backdrop-blur-xl border-b border-white/10 xl:hidden max-h-[80vh] overflow-y-auto"
          >
            <div className="max-w-7xl mx-auto px-4 py-6 flex flex-col gap-1">
              {mobileNavLinks.map((link, i) => (
                <motion.div
                  key={link.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="block text-[#8892A4] hover:text-white text-base font-medium py-3 border-b border-white/5 transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="pt-4 flex flex-col gap-3"
              >
                <Link
                  href="/contact"
                  onClick={() => setMenuOpen(false)}
                  className="block w-full text-center px-5 py-3 rounded-lg text-sm font-semibold text-white border border-white/20 hover:border-white/40 transition-colors duration-300"
                >
                  Get a Demo
                </Link>
                <Link
                  href="/#contact"
                  onClick={() => setMenuOpen(false)}
                  className="block w-full text-center px-5 py-3 rounded-lg text-sm font-semibold text-white bg-gradient-to-r from-[#0066FF] to-[#00C896]"
                >
                  Join Program
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}