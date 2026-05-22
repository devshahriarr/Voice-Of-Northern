// Strict User Roles aligned with production grade SRS
export type UserRole =
    | 'SUPER_ADMIN'
    | 'ADMIN'
    | 'MODERATOR'
    | 'COMPLAINT_OFFICER'
    | 'EVENT_MANAGER'
    | 'CONTENT_WRITER'
    // | 'GENERAL_MEMBER';[cite: 124 - 173]
    | 'GENERAL_MEMBER';

export interface UserSession {
    id: string;
    name: string;
    email: string;
    role: UserRole;
    studentId?: string;[cite: 252]
    department?: string;[cite: 251]
    isVerified: boolean;[cite: 259]
}

export interface AuthState {
    user: UserSession | null;
    token: string | null;
    isLoading: boolean;
}