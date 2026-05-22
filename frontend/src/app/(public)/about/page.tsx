import React from 'react';
import Link from 'next/link';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 px-4 md:px-8 py-16">
      <div className="max-w-4xl mx-auto space-y-12 animate-fade-in">
        
        {/* Header */}
        <header className="space-y-4 text-center md:text-left">
          <span className="px-3 py-1 text-[10px] font-bold tracking-wider text-cyan-400 bg-cyan-950/40 border border-cyan-900/30 rounded-full uppercase">
            Our Foundation
          </span>
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white mt-2">About Voice of Northern</h1>
          <p className="text-slate-400 text-lg leading-relaxed font-sans">
            The standard-bearer for justice, structural transparency, and total academic accountability at Northern University.
          </p>
        </header>

        {/* Mission and Vision Grid */}
        <section className="grid gap-6 md:grid-cols-2">
          <div className="p-6 bg-slate-900/50 border border-slate-900 rounded-2xl">
            <h2 className="text-xl font-bold text-cyan-400 mb-3">Our Mission</h2>
            <p className="text-slate-400 text-sm leading-relaxed font-sans">
              To operate as an uncompromising institutional platform that defends student welfare, acts as a centralized reporting hub against corruption, and empowers leadership through structured organizational governance.
            </p>
          </div>
          <div className="p-6 bg-slate-900/50 border border-slate-900 rounded-2xl">
            <h2 className="text-xl font-bold text-orange-400 mb-3">Our Vision</h2>
            <p className="text-slate-400 text-sm leading-relaxed font-sans">
              To transform the traditional student movement landscape into a digital-first support architecture, optimizing accessibility, tracking, and fast resolution workflows for campus grievances.
            </p>
          </div>
        </section>

        {/* Pillars */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-white tracking-tight">Core Pillars of Action</h2>
          <div className="space-y-3">
            {[
              { title: "Student Advocacy", desc: "Raising organized voices against academic disparities and arbitrary administration policy updates." },
              { title: "Complaint Management", desc: "A robust, highly secure anonymous reporting system ensuring protection for whistleblowers." },
              { title: "Community Enlistment", desc: "Hosting national-level tournaments, student student-run blogs, and skill development forums." }
            ].map((pillar, i) => (
              <div key={i} className="p-4 bg-slate-900/30 border border-slate-900/80 rounded-2xl flex gap-4">
                <span className="text-cyan-500 font-bold font-mono">0{i + 1}.</span>
                <div>
                  <h4 className="text-sm font-semibold text-white">{pillar.title}</h4>
                  <p className="text-xs text-slate-400 mt-1 leading-relaxed font-sans">{pillar.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Leadership Preview Section */}
        <section className="p-6 bg-slate-900/20 border border-slate-900 rounded-3xl space-y-6">
          <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 border-b border-slate-900 pb-4">
            <div>
              <h2 className="text-xl font-bold text-white tracking-tight">Our Administrative Panel</h2>
              <p className="text-xs text-slate-400 mt-1 font-sans">The coordinators guiding policy negotiations and platform engineering.</p>
            </div>
            <Link
              href="/about/team"
              className="px-4 py-2 bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-black text-xs rounded-xl uppercase tracking-wider text-center transition-all"
            >
              Full Team Directory
            </Link>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="p-4 bg-slate-950/80 border border-slate-900 rounded-2xl flex items-center gap-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500"
                alt="Sajid Al Hasan"
                className="w-12 h-12 rounded-full object-cover border border-slate-800"
              />
              <div>
                <h4 className="text-xs font-black text-white uppercase tracking-wider">Sajid Al Hasan</h4>
                <p className="text-[10px] text-cyan-400 font-bold">Super Admin & Coordinator</p>
              </div>
            </div>

            <div className="p-4 bg-slate-950/80 border border-slate-900 rounded-2xl flex items-center gap-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500"
                alt="Tanvir Ahmed"
                className="w-12 h-12 rounded-full object-cover border border-slate-800"
              />
              <div>
                <h4 className="text-xs font-black text-white uppercase tracking-wider">Tanvir Ahmed</h4>
                <p className="text-[10px] text-cyan-400 font-bold">Admin & Lead Engineer</p>
              </div>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}