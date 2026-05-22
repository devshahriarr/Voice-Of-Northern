'use client';
import React, { useState } from 'react';
import { mockGalleryItems, GalleryItem } from '@/modules/gallery/mock-gallery';

export default function GalleryPage() {
  const [activeFilter, setActiveFilter] = useState<'ALL' | 'CAMPAIGN' | 'PROTEST' | 'SEMINAR' | 'COMMUNITY'>('ALL');
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);

  const filteredItems = activeFilter === 'ALL'
    ? mockGalleryItems
    : mockGalleryItems.filter(item => item.category === activeFilter);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 px-4 md:px-8 py-16">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header Title */}
        <div className="border-b border-slate-900 pb-5">
          <span className="px-3 py-1 text-[10px] font-bold tracking-wider text-cyan-400 bg-cyan-950/40 border border-cyan-900/30 rounded-full uppercase">
            Campus Telemetry Media
          </span>
          <h1 className="text-3xl font-extrabold tracking-tight text-white mt-2">Voice of Northern Gallery</h1>
          <p className="text-xs text-slate-400 mt-1">
            Visual logs of student demonstrations, awareness campaigns, and official assemblies.
          </p>
        </div>

        {/* Filter Navigation */}
        <div className="flex flex-wrap bg-slate-900/60 p-1.5 rounded-xl border border-slate-900 w-fit gap-1">
          {(['ALL', 'CAMPAIGN', 'PROTEST', 'SEMINAR', 'COMMUNITY'] as const).map(filter => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-4 py-2 text-xs font-bold rounded-lg transition-all ${
                activeFilter === filter
                  ? 'bg-cyan-400 text-slate-950 shadow-md shadow-cyan-400/10'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {filter === 'ALL' ? 'All Images' : filter}
            </button>
          ))}
        </div>

        {/* Grid Images */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredItems.map(item => (
            <div
              key={item.id}
              onClick={() => setSelectedItem(item)}
              className="group bg-slate-900/30 border border-slate-900 hover:border-slate-800 rounded-2xl overflow-hidden cursor-pointer transition-all hover:scale-[1.01]"
            >
              <div className="relative aspect-[4/3] bg-slate-950 overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-350"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-60" />
                <span className="absolute bottom-3 left-3 px-2 py-0.5 text-[9px] font-black uppercase bg-slate-950/80 border border-slate-800 text-cyan-400 rounded">
                  {item.category}
                </span>
              </div>
              <div className="p-4 space-y-1">
                <h4 className="text-sm font-bold text-white group-hover:text-cyan-400 transition-colors">
                  {item.title}
                </h4>
                <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                  {item.description}
                </p>
                <div className="text-[10px] text-slate-500 pt-2 font-mono">
                  Uploaded: {new Date(item.uploadedAt).toLocaleDateString()}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Zoom Lightbox Modal */}
        {selectedItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md">
            <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden max-w-3xl w-full shadow-2xl relative">
              <button
                onClick={() => setSelectedItem(null)}
                className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-slate-950/85 hover:bg-slate-950 text-slate-300 hover:text-white border border-slate-800 flex items-center justify-center text-sm font-bold"
              >
                ✕
              </button>

              <div className="aspect-[16/9] w-full bg-slate-950">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={selectedItem.imageUrl}
                  alt={selectedItem.title}
                  className="w-full h-full object-contain"
                />
              </div>

              <div className="p-6 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 text-[10px] font-black bg-cyan-950/40 text-cyan-400 border border-cyan-800/30 rounded uppercase">
                    {selectedItem.category}
                  </span>
                  <span className="text-xs text-slate-500 font-mono">
                    {new Date(selectedItem.uploadedAt).toLocaleDateString()}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-white">{selectedItem.title}</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {selectedItem.description}
                </p>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
