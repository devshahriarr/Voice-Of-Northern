'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { mockComplaints } from '@/modules/complaint/mock-complaints';
import { Complaint } from '@/modules/complaint/types';

export default function PublicComplaintsPage() {
  const [complaintsList, setComplaintsList] = useState<Complaint[]>(mockComplaints);

  // Form Fields State
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<'ACADEMIC' | 'ADMINISTRATION' | 'FACILITIES' | 'HARASSMENT' | 'OTHERS'>('ACADEMIC');
  const [fullName, setFullName] = useState('');
  const [studentId, setStudentId] = useState('');
  const [dept, setDept] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [evidenceName, setEvidenceName] = useState('');
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedSuccess, setSubmittedSuccess] = useState(false);

  const handleSubmitComplaint = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) return;

    setIsSubmitting(true);

    const newId = `cmp-${Date.now()}`;
    const freshComplaint: Complaint = {
      id: newId,
      title,
      description,
      isAnonymous,
      status: 'PENDING',
      category,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      submittedBy: isAnonymous ? undefined : {
        name: fullName || 'Anonymous Student',
        studentId: studentId || 'N/A',
        department: dept || 'N/A'
      },
      evidences: evidenceName ? [
        {
          id: `ev-${Date.now()}`,
          fileUrl: '/docs/placeholder.pdf',
          fileType: 'PDF',
          fileName: evidenceName
        }
      ] : []
    };

    // Prepend to database simulation
    mockComplaints.unshift(freshComplaint);
    
    setTimeout(() => {
      setComplaintsList([freshComplaint, ...complaintsList]);
      setIsSubmitting(false);
      setSubmittedSuccess(true);

      // Clear fields
      setTitle('');
      setDescription('');
      setFullName('');
      setStudentId('');
      setDept('');
      setEmail('');
      setPhone('');
      setEvidenceName('');
      setTimeout(() => setSubmittedSuccess(false), 4000);
    }, 800);
  };

  // Only APPROVED/RESOLVED/UNDER_REVIEW/PENDING complaints will list
  const visibleComplaints = complaintsList.filter(
    c => c.status === 'APPROVED' || c.status === 'RESOLVED' || c.status === 'UNDER_REVIEW' || c.status === 'PENDING'
  );

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 px-4 md:px-8 py-16">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="border-b border-slate-900 pb-5">
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

        {/* Double Column Grid */}
        <div className="grid gap-8 lg:grid-cols-12 items-start">
          
          {/* Left Column: Complaint form */}
          <div className="lg:col-span-5 bg-slate-900/30 border border-slate-900 rounded-3xl p-6 space-y-6">
            <div className="border-b border-slate-800 pb-3">
              <h2 className="text-sm font-black text-white uppercase tracking-wider">Lodger Form</h2>
              <p className="text-[10px] text-slate-500 mt-0.5">Submit details safely. Choose anonymous state to shield identity.</p>
            </div>

            {submittedSuccess && (
              <div className="p-3 bg-emerald-950/30 border border-emerald-500/20 text-emerald-400 rounded-xl text-xs font-semibold">
                ✓ Complaint lodged successfully! Administrative roles will verify and post to active timeline shortly.
              </div>
            )}

            <form onSubmit={handleSubmitComplaint} className="space-y-4 text-xs">
              
              {/* Anonymity Toggle */}
              <div className="p-3.5 bg-slate-950 rounded-2xl border border-slate-900 flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-white flex items-center gap-1.5">
                    <span>🔒</span>
                    <span>Submit Anonymously</span>
                  </h4>
                  <p className="text-[9px] text-slate-500 mt-0.5">Mask your name, student ID, and contact details from the feed.</p>
                </div>
                <input
                  type="checkbox"
                  className="w-4 h-4 rounded border-slate-800 bg-slate-900 text-cyan-400 focus:ring-0 cursor-pointer"
                  checked={isAnonymous}
                  onChange={e => setIsAnonymous(e.target.checked)}
                />
              </div>

              {/* Identity details (Optional or disabled if checked) */}
              <div className={`space-y-3.5 ${isAnonymous ? 'opacity-40 pointer-events-none' : ''}`}>
                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="space-y-1">
                    <label className="font-bold text-slate-300">Your Full Name</label>
                    <input
                      type="text"
                      placeholder="Rahat Chowdhury"
                      className="w-full bg-slate-950 border border-slate-850 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-cyan-500"
                      value={fullName}
                      onChange={e => setFullName(e.target.value)}
                      required={!isAnonymous}
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="font-bold text-slate-300">Student ID</label>
                    <input
                      type="text"
                      placeholder="2023-1-60-044"
                      className="w-full bg-slate-950 border border-slate-850 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-cyan-500"
                      value={studentId}
                      onChange={e => setStudentId(e.target.value)}
                      required={!isAnonymous}
                    />
                  </div>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="space-y-1">
                    <label className="font-bold text-slate-300">Department</label>
                    <input
                      type="text"
                      placeholder="CSE / Pharmacy"
                      className="w-full bg-slate-950 border border-slate-850 rounded-xl px-3 py-2 text-white"
                      value={dept}
                      onChange={e => setDept(e.target.value)}
                      required={!isAnonymous}
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="font-bold text-slate-300">Contact Phone</label>
                    <input
                      type="text"
                      placeholder="+88017..."
                      className="w-full bg-slate-950 border border-slate-850 rounded-xl px-3 py-2 text-white"
                      value={phone}
                      onChange={e => setPhone(e.target.value)}
                      required={!isAnonymous}
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-300">Official Email</label>
                  <input
                    type="email"
                    placeholder="student@university.edu"
                    className="w-full bg-slate-950 border border-slate-850 rounded-xl px-3 py-2 text-white"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required={!isAnonymous}
                  />
                </div>
              </div>

              {/* Core Complaint Info */}
              <div className="space-y-3.5 pt-2 border-t border-slate-900">
                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="space-y-1">
                    <label className="font-bold text-slate-300">Complaint Category</label>
                    <select
                      className="w-full bg-slate-950 border border-slate-850 rounded-xl px-3 py-2 text-slate-300 focus:outline-none"
                      value={category}
                      onChange={e => setCategory(e.target.value as any)}
                    >
                      <option value="ACADEMIC">ACADEMIC POLICY</option>
                      <option value="FACILITIES">CAMPUS FACILITIES</option>
                      <option value="HARASSMENT">CAMPUS SAFETY</option>
                      <option value="ADMINISTRATION">ADMINISTRATIVE TELEMETRY</option>
                      <option value="OTHERS">OTHERS / GENERAL</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="font-bold text-slate-300">Grievance Title</label>
                    <input
                      type="text"
                      required
                      placeholder="Brief topic summary..."
                      className="w-full bg-slate-950 border border-slate-850 rounded-xl px-3 py-2 text-white"
                      value={title}
                      onChange={e => setTitle(e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-300">Detailed Narrative</label>
                  <textarea
                    required
                    rows={5}
                    placeholder="Explain the incident, specifying dates, classroom numbers, or administrative rules involved..."
                    className="w-full bg-slate-950 border border-slate-850 rounded-xl p-3 text-white leading-relaxed font-sans"
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                  />
                </div>

                {/* Evidence mock upload */}
                <div className="space-y-1.5">
                  <label className="font-bold text-slate-400">Mock Evidence (Drag & Drop PDF/JPEG max 5MB)</label>
                  <div className="relative border border-dashed border-slate-850 rounded-xl p-3 bg-slate-950/80 text-center text-slate-500 cursor-pointer">
                    <input
                      type="file"
                      accept="image/*,.pdf"
                      className="absolute inset-0 opacity-0 cursor-pointer"
                      onChange={e => e.target.files && setEvidenceName(e.target.files[0].name)}
                    />
                    <span>{evidenceName ? `Attached: ${evidenceName}` : 'Add Proof File'}</span>
                  </div>
                </div>

              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-black rounded-xl text-center uppercase tracking-wider transition-colors"
              >
                {isSubmitting ? 'Submitting Grievance...' : 'Submit Complaint'}
              </button>

            </form>
          </div>

          {/* Right Column: Actions Feed */}
          <div className="lg:col-span-7 space-y-5">
            <div className="border-b border-slate-900 pb-3 flex justify-between items-center">
              <h2 className="text-sm font-black text-white uppercase tracking-wider">Community Complaints Stream</h2>
              <span className="text-[10px] font-mono text-slate-500">{visibleComplaints.length} Total Logs</span>
            </div>

            <div className="space-y-4 max-h-[75vh] overflow-y-auto pr-1">
              {visibleComplaints.map(cmp => (
                <div
                  key={cmp.id}
                  className="p-5 bg-slate-900/20 border border-slate-900 rounded-2xl hover:border-slate-800 transition-all space-y-4"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-3">
                      <span className="px-2.5 py-0.5 bg-slate-950 border border-slate-850 rounded text-[10px] font-bold text-slate-400 tracking-wider">
                        #{cmp.category}
                      </span>
                      <span className="text-xs text-slate-500 font-mono">{new Date(cmp.createdAt).toLocaleDateString()}</span>
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
                    <h3 className="text-sm sm:text-base font-extrabold text-white tracking-tight hover:text-cyan-400 transition-colors">
                      <Link href={`/complaints/${cmp.id}`}>{cmp.title}</Link>
                    </h3>
                    <p className="text-slate-400 text-xs sm:text-sm line-clamp-2 leading-relaxed">{cmp.description}</p>
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
    </div>
  );
}