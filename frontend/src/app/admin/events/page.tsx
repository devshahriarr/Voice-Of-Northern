'use client';
import React, { useState } from 'react';
import { mockEvents as initialEvents } from '@/modules/event/mock-events';
import { Event } from '@/modules/event/types';

interface ExtendedEvent extends Event {
  isDeleted?: boolean;
}

interface TicketRegistration {
  id: string;
  studentName: string;
  studentId: string;
  department: string;
  email: string;
  eventName: string;
  paymentMethod: 'BKASH' | 'NAGAD';
  transactionId: string;
  amount: number;
  screenshotUrl?: string;
  status: 'PENDING' | 'VERIFIED' | 'REJECTED';
  submittedAt: string;
  isDeleted?: boolean;
}

const initialRegistrations: TicketRegistration[] = [
  {
    id: 'reg-01',
    studentName: 'Rahat Chowdhury',
    studentId: '2023-1-60-044',
    department: 'CSE',
    email: 'rahat.c@gmail.com',
    eventName: 'VON Campus Assembly 2026',
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
    amount: 150,
    screenshotUrl: 'https://images.unsplash.com/photo-1628157582853-a796fa650a6a?w=500',
    status: 'PENDING',
    submittedAt: '2026-05-22T06:15:00Z'
  },
  {
    id: 'reg-03',
    studentName: 'Istiaque Ahmed',
    studentId: '2023-3-30-089',
    department: 'EEE',
    email: 'istiaque.eee@gmail.com',
    eventName: 'VON Campus Assembly 2026',
    paymentMethod: 'BKASH',
    transactionId: 'TRX88721X',
    amount: 250,
    screenshotUrl: 'https://images.unsplash.com/photo-1628157582853-a796fa650a6a?w=500',
    status: 'VERIFIED',
    submittedAt: '2026-05-21T18:40:00Z'
  }
];

