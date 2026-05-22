'use client';
import React, { useState } from 'react';

interface DepartmentItem {
  id: string;
  name: string;
  code: string;
  headName: string;
  status: 'ACTIVE' | 'INACTIVE';
  totalStudents: number;
}

export default function AdminDepartmentsPage() {
  const [departments, setDepartments] = useState<DepartmentItem[]>([
    { id: 'dept-1', name: 'Computer Science & Engineering', code: 'CSE', headName: 'Dr. Aminul Islam', status: 'ACTIVE', totalStudents: 320 },
    { id: 'dept-2', name: 'Electrical & Electronic Engineering', code: 'EEE', headName: 'Dr. Sarah Rahman', status: 'ACTIVE', totalStudents: 140 },
    { id: 'dept-3', name: 'Pharmacy & Biological Sciences', code: 'PHR', headName: 'Prof. M. A. Bakar', status: 'ACTIVE', totalStudents: 210 },
    { id: 'dept-4', name: 'Bachelor of Business Administration', code: 'BBA', headName: 'Prof. Farhana Begum', status: 'ACTIVE', totalStudents: 410 },
    { id: 'dept-5', name: 'School of Law & Legal Studies', code: 'LAW', headName: 'Justice (Rtd) M. Kamal', status: 'ACTIVE', totalStudents: 190 }
  ]);

  // Form State
  const [name, setName] = useState('');
  const [code, setCode] = useState('');
  const [headName, setHeadName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleAddDept = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !code.trim()) return;

    setIsSubmitting(true);

    const freshDept: DepartmentItem = {
      id: `dept-${Date.now()}`,
      name,
      code: code.toUpperCase().trim(),
      headName: headName || 'Unassigned',
      status: 'ACTIVE',
      totalStudents: 0
    };

    setTimeout(() => {
      setDepartments([...departments, freshDept]);
      setIsSubmitting(false);
      setName('');
      setCode('');
      setHeadName('');
    }, 600);
  };

  const handleToggleStatus = (id: string) => {
    setDepartments(prev =>
      prev.map(d => (d.id === id ? { ...d, status: d.status === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE' } : d))
    );
  };

  const handleDeleteDept = (id: string) => {
    setDepartments(prev => prev.filter(d => d.id !== id));
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      
      {/* Header */}
      <div className="border-b border-slate-900 pb-5">
        <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-white">
          University Department Registry
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Add new departments with unique codes, audit active heads, and manage status constraints.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-12 items-start">
        
        {/* Left Side: Create Dept Form */}
        <div className="lg:col-span-4 bg-slate-900/30 border border-slate-900 rounded-2xl p-5 space-y-4">
          <h2 className="text-sm font-black text-white uppercase tracking-wider border-b border-slate-850 pb-2">
            Create Department Code
          </h2>

          <form onSubmit={handleAddDept} className="space-y-4 text-xs">
            <div className="space-y-1">
              <label className="font-bold text-slate-350">Department Name</label>
              <input
                type="text"
                required
                placeholder="e.g. Department of Pharmacy..."
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500"
                value={name}
                onChange={e => setName(e.target.value)}
              />
            </div>

            <div className="space-y-1">
              <label className="font-bold text-slate-350">Department Code (Short)</label>
              <input
                type="text"
                required
                placeholder="e.g. CSE, EEE, PHR..."
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500"
                value={code}
                onChange={e => setCode(e.target.value)}
              />
            </div>

            <div className="space-y-1">
              <label className="font-bold text-slate-350">Head of Department (Chairman)</label>
              <input
                type="text"
                placeholder="e.g. Dr. Aminul Islam..."
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white placeholder-slate-650 focus:outline-none focus:border-cyan-500"
                value={headName}
                onChange={e => setHeadName(e.target.value)}
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-2.5 bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-black rounded-xl uppercase tracking-wider text-[11px] transition-colors"
            >
              {isSubmitting ? 'Creating Registry...' : 'Register Department'}
            </button>
          </form>
        </div>

        {/* Right Side: Registry List */}
        <div className="lg:col-span-8 bg-slate-900/10 border border-slate-900 rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-900 text-[10px] font-bold text-slate-500 uppercase bg-slate-950/40">
                  <th className="p-4">Dept Code</th>
                  <th className="p-4">Department Name</th>
                  <th className="p-4">Department Head</th>
                  <th className="p-4">Students (Mock)</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-900/60 font-sans">
                {departments.map(dept => (
                  <tr key={dept.id} className="hover:bg-slate-900/10 transition-colors">
                    <td className="p-4 font-mono font-bold text-cyan-400 text-sm">
                      {dept.code}
                    </td>
                    <td className="p-4 font-semibold text-slate-200">
                      {dept.name}
                    </td>
                    <td className="p-4 text-slate-400 font-medium">
                      {dept.headName}
                    </td>
                    <td className="p-4 font-mono text-slate-350">
                      {dept.totalStudents} Students
                    </td>
                    <td className="p-4">
                      <button
                        onClick={() => handleToggleStatus(dept.id)}
                        className={`px-2 py-0.5 text-[9px] font-black rounded border uppercase ${
                          dept.status === 'ACTIVE'
                            ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                            : 'bg-slate-800 text-slate-500 border-slate-700'
                        }`}
                      >
                        {dept.status}
                      </button>
                    </td>
                    <td className="p-4 text-right">
                      <button
                        onClick={() => handleDeleteDept(dept.id)}
                        className="px-2 py-1 bg-red-950/40 border border-red-900/30 hover:bg-red-900 text-red-400 font-bold rounded text-[9px] transition-colors"
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {departments.length === 0 && (
            <div className="py-12 text-center text-slate-500 text-xs">
              No departments registered yet.
            </div>
          )}
        </div>

      </div>

    </div>
  );
}
