'use client';

import React, { useState, use } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { mockNotices } from '@/modules/notice/mock-notices';

export default function NoticeDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const notice = mockNotices.find(n => n.id === id);
  const [iframeLoading, setIframeLoading] = useState(true);

  if (!notice) notFound();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 px-4 md:px-8 py-16 animate-fade-in">
      <div className="max-w-4xl mx-auto space-y-6">
        
        {/* Navigation Breadcrumb */}
        <div className="flex justify-between items-center text-xs">
          <Link href="/notices" className="text-slate-500 hover:text-cyan-400 transition-colors font-bold">
            ← Back to Notices Board
          </Link>
          <span className="text-slate-650 font-mono">Bulletin: #{notice.id}</span>
        </div>

        {/* Notice Info Card */}
        <div className="p-6 bg-slate-900/30 border border-slate-900 rounded-3xl space-y-4">
          <div className="flex items-center gap-3">
            <span className={`px-2.5 py-0.5 text-[9px] font-black rounded border ${
              notice.priority === 'URGENT'
                ? 'bg-red-500/10 text-red-400 border-red-500/20'
                : 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20'
            }`}>
              {notice.priority}
            </span>
            <span className="text-slate-500 text-xs font-mono">
              {new Date(notice.publishedAt).toLocaleString()}
            </span>
          </div>

          <h1 className="text-2xl font-black text-white leading-snug uppercase tracking-wide">
            {notice.title}
          </h1>

          <p className="text-slate-350 text-xs sm:text-sm leading-relaxed font-sans whitespace-pre-wrap">
            {notice.content}
          </p>
        </div>

        {/* Responsive PDF Embedded Viewer */}
        {notice.pdfUrl && (
          <div className="p-6 bg-slate-900/20 border border-slate-900 rounded-3xl space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-900 pb-3">
              <div>
                <h3 className="text-xs font-black text-white uppercase tracking-widest">Circular PDF Attachment</h3>
                <p className="text-[10px] text-slate-500 mt-0.5">Read details instantly without forced downloads.</p>
              </div>
              <a
                href={notice.pdfUrl}
                download
                className="px-4 py-2 bg-slate-905 border border-slate-800 hover:bg-slate-900 hover:text-cyan-400 text-slate-300 font-bold text-[10px] uppercase rounded-xl tracking-wider text-center transition-all"
              >
                📥 Download Document
              </a>
            </div>

            {/* Embedded iFrame with Loader wrapper */}
            <div className="relative rounded-2xl overflow-hidden bg-slate-950 border border-slate-850 h-[500px]">
              {iframeLoading && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-950 text-slate-500 text-xs space-y-2">
                  <div className="w-6 h-6 border-2 border-t-cyan-400 border-slate-800 rounded-full animate-spin" />
                  <span>Loading PDF previewer...</span>
                </div>
              )}
              <iframe
                src={`${notice.pdfUrl}#toolbar=0`}
                className="w-full h-full border-none"
                onLoad={() => setIframeLoading(false)}
                title="Circular PDF attachment viewer"
              />
            </div>
            
            <p className="text-[9px] text-slate-600 text-center font-sans">
              If the PDF previewer doesn&apos;t load on your device, use the Download button above to view locally.
            </p>
          </div>
        )}

      </div>
    </div>
  );
}
