'use client';
import React, { useState } from 'react';
import Link from 'next/link';

export default function RegisterPage() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        studentId: '',
        department: '',
        password: '',
    });

    const handleRegisterSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Will be verified manually by Admin/Moderator workflow as per SRS [cite: 214, 255]
    };

    return (
        <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4 py-16 text-slate-100">
            <div className="w-full max-w-lg p-8 bg-slate-900/50 border border-slate-900 rounded-2xl space-y-6">
                <div className="text-center space-y-2">
                    <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-white">Join Voice of Northern</h1>
                    <p className="text-xs text-slate-400">Register with valid academic credentials for manual verification [cite: 214, 215, 245]</p>
                </div>

                <form className="space-y-4" onSubmit={handleRegisterSubmit}>
                    <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-slate-300">Full Name</label>
                        <input
                            type="text"
                            required
                            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-100 focus:outline-none focus:border-cyan-500 transition-colors"
                            placeholder="Alex Morgan"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        />
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                        <div className="space-y-1.5">
                            <label className="text-xs font-semibold text-slate-300">Student ID [cite: 252]</label>
                            <input
                                type="text"
                                required
                                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-100 focus:outline-none focus:border-cyan-500 transition-colors"
                                placeholder="2026-1-60-001"
                                value={formData.studentId}
                                onChange={(e) => setFormData({ ...formData, studentId: e.target.value })}
                            />
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-xs font-semibold text-slate-300">Department [cite: 251]</label>
                            <input
                                type="text"
                                required
                                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-100 focus:outline-none focus:border-cyan-500 transition-colors"
                                placeholder="CSE / EEE / BBA"
                                value={formData.department}
                                onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                            />
                        </div>
                    </div>

                    <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-slate-300">Official Email</label>
                        <input
                            type="email"
                            required
                            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-100 focus:outline-none focus:border-cyan-500 transition-colors"
                            placeholder="alex.cse@university.edu"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        />
                    </div>

                    <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-slate-300">Password (Min 8 Characters)</label>
                        <input
                            type="password"
                            required
                            minLength={8}
                            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-100 focus:outline-none focus:border-cyan-500 transition-colors"
                            placeholder="••••••••"
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        />
                    </div>

                    <button type="submit" className="w-full py-3.5 px-4 bg-cyan-400 text-slate-950 font-semibold rounded-xl hover:bg-cyan-300 transition-colors text-sm font-bold">
                        Submit Registration Request
                    </button>
                </form>

                <div className="text-center text-xs text-slate-500 border-t border-slate-900 pt-4">
                    Already have an account?{' '}
                    <Link href="/login" className="text-cyan-400 hover:underline font-medium">Sign In</Link>
                </div>
            </div>
        </div>
    );
}