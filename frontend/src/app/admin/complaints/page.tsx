'use client';
import React, { useState } from 'react';
import { mockComplaints as initialComplaints } from '@/modules/complaint/mock-complaints';
import { Complaint, ComplaintStatus } from '@/modules/complaint/types';

export default function AdminComplaintsPage() {
    const [complaints, setComplaints] = useState<Complaint[]>(initialComplaints);
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState<ComplaintStatus | 'ALL'>('ALL');
    const [categoryFilter, setCategoryFilter] = useState<Complaint['category'] | 'ALL'>('ALL');

    // Selected complaint for detailed view modal
    const [selectedComplaint, setSelectedComplaint] = useState<Complaint | null>(null);

    // Identity Reveal Modal state
    const [revealModalOpen, setRevealModalOpen] = useState(false);
    const [authCode, setAuthCode] = useState('');
    const [revealReason, setRevealReason] = useState('');
    const [revealedIdentity, setRevealedIdentity] = useState<{ name: string; studentId: string; department: string } | null>(null);
    const [revealError, setRevealError] = useState('');

    const handleStatusTransition = (id: string, newStatus: ComplaintStatus) => {
        setComplaints(prev =>
            prev.map(c => (c.id === id ? { ...c, status: newStatus, updatedAt: new Date().toISOString() } : c))
        );
        if (selectedComplaint && selectedComplaint.id === id) {
            setSelectedComplaint(prev => prev ? { ...prev, status: newStatus, updatedAt: new Date().toISOString() } : null);
        }
    };

    const handleUpdateRemarks = (id: string, remarks: string) => {
        setComplaints(prev =>
            prev.map(c => (c.id === id ? { ...c, adminRemarks: remarks, updatedAt: new Date().toISOString() } : c))
        );
        if (selectedComplaint && selectedComplaint.id === id) {
            setSelectedComplaint(prev => prev ? { ...prev, adminRemarks: remarks, updatedAt: new Date().toISOString() } : null);
        }
    };

    const handleRevealSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (authCode !== 'SUPER_ADMIN_2026') {
            setRevealError('Invalid Super Admin authorization key code.');
            return;
        }
        if (!revealReason.trim()) {
            setRevealError('You must supply a valid investigative justification.');
            return;
        }

        // Mock unlocking identity
        const mockIdentity = {
            name: 'Md. Fahim Rahman',
            studentId: '2022-2-60-089',
            department: 'Computer Science & Engineering'
        };
        setRevealedIdentity(mockIdentity);
        setRevealError('');

        // Simulating push to audit log (would normally hit a REST endpoint)
        console.log(`[AUDIT WARNING] Super Admin unlocked identity for complaint ${selectedComplaint?.id}. Reason: ${revealReason}`);
    };

    const closeRevealModal = () => {
        setRevealModalOpen(false);
        setAuthCode('');
        setRevealReason('');
        setRevealedIdentity(null);
        setRevealError('');
    };

    const filtered = complaints.filter(c => {
        const matchesSearch = c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            c.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
            c.id.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesStatus = statusFilter === 'ALL' || c.status === statusFilter;
        const matchesCategory = categoryFilter === 'ALL' || c.category === categoryFilter;
        return matchesSearch && matchesStatus && matchesCategory;
    });

    return (
        <div className="space-y-6 max-w-7xl mx-auto">
            {/* Header */}
            <div className="border-b border-slate-900 pb-5">
                <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-white">
                    Grievance & Complaints Moderation
                </h1>
                <p className="text-xs text-slate-400 mt-1">
                    Manage, review, transition stages of student complaints, and audit anonymous files.
                </p>
            </div>

            {/* Filter Toolbar */}
            <div className="bg-slate-900/20 border border-slate-900 rounded-2xl p-4 flex flex-col md:flex-row gap-4 items-center justify-between">
                <div className="relative w-full md:max-w-xs">
                    <input
                        type="text"
                        placeholder="Search complaint text or ID..."
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 pl-9 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
                        value={searchQuery}
                        onChange={e => setSearchQuery(e.target.value)}
                    />
                    <span className="absolute left-3 top-2.5 text-slate-500 text-xs">🔍</span>
                </div>

                <div className="flex flex-wrap gap-3 w-full md:w-auto">
                    {/* Status Dropdown */}
                    <div className="flex-1 md:flex-initial">
                        <select
                            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-300 focus:outline-none focus:border-cyan-500 transition-colors"
                            value={statusFilter}
                            onChange={e => setStatusFilter(e.target.value as ComplaintStatus | 'ALL')}
                        >
                            <option value="ALL">All Statuses</option>
                            <option value="PENDING">Pending</option>
                            <option value="UNDER_REVIEW">Under Review</option>
                            <option value="APPROVED">Approved</option>
                            <option value="RESOLVED">Resolved</option>
                            <option value="REJECTED">Rejected</option>
                            <option value="ESCALATED">Escalated</option>
                        </select>
                    </div>

                    {/* Category Dropdown */}
                    <div className="flex-1 md:flex-initial">
                        <select
                            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-300 focus:outline-none focus:border-cyan-500 transition-colors"
                            value={categoryFilter}
                            onChange={e => setCategoryFilter(e.target.value as Complaint['category'] | 'ALL')}
                        >
                            <option value="ALL">All Categories</option>
                            <option value="ACADEMIC">Academic</option>
                            <option value="ADMINISTRATION">Administration</option>
                            <option value="FACILITIES">Facilities</option>
                            <option value="HARASSMENT">Harassment</option>
                            <option value="OTHERS">Others</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Complaints Grid/List */}
            <div className="grid gap-4 lg:grid-cols-2">
                {filtered.map(complaint => (
                    <div
                        key={complaint.id}
                        onClick={() => setSelectedComplaint(complaint)}
                        className={`bg-slate-900/30 border border-slate-900 rounded-2xl p-5 hover:border-slate-800 transition-all cursor-pointer flex flex-col justify-between space-y-4 ${
                            selectedComplaint?.id === complaint.id ? 'ring-1 ring-cyan-500/50 border-cyan-500/30' : ''
                        }`}
                    >
                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <span className="text-[10px] font-mono text-slate-500 tracking-wider">#{complaint.id.toUpperCase()}</span>
                                <span className={`px-2 py-0.5 text-[9px] font-black rounded border ${
                                    complaint.status === 'PENDING' ? 'bg-orange-500/10 text-orange-400 border-orange-500/20' :
                                    complaint.status === 'UNDER_REVIEW' ? 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20' :
                                    complaint.status === 'APPROVED' ? 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20' :
                                    complaint.status === 'RESOLVED' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' :
                                    'bg-slate-800 text-slate-400 border-slate-700'
                                }`}>
                                    {complaint.status}
                                </span>
                            </div>
                            <h3 className="text-sm font-bold text-white leading-snug line-clamp-1">{complaint.title}</h3>
                            <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">{complaint.description}</p>
                        </div>

                        <div className="pt-3 border-t border-slate-900/60 flex items-center justify-between text-[10px] text-slate-500">
                            <span className="font-bold text-slate-400">Category: {complaint.category}</span>
                            <span>{new Date(complaint.createdAt).toLocaleDateString()}</span>
                        </div>
                    </div>
                ))}

                {filtered.length === 0 && (
                    <div className="col-span-full py-12 text-center border border-dashed border-slate-900 rounded-2xl text-slate-500 text-xs">
                        No complaints match your active filter criteria.
                    </div>
                )}
            </div>

            {/* Complaint Evaluation Detail Pane */}
            {selectedComplaint && (
                <div className="bg-slate-900/20 border border-slate-900 rounded-2xl p-6 space-y-6">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-900 pb-4">
                        <div>
                            <span className="text-[10px] font-mono text-cyan-400">Evaluating: #{selectedComplaint.id.toUpperCase()}</span>
                            <h2 className="text-base font-bold text-white mt-1">{selectedComplaint.title}</h2>
                        </div>
                        <button
                            onClick={() => setSelectedComplaint(null)}
                            className="text-xs text-slate-500 hover:text-slate-300 font-bold self-end sm:self-auto"
                        >
                            Close Panel
                        </button>
                    </div>

                    <div className="space-y-4">
                        <div>
                            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Grievance Narrative</h4>
                            <p className="text-xs text-slate-300 bg-slate-950 p-4 border border-slate-900 rounded-xl leading-relaxed whitespace-pre-wrap">
                                {selectedComplaint.description}
                            </p>
                        </div>

                        <div className="grid gap-6 sm:grid-cols-2 text-xs">
                            {/* Evidence Attachments */}
                            <div>
                                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Attached Evidence</h4>
                                {selectedComplaint.evidences.length > 0 ? (
                                    <div className="space-y-2">
                                        {selectedComplaint.evidences.map(ev => (
                                            <a
                                                key={ev.id}
                                                href={ev.fileUrl}
                                                download
                                                className="flex items-center justify-between p-2.5 bg-slate-950 border border-slate-800 hover:border-slate-700 rounded-xl transition-all"
                                            >
                                                <span className="font-semibold text-slate-300 truncate max-w-[180px]">📂 {ev.fileName}</span>
                                                <span className="text-[9px] font-black text-cyan-400 uppercase">{ev.fileType}</span>
                                            </a>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-slate-500 italic">No media attachments uploaded.</p>
                                )}
                            </div>

                            {/* Author Identification */}
                            <div>
                                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Author Identity</h4>
                                {selectedComplaint.isAnonymous ? (
                                    <div className="p-4 bg-slate-950 border border-red-950/20 rounded-xl space-y-3">
                                        <div className="flex items-center gap-2 text-red-400 font-bold">
                                            <span className="text-xs">🔒</span>
                                            <span>Anonymous Registration File</span>
                                        </div>
                                        <p className="text-[10px] text-slate-500 leading-relaxed">
                                            Student selected anonymous protection. Unlocking identity triggers a safety audit trail reporting to the super admin role.
                                        </p>
                                        <button
                                            onClick={() => setRevealModalOpen(true)}
                                            className="px-3.5 py-1.5 bg-red-950/40 border border-red-900/30 hover:bg-red-900 text-red-200 font-bold rounded-lg transition-all"
                                        >
                                            De-anonymize Identity
                                        </button>
                                    </div>
                                ) : (
                                    <div className="p-4 bg-slate-950 border border-slate-900 rounded-xl space-y-2">
                                        <div className="flex justify-between">
                                            <span className="text-slate-500">Student Name:</span>
                                            <span className="font-bold text-white">{selectedComplaint.submittedBy?.name}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-slate-500">Student ID:</span>
                                            <span className="font-mono font-bold text-cyan-400">{selectedComplaint.submittedBy?.studentId}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-slate-500">Department:</span>
                                            <span className="text-slate-300">{selectedComplaint.submittedBy?.department}</span>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Admin Remarks Section */}
                        <div className="space-y-2">
                            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Internal Remarks / Decisions</h4>
                            <textarea
                                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-100 focus:outline-none focus:border-cyan-500 transition-colors h-16 resize-none"
                                placeholder="Log updates or action outcomes..."
                                value={selectedComplaint.adminRemarks || ''}
                                onChange={e => handleUpdateRemarks(selectedComplaint.id, e.target.value)}
                            />
                        </div>

                        {/* Decision Bar */}
                        <div className="flex flex-wrap gap-3 pt-2">
                            <button
                                onClick={() => handleStatusTransition(selectedComplaint.id, 'APPROVED')}
                                className="px-4 py-2 bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold rounded-xl text-xs transition-colors"
                            >
                                Publish Complaint
                            </button>
                            <button
                                onClick={() => handleStatusTransition(selectedComplaint.id, 'UNDER_REVIEW')}
                                className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-800 font-bold rounded-xl text-xs transition-colors"
                            >
                                Move to Under Review
                            </button>
                            <button
                                onClick={() => handleStatusTransition(selectedComplaint.id, 'RESOLVED')}
                                className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-xl text-xs transition-colors"
                            >
                                Mark as Resolved
                            </button>
                            <button
                                onClick={() => handleStatusTransition(selectedComplaint.id, 'REJECTED')}
                                className="px-4 py-2 bg-red-950/60 border border-red-900/30 hover:bg-red-900 text-red-200 font-bold rounded-xl text-xs transition-colors"
                            >
                                Reject / Flag
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Simulated De-anonymize Dialog Modal */}
            {revealModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm">
                    <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
                        <div className="border-b border-slate-800 pb-3 flex justify-between items-center">
                            <h3 className="text-sm font-black text-red-400 uppercase tracking-wider">De-anonymization Access Prompt</h3>
                            <button onClick={closeRevealModal} className="text-slate-500 hover:text-white">✕</button>
                        </div>

                        {!revealedIdentity ? (
                            <form onSubmit={handleRevealSubmit} className="space-y-4 text-xs">
                                <p className="text-slate-400 leading-relaxed">
                                    Identity decryption is audited. Enter the Super Admin authorization key pass code and document your investigation justification.
                                </p>
                                
                                <div className="space-y-1">
                                    <label className="font-bold text-slate-300">Super Admin Authorization Code</label>
                                    <input
                                        type="password"
                                        required
                                        placeholder="Enter key (e.g. SUPER_ADMIN_2026)..."
                                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-100 placeholder-slate-600 focus:outline-none focus:border-red-500 font-mono tracking-widest"
                                        value={authCode}
                                        onChange={e => setAuthCode(e.target.value)}
                                    />
                                </div>

                                <div className="space-y-1">
                                    <label className="font-bold text-slate-300">Justification / Reason for Unlock</label>
                                    <textarea
                                        required
                                        rows={3}
                                        placeholder="Explain reasoning..."
                                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-100 placeholder-slate-600 focus:outline-none focus:border-red-500"
                                        value={revealReason}
                                        onChange={e => setRevealReason(e.target.value)}
                                    />
                                </div>

                                {revealError && (
                                    <div className="p-2.5 bg-red-950/40 border border-red-500/20 text-red-400 rounded-lg">
                                        {revealError}
                                    </div>
                                )}

                                <button
                                    type="submit"
                                    className="w-full py-2.5 bg-red-500 hover:bg-red-400 text-slate-950 font-black rounded-xl transition-all"
                                >
                                    Decrypt Identity
                                </button>
                            </form>
                        ) : (
                            <div className="space-y-4 text-xs">
                                <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 leading-relaxed font-bold">
                                    🔒 DECRYPTION SUCCESSFUL. Identity exposed in audit logs.
                                </div>
                                <div className="space-y-2 bg-slate-950 p-4 border border-slate-800 rounded-xl">
                                    <div className="flex justify-between">
                                        <span className="text-slate-500">Student Name:</span>
                                        <span className="font-bold text-white">{revealedIdentity.name}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-slate-500">Student ID:</span>
                                        <span className="font-mono font-bold text-red-400">{revealedIdentity.studentId}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-slate-500">Department:</span>
                                        <span className="text-slate-300">{revealedIdentity.department}</span>
                                    </div>
                                </div>
                                <button
                                    onClick={closeRevealModal}
                                    className="w-full py-2 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-xl transition-colors"
                                >
                                    Dismiss Window
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
