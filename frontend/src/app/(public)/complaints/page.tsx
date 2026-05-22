import React from 'react';
import Link from 'next/link';
import { mockComplaints } from '@/modules/complaint/mock-complaints';

export default function PublicComplaintsPage() {
    // Only APPROVED complaints will be mapped onto the public domain according to SRS
    const publicFeeds = mockComplaints.filter(c => c.status === 'APPROVED' || c.status === 'RESOLVED' || c.status === 'UNDER_REVIEW');

    return (
        <div className="min-h-screen bg-slate-950 text-slate-100 px-4 md:px-8 py-16">
            <div className="max-w-5xl mx-auto space-y-8">
                <div>
                    <h1 className="text-3xl font-extrabold tracking-tight text-white">Student Complaints & Actions Feed</h1>
                    <p className="text-sm text-slate-400 mt-1">Real-time public tracking of verified community complaints and response histories.</p>
                </div>

                <div className="space-y-4">
                    {publicFeeds.map((cmp) => (
                        <div key={cmp.id} className="p-6 bg-slate-900/40 border border-slate-900 rounded-xl hover:border-slate-800 transition-all space-y-4">
                            <div className="flex flex-wrap items-center justify-between gap-2">
                                <div className="flex items-center gap-3">
                                    <span className="px-2.5 py-0.5 bg-slate-950 border border-slate-800 rounded text-[10px] font-bold text-slate-400 tracking-wider">
                                        #{cmp.category}
                                    </span>
                                    <span className="text-xs text-slate-500">{new Date(cmp.createdAt).toLocaleDateString()}</span>
                                </div>
                                <span className="text-xs font-black uppercase bg-cyan-950/50 text-cyan-400 border border-cyan-900 px-2.5 py-0.5 rounded tracking-wide">
                                    {cmp.status.replace('_', ' ')}
                                </span>
                            </div>

                            <div className="space-y-1">
                                <h3 className="text-xl font-bold text-white tracking-tight hover:text-cyan-400 transition-colors">
                                    <Link href={`/complaints/${cmp.id}`}>{cmp.title}</Link>
                                </h3>
                                <p className="text-slate-400 text-sm line-clamp-2 leading-relaxed">{cmp.description}</p>
                            </div>

                            <div className="flex items-center justify-between pt-3 border-t border-slate-950 text-xs text-slate-500">
                                <span>
                                    By:{' '}
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
                </div>
            </div>
        </div>
    );
}