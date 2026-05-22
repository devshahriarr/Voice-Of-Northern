'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { mockKPICounters, mockMonthlyActivity, mockAuditLogs, mockPendingVerifications } from '@/modules/admin/mock-analytics';
import { AuditActionType, AuditSeverity } from '@/modules/admin/types';

// Helper to return style class for severity badges
function getSeverityBadge(severity: AuditSeverity) {
    switch (severity) {
        case 'CRITICAL':
            return 'bg-red-500/10 text-red-400 border-red-500/20';
        case 'WARNING':
            return 'bg-amber-500/10 text-amber-400 border-amber-500/20';
        case 'INFO':
        default:
            return 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20';
    }
}

// Helper to return label for action types
function getActionLabel(type: AuditActionType) {
    return type.replace('_', ' ');
}

export default function AdminDashboardPage() {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    // Calculate resolution rate
    const totalComplaints = mockKPICounters.totalComplaints;
    const resolvedComplaints = mockKPICounters.resolvedComplaints;
    const resolutionRate = totalComplaints > 0
        ? ((resolvedComplaints / totalComplaints) * 100).toFixed(1)
        : '0.0';

    // SVG Line Chart Dimensions and Scaling Configurations
    const chartWidth = 500;
    const chartHeight = 200;
    const paddingLeft = 40;
    const paddingRight = 30;
    const paddingTop = 30;
    const paddingBottom = 35;

    const maxVal = 100;
    const xPoints = mockMonthlyActivity.map((_, i) => {
        const workableWidth = chartWidth - paddingLeft - paddingRight;
        return paddingLeft + (i / (mockMonthlyActivity.length - 1)) * workableWidth;
    });

    const getY = (value: number) => {
        const workableHeight = chartHeight - paddingTop - paddingBottom;
        return chartHeight - paddingBottom - (value / maxVal) * workableHeight;
    };

    // Construct SVG path strings
    const newComplaintsPath = mockMonthlyActivity
        .map((d, i) => `${i === 0 ? 'M' : 'L'} ${xPoints[i]} ${getY(d.newComplaints)}`)
        .join(' ');

    const resolvedComplaintsPath = mockMonthlyActivity
        .map((d, i) => `${i === 0 ? 'M' : 'L'} ${xPoints[i]} ${getY(d.resolvedComplaints)}`)
        .join(' ');

    // Area Path constructs for underlying gradient fills
    const newComplaintsAreaPath = `${newComplaintsPath} L ${xPoints[xPoints.length - 1]} ${chartHeight - paddingBottom} L ${xPoints[0]} ${chartHeight - paddingBottom} Z`;
    const resolvedComplaintsAreaPath = `${resolvedComplaintsPath} L ${xPoints[xPoints.length - 1]} ${chartHeight - paddingBottom} L ${xPoints[0]} ${chartHeight - paddingBottom} Z`;

    return (
        <div className="space-y-8 max-w-7xl mx-auto">

            {/* Dashboard Welcome Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-900 pb-5">
                <div>
                    <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-white font-sans">
                        Admin Command Workspace
                    </h1>
                    <p className="text-xs text-slate-400 mt-1">
                        System telemetry, member approvals queue, and secure identity reveal access audits.
                    </p>
                </div>
                <div className="flex items-center gap-2 text-[11px] font-semibold text-slate-400 bg-slate-900/50 border border-slate-800 rounded-xl px-4 py-2 w-fit">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                    <span>Live Monitoring Active</span>
                </div>
            </div>

            {/* Component A: High-Impact KPI Grid */}
            <section className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                
                {/* Card 1: Complaints Summary */}
                <div className="bg-slate-900/30 border border-slate-900 rounded-2xl p-5 hover:border-slate-800 transition-all">
                    <div className="flex items-center justify-between text-slate-400">
                        <span className="text-[10px] font-bold uppercase tracking-wider">Advocacy Complaints</span>
                        <span className="text-xs">📂</span>
                    </div>
                    <div className="mt-4 flex items-baseline gap-2">
                        <span className="text-3xl font-black text-white">{mockKPICounters.totalComplaints}</span>
                        <span className="text-[10px] text-slate-500">submitted</span>
                    </div>
                    <div className="mt-2 text-xs flex items-center justify-between">
                        <span className="text-slate-400">Needs Review:</span>
                        <span className="font-bold text-orange-500 animate-pulse">{mockKPICounters.pendingComplaints} pending</span>
                    </div>
                </div>

                {/* Card 2: Members Telemetry */}
                <div className="bg-slate-900/30 border border-slate-900 rounded-2xl p-5 hover:border-slate-800 transition-all">
                    <div className="flex items-center justify-between text-slate-400">
                        <span className="text-[10px] font-bold uppercase tracking-wider">Student Membership</span>
                        <span className="text-xs">👥</span>
                    </div>
                    <div className="mt-4 flex items-baseline gap-2">
                        <span className="text-3xl font-black text-white">{mockKPICounters.totalMembers}</span>
                        <span className="text-[10px] text-slate-500">verified</span>
                    </div>
                    <div className="mt-2 text-xs flex items-center justify-between">
                        <span className="text-slate-400">Applications:</span>
                        <span className="font-bold text-cyan-400">{mockKPICounters.pendingVerifications} awaiting</span>
                    </div>
                </div>

                {/* Card 3: Events Telemetry */}
                <div className="bg-slate-900/30 border border-slate-900 rounded-2xl p-5 hover:border-slate-800 transition-all">
                    <div className="flex items-center justify-between text-slate-400">
                        <span className="text-[10px] font-bold uppercase tracking-wider">Active Events</span>
                        <span className="text-xs">🎟️</span>
                    </div>
                    <div className="mt-4 flex items-baseline gap-2">
                        <span className="text-3xl font-black text-white">{mockKPICounters.activeEvents}</span>
                        <span className="text-[10px] text-slate-500">campaigns</span>
                    </div>
                    <div className="mt-2 text-xs text-slate-400">
                        Registration and manual ticketing pipelines active.
                    </div>
                </div>

                {/* Card 4: Global Resolution Rate */}
                <div className="bg-slate-900/30 border border-slate-900 rounded-2xl p-5 hover:border-slate-800 transition-all">
                    <div className="flex items-center justify-between text-slate-400">
                        <span className="text-[10px] font-bold uppercase tracking-wider">Resolution Efficiency</span>
                        <span className="text-xs">⚖️</span>
                    </div>
                    <div className="mt-4 flex items-baseline gap-2">
                        <span className="text-3xl font-black text-white">{resolutionRate}%</span>
                        <span className="text-[10px] text-slate-500">success rate</span>
                    </div>
                    <div className="mt-2 text-xs flex items-center justify-between">
                        <span className="text-slate-400">Closed issues:</span>
                        <span className="font-semibold text-emerald-400">{mockKPICounters.resolvedComplaints} resolved</span>
                    </div>
                </div>

            </section>

            {/* Component B: Analytical Graphical Feed */}
            <section className="bg-slate-900/30 border border-slate-900 rounded-2xl p-6 hover:border-slate-850 transition-all">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                    <div>
                        <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                            Grievance Resolution Growth Matrix
                        </h3>
                        <p className="text-[10px] text-slate-400 mt-0.5">
                            Comparative volume tracker for new complaints vs closed cases (last 6 months).
                        </p>
                    </div>

                    {/* Chart Legends */}
                    <div className="flex items-center gap-4 text-xs font-semibold">
                        <div className="flex items-center gap-2">
                            <span className="w-3 h-1.5 rounded bg-cyan-400"></span>
                            <span className="text-slate-300">New Complaints</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="w-3 h-1.5 rounded bg-purple-500"></span>
                            <span className="text-slate-300">Resolved Cases</span>
                        </div>
                    </div>
                </div>

                {/* SVG Responsive Chart Viewport */}
                <div className="relative w-full overflow-hidden">
                    <svg
                        viewBox={`0 0 ${chartWidth} ${chartHeight}`}
                        className="w-full h-auto overflow-visible select-none"
                    >
                        <defs>
                            {/* Gradients */}
                            <linearGradient id="cyanGrad" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.2" />
                                <stop offset="100%" stopColor="#22d3ee" stopOpacity="0.0" />
                            </linearGradient>
                            <linearGradient id="purpleGrad" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="#a855f7" stopOpacity="0.2" />
                                <stop offset="100%" stopColor="#a855f7" stopOpacity="0.0" />
                            </linearGradient>
                        </defs>

                        {/* Y-axis gridlines */}
                        {[0, 25, 50, 75, 100].map((tick) => (
                            <g key={tick}>
                                <line
                                    x1={paddingLeft}
                                    y1={getY(tick)}
                                    x2={chartWidth - paddingRight}
                                    y2={getY(tick)}
                                    stroke="#1e293b"
                                    strokeWidth="1"
                                    strokeDasharray="4 4"
                                />
                                <text
                                    x={paddingLeft - 10}
                                    y={getY(tick) + 4}
                                    textAnchor="end"
                                    fill="#64748b"
                                    className="text-[9px] font-bold font-mono"
                                >
                                    {tick}
                                </text>
                            </g>
                        ))}

                        {/* X-axis labels */}
                        {mockMonthlyActivity.map((d, i) => (
                            <text
                                key={d.month}
                                x={xPoints[i]}
                                y={chartHeight - 12}
                                textAnchor="middle"
                                fill="#64748b"
                                className="text-[10px] font-bold"
                            >
                                {d.month}
                            </text>
                        ))}

                        {/* Area Gradients */}
                        <path d={newComplaintsAreaPath} fill="url(#cyanGrad)" />
                        <path d={resolvedComplaintsAreaPath} fill="url(#purpleGrad)" />

                        {/* Line Paths */}
                        <path
                            d={newComplaintsPath}
                            fill="none"
                            stroke="#22d3ee"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <path
                            d={resolvedComplaintsPath}
                            fill="none"
                            stroke="#a855f7"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />

                        {/* Interactive Vertical Hover Guide Grid */}
                        {xPoints.map((x, i) => (
                            <g
                                key={i}
                                onMouseEnter={() => setHoveredIndex(i)}
                                onMouseLeave={() => setHoveredIndex(null)}
                                className="cursor-pointer"
                            >
                                {/* Invisible wider interaction rect */}
                                <rect
                                    x={x - 25}
                                    y={paddingTop}
                                    width="50"
                                    height={chartHeight - paddingTop - paddingBottom}
                                    fill="transparent"
                                />
                                
                                {/* Vertical highlight line */}
                                {hoveredIndex === i && (
                                    <line
                                        x1={x}
                                        y1={paddingTop}
                                        x2={x}
                                        y2={chartHeight - paddingBottom}
                                        stroke="#06b6d4"
                                        strokeWidth="1.5"
                                        strokeDasharray="2 2"
                                    />
                                )}

                                {/* Glow nodes */}
                                {hoveredIndex === i && (
                                    <>
                                        <circle
                                            cx={x}
                                            cy={getY(mockMonthlyActivity[i].newComplaints)}
                                            r="5"
                                            fill="#22d3ee"
                                            stroke="#090d16"
                                            strokeWidth="2"
                                        />
                                        <circle
                                            cx={x}
                                            cy={getY(mockMonthlyActivity[i].resolvedComplaints)}
                                            r="5"
                                            fill="#a855f7"
                                            stroke="#090d16"
                                            strokeWidth="2"
                                        />
                                    </>
                                )}
                            </g>
                        ))}
                    </svg>

                    {/* Interactive Tooltip Card Overlay */}
                    {hoveredIndex !== null && (
                        <div
                            className="absolute bg-slate-950/95 border border-slate-800 p-3 rounded-xl shadow-xl z-20 text-[10px] space-y-1"
                            style={{
                                left: `${(xPoints[hoveredIndex] / chartWidth) * 90}%`,
                                top: '10%'
                            }}
                        >
                            <h4 className="font-bold text-white border-b border-slate-900 pb-1 mb-1">
                                {mockMonthlyActivity[hoveredIndex].month} Telemetry
                            </h4>
                            <div className="flex justify-between gap-6 text-slate-400">
                                <span>New Complaints:</span>
                                <span className="font-bold text-cyan-400">{mockMonthlyActivity[hoveredIndex].newComplaints}</span>
                            </div>
                            <div className="flex justify-between gap-6 text-slate-400">
                                <span>Resolved:</span>
                                <span className="font-bold text-purple-400">{mockMonthlyActivity[hoveredIndex].resolvedComplaints}</span>
                            </div>
                            <div className="flex justify-between gap-6 text-slate-400">
                                <span>New Members:</span>
                                <span className="font-bold text-white">+{mockMonthlyActivity[hoveredIndex].newMembers}</span>
                            </div>
                        </div>
                    )}
                </div>
            </section>

            {/* Component C: Split Operations Grid */}
            <section className="grid gap-6 lg:grid-cols-2">

                {/* Left Column - Member Verification Queue */}
                <div className="bg-slate-900/30 border border-slate-900 rounded-2xl p-6 flex flex-col justify-between hover:border-slate-850 transition-all">
                    <div className="space-y-4">
                        <div className="flex items-center justify-between border-b border-slate-900 pb-4">
                            <div>
                                <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                                    Registration Approvals Queue
                                </h3>
                                <p className="text-[10px] text-slate-400 mt-0.5">
                                    Manual verification registry matching official student ID files.
                                </p>
                            </div>
                            <span className="text-[10px] font-black bg-cyan-950 text-cyan-400 border border-cyan-900/40 px-2 py-0.5 rounded">
                                {mockPendingVerifications.length} active
                            </span>
                        </div>

                        {/* Queue Table */}
                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-xs border-collapse">
                                <thead>
                                    <tr className="border-b border-slate-900/50 text-[10px] font-bold text-slate-500 uppercase">
                                        <th className="pb-3 pr-2">Student Name</th>
                                        <th className="pb-3 px-2">Student ID</th>
                                        <th className="pb-3 pl-2">Department</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {mockPendingVerifications.map((item) => (
                                        <tr key={item.id} className="border-b border-slate-900/30 hover:bg-slate-900/20 group">
                                            <td className="py-3 pr-2 font-bold text-white group-hover:text-cyan-400 transition-colors">
                                                {item.name}
                                            </td>
                                            <td className="py-3 px-2 text-slate-400 font-mono">
                                                {item.studentId}
                                            </td>
                                            <td className="py-3 pl-2 text-slate-400">
                                                {item.department}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div className="pt-4 mt-4 border-t border-slate-900 flex justify-end">
                        <Link
                            href="/admin/members"
                            className="text-[11px] font-bold text-cyan-400 hover:text-cyan-300 transition-colors flex items-center gap-1"
                        >
                            <span>Go to Verification Panel</span>
                            <span>→</span>
                        </Link>
                    </div>
                </div>

                {/* Right Column - System Audit Logs Feed */}
                <div className="bg-slate-900/30 border border-slate-900 rounded-2xl p-6 hover:border-slate-850 transition-all space-y-4">
                    <div className="flex items-center justify-between border-b border-slate-900 pb-4">
                        <div>
                            <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                                System Audit Trails
                            </h3>
                            <p className="text-[10px] text-slate-400 mt-0.5">
                                Immutable logs tracking admin actions and privacy unlocks.
                            </p>
                        </div>
                        <Link
                            href="/admin/audit-logs"
                            className="text-[10px] font-bold text-slate-500 hover:text-slate-300 transition-colors"
                        >
                            View All
                        </Link>
                    </div>

                    {/* Scrollable logs timeline */}
                    <div className="space-y-4 max-h-[220px] overflow-y-auto pr-1 custom-scrollbar">
                        {mockAuditLogs.map((log) => (
                            <div
                                key={log.id}
                                className="flex gap-3 text-xs leading-relaxed border-l-2 border-slate-900 pl-4 relative before:absolute before:w-2 before:h-2 before:rounded-full before:bg-slate-800 before:-left-[5px] before:top-1.5 hover:border-cyan-500/50 transition-colors"
                            >
                                <div className="flex-1 space-y-1">
                                    <div className="flex items-center justify-between gap-4">
                                        <span className="font-bold text-slate-300">
                                            {log.adminName}
                                        </span>
                                        <span className="text-[9px] text-slate-500 font-mono">
                                            {new Date(log.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                        </span>
                                    </div>
                                    <p className="text-slate-400 text-[11px]">
                                        Executed <span className="text-slate-200 font-semibold">{getActionLabel(log.actionType)}</span> on <span className="font-mono text-cyan-400">{log.targetId}</span>
                                    </p>
                                </div>
                                <div className="flex-none">
                                    <span className={`px-2 py-0.5 text-[9px] font-black rounded border ${getSeverityBadge(log.severity)}`}>
                                        {log.severity}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </section>

        </div>
    );
}
