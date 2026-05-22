/* eslint-disable react-hooks/purity */
'use client';
import React, { useState } from 'react';

interface AuditTrailItem {
  id: string;
  timestamp: string;
  executedBy: string;
  role: 'SUPER_ADMIN' | 'ADMIN' | 'MODERATOR';
  actionContext: string;
  sourceIp: string;
  severity: 'INFO' | 'WARNING' | 'CRITICAL';
}

interface SoftDeletedRecord {
  id: string;
  entityType: 'COMPLAINT' | 'USER_MEMBER' | 'EVENT' | 'CONTENT_POST';
  displayName: string;
  deletedAt: string;
  deletedBy: string;
}

const initialAuditTrails: AuditTrailItem[] = [
  {
    id: 'log-7001',
    timestamp: '2026-05-22T11:45:00Z',
    executedBy: 'Sajid Al Hasan',
    role: 'SUPER_ADMIN',
    actionContext: 'DECRYPTED anonymous student identity for Complaint #cmp-901',
    sourceIp: '192.168.1.45',
    severity: 'CRITICAL'
  },
  {
    id: 'log-7002',
    timestamp: '2026-05-22T10:12:00Z',
    executedBy: 'Farhan Kabir',
    role: 'ADMIN',
    actionContext: 'APPROVED membership application for Rahat Chowdhury (#2023-1-60-044)',
    sourceIp: '192.168.1.109',
    severity: 'INFO'
  },
  {
    id: 'log-7003',
    timestamp: '2026-05-22T09:05:00Z',
    executedBy: 'Nila Sultana',
    role: 'MODERATOR',
    actionContext: 'FLAGGED Blog post "Campus Traffic Rules Guide" as INAPPROPRIATE',
    sourceIp: '10.0.4.56',
    severity: 'WARNING'
  },
  {
    id: 'log-7004',
    timestamp: '2026-05-21T18:30:00Z',
    executedBy: 'Farhan Kabir',
    role: 'ADMIN',
    actionContext: 'SOFT DELETED Event listing "Old Hall Reunion 2026"',
    sourceIp: '192.168.1.109',
    severity: 'WARNING'
  }
];

const initialDeletedRecords: SoftDeletedRecord[] = [
  {
    id: 'cmp-988',
    entityType: 'COMPLAINT',
    displayName: 'Improper sanitation facilities in the north campus cafeteria',
    deletedAt: '2026-05-22T08:15:00Z',
    deletedBy: 'Farhan Kabir'
  },
  {
    id: 'mem-056',
    entityType: 'USER_MEMBER',
    displayName: 'Kazi Maksud, ID: 2021-1-60-112',
    deletedAt: '2026-05-21T14:30:00Z',
    deletedBy: 'Sajid Al Hasan'
  },
  {
    id: 'evt-441',
    entityType: 'EVENT',
    displayName: 'Intra-Department Programming Contest',
    deletedAt: '2026-05-20T10:11:00Z',
    deletedBy: 'Nila Sultana'
  }
];

