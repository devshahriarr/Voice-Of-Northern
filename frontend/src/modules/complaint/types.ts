// Aligned strictly with SRS FR-CMP-10
export type ComplaintStatus = 'PENDING' | 'UNDER_REVIEW' | 'APPROVED' | 'REJECTED' | 'RESOLVED' | 'ESCALATED';

export interface ComplaintEvidence {
    id: string;
    fileUrl: string;
    fileType: 'IMAGE' | 'PDF' | 'VIDEO';
    fileName: string;
}

export interface Complaint {
    id: string;
    title: string;
    description: string;
    isAnonymous: boolean;
    status: ComplaintStatus;
    category: 'ACADEMIC' | 'ADMINISTRATION' | 'FACILITIES' | 'HARASSMENT' | 'OTHERS';
    submittedBy?: {
        name: string;
        studentId: string;
        department: string;
    };
    evidences: ComplaintEvidence[];
    createdAt: string;
    updatedAt: string;
    adminRemarks?: string;
}