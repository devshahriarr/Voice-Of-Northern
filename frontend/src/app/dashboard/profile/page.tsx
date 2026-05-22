'use client';

import React, { useState } from 'react';
import { mockPendingUser } from '@/modules/auth/mock-auth';
import FileUpload from '@/components/ui/file-upload';
import { validateEmail, validatePhone, sanitizeString } from '@/modules/validation/schemas';

export default function ProfilePage() {
  const [user, setUser] = useState({
    ...mockPendingUser,
    phone: '+8801712345678',
    avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=500'
  });

  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [phone, setPhone] = useState(user.phone);
  const [dept, setDept] = useState(user.department);
  const [avatarUrl, setAvatarUrl] = useState(user.avatarUrl);

  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const statusThemes = {
    PENDING: 'bg-amber-950/40 text-amber-400 border-amber-500/20',
    APPROVED: 'bg-emerald-950/40 text-emerald-400 border-emerald-500/20',
    REJECTED: 'bg-red-950/40 text-red-400 border-red-500/20',
  };

  const handleSaveChanges = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    // Validations
    if (!name.trim() || !dept.trim()) {
      setError('Name and Department cannot be empty.');
      return;
    }
    if (!validateEmail(email)) {
      setError('Please provide a valid email address.');
      return;
    }
    if (!validatePhone(phone)) {
      setError('Please provide a valid contact phone number.');
      return;
    }

    setUser(prev => ({
      ...prev,
      name: sanitizeString(name),
      email: sanitizeString(email),
      phone: sanitizeString(phone),
      department: sanitizeString(dept),
      avatarUrl
    }));

    setSuccess(true);
    setIsEditing(false);
    setTimeout(() => setSuccess(false), 3000);
  };

  return (
    <div className="space-y-8 animate-fade-in font-sans">
      <div>
        <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-white">Student Profile</h1>
        <p className="text-xs text-slate-400 mt-1">Manage your account verification, upload avatar picture, and configure settings.</p>
      </div>

      {/* Verification Status Banner */}
      <div className={`p-5 rounded-2xl border flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${statusThemes[user.status] || 'bg-slate-900 text-slate-400 border-slate-800'}`}>
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold tracking-wide text-white uppercase">Membership Status:</span>
            <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded bg-slate-950/40 border border-current">
              {user.status}
            </span>
          </div>
          <p className="text-xs opacity-80 leading-relaxed font-sans">
            {user.status === 'PENDING' && 'Your academic proof is being reviewed manually by our mod team.'}
            {user.status === 'APPROVED' && 'Congratulations! You have full access to members-only voting and features.'}
            {user.status === 'REJECTED' && 'Your registration has been rejected. Please contact support.'}
          </p>
        </div>
      </div>

      {success && (
        <div className="p-3 bg-emerald-950/40 border border-emerald-500/20 text-emerald-400 font-bold rounded-xl text-xs">
          ✓ Profile settings updated successfully.
        </div>
      )}

      {error && (
        <div className="p-3 bg-red-950/40 border border-red-900/30 text-red-400 font-bold rounded-xl text-xs">
          ⚠️ {error}
        </div>
      )}

      {/* Core Profile Card */}
      <div className="p-6 bg-slate-900/30 border border-slate-900 rounded-3xl space-y-6">
        <div className="flex justify-between items-center border-b border-slate-900 pb-3">
          <h3 className="text-xs font-black text-white uppercase tracking-widest">General Information</h3>
          <button
            onClick={() => {
              setIsEditing(!isEditing);
              setError(null);
            }}
            className="px-3.5 py-1.5 bg-slate-950 border border-slate-850 text-slate-300 hover:text-cyan-400 rounded-xl text-[10px] font-bold uppercase transition-colors"
          >
            {isEditing ? 'Cancel Edit' : 'Edit Profile'}
          </button>
        </div>

        {isEditing ? (
          <form onSubmit={handleSaveChanges} className="space-y-4 text-xs">
            {/* Avatar Upload Grid */}
            <div className="grid gap-6 sm:grid-cols-3 items-center">
              <div className="flex flex-col items-center justify-center space-y-2">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={avatarUrl}
                  alt={name}
                  className="w-20 h-20 rounded-full object-cover border-2 border-cyan-400"
                />
                <span className="text-[10px] text-slate-500">Avatar Preview</span>
              </div>
              <div className="sm:col-span-2">
                <FileUpload
                  accept="image/*"
                  maxSizeMB={2}
                  label="Select Profile Picture"
                  onUploadSuccess={url => setAvatarUrl(url)}
                />
              </div>
            </div>

            {/* Inputs Grid */}
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-1">
                <label className="font-bold text-slate-350">Full Name</label>
                <input
                  type="text"
                  className="w-full bg-slate-950 border border-slate-850 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-cyan-500 transition-colors"
                  value={name}
                  onChange={e => setName(e.target.value)}
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-350">Registered Email</label>
                <input
                  type="email"
                  className="w-full bg-slate-950 border border-slate-850 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-cyan-500 transition-colors"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-350">Phone Number</label>
                <input
                  type="tel"
                  className="w-full bg-slate-950 border border-slate-850 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-cyan-500 transition-colors"
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-350">Academic Department</label>
                <input
                  type="text"
                  className="w-full bg-slate-950 border border-slate-850 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-cyan-500 transition-colors"
                  value={dept}
                  onChange={e => setDept(e.target.value)}
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-black rounded-xl uppercase tracking-wider text-center transition-colors"
            >
              Save Profile Settings
            </button>
          </form>
        ) : (
          <div className="grid gap-6 sm:grid-cols-4 items-center">
            <div className="flex justify-center sm:justify-start">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={user.avatarUrl}
                alt={user.name}
                className="w-24 h-24 rounded-full object-cover border border-slate-800"
              />
            </div>
            
            <div className="sm:col-span-3 grid gap-6 sm:grid-cols-2 text-xs">
              <div className="space-y-1">
                <span className="font-bold text-slate-500">Full Name</span>
                <p className="text-slate-200 font-semibold">{user.name}</p>
              </div>
              <div className="space-y-1">
                <span className="font-bold text-slate-500">Registered Email</span>
                <p className="text-slate-200 font-semibold font-mono">{user.email}</p>
              </div>
              <div className="space-y-1">
                <span className="font-bold text-slate-500">Phone Number</span>
                <p className="text-slate-200 font-semibold font-mono">{user.phone}</p>
              </div>
              <div className="space-y-1">
                <span className="font-bold text-slate-500">Student ID</span>
                <p className="text-slate-200 font-semibold tracking-wide font-mono">{user.studentId}</p>
              </div>
              <div className="space-y-1">
                <span className="font-bold text-slate-500">Academic Department</span>
                <p className="text-slate-200 font-semibold">{user.department}</p>
              </div>
              <div className="space-y-1">
                <span className="font-bold text-slate-500">Batch / Timeline</span>
                <p className="text-slate-200 font-semibold font-mono">{user.batch}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}