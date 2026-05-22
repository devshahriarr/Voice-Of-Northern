'use client';
import React, { useState } from 'react';

interface StudentMember {
    id: string;
    name: string;
    studentId: string;
    department: string;
    batch: string;
    email: string;
    idCardImage: string;
    submittedAt: string;
    status: 'PENDING' | 'APPROVED' | 'REJECTED';
}

const initialMembers: StudentMember[] = [
    {
        id: 'mem-101',
        name: 'Rahat Chowdhury',
        studentId: '2023-1-60-044',
        department: 'Computer Science & Engineering',
        batch: '58th Batch',
        email: 'rahat.c@gmail.com',
        idCardImage: 'https://images.unsplash.com/photo-1544717297-fa95b6ee9643?w=500',
        submittedAt: '2026-05-22T08:30:00Z',
        status: 'PENDING'
    },
    {
        id: 'mem-102',
        name: 'Nusrat Jahan Mitu',
        studentId: '2024-2-80-012',
        department: 'Pharmacy',
        batch: '61st Batch',
        email: 'mitu.pharm@gmail.com',
        idCardImage: 'https://images.unsplash.com/photo-1544717297-fa95b6ee9643?w=500',
        submittedAt: '2026-05-22T06:15:00Z',
        status: 'PENDING'
    },
    {
        id: 'mem-103',
        name: 'Istiaque Ahmed',
        studentId: '2023-3-30-089',
        department: 'Electrical & Electronic Engineering',
        batch: '59th Batch',
        email: 'istiaque.eee@gmail.com',
        idCardImage: 'https://images.unsplash.com/photo-1544717297-fa95b6ee9643?w=500',
        submittedAt: '2026-05-21T18:40:00Z',
        status: 'PENDING'
    },
    {
        id: 'mem-104',
        name: 'Sayed Mohammad',
        studentId: '2022-3-10-090',
        department: 'Business Administration',
        batch: '56th Batch',
        email: 'sayed.bba@gmail.com',
        idCardImage: 'https://images.unsplash.com/photo-1544717297-fa95b6ee9643?w=500',
        submittedAt: '2026-05-19T14:20:00Z',
        status: 'APPROVED'
    },
    {
        id: 'mem-105',
        name: 'Tahreem Fatima',
        studentId: '2021-1-40-103',
        department: 'Law',
        batch: '52nd Batch',
        email: 'tahreem.law@gmail.com',
        idCardImage: 'https://images.unsplash.com/photo-1544717297-fa95b6ee9643?w=500',
        submittedAt: '2026-05-18T10:11:00Z',
        status: 'REJECTED'
    }
];

