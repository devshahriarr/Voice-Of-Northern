'use client';
import React, { useState } from 'react';
import { mockPendingUser } from '@/modules/auth/mock-auth';

export default function ProfilePage() {
    // Using mock state to demonstrate the UI condition
    const [user] = useState(mockPendingUser);

    const statusThemes = {
        PENDING: 'bg-amber-950/40 text-amber-400 border-amber-500/20',
        APPROVED: 'bg-emerald-950/40 text-emerald-400 border-emerald-500/20',
        REJECTED: 'bg-red-950/40 text-red-400 border-red-500/20',
    };

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-white">Student Profile</h1>
                <p className="text-xs text-slate-400 mt-1">Manage your account verification and personal details.</p>
            </div>

            {/* Verification Status Banner */}
            <div className={`p-5 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${statusThemes[user.status] || 'bg-slate-900 text-slate-400 border-slate-800'}`}>
                <div className="space-y-1">
                    <div className="flex items-center gap-2">
                        <span className="text-sm font-bold tracking-wide">Membership Status:</span>
                        <span className="text-xs font-black uppercase tracking-wider px-2 py-0.5 rounded bg-slate-950/40 border border-current">
                            {user.status}
                        </span>
                    </div>
                    <p className="text-xs opacity-80 leading-relaxed">
                        {user.status === 'PENDING' && 'Your academic proof is being reviewed manually by our mod team.'}
                        {user.status === 'APPROVED' && 'Congratulations! You have full access to members-only voting and features.'}
                        {user.status === 'REJECTED' && 'Your registration has been rejected. Please contact support.'}
                    </p>
                </div>
            </div>

            {/* Profile Overview Card */}
            <div className="p-6 bg-slate-900/30 border border-slate-900 rounded-2xl space-y-6">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider border-b border-slate-900 pb-3">General Information</h3>

                <div className="grid gap-6 sm:grid-cols-2 text-sm">
                    <div className="space-y-1">
                        <span className="text-xs text-slate-500 font-medium">Full Name</span>
                        <p className="text-slate-200 font-semibold">{user.name}</p>
                    </div>
                    <div className="space-y-1">
                        <span className="text-xs text-slate-500 font-medium">Registered Email</span>
                        <p className="text-slate-200 font-semibold">{user.email}</p>
                    </div>

                    <div className="space-y-1">
                        <span className="text-xs text-slate-500 font-medium">Student ID</span>
                        <p className="text-slate-200 font-semibold tracking-wide">{user.studentId}</p>
                    </div>
                    <div className="space-y-1">
                        <span className="text-xs text-slate-500 font-medium">Academic Department</span>
                        <p className="text-slate-200 font-semibold">{user.department}</p>
                    </div>
                    <div className="space-y-1 sm:col-span-2">
                        <span className="text-xs text-slate-500 font-medium">Batch / Timeline</span>
                        <p className="text-slate-200 font-semibold">{user.batch}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}