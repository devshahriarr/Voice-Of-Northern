'use client';
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();

    // Unified items list - completely detached independent membership form route
    const menuItems = [
        { name: 'My Profile', href: '/dashboard/profile', icon: '👤' },
        { name: 'Submit Complaint', href: '/dashboard/complaints/create', icon: '⚖️' },
        { name: 'My Complaints', href: '/dashboard/complaints/my-complaints', icon: '📋' },
        { name: 'Create Blog', href: '/dashboard/blogs/create', icon: '✍️' },
        { name: 'My Blogs', href: '/dashboard/blogs', icon: '📝' },
    ];

    const handleSignOut = () => {
        // Clear auth simulation and redirect
        window.location.href = '/';
    };

    return (
        <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col md:flex-row">
            <aside className="w-full md:w-64 bg-slate-900/60 border-b md:border-b-0 md:border-r border-slate-900 shrink-0 p-6 flex flex-col justify-between space-y-8">
                <div className="space-y-6">
                    <div>
                        <h2 className="text-lg font-bold text-white tracking-tight">Voice of Northern</h2>
                        <p className="text-[10px] text-cyan-400 font-semibold uppercase tracking-wider mt-0.5">Student Portal</p>
                    </div>
                    <nav className="space-y-1.5">
                        {menuItems.map((item) => {
                            const isActive = pathname === item.href;
                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={`flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-xl transition-all ${isActive ? 'bg-cyan-400 text-slate-950 font-bold' : 'text-slate-400 hover:bg-slate-900'
                                        }`}
                                >
                                    <span>{item.icon}</span>
                                    {item.name}
                                </Link>
                            );
                        })}
                    </nav>
                </div>

                <div className="pt-4 border-t border-slate-900/80">
                    <button
                        onClick={handleSignOut}
                        className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-xl text-red-400 hover:bg-red-500/10 transition-all text-left"
                    >
                        <span>🚪</span>
                        <span>Sign Out</span>
                    </button>
                </div>
            </aside>
            <main className="flex-1 p-6 md:p-10 max-w-5xl overflow-y-auto">{children}</main>
        </div>
    );
}