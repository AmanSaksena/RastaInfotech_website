import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Chatbot from '@/components/sections/Chatbot'
import LeadPopup from '@/components/sections/LeadPopup'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Rasta Infotech | Digital Transformation & Career Assurance',
  description: 'Leading IT services and guaranteed placement programs in Bangalore.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <Chatbot />
        <LeadPopup />
      </body>
    </html>
  )
}