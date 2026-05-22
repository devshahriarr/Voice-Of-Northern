'use client';
import React from 'react';
import Link from 'next/link';

interface TeamMember {
  id: string;
  name: string;
  role: string;
  department: string;
  imageUrl: string;
  bio: string;
  socials: {
    facebook?: string;
    linkedin?: string;
    email?: string;
  };
}

export default function FullTeamPage() {
  const team: TeamMember[] = [
    {
      id: 'member-1',
      name: 'Sajid Al Hasan',
      role: 'Super Admin & Coordinator',
      department: 'Computer Science & Engineering',
      imageUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500',
      bio: 'Leading structural updates, platform governance, and institutional negotiations for student welfare.',
      socials: {
        facebook: 'https://facebook.com',
        linkedin: 'https://linkedin.com',
        email: 'mailto:sajid@voiceofnorthern.org'
      }
    },
    {
      id: 'member-2',
      name: 'Tanvir Ahmed',
      role: 'Admin & Lead Engineer',
      department: 'Computer Science & Engineering',
      imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500',
      bio: 'Architecting digital systems, secure filing workflows, and the grievance action dashboard.',
      socials: {
        linkedin: 'https://linkedin.com',
        email: 'mailto:tanvir@voiceofnorthern.org'
      }
    },
    {
      id: 'member-3',
      name: 'Nusrat Jahan Mitu',
      role: 'Moderator & Pharmacy Rep',
      department: 'Pharmacy',
      imageUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500',
      bio: 'Reviewing student publications, verifying complaints, and managing public outreach bulletins.',
      socials: {
        facebook: 'https://facebook.com',
        email: 'mailto:nusrat@voiceofnorthern.org'
      }
    },
    {
      id: 'member-4',
      name: 'Abrar Chowdhury',
      role: 'Representative & EEE Rep',
      department: 'Electrical & Electronic Engineering',
      imageUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=500',
      bio: 'Coordinating student discussions, protest assemblies, and department-level grievance collection.',
      socials: {
        facebook: 'https://facebook.com',
        linkedin: 'https://linkedin.com'
      }
    }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 px-4 md:px-8 py-16">
      <div className="max-w-6xl mx-auto space-y-8 animate-fade-in">
        
        {/* Header */}
        <div className="border-b border-slate-900 pb-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="px-3 py-1 text-[10px] font-bold tracking-wider text-cyan-400 bg-cyan-950/40 border border-cyan-900/30 rounded-full uppercase">
              Our Leadership
            </span>
            <h1 className="text-3xl font-extrabold tracking-tight text-white mt-2">Voice of Northern Team</h1>
            <p className="text-xs text-slate-400 mt-1 font-sans">
              Meet the coordinators, admins, and student representatives driving transparency at our university.
            </p>
          </div>
          <Link
            href="/about"
            className="text-xs text-cyan-400 hover:underline font-bold self-start sm:self-center"
          >
            ← Back to About
          </Link>
        </div>

        {/* Team Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 pt-4">
          {team.map(member => (
            <div
              key={member.id}
              className="bg-slate-900/30 border border-slate-900 rounded-3xl overflow-hidden flex flex-col justify-between hover:border-slate-800 transition-all"
            >
              <div>
                <div className="relative aspect-[4/5] bg-slate-950">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={member.imageUrl}
                    alt={member.name}
                    className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-300"
                  />
                  <div className="absolute bottom-3 left-3 bg-slate-950/90 border border-slate-900 px-2 py-0.5 rounded text-[8px] font-black uppercase text-cyan-400 font-mono">
                    {member.department.split(' ').map(w => w[0]).join('')}
                  </div>
                </div>
                <div className="p-4 space-y-2">
                  <div className="space-y-0.5">
                    <h3 className="text-xs font-black text-white uppercase tracking-wider">{member.name}</h3>
                    <p className="text-[10px] text-cyan-400 font-bold">{member.role}</p>
                  </div>
                  <p className="text-[11px] text-slate-400 leading-relaxed font-sans">{member.bio}</p>
                </div>
              </div>

              {/* Social Channels */}
              <div className="p-4 pt-0 flex gap-3 text-sm border-t border-slate-900/40 mt-3">
                {member.socials.facebook && (
                  <a
                    href={member.socials.facebook}
                    target="_blank"
                    rel="noreferrer"
                    className="text-slate-500 hover:text-cyan-400"
                    title="Facebook Profile"
                  >
                    🔵
                  </a>
                )}
                {member.socials.linkedin && (
                  <a
                    href={member.socials.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="text-slate-500 hover:text-cyan-400"
                    title="LinkedIn Profile"
                  >
                    💼
                  </a>
                )}
                {member.socials.email && (
                  <a
                    href={member.socials.email}
                    className="text-slate-500 hover:text-cyan-400"
                    title="Official Email"
                  >
                    ✉️
                  </a>
                )}
              </div>

            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
