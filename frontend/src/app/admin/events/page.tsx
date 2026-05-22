'use client';
import React, { useState } from 'react';
import { mockEvents as initialEvents } from '@/modules/event/mock-events';
import { Event } from '@/modules/event/types';

interface TicketRegistration {
    id: string;
    studentName: string;
    studentId: string;
    department: string;
    email: string;
    eventName: string;
    paymentMethod: string;
    transactionId: string;
    amount: number;
    screenshotUrl?: string;
    status: 'PENDING' | 'VERIFIED' | 'REJECTED';
    submittedAt: string;
}

const initialRegistrations: TicketRegistration[] = [
    {
        id: 'reg-01',
        studentName: 'Rahat Chowdhury',
        studentId: '2023-1-60-044',
        department: 'Computer Science & Engineering',
        email: 'rahat.c@gmail.com',
        eventName: 'VON Campus General Assembly 2026',
        paymentMethod: 'BKASH',
        transactionId: 'TRX98271A',
        amount: 250,
        screenshotUrl: 'https://images.unsplash.com/photo-1628157582853-a796fa650a6a?w=500',
        status: 'PENDING',
        submittedAt: '2026-05-22T08:30:00Z'
    },
    {
        id: 'reg-02',
        studentName: 'Nusrat Jahan Mitu',
        studentId: '2024-2-80-012',
        department: 'Pharmacy',
        email: 'mitu.pharm@gmail.com',
        eventName: 'Advocacy & Human Rights Workshop',
        paymentMethod: 'NAGAD',
        transactionId: 'NAG99128K',
        amount: 0,
        status: 'PENDING',
        submittedAt: '2026-05-22T06:15:00Z'
    },
    {
        id: 'reg-03',
        studentName: 'Istiaque Ahmed',
        studentId: '2023-3-30-089',
        department: 'Electrical & Electronic Engineering',
        email: 'istiaque.eee@gmail.com',
        eventName: 'VON Campus General Assembly 2026',
        paymentMethod: 'BKASH',
        transactionId: 'TRX88721X',
        amount: 250,
        screenshotUrl: 'https://images.unsplash.com/photo-1628157582853-a796fa650a6a?w=500',
        status: 'VERIFIED',
        submittedAt: '2026-05-21T18:40:00Z'
    }
];

