import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import IndustryDetail from '@/components/sections/IndustryDetail'

export default function IndustryPage({ params }: { params: { id: string } }) {
  return (
    <main className="bg-[#0A1628]">
      <Navbar />
      <IndustryDetail id={params.id} />
      <Footer />
    </main>
  )
}