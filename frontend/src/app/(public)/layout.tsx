'use client';
import React, { useState } from "react";
import Button from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Events", href: "/event" },
    { label: "Blogs", href: "/blogs" },
    { label: "Notice", href: "/notices" },
    { label: "Gallery", href: "/gallery" },
    { label: "Complaint Feed", href: "/complaints" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-slate-950 text-slate-100 selection:bg-cyan-500 selection:text-slate-950">
      {/* Navigation Bar */}
      <header className="border-b border-slate-900 bg-slate-950/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          
          {/* Logo Brand Anchor */}
          <Link href="/" className="flex items-center gap-2.5 hover:opacity-90 transition-opacity">
            <div className="w-9 h-9 rounded-lg overflow-hidden bg-slate-900 border border-slate-800 p-0.5 shadow-lg shadow-cyan-500/10 shrink-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/logo/453619266_499885622592512_2893896085747641960_n.jpg"
                alt="Voice of Northern"
                className="w-full h-full object-cover rounded-md"
              />
            </div>
            <span className="font-black text-sm sm:text-base tracking-tight bg-gradient-to-r from-slate-100 to-slate-400 bg-clip-text text-transparent">
              Voice of Northern
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-5 text-xs font-bold uppercase tracking-wider text-slate-400">
            {navLinks.map(link => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`transition-colors hover:text-white ${
                    isActive ? 'text-cyan-400 font-black' : ''
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Action Area (Auth Buttons & Mobile Menu Trigger) */}
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2">
              <Link href="/login" tabIndex={-1}>
                <Button variant="ghost" size="sm">
                  Log In
                </Button>
              </Link>
              <Link href="/register" tabIndex={-1}>
                <Button variant="primary" size="sm">
                  Become a Member
                </Button>
              </Link>
            </div>

            {/* Mobile Menu Hamburger Trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-slate-400 hover:text-white focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Panel */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-slate-900 bg-slate-950 px-6 py-4 space-y-3">
            <nav className="flex flex-col gap-2.5 text-xs font-bold uppercase tracking-wider text-slate-400">
              {navLinks.map(link => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`py-1.5 transition-colors hover:text-white ${
                      isActive ? 'text-cyan-400' : ''
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>
            <div className="flex flex-col gap-2 pt-3 border-t border-slate-900 sm:hidden">
              <Link href="/login" onClick={() => setMobileMenuOpen(false)}>
                <button className="w-full py-2 bg-slate-900 border border-slate-800 text-slate-300 font-bold rounded-xl text-xs">
                  Log In
                </button>
              </Link>
              <Link href="/register" onClick={() => setMobileMenuOpen(false)}>
                <button className="w-full py-2 bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-black rounded-xl text-xs">
                  Become a Member
                </button>
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* Main Page Content */}
      <main className="flex-1 flex flex-col">{children}</main>

      {/* Footer */}
      <footer className="mt-auto border-t border-slate-900 bg-slate-950 py-8">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-xs text-slate-500 font-sans">
            © {new Date().getFullYear()} Voice of Northern. All rights reserved.
          </span>
          <div className="flex gap-4">
            <Link href="/about" className="text-xs text-slate-500 hover:text-slate-400 cursor-pointer font-sans">
              About Us
            </Link>
            <Link href="/contact" className="text-xs text-slate-500 hover:text-slate-400 cursor-pointer font-sans">
              Contact Us
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