export default function AdminEventsPage() {
  const [events, setEvents] = useState<ExtendedEvent[]>(initialEvents);
  const [registrations, setRegistrations] = useState<TicketRegistration[]>(initialRegistrations);

  // New Event Form Launcher State
  const [newEvent, setNewEvent] = useState({
    title: '',
    description: '',
    eventDate: '',
    location: '',
    type: 'FREE' as 'FREE' | 'PAID' | 'OPEN_CONTRIBUTION',
    price: '',
    category: 'ACADEMIC',
    bannerImage: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800'
  });

  const [selectedScreenshot, setSelectedScreenshot] = useState<string | null>(null);

  const handleVerifyTicket = (id: string, approve: boolean) => {
    setRegistrations(prev =>
      prev.map(r => (r.id === id ? { ...r, status: approve ? 'VERIFIED' : 'REJECTED' } : r))
    );
  };

  const handleAddEventSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const eventId = `evt-${Date.now()}`;
    const newObj: ExtendedEvent = {
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

    // Reset Form
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

  // Soft Delete implementation instead of dropping records
  const handleSoftDeleteEvent = (id: string) => {
    setEvents(prev =>
      prev.map(evt => (evt.id === id ? { ...evt, isDeleted: true } : evt))
    );
  };

  const handleRestoreEvent = (id: string) => {
    setEvents(prev =>
      prev.map(evt => (evt.id === id ? { ...evt, isDeleted: false } : evt))
    );
  };

  const handleSoftDeleteRegistration = (id: string) => {
    setRegistrations(prev =>
      prev.map(reg => (reg.id === id ? { ...reg, isDeleted: true } : reg))
    );
  };

  const handleRestoreRegistration = (id: string) => {
    setRegistrations(prev =>
      prev.map(reg => (reg.id === id ? { ...reg, isDeleted: false } : reg))
    );
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="border-b border-slate-900 pb-5">
        <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-white">
          Event Tracker & Payment Auditor
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Deploy and review campus campaigns in the left panel, and audit manual Bkash/Nagad guest ticketing transactions in the right panel.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-12 items-start">
        {/* Left Panel: Event Form & Listings */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-slate-900/30 border border-slate-900 rounded-2xl p-5 space-y-4">
            <h2 className="text-sm font-black text-white uppercase tracking-wider border-b border-slate-800 pb-2">
              New Event Launcher
            </h2>

            <form onSubmit={handleAddEventSubmit} className="space-y-3.5 text-xs">
              <div className="space-y-1">
                <label className="font-bold text-slate-300">Campaign Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. General Assembly"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-100 placeholder-slate-600 focus:outline-none focus:border-cyan-500"
                  value={newEvent.title}
                  onChange={e => setNewEvent({ ...newEvent, title: e.target.value })}
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-300">Description</label>
                <textarea
                  required
                  rows={2}
                  placeholder="Enter details..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-100 placeholder-slate-600 focus:outline-none focus:border-cyan-500 resize-none"
                  value={newEvent.description}
                  onChange={e => setNewEvent({ ...newEvent, description: e.target.value })}
                />
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <div className="space-y-1">
                  <label className="font-bold text-slate-300">Target Date</label>
                  <input
                    type="datetime-local"
                    required
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-100 focus:outline-none focus:border-cyan-500"
                    value={newEvent.eventDate}
                    onChange={e => setNewEvent({ ...newEvent, eventDate: e.target.value })}
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-slate-300">Venue</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Main Auditorium"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-100 placeholder-slate-600 focus:outline-none focus:border-cyan-500"
                    value={newEvent.location}
                    onChange={e => setNewEvent({ ...newEvent, location: e.target.value })}
                  />
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <div className="space-y-1">
                  <label className="font-bold text-slate-300">Type Selection</label>
                  <select
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-100 focus:outline-none focus:border-cyan-500"
                    value={newEvent.type}
                    onChange={e => setNewEvent({ ...newEvent, type: e.target.value as 'FREE' | 'PAID' | 'OPEN_CONTRIBUTION' })}
                  >
                    <option value="FREE">FREE</option>
                    <option value="OPEN_CONTRIBUTION">OPEN CONTRIBUTION</option>
                    <option value="PAID">PAID</option>
                  </select>
                </div>

                {newEvent.type === 'PAID' && (
                  <div className="space-y-1">
                    <label className="font-bold text-slate-300">Registration Price (BDT)</label>
                    <input
                      type="number"
                      required
                      placeholder="e.g. 250"
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-100 focus:outline-none focus:border-cyan-500"
                      value={newEvent.price}
                      onChange={e => setNewEvent({ ...newEvent, price: e.target.value })}
                    />
                  </div>
                )}
              </div>

              <div className="space-y-1 text-xs">
                <label className="font-bold text-slate-350">Upload Event Banner Image (Max 5MB)</label>
                <div className="relative border border-dashed border-slate-800 rounded-xl p-3 bg-slate-950 text-center text-[10px] text-slate-500 cursor-pointer">
                  <input
                    type="file"
                    accept="image/*"
                    className="absolute inset-0 opacity-0 cursor-pointer"
                    onChange={e => {
                      const file = e.target.files?.[0];
                      if (file) {
                        if (file.size > 5 * 1024 * 1024) {
                          alert('File size exceeds the 5MB limit.');
                          return;
                        }
                        if (!file.type.startsWith('image/')) {
                          alert('Only image files are allowed.');
                          return;
                        }
                        setNewEvent(prev => ({
                          ...prev,
                          bannerImage: URL.createObjectURL(file)
                        }));
                      }
                    }}
                  />
                  <span>{newEvent.bannerImage.startsWith('blob:') ? '✓ Loaded Local Image File' : 'Click to bind banner snapshot'}</span>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-black rounded-xl transition-all"
              >
                Schedule Event
              </button>
            </form>
          </div>

          {/* Active scheduled events list */}
          <div className="space-y-3">
            <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest">Scheduled Event Tracker</h3>
            <div className="space-y-3">
              {events.map(event => (
                <div
                  key={event.id}
                  className={`bg-slate-900/20 border border-slate-900 rounded-2xl p-4 flex gap-4 items-center justify-between hover:border-slate-800 transition-all ${
                    event.isDeleted ? 'opacity-40 line-through bg-slate-950/40' : ''
                  }`}
                >
                  <div className="min-w-0 flex-1 space-y-1 text-xs">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-white truncate">{event.title}</span>
                      <span className="text-[9px] px-1.5 py-0.2 bg-slate-950 text-cyan-400 border border-slate-800 rounded uppercase">
                        {event.type}
                      </span>
                    </div>
                    <div className="text-[10px] text-slate-500 truncate">📍 {event.location} • 📅 {new Date(event.eventDate).toLocaleDateString()}</div>
                  </div>

                  <div className="flex gap-2">
                    {event.isDeleted ? (
                      <button
                        onClick={() => handleRestoreEvent(event.id)}
                        className="px-2 py-1 bg-emerald-950/40 text-emerald-400 border border-emerald-900/30 hover:bg-emerald-900 font-bold rounded text-[10px]"
                      >
                        Restore
                      </button>
                    ) : (
                      <button
                        onClick={() => handleSoftDeleteEvent(event.id)}
                        className="px-2 py-1 bg-red-950/40 text-red-400 border border-red-900/30 hover:bg-red-900 font-bold rounded text-[10px]"
                      >
                        Soft Delete
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Panel: Transaction Auditor */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-slate-900/30 border border-slate-900 rounded-2xl p-5 space-y-4">
            <h2 className="text-sm font-black text-white uppercase tracking-wider border-b border-slate-800 pb-2">
              Manual Transaction Auditor
            </h2>

            <div className="space-y-4">
              {registrations.map(reg => (
                <div
                  key={reg.id}
                  className={`bg-slate-950/60 border border-slate-900 p-4 rounded-xl space-y-3 hover:border-slate-800 transition-all ${
                    reg.isDeleted ? 'opacity-40 line-through bg-slate-950/40' : ''
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <div className="text-xs space-y-1">
                      <h4 className="font-bold text-white">{reg.studentName}</h4>
                      <p className="font-mono text-slate-500 text-[10px]">{reg.studentId} • {reg.department}</p>
                      <p className="text-slate-400">Campaign: <span className="font-semibold text-slate-300">{reg.eventName}</span></p>
                    </div>

                    <span className={`px-2 py-0.5 text-[9px] font-black rounded border ${
                      reg.status === 'VERIFIED' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' :
                      reg.status === 'PENDING' ? 'bg-orange-500/10 text-orange-400 border-orange-500/20' :
                      'bg-red-500/10 text-red-400 border-red-500/20'
                    }`}>
                      {reg.status}
                    </span>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-3 items-center text-xs">
                    <div>
                      <span className="text-slate-500 block text-[10px] uppercase">Payment Gateway</span>
                      <span className="font-bold font-mono text-slate-200">{reg.paymentMethod}</span>
                    </div>
                    <div>
                      <span className="text-slate-500 block text-[10px] uppercase">Transaction Ref</span>
                      <span className="font-bold font-mono text-cyan-400">{reg.transactionId}</span>
                    </div>
                    <div>
                      {reg.screenshotUrl ? (
                        <button
                          onClick={() => setSelectedScreenshot(reg.screenshotUrl || null)}
                          className="text-[10px] text-cyan-400 hover:underline font-bold"
                        >
                          🖼️ View Receipt Image
                        </button>
                      ) : (
                        <span className="text-slate-600 italic">No attachment</span>
                      )}
                    </div>
                  </div>

                  <div className="pt-2 border-t border-slate-900/60 flex justify-between items-center text-xs">
                    <div className="flex gap-2">
                      {reg.isDeleted ? (
                        <button
                          onClick={() => handleRestoreRegistration(reg.id)}
                          className="px-3 py-1 bg-emerald-950/40 text-emerald-400 border border-emerald-900/30 hover:bg-emerald-900 font-bold rounded-lg text-[10px]"
                        >
                          🔄 Restore Record
                        </button>
                      ) : (
                        <>
                          <button
                            onClick={() => handleVerifyTicket(reg.id, true)}
                            className="px-3 py-1 bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold rounded-lg text-[10px]"
                          >
                            Confirm Ticket
                          </button>
                          <button
                            onClick={() => handleVerifyTicket(reg.id, false)}
                            className="px-3 py-1 bg-red-950/40 border border-red-900/30 hover:bg-red-900 text-red-200 font-bold rounded-lg text-[10px]"
                          >
                            Void Payment
                          </button>
                        </>
                      )}
                    </div>

                    {!reg.isDeleted && (
                      <button
                        onClick={() => handleSoftDeleteRegistration(reg.id)}
                        className="text-[10px] text-slate-500 hover:text-red-400"
                      >
                        Soft Delete File
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Payment Screenshot Overlay Viewer Modal */}
      {selectedScreenshot && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm"
          onClick={() => setSelectedScreenshot(null)}
        >
          <div
            className="relative w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-3"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex justify-between items-center border-b border-slate-800 pb-2">
              <span className="text-xs font-bold text-slate-400">Payment Screenshot Verification</span>
              <button onClick={() => setSelectedScreenshot(null)} className="text-slate-400 hover:text-white">✕</button>
            </div>
            <div className="aspect-[4/3] w-full overflow-hidden rounded-xl bg-slate-950 border border-slate-900">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={selectedScreenshot} alt="Transaction Receipt Attachment" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
