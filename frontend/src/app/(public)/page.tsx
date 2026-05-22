'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { mockNotices } from '@/modules/notice/mock-notices';
import { mockEvents } from '@/modules/event/mock-events';
import { mockPosts } from '@/modules/content/mock-posts';

export default function HomePage() {
  // Feed filtering tab: 'ALL' | 'NOTICES' | 'EVENTS' | 'BLOGS'
  const [activeFeedTab, setActiveFeedTab] = useState<'ALL' | 'NOTICES' | 'EVENTS' | 'BLOGS'>('ALL');

  // Testimonials state
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  const testimonials = [
    {
      id: 't-1',
      name: 'Rahat Chowdhury',
      dept: 'Computer Science & Engineering',
      quote: "The anonymity guard rail allowed me to submit a critical report regarding unfair grading procedures in our semester final without any fear of academic reprisal. Within a week, the moderation desk reviewed it, and our papers were fairly re-evaluated. Voice of Northern is truly a shield for student rights!",
      avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=200'
    },
    {
      id: 't-2',
      name: 'Nusrat Jahan Mitu',
      dept: 'Department of Pharmacy',
      quote: "Getting our manual bKash registration tickets verified for the Human Rights Seminar took less than ten minutes. The transparency of this student portal, the ease of access, and the support staff's dedication make it the best organization on campus.",
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200'
    },
    {
      id: 't-3',
      name: 'Istiaque Ahmed',
      dept: 'Electrical & Electronic Engineering',
      quote: "As a member of VON, I've had the chance to organize events, network with seniors, and contribute directly to solving grievances. The new dashboard gives us unparalleled collaboration tools.",
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200'
    }
  ];

  const team = [
    {
      name: 'Sajid Al Hasan',
      role: 'President & Super Admin',
      motto: 'Advocating for institutional transparency and giving every student an equal, protected platform to speak up.',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300'
    },
    {
      name: 'Farhan Kabir',
      role: 'Vice President & Lead Auditor',
      motto: 'Constructing robust verification flows and ensuring manual transaction ledgers remain fully transparent.',
      avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=300'
    },
    {
      name: 'Nila Sultana',
      role: 'General Secretary & Editor',
      motto: 'Amplifying the student body voice through notices, magazine write-ups, and student rights guides.',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300'
    }
  ];

  // Achievements Telemetry
  const stats = [
    { label: 'Grievances Resolved', count: 184, percent: 94, color: 'w-[94%]' },
    { label: 'Registered Members', count: 1250, percent: 85, color: 'w-[85%]' },
    { label: 'Active Campaigns', count: 18, percent: 75, color: 'w-[75%]' },
    { label: 'Policy Overhauls', count: 3, percent: 100, color: 'w-[100%]' }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-cyan-500 selection:text-slate-950 overflow-x-hidden">
      
      {/* Dynamic Background Gradients */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* 1. Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center pt-32 pb-24 px-4 md:px-8 border-b border-slate-900 bg-slate-950/20 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto grid gap-12 lg:grid-cols-12 items-center">
          
          {/* Hero Content Left */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-xl overflow-hidden bg-slate-900 border border-slate-800 p-0.5 flex-shrink-0 shadow-lg shadow-cyan-500/10">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img 
                  src="/logo/453619266_499885622592512_2893896085747641960_n.jpg" 
                  alt="Voice of Northern Official Logo" 
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
              <span className="px-4 py-1 text-[11px] font-bold tracking-wider text-cyan-400 bg-cyan-950/50 border border-cyan-900/30 rounded-full uppercase">
                Official Student Portal
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.1] text-white">
              Voice of Northern: <br />
              <span className="bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-400 bg-clip-text text-transparent">
                Empowering Students, Shaping Futures
              </span>
            </h1>

            <p className="text-base sm:text-lg text-slate-400 leading-relaxed max-w-2xl">
              An advocacy framework built by Northern University students for student rights, grievance resolutions, and transparent campus journalism. File anonymous reports with security guard rails and join active assemblies.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link
                href="/register"
                className="px-8 py-4 bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-black rounded-xl text-center text-xs uppercase tracking-wider transition-all shadow-lg shadow-cyan-400/15 hover:scale-[1.02]"
              >
                Join the Movement
              </Link>
              <a
                href="#feed"
                className="px-8 py-4 bg-slate-900 hover:bg-slate-850 text-slate-300 font-bold border border-slate-800 rounded-xl text-center text-xs uppercase tracking-wider transition-all"
              >
                Learn More
              </a>
            </div>
          </div>

          {/* Hero Banner Right */}
          <div className="lg:col-span-5 relative w-full aspect-[4/3] rounded-3xl overflow-hidden border border-slate-900 shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent z-10" />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img 
              src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1200" 
              alt="Students Engaged in Active Academic Advocacy & Discussions"
              className="w-full h-full object-cover"
            />
            
            {/* Overlay Info Card */}
            <div className="absolute bottom-6 left-6 right-6 z-20 bg-slate-900/80 backdrop-blur-md border border-slate-800 p-4 rounded-2xl flex items-center justify-between">
              <div className="space-y-1">
                <span className="text-[9px] font-black uppercase text-cyan-400 tracking-widest">Active Resolution Desk</span>
                <p className="text-xs font-bold text-white">Anonymity Guard Rails Deployed</p>
              </div>
              <Link 
                href="/complaints" 
                className="px-3 py-1.5 bg-orange-500 hover:bg-orange-400 text-slate-950 font-bold text-[10px] uppercase rounded-lg transition-colors"
              >
                File Grievance
              </Link>
            </div>
          </div>

        </div>
      </section>

      {/* 2. Announcements, Events & Articles Feed */}
      <section id="feed" className="max-w-7xl mx-auto px-4 md:px-8 py-20">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div className="space-y-1">
            <h2 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">Real-Time Activity Feed</h2>
            <p className="text-xs text-slate-400">Stay updated on workshops, assemblies, and published student circulars.</p>
          </div>

          {/* Tab filter toggles */}
          <div className="flex bg-slate-900 p-1 rounded-xl border border-slate-900 w-full md:w-auto overflow-x-auto">
            {(['ALL', 'NOTICES', 'EVENTS', 'BLOGS'] as const).map(tab => (
              <button
                key={tab}
                onClick={() => setActiveFeedTab(tab)}
                className={`px-4 py-2 text-xs font-bold rounded-lg whitespace-nowrap transition-all ${
                  activeFeedTab === tab
                    ? 'bg-cyan-400 text-slate-950 shadow-md shadow-cyan-400/10'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {tab === 'ALL' ? 'Show All' : tab === 'NOTICES' ? 'Notices' : tab === 'EVENTS' ? 'Events' : 'Magazine & Blogs'}
              </button>
            ))}
          </div>
        </div>

        {/* Feed Cards Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          
          {/* Notices */}
          {(activeFeedTab === 'ALL' || activeFeedTab === 'NOTICES') && mockNotices.map(notice => (
            <div 
              key={notice.id} 
              className={`bg-slate-900/30 border p-5 rounded-2xl flex flex-col justify-between hover:border-slate-800 transition-all ${
                notice.priority === 'URGENT' ? 'border-orange-500/20 bg-gradient-to-br from-slate-900/20 to-orange-950/10' : 'border-slate-900'
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className={`px-2 py-0.5 text-[9px] font-black rounded border uppercase ${
                    notice.priority === 'URGENT' ? 'bg-red-500/10 text-red-400 border-red-500/20' : 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20'
                  }`}>
                    {notice.priority} Notice
                  </span>
                  <span className="text-[10px] text-slate-500 font-mono">{new Date(notice.publishedAt).toLocaleDateString()}</span>
                </div>
                <h3 className="text-sm font-bold text-white line-clamp-1">{notice.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed line-clamp-3">{notice.content}</p>
              </div>

              <div className="pt-4 border-t border-slate-900 mt-4 flex items-center justify-between text-[11px]">
                <span className="text-slate-500">Tag: {notice.category}</span>
                <span className="text-cyan-400 font-bold">Official Circular</span>
              </div>
            </div>
          ))}

          {/* Events */}
          {(activeFeedTab === 'ALL' || activeFeedTab === 'EVENTS') && mockEvents.map(event => (
            <div 
              key={event.id} 
              className="bg-slate-900/30 border border-slate-900 hover:border-slate-800 rounded-2xl overflow-hidden flex flex-col justify-between hover:scale-[1.01] transition-all"
            >
              <div className="h-44 bg-slate-950 relative overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={event.bannerImage} alt={event.title} className="w-full h-full object-cover" />
                <span className="absolute top-3 right-3 px-2 py-0.5 text-[9px] font-black uppercase bg-slate-950/80 border border-slate-800 text-cyan-400 rounded">
                  {event.type}
                </span>
              </div>

              <div className="p-5 space-y-4">
                <div className="space-y-1">
                  <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">{event.category}</span>
                  <h4 className="text-sm font-bold text-white line-clamp-1">{event.title}</h4>
                  <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">{event.description}</p>
                </div>

                <div className="space-y-1 text-[11px] text-slate-400 bg-slate-950/50 p-2.5 rounded-xl border border-slate-900/40">
                  <div>📍 Venue: {event.location}</div>
                  <div>📅 Date: {new Date(event.eventDate).toLocaleDateString()}</div>
                </div>
              </div>

              <div className="p-5 pt-0">
                <Link 
                  href={`/event/${event.id}`}
                  className="w-full text-center py-2 bg-slate-900 hover:bg-slate-850 text-slate-300 font-bold border border-slate-800 rounded-xl text-xs block transition-all"
                >
                  Register / Get Pass
                </Link>
              </div>
            </div>
          ))}

          {/* Blogs */}
          {(activeFeedTab === 'ALL' || activeFeedTab === 'BLOGS') && mockPosts.map(post => (
            <div 
              key={post.id} 
              className="bg-slate-900/30 border border-slate-900 hover:border-slate-800 rounded-2xl overflow-hidden flex flex-col justify-between hover:scale-[1.01] transition-all"
            >
              <div className="h-44 bg-slate-950 relative overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={post.coverImage} alt={post.title} className="w-full h-full object-cover" />
                <span className="absolute top-3 right-3 px-2 py-0.5 text-[9px] font-black uppercase bg-slate-950/80 border border-slate-800 text-purple-400 rounded">
                  {post.type}
                </span>
              </div>

              <div className="p-5 space-y-4">
                <div className="space-y-1">
                  <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">{post.category}</span>
                  <h4 className="text-sm font-bold text-white line-clamp-1">{post.title}</h4>
                  <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">{post.content}</p>
                </div>

                <div className="flex justify-between items-center text-[10px] text-slate-500 border-t border-slate-900/60 pt-3">
                  <span>Author: {post.author.name}</span>
                  <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                </div>
              </div>

              <div className="p-5 pt-0">
                <Link 
                  href={`/blogs/${post.slug}`}
                  className="w-full text-center py-2 bg-slate-900 hover:bg-slate-850 text-slate-300 font-bold border border-slate-800 rounded-xl text-xs block transition-all"
                >
                  Read Article
                </Link>
              </div>
            </div>
          ))}

        </div>
      </section>

      {/* 3. Achievements & Impact Section */}
      <section className="bg-slate-900/10 border-t border-b border-slate-900 py-20">
        <div className="max-w-7xl mx-auto px-4 md:px-8 grid gap-12 lg:grid-cols-12 items-center">
          
          {/* Success Story / Testimonials Left */}
          <div className="lg:col-span-7 space-y-6">
            <span className="px-4 py-1 text-[11px] font-bold tracking-wider text-orange-400 bg-orange-950/30 border border-orange-900/20 rounded-full uppercase">
              Student Testimonials
            </span>

            <h2 className="text-3xl font-black text-white tracking-tight leading-none">
              Success Stories & Community Impact
            </h2>

            {/* Testimonials Card */}
            <div className="bg-slate-900/30 border border-slate-900 p-6 rounded-2xl relative space-y-4">
              <span className="absolute top-4 right-6 text-6xl text-slate-800 font-serif leading-none select-none">“</span>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed italic">
                {testimonials[activeTestimonial].quote}
              </p>
              
              <div className="flex items-center gap-3 pt-2">
                <div className="h-10 w-10 rounded-full overflow-hidden border border-slate-850">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img 
                    src={testimonials[activeTestimonial].avatar} 
                    alt={testimonials[activeTestimonial].name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">{testimonials[activeTestimonial].name}</h4>
                  <p className="text-[10px] text-slate-500">{testimonials[activeTestimonial].dept}</p>
                </div>
              </div>
            </div>

            {/* Carousel navigation controls */}
            <div className="flex gap-2">
              {testimonials.map((t, idx) => (
                <button
                  key={t.id}
                  onClick={() => setActiveTestimonial(idx)}
                  className={`h-2.5 rounded-full transition-all ${
                    activeTestimonial === idx ? 'w-8 bg-cyan-400' : 'w-2.5 bg-slate-800'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Telemetry Progress Counters Right */}
          <div className="lg:col-span-5 space-y-5">
            <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest">Quantifying Campaign Impact</h3>
            
            <div className="space-y-4">
              {stats.map((stat, idx) => (
                <div key={idx} className="bg-slate-950 p-4 rounded-xl border border-slate-900 space-y-2">
                  <div className="flex justify-between items-end text-xs">
                    <span className="font-bold text-slate-300">{stat.label}</span>
                    <span className="font-mono text-cyan-400 font-bold">{stat.count}</span>
                  </div>

                  {/* Progress bar container */}
                  <div className="h-2 w-full bg-slate-900 rounded-full overflow-hidden">
                    <div className={`h-full bg-gradient-to-r from-cyan-400 to-indigo-500 rounded-full ${stat.color} transition-all duration-1000`} />
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* 4. Dedicated Team Section */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 py-20 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="px-4 py-1 text-[11px] font-bold tracking-wider text-cyan-400 bg-cyan-950/30 border border-cyan-900/20 rounded-full uppercase">
            MEET THE ADVOCATES
          </span>
          <h2 className="text-2xl md:text-3xl font-extrabold text-white">Leadership Behind The Voice</h2>
          <p className="text-xs text-slate-400">Student operators and executive directors working round the clock to ensure student queries are verified.</p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {team.map((member, idx) => (
            <div 
              key={idx}
              className="bg-slate-900/20 border border-slate-900 hover:border-slate-800 rounded-2xl overflow-hidden hover:scale-[1.01] transition-all flex flex-col justify-between"
            >
              <div className="h-56 bg-slate-950 relative overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={member.avatar} alt={member.name} className="w-full h-full object-cover" />
              </div>

              <div className="p-5 space-y-3">
                <div>
                  <h3 className="text-sm font-bold text-white">{member.name}</h3>
                  <p className="text-[10px] text-cyan-400 font-bold uppercase">{member.role}</p>
                </div>
                <p className="text-[11px] text-slate-400 leading-relaxed italic">
                  &ldquo;{member.motto}&rdquo;
                </p>
              </div>

              <div className="p-5 pt-0 border-t border-slate-900/60 mt-3 flex items-center justify-between">
                <Link 
                  href="/about" 
                  className="text-xs font-bold text-slate-400 hover:text-cyan-400 hover:underline"
                >
                  View Bio & Activity
                </Link>
                <span className="text-[9px] text-slate-600 font-bold font-mono">VON LEADER</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Footer CTA Banner */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 pb-20">
        <div className="bg-gradient-to-r from-cyan-950/40 via-indigo-950/20 to-slate-950 border border-cyan-900/20 p-8 md:p-12 rounded-3xl text-center space-y-6 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(6,182,212,0.05),transparent)] pointer-events-none" />
          
          <h2 className="text-3xl font-black text-white leading-tight">Ready to shape a fairer campus?</h2>
          <p className="text-slate-400 text-xs sm:text-sm max-w-xl mx-auto leading-relaxed">
            Create an official verified student account, sign petitions, and submit institutional queries with the safety of our Anonymity Vault.
          </p>

          <div className="flex flex-wrap gap-4 justify-center">
            <Link 
              href="/register" 
              className="px-6 py-3 bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-black rounded-xl text-xs uppercase transition-all"
            >
              Sign Up Now
            </Link>
            <Link 
              href="/complaints" 
              className="px-6 py-3 bg-slate-900 hover:bg-slate-850 text-slate-300 font-bold border border-slate-800 rounded-xl text-xs uppercase transition-all"
            >
              File Anonymous Case
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}