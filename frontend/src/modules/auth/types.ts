export type UserRole =
    | 'SUPER_ADMIN'
    | 'ADMIN'
    | 'MODERATOR'
    | 'COMPLAINT_OFFICER'
    | 'EVENT_MANAGER'
    | 'CONTENT_WRITER'
    | 'GENERAL_MEMBER';

export type AccountStatus = 'PENDING' | 'APPROVED' | 'REJECTED';

export interface UserSession {
    id: string;
    name: string;
    email: string;
    role: UserRole;
    studentId: string;
    department: string;
    batch: string;
    status: AccountStatus; // Merged status directly to session
}

export interface AuthState {
    user: UserSession | null;
    token: string | null;
    isLoading: boolean;
}