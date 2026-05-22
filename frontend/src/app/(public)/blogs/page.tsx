'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { mockPosts } from '@/modules/content/mock-posts';

export default function PublicBlogsPage() {
    const [activeFilter, setActiveFilter] = useState<'ALL' | 'BLOG' | 'MAGAZINE'>('ALL');

    // CRITICAL SECURITY ENFORCEMENT: Only render posts with 'APPROVED' status on the public scope
    const filteredPublications = mockPosts.filter(
        post => post.status === 'APPROVED' && (activeFilter === 'ALL' || post.type === activeFilter)
    );

    return (
        <div className="min-h-screen bg-slate-950 text-slate-100 px-4 md:px-8 py-16">
            <div className="max-w-6xl mx-auto space-y-8">

                {/* Top Header & Context */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-900 pb-6">
                    <div>
                        <h1 className="text-3xl font-extrabold tracking-tight text-white">VON Publications</h1>
                        <p className="text-sm text-slate-400 mt-1">
                            Read verified student blogs and download official campus magazines. Open to everyone.
                        </p>
                    </div>

                    {/* Functional Filters */}
                    <div className="flex bg-slate-900/50 p-1 rounded-xl border border-slate-900 h-fit">
                        {(['ALL', 'BLOG', 'MAGAZINE'] as const).map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveFilter(tab)}
                                className={`px-4 py-2 text-xs font-bold rounded-lg transition-all ${activeFilter === tab
                                        ? 'bg-cyan-400 text-slate-950 shadow-md shadow-cyan-400/10'
                                        : 'text-slate-400 hover:text-slate-200'
                                    }`}
                            >
                                {tab === 'ALL' ? 'All Reads' : tab + 'S'}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Dynamic Masonry/Grid Feed layout */}
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {filteredPublications.map((post) => (
                        <div
                            key={post.id}
                            className="group bg-slate-900/10 border border-slate-900 rounded-2xl overflow-hidden flex flex-col justify-between hover:border-slate-800 transition-all duration-300"
                        >
                            <div>
                                {/* Optional Cover Image Node */}
                                {post.coverImage && (
                                    <div className="h-44 overflow-hidden relative bg-slate-950">
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img
                                            src={post.coverImage}
                                            alt={post.title}
                                            className="w-full h-full object-cover group-hover:scale-101 transition-transform duration-500"
                                        />
                                        <span className={`absolute bottom-3 left-3 px-2 py-0.5 text-[10px] font-black rounded backdrop-blur-md border ${post.type === 'MAGAZINE'
                                                ? 'bg-purple-950/80 text-purple-400 border-purple-800/30'
                                                : 'bg-slate-950/80 text-cyan-400 border-slate-800'
                                            }`}>
                                            {post.type}
                                        </span>
                                    </div>
                                )}

                                {/* Text Context */}
                                <div className="p-5 space-y-2">
                                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">{post.category}</span>
                                    <h3 className="text-lg font-bold text-white tracking-tight leading-snug group-hover:text-cyan-400 transition-colors line-clamp-2">
                                        <Link href={`/blogs/${post.slug}`}>{post.title}</Link>
                                    </h3>
                                    <p className="text-slate-400 text-xs line-clamp-3 leading-relaxed">{post.content}</p>
                                </div>
                            </div>

                            {/* Footer Meta Action Bar */}
                            <div className="p-5 pt-0">
                                <div className="pt-3 border-t border-slate-900 flex items-center justify-between text-[11px] text-slate-500">
                                    <span>By: <span className="text-slate-300 font-semibold">{post.author.name}</span></span>

                                    {post.type === 'MAGAZINE' && post.pdfUrl ? (
                                        <a
                                            href={post.pdfUrl}
                                            download
                                            className="px-3 py-1.5 bg-cyan-950 text-cyan-400 border border-cyan-900/40 rounded-lg font-bold hover:bg-cyan-900 transition-colors flex items-center gap-1"
                                        >
                                            📥 PDF Version
                                        </a>
                                    ) : (
                                        <Link href={`/blogs/${post.slug}`} className="text-cyan-400 font-bold hover:underline">
                                            Read Entry →
                                        </Link>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {filteredPublications.length === 0 && (
                    <div className="text-center py-16 border border-dashed border-slate-900 rounded-2xl text-slate-500 text-xs tracking-wide">
                        No public approved material posted under this segment yet.
                    </div>
                )}
            </div>
        </div>
    );
}