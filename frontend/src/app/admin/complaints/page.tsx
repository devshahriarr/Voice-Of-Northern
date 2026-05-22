'use client';
import React, { useState } from 'react';
import { mockComplaints as initialComplaints } from '@/modules/complaint/mock-complaints';
import { Complaint, ComplaintStatus } from '@/modules/complaint/types';

interface ExtendedComplaint extends Complaint {
  isDeleted?: boolean;
}

export default function AdminComplaintsPage() {
  const [complaints, setComplaints] = useState<ExtendedComplaint[]>(initialComplaints);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<ComplaintStatus | 'ALL'>('ALL');
  const [categoryFilter, setCategoryFilter] = useState<Complaint['category'] | 'ALL'>('ALL');

  // Selected complaint for detailed view modal
  const [selectedComplaint, setSelectedComplaint] = useState<ExtendedComplaint | null>(null);

  // Decryption / Reveal states for individual rows (to toggle decryption preview inline)
  const [unlockedCaseIds, setUnlockedCaseIds] = useState<Record<string, boolean>>({});

  // Simulated Super Admin override verification for modal decryption
  const [revealModalOpen, setRevealModalOpen] = useState(false);
  const [authCode, setAuthCode] = useState('');
  const [revealReason, setRevealReason] = useState('');
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

  // Soft Delete implementation instead of dropping row
  const handleSoftDelete = (id: string) => {
    setComplaints(prev =>
      prev.map(c => (c.id === id ? { ...c, isDeleted: true, updatedAt: new Date().toISOString() } : c))
    );
    if (selectedComplaint && selectedComplaint.id === id) {
      setSelectedComplaint(prev => prev ? { ...prev, isDeleted: true } : null);
    }
  };

  const handleRestoreCase = (id: string) => {
    setComplaints(prev =>
      prev.map(c => (c.id === id ? { ...c, isDeleted: false, updatedAt: new Date().toISOString() } : c))
    );
    if (selectedComplaint && selectedComplaint.id === id) {
      setSelectedComplaint(prev => prev ? { ...prev, isDeleted: false } : null);
    }
  };

  const toggleDecryption = (caseId: string) => {
    setUnlockedCaseIds(prev => ({
      ...prev,
      [caseId]: !prev[caseId]
    }));
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

    if (selectedComplaint) {
      setUnlockedCaseIds(prev => ({
        ...prev,
        [selectedComplaint.id]: true
      }));
    }
    setRevealModalOpen(false);
    setAuthCode('');
    setRevealReason('');
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
          Complaint Review Dashboard
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Review, transition states, decrypt anonymity flags for internal operations, and manage soft-delete safety recovery.
        </p>
      </div>

      {/* Filter Toolbar */}
      <div className="bg-slate-900/20 border border-slate-900 rounded-2xl p-4 flex flex-col lg:flex-row gap-4 items-center justify-between">
        <div className="relative w-full lg:max-w-xs">
          <input
            type="text"
            placeholder="Search cases by content or ID..."
            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 pl-9 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
          />
          <span className="absolute left-3 top-2.5 text-slate-500 text-xs">🔍</span>
        </div>

        <div className="flex flex-wrap gap-3 w-full lg:w-auto">
          {/* Status Dropdown */}
          <div className="flex-1 lg:flex-initial">
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
          <div className="flex-1 lg:flex-initial">
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

      {/* Comprehensive Grievance Data Table */}
      <div className="bg-slate-900/10 border border-slate-900 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-900 text-[10px] font-bold text-slate-500 uppercase bg-slate-950/40">
                <th className="p-4">Case ID</th>
                <th className="p-4">Title</th>
                <th className="p-4">Category</th>
                <th className="p-4">Anonymity Guard</th>
                <th className="p-4">Submission Date</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-900/60 font-sans">
              {filtered.map(complaint => {
                const isUnlocked = unlockedCaseIds[complaint.id];
                return (
                  <tr
                    key={complaint.id}
                    className={`hover:bg-slate-900/20 transition-colors ${
                      complaint.isDeleted ? 'opacity-40 line-through bg-slate-950/40' : ''
                    }`}
                  >
                    <td className="p-4 font-mono font-bold text-cyan-400">
                      #{complaint.id.toUpperCase()}
                    </td>
                    <td className="p-4 font-semibold text-slate-200 max-w-xs truncate">
                      {complaint.title}
                    </td>
                    <td className="p-4 text-slate-400">
                      {complaint.category}
                    </td>
                    <td className="p-4">
                      {complaint.isAnonymous ? (
                        <div className="flex items-center gap-2">
                          <span className="text-amber-500" title="Protected Identity">🔒</span>
                          {isUnlocked ? (
                            <span className="text-[10px] text-red-400 font-bold bg-red-950/30 px-2 py-0.5 rounded border border-red-900/30">
                              Decrypted: Fahim (2022-2-60-089)
                            </span>
                          ) : (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleDecryption(complaint.id);
                              }}
                              className="text-[10px] text-slate-500 hover:text-cyan-400 hover:underline font-bold"
                            >
                              Decrypt ID
                            </button>
                          )}
                        </div>
                      ) : (
                        <span className="text-slate-400">👤 {complaint.submittedBy?.name || 'Public'}</span>
                      )}
                    </td>
                    <td className="p-4 text-slate-500">
                      {new Date(complaint.createdAt).toLocaleDateString()}
                    </td>
                    <td className="p-4">
                      <span className={`px-2 py-0.5 text-[9px] font-black rounded border ${
                        complaint.status === 'PENDING' ? 'bg-orange-500/10 text-orange-400 border-orange-500/20' :
                        complaint.status === 'UNDER_REVIEW' ? 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20' :
                        complaint.status === 'APPROVED' ? 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20' :
                        complaint.status === 'RESOLVED' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' :
                        complaint.status === 'ESCALATED' ? 'bg-purple-500/10 text-purple-400 border-purple-500/20' :
                        'bg-red-500/10 text-red-400 border-red-500/20'
                      }`}>
                        {complaint.status}
                      </span>
                    </td>
                    <td className="p-4 text-right space-x-2">
                      <button
                        onClick={() => setSelectedComplaint(complaint)}
                        className="px-2.5 py-1 bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-800 rounded font-bold text-[10px]"
                      >
                        Inspect
                      </button>
                      {complaint.isDeleted ? (
                        <button
                          onClick={() => handleRestoreCase(complaint.id)}
                          className="px-2.5 py-1 bg-emerald-950/40 text-emerald-400 border border-emerald-900/30 hover:bg-emerald-900 rounded font-bold text-[10px]"
                        >
                          🔄 Restore
                        </button>
                      ) : (
                        <button
                          onClick={() => handleSoftDelete(complaint.id)}
                          className="px-2.5 py-1 bg-red-950/40 text-red-400 border border-red-900/30 hover:bg-red-900 rounded font-bold text-[10px]"
                        >
                          Soft Delete
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {filtered.length === 0 && (
          <div className="py-16 text-center text-slate-500 text-xs">
            No complaints match the filter parameters.
          </div>
        )}
      </div>

      {/* Action Overlay Modal */}
      {selectedComplaint && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-5">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <div>
                <span className="text-[10px] font-mono text-cyan-400">Case Identifier: #{selectedComplaint.id.toUpperCase()}</span>
                <h3 className="text-base font-bold text-white mt-1">{selectedComplaint.title}</h3>
              </div>
              <button
                onClick={() => setSelectedComplaint(null)}
                className="text-slate-400 hover:text-white font-bold"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2">
              <div className="space-y-1">
                <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Narrative</h4>
                <p className="text-xs text-slate-300 bg-slate-950 p-4 border border-slate-800 rounded-xl leading-relaxed whitespace-pre-wrap">
                  {selectedComplaint.description}
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2 text-xs">
                <div>
                  <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Evidence Files</h4>
                  {selectedComplaint.evidences.length > 0 ? (
                    <div className="space-y-2">
                      {selectedComplaint.evidences.map(ev => (
                        <div
                          key={ev.id}
                          className="flex items-center justify-between p-2.5 bg-slate-950 border border-slate-800 rounded-xl"
                        >
                          <span className="font-semibold text-slate-300 truncate max-w-[150px]">📂 {ev.fileName}</span>
                          <span className="text-[9px] font-black text-cyan-400 uppercase">{ev.fileType}</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-slate-500 italic">No associated evidence files uploaded.</p>
                  )}
                </div>

                <div>
                  <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Internal Clearance</h4>
                  {selectedComplaint.isAnonymous ? (
                    <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl space-y-2">
                      <div className="flex items-center gap-2 text-amber-500 font-bold text-[11px]">
                        <span>🔒</span>
                        <span>Anonymity Guard Flagged Active</span>
                      </div>
                      {unlockedCaseIds[selectedComplaint.id] ? (
                        <div className="space-y-1 bg-red-950/20 border border-red-900/30 p-2.5 rounded-lg text-[11px]">
                          <div className="text-red-400 font-bold">Fahim Rahman</div>
                          <div className="text-slate-400 font-mono">ID: 2022-2-60-089</div>
                        </div>
                      ) : (
                        <button
                          onClick={() => setRevealModalOpen(true)}
                          className="w-full py-1.5 bg-red-950/40 border border-red-900/30 hover:bg-red-900 text-red-200 font-bold rounded-lg transition-all text-[10px]"
                        >
                          Verify credentials & Decrypt
                        </button>
                      )}
                    </div>
                  ) : (
                    <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl space-y-1.5 text-[11px]">
                      <div className="flex justify-between">
                        <span className="text-slate-500">Student:</span>
                        <span className="font-bold text-white">{selectedComplaint.submittedBy?.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">ID Number:</span>
                        <span className="font-mono text-cyan-400 font-bold">{selectedComplaint.submittedBy?.studentId}</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Status and Action Workflows */}
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Workflow State Transition</label>
                  <select
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
                    value={selectedComplaint.status}
                    onChange={e => handleStatusTransition(selectedComplaint.id, e.target.value as ComplaintStatus)}
                  >
                    <option value="PENDING">PENDING</option>
                    <option value="UNDER_REVIEW">UNDER_REVIEW</option>
                    <option value="APPROVED">APPROVED</option>
                    <option value="REJECTED">REJECTED</option>
                    <option value="RESOLVED">RESOLVED</option>
                    <option value="ESCALATED">ESCALATED</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Administrative Remarks</label>
                  <textarea
                    rows={2}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none focus:border-cyan-500 resize-none"
                    placeholder="Log audit notes or directives..."
                    value={selectedComplaint.adminRemarks || ''}
                    onChange={e => handleUpdateRemarks(selectedComplaint.id, e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-between pt-3 border-t border-slate-800">
              {selectedComplaint.isDeleted ? (
                <button
                  onClick={() => {
                    handleRestoreCase(selectedComplaint.id);
                    setSelectedComplaint(null);
                  }}
                  className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-xl text-xs"
                >
                  🔄 Restore Record
                </button>
              ) : (
                <button
                  onClick={() => {
                    handleSoftDelete(selectedComplaint.id);
                    setSelectedComplaint(null);
                  }}
                  className="px-4 py-2 bg-red-600 hover:bg-red-500 text-white font-bold rounded-xl text-xs"
                >
                  Soft Delete Case
                </button>
              )}
              <button
                onClick={() => setSelectedComplaint(null)}
                className="px-4 py-2 bg-slate-850 hover:bg-slate-800 text-slate-200 rounded-xl text-xs"
              >
                Close View
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Simulated De-anonymization Modal */}
      {revealModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
            <div className="border-b border-slate-800 pb-3 flex justify-between items-center">
              <h3 className="text-sm font-black text-red-400 uppercase tracking-wider">Investigative Reveal Override</h3>
              <button onClick={() => setRevealModalOpen(false)} className="text-slate-500 hover:text-white">✕</button>
            </div>

            <form onSubmit={handleRevealSubmit} className="space-y-4 text-xs">
              <p className="text-slate-400 leading-relaxed">
                Super Admin authentication code is required to bypass anonymity guard rails. This action will generate a CRITICAL security audit event.
              </p>
              
              <div className="space-y-1">
                <label className="font-bold text-slate-300">Super Admin Authorization Code</label>
                <input
                  type="password"
                  required
                  placeholder="Enter key code..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-100 placeholder-slate-600 focus:outline-none focus:border-red-500 font-mono tracking-widest"
                  value={authCode}
                  onChange={e => setAuthCode(e.target.value)}
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-300">Override Reason / Purpose</label>
                <textarea
                  required
                  rows={3}
                  placeholder="State the investigative rationale..."
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

              <div className="flex gap-3 justify-end pt-2">
                <button
                  type="button"
                  onClick={() => setRevealModalOpen(false)}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-red-500 hover:bg-red-400 text-slate-950 font-black rounded-xl"
                >
                  Verify & Decrypt
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
