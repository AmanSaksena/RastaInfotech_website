import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

export default function PrivacyPage() {
  return (
    <main className="bg-[#0A1628]">
      <Navbar />
      <div className="relative pt-32 pb-8 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=1600&q=80" alt="Privacy" className="w-full h-full object-cover opacity-20" />
          <div className="absolute inset-0 bg-[#0A1628]/80" />
        </div>
        <div className="relative z-10 text-center">
          <h1 className="text-5xl font-black text-white">Privacy Policy</h1>
          <p className="text-[#8892A4] mt-3">Last updated on 07th July 2025</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="space-y-10 text-[#8892A4] leading-relaxed">

          <div>
            <h2 className="text-white text-2xl font-black mb-3">Introduction</h2>
            <p>Welcome to Rasta Infotech Pvt. Ltd. This Privacy Policy outlines our practices regarding the collection, use, and disclosure of information when you use our website, rastainfotech.com. We are committed to protecting your privacy and ensuring that your personal information is handled safely and responsibly.</p>
          </div>

          <div>
            <h2 className="text-white text-2xl font-black mb-3">Information We Collect</h2>
            <p className="font-bold text-white mb-2">Personal Information:</p>
            <ul className="list-disc list-inside space-y-1 pl-4 mb-4">
              <li>Name</li>
              <li>Email address</li>
              <li>Phone number</li>
              <li>Address</li>
              <li>Any other information you choose to provide</li>
            </ul>
            <p className="font-bold text-white mb-2">Usage Data:</p>
            <ul className="list-disc list-inside space-y-1 pl-4">
              <li>IP address</li>
              <li>Browser type and version</li>
              <li>Pages visited</li>
              <li>Time and date of visits</li>
              <li>Time spent on pages</li>
            </ul>
          </div>

          <div>
            <h2 className="text-white text-2xl font-black mb-3">How We Use Your Information</h2>
            <ul className="list-disc list-inside space-y-2 pl-4">
              <li>To provide and maintain our Site</li>
              <li>To notify you about changes to our Site</li>
              <li>To provide customer support</li>
              <li>To improve our Site</li>
              <li>To monitor usage</li>
              <li>To detect and address technical issues</li>
            </ul>
          </div>

          <div>
            <h2 className="text-white text-2xl font-black mb-3">Security of Your Information</h2>
            <p>At Rasta Infotech, we prioritize the protection of your personal data. We implement commercially acceptable security measures including encryption, secure servers, and access controls to safeguard your information.</p>
          </div>

          <div>
            <h2 className="text-white text-2xl font-black mb-3">Changes to This Privacy Policy</h2>
            <p>Rasta Infotech reserves the right to update or modify this Privacy Policy at any time. Any changes will be reflected on this page along with a revised effective date.</p>
          </div>

          <div className="p-6 rounded-2xl border border-white/10 bg-white/5">
            <h2 className="text-white text-xl font-black mb-3">Contact Us</h2>
            <p className="mb-2">If you have any questions about this Privacy Policy, contact us at:</p>
            <p><span className="text-white font-bold">Email:</span> info@rastainfotech.com</p>
            <p><span className="text-white font-bold">Address:</span> 23 2nd Cross, Near Malnad Coaching Center, MHR Layout, Bangalore North, Karnataka, India, 560090</p>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  )
}