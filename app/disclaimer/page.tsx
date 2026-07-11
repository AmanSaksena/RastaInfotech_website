import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

export default function DisclaimerPage() {
  return (
    <main className="bg-[#0A1628]">
      <Navbar />
      <div className="relative pt-32 pb-8 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=1600&q=80" alt="Disclaimer" className="w-full h-full object-cover opacity-20" />
          <div className="absolute inset-0 bg-[#0A1628]/80" />
        </div>
        <div className="relative z-10 text-center">
          <h1 className="text-5xl font-black text-white">Disclaimer</h1>
          <p className="text-[#8892A4] mt-3">Last updated on 10th July 2025</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="space-y-10 text-[#8892A4] leading-relaxed">

          <div>
            <h2 className="text-white text-2xl font-black mb-3">General Information</h2>
            <p>The information provided by Rasta Infotech on https://www.rastainfotech.com/ is for general informational purposes only. All information on the Site is provided in good faith; however, we make no representation or warranty of any kind, express or implied, regarding the accuracy, adequacy, reliability, validity, or completeness of any information on the Site.</p>
          </div>

          <div>
            <h2 className="text-white text-2xl font-black mb-3">External Links Disclaimer</h2>
            <p>The Site may contain links to other websites or content belonging to or originating from third parties. We do not warrant, endorse, guarantee, or assume responsibility for the accuracy or reliability of any information offered by third-party websites linked through the Site.</p>
          </div>

          <div>
            <h2 className="text-white text-2xl font-black mb-3">Professional Disclaimer</h2>
            <p>The Site cannot and does not contain professional advice. The information is provided for general informational and educational purposes only and is not a substitute for professional advice.</p>
          </div>

          <div>
            <h2 className="text-white text-2xl font-black mb-3">Limitation of Liability</h2>
            <p>In no event shall Rasta Infotech, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses.</p>
          </div>

          <div>
            <h2 className="text-white text-2xl font-black mb-3">&quot;Use at Your Own Risk&quot; Disclaimer</h2>
            <p>All information in the Site is provided &quot;as is&quot;, with no guarantee of completeness, accuracy, timeliness, or of the results obtained from the use of this information. Rasta Infotech will not be liable to you or anyone else for any decision made or action taken in reliance on the information given by the Site.</p>
          </div>

          <div className="p-6 rounded-2xl border border-white/10 bg-white/5">
            <h2 className="text-white text-xl font-black mb-3">Contact Us</h2>
            <p className="mb-2">If you have any questions about this Disclaimer, contact us at:</p>
            <p><span className="text-white font-bold">Email:</span> info@rastainfotech.com</p>
            <p><span className="text-white font-bold">Address:</span> 23 2nd Cross, Near Malnad Coaching Center, MHR Layout, Bangalore North, Karnataka, India, 560090</p>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  )
}