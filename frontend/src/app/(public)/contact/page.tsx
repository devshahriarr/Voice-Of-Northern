'use client';

import React, { useState } from 'react';
import { validatePhone, validateEmail, sanitizeString } from '@/modules/validation/schemas';

export default function ContactPage() {
  const [name, setName] = useState('');
  const [studentId, setStudentId] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');

  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    // Validations
    if (!name.trim()) {
      setError('Please provide your name.');
      return;
    }
    if (!validateEmail(email)) {
      setError('Please enter a valid email address.');
      return;
    }
    if (!validatePhone(phone)) {
      setError('Please enter a valid phone number (10-15 digits, digits and + only).');
      return;
    }
    if (message.trim().length < 10) {
      setError('Please enter a message containing at least 10 characters.');
      return;
    }

    // Sanitization
    const sanitizedData = {
      name: sanitizeString(name),
      studentId: sanitizeString(studentId),
      email: sanitizeString(email),
      phone: sanitizeString(phone),
      message: sanitizeString(message)
    };

    console.log('Sending message:', sanitizedData);

    setSuccess(true);
    setName('');
    setStudentId('');
    setEmail('');
    setPhone('');
    setMessage('');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 px-4 md:px-8 py-16">
      <div className="max-w-5xl mx-auto grid gap-12 md:grid-cols-5">
        
        {/* Contact details */}
        <div className="md:col-span-2 space-y-6 animate-fade-in">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight text-white">Get in Touch</h1>
            <p className="text-slate-400 text-sm mt-2 leading-relaxed font-sans">
              Have questions, issues, or want to host a joint venture with Voice of Northern? Drop us a message.
            </p>
          </div>

          <div className="space-y-4 text-xs text-slate-400">
            <div className="flex items-center gap-3 p-3.5 bg-slate-900/40 border border-slate-900 rounded-2xl">
              <span className="text-cyan-400 font-bold">📍 Office:</span>
              <span>Student Union Building, Floor 2, Northern University Campus</span>
            </div>
            <div className="flex items-center gap-3 p-3.5 bg-slate-900/40 border border-slate-900 rounded-2xl">
              <span className="text-cyan-400 font-bold">✉️ Email:</span>
              <span>contact@voiceofnorthern.org</span>
            </div>
            <div className="flex items-center gap-3 p-3.5 bg-slate-900/40 border border-slate-900 rounded-2xl">
              <span className="text-cyan-400 font-bold">💬 Support:</span>
              <span>Official Facebook Page Messenger Channel</span>
            </div>
          </div>
        </div>

        {/* Contact form */}
        <div className="md:col-span-3 p-6 bg-slate-900/40 border border-slate-900 rounded-3xl space-y-4">
          <form className="space-y-4 text-xs" onSubmit={handleSubmit}>
            <div className="border-b border-slate-800 pb-2">
              <h3 className="text-sm font-black text-white uppercase tracking-wider">Leave a Message</h3>
            </div>

            {error && (
              <div className="p-3 bg-red-950/40 border border-red-900/30 text-red-400 font-semibold rounded-xl text-xs">
                ⚠️ {error}
              </div>
            )}

            {success && (
              <div className="p-3 bg-emerald-950/40 border border-emerald-500/20 text-emerald-400 font-semibold rounded-xl text-xs">
                ✓ Message dispatched! We will review and reply within 24-48 hours.
              </div>
            )}

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <label className="font-semibold text-slate-300">Your Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Rahat Chowdhury"
                  className="w-full bg-slate-950 border border-slate-850 rounded-xl px-4 py-2.5 text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500 transition-colors"
                  value={name}
                  onChange={e => setName(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <label className="font-semibold text-slate-300">Student ID (Optional)</label>
                <input
                  type="text"
                  placeholder="e.g. 2023-1-60-044"
                  className="w-full bg-slate-950 border border-slate-850 rounded-xl px-4 py-2.5 text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500 transition-colors"
                  value={studentId}
                  onChange={e => setStudentId(e.target.value)}
                />
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <label className="font-semibold text-slate-300">Email Address</label>
                <input
                  type="email"
                  required
                  placeholder="student@university.edu"
                  className="w-full bg-slate-950 border border-slate-850 rounded-xl px-4 py-2.5 text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500 transition-colors"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <label className="font-semibold text-slate-300">Phone Number</label>
                <input
                  type="tel"
                  required
                  placeholder="e.g. +8801712345678"
                  className="w-full bg-slate-950 border border-slate-850 rounded-xl px-4 py-2.5 text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500 transition-colors"
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="font-semibold text-slate-300">Message Context</label>
              <textarea
                rows={4}
                required
                placeholder="Elaborate your inquiry details here..."
                className="w-full bg-slate-950 border border-slate-850 rounded-xl p-3.5 text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500 transition-colors resize-none font-sans leading-relaxed"
                value={message}
                onChange={e => setMessage(e.target.value)}
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 px-4 bg-cyan-400 text-slate-950 font-black rounded-xl hover:bg-cyan-300 transition-colors text-xs uppercase tracking-wider shadow-md"
            >
              Send Secure Message
            </button>
          </form>
        </div>

      </div>
    </div>
  );
}