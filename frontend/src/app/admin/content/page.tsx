'use client';
import React, { useState } from 'react';
import { mockPosts as initialPosts } from '@/modules/content/mock-posts';
import { BlogPost } from '@/modules/content/types';

interface ExtendedPost extends BlogPost {
  isDeleted?: boolean;
}

export default function AdminContentPage() {
  const [posts, setPosts] = useState<ExtendedPost[]>(initialPosts);
  const [activeFilter, setActiveFilter] = useState<'ALL' | 'BLOG' | 'MAGAZINE' | 'PENDING'>('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  // Selected post for workspace composer
  const [selectedPost, setSelectedPost] = useState<ExtendedPost | null>(null);

  // Editor toggle state: 'MARKDOWN' | 'WYSIWYG'
  const [editorMode, setEditorMode] = useState<'MARKDOWN' | 'WYSIWYG'>('MARKDOWN');

  // Compose State for Left Metadata form & editor
  const [postTitle, setPostTitle] = useState('');
  const [postContent, setPostContent] = useState('');
  const [postType, setPostType] = useState<'NOTICE' | 'BLOG' | 'MAGAZINE'>('BLOG');
  const [postTags, setPostTags] = useState('');
  const [coverImagePath, setCoverImagePath] = useState('');
  const [pdfPath, setPdfPath] = useState('');

  const handleSelectPost = (post: ExtendedPost) => {
    setSelectedPost(post);
    setPostTitle(post.title);
    setPostContent(post.content);
    setPostType(post.type === 'MAGAZINE' ? 'MAGAZINE' : 'BLOG');
    setPostTags(post.category);
    setCoverImagePath(post.coverImage || '');
    setPdfPath(post.pdfUrl || '');
  };

  const handleCreateNewDraft = () => {
    setSelectedPost(null);
    setPostTitle('');
    setPostContent('');
    setPostType('BLOG');
    setPostTags('');
    setCoverImagePath('');
    setPdfPath('');
  };

  const handlePublishSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!postTitle.trim()) return;

    if (selectedPost) {
      // Edit mode
      setPosts(prev =>
        prev.map(p =>
          p.id === selectedPost.id
            ? {
                ...p,
                title: postTitle,
                content: postContent,
                category: postTags,
                coverImage: coverImagePath || undefined,
                pdfUrl: postType === 'MAGAZINE' ? pdfPath : undefined,
                tags: postTags ? postTags.split(',').map(t => t.trim()) : [],
                updatedAt: new Date().toISOString()
              }
            : p
        )
      );
    } else {
      // Create mode
      const newId = `post-${Date.now()}`;
      const newPost: ExtendedPost = {
        id: newId,
        title: postTitle,
        content: postContent,
        type: postType === 'MAGAZINE' ? 'MAGAZINE' : 'BLOG',
        category: postTags || 'Campus',
        coverImage: coverImagePath || 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800',
        pdfUrl: postType === 'MAGAZINE' ? pdfPath : undefined,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        status: 'APPROVED',
        slug: postTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        tags: postTags ? postTags.split(',').map(t => t.trim()) : [],
        author: {
          name: 'Sajid Al Hasan',
          role: 'SUPER_ADMIN'
        }
      };
      setPosts(prev => [newPost, ...prev]);
    }

    handleCreateNewDraft();
  };

  // Soft Delete Mindset Implementation
  const handleSoftDelete = (id: string) => {
    setPosts(prev =>
      prev.map(p => (p.id === id ? { ...p, isDeleted: true } : p))
    );
    if (selectedPost && selectedPost.id === id) {
      handleCreateNewDraft();
    }
  };

  const handleRestorePost = (id: string) => {
    setPosts(prev =>
      prev.map(p => (p.id === id ? { ...p, isDeleted: false } : p))
    );
  };

  // WYSIWYG text modification simulator toolbar helper
  const handleAppendStyle = (tag: 'B' | 'I' | 'H1' | 'H2' | 'UL') => {
    let styleStr = '';
    switch (tag) {
      case 'B':
        styleStr = '**bold text**';
        break;
      case 'I':
        styleStr = '*italic text*';
        break;
      case 'H1':
        styleStr = '\n# Heading 1\n';
        break;
      case 'H2':
        styleStr = '\n## Heading 2\n';
        break;
      case 'UL':
        styleStr = '\n- Item 1\n- Item 2\n';
        break;
    }
    setPostContent(prev => prev + styleStr);
  };

  const filtered = posts.filter(p => {
    const matchesFilter = activeFilter === 'ALL' ||
      (activeFilter === 'BLOG' && p.type !== 'MAGAZINE') ||
      (activeFilter === 'MAGAZINE' && p.type === 'MAGAZINE') ||
      (activeFilter === 'PENDING' && p.status === 'PENDING');
    const matchesQuery = p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.content.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesQuery;
  });

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="border-b border-slate-900 pb-5">
        <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-white">
          Content Composition Workspace
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Draft official notices, compose student blog posts, publish magazine catalogs, and recover soft-deleted files.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-12 items-start">
        {/* Left Side: Metadata Form & Editor */}
        <div className="lg:col-span-8 space-y-6">
          <form onSubmit={handlePublishSubmit} className="bg-slate-900/30 border border-slate-900 rounded-2xl p-6 space-y-6">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <h2 className="text-sm font-black text-white uppercase tracking-wider">
                {selectedPost ? `Editing Article: ${selectedPost.title}` : 'Compose Article'}
              </h2>
              <button
                type="button"
                onClick={handleCreateNewDraft}
                className="text-xs text-cyan-400 hover:underline font-bold"
              >
                Clear Workspace & New Draft
              </button>
            </div>

            {selectedPost && selectedPost.status === 'PENDING' && (
              <div className="p-4 bg-amber-950/40 border border-amber-500/20 rounded-xl flex items-center justify-between gap-4">
                <div className="space-y-1">
                  <span className="px-2 py-0.5 bg-amber-950 border border-amber-900 rounded text-[9px] font-black text-amber-400">PENDING REVIEW</span>
                  <p className="text-[11px] text-slate-300">
                    Submitted by student <span className="font-bold text-white">{selectedPost.author.name}</span>. Review details and approve/reject.
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setPosts(prev => prev.map(p => p.id === selectedPost.id ? { ...p, status: 'APPROVED' } : p));
                      setSelectedPost(prev => prev ? { ...prev, status: 'APPROVED' } : null);
                    }}
                    className="px-3 py-1.5 bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-black rounded-lg text-[10px] uppercase transition-colors"
                  >
                    Approve
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setPosts(prev => prev.map(p => p.id === selectedPost.id ? { ...p, status: 'REJECTED' } : p));
                      setSelectedPost(prev => prev ? { ...prev, status: 'REJECTED' } : null);
                    }}
                    className="px-3 py-1.5 bg-slate-900 border border-red-900/30 text-red-400 hover:bg-red-950 font-black rounded-lg text-[10px] uppercase transition-colors"
                  >
                    Reject
                  </button>
                </div>
              </div>
            )}

            {/* Metadata Fields */}
            <div className="grid gap-4 sm:grid-cols-2 text-xs">
              <div className="space-y-1">
                <label className="font-bold text-slate-300">Header Title</label>
                <input
                  type="text"
                  required
                  placeholder="Enter header..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-100 placeholder-slate-600 focus:outline-none focus:border-cyan-500"
                  value={postTitle}
                  onChange={e => setPostTitle(e.target.value)}
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-300">Tags / Category</label>
                <input
                  type="text"
                  placeholder="e.g. Advocacy, Campus Life..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-100 placeholder-slate-600 focus:outline-none focus:border-cyan-500"
                  value={postTags}
                  onChange={e => setPostTags(e.target.value)}
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-300">Cover Image URL</label>
                <input
                  type="text"
                  placeholder="e.g. /images/cover.jpg..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-100 placeholder-slate-600 focus:outline-none focus:border-cyan-500"
                  value={coverImagePath}
                  onChange={e => setCoverImagePath(e.target.value)}
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-300">Category Type</label>
                <select
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-100 focus:outline-none focus:border-cyan-500"
                  value={postType}
                  onChange={e => setPostType(e.target.value as 'NOTICE' | 'BLOG' | 'MAGAZINE')}
                >
                  <option value="BLOG">BLOG</option>
                  <option value="NOTICE">NOTICE</option>
                  <option value="MAGAZINE">MAGAZINE</option>
                </select>
              </div>
            </div>

            {/* Conditionally Expose PDF Attachment Upload Zone for Magazine */}
            {postType === 'MAGAZINE' && (
              <div className="p-4 bg-slate-950 border border-purple-950/20 rounded-xl space-y-2 text-xs">
                <div className="flex items-center gap-2 text-purple-400 font-bold">
                  <span>📖</span>
                  <span>Magazine Catalog Files Upload Zone</span>
                </div>
                <div className="space-y-1">
                  <label className="text-slate-400">PDF Document Attachment Path</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. /docs/magazines/fall_2026.pdf..."
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-slate-100 placeholder-slate-600 focus:outline-none focus:border-purple-500 font-mono"
                    value={pdfPath}
                    onChange={e => setPdfPath(e.target.value)}
                  />
                </div>
              </div>
            )}

            {/* The Hybrid Editor Toggle Switched Container */}
            <div className="space-y-3">
              <div className="flex items-center justify-between bg-slate-950 border border-slate-800 p-2.5 rounded-xl">
                <span className="text-xs font-bold text-slate-300">Writing Mode Container</span>
                <div className="flex bg-slate-900 rounded-lg p-0.5 border border-slate-800">
                  <button
                    type="button"
                    onClick={() => setEditorMode('MARKDOWN')}
                    className={`px-3 py-1.5 text-[10px] font-bold rounded-md transition-all ${
                      editorMode === 'MARKDOWN'
                        ? 'bg-cyan-400 text-slate-950'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Raw Markdown
                  </button>
                  <button
                    type="button"
                    onClick={() => setEditorMode('WYSIWYG')}
                    className={`px-3 py-1.5 text-[10px] font-bold rounded-md transition-all ${
                      editorMode === 'WYSIWYG'
                        ? 'bg-cyan-400 text-slate-950'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    WYSIWYG Editor
                  </button>
                </div>
              </div>

              {/* Editor Workspace Panel */}
              {editorMode === 'MARKDOWN' ? (
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Monospace Markdown Area</label>
                  <textarea
                    rows={8}
                    required
                    placeholder="# Enter raw markdown headings, links, paragraphs..."
                    className="w-full bg-slate-950 border border-slate-850 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-500 font-mono leading-relaxed"
                    value={postContent}
                    onChange={e => setPostContent(e.target.value)}
                  />
                </div>
              ) : (
                <div className="space-y-2 border border-slate-800 rounded-xl p-3 bg-slate-950/60">
                  {/* WYSIWYG Toolbar */}
                  <div className="flex flex-wrap gap-1 bg-slate-950 border border-slate-850 p-1.5 rounded-lg text-[10px] font-bold">
                    <button type="button" onClick={() => handleAppendStyle('H1')} className="px-2 py-1 bg-slate-900 hover:bg-slate-850 rounded text-slate-300">H1</button>
                    <button type="button" onClick={() => handleAppendStyle('H2')} className="px-2 py-1 bg-slate-900 hover:bg-slate-850 rounded text-slate-300">H2</button>
                    <button type="button" onClick={() => handleAppendStyle('B')} className="px-2 py-1 bg-slate-900 hover:bg-slate-850 rounded text-slate-300 font-black">Bold</button>
                    <button type="button" onClick={() => handleAppendStyle('I')} className="px-2 py-1 bg-slate-900 hover:bg-slate-850 rounded text-slate-300 italic">Italic</button>
                    <button type="button" onClick={() => handleAppendStyle('UL')} className="px-2 py-1 bg-slate-900 hover:bg-slate-850 rounded text-slate-300">Bullet List</button>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Visual Composition</label>
                    <textarea
                      rows={7}
                      required
                      placeholder="Write formatted article body..."
                      className="w-full bg-slate-950 border border-slate-850 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-500 leading-relaxed"
                      value={postContent}
                      onChange={e => setPostContent(e.target.value)}
                    />
                  </div>
                </div>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-2.5 bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-black rounded-xl text-xs transition-colors"
            >
              {selectedPost ? 'Publish & Save Changes' : 'Publish Composition'}
            </button>
          </form>
        </div>

        {/* Right Side: List & Recovery Vault */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-slate-900/30 border border-slate-900 rounded-2xl p-5 space-y-4">
            <h2 className="text-sm font-black text-white uppercase tracking-wider border-b border-slate-800 pb-2">
              Composition Vault
            </h2>

            <div className="relative">
              <input
                type="text"
                placeholder="Search vault..."
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-1.5 pl-8 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
              />
              <span className="absolute left-2.5 top-2 text-slate-500 text-xs">🔍</span>
            </div>

            <div className="flex gap-2">
              {(['ALL', 'BLOG', 'MAGAZINE', 'PENDING'] as const).map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveFilter(tab)}
                  className={`px-3 py-1 rounded-lg border text-[10px] font-bold transition-all ${
                    activeFilter === tab
                      ? 'bg-cyan-950 text-cyan-400 border-cyan-500/20'
                      : 'bg-slate-900/40 text-slate-400 border-slate-900'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            <div className="space-y-3 max-h-[45vh] overflow-y-auto pr-1">
              {filtered.map(post => (
                <div
                  key={post.id}
                  onClick={() => handleSelectPost(post)}
                  className={`bg-slate-950/60 border border-slate-900 p-3 rounded-xl hover:border-slate-850 transition-all cursor-pointer flex items-center justify-between gap-3 ${
                    post.isDeleted ? 'opacity-40 line-through bg-slate-950/40' : ''
                  }`}
                >
                  <div className="min-w-0 flex-1 space-y-1 text-xs">
                    <h4 className="font-bold text-white truncate">{post.title}</h4>
                    <p className="text-[10px] text-slate-500 truncate">{post.category} • {post.type || 'BLOG'}</p>
                  </div>

                  <div className="flex gap-1">
                    {post.isDeleted ? (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRestorePost(post.id);
                        }}
                        className="px-2 py-1 bg-emerald-950/40 text-emerald-400 border border-emerald-900/30 hover:bg-emerald-900 font-bold rounded text-[10px]"
                      >
                        Restore
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleSoftDelete(post.id);
                        }}
                        className="px-2 py-1 bg-red-950/40 text-red-400 border border-red-900/30 hover:bg-red-900 font-bold rounded text-[10px]"
                      >
                        Delete
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
