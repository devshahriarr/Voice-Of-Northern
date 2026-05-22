'use client';
import React, { useState } from 'react';
import { mockEvents } from '@/modules/event/mock-events';
import { notFound } from 'next/navigation';

export default function PublicEventRegistrationFormPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = React.use(params);
    const event = mockEvents.find(e => e.id === id);

    // Public user identification parameters (Mandatory since registration doesn't require site login)
    const [guestInfo, setGuestInfo] = useState({
        fullName: '',
        studentId: '',
        email: '',
        department: ''
    });

    const [paymentMethod, setPaymentMethod] = useState('BKASH');
    const [transactionId, setTransactionId] = useState('');
    const [contributionAmount, setContributionAmount] = useState('');
    const [screenshot, setScreenshot] = useState<File | null>(null);
    const [isRegistered, setIsRegistered] = useState(false);

    if (!event) notFound();

    const requiresPayment = event.type === 'PAID' || event.type === 'OPEN_CONTRIBUTION';

    const handleFormSubmission = (e: React.FormEvent) => {
        e.preventDefault();
        // Payload compiles guestInfo + payment verification parameters into registration storage engine
        setIsRegistered(true);
    };

    if (isRegistered) {
        return (
            <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4 text-slate-100">
                <div className="w-full max-w-md p-8 bg-slate-900/50 border border-emerald-500/20 rounded-2xl text-center space-y-4">
                    <div className="text-4xl">🎉</div>
                    <h1 className="text-xl font-bold text-emerald-400">Registration Request Dispatched!</h1>
                    <p className="text-xs text-slate-400 leading-relaxed">
                        Thank you, <span className="text-slate-200 font-bold">{guestInfo.fullName}</span>.{' '}
                        {requiresPayment
                            ? 'Our event manager role will verify your manual transaction index matching the reference ID. Expect verification feedback via email soon.'
                            : 'Your ticket assignment is verified. An official seat confirmation log has been pushed to your email.'}
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-950 text-slate-100 px-4 md:px-8 py-16">
            <div className="max-w-5xl mx-auto grid gap-8 md:grid-cols-5">

                {/* Event Meta Briefing Card */}
                <div className="md:col-span-3 space-y-6">
                    <div className="relative h-64 bg-slate-950 border border-slate-900 rounded-2xl overflow-hidden">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={event.bannerImage} alt={event.title} className="w-full h-full object-cover" />
                    </div>
                    <div className="space-y-2">
                        <span className="text-[10px] font-black uppercase bg-slate-900 text-cyan-400 border border-slate-800 px-2.5 py-1 rounded">
                            {event.category}
                        </span>
                        <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-white">{event.title}</h1>
                        <p className="text-slate-400 text-sm leading-relaxed whitespace-pre-wrap">{event.description}</p>
                    </div>
                    <div className="grid gap-4 sm:grid-cols-2 text-xs text-slate-400 bg-slate-900/20 border border-slate-900 p-4 rounded-xl">
                        <div>📅 <span className="font-semibold text-slate-200">Date:</span> {new Date(event.eventDate).toLocaleString()}</div>
                        <div>📍 <span className="font-semibold text-slate-200">Location Venue:</span> {event.location}</div>
                    </div>
                </div>

                {/* Public Dynamic Registration Form Window */}
                <div className="md:col-span-2 p-6 bg-slate-900/40 border border-slate-900 rounded-2xl h-fit space-y-6">
                    <div className="border-b border-slate-900 pb-3">
                        <h3 className="text-sm font-bold text-white uppercase tracking-wider">Pass Registration Form</h3>
                        <p className="text-[10px] text-slate-500 mt-0.5">No website account required. Open to all students.</p>
                    </div>

                    <form className="space-y-4" onSubmit={handleFormSubmission}>

                        {/* Guest Identity Information (Required for everyone since no mandatory session auth) */}
                        <div className="space-y-3 border-b border-slate-900/60 pb-4">
                            <div className="space-y-1">
                                <label className="text-[11px] font-semibold text-slate-400">Full Name</label>
                                <input
                                    type="text" required
                                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-100 focus:outline-none focus:border-cyan-500 transition-colors"
                                    placeholder="e.g., Rahat Chowdhury"
                                    value={guestInfo.fullName}
                                    onChange={(e) => setGuestInfo({ ...guestInfo, fullName: e.target.value })}
                                />
                            </div>
                            <div className="grid gap-3 sm:grid-cols-2">
                                <div className="space-y-1">
                                    <label className="text-[11px] font-semibold text-slate-400">Student ID</label>
                                    <input
                                        type="text" required
                                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-100 focus:outline-none focus:border-cyan-500 transition-colors"
                                        placeholder="202X-X-XX-XXX"
                                        value={guestInfo.studentId}
                                        onChange={(e) => setGuestInfo({ ...guestInfo, studentId: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-[11px] font-semibold text-slate-400">Department</label>
                                    <input
                                        type="text" required
                                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-100 focus:outline-none focus:border-cyan-500 transition-colors"
                                        placeholder="BBA / EEE / Law"
                                        value={guestInfo.department}
                                        onChange={(e) => setGuestInfo({ ...guestInfo, department: e.target.value })}
                                    />
                                </div>
                            </div>
                            <div className="space-y-1">
                                <label className="text-[11px] font-semibold text-slate-400">Active Email Address (For Ticket Delivery)</label>
                                <input
                                    type="email" required
                                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-100 focus:outline-none focus:border-cyan-500 transition-colors"
                                    placeholder="student-handle@gmail.com"
                                    value={guestInfo.email}
                                    onChange={(e) => setGuestInfo({ ...guestInfo, email: e.target.value })}
                                />
                            </div>
                        </div>

                        {/* Conditional Payment Ledger Fields */}
                        {requiresPayment && (
                            <div className="space-y-3.5 pt-1">
                                <div className="p-3 bg-amber-950/20 border border-amber-500/20 rounded-xl text-[10px] text-amber-400 leading-relaxed">
                                    <p className="font-bold">💳 Wallet Payment Required:</p>
                                    <p>Send {event.type === 'PAID' ? `${event.price} BDT` : 'your choice donation value'} to our merchant number:</p>
                                    <p className="font-mono bg-slate-950 text-slate-200 p-1 rounded text-center text-xs tracking-wider mt-1 font-bold">+88017XXXXXXXX (Bkash/Nagad)</p>
                                </div>

                                {event.type === 'OPEN_CONTRIBUTION' && (
                                    <div className="space-y-1">
                                        <label className="text-[11px] font-semibold text-slate-400">Contribution Amount (BDT)</label>
                                        <input
                                            type="number" required min={20}
                                            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-100 focus:outline-none focus:border-cyan-500 transition-colors"
                                            placeholder="Enter amount..."
                                            value={contributionAmount}
                                            onChange={(e) => setContributionAmount(e.target.value)}
                                        />
                                    </div>
                                )}

                                <div className="space-y-1">
                                    <label className="text-[11px] font-semibold text-slate-400">Gateway Provider</label>
                                    <select
                                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-100 focus:outline-none focus:border-cyan-500 transition-colors"
                                        value={paymentMethod}
                                        onChange={(e) => setPaymentMethod(e.target.value)}
                                    >
                                        <option value="BKASH">Bkash</option>
                                        <option value="NAGAD">Nagad</option>
                                    </select>
                                </div>

                                <div className="space-y-1">
                                    <label className="text-[11px] font-semibold text-slate-400">Transaction ID (TxnID)</label>
                                    <input
                                        type="text" required
                                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-100 focus:outline-none focus:border-cyan-500 transition-colors font-mono tracking-wide"
                                        placeholder="e.g., TRX98271A"
                                        value={transactionId}
                                        onChange={(e) => setTransactionId(e.target.value)}
                                    />
                                </div>

                                <div className="space-y-1">
                                    <label className="text-[11px] font-semibold text-slate-400 font-sans">Upload Receipt Screenshot (Optional)</label>
                                    <div className="relative border border-dashed border-slate-800 rounded-xl p-2.5 bg-slate-950 text-center text-[10px] text-slate-500 cursor-pointer">
                                        <input type="file" accept="image/*" className="absolute inset-0 opacity-0 cursor-pointer" onChange={(e) => e.target.files && setScreenshot(e.target.files[0])} />
                                        <span>{screenshot ? `Ready: ${screenshot.name}` : 'Click to bind optional verification snapshot'}</span>
                                    </div>
                                </div>
                            </div>
                        )}

                        <button type="submit" className="w-full py-3 bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold rounded-xl transition-colors text-xs shadow-md">
                            Complete Pass Registration
                        </button>
                    </form>
                </div>

            </div>
        </div>
    );
}