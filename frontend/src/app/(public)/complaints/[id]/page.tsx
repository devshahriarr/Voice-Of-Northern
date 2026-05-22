import React from 'react';
import { mockComplaints } from '@/modules/complaint/mock-complaints';
import { notFound } from 'next/navigation';

export default async function ComplaintDetailTrackerPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const complaint = mockComplaints.find(c => c.id === id);

    if (!complaint) notFound();

    return (
        <div className="min-h-screen bg-slate-950 text-slate-100 px-4 md:px-8 py-16">
            <div className="max-w-4xl mx-auto grid gap-8 md:grid-cols-3">

                {/* Left Side: Statement Box */}
                <div className="md:col-span-2 space-y-6">
                    <div className="p-6 bg-slate-900/40 border border-slate-900 rounded-2xl space-y-4">
                        <div className="flex items-center justify-between">
                            <span className="text-xs font-bold text-cyan-400 tracking-wide uppercase">Case Reference ID: {complaint.id}</span>
                            <span className="text-xs text-slate-500">{new Date(complaint.createdAt).toLocaleDateString()}</span>
                        </div>
                        <h1 className="text-2xl font-extrabold tracking-tight text-white leading-snug">{complaint.title}</h1>
                        <p className="text-slate-300 text-sm leading-relaxed whitespace-pre-wrap">{complaint.description}</p>

                        {/* Attached Evidences List */}
                        {complaint.evidences.length > 0 && (
                            <div className="pt-4 border-t border-slate-950 space-y-2">
                                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Attached Proof Material</h4>
                                <div className="flex flex-col gap-1.5">
                                    {complaint.evidences.map(ev => (
                                        <a key={ev.id} href={ev.fileUrl} download className="text-xs text-cyan-400 hover:underline flex items-center gap-2">
                                            📎 {ev.fileName} <span className="text-[10px] text-slate-600">({ev.fileType})</span>
                                        </a>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {complaint.adminRemarks && (
                        <div className="p-5 bg-cyan-950/10 border border-cyan-900/50 rounded-xl space-y-2">
                            <h4 className="text-xs font-bold text-cyan-400 uppercase tracking-wider">Official Action Remarks</h4>
                            <p className="text-slate-300 text-xs leading-relaxed">{complaint.adminRemarks}</p>
                        </div>
                    )}
                </div>

                {/* Right Side: Visual Case Tracker Pipeline */}
                <div className="p-6 bg-slate-900/20 border border-slate-900 rounded-2xl h-fit space-y-6">
                    <h3 className="text-sm font-bold text-white uppercase tracking-wider border-b border-slate-900 pb-3">Action Timeline</h3>

                    <div className="relative border-l border-slate-800 pl-4 ml-2 space-y-6">
                        {[
                            { title: 'Case Resolved', active: complaint.status === 'RESOLVED' },
                            { title: 'Under Active Review', active: complaint.status === 'UNDER_REVIEW' || complaint.status === 'APPROVED' },
                            { title: 'Approved & Listed', active: complaint.status !== 'PENDING' && complaint.status !== 'REJECTED' },
                            { title: 'Complaint Filed Securely', active: true },
                        ].map((step, idx) => (
                            <div key={idx} className="relative">
                                <div className={`absolute -left-[21px] top-1 w-3 h-3 rounded-full border ${step.active ? 'bg-cyan-400 border-cyan-400 shadow-md shadow-cyan-400/40' : 'bg-slate-950 border-slate-800'
                                    }`} />
                                <span className={`text-xs font-semibold ${step.active ? 'text-slate-200' : 'text-slate-600'}`}>{step.title}</span>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
}