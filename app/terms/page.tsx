import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

export default function TermsPage() {
  return (
    <main className="bg-[#0A1628]">
      <Navbar />
      <div className="relative pt-32 pb-8 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=1600&q=80" alt="Terms" className="w-full h-full object-cover opacity-20" />
          <div className="absolute inset-0 bg-[#0A1628]/80" />
        </div>
        <div className="relative z-10 text-center">
          <h1 className="text-5xl font-black text-white">Terms & Conditions</h1>
          <p className="text-[#8892A4] mt-3">Last updated on 10th July 2025</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="space-y-10 text-[#8892A4] leading-relaxed">

          <div>
            <h2 className="text-white text-2xl font-black mb-3">Introduction</h2>
            <p>These terms and conditions (&quot;Terms&quot;, &quot;Agreement&quot;) are an agreement between Rasta Infotech Pvt. Ltd. and you (&quot;User&quot;, &quot;you&quot; or &quot;your&quot;). This Agreement sets forth the general terms and conditions of your use of the rastainfotech.com website and any of its products or services.</p>
          </div>

          <div>
            <h2 className="text-white text-2xl font-black mb-3">Acceptance of Terms</h2>
            <p>By accessing or using our Website, you confirm that you accept these Terms and agree to comply with them. If you do not agree to these Terms, you must not use our Website.</p>
          </div>

          <div>
            <h2 className="text-white text-2xl font-black mb-3">Eligibility</h2>
            <p>You must be at least 18 years old to use this website. By using this site, you represent and warrant that you meet the age requirement.</p>
          </div>

          <div>
            <h2 className="text-white text-2xl font-black mb-3">Use of Website</h2>
            <p className="mb-3">You are granted a limited license only for accessing the Website for personal and non-commercial use. The following activities are prohibited:</p>
            <ul className="list-disc list-inside space-y-2 pl-4">
              <li>Republishing content from the Website</li>
              <li>Selling, renting or sub-licensing Website material</li>
              <li>Using this Website in any way that is damaging</li>
              <li>Engaging in data mining or any similar activity</li>
            </ul>
          </div>

          <div>
            <h2 className="text-white text-2xl font-black mb-3">User Content</h2>
            <p>Any content you submit, including audio, video, text, or images, remains your responsibility. You grant us a non-exclusive, royalty-free, transferable license to use, reproduce, and distribute your content across our services.</p>
          </div>

          <div>
            <h2 className="text-white text-2xl font-black mb-3">No Warranties</h2>
            <p>This Website is provided &quot;as is,&quot; with all faults, and we express no representations or warranties of any kind related to this Website or the materials contained on it. Use at your own risk.</p>
          </div>

          <div>
            <h2 className="text-white text-2xl font-black mb-3">Limitation of Liability</h2>
            <p>In no event shall Rasta Infotech Pvt. Ltd. or its employees be held liable for anything arising out of or in any way connected with your use of this Website. We are not liable for indirect, consequential, or special liability related to the use of this Website.</p>
          </div>

          <div>
            <h2 className="text-white text-2xl font-black mb-3">Governing Law & Jurisdiction</h2>
            <p>These Terms are governed by the laws of India. You agree to submit to the jurisdiction of the courts in Delhi for the resolution of any disputes.</p>
          </div>

          <div className="p-6 rounded-2xl border border-white/10 bg-white/5">
            <h2 className="text-white text-xl font-black mb-3">Contact Us</h2>
            <p className="mb-2">If you have questions about these Terms and Conditions, please contact us at:</p>
            <p><span className="text-white font-bold">Email:</span> info@rastainfotech.com</p>
            <p><span className="text-white font-bold">Address:</span> 23 2nd Cross, Near Malnad Coaching Center, MHR Layout, Bangalore North, Karnataka, India, 560090</p>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  )
}