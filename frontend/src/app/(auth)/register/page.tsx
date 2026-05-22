'use client';
import React, { useState } from 'react';
import Link from 'next/link';

export default function RegisterPage() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        studentId: '',
        department: '',
        batch: '',
        password: '',
    });
    const [idCardFile, setIdCardFile] = useState<File | null>(null);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleRegisterSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Later this will send formData and file to backend multipart signup API
        setIsSubmitted(true);
    };

    if (isSubmitted) {
        return (
            <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4 text-slate-100">
                <div className="w-full max-w-md p-8 bg-slate-900/50 border border-amber-500/20 rounded-2xl text-center space-y-4">
                    <div className="text-4xl">⏳</div>
                    <h1 className="text-xl font-bold text-amber-400">Application Submitted Successfully!</h1>
                    <p className="text-xs text-slate-400 leading-relaxed">
                        Your registration acts as your membership request. Our admin panel is manually verifying your Student ID and Department credentials. You will be able to login once approved.
                    </p>
                    <Link href="/login" className="inline-block mt-2 text-xs font-semibold text-cyan-400 hover:underline">
                        ← Return to Login Screen
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center px-4 py-16 text-slate-100 relative">
            
            {/* Back to Home floating action */}
            <div className="absolute top-6 left-6">
                <Link href="/" className="text-xs text-slate-500 hover:text-cyan-400 font-bold transition-colors">
                    ← Back to Home
                </Link>
            </div>

            <div className="w-full max-w-lg p-8 bg-slate-900/50 border border-slate-900 rounded-2xl space-y-6">
                <div className="text-center space-y-2">
                    <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-white">Join Voice of Northern</h1>
                    <p className="text-xs text-slate-400">Register with academic telemetry for unified membership request</p>
                </div>

                <form className="space-y-4" onSubmit={handleRegisterSubmit}>
                    <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-slate-300">Full Name</label>
                        <input
                            type="text" required
                            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-100 focus:outline-none focus:border-cyan-500 transition-colors"
                            placeholder="Alex Morgan"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        />
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                        <div className="space-y-1.5">
                            <label className="text-xs font-semibold text-slate-300">Student ID</label>
                            <input
                                type="text" required
                                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-100 focus:outline-none focus:border-cyan-500 transition-colors"
                                placeholder="2024-1-60-001"
                                value={formData.studentId}
                                onChange={(e) => setFormData({ ...formData, studentId: e.target.value })}
                            />
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-xs font-semibold text-slate-300">Department</label>
                            <input
                                type="text" required
                                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-100 focus:outline-none focus:border-cyan-500 transition-colors"
                                placeholder="CSE / EEE / Pharmacy"
                                value={formData.department}
                                onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                            />
                        </div>
                    </div>

                    <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-slate-300">Batch / Semester Title</label>
                        <input
                            type="text" required
                            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-100 focus:outline-none focus:border-cyan-500 transition-colors"
                            placeholder="56th Batch / 3rd Year"
                            value={formData.batch}
                            onChange={(e) => setFormData({ ...formData, batch: e.target.value })}
                        />
                    </div>

                    <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-slate-300">University Official Email</label>
                        <input
                            type="email" required
                            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-100 focus:outline-none focus:border-cyan-500 transition-colors"
                            placeholder="alex.cse@university.edu"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        />
                    </div>

                    {/* Unified ID verification file upload widget */}
                    <div className="space-y-2">
                        <label className="text-xs font-semibold text-slate-300">Upload Student ID Card Photo (JPEG/PNG/PDF max 5MB)</label>
                        <div className="border border-dashed border-slate-800 hover:border-cyan-500/50 rounded-xl p-5 bg-slate-950 text-center cursor-pointer transition-colors relative">
                            <input
                                type="file" required
                                accept="image/*,.pdf"
                                className="absolute inset-0 opacity-0 cursor-pointer"
                                onChange={(e) => e.target.files && setIdCardFile(e.target.files[0])}
                            />
                            <p className="text-xs text-slate-300 font-medium">
                                {idCardFile ? `Selected: ${idCardFile.name}` : 'Click or drag file to upload proof'}
                            </p>
                        </div>
                    </div>

                    <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-slate-300">Password (Min 8 Characters)</label>
                        <input
                            type="password" required minLength={8}
                            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-100 focus:outline-none focus:border-cyan-500 transition-colors"
                            placeholder="••••••••"
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        />
                    </div>

                    <button type="submit" className="w-full py-3.5 px-4 bg-cyan-400 text-slate-950 font-bold rounded-xl hover:bg-cyan-300 transition-colors text-sm">
                        Submit Registration & Membership Request
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