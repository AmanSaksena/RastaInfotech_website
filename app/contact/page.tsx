import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import ContactPage from '@/components/sections/ContactFull'

export default function Contact() {
  return (
    <main className="bg-[#0A1628]">
      <Navbar />
      <ContactPage />
      <Footer />
    </main>
  )
}