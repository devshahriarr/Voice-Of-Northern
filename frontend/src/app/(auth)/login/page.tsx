'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // Forgot Password Modal State
    const [showForgotModal, setShowForgotModal] = useState(false);
    const [recoveryEmail, setRecoveryEmail] = useState('');
    const [recoverySent, setRecoverySent] = useState(false);

    const handleLoginSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Redirect to member dashboard via client-side routing
        router.push('/dashboard/profile');
    };

    const handleRecoverySubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!recoveryEmail.includes('@') || !recoveryEmail.includes('.')) {
            alert('Please enter a valid university email address.');
            return;
        }
        setRecoverySent(true);
        setTimeout(() => {
            setShowForgotModal(false);
            setRecoverySent(false);
            setRecoveryEmail('');
            alert('Password reset instructions have been dispatched to your email.');
        }, 1200);
    };

    return (
        <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center px-4 py-12 text-slate-100 relative">
            
            {/* Back to Home floating action */}
            <div className="absolute top-6 left-6">
                <Link href="/" className="text-xs text-slate-500 hover:text-cyan-400 font-bold transition-colors">
                    ← Back to Home
                </Link>
            </div>

            <div className="w-full max-w-md p-8 bg-slate-900/50 border border-slate-900 rounded-3xl space-y-6 shadow-2xl">
                <div className="text-center space-y-2">
                    <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-white animate-fade-in">Welcome Back</h1>
                    <p className="text-xs text-slate-400">Login to access your student portal and track actions</p>
                </div>

                <form className="space-y-4" onSubmit={handleLoginSubmit}>
                    <div className="space-y-1.5 text-xs font-sans">
                        <label className="font-semibold text-slate-350">University Email Address</label>
                        <input
                            type="email"
                            required
                            className="w-full bg-slate-950 border border-slate-850 rounded-xl px-4 py-3 text-sm text-slate-100 focus:outline-none focus:border-cyan-500 transition-colors"
                            placeholder="student@university.edu"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div className="space-y-1.5 text-xs font-sans">
                        <div className="flex items-center justify-between">
                            <label className="font-semibold text-slate-350">Password</label>
                            <button 
                                type="button" 
                                onClick={() => setShowForgotModal(true)} 
                                className="text-cyan-400 hover:underline font-bold"
                            >
                                Forgot?
                            </button>
                        </div>
                        <input
                            type="password"
                            required
                            className="w-full bg-slate-950 border border-slate-850 rounded-xl px-4 py-3 text-sm text-slate-100 focus:outline-none focus:border-cyan-500 transition-colors"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <button type="submit" className="w-full py-3.5 px-4 bg-cyan-400 text-slate-950 font-black rounded-xl hover:bg-cyan-300 transition-colors text-xs uppercase tracking-wider shadow-md">
                        Secure Sign In
                    </button>
                </form>

                <div className="relative flex py-1 items-center">
                    <div className="flex-grow border-t border-slate-900"></div>
                    <span className="flex-shrink mx-3 text-[9px] text-slate-500 uppercase font-black tracking-widest">Or Quick Access</span>
                    <div className="flex-grow border-t border-slate-900"></div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                    <button
                        type="button"
                        onClick={() => router.push('/dashboard/profile')}
                        className="py-2.5 px-3 bg-slate-950 hover:bg-slate-900 border border-slate-850 hover:border-cyan-500/30 text-cyan-400 font-bold rounded-xl text-[10px] uppercase tracking-wider transition-all text-center"
                    >
                        Login as Member
                    </button>
                    <button
                        type="button"
                        onClick={() => router.push('/admin/dashboard')}
                        className="py-2.5 px-3 bg-slate-950 hover:bg-slate-900 border border-slate-850 hover:border-rose-500/30 text-rose-400 font-bold rounded-xl text-[10px] uppercase tracking-wider transition-all text-center"
                    >
                        Login as Admin
                    </button>
                </div>

                <div className="text-center text-xs text-slate-505 border-t border-slate-900 pt-4">
                    Don&apos;t have an account?{' '}
                    <Link href="/register" className="text-cyan-400 hover:underline font-bold">Create Student Account</Link>
                </div>
            </div>

            {/* Forgot Password Overlay Modal */}
            {showForgotModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
                    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 max-w-sm w-full shadow-2xl space-y-4">
                        <div className="flex justify-between items-center pb-2 border-b border-slate-850">
                            <h3 className="text-sm font-bold text-white uppercase tracking-wider">Recover Password</h3>
                            <button onClick={() => setShowForgotModal(false)} className="text-slate-400 hover:text-white">✕</button>
                        </div>

                        <form onSubmit={handleRecoverySubmit} className="space-y-4 text-xs font-sans">
                            <p className="text-slate-450 leading-relaxed text-[11px]">
                                Input your registered academic email address. If an account matches, you will receive instructions to reset your passcode.
                            </p>
                            <div className="space-y-1">
                                <label className="font-semibold text-slate-350">Academic Email</label>
                                <input
                                    type="email"
                                    required
                                    placeholder="student@university.edu"
                                    className="w-full bg-slate-950 border border-slate-850 rounded-xl px-3 py-2 text-white"
                                    value={recoveryEmail}
                                    onChange={e => setRecoveryEmail(e.target.value)}
                                />
                            </div>
                            <button
                                type="submit"
                                className="w-full py-2.5 bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-black rounded-xl text-[10px] uppercase"
                            >
                                {recoverySent ? 'Dispatching Instructions...' : 'Reset Passcode'}
                            </button>
                        </form>
                    </div>
                </div>
            )}

        </div>
    );
}