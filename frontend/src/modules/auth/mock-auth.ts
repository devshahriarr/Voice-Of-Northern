import { UserSession } from './types';

// Mocking a user session that is pending verification
export const mockPendingUser: UserSession = {
    id: 'usr-101',
    name: 'Sabbir Rahman',
    email: 'sabbir.cse@university.edu',
    role: 'GENERAL_MEMBER',
    studentId: '2023-2-60-044',
    department: 'CSE',
    batch: '52th Batch',
    status: 'PENDING',
};
