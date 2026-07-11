import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import GovernancePage from '@/components/sections/ResponsibilityGovernance'

export default function Governance() {
  return (
    <main className="bg-[#0A1628]">
      <Navbar />
      <GovernancePage />
      <Footer />
    </main>
  )
}