export interface KPICounters {
    totalComplaints: number;
    resolvedComplaints: number;
    pendingComplaints: number;
    totalMembers: number;
    pendingVerifications: number;
    activeEvents: number;
}

export interface MonthlyActivity {
    month: string;
    newComplaints: number;
    resolvedComplaints: number;
    newMembers: number;
}

export type AuditActionType =
    | 'COMPLAINT_APPROVED'
    | 'COMPLAINT_REJECTED'
    | 'MEMBER_VERIFIED'
    | 'MEMBER_REJECTED'
    | 'EVENT_CREATED'
    | 'EVENT_UPDATED'
    | 'IDENTITY_REVEALED'
    | 'POST_PUBLISHED';

export type AuditSeverity = 'INFO' | 'WARNING' | 'CRITICAL';

export interface SystemAuditLog {
    id: string;
    adminName: string;
    actionType: AuditActionType;
    targetId: string;
    timestamp: string;
    severity: AuditSeverity;
}

export interface PendingVerification {
    id: string;
    name: string;
    studentId: string;
    department: string;
    batch: string;
    submittedAt: string;
}
