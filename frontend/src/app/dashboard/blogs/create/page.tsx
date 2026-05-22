'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { mockPosts } from '@/modules/content/mock-posts';

export default function ComposeBlogDashboardPage() {
  const router = useRouter();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [type, setType] = useState<'BLOG' | 'MAGAZINE'>('BLOG');
  const [category, setCategory] = useState('STUDENT_RIGHTS');
  const [coverImage, setCoverImage] = useState('');
  const [pdfUrl, setPdfUrl] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleComposeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    setIsSubmitting(true);

    const freshPost = {
      id: `post-${Date.now()}`,
      title,
      slug: title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      content,
      type,
      status: 'PENDING' as const,
      category,
      coverImage: coverImage || 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800',
      pdfUrl: type === 'MAGAZINE' ? pdfUrl : undefined,
      author: {
        name: 'Nayeem Chowdhury', // Simulate active logged in student
        role: 'CONTENT_WRITER'
      },
      tags: [category.toLowerCase()],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    // Prepend to static array (simulating persistent state inside mock db)
    mockPosts.unshift(freshPost);

    setTimeout(() => {
      setIsSubmitting(false);
      router.push('/dashboard/blogs');
    }, 800);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      
      {/* Back button */}
      <div>
        <button
          onClick={() => router.back()}
          className="text-xs text-slate-500 hover:text-cyan-400 font-bold transition-colors"
        >
          ← Go Back
        </button>
      </div>

      <div className="border-b border-slate-900 pb-4">
        <h1 className="text-2xl font-extrabold text-white tracking-tight">Compose Publication Draft</h1>
        <p className="text-xs text-slate-400 mt-1">Submit your article to the administrative moderation team for vetting.</p>
      </div>

      <form onSubmit={handleComposeSubmit} className="space-y-4 text-xs">
        
        {/* Title */}
        <div className="space-y-1.5">
          <label className="font-bold text-slate-300">Article Title</label>
          <input
            type="text"
            required
            placeholder="e.g. Demanding Better Dining Hall Ventilation..."
            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-slate-100 placeholder-slate-600 focus:outline-none focus:border-cyan-500"
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
        </div>

        {/* Categories grid */}
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-1.5">
            <label className="font-bold text-slate-300">Publication Type</label>
            <select
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-slate-100 focus:outline-none focus:border-cyan-500"
              value={type}
              onChange={e => setType(e.target.value as 'BLOG' | 'MAGAZINE')}
            >
              <option value="BLOG">BLOG</option>
              <option value="MAGAZINE">MAGAZINE PORTFOLIO</option>
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="font-bold text-slate-300">Topic Segment</label>
            <input
              type="text"
              required
              placeholder="e.g. STUDENT_RIGHTS, ACADEMICS..."
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-slate-100 focus:outline-none"
              value={category}
              onChange={e => setCategory(e.target.value.toUpperCase().replace(/\s+/g, '_'))}
            />
          </div>
        </div>

        {/* Cover image path */}
        <div className="space-y-1.5">
          <label className="font-bold text-slate-300">Cover Image URL (Optional)</label>
          <input
            type="text"
            placeholder="e.g. https://images.unsplash.com/photo..."
            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-slate-100 placeholder-slate-600 focus:outline-none focus:border-cyan-500"
            value={coverImage}
            onChange={e => setCoverImage(e.target.value)}
          />
        </div>

        {/* Conditional PDF URL input */}
        {type === 'MAGAZINE' && (
          <div className="space-y-1.5">
            <label className="font-bold text-slate-300">Attachment PDF URL</label>
            <input
              type="text"
              required
              placeholder="e.g. /docs/magazine_issue_5.pdf..."
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-slate-100 placeholder-slate-600 focus:outline-none focus:border-cyan-500"
              value={pdfUrl}
              onChange={e => setPdfUrl(e.target.value)}
            />
          </div>
        )}

        {/* Content Body */}
        <div className="space-y-1.5">
          <label className="font-bold text-slate-300">Draft Content Body</label>
          <textarea
            required
            rows={8}
            placeholder="Compose your article details here. Focus on facts, campus welfare, and verified reports..."
            className="w-full bg-slate-950 border border-slate-800 rounded-xl p-4 text-slate-100 placeholder-slate-650 focus:outline-none focus:border-cyan-500 leading-relaxed font-sans"
            value={content}
            onChange={e => setContent(e.target.value)}
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-3 bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-black rounded-xl text-center uppercase tracking-wider transition-all"
        >
          {isSubmitting ? 'Submitting Vetting Request...' : 'Submit Draft to Moderation'}
        </button>

      </form>

    </div>
  );
}
