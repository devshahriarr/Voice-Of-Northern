'use client';
import React, { useState } from 'react';
import Link from 'next/link';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // Forgot Password Modal State
    const [showForgotModal, setShowForgotModal] = useState(false);
    const [recoveryEmail, setRecoveryEmail] = useState('');
    const [recoverySent, setRecoverySent] = useState(false);

    const handleLoginSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Redirect to dashboard on login simulation
        window.location.href = '/dashboard/profile';
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

            <div className="w-full max-w-md p-8 bg-slate-900/50 border border-slate-900 rounded-2xl space-y-6">
                <div className="text-center space-y-2">
                    <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-white animate-fade-in">Welcome Back</h1>
                    <p className="text-xs text-slate-400">Login to access your student portal and track actions</p>
                </div>

                <form className="space-y-4" onSubmit={handleLoginSubmit}>
                    <div className="space-y-1.5 text-xs">
                        <label className="font-semibold text-slate-300">University Email Address</label>
                        <input
                            type="email"
                            required
                            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-100 focus:outline-none focus:border-cyan-500 transition-colors"
                            placeholder="student@university.edu"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div className="space-y-1.5 text-xs">
                        <div className="flex items-center justify-between">
                            <label className="font-semibold text-slate-300">Password</label>
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
                            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-100 focus:outline-none focus:border-cyan-500 transition-colors"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <button type="submit" className="w-full py-3.5 px-4 bg-cyan-400 text-slate-950 font-black rounded-xl hover:bg-cyan-300 transition-colors text-xs uppercase tracking-wider shadow-md">
                        Secure Sign In
                    </button>
                </form>

                <div className="text-center text-xs text-slate-500 border-t border-slate-900 pt-4">
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

                        <form onSubmit={handleRecoverySubmit} className="space-y-4 text-xs">
                            <p className="text-slate-400 leading-relaxed text-[11px]">
                                Input your registered academic email address. If an account matches, you will receive instructions to reset your passcode.
                            </p>
                            <div className="space-y-1">
                                <label className="font-semibold text-slate-300">Academic Email</label>
                                <input
                                    type="email"
                                    required
                                    placeholder="student@university.edu"
                                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white"
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