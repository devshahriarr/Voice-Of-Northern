'use client';
import React, { useState } from 'react';
import { mockNotices } from '@/modules/notice/mock-notices';

export default function NoticesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<'ALL' | 'EMERGENCY' | 'ACADEMIC'>('ALL');

  const filteredNotices = mockNotices.filter(notice => {
    const matchesCategory = activeCategory === 'ALL' || notice.category === activeCategory;
    const matchesSearch = notice.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          notice.content.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 px-4 md:px-8 py-16">
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* Header Title */}
        <div className="border-b border-slate-900 pb-5">
          <span className="px-3 py-1 text-[10px] font-bold tracking-wider text-orange-400 bg-orange-950/40 border border-orange-900/30 rounded-full uppercase">
            Official Bulletin Desk
          </span>
          <h1 className="text-3xl font-extrabold tracking-tight text-white mt-2">Platform Notices & Circulars</h1>
          <p className="text-xs text-slate-400 mt-1">
            Important student body announcements, policy protests, and institutional guidelines.
          </p>
        </div>

        {/* Filters and Search Bar */}
        <div className="flex flex-col sm:flex-row gap-4 justify-between items-center bg-slate-900/30 p-4 border border-slate-900 rounded-2xl">
          <div className="flex bg-slate-950 p-1 rounded-xl border border-slate-900 w-full sm:w-auto">
            {(['ALL', 'EMERGENCY', 'ACADEMIC'] as const).map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`flex-1 sm:flex-initial px-4 py-2 text-xs font-bold rounded-lg transition-all ${
                  activeCategory === cat
                    ? 'bg-cyan-400 text-slate-950 shadow-md shadow-cyan-400/10'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {cat === 'ALL' ? 'All Bulletins' : cat}
              </button>
            ))}
          </div>

          <div className="relative w-full sm:max-w-xs">
            <input
              type="text"
              placeholder="Search circulars..."
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 pl-9 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
            />
            <span className="absolute left-3 top-2.5 text-slate-500 text-xs">🔍</span>
          </div>
        </div>

        {/* Circulars List */}
        <div className="space-y-6">
          {filteredNotices.map(notice => (
            <div
              key={notice.id}
              className={`p-6 rounded-2xl border transition-all ${
                notice.priority === 'URGENT'
                  ? 'bg-gradient-to-br from-slate-900/40 to-orange-950/10 border-orange-500/20'
                  : 'bg-slate-900/20 border-slate-900'
              }`}
            >
              <div className="flex items-center justify-between gap-3 mb-4">
                <div className="flex items-center gap-3">
                  <span className={`px-2.5 py-0.5 text-[9px] font-black rounded border ${
                    notice.priority === 'URGENT'
                      ? 'bg-red-500/10 text-red-400 border-red-500/20'
                      : 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20'
                  }`}>
                    {notice.priority}
                  </span>
                  <span className="text-xs text-slate-500 font-mono">
                    {new Date(notice.publishedAt).toLocaleString()}
                  </span>
                </div>
                <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider bg-slate-950 px-2 py-0.5 rounded border border-slate-900">
                  {notice.category}
                </span>
              </div>

              <h3 className="text-lg font-bold text-white mb-2 leading-snug">
                {notice.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed whitespace-pre-wrap">
                {notice.content}
              </p>
            </div>
          ))}

          {filteredNotices.length === 0 && (
            <div className="py-16 text-center text-slate-500 text-xs">
              No notices matching your criteria were found.
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
