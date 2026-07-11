// Save this as: app/documents/page.tsx

import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import DocumentsPage from '@/components/sections/DocumentsPage'

export const metadata = {
  title: 'SAP Documents | Rasta Infotech',
  description: 'Browse 500+ recommended SAP documents covering FI, CO, MM, SD, PP, PM, Technical and more modules.',
}

export default function Documents() {
  return (
    <main className="bg-[#0A1628]">
      <Navbar />
      <DocumentsPage />
      <Footer />
    </main>
  )
}