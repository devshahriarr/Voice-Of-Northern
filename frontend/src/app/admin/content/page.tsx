'use client';
import React, { useState } from 'react';
import { mockPosts as initialPosts } from '@/modules/content/mock-posts';
import { BlogPost } from '@/modules/content/types';

export default function AdminContentPage() {
    const [posts, setPosts] = useState<BlogPost[]>(initialPosts);
    const [activeFilter, setActiveFilter] = useState<'ALL' | 'BLOG' | 'MAGAZINE'>('ALL');
    const [statusFilter, setStatusFilter] = useState<BlogPost['status'] | 'ALL'>('ALL');
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

    const handleStatusUpdate = (id: string, nextStatus: BlogPost['status']) => {
        setPosts(prev =>
            prev.map(p => (p.id === id ? { ...p, status: nextStatus, updatedAt: new Date().toISOString() } : p))
        );
        if (selectedPost && selectedPost.id === id) {
            setSelectedPost(prev => prev ? { ...prev, status: nextStatus, updatedAt: new Date().toISOString() } : null);
        }
    };

    const handleSaveContent = (id: string, newTitle: string, newContent: string) => {
        setPosts(prev =>
            prev.map(p => (p.id === id ? { ...p, title: newTitle, content: newContent, updatedAt: new Date().toISOString() } : p))
        );
        if (selectedPost && selectedPost.id === id) {
            setSelectedPost(prev => prev ? { ...prev, title: newTitle, content: newContent, updatedAt: new Date().toISOString() } : null);
        }
    };

    const filtered = posts.filter(p => {
        const matchesType = activeFilter === 'ALL' || p.type === activeFilter;
        const matchesStatus = statusFilter === 'ALL' || p.status === statusFilter;
        const matchesQuery = p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            p.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
            p.author.name.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesType && matchesStatus && matchesQuery;
    });

    return (
        <div className="space-y-6 max-w-7xl mx-auto">
            {/* Header */}
            <div className="border-b border-slate-900 pb-5">
                <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-white">
                    Content & Publications Workspace
                </h1>
                <p className="text-xs text-slate-400 mt-1">
                    Moderate blog submissions, manage official magazines, edit articles, and review publication status.
                </p>
            </div>

            {/* Filter toolbar */}
            <div className="bg-slate-900/20 border border-slate-900 rounded-2xl p-4 flex flex-col md:flex-row gap-4 items-center justify-between">
                <div className="flex bg-slate-950 p-1 rounded-xl border border-slate-900 w-full md:w-auto">
                    {(['ALL', 'BLOG', 'MAGAZINE'] as const).map(tab => (
                        <button
                            key={tab}
                            onClick={() => setActiveFilter(tab)}
                            className={`flex-1 md:flex-initial px-4 py-2 text-xs font-bold rounded-lg transition-all ${
                                activeFilter === tab
                                    ? 'bg-cyan-400 text-slate-950 shadow-md shadow-cyan-400/10'
                                    : 'text-slate-400 hover:text-slate-200'
                            }`}
                        >
                            {tab === 'ALL' ? 'All Reads' : tab + 'S'}
                        </button>
                    ))}
                </div>

                <div className="flex gap-3 w-full md:w-auto">
                    <select
                        className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-300 focus:outline-none focus:border-cyan-500 transition-colors w-full md:w-auto"
                        value={statusFilter}
                        onChange={e => setStatusFilter(e.target.value as BlogPost['status'] | 'ALL')}
                    >
                        <option value="ALL">All Statuses</option>
                        <option value="APPROVED">Approved</option>
                        <option value="PENDING">Pending</option>
                        <option value="REJECTED">Rejected</option>
                        <option value="DRAFT">Draft</option>
                    </select>

                    <div className="relative w-full md:max-w-xs">
                        <input
                            type="text"
                            placeholder="Search articles..."
                            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 pl-9 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
                            value={searchQuery}
                            onChange={e => setSearchQuery(e.target.value)}
                        />
                        <span className="absolute left-3 top-2.5 text-slate-500 text-xs">🔍</span>
                    </div>
                </div>
            </div>

            {/* Content List */}
            <div className="grid gap-4 lg:grid-cols-2">
                {filtered.map(post => (
                    <div
                        key={post.id}
                        onClick={() => setSelectedPost(post)}
                        className={`bg-slate-900/30 border border-slate-900 rounded-2xl p-5 hover:border-slate-800 transition-all cursor-pointer flex flex-col justify-between space-y-4 ${
                            selectedPost?.id === post.id ? 'ring-1 ring-cyan-500/50 border-cyan-500/30' : ''
                        }`}
                    >
                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <span className={`px-2 py-0.5 text-[9px] font-black rounded border ${
                                    post.type === 'MAGAZINE' ? 'bg-purple-500/10 text-purple-400 border-purple-800/20' : 'bg-slate-800 text-slate-400 border-slate-700'
                                }`}>
                                    {post.type}
                                </span>
                                <span className={`px-2 py-0.5 text-[9px] font-black rounded border ${
                                    post.status === 'APPROVED' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' :
                                    post.status === 'PENDING' ? 'bg-orange-500/10 text-orange-400 border-orange-500/20' :
                                    'bg-slate-800 text-slate-400 border-slate-700'
                                }`}>
                                    {post.status}
                                </span>
                            </div>
                            <h3 className="text-sm font-bold text-white leading-tight line-clamp-1">{post.title}</h3>
                            <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">{post.content}</p>
                        </div>

                        <div className="pt-3 border-t border-slate-900/60 flex items-center justify-between text-[10px] text-slate-500">
                            <span>Author: <span className="font-bold text-slate-400">{post.author.name}</span></span>
                            <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                        </div>
                    </div>
                ))}

                {filtered.length === 0 && (
                    <div className="col-span-full py-12 text-center border border-dashed border-slate-900 rounded-2xl text-slate-500 text-xs">
                        No articles match the active search.
                    </div>
                )}
            </div>

            {/* Content editor & moderation detail panel */}
            {selectedPost && (
                <div className="bg-slate-900/20 border border-slate-900 rounded-2xl p-6 space-y-6">
                    <div className="flex justify-between items-center border-b border-slate-900 pb-4">
                        <div>
                            <span className="text-[10px] font-bold text-cyan-400">Content Moderation Panel</span>
                            <h3 className="text-sm font-black text-white mt-0.5">Edit & Transition: {selectedPost.title}</h3>
                        </div>
                        <button onClick={() => setSelectedPost(null)} className="text-xs text-slate-500 hover:text-slate-300 font-bold">
                            Close
                        </button>
                    </div>

                    <div className="space-y-4">
                        <div className="space-y-1">
                            <label className="text-[10px] font-bold text-slate-400 uppercase">Article Title</label>
                            <input
                                type="text"
                                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
                                value={selectedPost.title}
                                onChange={e => handleSaveContent(selectedPost.id, e.target.value, selectedPost.content)}
                            />
                        </div>

                        <div className="space-y-1">
                            <label className="text-[10px] font-bold text-slate-400 uppercase">Article Body Content</label>
                            <textarea
                                rows={6}
                                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500 leading-relaxed"
                                value={selectedPost.content}
                                onChange={e => handleSaveContent(selectedPost.id, selectedPost.title, e.target.value)}
                            />
                        </div>

                        <div className="flex flex-wrap gap-3 pt-2 text-xs">
                            <button
                                onClick={() => handleStatusUpdate(selectedPost.id, 'APPROVED')}
                                className="px-4 py-2 bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold rounded-xl"
                            >
                                Approve publication
                            </button>
                            <button
                                onClick={() => handleStatusUpdate(selectedPost.id, 'PENDING')}
                                className="px-4 py-2 bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-200 font-bold rounded-xl"
                            >
                                Set to Pending
                            </button>
                            <button
                                onClick={() => handleStatusUpdate(selectedPost.id, 'REJECTED')}
                                className="px-4 py-2 bg-red-950/40 border border-red-900/30 hover:bg-red-900 text-red-200 font-bold rounded-xl"
                            >
                                Reject / Flag
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
