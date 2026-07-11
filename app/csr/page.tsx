import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import CSRPage from '@/components/sections/CSRPage'

export default function CSR() {
  return (
    <main className="bg-[#0A1628]">
      <Navbar />
      <CSRPage />
      <Footer />
    </main>
  )
}