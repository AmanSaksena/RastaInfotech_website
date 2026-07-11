import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import BlogPage from '@/components/sections/BlogPage'

export default function Blog() {
  return (
    <main className="bg-[#0A1628]">
      <Navbar />
      <BlogPage />
      <Footer />
    </main>
  )
}