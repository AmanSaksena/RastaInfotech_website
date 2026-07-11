'use client'

import { useCallback, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import AdminShell from '@/components/admin/AdminShell'

interface BlogPost {
  _id: string
  title: string
  slug: string
  summary: string
  category: string
  tags: string[]
  author: string
  readTime: string
  status: 'draft' | 'published'
  publishedAt?: string
  createdAt: string
  source?: string
}

const statusStyles: Record<string, string> = {
  published: 'bg-green-500/20 text-green-400 border-green-500/30',
  draft: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
}

function formatDate(d: string) {
  return new Date(d).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
}

export default function AdminBlogPage() {
  const router = useRouter()
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [generating, setGenerating] = useState(false)
  const [genResult, setGenResult] = useState<string>('')
  const [filter, setFilter] = useState<'all' | 'draft' | 'published'>('all')
  const [actionLoading, setActionLoading] = useState<string | null>(null)

  const loadPosts = useCallback(async () => {
    setLoading(true)
    try {
      // Fetch both published and drafts
      const [pub, drafts] = await Promise.all([
        fetch('/api/blog?status=published&limit=50').then((r) => {
          if (r.status === 401) { router.push('/admin/login'); return null }
          return r.json()
        }),
        fetch('/api/blog?status=draft&limit=50').then((r) => r.json()),
      ])
      const all = [...(pub?.posts || []), ...(drafts?.posts || [])]
      all.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      setPosts(all)
    } catch {
      setPosts([])
    } finally {
      setLoading(false)
    }
  }, [router])

  useEffect(() => {
    loadPosts()
  }, [loadPosts])

  async function handleGenerate() {
    setGenerating(true)
    setGenResult('')
    try {
      const res = await fetch('/api/blog/generate', { method: 'POST' })
      const data = await res.json()
      if (data.error) {
        setGenResult(`Error: ${data.error}`)
      } else {
        setGenResult(`Generated ${data.generated} post(s). Skipped ${data.skipped}. Check drafts.`)
        loadPosts()
      }
    } catch {
      setGenResult('Generation failed. Try again.')
    } finally {
      setGenerating(false)
    }
  }

  async function handleToggleStatus(post: BlogPost) {
    setActionLoading(post._id)
    const newStatus = post.status === 'published' ? 'draft' : 'published'
    try {
      await fetch(`/api/blog/${post._id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      })
      setPosts((prev) => prev.map((p) => p._id === post._id ? { ...p, status: newStatus } : p))
    } finally {
      setActionLoading(null)
    }
  }

  async function handleDelete(id: string) {
    if (!confirm('Delete this post permanently?')) return
    setActionLoading(id)
    try {
      await fetch(`/api/blog/${id}`, { method: 'DELETE' })
      setPosts((prev) => prev.filter((p) => p._id !== id))
    } finally {
      setActionLoading(null)
    }
  }

  const filtered = filter === 'all' ? posts : posts.filter((p) => p.status === filter)

  return (
    <AdminShell>
      <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-white mb-1">Blog Management</h1>
          <p className="text-[#8892A4]">Auto-generate and manage blog posts</p>
        </div>
        <button
          onClick={handleGenerate}
          disabled={generating}
          className="flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-[#0066FF] to-[#00C896] hover:shadow-lg hover:shadow-[#0066FF]/30 transition-all duration-300 disabled:opacity-60 shrink-0"
        >
          {generating ? (
            <>
              <div className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
              Generating…
            </>
          ) : (
            <>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              Auto-Generate Posts
            </>
          )}
        </button>
      </div>

      {genResult && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`mb-6 p-4 rounded-xl border text-sm font-semibold ${
            genResult.startsWith('Error') || genResult.startsWith('Generation')
              ? 'border-red-500/30 bg-red-500/10 text-red-400'
              : 'border-green-500/30 bg-green-500/10 text-green-400'
          }`}
        >
          {genResult}
        </motion.div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        {[
          { label: 'Total Posts', value: posts.length, color: 'from-[#0066FF] to-[#3385FF]' },
          { label: 'Published', value: posts.filter((p) => p.status === 'published').length, color: 'from-[#00C896] to-[#0066FF]' },
          { label: 'Drafts', value: posts.filter((p) => p.status === 'draft').length, color: 'from-[#F59E0B] to-[#0066FF]' },
        ].map((s, i) => (
          <motion.div key={s.label} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}>
            <div className="p-4 rounded-2xl border border-white/10 bg-white/5 text-center">
              <div className={`text-3xl font-black bg-gradient-to-r ${s.color} bg-clip-text text-transparent`}>{s.value}</div>
              <div className="text-[#8892A4] text-xs mt-1">{s.label}</div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Filter */}
      <div className="flex gap-2 mb-6">
        {(['all', 'published', 'draft'] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 capitalize ${
              filter === f
                ? 'bg-gradient-to-r from-[#0066FF] to-[#00C896] text-white'
                : 'border border-white/10 text-[#8892A4] hover:text-white bg-white/5'
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-40">
          <div className="w-8 h-8 rounded-full border-2 border-[#0066FF]/30 border-t-[#0066FF] animate-spin" />
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-20 border border-white/10 rounded-2xl">
          <div className="text-5xl mb-4">📝</div>
          <h3 className="text-white font-bold text-xl mb-2">No posts yet</h3>
          <p className="text-[#8892A4] text-sm mb-6">Click &quot;Auto-Generate Posts&quot; to create AI-powered blog content.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((post, i) => (
            <motion.div
              key={post._id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04 }}
              className="flex flex-col sm:flex-row sm:items-center gap-4 p-4 rounded-xl border border-white/10 bg-white/5 hover:border-white/20 transition-all duration-200"
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className={`px-2 py-0.5 rounded-full text-xs font-semibold border capitalize ${statusStyles[post.status]}`}>
                    {post.status}
                  </span>
                  <span className="text-[#8892A4] text-xs">{post.category}</span>
                  <span className="text-[#8892A4] text-xs">·</span>
                  <span className="text-[#8892A4] text-xs">{post.readTime}</span>
                </div>
                <p className="text-white font-semibold text-sm truncate">{post.title}</p>
                <p className="text-[#8892A4] text-xs mt-0.5 line-clamp-1">{post.summary}</p>
                <div className="flex flex-wrap gap-1 mt-1.5">
                  {post.tags.slice(0, 3).map((t) => (
                    <span key={t} className="px-1.5 py-0.5 text-xs border border-white/10 rounded text-[#8892A4]">#{t}</span>
                  ))}
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <span className="text-[#8892A4] text-xs hidden sm:block">{formatDate(post.createdAt)}</span>
                {post.status === 'published' && (
                  <a
                    href={`/blog/${post.slug}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1.5 rounded-lg text-xs font-semibold border border-white/10 text-[#8892A4] hover:text-white hover:border-white/30 transition-colors"
                  >
                    View
                  </a>
                )}
                <button
                  onClick={() => handleToggleStatus(post)}
                  disabled={actionLoading === post._id}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 disabled:opacity-50 ${
                    post.status === 'published'
                      ? 'border border-yellow-500/30 text-yellow-400 hover:bg-yellow-500/10'
                      : 'border border-green-500/30 text-green-400 hover:bg-green-500/10'
                  }`}
                >
                  {actionLoading === post._id ? '...' : post.status === 'published' ? 'Unpublish' : 'Publish'}
                </button>
                <button
                  onClick={() => handleDelete(post._id)}
                  disabled={actionLoading === post._id}
                  className="px-3 py-1.5 rounded-lg text-xs font-semibold border border-red-500/20 text-red-400 hover:bg-red-500/10 transition-all duration-200 disabled:opacity-50"
                >
                  Delete
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </AdminShell>
  )
}
