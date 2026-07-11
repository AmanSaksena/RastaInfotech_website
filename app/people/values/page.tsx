import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import ValuesPage from '@/components/sections/PeopleValues'

export default function Values() {
  return (
    <main className="bg-[#0A1628]">
      <Navbar />
      <ValuesPage />
      <Footer />
    </main>
  )
}