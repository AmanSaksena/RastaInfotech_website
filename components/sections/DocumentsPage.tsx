'use client'

import { useRef, useState, useMemo } from 'react'
import { motion, useInView } from 'framer-motion'
import Link from 'next/link'
import { documents, modules, moduleColors, moduleFullNames } from '@/data/documents'

const ITEMS_PER_PAGE = 20

export default function DocumentsPage() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  const [activeModule, setActiveModule] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')
  const [activeArea, setActiveArea] = useState('All')
  const [currentPage, setCurrentPage] = useState(1)
  const [sortBy, setSortBy] = useState<'title' | 'date' | 'author'>('title')
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc')

  // Get unique areas for active module
  const availableAreas = useMemo(() => {
    const filtered = activeModule === 'All'
      ? documents
      : documents.filter(d => d.module === activeModule)
    const areas = Array.from(new Set(filtered.map(d => d.area).filter(Boolean) as string[])).sort()
    return ['All', ...areas]
  }, [activeModule])

  // Filter + search + sort
  const filtered = useMemo(() => {
    let result = documents

    if (activeModule !== 'All') {
      result = result.filter(d => d.module === activeModule)
    }
    if (activeArea !== 'All') {
      result = result.filter(d => d.area === activeArea)
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase()
      result = result.filter(d =>
        d.title.toLowerCase().includes(q) ||
        d.author.toLowerCase().includes(q) ||
        d.area.toLowerCase().includes(q) ||
        d.module.toLowerCase().includes(q)
      )
    }

    // Sort
    result = [...result].sort((a, b) => {
      const valA = a[sortBy] || ''
      const valB = b[sortBy] || ''
      if (sortDir === 'asc') return valA.localeCompare(valB)
      return valB.localeCompare(valA)
    })

    return result
  }, [activeModule, activeArea, searchQuery, sortBy, sortDir])

  // Pagination
  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE)
  const paginated = filtered.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE)

  const handleModuleChange = (mod: string) => {
    setActiveModule(mod)
    setActiveArea('All')
    setCurrentPage(1)
  }

  const handleAreaChange = (area: string) => {
    setActiveArea(area)
    setCurrentPage(1)
  }

  const handleSearch = (q: string) => {
    setSearchQuery(q)
    setCurrentPage(1)
  }

  const handleSort = (col: 'title' | 'date' | 'author') => {
    if (sortBy === col) {
      setSortDir(d => d === 'asc' ? 'desc' : 'asc')
    } else {
      setSortBy(col)
      setSortDir('asc')
    }
    setCurrentPage(1)
  }

  const SortIcon = ({ col }: { col: string }) => (
    <span className="ml-1 inline-flex flex-col">
      <svg
        className={`w-3 h-3 ${sortBy === col && sortDir === 'asc' ? 'text-[#0066FF]' : 'text-[#8892A4]/40'}`}
        fill="currentColor" viewBox="0 0 24 24"
      >
        <path d="M7 14l5-5 5 5z" />
      </svg>
      <svg
        className={`w-3 h-3 -mt-1 ${sortBy === col && sortDir === 'desc' ? 'text-[#0066FF]' : 'text-[#8892A4]/40'}`}
        fill="currentColor" viewBox="0 0 24 24"
      >
        <path d="M7 10l5 5 5-5z" />
      </svg>
    </span>
  )

  return (
    <section className="relative bg-[#0A1628] overflow-hidden">

      {/* Hero */}
      <div className="relative pt-32 pb-12">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1600&q=80"
            alt="Documents"
            className="w-full h-full object-cover opacity-15"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0A1628]/80 to-[#0A1628]" />
        </div>
        <div className="relative z-10 text-center px-4">
          <div className="flex items-center justify-center gap-2 text-sm mb-6">
            <Link href="/" className="text-[#8892A4] hover:text-white transition-colors">Home</Link>
            <span className="text-[#8892A4]">/</span>
            <span className="text-white">SAP Documents</span>
          </div>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#0066FF]/30 bg-[#0066FF]/10 mb-6">
            <span className="text-[#0066FF] text-sm font-semibold tracking-wide">📚 Knowledge Library</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-4">
            SAP{' '}
            <span className="bg-gradient-to-r from-[#0066FF] to-[#00C896] bg-clip-text text-transparent">
              Documents
            </span>
          </h1>
          <p className="text-[#8892A4] text-lg max-w-2xl mx-auto mb-4">
            Find below a list of recommended documents related to multiple modules in SAP ERP and SAP S/4HANA shared via our LinkedIn profile.
          </p>
          <p className="text-[#0066FF] font-semibold text-sm">
            {documents.length} Documents Available
          </p>
        </div>
      </div>

      <div ref={ref} className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">

        {/* Module Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-10"
        >
          {modules.map((mod, i) => {
            const count = documents.filter(d => d.module === mod).length
            return (
              <motion.button
                key={mod}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: i * 0.05 }}
                onClick={() => handleModuleChange(mod)}
                className={`p-4 rounded-xl border text-center transition-all duration-300 hover:-translate-y-1 ${
                  activeModule === mod
                    ? 'border-[#0066FF]/60 bg-[#0066FF]/15 shadow-lg shadow-[#0066FF]/10'
                    : 'border-white/10 bg-white/5 hover:border-white/20'
                }`}
              >
                <p className={`text-xl font-black bg-gradient-to-r ${moduleColors[mod]} bg-clip-text text-transparent`}>
                  {mod}
                </p>
                <p className="text-white text-sm font-bold mt-0.5">{count}</p>
                <p className="text-[#8892A4] text-xs mt-0.5">docs</p>
              </motion.button>
            )
          })}
        </motion.div>

        {/* Search + Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-col gap-4 mb-6"
        >
          {/* Search */}
          <div className="relative">
            <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#8892A4]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Search by title, author, area, or module..."
              value={searchQuery}
              onChange={e => handleSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-[#8892A4] focus:outline-none focus:border-[#0066FF]/60 focus:bg-[#0066FF]/5 transition-all duration-300"
            />
            {searchQuery && (
              <button
                onClick={() => handleSearch('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-[#8892A4] hover:text-white transition-colors"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>

          {/* Module Filter + Area Filter Row */}
          <div className="flex flex-col sm:flex-row gap-3">
            {/* Module select */}
            <select
              value={activeModule}
              onChange={e => handleModuleChange(e.target.value)}
              className="flex-1 px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-[#0066FF]/60 transition-all duration-300 cursor-pointer"
            >
              <option value="All" className="bg-[#0A1628]">All Modules ({documents.length})</option>
              {modules.map(mod => (
                <option key={mod} value={mod} className="bg-[#0A1628]">
                  {moduleFullNames[mod] || mod} ({documents.filter(d => d.module === mod).length})
                </option>
              ))}
            </select>

            {/* Area select */}
            <select
              value={activeArea}
              onChange={e => handleAreaChange(e.target.value)}
              className="flex-1 px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-[#0066FF]/60 transition-all duration-300 cursor-pointer"
            >
              {availableAreas.map(area => (
                <option key={area} value={area} className="bg-[#0A1628]">
                  {area === 'All' ? 'All Areas' : area}
                </option>
              ))}
            </select>

            {/* Clear Filters */}
            {(activeModule !== 'All' || activeArea !== 'All' || searchQuery) && (
              <button
                onClick={() => {
                  setActiveModule('All')
                  setActiveArea('All')
                  setSearchQuery('')
                  setCurrentPage(1)
                }}
                className="px-5 py-3 rounded-xl border border-white/10 text-[#8892A4] hover:text-white hover:border-white/30 transition-all duration-300 whitespace-nowrap text-sm"
              >
                Clear All
              </button>
            )}
          </div>
        </motion.div>

        {/* Results Info */}
        <div className="flex items-center justify-between mb-4">
          <p className="text-[#8892A4] text-sm">
            Showing{' '}
            <span className="text-white font-bold">{filtered.length}</span>{' '}
            of {documents.length} documents
            {activeModule !== 'All' && (
              <span> in <span className={`font-bold bg-gradient-to-r ${moduleColors[activeModule]} bg-clip-text text-transparent`}>{activeModule}</span></span>
            )}
            {activeArea !== 'All' && (
              <span> • <span className="text-[#0066FF] font-bold">{activeArea}</span></span>
            )}
          </p>
          <p className="text-[#8892A4] text-xs">
            Page {currentPage} of {totalPages}
          </p>
        </div>

        {/* Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="rounded-2xl border border-white/10 overflow-hidden mb-8"
        >
          {/* Table Header */}
          <div className="grid grid-cols-12 gap-2 px-5 py-3 bg-white/5 border-b border-white/10 text-xs font-bold text-[#8892A4] uppercase tracking-wider">
            <div className="col-span-1 text-center">#</div>
            <div
              className="col-span-5 flex items-center gap-1 cursor-pointer hover:text-white transition-colors"
              onClick={() => handleSort('title')}
            >
              Title <SortIcon col="title" />
            </div>
            <div className="col-span-2">Area / Process</div>
            <div
              className="col-span-2 flex items-center gap-1 cursor-pointer hover:text-white transition-colors"
              onClick={() => handleSort('author')}
            >
              Author <SortIcon col="author" />
            </div>
            <div className="col-span-1 text-center">Module</div>
            <div className="col-span-1 text-center">Link</div>
          </div>

          {/* Table Body */}
          {paginated.length === 0 ? (
            <div className="text-center py-16 bg-white/5">
              <div className="text-5xl mb-4">🔍</div>
              <h3 className="text-white font-black text-xl mb-2">No documents found</h3>
              <p className="text-[#8892A4] text-sm">Try a different search term or filter</p>
            </div>
          ) : (
            paginated.map((doc, i) => {
              const rowNum = (currentPage - 1) * ITEMS_PER_PAGE + i + 1
              return (
                <div
                  key={`${doc.title}-${i}`}
                  className="grid grid-cols-12 gap-2 px-5 py-4 border-b border-white/5 hover:bg-white/5 transition-colors duration-200 group items-center"
                >
                  {/* Row Number */}
                  <div className="col-span-1 text-center">
                    <span className="text-[#8892A4] text-xs">{rowNum}</span>
                  </div>

                  {/* Title */}
                  <div className="col-span-5">
                    <p className="text-white text-sm font-medium group-hover:text-[#0066FF] transition-colors duration-200 leading-snug line-clamp-2">
                      {doc.title}
                    </p>
                    {doc.date && (
                      <p className="text-[#8892A4] text-xs mt-1">{doc.date}</p>
                    )}
                  </div>

                  {/* Area */}
                  <div className="col-span-2">
                    {doc.area && (
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold text-white bg-gradient-to-r ${moduleColors[doc.module] || 'from-[#0066FF] to-[#3385FF]'} opacity-90`}>
                        {doc.area}
                      </span>
                    )}
                  </div>

                  {/* Author */}
                  <div className="col-span-2">
                    <p className="text-[#8892A4] text-xs leading-snug">
                      {doc.author && doc.author !== 'Unknown' ? doc.author : '—'}
                    </p>
                  </div>

                  {/* Module Badge */}
                  <div className="col-span-1 text-center">
                    <span className={`inline-flex items-center justify-center px-2 py-1 rounded-lg text-xs font-black text-white bg-gradient-to-r ${moduleColors[doc.module] || 'from-[#0066FF] to-[#3385FF]'}`}>
                      {doc.module}
                    </span>
                  </div>

                  {/* Link */}
                  <div className="col-span-1 text-center">
                    {doc.link ? (
                      <a
                        href={doc.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-[#0066FF]/10 border border-[#0066FF]/20 text-[#0066FF] hover:bg-[#0066FF]/20 hover:border-[#0066FF]/40 transition-all duration-200"
                        title="Open Document"
                      >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </a>
                    ) : (
                      <span className="text-[#8892A4] text-xs">—</span>
                    )}
                  </div>
                </div>
              )
            })
          )}
        </motion.div>

        {/* Pagination */}
        {totalPages > 1 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="flex items-center justify-center gap-2 mb-16"
          >
            {/* Prev */}
            <button
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 rounded-xl border border-white/10 text-[#8892A4] hover:text-white hover:border-white/30 transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed text-sm"
            >
              ← Prev
            </button>

            {/* Page Numbers */}
            {Array.from({ length: Math.min(totalPages, 7) }, (_, i) => {
              let page: number
              if (totalPages <= 7) {
                page = i + 1
              } else if (currentPage <= 4) {
                page = i + 1
              } else if (currentPage >= totalPages - 3) {
                page = totalPages - 6 + i
              } else {
                page = currentPage - 3 + i
              }
              return (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`w-10 h-10 rounded-xl text-sm font-bold transition-all duration-200 ${
                    currentPage === page
                      ? 'bg-gradient-to-r from-[#0066FF] to-[#00C896] text-white shadow-lg'
                      : 'border border-white/10 text-[#8892A4] hover:text-white hover:border-white/30'
                  }`}
                >
                  {page}
                </button>
              )
            })}

            {/* Next */}
            <button
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="px-4 py-2 rounded-xl border border-white/10 text-[#8892A4] hover:text-white hover:border-white/30 transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed text-sm"
            >
              Next →
            </button>
          </motion.div>
        )}

        {/* Module Legend */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="p-6 rounded-2xl border border-white/10 bg-white/5 mb-8"
        >
          <h3 className="text-white font-black text-lg mb-4">Module Legend</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {modules.map(mod => (
              <div key={mod} className="flex items-center gap-2">
                <span className={`w-8 h-6 rounded text-xs font-black text-white flex items-center justify-center bg-gradient-to-r ${moduleColors[mod]}`}>
                  {mod.length > 4 ? mod.slice(0, 4) : mod}
                </span>
                <span className="text-[#8892A4] text-xs">{moduleFullNames[mod] || mod}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* LinkedIn CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="relative p-8 lg:p-10 rounded-3xl overflow-hidden text-center"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-[#0066FF]/10 to-[#00C896]/10" />
          <div className="absolute inset-0 border border-[#0066FF]/20 rounded-3xl" />
          <div className="relative z-10">
            <div className="text-4xl mb-4">💼</div>
            <h3 className="text-2xl font-black text-white mb-3">
              Follow Us on LinkedIn for More Resources
            </h3>
            <p className="text-[#8892A4] mb-6 max-w-lg mx-auto text-sm">
              We regularly share new SAP documents, tutorials, and industry insights via our LinkedIn profile. Follow us to stay updated.
            </p>
            <a
              href="https://www.linkedin.com/company/rastainfotech/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-xl text-base font-bold text-white bg-gradient-to-r from-[#0066FF] to-[#00C896] hover:shadow-lg hover:shadow-[#0066FF]/30 transition-all duration-300"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" />
                <circle cx="4" cy="4" r="2" />
              </svg>
              Follow Rasta Infotech on LinkedIn
            </a>
          </div>
        </motion.div>

      </div>
    </section>
  )
}