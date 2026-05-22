'use client';

import React, { use } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { mockComplaints } from '@/modules/complaint/mock-complaints';
import InteractionSection from '@/components/ui/interaction-section';

export default function ComplaintDetailTrackerPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const complaint = mockComplaints.find(c => c.id === id);

  if (!complaint) notFound();

  // Construct absolute/static local URL representation for social sharing simulation
  const shareUrl = typeof window !== 'undefined'
    ? `${window.location.origin}/complaints/${complaint.id}`
    : `https://voiceofnorthern.org/complaints/${complaint.id}`;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 px-4 md:px-8 py-16">
      <div className="max-w-4xl mx-auto space-y-6">
        
        {/* Navigation Breadcrumbs */}
        <Link href="/complaints" className="text-xs text-slate-500 hover:text-cyan-400 transition-colors font-medium">
          ← Back to Feed Stream
        </Link>

        {/* Main Grid */}
        <div className="grid gap-8 md:grid-cols-3">

          {/* Left Side: Statement Box */}
          <div className="md:col-span-2 space-y-6">
            <div className="p-6 bg-slate-900/40 border border-slate-900 rounded-3xl space-y-4 font-sans">
              <div className="flex items-center justify-between text-xs">
                <span className="text-[10px] font-mono font-bold text-cyan-400 tracking-wide uppercase">
                  Case Reference ID: #{complaint.id}
                </span>
                <span className="text-slate-505 font-mono">{new Date(complaint.createdAt).toLocaleDateString()}</span>
              </div>
              <h1 className="text-2xl font-black tracking-tight text-white leading-snug">{complaint.title}</h1>
              
              <div className="text-slate-350 text-xs sm:text-sm leading-relaxed whitespace-pre-wrap">
                {complaint.description}
              </div>

              {/* Attached Evidences List */}
              {complaint.evidences.length > 0 && (
                <div className="pt-4 border-t border-slate-950 space-y-2">
                  <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-wider">Attached Proof Material</h4>
                  <div className="flex flex-col gap-1.5 text-xs">
                    {complaint.evidences.map(ev => (
                      <a
                        key={ev.id}
                        href={ev.fileUrl}
                        download
                        className="text-cyan-400 hover:underline flex items-center gap-1.5 font-bold"
                      >
                        📎 {ev.fileName} <span className="text-[9px] text-slate-600 font-mono">({ev.fileType})</span>
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Official Action Remarks */}
            {complaint.adminRemarks && (
              <div className="p-5 bg-cyan-950/10 border border-cyan-900/50 rounded-2xl space-y-2 font-sans">
                <h4 className="text-[10px] font-black text-cyan-400 uppercase tracking-wider">Official Action Remarks</h4>
                <p className="text-slate-300 text-xs leading-relaxed">{complaint.adminRemarks}</p>
              </div>
            )}

            {/* Interaction Layer (Comments, Replies, Reactions) */}
            <InteractionSection
              itemId={complaint.id}
              initialLikes={15}
              shareUrl={shareUrl}
              shareTitle={complaint.title}
              categoryLabel="Complaint"
            />
          </div>

          {/* Right Side: Visual Case Tracker Pipeline */}
          <div className="p-6 bg-slate-900/20 border border-slate-900 rounded-3xl h-fit space-y-6 font-sans">
            <h3 className="text-xs font-black text-white uppercase tracking-widest border-b border-slate-900 pb-3">
              Action Timeline
            </h3>

            <div className="relative border-l border-slate-800 pl-4 ml-2 space-y-6">
              {[
                { title: 'Case Resolved', active: complaint.status === 'RESOLVED' },
                { title: 'Under Active Review', active: complaint.status === 'UNDER_REVIEW' || complaint.status === 'APPROVED' },
                { title: 'Approved & Listed', active: complaint.status !== 'PENDING' && complaint.status !== 'REJECTED' },
                { title: 'Complaint Filed Securely', active: true },
              ].map((step, idx) => (
                <div key={idx} className="relative">
                  <div
                    className={`absolute -left-[21px] top-1 w-3 h-3 rounded-full border ${
                      step.active
                        ? 'bg-cyan-400 border-cyan-400 shadow-md shadow-cyan-400/40'
                        : 'bg-slate-950 border-slate-800'
                    }`}
                  />
                  <span className={`text-xs font-semibold ${step.active ? 'text-slate-200' : 'text-slate-650'}`}>
                    {step.title}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}