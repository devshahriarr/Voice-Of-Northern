import React from 'react';
import { mockPosts } from '@/modules/content/mock-posts';
import { notFound } from 'next/navigation';
import Link from 'next/link';

export default async function PublicSinglePostReaderPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const post = mockPosts.find(p => p.slug === slug);

    // Guard clause: Block hidden drafts or rejected logs from public routing [cite: 372-374]
    if (!post || post.status !== 'APPROVED') notFound();

    return (
        <div className="min-h-screen bg-slate-950 text-slate-100 px-4 md:px-8 py-16">
            <article className="max-w-3xl mx-auto space-y-6">

                {/* Back navigation wire */}
                <Link href="/blogs" className="text-xs text-slate-500 hover:text-cyan-400 transition-colors font-medium">
                    ← Back to Publications
                </Link>

                {/* Article Header Metadata */}
                <header className="space-y-3 pt-2">
                    <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
                        <span className="text-cyan-400 font-bold tracking-wider uppercase">{post.type}</span>
                        <span>•</span>
                        <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                        <span>•</span>
                        <span className="bg-slate-900 px-2 py-0.5 rounded text-slate-400">{post.category}</span>
                    </div>
                    <h1 className="text-3xl md:text-5xl font-black tracking-tight text-white leading-tight">
                        {post.title}
                    </h1>
                    <div className="flex items-center gap-2 text-xs text-slate-400">
                        <span>Written by:</span>
                        <span className="text-slate-200 font-bold">{post.author.name}</span>
                        <span className="text-[10px] bg-slate-900 text-slate-500 px-1.5 py-0.5 rounded uppercase font-semibold">
                            {post.author.role.replace('_', ' ')}
                        </span>
                    </div>
                </header>

                {/* Big Layout Banner */}
                {post.coverImage && (
                    <div className="w-full h-64 sm:h-96 bg-slate-950 rounded-2xl overflow-hidden border border-slate-900">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={post.coverImage} alt={post.title} className="w-full h-full object-cover" />
                    </div>
                )}

                {/* Content Body Prose rendering simulation [cite: 358-360] */}
                <div className="text-slate-300 text-sm md:text-base leading-relaxed whitespace-pre-wrap pt-6 border-t border-slate-900 font-sans space-y-4">
                    {post.content}
                </div>

                {/* Sub-feature: Magazine Attachment download panel */}
                {post.type === 'MAGAZINE' && post.pdfUrl && (
                    <div className="mt-8 p-6 bg-cyan-950/10 border border-cyan-900/30 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="space-y-0.5">
                            <h4 className="text-sm font-bold text-white">Download Offline Handbook Portfolio</h4>
                            <p className="text-xs text-slate-400">This official magazine is compiled into an integrated high-definition PDF.</p>
                        </div>
                        <a
                            href={post.pdfUrl}
                            download
                            className="px-5 py-2.5 bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-black text-xs rounded-xl text-center shadow-lg shadow-cyan-400/5 transition-colors"
                        >
                            📥 Download Document (PDF)
                        </a>
                    </div>
                )}

                {/* Tags Metadata mapping row [cite: 368-370] */}
                {post.tags.length > 0 && (
                    <div className="pt-6 border-t border-slate-900 flex flex-wrap gap-1.5">
                        {post.tags.map(tag => (
                            <span key={tag} className="text-[10px] font-mono text-slate-500 bg-slate-900/60 px-2.5 py-1 rounded-md">
                                #{tag}
                            </span>
                        ))}
                    </div>
                )}

            </article>
        </div>
    );
}