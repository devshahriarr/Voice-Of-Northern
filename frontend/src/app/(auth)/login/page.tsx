'use client';
import React, { useState } from 'react';
import Link from 'next/link';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLoginSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Logic will route to API authentication module later
    };

    return (
        <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4 py-12 text-slate-100">
            <div className="w-full max-w-md p-8 bg-slate-900/50 border border-slate-900 rounded-2xl space-y-6">
                <div className="text-center space-y-2">
                    <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-white">Welcome Back</h1>
                    <p className="text-xs text-slate-400">Login to access your student portal and track actions</p>
                </div>

                <form className="space-y-4" onSubmit={handleLoginSubmit}>
                    <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-slate-300">University Email Address</label>
                        <input
                            type="email"
                            required
                            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-100 focus:outline-none focus:border-cyan-500 transition-colors"
                            placeholder="student@university.edu"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div className="space-y-1.5">
                        <div className="flex items-center justify-between">
                            <label className="text-xs font-semibold text-slate-300">Password</label>
                            <Link href="/forgot-password" className="text-xs text-cyan-400 hover:underline">Forgot?</Link>
                        </div>
                        <input
                            type="password"
                            required
                            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-100 focus:outline-none focus:border-cyan-500 transition-colors"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <button type="submit" className="w-full py-3 px-4 bg-cyan-400 text-slate-950 font-semibold rounded-xl hover:bg-cyan-300 transition-colors text-sm shadow-md shadow-cyan-500/5">
                        Secure Sign In
                    </button>
                </form>

                <div className="text-center text-xs text-slate-500 border-t border-slate-900 pt-4">
                    Don&apos;t have an account?{' '}
                    <Link href="/register" className="text-cyan-400 hover:underline font-medium">Create Student Account</Link>
                </div>
            </div>
        </div>
    );
}