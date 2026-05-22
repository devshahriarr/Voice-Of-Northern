import { KPICounters, MonthlyActivity, SystemAuditLog, PendingVerification } from './types';

export const mockKPICounters: KPICounters = {
    totalComplaints: 428,
    resolvedComplaints: 384,
    pendingComplaints: 44,
    totalMembers: 1240,
    pendingVerifications: 18,
    activeEvents: 5
};

export const mockMonthlyActivity: MonthlyActivity[] = [
    { month: 'Dec', newComplaints: 45, resolvedComplaints: 38, newMembers: 110 },
    { month: 'Jan', newComplaints: 52, resolvedComplaints: 48, newMembers: 140 },
    { month: 'Feb', newComplaints: 68, resolvedComplaints: 55, newMembers: 195 },
    { month: 'Mar', newComplaints: 80, resolvedComplaints: 72, newMembers: 170 },
    { month: 'Apr', newComplaints: 73, resolvedComplaints: 70, newMembers: 215 },
    { month: 'May', newComplaints: 90, resolvedComplaints: 85, newMembers: 245 }
];

export const mockAuditLogs: SystemAuditLog[] = [
    {
        id: 'log-001',
        adminName: 'Sajid Al Hasan',
        actionType: 'IDENTITY_REVEALED',
        targetId: 'COMP-729',
        timestamp: '2026-05-22T10:45:00Z',
        severity: 'CRITICAL'
    },
    {
        id: 'log-002',
        adminName: 'Tasmia Rahman',
        actionType: 'MEMBER_VERIFIED',
        targetId: 'USR-882',
        timestamp: '2026-05-22T09:12:00Z',
        severity: 'INFO'
    },
    {
        id: 'log-003',
        adminName: 'Nayeem Chowdhury',
        actionType: 'POST_PUBLISHED',
        targetId: 'BLOG-103',
        timestamp: '2026-05-21T16:30:00Z',
        severity: 'INFO'
    },
    {
        id: 'log-004',
        adminName: 'Sajid Al Hasan',
        actionType: 'COMPLAINT_APPROVED',
        targetId: 'COMP-810',
        timestamp: '2026-05-21T11:20:00Z',
        severity: 'INFO'
    },
    {
        id: 'log-005',
        adminName: 'Sajid Al Hasan',
        actionType: 'MEMBER_REJECTED',
        targetId: 'USR-901',
        timestamp: '2026-05-20T15:44:00Z',
        severity: 'WARNING'
    },
    {
        id: 'log-006',
        adminName: 'Tasmia Rahman',
        actionType: 'EVENT_CREATED',
        targetId: 'EVT-402',
        timestamp: '2026-05-20T10:00:00Z',
        severity: 'INFO'
    }
];

export const mockPendingVerifications: PendingVerification[] = [
    {
        id: 'verify-1',
        name: 'Rahat Chowdhury',
        studentId: '2023-1-60-044',
        department: 'Computer Science & Engineering',
        batch: '58th Batch',
        submittedAt: '2026-05-22T08:30:00Z'
    },
    {
        id: 'verify-2',
        name: 'Nusrat Jahan Mitu',
        studentId: '2024-2-80-012',
        department: 'Pharmacy',
        batch: '61st Batch',
        submittedAt: '2026-05-22T06:15:00Z'
    },
    {
        id: 'verify-3',
        name: 'Istiaque Ahmed',
        studentId: '2023-3-30-089',
        department: 'Electrical & Electronic Engineering',
        batch: '59th Batch',
        submittedAt: '2026-05-21T18:40:00Z'
    }
];
