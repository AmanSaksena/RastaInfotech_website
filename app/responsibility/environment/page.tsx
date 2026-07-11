import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import EnvironmentPage from '@/components/sections/ResponsibilityEnvironment'

export default function Environment() {
  return (
    <main className="bg-[#0A1628]">
      <Navbar />
      <EnvironmentPage />
      <Footer />
    </main>
  )
}