'use client';
import React, { useState } from 'react';
import { mockAuditLogs as initialLogs } from '@/modules/admin/mock-analytics';
import { SystemAuditLog, AuditSeverity } from '@/modules/admin/types';

export default function AdminAuditLogsPage() {
    const [logs] = useState<SystemAuditLog[]>(initialLogs);
    const [severityFilter, setSeverityFilter] = useState<AuditSeverity | 'ALL'>('ALL');
    const [searchQuery, setSearchQuery] = useState('');

    const getSeverityStyles = (severity: AuditSeverity) => {
        switch (severity) {
            case 'CRITICAL':
                return 'bg-red-500/10 text-red-400 border-red-500/20';
            case 'WARNING':
                return 'bg-amber-500/10 text-amber-400 border-amber-500/20';
            case 'INFO':
            default:
                return 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20';
        }
    };

    const filtered = logs.filter(log => {
        const matchesSeverity = severityFilter === 'ALL' || log.severity === severityFilter;
        const matchesQuery = log.adminName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            log.actionType.toLowerCase().includes(searchQuery.toLowerCase()) ||
            log.targetId.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesSeverity && matchesQuery;
    });

    return (
        <div className="space-y-6 max-w-7xl mx-auto">
            {/* Header */}
            <div className="border-b border-slate-900 pb-5">
                <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-white">
                    Security & Audit Trails
                </h1>
                <p className="text-xs text-slate-400 mt-1">
                    Immutable activity log history containing administrator overrides, moderation status changes, and student privacy key unlocks.
                </p>
            </div>

            {/* Filter Toolbar */}
            <div className="bg-slate-900/20 border border-slate-900 rounded-2xl p-4 flex flex-col md:flex-row gap-4 items-center justify-between">
                <div className="flex bg-slate-950 p-1 rounded-xl border border-slate-900 w-full md:w-auto">
                    {(['ALL', 'INFO', 'WARNING', 'CRITICAL'] as const).map(sev => (
                        <button
                            key={sev}
                            onClick={() => setSeverityFilter(sev)}
                            className={`flex-1 md:flex-initial px-4 py-2 text-xs font-bold rounded-lg transition-all ${
                                severityFilter === sev
                                    ? 'bg-cyan-400 text-slate-950 shadow-md shadow-cyan-400/10'
                                    : 'text-slate-400 hover:text-slate-200'
                            }`}
                        >
                            {sev === 'ALL' ? 'All Alerts' : sev}
                        </button>
                    ))}
                </div>

                <div className="relative w-full md:max-w-xs">
                    <input
                        type="text"
                        placeholder="Search logs by actor or target..."
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 pl-9 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
                        value={searchQuery}
                        onChange={e => setSearchQuery(e.target.value)}
                    />
                    <span className="absolute left-3 top-2.5 text-slate-500 text-xs">🔍</span>
                </div>
            </div>

            {/* Logs Table Layout */}
            <div className="bg-slate-900/10 border border-slate-900 rounded-2xl overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs border-collapse">
                        <thead>
                            <tr className="border-b border-slate-900 text-[10px] font-bold text-slate-500 uppercase bg-slate-950/40">
                                <th className="p-4">Time stamp</th>
                                <th className="p-4">Log ID</th>
                                <th className="p-4">System Actor</th>
                                <th className="p-4">Action Event</th>
                                <th className="p-4">Target Index</th>
                                <th className="p-4 text-right">Security Level</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-900/60 font-mono">
                            {filtered.map(log => (
                                <tr key={log.id} className="hover:bg-slate-900/20 transition-colors">
                                    <td className="p-4 text-slate-400 text-[11px]">
                                        {new Date(log.timestamp).toLocaleString()}
                                    </td>
                                    <td className="p-4 text-slate-500 text-[10px]">
                                        {log.id}
                                    </td>
                                    <td className="p-4 font-sans font-bold text-white">
                                        {log.adminName}
                                    </td>
                                    <td className="p-4 text-slate-300">
                                        {log.actionType.replace('_', ' ')}
                                    </td>
                                    <td className="p-4 text-cyan-400">
                                        {log.targetId}
                                    </td>
                                    <td className="p-4 text-right">
                                        <span className={`px-2.5 py-1 text-[9px] font-black rounded border ${getSeverityStyles(log.severity)}`}>
                                            {log.severity}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {filtered.length === 0 && (
                    <div className="py-16 text-center text-slate-500 text-xs">
                        No security logs match the current search filters.
                    </div>
                )}
            </div>
        </div>
    );
}
