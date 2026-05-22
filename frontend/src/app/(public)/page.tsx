import React from 'react';
import Link from 'next/link';
import { mockNotices } from '@/modules/notice/mock-notices';
import { mockEvents } from '@/modules/event/mock-events';

export default function HomePage() {
    return (
        <div className="min-h-screen bg-slate-950 text-slate-100">
            {/* Hero Section */}
            <section className="relative flex flex-col items-center justify-center text-center px-4 py-24 md:py-32 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-950">
                <div className="max-w-4xl mx-auto space-y-6">
                    <span className="px-4 py-1.5 text-xs font-semibold tracking-wider text-cyan-400 bg-cyan-950/50 border border-cyan-800 rounded-full uppercase">
                        The Voice of Students
                    </span>
                    <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
                        Empowering Northern University Students for Justice & Rights
                    </h1>
                    <p className="max-w-2xl mx-auto text-base md:text-xl text-slate-400 leading-relaxed">
                        Voice of Northern is dedicated to advocacy, securing rights, and fostering an inclusive community through action, events, and transparent solutions.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                        <Link
                            href="/register"
                            className="w-full sm:w-auto px-8 py-3.5 text-sm font-semibold text-slate-950 bg-cyan-400 hover:bg-cyan-300 transition-all rounded-lg text-center shadow-lg shadow-cyan-500/10"
                        >
                            Become Member
                        </Link>
                        <Link
                            href="/complaints"
                            className="w-full sm:w-auto px-8 py-3.5 text-sm font-semibold text-orange-400 border border-orange-500/30 bg-orange-950/20 hover:bg-orange-950/40 transition-all rounded-lg text-center"
                        >
                            Raise a Voice / Complaint
                        </Link>
                    </div>
                </div>
            </section>

            {/* Urgent / Latest Notice Section */}
            <section className="max-w-7xl mx-auto px-4 md:px-8 py-12">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h2 className="text-2xl md:text-3xl font-bold tracking-tight">Latest Announcements</h2>
                        <p className="text-slate-400 text-sm mt-1">Stay updated with critical university and campaign news.</p>
                    </div>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                    {mockNotices.map((notice) => (
                        <div
                            key={notice.id}
                            className={`p-6 rounded-xl border transition-all ${notice.priority === 'URGENT'
                                    ? 'bg-gradient-to-br from-slate-900 to-orange-950/20 border-orange-500/30'
                                    : 'bg-slate-900/60 border-slate-800'
                                }`}
                        >
                            <div className="flex items-center gap-3 mb-4">
                                <span className={`px-2.5 py-1 text-xs font-semibold rounded-md ${notice.priority === 'URGENT' ? 'bg-red-950 text-red-400' : 'bg-cyan-950 text-cyan-400'
                                    }`}>
                                    {notice.category}
                                </span>
                                <span className="text-xs text-slate-500">
                                    {new Date(notice.publishedAt).toLocaleDateString()}
                                </span>
                            </div>
                            <h3 className="text-xl font-bold tracking-tight text-white mb-2">{notice.title}</h3>
                            <p className="text-slate-400 text-sm line-clamp-3 leading-relaxed mb-4">{notice.content}</p>
                            <Link href={`/notices/${notice.id}`} className="text-xs font-semibold text-cyan-400 hover:underline">
                                Read Full Notice →
                            </Link>
                        </div>
                    ))}
                </div>
            </section>

            {/* Upcoming Events Section */}
            <section className="max-w-7xl mx-auto px-4 md:px-8 py-16 border-t border-slate-900">
                <div className="mb-10">
                    <h2 className="text-2xl md:text-3xl font-bold tracking-tight">Upcoming Events & Activism</h2>
                    <p className="text-slate-400 text-sm mt-1">Participate in campaigns, quiz tournaments, and assemblies.</p>
                </div>

                <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-2">
                    {mockEvents.map((event) => (
                        <div key={event.id} className="group overflow-hidden bg-slate-900/40 border border-slate-900 rounded-xl hover:border-slate-800 transition-all flex flex-col md:flex-row">
                            <div className="relative h-48 md:h-auto md:w-48 bg-slate-800 shrink-0 overflow-hidden">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                    src={event.bannerImage}
                                    alt={event.title}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                />
                            </div>
                            <div className="p-6 flex flex-col justify-between flex-1">
                                <div>
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-xs font-semibold text-cyan-400">{event.category}</span>
                                        <span className={`px-2 py-0.5 text-[10px] font-bold rounded ${event.type === 'FREE' ? 'bg-emerald-950 text-emerald-400' : 'bg-amber-950 text-amber-400'
                                            }`}>
                                            {event.type === 'PAID' ? `${event.price} BDT` : event.type.replace('_', ' ')}
                                        </span>
                                    </div>
                                    <h3 className="text-lg font-bold text-white mb-2 leading-snug">{event.title}</h3>
                                    <p className="text-slate-400 text-xs line-clamp-2 mb-4 leading-relaxed">{event.description}</p>
                                </div>
                                <div className="flex items-center justify-between pt-2 border-t border-slate-900 text-[11px] text-slate-500">
                                    <span>📍 {event.location}</span>
                                    <Link href={`/events/${event.id}`} className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 transition-colors">
                                        Register →
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}