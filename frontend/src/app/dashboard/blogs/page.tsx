'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { mockPosts } from '@/modules/content/mock-posts';

export default function MyBlogsDashboardPage() {
  // Simulate fetching blogs written by the logged-in student (e.g. Nayeem Chowdhury)
  const [blogs, setBlogs] = useState(() => 
    mockPosts.filter(p => p.author.name === 'Nayeem Chowdhury')
  );

  const handleDeleteBlog = (id: string) => {
    setBlogs(prev => prev.filter(b => b.id !== id));
  };

  return (
    <div className="space-y-6">
      
      {/* Title block */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-900 pb-5">
        <div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight">My Publications Workspace</h1>
          <p className="text-xs text-slate-400 mt-1">Compose, manage, and inspect the moderation statuses of your campus articles.</p>
        </div>
        <Link
          href="/dashboard/blogs/create"
          className="px-4 py-2 bg-cyan-400 hover:bg-cyan-300 text-slate-950 text-xs font-black rounded-xl text-center uppercase tracking-wider transition-colors inline-block"
        >
          ✍️ Compose Blog
        </Link>
      </div>

      {/* Publications Ledger Table */}
      <div className="bg-slate-900/10 border border-slate-900 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-900 text-[10px] font-bold text-slate-500 uppercase bg-slate-950/40">
                <th className="p-4">Cover Image</th>
                <th className="p-4">Title & Details</th>
                <th className="p-4">Category</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-900/60 font-sans">
              {blogs.map(blog => (
                <tr key={blog.id} className="hover:bg-slate-900/10 transition-colors">
                  <td className="p-4 w-20">
                    <div className="h-10 w-16 bg-slate-950 border border-slate-800 rounded-lg overflow-hidden shrink-0">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img 
                        src={blog.coverImage || 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=100'} 
                        alt="" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </td>
                  <td className="p-4 font-semibold text-slate-200 max-w-sm">
                    <div className="text-xs font-bold line-clamp-1">{blog.title}</div>
                    <div className="text-[10px] text-slate-500 mt-0.5">Published: {new Date(blog.createdAt).toLocaleDateString()}</div>
                  </td>
                  <td className="p-4 text-slate-400 font-medium">
                    {blog.category}
                  </td>
                  <td className="p-4">
                    <span className={`px-2 py-0.5 text-[9px] font-black rounded border uppercase ${
                      blog.status === 'APPROVED' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' :
                      blog.status === 'REJECTED' ? 'bg-red-500/10 text-red-400 border-red-500/20' :
                      'bg-amber-500/10 text-amber-400 border-amber-500/20'
                    }`}>
                      {blog.status}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <button
                      onClick={() => handleDeleteBlog(blog.id)}
                      className="px-2.5 py-1.5 bg-red-950/40 border border-red-900/30 hover:bg-red-900 text-red-400 font-bold rounded-lg text-[10px] transition-colors"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {blogs.length === 0 && (
          <div className="py-16 text-center text-slate-500 text-xs">
            You have not submitted any blogs to the moderation queue yet.
          </div>
        )}
      </div>

    </div>
  );
}
