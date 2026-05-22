import React from 'react';

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-slate-950 text-slate-100 px-4 md:px-8 py-16">
            <div className="max-w-4xl mx-auto space-y-12">
                <header className="space-y-4 text-center md:text-left">
                    <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white">About Voice of Northern</h1>
                    <p className="text-slate-400 text-lg leading-relaxed">
                        The standard-bearer for justice, structural transparency, and total academic accountability at Northern University.
                    </p>
                </header>

                <section className="grid gap-6 md:grid-cols-2">
                    <div className="p-6 bg-slate-900/50 border border-slate-900 rounded-xl">
                        <h2 className="text-xl font-bold text-cyan-400 mb-3">Our Mission</h2>
                        <p className="text-slate-400 text-sm leading-relaxed">
                            To operate as an uncompromising institutional platform that defends student welfare, acts as a centralized reporting hub against corruption, and empowers leadership through structured organizational governance.
                        </p>
                    </div>
                    <div className="p-6 bg-slate-900/50 border border-slate-900 rounded-xl">
                        <h2 className="text-xl font-bold text-orange-400 mb-3">Our Vision</h2>
                        <p className="text-slate-400 text-sm leading-relaxed">
                            To transform the traditional student movement landscape into a digital-first support architecture, optimizing accessibility, tracking, and fast resolution workflows for campus grievances.
                        </p>
                    </div>
                </section>

                <section className="space-y-4">
                    <h2 className="text-2xl font-bold text-white tracking-tight">Core Pillars of Action</h2>
                    <div className="space-y-3">
                        {[
                            { title: "Student Advocacy", desc: "Raising organized voices against academic disparities and arbitrary administration policy updates." },
                            { title: "Complaint Management", desc: "A robust, highly secure anonymous reporting system ensuring protection for whistleblowers." },
                            { title: "Community Enlistment", desc: "Hosting national-level tournaments, student magazines, and skill development forums." }
                        ].map((pillar, i) => (
                            <div key={i} className="p-4 bg-slate-900/30 border border-slate-900/80 rounded-lg flex gap-4">
                                <span className="text-cyan-500 font-bold">0{i + 1}.</span>
                                <div>
                                    <h4 className="text-sm font-semibold text-white">{pillar.title}</h4>
                                    <p className="text-xs text-slate-400 mt-1 leading-relaxed">{pillar.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
}