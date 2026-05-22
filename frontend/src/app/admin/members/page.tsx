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
  rejectionReason?: string;
  isDeleted?: boolean;
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
    status: 'REJECTED',
    rejectionReason: 'ID Card image provided is blurry and unreadable.'
  }
];

export default function AdminMembersPage() {
  const [members, setMembers] = useState<StudentMember[]>(initialMembers);
  const [activeTab, setActiveTab] = useState<'PENDING' | 'APPROVED' | 'REJECTED'>('PENDING');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIdCard, setSelectedIdCard] = useState<string | null>(null);

  // Micro-modal state for rejection rationale input
  const [rejectionTargetId, setRejectionTargetId] = useState<string | null>(null);
  const [rejectionInputText, setRejectionInputText] = useState('');

  const handleApprove = (id: string) => {
    setMembers(prev =>
      prev.map(m => (m.id === id ? { ...m, status: 'APPROVED', rejectionReason: undefined } : m))
    );
  };

  const handleOpenRejectionModal = (id: string) => {
    setRejectionTargetId(id);
    setRejectionInputText('');
  };

  const handleConfirmRejection = (e: React.FormEvent) => {
    e.preventDefault();
    if (!rejectionInputText.trim() || !rejectionTargetId) return;

    setMembers(prev =>
      prev.map(m => (m.id === rejectionTargetId ? { ...m, status: 'REJECTED', rejectionReason: rejectionInputText } : m))
    );
    setRejectionTargetId(null);
  };

  // Soft Delete implementation instead of dropping data
  const handleSoftDelete = (id: string) => {
    setMembers(prev =>
      prev.map(m => (m.id === id ? { ...m, isDeleted: true } : m))
    );
  };

  const handleRestoreRecord = (id: string) => {
    setMembers(prev =>
      prev.map(m => (m.id === id ? { ...m, isDeleted: false } : m))
    );
  };

  const filtered = members.filter(m => {
    const matchesTab = m.status === activeTab;
    const matchesQuery = m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.studentId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.department.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesQuery;
  });

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="border-b border-slate-900 pb-5">
        <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-white">
          Unified Membership Approval Queue
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Gatekeeper workspace reviewing registration files, validating official student credentials, and managing activations.
        </p>
      </div>

      {/* Toolbar */}
      <div className="bg-slate-900/20 border border-slate-900 rounded-2xl p-4 flex flex-col md:flex-row gap-4 items-center justify-between">
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
              {tab === 'PENDING' ? 'Pending Queue' : tab === 'APPROVED' ? 'Activated Members' : 'Rejected Applications'}
            </button>
          ))}
        </div>

        <div className="relative w-full md:max-w-xs">
          <input
            type="text"
            placeholder="Search by student info..."
            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 pl-9 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
          />
          <span className="absolute left-3 top-2.5 text-slate-500 text-xs">🔍</span>
        </div>
      </div>

      {/* Grid containing verification rows */}
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map(member => (
          <div
            key={member.id}
            className={`bg-slate-900/30 border border-slate-900 rounded-2xl p-5 flex flex-col justify-between hover:border-slate-800 transition-all space-y-4 ${
              member.isDeleted ? 'opacity-40 line-through bg-slate-950/40 border-red-950/20' : ''
            }`}
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">{member.batch}</span>
                <div className="flex gap-2 items-center">
                  <span className={`px-2 py-0.5 text-[9px] font-black rounded border ${
                    member.status === 'PENDING' ? 'bg-orange-500/10 text-orange-400 border-orange-500/20' :
                    member.status === 'APPROVED' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' :
                    'bg-red-500/10 text-red-400 border-red-500/20'
                  }`}>
                    {member.status}
                  </span>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-bold text-white leading-none">{member.name}</h3>
                <p className="text-[11px] font-mono text-cyan-400 mt-1">{member.studentId}</p>
              </div>

              <div className="space-y-1.5 text-xs text-slate-400 bg-slate-950/60 p-3 rounded-xl border border-slate-900/50">
                <div className="truncate">🎓 <span className="text-slate-500">Dept:</span> {member.department}</div>
                <div className="truncate">✉️ <span className="text-slate-500">Official Email:</span> {member.email}</div>
                <div>📅 <span className="text-slate-500">Applied:</span> {new Date(member.submittedAt).toLocaleDateString()}</div>
                {member.rejectionReason && (
                  <div className="pt-1.5 border-t border-red-950/20 text-red-400 mt-1 text-[11px] whitespace-pre-wrap">
                    ⚠️ <span className="font-bold">Rejection Reason:</span> {member.rejectionReason}
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-3">
              <button
                onClick={() => setSelectedIdCard(member.idCardImage)}
                className="w-full py-2 bg-slate-950 hover:bg-slate-900 border border-slate-800 hover:border-slate-700 text-[10px] font-bold text-slate-300 rounded-xl transition-all text-center block cursor-pointer"
              >
                🖼️ View Student ID Card
              </button>

              {/* Action Buttons */}
              <div className="flex gap-2">
                {member.status === 'PENDING' && (
                  <>
                    <button
                      onClick={() => handleApprove(member.id)}
                      className="flex-1 py-2 bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold rounded-xl text-xs transition-colors"
                    >
                      Approve & Activate
                    </button>
                    <button
                      onClick={() => handleOpenRejectionModal(member.id)}
                      className="flex-1 py-2 bg-red-950/40 border border-red-900/30 hover:bg-red-900 text-red-200 font-bold rounded-xl text-xs transition-colors"
                    >
                      Reject
                    </button>
                  </>
                )}

                {member.status !== 'PENDING' && (
                  <div className="w-full flex gap-2">
                    {member.isDeleted ? (
                      <button
                        onClick={() => handleRestoreRecord(member.id)}
                        className="w-full py-2 bg-emerald-950/40 border border-emerald-900/30 hover:bg-emerald-900 text-emerald-400 font-bold rounded-xl text-xs transition-colors"
                      >
                        🔄 Restore Record
                      </button>
                    ) : (
                      <>
                        <button
                          onClick={() => handleSoftDelete(member.id)}
                          className="flex-1 py-2 bg-red-950/40 border border-red-900/30 hover:bg-red-900 text-red-200 font-bold rounded-xl text-xs transition-colors"
                        >
                          Soft Delete
                        </button>
                        {member.status === 'REJECTED' && (
                          <button
                            onClick={() => handleApprove(member.id)}
                            className="flex-1 py-2 bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 font-bold rounded-xl text-xs transition-colors"
                          >
                            Re-verify / Approve
                          </button>
                        )}
                      </>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}

        {filtered.length === 0 && (
          <div className="col-span-full py-16 text-center border border-dashed border-slate-900 rounded-2xl text-slate-500 text-xs">
            No applicant records in this state.
          </div>
        )}
      </div>

      {/* Student ID Card Preview Overlay */}
      {selectedIdCard && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm"
          onClick={() => setSelectedIdCard(null)}
        >
          <div
            className="relative w-full max-w-lg bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-3"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex justify-between items-center border-b border-slate-800 pb-2">
              <span className="text-xs font-bold text-slate-400">Student ID Verification</span>
              <button onClick={() => setSelectedIdCard(null)} className="text-slate-400 hover:text-white">✕</button>
            </div>
            <div className="aspect-[1.6/1] w-full overflow-hidden rounded-xl bg-slate-950 border border-slate-900">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={selectedIdCard} alt="Student ID Card Document Preview" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      )}

      {/* Rejection Justification Modal Prompt */}
      {rejectionTargetId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
            <div className="border-b border-slate-800 pb-3 flex justify-between items-center">
              <h3 className="text-sm font-black text-red-400 uppercase tracking-wider">Rejection Justification</h3>
              <button onClick={() => setRejectionTargetId(null)} className="text-slate-500 hover:text-white">✕</button>
            </div>

            <form onSubmit={handleConfirmRejection} className="space-y-4 text-xs">
              <p className="text-slate-400 leading-relaxed">
                Provide a specific reason for rejecting this student registration application. This message will be sent to the user.
              </p>
              
              <div className="space-y-1">
                <label className="font-bold text-slate-300">Rejection Rationale</label>
                <textarea
                  required
                  rows={3}
                  placeholder="e.g. ID card text is illegible, please upload a clearer image..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-100 placeholder-slate-600 focus:outline-none focus:border-red-500"
                  value={rejectionInputText}
                  onChange={e => setRejectionInputText(e.target.value)}
                />
              </div>

              <div className="flex gap-3 justify-end pt-2">
                <button
                  type="button"
                  onClick={() => setRejectionTargetId(null)}
                  className="px-4 py-2 bg-slate-850 hover:bg-slate-800 text-slate-200 rounded-xl font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-red-600 hover:bg-red-500 text-white font-bold rounded-xl"
                >
                  Confirm Rejection
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
