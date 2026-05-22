import React from 'react';
import Link from 'next/link';
import { mockComplaints } from '@/modules/complaint/mock-complaints';

export default function MyComplaintsDashboardPage() {
    return (
        <div className="space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-white">My Submitted Complaints</h1>
                    <p className="text-xs text-slate-400 mt-1">Audit status histories, view private notes, and monitor movement scopes.</p>
                </div>
                <Link href="/dashboard/complaints/create" className="px-4 py-2.5 bg-cyan-400 text-slate-950 font-bold text-xs rounded-xl hover:bg-cyan-300 transition-colors shrink-0 text-center">
                    + File New Grievance
                </Link>
            </div>

            <div className="bg-slate-900/20 border border-slate-900 rounded-2xl overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse text-xs">
                        <thead>
                            <tr className="bg-slate-900/60 border-b border-slate-900 text-slate-400 uppercase tracking-wider font-bold">
                                <th className="p-4">Case ID</th>
                                <th className="p-4">Complaint Header</th>
                                <th className="p-4">Mode</th>
                                <th className="p-4">Current Status</th>
                                <th className="p-4 text-right">Operation</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-900/50 text-slate-300 font-medium">
                            {mockComplaints.map(c => (
                                <tr key={c.id} className="hover:bg-slate-900/20 transition-colors">
                                    <td className="p-4 font-mono text-cyan-400">{c.id}</td>
                                    <td className="p-4 max-w-xs truncate text-slate-200">{c.title}</td>
                                    <td className="p-4">
                                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${c.isAnonymous ? 'bg-orange-950/40 text-orange-400' : 'bg-slate-950 text-slate-500'}`}>
                                            {c.isAnonymous ? 'Anonymous' : 'Public'}
                                        </span>
                                    </td>
                                    <td className="p-4">
                                        <span className="font-semibold text-slate-200 uppercase text-[11px]">{c.status}</span>
                                    </td>
                                    <td className="p-4 text-right">
                                        <Link href={`/complaints/${c.id}`} className="text-cyan-400 hover:underline font-bold">
                                            View Live Tracker →
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}