export default function AdminMembersPage() {
    const [members, setMembers] = useState<StudentMember[]>(initialMembers);
    const [activeTab, setActiveTab] = useState<'PENDING' | 'APPROVED' | 'REJECTED'>('PENDING');
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedIdCard, setSelectedIdCard] = useState<string | null>(null);

    const handleAction = (id: string, nextStatus: 'APPROVED' | 'REJECTED') => {
        setMembers(prev =>
            prev.map(m => (m.id === id ? { ...m, status: nextStatus } : m))
        );
    };

    const filtered = members.filter(m => {
        const matchesTab = m.status === activeTab;
        const matchesQuery = m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            m.studentId.toLowerCase().includes(searchQuery.toLowerCase()) ||
            m.department.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesTab && matchesQuery;
    });

    return (
        <div className="space-y-6 max-w-7xl mx-auto">
            {/* Header */}
            <div className="border-b border-slate-900 pb-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-white">
                        Student Membership Verification
                    </h1>
                    <p className="text-xs text-slate-400 mt-1">
                        Evaluate student files, review uploaded student ID cards, and grant member authorization.
                    </p>
                </div>
            </div>

            {/* Filter toolbar */}
            <div className="bg-slate-900/20 border border-slate-900 rounded-2xl p-4 flex flex-col md:flex-row gap-4 items-center justify-between">
                {/* Tabs */}
                <div className="flex bg-slate-950 p-1 rounded-xl border border-slate-900 w-full md:w-auto">
                    {(['PENDING', 'APPROVED', 'REJECTED'] as const).map(tab => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`flex-1 md:flex-initial px-4 py-2 text-xs font-bold rounded-lg transition-all ${
                                activeTab === tab
                                    ? 'bg-cyan-400 text-slate-950 shadow-md shadow-cyan-400/10'
                                    : 'text-slate-400 hover:text-slate-200'
                            }`}
                        >
                            {tab === 'PENDING' ? 'Pending Queue' : tab === 'APPROVED' ? 'Approved Members' : 'Rejected'}
                        </button>
                    ))}
                </div>

                {/* Search */}
                <div className="relative w-full md:max-w-xs">
                    <input
                        type="text"
                        placeholder="Search by student name or ID..."
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 pl-9 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
                        value={searchQuery}
                        onChange={e => setSearchQuery(e.target.value)}
                    />
                    <span className="absolute left-3 top-2.5 text-slate-500 text-xs">🔍</span>
                </div>
            </div>

            {/* Members List */}
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                {filtered.map(member => (
                    <div
                        key={member.id}
                        className="bg-slate-900/30 border border-slate-900 rounded-2xl p-5 flex flex-col justify-between hover:border-slate-800 transition-all space-y-4"
                    >
                        <div className="space-y-3">
                            <div className="flex items-center justify-between">
                                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{member.batch}</span>
                                <span className={`px-2 py-0.5 text-[9px] font-black rounded border ${
                                    member.status === 'PENDING' ? 'bg-orange-500/10 text-orange-400 border-orange-500/20' :
                                    member.status === 'APPROVED' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' :
                                    'bg-red-500/10 text-red-400 border-red-500/20'
                                }`}>
                                    {member.status}
                                </span>
                            </div>

                            <div>
                                <h3 className="text-sm font-bold text-white leading-none">{member.name}</h3>
                                <p className="text-[11px] font-mono text-cyan-400 mt-1">{member.studentId}</p>
                            </div>

                            <div className="space-y-1.5 text-xs text-slate-400 bg-slate-950/60 p-3 rounded-xl border border-slate-900/50">
                                <div>🎓 <span className="text-slate-500">Dept:</span> {member.department}</div>
                                <div className="truncate">✉️ <span className="text-slate-500">Email:</span> {member.email}</div>
                                <div>📅 <span className="text-slate-500">Applied:</span> {new Date(member.submittedAt).toLocaleDateString()}</div>
                            </div>
                        </div>

                        <div className="space-y-3">
                            {/* Student ID Card Preview Trigger */}
                            <button
                                onClick={() => setSelectedIdCard(member.idCardImage)}
                                className="w-full py-2 bg-slate-950 hover:bg-slate-900 border border-slate-800 hover:border-slate-700 text-[10px] font-bold text-slate-300 rounded-xl transition-all flex items-center justify-center gap-1"
                            >
                                🖼️ View Student ID Card
                            </button>

                            {/* Actions bar */}
                            {member.status === 'PENDING' && (
                                <div className="grid grid-cols-2 gap-2 text-xs">
                                    <button
                                        onClick={() => handleAction(member.id, 'APPROVED')}
                                        className="py-2.5 bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold rounded-xl transition-all"
                                    >
                                        Approve
                                    </button>
                                    <button
                                        onClick={() => handleAction(member.id, 'REJECTED')}
                                        className="py-2.5 bg-red-950/40 border border-red-900/30 hover:bg-red-900 text-red-200 font-bold rounded-xl transition-all"
                                    >
                                        Reject
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                ))}

                {filtered.length === 0 && (
                    <div className="col-span-full py-16 text-center border border-dashed border-slate-900 rounded-2xl text-slate-500 text-xs">
                        No registrations match the active filter.
                    </div>
                )}
            </div>

            {/* Student ID Card Overlay Modal */}
            {selectedIdCard && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm"
                    onClick={() => setSelectedIdCard(null)}
                >
                    <div className="relative w-full max-w-lg bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-3">
                        <div className="flex justify-between items-center border-b border-slate-800 pb-2">
                            <span className="text-xs font-bold text-slate-400">Student ID Attachment Verification</span>
                            <button onClick={() => setSelectedIdCard(null)} className="text-slate-400 hover:text-white">✕</button>
                        </div>
                        <div className="aspect-[1.6/1] w-full overflow-hidden rounded-xl bg-slate-950 border border-slate-900">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={selectedIdCard} alt="Student ID Card Preview" className="w-full h-full object-cover" />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
