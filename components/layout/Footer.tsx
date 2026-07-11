'use client'

import Link from 'next/link'

const usefulLinks = [
  { label: 'Home', href: '/' },
  { label: 'About Us', href: '/about' },
  { label: 'Services', href: '/services' },
  { label: 'Industries', href: '/industries' },
  { label: 'Recruitment', href: '#recruitment' },
  { label: 'Contact Us', href: '/contact' },
  { label: 'Blogs', href: '/blog' },
  { label: 'People', href: '/people' },
  { label: 'CSR', href: '/csr' },
  { label: 'Company Portal', href: '/client-portal/login' },
]

const services = [
  { label: 'SAP Consulting', href: '/services' },
  { label: 'Blockchain', href: '/services' },
  { label: 'Cyber Security', href: '/services' },
  { label: 'DevOps Automation', href: '/services' },
  { label: 'Cloud Services', href: '/services' },
  { label: 'AI Services', href: '/services' },
  { label: 'Digital Marketing', href: '/services' },
  { label: 'Infrastructure', href: '/services' },
]

const legalLinks = [
  { label: 'Terms & Condition', href: '/terms' },
  { label: 'Privacy Policy', href: '/privacy' },
  { label: 'Disclaimer', href: '/disclaimer' },
  { label: 'Cookies Setting', href: '/cookies' },
  { label: 'Site Map', href: '/sitemap-page' },
  { label: 'Find Us', href: 'https://maps.app.goo.gl/7fjjDhNbkkDCXDNTA' },
]

const socialLinks = [
  {
    label: 'Facebook',
    href: 'https://www.facebook.com/rastainfotech',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
      </svg>
    ),
  },
  {
    label: 'X',
    href: 'https://twitter.com/rastainfotech',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/company/rastainfotech/',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
  },
  {
    label: 'YouTube',
    href: 'https://www.youtube.com/@rastainfotech',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M22.54 6.42a2.78 2.78 0 00-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 00-1.95 1.96A29 29 0 001 12a29 29 0 00.46 5.58A2.78 2.78 0 003.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 001.95-1.95A29 29 0 0023 12a29 29 0 00-.46-5.58zM9.75 15.02V8.98L15.5 12l-5.75 3.02z" />
      </svg>
    ),
  },
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/rasta_infotech/',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" fill="none" stroke="currentColor" strokeWidth="2" />
        <circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" strokeWidth="2" />
        <circle cx="17.5" cy="6.5" r="1.5" />
      </svg>
    ),
  },
]

export default function Footer() {
  return (
    <footer className="relative bg-[#060A14] border-t border-white/10 overflow-hidden">

      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-[#0066FF]/20 to-transparent" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#0066FF]/3 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Main Footer */}
        <div className="py-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Brand Column */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-1 mb-4 group">
              <img
                src="/assets/logo3.png"
                alt="Rasta Infotech"
                style={{ height: '50px', width: 'auto' }}
                className="brightness-0 invert"
              />
              
            </Link>
            <p className="text-[#8892A4] text-sm leading-relaxed mb-6">
              Your trusted partner on the Road to Success! We provide end-to-end IT solutions, from SAP and digital marketing to AI, cybersecurity, and beyond, fueling innovation and growth for your business.
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-3 flex-wrap">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="w-9 h-9 rounded-lg border border-white/10 bg-white/5 flex items-center justify-center text-[#8892A4] hover:text-white hover:border-[#0066FF]/40 hover:bg-[#0066FF]/10 transition-all duration-300"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Useful Links */}
          <div>
            <h4 className="text-white font-bold text-base mb-5 flex items-center gap-2">
              <span className="w-4 h-0.5 bg-gradient-to-r from-[#0066FF] to-[#00C896]" />
              Useful Links
            </h4>
            <ul className="space-y-3">
              {usefulLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="flex items-center gap-2 text-[#8892A4] hover:text-white text-sm transition-colors duration-300 group"
                  >
                    <svg className="w-3 h-3 text-[#0066FF] group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-bold text-base mb-5 flex items-center gap-2">
              <span className="w-4 h-0.5 bg-gradient-to-r from-[#0066FF] to-[#00C896]" />
              Our Services
            </h4>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service.label}>
                  <Link
                    href={service.href}
                    className="flex items-center gap-2 text-[#8892A4] hover:text-white text-sm transition-colors duration-300 group"
                  >
                    <svg className="w-3 h-3 text-[#0066FF] group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                    {service.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-white font-bold text-base mb-5 flex items-center gap-2">
              <span className="w-4 h-0.5 bg-gradient-to-r from-[#0066FF] to-[#00C896]" />
              Contact Us
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <span className="text-[#0066FF] mt-0.5 shrink-0">📍</span>
                <p className="text-[#8892A4] text-sm leading-relaxed">
                  23 2nd Cross, Near Malnad, Coaching Centre, MHR Layout, Bangalore North, Karnataka, India, 560090
                </p>
              </li>
              <li>
                <a
                  href="tel:+919742507066"
                  className="flex items-center gap-3 text-[#8892A4] hover:text-white text-sm transition-colors duration-300"
                >
                  <span className="text-[#00C896] shrink-0">📞</span>
                  +91-97425-07066
                </a>
              </li>
              <li>
                <a
                  href="mailto:info@rastainfotech.com"
                  className="flex items-center gap-3 text-[#8892A4] hover:text-white text-sm transition-colors duration-300"
                >
                  <span className="text-[#0066FF] shrink-0">📧</span>
                  info@rastainfotech.com
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/919742507066"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-[#8892A4] hover:text-[#25D366] text-sm transition-colors duration-300"
                >
                  <span className="text-[#25D366] shrink-0">💬</span>
                  WhatsApp Us
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

        {/* Bottom Bar */}
        <div className="py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <p className="text-[#8892A4] text-sm text-center sm:text-left">
              Copyright 2026,{' '}
              <Link href="/" className="text-[#00C896] hover:text-white transition-colors duration-300">
                Rasta Infotech
              </Link>
              . All Rights Reserved.
            </p>
            <Link
              href="/admin/login"
              className="text-white/10 hover:text-white/40 text-xs transition-colors duration-300"
              title="Admin"
            >
              Admin
            </Link>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-4">
            {legalLinks.map((link, i) => (
              <span key={link.label} className="flex items-center gap-4">
                <a
                  href={link.href}
                  target={link.href.startsWith('http') ? '_blank' : '_self'}
                  rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="text-[#8892A4] hover:text-white text-xs transition-colors duration-300"
                >
                  {link.label}
                </a>
                {i < legalLinks.length - 1 && (
                  <span className="w-px h-3 bg-white/10" />
                )}
              </span>
            ))}
          </div>
        </div>

      </div>
    </footer>
  )
}