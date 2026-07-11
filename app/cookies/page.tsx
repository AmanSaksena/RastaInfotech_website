import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

export default function CookiesPage() {
  return (
    <main className="bg-[#0A1628]">
      <Navbar />
      <div className="relative pt-32 pb-8 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=1600&q=80" alt="Cookies" className="w-full h-full object-cover opacity-20" />
          <div className="absolute inset-0 bg-[#0A1628]/80" />
        </div>
        <div className="relative z-10 text-center">
          <h1 className="text-5xl font-black text-white">Cookies Policy</h1>
          <p className="text-[#8892A4] mt-3">Last updated on 10th July 2025</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="space-y-10 text-[#8892A4] leading-relaxed">

          <div>
            <h2 className="text-white text-2xl font-black mb-3">Introduction</h2>
            <p>This Cookie Policy explains how Rasta Infotech Pvt. Ltd. uses cookies and similar technologies to recognize you when you visit our website at rastainfotech.com. It explains what these technologies are, why we use them, and your rights to control our use of them.</p>
          </div>

          <div>
            <h2 className="text-white text-2xl font-black mb-3">What Are Cookies?</h2>
            <p>Cookies are small data files placed on your computer or mobile device when you visit a website. They are used to make websites function properly, more efficiently, and to provide reporting information.</p>
          </div>

          <div>
            <h2 className="text-white text-2xl font-black mb-3">Types of Cookies We Use</h2>
            <div className="space-y-4">
              <div>
                <p className="text-white font-bold">1. Necessary Cookies</p>
                <p>These cookies are essential for the operation of our Site. They enable you to navigate the Site and use its features.</p>
              </div>
              <div>
                <p className="text-white font-bold">2. Analytics Cookies</p>
                <p>These cookies collect data about how you use the Site, like which pages you visit most often. This data is aggregated and anonymous.</p>
              </div>
              <div>
                <p className="text-white font-bold">3. Functionality Cookies</p>
                <p>These cookies help remember choices you have made, such as language or font preferences, to enhance your experience.</p>
              </div>
              <div>
                <p className="text-white font-bold">4. Advertising Cookies</p>
                <p>These cookies deliver ads more relevant to your interests. They also limit how often you see ads and measure ad campaign effectiveness.</p>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-white text-2xl font-black mb-3">Managing Cookies</h2>
            <p>You can manage cookies through your browser settings. Most web browsers allow you to refuse or delete cookies. However, disabling cookies may affect the functionality of our website.</p>
          </div>

          <div>
            <h2 className="text-white text-2xl font-black mb-3">Your Consent</h2>
            <p>By continuing to use our Site, you consent to the use of cookies in accordance with this Cookie Policy. If you do not agree, you should set your browser settings accordingly or not use the Site.</p>
          </div>

          <div className="p-6 rounded-2xl border border-white/10 bg-white/5">
            <h2 className="text-white text-xl font-black mb-3">Contact Us</h2>
            <p className="mb-2">If you have any questions about our use of cookies, contact us at:</p>
            <p><span className="text-white font-bold">Email:</span> info@rastainfotech.com</p>
            <p><span className="text-white font-bold">Address:</span> 23 2nd Cross, Near Malnad Coaching Center, MHR Layout, Bangalore North, Karnataka, India, 560090</p>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  )
}