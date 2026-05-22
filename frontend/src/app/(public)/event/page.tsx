'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { mockEvents } from '@/modules/event/mock-events';
import { EventType } from '@/modules/event/types';

export default function PublicEventsPage() {
    const [activeTab, setActiveTab] = useState<EventType | 'ALL'>('ALL');

    const filteredEvents = activeTab === 'ALL'
        ? mockEvents
        : mockEvents.filter(event => event.type === activeTab);

    return (
        <div className="min-h-screen bg-slate-950 text-slate-100 px-4 md:px-8 py-16">
            <div className="max-w-6xl mx-auto space-y-8">

                {/* Header Block */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-900 pb-6">
                    <div>
                        <h1 className="text-3xl font-extrabold tracking-tight text-white">Campus Events & Assemblies</h1>
                        <p className="text-sm text-slate-400 mt-1">Open to all students. No account required for general participation.</p>
                    </div>

                    {/* Filtering Tabs */}
                    <div className="flex flex-wrap gap-2">
                        {['ALL', 'FREE', 'OPEN_CONTRIBUTION', 'PAID'].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab as any)}
                                className={`px-4 py-2 text-xs font-bold rounded-xl border transition-all ${activeTab === tab
                                        ? 'bg-cyan-400 text-slate-950 border-cyan-400'
                                        : 'bg-slate-900/40 text-slate-400 border-slate-900 hover:border-slate-800'
                                    }`}
                            >
                                {tab === 'ALL' ? 'All Events' : tab.replace('_', ' ')}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Grid Layout */}
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {filteredEvents.map((event) => (
                        <div key={event.id} className="group bg-slate-900/20 border border-slate-900 rounded-2xl overflow-hidden flex flex-col justify-between hover:border-slate-800 transition-all">
                            <div className="relative h-44 bg-slate-950 overflow-hidden">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img src={event.bannerImage} alt={event.title} className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300" />
                                <span className="absolute top-3 right-3 px-2.5 py-0.5 text-[10px] font-black tracking-wide uppercase bg-slate-950/80 backdrop-blur-sm border border-slate-800 rounded text-cyan-400">
                                    {event.type === 'PAID' ? `${event.price} BDT` : event.type.replace('_', ' ')}
                                </span>
                            </div>

                            <div className="p-5 space-y-4 flex-1 flex flex-col justify-between">
                                <div className="space-y-2">
                                    <span className="text-[10px] font-bold text-cyan-500 uppercase tracking-wider">{event.category}</span>
                                    <h3 className="text-lg font-bold text-white tracking-tight leading-snug line-clamp-2">{event.title}</h3>
                                    <p className="text-slate-400 text-xs line-clamp-2 leading-relaxed">{event.description}</p>
                                </div>

                                <div className="pt-3 border-t border-slate-900 flex flex-col gap-2 text-[11px] text-slate-500">
                                    <div className="flex items-center justify-between">
                                        <span>📅 {new Date(event.eventDate).toLocaleDateString()}</span>
                                        <span>📍 {event.location}</span>
                                    </div>
                                    <Link
                                        href={`/events/${event.id}`}
                                        className="w-full mt-1 py-2.5 text-center bg-cyan-400 text-slate-950 font-bold rounded-xl hover:bg-cyan-300 transition-all block text-xs shadow-md shadow-cyan-400/5"
                                    >
                                        Join / Register Now
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </div>
    );
}