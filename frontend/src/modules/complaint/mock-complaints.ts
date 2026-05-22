import { Complaint } from './types';

export const mockComplaints: Complaint[] = [
    {
        id: 'cmp-901',
        title: 'Extremely high and unjustified retake fees per credit',
        description: 'The university administration has suddenly increased the retake fee by 40% without any prior discussion with the student body. This is a clear violation of our financial rights as students.',
        isAnonymous: true,
        status: 'APPROVED',
        category: 'ADMINISTRATION',
        evidences: [
            { id: 'ev-1', fileUrl: '/docs/fee_structure.pdf', fileType: 'PDF', fileName: 'fee_structure.pdf' }
        ],
        createdAt: '2026-05-18T10:30:00.000Z',
        updatedAt: '2026-05-20T14:22:00.000Z',
        adminRemarks: 'Case published to public wall. Moving to negotiations with controller office.'
    },
    {
        id: 'cmp-902',
        title: 'Defective Air Conditioners in Building 3 Labs',
        description: 'For the last 3 weeks, none of the AC units in Lab 304 and 305 are functioning. It is impossible to attend consecutive 2-hour coding classes in this extreme heat.',
        isAnonymous: false,
        status: 'UNDER_REVIEW',
        category: 'FACILITIES',
        submittedBy: {
            name: 'Tanvir Ahmed',
            studentId: '2023-1-60-122',
            department: 'CSE'
        },
        evidences: [],
        createdAt: '2026-05-21T09:00:00.000Z',
        updatedAt: '2026-05-21T11:00:00.000Z'
    }
];