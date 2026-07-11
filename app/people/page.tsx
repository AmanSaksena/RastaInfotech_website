import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Link from 'next/link'

export default function PeoplePage() {
  return (
    <main className="bg-[#0A1628]">
      <Navbar />
      <section className="relative pt-32 pb-24 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1600&q=80"
            alt="People"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0A1628]/60 to-[#0A1628]" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#0066FF]/30 bg-[#0066FF]/10 mb-6">
            <span className="text-[#0066FF] text-sm font-semibold tracking-wide">Our People</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-6">
            The{' '}
            <span className="bg-gradient-to-r from-[#0066FF] to-[#00C896] bg-clip-text text-transparent">
              People
            </span>{' '}
            Behind Rasta
          </h1>
          <p className="text-[#8892A4] text-lg max-w-2xl mx-auto mb-16">
            Meet the passionate team, discover our values, and explore opportunities to join us on our mission.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              {
                icon: '🚀',
                title: 'Join Us',
                desc: 'Explore open positions, culture, and why Rasta Infotech is a great place to grow your career.',
                href: '/people/join-us',
                color: 'from-[#0066FF] to-[#3385FF]',
              },
              {
                icon: '👥',
                title: 'View Team',
                desc: 'Meet the leaders, engineers, designers, and strategists driving Rasta Infotech forward.',
                href: '/people/team',
                color: 'from-[#7C3AED] to-[#0066FF]',
              },
              {
                icon: '💎',
                title: 'Our Values',
                desc: 'Discover the core values and principles that define our culture and guide every decision.',
                href: '/people/values',
                color: 'from-[#00C896] to-[#0066FF]',
              },
            ].map((item) => (
              <Link
                key={item.title}
                href={item.href}
                className="group p-8 rounded-3xl border border-white/10 bg-white/5 hover:border-[#0066FF]/40 hover:bg-white/10 transition-all duration-300 hover:-translate-y-2 text-center"
              >
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center text-3xl mx-auto mb-5 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  {item.icon}
                </div>
                <h2 className="text-white font-black text-2xl mb-3 group-hover:text-[#0066FF] transition-colors duration-300">
                  {item.title}
                </h2>
                <p className="text-[#8892A4] text-sm leading-relaxed mb-5">{item.desc}</p>
                <span className={`inline-flex items-center gap-2 text-sm font-semibold bg-gradient-to-r ${item.color} bg-clip-text text-transparent`}>
                  Explore
                  <svg className="w-4 h-4 text-[#0066FF]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </main>
  )
}