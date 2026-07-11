import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import ServiceDetail from '@/components/sections/ServiceDetail'

export default function ServicePage({ params }: { params: { id: string } }) {
  return (
    <main className="bg-[#0A1628]">
      <Navbar />
      <ServiceDetail id={params.id} />
      <Footer />
    </main>
  )
}