import React from "react";
import Link from "next/link";
import Button from "@/components/ui/button";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navigation Bar */}
      <header className="border-b border-navy-800 bg-navy-950/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-tr from-glow-500 to-protest-orange flex items-center justify-center font-bold text-navy-950 text-lg shadow-lg shadow-glow-500/20">
              V
            </div>
            <span className="font-bold text-xl tracking-tight bg-gradient-to-r from-slate-100 to-slate-400 bg-clip-text text-transparent hidden sm:block">
              Voice of Northern
            </span>
          </Link>
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-300">
            <Link href="/" className="hover:text-glow-500 transition-colors">
              Home
            </Link>
            <Link href="/about" className="hover:text-glow-500 transition-colors">
              About
            </Link>
            <Link href="/contact" className="hover:text-glow-500 transition-colors">
              Contact
            </Link>
          </nav>
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm">
              Log In
            </Button>
            <Button variant="primary" size="sm">
              Register
            </Button>
          </div>
        </div>
      </header>

      {/* Main Page Content */}
      <main className="flex-1 flex flex-col">{children}</main>

      {/* Footer */}
      <footer className="mt-auto border-t border-navy-800 bg-navy-950 py-8">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-sm text-slate-500 font-sans">
            © {new Date().getFullYear()} Voice of Northern. All rights reserved.
          </span>
          <div className="flex gap-4">
            <Link href="/about" className="text-sm text-slate-500 hover:text-slate-400 cursor-pointer font-sans">
              About Us
            </Link>
            <Link href="/contact" className="text-sm text-slate-500 hover:text-slate-400 cursor-pointer font-sans">
              Contact Us
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
