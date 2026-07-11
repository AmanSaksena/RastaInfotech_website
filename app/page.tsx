import Navbar from '@/components/layout/Navbar'
import Hero from '@/components/sections/Hero'
import Services from '@/components/sections/Services'
import Recruitment from '@/components/sections/Recruitment'
import AboutPreview from '@/components/sections/AboutPreview'
import Testimonials from '@/components/sections/Testimonials'
import Blog from '@/components/sections/Blog'
import Contact from '@/components/sections/Contact'
import Footer from '@/components/layout/Footer'

export default function Home() {
  return (
    <main className="bg-[#0A1628]">
      <Navbar />
      <Hero />
      <AboutPreview />
      <Services />
      <Recruitment />
      <Testimonials />
      <Blog />
      <Contact />
      <Footer />
    </main>
  )
}