export default function AdminAuditLogsPage() {
  const [logs, setLogs] = useState<AuditTrailItem[]>(initialAuditTrails);
  const [deletedRecords, setDeletedRecords] = useState<SoftDeletedRecord[]>(initialDeletedRecords);
  const [searchQuery, setSearchQuery] = useState('');
  const [severityFilter, setSeverityFilter] = useState<'ALL' | 'INFO' | 'WARNING' | 'CRITICAL'>('ALL');

  const handleRestoreRecord = (record: SoftDeletedRecord) => {
    // Remove from vault
    setDeletedRecords(prev => prev.filter(r => r.id !== record.id));

    // Simulate appending a restore log to audit trails
    const newLogId = `log-${Date.now()}`;
    const restoreLog: AuditTrailItem = {
      id: newLogId,
      timestamp: new Date().toISOString(),
      executedBy: 'Sajid Al Hasan',
      role: 'SUPER_ADMIN',
      actionContext: `RESTORED soft-deleted ${record.entityType} record "${record.displayName}"`,
      sourceIp: '127.0.0.1',
      severity: 'INFO'
    };
    setLogs(prev => [restoreLog, ...prev]);
  };

  const getSeverityStyles = (severity: AuditTrailItem['severity']) => {
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

  const filteredLogs = logs.filter(log => {
    const matchesSeverity = severityFilter === 'ALL' || log.severity === severityFilter;
    const matchesQuery = log.executedBy.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.actionContext.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.id.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSeverity && matchesQuery;
  });

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="border-b border-slate-900 pb-5">
        <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-white">
          Infrastructure Audit Ledger
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Streaming list of administrator transactions, security updates, and a dedicated soft-delete database recovery vault.
        </p>
      </div>

      {/* Audit Trails Segment */}
      <div className="space-y-4">
        <h2 className="text-sm font-black text-white uppercase tracking-wider">System Activity Stream</h2>

        {/* Filters */}
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
                {sev}
              </button>
            ))}
          </div>

          <div className="relative w-full md:max-w-xs">
            <input
              type="text"
              placeholder="Search activity trails..."
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 pl-9 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
            />
            <span className="absolute left-3 top-2.5 text-slate-500 text-xs">🔍</span>
          </div>
        </div>

        {/* Ledger Stream Table */}
        <div className="bg-slate-900/10 border border-slate-900 rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-900 text-[10px] font-bold text-slate-500 uppercase bg-slate-950/40">
                  <th className="p-4">Timestamp</th>
                  <th className="p-4">Log ID</th>
                  <th className="p-4">Executed By</th>
                  <th className="p-4">Action Context String</th>
                  <th className="p-4">Source IP</th>
                  <th className="p-4 text-right">Security Level</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-900/60 font-mono">
                {filteredLogs.map(log => (
                  <tr key={log.id} className="hover:bg-slate-900/20 transition-colors">
                    <td className="p-4 text-slate-400 text-[11px]">
                      {new Date(log.timestamp).toLocaleString()}
                    </td>
                    <td className="p-4 text-slate-500 text-[10px]">{log.id}</td>
                    <td className="p-4 font-sans text-white">
                      <span className="font-bold">{log.executedBy}</span>
                      <span className="text-[9px] text-slate-500 block uppercase font-bold tracking-wider">{log.role}</span>
                    </td>
                    <td className="p-4 text-slate-200 font-sans max-w-sm truncate" title={log.actionContext}>
                      {log.actionContext}
                    </td>
                    <td className="p-4 text-slate-400">{log.sourceIp}</td>
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

          {filteredLogs.length === 0 && (
            <div className="py-16 text-center text-slate-500 text-xs">
              No matching activity trails in this segment.
            </div>
          )}
        </div>
      </div>

      {/* Isolated Soft-Delete Vault Recovery Panel */}
      <div className="space-y-4 border-t border-slate-900 pt-8">
        <div className="space-y-1">
          <h2 className="text-sm font-black text-red-400 uppercase tracking-wider flex items-center gap-2">
            <span>🛡️</span>
            <span>Soft Delete Recovery Vault</span>
          </h2>
          <p className="text-xs text-slate-500">
            Isolated table capture of database records marked deleted. Restoring returns them to system state tables.
          </p>
        </div>

        <div className="bg-slate-900/10 border border-slate-900 rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-900 text-[10px] font-bold text-slate-500 uppercase bg-slate-950/40">
                  <th className="p-4">Entity Type</th>
                  <th className="p-4">Record Identifier</th>
                  <th className="p-4">Deletion Date</th>
                  <th className="p-4">Deleted By</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-900/60 font-sans">
                {deletedRecords.map(record => (
                  <tr key={record.id} className="hover:bg-slate-900/20 transition-colors">
                    <td className="p-4">
                      <span className="px-2 py-0.5 text-[9px] font-black rounded border bg-purple-500/10 text-purple-400 border-purple-500/20">
                        {record.entityType}
                      </span>
                    </td>
                    <td className="p-4 font-semibold text-slate-200">
                      <div className="text-xs font-bold">{record.displayName}</div>
                      <div className="font-mono text-[10px] text-slate-500 mt-0.5">ID: {record.id}</div>
                    </td>
                    <td className="p-4 text-slate-500 font-mono">
                      {new Date(record.deletedAt).toLocaleString()}
                    </td>
                    <td className="p-4 text-slate-400 font-medium">
                      {record.deletedBy}
                    </td>
                    <td className="p-4 text-right">
                      <button
                        onClick={() => handleRestoreRecord(record)}
                        className="px-3 py-1.5 bg-emerald-950/40 border border-emerald-900/30 hover:bg-emerald-900 text-emerald-400 font-bold rounded-xl text-xs transition-colors"
                      >
                        🔄 Restore Record
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {deletedRecords.length === 0 && (
            <div className="py-16 text-center text-slate-500 text-xs">
              No soft-deleted records currently in vault.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
