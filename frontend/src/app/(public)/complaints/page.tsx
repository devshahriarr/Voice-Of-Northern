'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { mockComplaints } from '@/modules/complaint/mock-complaints';
import { Complaint } from '@/modules/complaint/types';

export default function PublicComplaintsPage() {
  const [complaintsList] = useState<Complaint[]>(mockComplaints);

  // Only APPROVED/RESOLVED/UNDER_REVIEW/PENDING complaints will list
  const visibleComplaints = complaintsList.filter(
    c => c.status === 'APPROVED' || c.status === 'RESOLVED' || c.status === 'UNDER_REVIEW' || c.status === 'PENDING'
  );

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 px-4 md:px-8 py-16">
      <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
        
        {/* Header with Lodge Grievance Action Link */}
        <div className="border-b border-slate-900 pb-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="px-3 py-1 text-[10px] font-bold tracking-wider text-cyan-400 bg-cyan-950/40 border border-cyan-900/30 rounded-full uppercase">
              Student Grievance Panel
            </span>
            <h1 className="text-3xl font-extrabold tracking-tight text-white mt-2">
              Complaints Submission & Verification Feed
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              File academic and facilities grievances under the Anonymity Shield, or track action histories.
            </p>
          </div>
          <Link
            href="/complaints/submit"
            className="px-5 py-3 bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-black text-xs rounded-xl uppercase tracking-wider text-center transition-all self-start sm:self-center"
          >
            Lodge Grievance
          </Link>
        </div>

        {/* Complaints Stream list */}
        <div className="space-y-5">
          <div className="border-b border-slate-900 pb-3 flex justify-between items-center text-xs">
            <h2 className="font-black text-white uppercase tracking-wider">Community Complaints Stream</h2>
            <span className="font-mono text-slate-500">{visibleComplaints.length} Verified Logs</span>
          </div>

          <div className="space-y-4 font-sans">
            {visibleComplaints.map(cmp => (
              <div
                key={cmp.id}
                className="p-6 bg-slate-900/20 border border-slate-900 rounded-3xl hover:border-slate-800 transition-all space-y-4"
              >
                <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                  <div className="flex items-center gap-3">
                    <span className="px-2.5 py-0.5 bg-slate-950 border border-slate-850 rounded text-[10px] font-bold text-slate-400 tracking-wider">
                      #{cmp.category}
                    </span>
                    <span className="text-slate-500 font-mono">{new Date(cmp.createdAt).toLocaleDateString()}</span>
                  </div>

                  <span className={`px-2 py-0.5 text-[9px] font-black rounded border uppercase ${
                    cmp.status === 'RESOLVED' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' :
                    cmp.status === 'UNDER_REVIEW' ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' :
                    cmp.status === 'PENDING' ? 'bg-purple-500/10 text-purple-400 border-purple-500/20' :
                    'bg-cyan-500/10 text-cyan-400 border-cyan-500/20'
                  }`}>
                    {cmp.status.replace('_', ' ')}
                  </span>
                </div>

                <div className="space-y-1">
                  <h3 className="text-base font-extrabold text-white tracking-tight hover:text-cyan-400 transition-colors">
                    <Link href={`/complaints/${cmp.id}`}>{cmp.title}</Link>
                  </h3>
                  <p className="text-slate-400 text-xs sm:text-sm line-clamp-2 leading-relaxed font-sans">{cmp.description}</p>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-slate-950 text-[10px] sm:text-xs text-slate-500">
                  <span>
                    Lodged By:{' '}
                    <span className="font-semibold text-slate-300">
                      {cmp.isAnonymous ? 'Anonymous Student 🔒' : cmp.submittedBy?.name}
                    </span>
                  </span>
                  <Link href={`/complaints/${cmp.id}`} className="text-cyan-400 font-bold hover:underline">
                    Track Action Timeline →
                  </Link>
                </div>
              </div>
            ))}

            {visibleComplaints.length === 0 && (
              <div className="py-16 text-center text-slate-500 text-xs">
                No verified complaints in feed.
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
}