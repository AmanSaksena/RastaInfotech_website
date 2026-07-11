import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import Link from 'next/link'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { connectDB } from '@/backend/lib/mongodb'
import Blog from '@/backend/models/Blog'

interface Props {
  params: { slug: string }
}

async function getPost(slug: string) {
  try {
    await connectDB()
    const post = await Blog.findOne({ slug, status: 'published' }).lean()
    return post
  } catch {
    return null
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await getPost(params.slug)
  if (!post) return { title: 'Post Not Found' }
  return {
    title: `${(post as { title: string }).title} | Rasta Infotech Blog`,
    description: (post as { summary: string }).summary,
  }
}

const categoryColors: Record<string, string> = {
  'IT Transformation': 'from-[#0066FF] to-[#3385FF]',
  'Recruitment': 'from-[#00C896] to-[#0066FF]',
  'Automation': 'from-[#7C3AED] to-[#0066FF]',
}

export default async function BlogPostPage({ params }: Props) {
  const post = await getPost(params.slug) as {
    title: string; summary: string; content: string; category: string;
    image: string; tags: string[]; author: string; readTime: string;
    publishedAt: string; createdAt: string; source?: string;
  } | null

  if (!post) notFound()

  const date = new Date(post.publishedAt || post.createdAt).toLocaleDateString('en-IN', {
    day: 'numeric', month: 'long', year: 'numeric',
  })

  const paragraphs = post.content.split('\n').filter(Boolean)

  return (
    <main className="bg-[#060F1E] min-h-screen">
      <Navbar />

      {/* Hero */}
      <div className="relative pt-28 pb-12">
        <div className="absolute inset-0 z-0">
          <img src={post.image} alt={post.title} className="w-full h-full object-cover opacity-15" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#060F1E]/70 to-[#060F1E]" />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6">
          <Link href="/blog" className="inline-flex items-center gap-2 text-[#8892A4] hover:text-white text-sm mb-6 transition-colors duration-200">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Blog
          </Link>

          <div className="flex items-center gap-3 mb-4">
            <span className={`px-3 py-1 rounded-full text-xs font-bold text-white bg-gradient-to-r ${categoryColors[post.category] || 'from-[#0066FF] to-[#00C896]'}`}>
              {post.category}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-6 leading-tight">
            {post.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-[#8892A4] text-sm">
            <span>{date}</span>
            <span className="w-1 h-1 rounded-full bg-[#8892A4]" />
            <span>{post.readTime}</span>
            <span className="w-1 h-1 rounded-full bg-[#8892A4]" />
            <span>{post.author}</span>
          </div>
        </div>
      </div>

      {/* Cover Image */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 mb-10">
        <div className="rounded-2xl overflow-hidden h-64 sm:h-80 lg:h-96">
          <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <article className="lg:col-span-2">
            <p className="text-[#B0BAD0] text-lg leading-relaxed mb-6 font-medium border-l-4 border-[#0066FF] pl-4">
              {post.summary}
            </p>
            <div className="space-y-4">
              {paragraphs.map((para, i) => (
                <p key={i} className="text-[#8892A4] leading-relaxed text-base">
                  {para}
                </p>
              ))}
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mt-8 pt-8 border-t border-white/10">
              {post.tags.map((tag) => (
                <span key={tag} className="px-3 py-1 rounded-lg text-xs border border-white/10 text-[#8892A4] hover:border-[#0066FF]/40 transition-colors">
                  #{tag}
                </span>
              ))}
            </div>

            {post.source && (
              <p className="mt-4 text-xs text-[#8892A4]">
                Source:{' '}
                <a href={post.source} target="_blank" rel="noopener noreferrer" className="text-[#0066FF] hover:underline">
                  Original Article
                </a>
              </p>
            )}
          </article>

          {/* Sidebar */}
          <aside className="space-y-6">
            <div className="p-6 rounded-2xl border border-white/10 bg-white/5">
              <h3 className="text-white font-bold mb-4">About Rasta Infotech</h3>
              <p className="text-[#8892A4] text-sm leading-relaxed mb-4">
                Rasta Infotech is a leading IT consulting and talent solutions company helping enterprises transform through technology.
              </p>
              <Link
                href="/contact"
                className="block w-full text-center px-4 py-3 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-[#0066FF] to-[#00C896] hover:shadow-lg hover:shadow-[#0066FF]/30 transition-all duration-300"
              >
                Get in Touch
              </Link>
            </div>

            <div className="p-6 rounded-2xl border border-white/10 bg-white/5">
              <h3 className="text-white font-bold mb-4">Explore Services</h3>
              <div className="space-y-2">
                {['AI Services', 'Cloud Services', 'DevOps Automation', 'Cyber Security'].map((s) => (
                  <Link key={s} href="/services" className="flex items-center gap-2 text-[#8892A4] hover:text-white text-sm transition-colors py-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#0066FF]" />
                    {s}
                  </Link>
                ))}
              </div>
            </div>

            <div className="p-6 rounded-2xl border border-[#0066FF]/20 bg-[#0066FF]/5">
              <h3 className="text-white font-bold mb-2">IT Newsletter</h3>
              <p className="text-[#8892A4] text-sm mb-4">Weekly trends delivered to your inbox.</p>
              <Link href="/blog#subscribe" className="block w-full text-center px-4 py-2 rounded-xl text-sm font-bold text-white border border-[#0066FF]/40 hover:bg-[#0066FF]/10 transition-colors">
                Subscribe
              </Link>
            </div>
          </aside>
        </div>

        {/* Back CTA */}
        <div className="mt-12 text-center">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl text-base font-bold text-white border border-white/20 hover:border-[#0066FF]/60 hover:bg-[#0066FF]/10 transition-all duration-300"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to All Articles
          </Link>
        </div>
      </div>

      <Footer />
    </main>
  )
}
