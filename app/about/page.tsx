import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import About from '@/components/sections/About'

export default function AboutPage() {
  return (
    <main className="bg-[#0A1628]">
      <Navbar />
      <About />
      <Footer />
    </main>
  )
}