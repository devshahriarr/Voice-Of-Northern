'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { mockComplaints } from '@/modules/complaint/mock-complaints';
import { Complaint } from '@/modules/complaint/types';
import FileUpload from '@/components/ui/file-upload';
import { validatePhone, validateEmail, sanitizeString } from '@/modules/validation/schemas';

export default function LodgeComplaintPage() {
  const router = useRouter();

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
  const [evidenceUrl, setEvidenceUrl] = useState('');
  const [evidenceName, setEvidenceName] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    // Validations
    if (!title.trim() || !description.trim()) {
      setError('Please provide a complaint title and narrative.');
      return;
    }
    if (!fullName.trim() || !studentId.trim() || !dept.trim()) {
      setError('Please specify your name, student ID, and department.');
      return;
    }
    if (!validateEmail(email)) {
      setError('Please enter a valid official email address.');
      return;
    }
    if (!validatePhone(phone)) {
      setError('Please enter a valid contact phone number.');
      return;
    }

    setIsSubmitting(true);

    const newId = `cmp-${Date.now()}`;
    
    // Sanitized submission values
    const sanitizedName = sanitizeString(fullName);
    const sanitizedStudentId = sanitizeString(studentId);
    const sanitizedDept = sanitizeString(dept);

    const freshComplaint: Complaint = {
      id: newId,
      title: sanitizeString(title),
      description: sanitizeString(description),
      isAnonymous,
      status: 'PENDING',
      category,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      submittedBy: {
        name: sanitizedName || 'Anonymous Student',
        studentId: sanitizedStudentId || 'N/A',
        department: sanitizedDept || 'N/A'
      },
      evidences: evidenceUrl ? [
        {
          id: `ev-${Date.now()}`,
          fileUrl: evidenceUrl,
          fileType: 'PDF',
          fileName: evidenceName || 'proof_document.pdf'
        }
      ] : []
    };

    // Prepend to database simulation
    mockComplaints.unshift(freshComplaint);

    setTimeout(() => {
      setIsSubmitting(false);
      setSuccess(true);
      
      // Reset form
      setTitle('');
      setDescription('');
      setFullName('');
      setStudentId('');
      setDept('');
      setEmail('');
      setPhone('');
      setEvidenceUrl('');
      setEvidenceName('');

      // Redirect after message
      setTimeout(() => {
        router.push('/complaints');
      }, 2000);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 px-4 md:px-8 py-16">
      <div className="max-w-xl mx-auto space-y-6">
        
        {/* Navigation Breadcrumb */}
        <div className="flex justify-between items-center text-xs">
          <Link href="/complaints" className="text-slate-500 hover:text-cyan-400 transition-colors font-bold">
            ← Back to Feed
          </Link>
          <span className="text-slate-650 font-mono">FR-CMP-10 Standard</span>
        </div>

        {/* Form Container */}
        <div className="bg-slate-900/30 border border-slate-900 rounded-3xl p-6 sm:p-8 space-y-6 animate-fade-in shadow-2xl">
          
          <div className="border-b border-slate-800 pb-3">
            <span className="px-2.5 py-0.5 text-[8px] font-black tracking-wider text-orange-400 bg-orange-950/40 border border-orange-900/30 rounded-full uppercase">
              Secure Lodger Intake
            </span>
            <h1 className="text-2xl font-black text-white mt-1.5 uppercase tracking-wide">Lodge a Grievance</h1>
            <p className="text-[10px] text-slate-400 mt-1 font-sans">
              Provide your details and narrative. Anonymity switches shield student info from public feeds.
            </p>
          </div>

          {error && (
            <div className="p-3 bg-red-950/40 border border-red-900/30 text-red-400 font-bold rounded-xl text-[11px]">
              ⚠️ {error}
            </div>
          )}

          {success && (
            <div className="p-3 bg-emerald-950/40 border border-emerald-500/20 text-emerald-400 font-bold rounded-xl text-[11px]">
              ✓ Grievance lodged successfully! Redirecting you back to feed...
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4 text-xs font-sans">
            
            {/* Identity details (Remains enabled even if checked as Anonymous) */}
            <div className="space-y-3.5 bg-slate-950/40 p-4 border border-slate-850 rounded-2xl">
              <div className="flex items-center justify-between border-b border-slate-900 pb-2">
                <span className="font-bold text-slate-300 uppercase text-[10px]">User Verification Details</span>
                <span className="text-[9px] text-slate-600">Admin Audit Logs Protected</span>
              </div>

              <div className="grid gap-3.5 sm:grid-cols-2">
                <div className="space-y-1">
                  <label className="font-bold text-slate-400">Your Full Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Rahat Chowdhury"
                    className="w-full bg-slate-950 border border-slate-850 rounded-xl px-3.5 py-2 text-white focus:outline-none focus:border-cyan-500 transition-colors"
                    value={fullName}
                    onChange={e => setFullName(e.target.value)}
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-slate-400">Student ID Number</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 2023-1-60-044"
                    className="w-full bg-slate-950 border border-slate-850 rounded-xl px-3.5 py-2 text-white focus:outline-none focus:border-cyan-500 transition-colors"
                    value={studentId}
                    onChange={e => setStudentId(e.target.value)}
                  />
                </div>
              </div>

              <div className="grid gap-3.5 sm:grid-cols-2">
                <div className="space-y-1">
                  <label className="font-bold text-slate-400">Department</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. CSE"
                    className="w-full bg-slate-950 border border-slate-850 rounded-xl px-3.5 py-2 text-white focus:outline-none focus:border-cyan-500 transition-colors"
                    value={dept}
                    onChange={e => setDept(e.target.value)}
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-slate-400">Contact Phone</label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. +88017..."
                    className="w-full bg-slate-950 border border-slate-850 rounded-xl px-3.5 py-2 text-white focus:outline-none focus:border-cyan-500 transition-colors"
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-400">Official University Email</label>
                <input
                  type="email"
                  required
                  placeholder="student@university.edu"
                  className="w-full bg-slate-950 border border-slate-850 rounded-xl px-3.5 py-2 text-white focus:outline-none focus:border-cyan-500 transition-colors"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                />
              </div>
            </div>

            {/* Anonymity Switch */}
            <div className="p-3.5 bg-slate-950 border border-slate-850 rounded-2xl flex items-center justify-between">
              <div>
                <h4 className="font-bold text-white flex items-center gap-1.5 uppercase text-[10px]">
                  <span>🔒</span>
                  <span>Submit Anonymously</span>
                </h4>
                <p className="text-[9px] text-slate-500 mt-0.5 leading-relaxed font-sans">
                  The feed displays this complaint anonymously. Only Super Admins can audit your identity details internally.
                </p>
              </div>
              <input
                type="checkbox"
                className="w-5 h-5 rounded-lg border-slate-850 bg-slate-950 text-cyan-400 focus:ring-0 cursor-pointer"
                checked={isAnonymous}
                onChange={e => setIsAnonymous(e.target.checked)}
              />
            </div>

            {/* Core Complaint Details */}
            <div className="space-y-3.5">
              <div className="grid gap-3.5 sm:grid-cols-2">
                <div className="space-y-1">
                  <label className="font-bold text-slate-350">Complaint Category</label>
                  <select
                    className="w-full bg-slate-950 border border-slate-850 rounded-xl px-3 py-2 text-slate-300 focus:outline-none focus:border-cyan-500 transition-colors"
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
                  <label className="font-bold text-slate-350">Grievance Title</label>
                  <input
                    type="text"
                    required
                    placeholder="Brief topic summary..."
                    className="w-full bg-slate-950 border border-slate-850 rounded-xl px-3.5 py-2 text-white focus:outline-none focus:border-cyan-500 transition-colors"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-355">Detailed Narrative</label>
                <textarea
                  required
                  rows={5}
                  placeholder="Explain the incident with context: dates, classes involved, etc."
                  className="w-full bg-slate-950 border border-slate-850 rounded-xl p-3.5 text-white leading-relaxed resize-none font-sans focus:outline-none focus:border-cyan-500 transition-colors"
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                />
              </div>

              {/* Reusable FileUpload component */}
              <FileUpload
                accept="application/pdf,image/*"
                maxSizeMB={5}
                label="Evidence File Upload"
                onUploadSuccess={(url, name) => {
                  setEvidenceUrl(url);
                  setEvidenceName(name);
                }}
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-black rounded-xl text-center uppercase tracking-wider transition-colors shadow-lg"
            >
              {isSubmitting ? 'Dispatching Grievance...' : 'Submit Secure Complaint'}
            </button>

          </form>

        </div>

      </div>
    </div>
  );
}
