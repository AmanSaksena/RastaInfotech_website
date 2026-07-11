import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import TeamPage from '@/components/sections/PeopleTeam'

export default function Team() {
  return (
    <main className="bg-[#0A1628]">
      <Navbar />
      <TeamPage />
      <Footer />
    </main>
  )
}