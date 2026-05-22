import Button from "@/components/ui/button";
import Input from "@/components/ui/input";

export default function Home() {
  return (
    <div className="min-h-screen bg-navy-950 text-slate-100 flex flex-col relative overflow-hidden">
      {/* Background Decorative Glow Effects */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-glow-500/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-protest-orange/10 blur-[120px] pointer-events-none" />

      {/* Navigation Bar */}
      <header className="border-b border-navy-800 bg-navy-950/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-tr from-glow-500 to-protest-orange flex items-center justify-center font-bold text-navy-950 text-lg shadow-lg shadow-glow-500/20">
              V
            </div>
            <span className="font-bold text-xl tracking-tight bg-gradient-to-r from-slate-100 to-slate-400 bg-clip-text text-transparent">
              Voice of Northern
            </span>
          </div>
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-300">
            <a href="#features" className="hover:text-glow-500 transition-colors">Features</a>
            <a href="#complaints" className="hover:text-glow-500 transition-colors">Complaints</a>
            <a href="#events" className="hover:text-glow-500 transition-colors">Events</a>
            <a href="#components" className="hover:text-glow-500 transition-colors">Design System</a>
          </nav>
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm">Log In</Button>
            <Button variant="primary" size="sm">Register</Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative max-w-7xl mx-auto px-6 pt-24 pb-16 text-center md:text-left flex flex-col md:flex-row items-center gap-12">
        <div className="flex-1 flex flex-col gap-6">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-navy-700 bg-navy-900/50 text-glow-500 text-sm font-semibold self-center md:self-start backdrop-blur-sm">
            <span className="w-2 h-2 rounded-full bg-glow-500 animate-pulse" />
            Digital Empowerment Platform
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight">
            Advocating for{" "}
            <span className="bg-gradient-to-r from-glow-500 to-cyan-400 bg-clip-text text-transparent">
              Student Rights
            </span>{" "}
            & Community Engagement.
          </h1>
          <p className="text-lg text-slate-400 max-w-2xl leading-relaxed">
            Voice of Northern (VON) is a decentralized platform built to address student grievances, manage complaints with verified or anonymous privacy models, and foster community growth.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mt-4 justify-center md:justify-start">
            <Button variant="primary" size="lg">
              Submit a Complaint
            </Button>
            <Button variant="secondary" size="lg">
              Explore Active Notices
            </Button>
          </div>
        </div>

        {/* Glassmorphic Visual Notice Card */}
        <div className="flex-1 w-full max-w-md md:max-w-none relative aspect-[4/3] rounded-2xl border border-navy-800 bg-navy-900/40 p-8 backdrop-blur-xl shadow-2xl flex flex-col justify-between overflow-hidden group hover:border-navy-700 transition-all duration-300">
          <div className="absolute inset-0 bg-gradient-to-tr from-glow-500/10 via-transparent to-protest-orange/10 opacity-50 pointer-events-none" />
          <div className="flex justify-between items-start z-10">
            <div className="w-12 h-12 rounded-xl bg-navy-800 border border-navy-700 flex items-center justify-center text-glow-500 text-xl font-bold">
              📢
            </div>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-protest-orange/15 text-protest-orange border border-protest-orange/20">
              URGENT NOTICE
            </span>
          </div>
          <div className="flex flex-col gap-3 mt-8 z-10">
            <h3 className="text-xl font-bold text-slate-100">Student General Assembly 2026</h3>
            <p className="text-sm text-slate-400 leading-relaxed font-sans">
              Join us this Saturday to discuss our core agenda regarding university policies, academic calendar reform, and the launch of the new VON platform feedback loop.
            </p>
          </div>
          <div className="flex items-center justify-between border-t border-navy-800 pt-4 mt-6 z-10">
            <span className="text-xs text-slate-500">Date: May 30, 2026</span>
            <span className="text-xs text-glow-500 font-semibold group-hover:underline cursor-pointer">
              Read details →
            </span>
          </div>
        </div>
      </section>

      {/* Components / Design System Showcase Section */}
      <section id="components" className="border-t border-navy-800 bg-navy-900/20 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold tracking-tight">Design System Showcase</h2>
            <p className="text-slate-400 mt-3 text-base">
              Establishment of the global typography, interactive states, dark mode elements, and form input controls defined for Voice of Northern.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Buttons Showcase */}
            <div className="border border-navy-800 bg-navy-900/40 p-8 rounded-2xl backdrop-blur-sm flex flex-col gap-6">
              <div>
                <h3 className="text-lg font-semibold text-slate-200">Button Variants</h3>
                <p className="text-sm text-slate-500 mt-1">Interactive state triggers with active micro-animations.</p>
              </div>
              
              <div className="flex flex-wrap gap-4 items-center">
                <Button variant="primary">Primary Accent</Button>
                <Button variant="secondary">Secondary Dark</Button>
                <Button variant="danger">Danger / Protest</Button>
                <Button variant="ghost">Ghost Trigger</Button>
              </div>

              <div className="flex flex-wrap gap-4 items-end mt-4">
                <Button variant="primary" size="sm">Small Accent</Button>
                <Button variant="primary" size="md">Medium Accent</Button>
                <Button variant="primary" size="lg">Large Accent</Button>
              </div>
            </div>

            {/* Inputs Showcase */}
            <div className="border border-navy-800 bg-navy-900/40 p-8 rounded-2xl backdrop-blur-sm flex flex-col gap-6">
              <div>
                <h3 className="text-lg font-semibold text-slate-200">Accessible Form Controls</h3>
                <p className="text-sm text-slate-500 mt-1">Dark mode standard inputs with active accessibility states.</p>
              </div>

              <div className="flex flex-col gap-4">
                <Input 
                  label="Student Email Address" 
                  placeholder="Enter your student email (e.g., student@domain.edu)" 
                />
                
                <Input 
                  label="Transaction ID (For Manual Events)" 
                  placeholder="e.g. TRX82939281" 
                  error="This transaction ID is required for verification."
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto border-t border-navy-800 bg-navy-950 py-8">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-sm text-slate-500 font-sans">
            © 2026 Voice of Northern. All rights reserved.
          </span>
          <span className="text-sm text-slate-500 hover:text-slate-400 cursor-pointer font-sans">
            Security & Privacy Guidelines
          </span>
        </div>
      </footer>
    </div>
  );
}