export default function AdminEventsPage() {
    const [events, setEvents] = useState<Event[]>(initialEvents);
    const [registrations, setRegistrations] = useState<TicketRegistration[]>(initialRegistrations);
    const [activeTab, setActiveTab] = useState<'EVENTS' | 'PAYMENT_QUEUE'>('EVENTS');
    const [regFilter, setRegFilter] = useState<'PENDING' | 'VERIFIED' | 'REJECTED'>('PENDING');

    // Add Event Form State
    const [showAddForm, setShowAddForm] = useState(false);
    const [newEvent, setNewEvent] = useState({
        title: '',
        description: '',
        eventDate: '',
        location: '',
        type: 'FREE' as 'FREE' | 'PAID' | 'OPEN_CONTRIBUTION',
        price: '',
        category: 'ACADEMIC' as 'ACADEMIC' | 'ADVOCACY' | 'CONFERENCE' | 'CULTURAL' | 'OTHERS',
        bannerImage: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800'
    });

    const handleVerifyTicket = (id: string, approve: boolean) => {
        setRegistrations(prev =>
            prev.map(r => (r.id === id ? { ...r, status: approve ? 'VERIFIED' : 'REJECTED' } : r))
        );
    };

    const handleAddEventSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const eventId = `evt-${Date.now()}`;
        const newObj: Event = {
            id: eventId,
            title: newEvent.title,
            description: newEvent.description,
            eventDate: newEvent.eventDate,
            location: newEvent.location,
            type: newEvent.type,
            price: newEvent.type === 'PAID' ? Number(newEvent.price) : undefined,
            category: newEvent.category,
            bannerImage: newEvent.bannerImage,
            registrationDeadline: newEvent.eventDate
        };
        setEvents(prev => [newObj, ...prev]);
        setShowAddForm(false);
        // Reset form
        setNewEvent({
            title: '',
            description: '',
            eventDate: '',
            location: '',
            type: 'FREE',
            price: '',
            category: 'ACADEMIC',
            bannerImage: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800'
        });
    };

    const filteredRegs = registrations.filter(r => r.status === regFilter);

    return (
        <div className="space-y-6 max-w-7xl mx-auto">
            {/* Header */}
            <div className="border-b border-slate-900 pb-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-white">
                        Events & Operations Manager
                    </h1>
                    <p className="text-xs text-slate-400 mt-1">
                        Schedule campus events, edit listings, and verify manual Bkash/Nagad ticketing receipts.
                    </p>
                </div>

                <div className="flex bg-slate-950 p-1 rounded-xl border border-slate-900 self-start sm:self-auto">
                    <button
                        onClick={() => setActiveTab('EVENTS')}
                        className={`px-4 py-2 text-xs font-bold rounded-lg transition-all ${
                            activeTab === 'EVENTS'
                                ? 'bg-cyan-400 text-slate-950 shadow-md shadow-cyan-400/10'
                                : 'text-slate-400 hover:text-slate-200'
                        }`}
                    >
                        Active Events
                    </button>
                    <button
                        onClick={() => setActiveTab('PAYMENT_QUEUE')}
                        className={`px-4 py-2 text-xs font-bold rounded-lg transition-all ${
                            activeTab === 'PAYMENT_QUEUE'
                                ? 'bg-cyan-400 text-slate-950 shadow-md shadow-cyan-400/10'
                                : 'text-slate-400 hover:text-slate-200'
                        }`}
                    >
                        Ticketing Approvals
                    </button>
                </div>
            </div>

            {/* TAB 1: Events Manager */}
            {activeTab === 'EVENTS' && (
                <div className="space-y-6">
                    <div className="flex justify-between items-center">
                        <h3 className="text-sm font-bold text-white uppercase tracking-wider">Scheduled Campaigns ({events.length})</h3>
                        <button
                            onClick={() => setShowAddForm(!showAddForm)}
                            className="px-4 py-2 bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold rounded-xl text-xs transition-colors"
                        >
                            {showAddForm ? 'Cancel Form' : 'Schedule New Event'}
                        </button>
                    </div>

                    {/* Add Event Form Modal/Panel */}
                    {showAddForm && (
                        <form onSubmit={handleAddEventSubmit} className="bg-slate-900/30 border border-slate-900 rounded-2xl p-6 space-y-4 max-w-2xl text-xs">
                            <h4 className="text-sm font-bold text-white uppercase tracking-wider border-b border-slate-800 pb-2 mb-2">Schedule Campaign</h4>
                            
                            <div className="grid gap-4 sm:grid-cols-2">
                                <div className="space-y-1">
                                    <label className="font-bold text-slate-300">Campaign Title</label>
                                    <input
                                        type="text" required
                                        placeholder="e.g., General Assembly"
                                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-100 placeholder-slate-600 focus:outline-none focus:border-cyan-500"
                                        value={newEvent.title}
                                        onChange={e => setNewEvent({ ...newEvent, title: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-1">
                                    <label className="font-bold text-slate-300">Event Date & Time</label>
                                    <input
                                        type="datetime-local" required
                                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-100 focus:outline-none focus:border-cyan-500"
                                        value={newEvent.eventDate}
                                        onChange={e => setNewEvent({ ...newEvent, eventDate: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div className="space-y-1">
                                <label className="font-bold text-slate-300">Event Description</label>
                                <textarea
                                    required rows={3}
                                    placeholder="Enter campaign particulars..."
                                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-100 placeholder-slate-600 focus:outline-none focus:border-cyan-500"
                                    value={newEvent.description}
                                    onChange={e => setNewEvent({ ...newEvent, description: e.target.value })}
                                />
                            </div>

                            <div className="grid gap-4 sm:grid-cols-3">
                                <div className="space-y-1">
                                    <label className="font-bold text-slate-300">Venue Location</label>
                                    <input
                                        type="text" required
                                        placeholder="e.g., Auditorium Hall"
                                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-100 placeholder-slate-600 focus:outline-none focus:border-cyan-500"
                                        value={newEvent.location}
                                        onChange={e => setNewEvent({ ...newEvent, location: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-1">
                                    <label className="font-bold text-slate-300">Access Category</label>
                                    <select
                                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-100 focus:outline-none focus:border-cyan-500"
                                        value={newEvent.type}
                                        onChange={e => setNewEvent({ ...newEvent, type: e.target.value as 'FREE' | 'PAID' | 'OPEN_CONTRIBUTION' })}
                                    >
                                        <option value="FREE">Free Pass</option>
                                        <option value="PAID">Paid Entry Ticket</option>
                                        <option value="OPEN_CONTRIBUTION">Open Contribution</option>
                                    </select>
                                </div>
                                {newEvent.type === 'PAID' && (
                                    <div className="space-y-1">
                                        <label className="font-bold text-slate-300">Ticket Price (BDT)</label>
                                        <input
                                            type="number" required
                                            placeholder="e.g., 250"
                                            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-100 focus:outline-none focus:border-cyan-500"
                                            value={newEvent.price}
                                            onChange={e => setNewEvent({ ...newEvent, price: e.target.value })}
                                        />
                                    </div>
                                )}
                            </div>

                            <button
                                type="submit"
                                className="px-5 py-2.5 bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-black rounded-xl"
                            >
                                Publish Event
                            </button>
                        </form>
                    )}

                    {/* Events list */}
                    <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                        {events.map(event => (
                            <div
                                key={event.id}
                                className="bg-slate-900/30 border border-slate-900 rounded-2xl overflow-hidden flex flex-col justify-between hover:border-slate-800 transition-all"
                            >
                                <div className="h-40 bg-slate-950 relative">
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img src={event.bannerImage} alt={event.title} className="w-full h-full object-cover" />
                                    <span className="absolute top-3 right-3 px-2 py-0.5 text-[9px] font-black uppercase bg-slate-950/80 backdrop-blur-sm border border-slate-800 text-cyan-400 rounded">
                                        {event.type}
                                    </span>
                                </div>
                                <div className="p-5 space-y-4">
                                    <div className="space-y-1">
                                        <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">{event.category}</span>
                                        <h4 className="text-sm font-bold text-white leading-tight line-clamp-1">{event.title}</h4>
                                    </div>
                                    <div className="space-y-1.5 text-xs text-slate-400 bg-slate-950/60 p-3 rounded-xl border border-slate-900/50">
                                        <div>📅 <span className="text-slate-500">Date:</span> {new Date(event.eventDate).toLocaleDateString()}</div>
                                        <div>📍 <span className="text-slate-500">Venue:</span> {event.location}</div>
                                        {event.price && <div>💳 <span className="text-slate-500">Price:</span> {event.price} BDT</div>}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* TAB 2: Ticketing Approvals Queue */}
            {activeTab === 'PAYMENT_QUEUE' && (
                <div className="space-y-6">
                    {/* Sub-Filters */}
                    <div className="flex gap-2">
                        {(['PENDING', 'VERIFIED', 'REJECTED'] as const).map(f => (
                            <button
                                key={f}
                                onClick={() => setRegFilter(f)}
                                className={`px-4 py-1.5 rounded-lg border text-xs font-bold transition-all ${
                                    regFilter === f
                                        ? 'bg-cyan-950 text-cyan-400 border-cyan-500/20'
                                        : 'bg-slate-900/40 text-slate-400 border-slate-900'
                                }`}
                            >
                                {f} Queue
                            </button>
                        ))}
                    </div>

                    {/* Registrations List */}
                    <div className="space-y-4">
                        {filteredRegs.map(reg => (
                            <div
                                key={reg.id}
                                className="bg-slate-900/30 border border-slate-900 rounded-2xl p-5 grid gap-5 md:grid-cols-4 items-center hover:border-slate-800 transition-all"
                            >
                                <div className="md:col-span-2 space-y-1 text-xs">
                                    <h4 className="font-bold text-white">{reg.studentName}</h4>
                                    <p className="font-mono text-cyan-400 text-[10px]">{reg.studentId} • {reg.department}</p>
                                    <p className="text-slate-400 mt-1">Registering for: <span className="text-slate-200 font-bold">{reg.eventName}</span></p>
                                </div>

                                <div className="space-y-1 text-xs">
                                    <div className="flex justify-between md:block">
                                        <span className="text-slate-500 md:block">Method:</span>
                                        <span className="font-bold font-mono text-white">{reg.paymentMethod}</span>
                                    </div>
                                    <div className="flex justify-between md:block">
                                        <span className="text-slate-500 md:block">Txn ID:</span>
                                        <span className="font-bold font-mono text-cyan-400">{reg.transactionId}</span>
                                    </div>
                                </div>

                                <div className="flex items-center justify-end gap-3 text-xs">
                                    {reg.status === 'PENDING' ? (
                                        <>
                                            <button
                                                onClick={() => handleVerifyTicket(reg.id, true)}
                                                className="px-4 py-2 bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold rounded-xl"
                                            >
                                                Verify Payment
                                            </button>
                                            <button
                                                onClick={() => handleVerifyTicket(reg.id, false)}
                                                className="px-4 py-2 bg-red-950/40 border border-red-900/30 hover:bg-red-900 text-red-200 font-bold rounded-xl"
                                            >
                                                Reject
                                            </button>
                                        </>
                                    ) : (
                                        <span className={`px-3 py-1 text-[10px] font-black rounded border ${
                                            reg.status === 'VERIFIED'
                                                ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                                                : 'bg-red-500/10 text-red-400 border-red-500/20'
                                        }`}>
                                            {reg.status}
                                        </span>
                                    )}
                                </div>
                            </div>
                        ))}

                        {filteredRegs.length === 0 && (
                            <div className="py-12 text-center border border-dashed border-slate-900 rounded-2xl text-slate-500 text-xs">
                                No registrations in this queue.
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
