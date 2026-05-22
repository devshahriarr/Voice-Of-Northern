"use client";

import React from 'react';

export default function ContactPage() {
    return (
        <div className="min-h-screen bg-slate-950 text-slate-100 px-4 md:px-8 py-16">
            <div className="max-w-5xl mx-auto grid gap-12 md:grid-cols-5">
                <div className="md:col-span-2 space-y-6">
                    <div>
                        <h1 className="text-3xl font-extrabold tracking-tight text-white">Get in Touch</h1>
                        <p className="text-slate-400 text-sm mt-2 leading-relaxed">
                            Have questions, issues, or want to host a joint venture with Voice of Northern? Drop us a message.
                        </p>
                    </div>

                    <div className="space-y-4 text-sm text-slate-400">
                        <div className="flex items-center gap-3 p-3.5 bg-slate-900/40 border border-slate-900 rounded-lg">
                            <span className="text-cyan-400 font-bold">📍 Office:</span>
                            <span>Student Union Building, Floor 2, Northern University Campus</span>
                        </div>
                        <div className="flex items-center gap-3 p-3.5 bg-slate-900/40 border border-slate-900 rounded-lg">
                            <span className="text-cyan-400 font-bold">✉️ Email:</span>
                            <span>contact@voiceofnorthern.org</span>
                        </div>
                        <div className="flex items-center gap-3 p-3.5 bg-slate-900/40 border border-slate-900 rounded-lg">
                            <span className="text-cyan-400 font-bold">💬 Support:</span>
                            <span>Official Facebook Page Messenger Channel</span>
                        </div>
                    </div>
                </div>

                <div className="md:col-span-3 p-6 bg-slate-900/40 border border-slate-900 rounded-xl">
                    <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                        <div className="grid gap-4 sm:grid-cols-2">
                            <div className="space-y-2">
                                <label className="text-xs font-semibold text-slate-300">Your Name</label>
                                <input type="text" className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2.5 text-sm text-slate-100 focus:outline-none focus:border-cyan-500 transition-colors" placeholder="John Doe" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-semibold text-slate-300">Student ID (Optional)</label>
                                <input type="text" className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2.5 text-sm text-slate-100 focus:outline-none focus:border-cyan-500 transition-colors" placeholder="202X-X-XX-XXX" />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-semibold text-slate-300">Email Address</label>
                            <input type="email" className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2.5 text-sm text-slate-100 focus:outline-none focus:border-cyan-500 transition-colors" placeholder="student@university.edu" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-semibold text-slate-300">Message Context</label>
                            <textarea rows={4} className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2.5 text-sm text-slate-100 focus:outline-none focus:border-cyan-500 transition-colors resize-none" placeholder="Elaborate your inquiry details here..."></textarea>
                        </div>
                        <button type="submit" className="w-full py-3 px-4 bg-cyan-400 text-slate-950 font-semibold rounded-lg hover:bg-cyan-300 transition-colors text-sm">
                            Send Secure Message
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}