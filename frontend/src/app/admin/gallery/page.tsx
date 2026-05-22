'use client';

import React, { useState } from 'react';
import { mockGalleryItems, GalleryItem } from '@/modules/gallery/mock-gallery';
import FileUpload from '@/components/ui/file-upload';
import { sanitizeString } from '@/modules/validation/schemas';

export default function AdminGalleryManagementPage() {
  const [gallery, setGallery] = useState<GalleryItem[]>(mockGalleryItems);

  // Form compose state
  const [title, setTitle] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [category, setCategory] = useState<'CAMPAIGN' | 'PROTEST' | 'SEMINAR' | 'COMMUNITY'>('COMMUNITY');
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleAddPhoto = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !imageUrl.trim()) return;

    setIsSubmitting(true);

    const freshItem: GalleryItem = {
      id: `gal-${Date.now()}`,
      title: sanitizeString(title),
      imageUrl,
      category,
      description: sanitizeString(description),
      uploadedAt: new Date().toISOString()
    };

    // Prepend to static registry
    mockGalleryItems.unshift(freshItem);

    setTimeout(() => {
      setGallery([freshItem, ...gallery]);
      setIsSubmitting(false);
      setTitle('');
      setImageUrl('');
      setDescription('');
    }, 700);
  };

  const handleDeletePhoto = (id: string) => {
    setGallery(prev => prev.filter(item => item.id !== id));
    // Also remove from static mock array
    const idx = mockGalleryItems.findIndex(i => i.id === id);
    if (idx !== -1) mockGalleryItems.splice(idx, 1);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto animate-fade-in font-sans">
      
      {/* Header */}
      <div className="border-b border-slate-900 pb-5">
        <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-white">
          Gallery Assets Control Center
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Upload new media snapshots to the public website, organize albums by category, and delete redundant folders.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-12 items-start">
        
        {/* Left Side: Upload Form */}
        <div className="lg:col-span-4 bg-slate-900/30 border border-slate-900 rounded-3xl p-5 space-y-4">
          <h2 className="text-sm font-black text-white uppercase tracking-wider border-b border-slate-850 pb-2">
            Upload Image Asset
          </h2>

          <form onSubmit={handleAddPhoto} className="space-y-4 text-xs">
            <div className="space-y-1">
              <label className="font-bold text-slate-350">Asset Title</label>
              <input
                type="text"
                required
                placeholder="e.g. Student general assembly..."
                className="w-full bg-slate-950 border border-slate-850 rounded-xl px-3.5 py-2.5 text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500 transition-colors"
                value={title}
                onChange={e => setTitle(e.target.value)}
              />
            </div>

            {/* Reusable FileUpload widget */}
            <div className="space-y-1">
              <FileUpload
                accept="image/*"
                maxSizeMB={5}
                label="Direct Image Upload"
                onUploadSuccess={url => setImageUrl(url)}
              />
            </div>

            <div className="space-y-1">
              <label className="font-bold text-slate-350">Album Classification</label>
              <select
                className="w-full bg-slate-950 border border-slate-850 rounded-xl px-3 py-2 text-slate-350 focus:outline-none"
                value={category}
                onChange={e => setCategory(e.target.value as any)}
              >
                <option value="COMMUNITY">COMMUNITY ASSEMBLY</option>
                <option value="CAMPAIGN">CAMPAIGN FLYERS</option>
                <option value="PROTEST">PROTEST RALLIES</option>
                <option value="SEMINAR">EDUCATIONAL SEMINARS</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="font-bold text-slate-350">Detailed Caption</label>
              <textarea
                rows={3}
                placeholder="Brief caption describing the event details..."
                className="w-full bg-slate-950 border border-slate-850 rounded-xl p-3 text-white placeholder-slate-650 focus:outline-none leading-relaxed font-sans"
                value={description}
                onChange={e => setDescription(e.target.value)}
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-2.5 bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-black rounded-xl uppercase tracking-wider text-[10px] transition-colors"
            >
              {isSubmitting ? 'Uploading Asset...' : 'Upload to Gallery'}
            </button>
          </form>
        </div>

        {/* Right Side: Media Asset List */}
        <div className="lg:col-span-8 bg-slate-900/10 border border-slate-900 rounded-3xl p-5 space-y-4">
          <h2 className="text-sm font-black text-white uppercase tracking-wider border-b border-slate-850 pb-2">
            Platform Media Library
          </h2>

          <div className="grid gap-4 sm:grid-cols-2">
            {gallery.map(item => (
              <div
                key={item.id}
                className="bg-slate-950 border border-slate-900 rounded-2xl overflow-hidden flex flex-col justify-between"
              >
                <div className="relative aspect-[16/10] bg-slate-900">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={item.imageUrl} alt="" className="w-full h-full object-cover" />
                  <span className="absolute top-2.5 left-2.5 px-2 py-0.5 text-[8px] font-black uppercase bg-slate-950 border border-slate-800 text-cyan-400 rounded">
                    {item.category}
                  </span>
                </div>

                <div className="p-3.5 space-y-1.5 flex-1 flex flex-col justify-between">
                  <div className="space-y-1">
                    <h4 className="text-xs font-bold text-white leading-snug line-clamp-1">{item.title}</h4>
                    <p className="text-[10px] text-slate-500 line-clamp-2 leading-relaxed">{item.description}</p>
                  </div>

                  <div className="flex justify-between items-center pt-2.5 border-t border-slate-900/65 mt-2 text-[10px]">
                    <span className="text-slate-500 font-mono">
                      {new Date(item.uploadedAt).toLocaleDateString()}
                    </span>
                    <button
                      onClick={() => handleDeletePhoto(item.id)}
                      className="px-2.5 py-1 bg-red-950/40 border border-red-900/30 hover:bg-red-950 text-red-400 font-bold rounded text-[9px] uppercase transition-colors"
                    >
                      Delete Asset
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {gallery.length === 0 && (
            <div className="py-12 text-center text-slate-500 text-xs">
              No media assets reside in the gallery registry.
            </div>
          )}
        </div>

      </div>

    </div>
  );
}
