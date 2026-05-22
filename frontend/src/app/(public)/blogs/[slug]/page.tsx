'use client';
import React, { use } from 'react';
import { mockPosts } from '@/modules/content/mock-posts';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import InteractionSection from '@/components/ui/interaction-section';

export default function PublicSinglePostReaderPage({ params }: { params: Promise<{ slug: string }> }) {
  // Resolve async routing parameters cleanly
  const resolvedParams = use(params);
  const slug = resolvedParams.slug;
  const post = mockPosts.find(p => p.slug === slug);

  if (!post || post.status !== 'APPROVED') notFound();

  // Sidebar logic: filter recent and similar posts
  const recentPosts = mockPosts
    .filter(p => p.id !== post.id && p.status === 'APPROVED')
    .slice(0, 3);

  const similarPosts = mockPosts
    .filter(p => p.id !== post.id && p.status === 'APPROVED' && (p.category === post.category || p.type === post.type))
    .slice(0, 3);

  const shareUrl = typeof window !== 'undefined'
    ? `${window.location.origin}/blogs/${post.slug}`
    : `https://voiceofnorthern.org/blogs/${post.slug}`;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 px-4 md:px-8 py-16">
      <div className="max-w-7xl mx-auto grid gap-8 lg:grid-cols-12 animate-fade-in">
        
        {/* Main Content Pane */}
        <article className="lg:col-span-8 space-y-6">
          {/* Back navigation */}
          <Link href="/blogs" className="text-xs text-slate-500 hover:text-cyan-400 transition-colors font-medium">
            ← Back to Publications
          </Link>

          {/* Article Header */}
          <header className="space-y-3 pt-2">
            <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
              <span className="text-cyan-400 font-bold tracking-wider uppercase">{post.type}</span>
              <span>•</span>
              <span>{new Date(post.createdAt).toLocaleDateString()}</span>
              <span>•</span>
              <span className="bg-slate-900 px-2 py-0.5 rounded text-slate-400">{post.category}</span>
            </div>
            
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tight text-white leading-tight">
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

          {/* Cover image */}
          {post.coverImage && (
            <div className="w-full h-64 sm:h-96 bg-slate-950 rounded-2xl overflow-hidden border border-slate-900">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={post.coverImage} alt={post.title} className="w-full h-full object-cover" />
            </div>
          )}

          {/* Article Body */}
          <div className="text-slate-350 text-xs sm:text-sm md:text-base leading-relaxed whitespace-pre-wrap pt-2 font-sans space-y-4">
            {post.content}
          </div>

          {/* Magazine Handbook attachment */}
          {post.type === 'MAGAZINE' && post.pdfUrl && (
            <div className="p-6 bg-cyan-950/10 border border-cyan-900/30 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-0.5">
                <h4 className="text-sm font-bold text-white">Download Offline Handbook Portfolio</h4>
                <p className="text-xs text-slate-400">This official magazine is compiled into an integrated high-definition PDF.</p>
              </div>
              <a
                href={post.pdfUrl}
                download
                className="px-5 py-2.5 bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-black text-xs rounded-xl text-center transition-colors"
              >
                📥 Download PDF
              </a>
            </div>
          )}

          {/* Tag row */}
          {post.tags.length > 0 && (
            <div className="pt-4 flex flex-wrap gap-1.5">
              {post.tags.map(tag => (
                <span key={tag} className="text-[10px] font-mono text-slate-500 bg-slate-900/60 px-2.5 py-1 rounded-md">
                  #{tag}
                </span>
              ))}
            </div>
          )}

          {/* Unified Interaction Layer (Likes, comments, shares, replies) */}
          <InteractionSection
            itemId={post.id}
            initialLikes={post.likes ?? 12}
            shareUrl={shareUrl}
            shareTitle={post.title}
            categoryLabel="Publication"
          />

        </article>

        {/* Sidebar Info Pane */}
        <aside className="lg:col-span-4 space-y-8">
          
          {/* Similar Publications */}
          <div className="bg-slate-900/30 border border-slate-900 p-5 rounded-2xl space-y-4">
            <h3 className="text-xs font-black text-white uppercase tracking-widest border-b border-slate-850 pb-2">
              Similar Category Publications
            </h3>
            
            <div className="space-y-3.5">
              {similarPosts.map(p => (
                <Link
                  key={p.id}
                  href={`/blogs/${p.slug}`}
                  className="block group space-y-1.5"
                >
                  <span className="text-[9px] font-bold text-cyan-400 uppercase tracking-widest">
                    {p.category}
                  </span>
                  <h4 className="text-xs font-bold text-slate-200 group-hover:text-cyan-400 transition-colors line-clamp-2 leading-snug">
                    {p.title}
                  </h4>
                  <p className="text-[10px] text-slate-500 font-mono">
                    {new Date(p.createdAt).toLocaleDateString()}
                  </p>
                </Link>
              ))}

              {similarPosts.length === 0 && (
                <div className="text-[11px] text-slate-500 py-2">
                  No similar blogs found.
                </div>
              )}
            </div>
          </div>

          {/* Recent Publications */}
          <div className="bg-slate-900/30 border border-slate-900 p-5 rounded-2xl space-y-4">
            <h3 className="text-xs font-black text-white uppercase tracking-widest border-b border-slate-850 pb-2">
              Recent Publications
            </h3>

            <div className="space-y-3.5">
              {recentPosts.map(p => (
                <Link
                  key={p.id}
                  href={`/blogs/${p.slug}`}
                  className="block group space-y-1.5"
                >
                  <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">
                    {p.type}
                  </span>
                  <h4 className="text-xs font-bold text-slate-200 group-hover:text-cyan-400 transition-colors line-clamp-2 leading-snug">
                    {p.title}
                  </h4>
                  <p className="text-[10px] text-slate-500 font-mono">
                    {new Date(p.createdAt).toLocaleDateString()}
                  </p>
                </Link>
              ))}
            </div>
          </div>

        </aside>

      </div>
    </div>
  );
}