'use client';
import React, { useState } from 'react';
import { mockPosts } from '@/modules/content/mock-posts';
import { notFound } from 'next/navigation';
import Link from 'next/link';

interface CommentItem {
  id: string;
  author: string;
  role: string;
  content: string;
  timestamp: string;
  replies?: CommentItem[];
}

export default function PublicSinglePostReaderPage({ params }: { params: { slug: string } }) {
  // Resolve params using React.use() wrapper if Next.js async params apply
  const resolvedParams = React.use(params as any) as any;
  const slug = resolvedParams.slug;
  const post = mockPosts.find(p => p.slug === slug);

  if (!post || post.status !== 'APPROVED') notFound();

  // Likes Interaction
  const [likes, setLikes] = useState(12);
  const [hasLiked, setHasLiked] = useState(false);

  const handleLikeToggle = () => {
    if (hasLiked) {
      setLikes(prev => prev - 1);
    } else {
      setLikes(prev => prev + 1);
    }
    setHasLiked(!hasLiked);
  };

  // Share tooltip
  const [copied, setCopied] = useState(false);
  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Comments & Replies State
  const [comments, setComments] = useState<CommentItem[]>([
    {
      id: 'c-1',
      author: 'Rahat Chowdhury',
      role: 'Student Representative',
      content: 'Absolutely agree with the resource allocation demand. Our computer labs have been running with outdated CPUs for three semesters now, despite the semester fee increases.',
      timestamp: '2026-05-21T11:00:00.000Z',
      replies: [
        {
          id: 'c-2',
          author: 'Sajid Al Hasan',
          role: 'SUPER_ADMIN',
          content: 'We are currently scheduling a discussion with the CSE Department head to present these exact specs. Stay tuned.',
          timestamp: '2026-05-21T12:30:00.000Z'
        }
      ]
    }
  ]);

  const [newCommentText, setNewCommentText] = useState('');
  const [replyingToId, setReplyingToId] = useState<string | null>(null);
  const [replyText, setReplyText] = useState('');

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCommentText.trim()) return;

    const freshComment: CommentItem = {
      id: `comm-${Date.now()}`,
      author: 'Current Student',
      role: 'Member',
      content: newCommentText,
      timestamp: new Date().toISOString(),
      replies: []
    };

    setComments(prev => [...prev, freshComment]);
    setNewCommentText('');
  };

  const handleAddReply = (commentId: string) => {
    if (!replyText.trim()) return;

    const freshReply: CommentItem = {
      id: `rep-${Date.now()}`,
      author: 'Current Student',
      role: 'Member',
      content: replyText,
      timestamp: new Date().toISOString()
    };

    setComments(prev =>
      prev.map(c => {
        if (c.id === commentId) {
          return { ...c, replies: [...(c.replies || []), freshReply] };
        }
        return c;
      })
    );

    setReplyText('');
    setReplyingToId(null);
  };

  // Sidebar logic: filter posts
  const recentPosts = mockPosts
    .filter(p => p.id !== post.id && p.status === 'APPROVED')
    .slice(0, 3);

  const similarPosts = mockPosts
    .filter(p => p.id !== post.id && p.status === 'APPROVED' && (p.category === post.category || p.type === post.type))
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 px-4 md:px-8 py-16">
      <div className="max-w-7xl mx-auto grid gap-8 lg:grid-cols-12">
        
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

          {/* Interaction Bar */}
          <div className="flex items-center gap-6 py-3 border-t border-b border-slate-900">
            <button
              onClick={handleLikeToggle}
              className={`flex items-center gap-2 text-xs font-bold transition-all ${
                hasLiked ? 'text-rose-400' : 'text-slate-400 hover:text-rose-400'
              }`}
            >
              <span className="text-sm">{hasLiked ? '❤️' : '🤍'}</span>
              <span>{likes} Likes</span>
            </button>

            <button
              onClick={handleShare}
              className="flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-cyan-400 transition-all relative"
            >
              <span>🔗</span>
              <span>{copied ? 'Link Copied!' : 'Share'}</span>
            </button>
          </div>

          {/* Article Body */}
          <div className="text-slate-300 text-sm md:text-base leading-relaxed whitespace-pre-wrap pt-2 font-sans space-y-4">
            {post.content}
          </div>

          {/* Magazine Handbook attachment */}
          {post.type === 'MAGAZINE' && post.pdfUrl && (
            <div className="p-6 bg-cyan-950/10 border border-cyan-900/30 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
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

          {/* Comment Segment */}
          <div className="pt-10 border-t border-slate-900 space-y-6">
            <h3 className="text-base font-bold text-white uppercase tracking-wider">Comments ({comments.length})</h3>
            
            {/* New comment input */}
            <form onSubmit={handleAddComment} className="space-y-3">
              <textarea
                value={newCommentText}
                onChange={e => setNewCommentText(e.target.value)}
                placeholder="Share your perspective on this campus topic..."
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3.5 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500 min-h-[90px] leading-relaxed"
              />
              <button
                type="submit"
                className="px-5 py-2 bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold rounded-xl text-xs transition-colors"
              >
                Post Comment
              </button>
            </form>

            {/* Comments List */}
            <div className="space-y-4">
              {comments.map(c => (
                <div key={c.id} className="p-4 bg-slate-900/20 border border-slate-900 rounded-xl space-y-2.5">
                  <div className="flex justify-between items-center text-[10px]">
                    <div>
                      <span className="font-bold text-white">{c.author}</span>
                      <span className="text-slate-500 ml-2 font-mono uppercase">[{c.role}]</span>
                    </div>
                    <span className="text-slate-500">{new Date(c.timestamp).toLocaleDateString()}</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">{c.content}</p>

                  <div className="flex gap-4">
                    <button
                      onClick={() => setReplyingToId(c.id)}
                      className="text-[10px] text-cyan-400 hover:underline font-bold"
                    >
                      Reply
                    </button>
                  </div>

                  {/* Replies nesting */}
                  {c.replies && c.replies.length > 0 && (
                    <div className="pl-6 border-l border-slate-900 space-y-3 mt-2">
                      {c.replies.map(r => (
                        <div key={r.id} className="p-3 bg-slate-950 rounded-lg space-y-1">
                          <div className="flex justify-between items-center text-[9px]">
                            <div>
                              <span className="font-bold text-slate-200">{r.author}</span>
                              <span className="text-slate-600 ml-1 uppercase">[{r.role}]</span>
                            </div>
                            <span className="text-slate-600">{new Date(r.timestamp).toLocaleDateString()}</span>
                          </div>
                          <p className="text-[11px] text-slate-400 leading-relaxed">{r.content}</p>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Reply Input Form */}
                  {replyingToId === c.id && (
                    <div className="pt-2 pl-6 space-y-2">
                      <input
                        type="text"
                        placeholder="Write reply..."
                        value={replyText}
                        onChange={e => setReplyText(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-slate-100 focus:outline-none focus:border-cyan-500"
                      />
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleAddReply(c.id)}
                          className="px-3 py-1 bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 text-[10px] font-bold rounded"
                        >
                          Submit
                        </button>
                        <button
                          onClick={() => setReplyingToId(null)}
                          className="px-3 py-1 text-slate-500 text-[10px] font-bold hover:underline"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  )}

                </div>
              ))}
            </div>

          </div>
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