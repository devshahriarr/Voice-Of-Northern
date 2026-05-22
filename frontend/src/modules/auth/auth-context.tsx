'react';
import React, { createContext, useContext, useState, useEffect } from 'react';
import { AuthState, UserSession, UserRole } from './types';

interface AuthContextType extends AuthState {
    login: (token: string, user: UserSession) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [state, setState] = useState<AuthState>({
        user: null,
        token: null,
        isLoading: true,
    });

    useEffect(() => {
        // Client-side token checking from LocalStorage or HttpOnly cookies mock logic
        const storedToken = localStorage.getItem('von_token');
        const storedUser = localStorage.getItem('von_user');

        if (storedToken && storedUser) {
            try {
                setState({
                    token: storedToken,
                    user: JSON.parse(storedUser),
                    isLoading: false,
                });
            } catch {
                logout();
            }
        } else {
            setState((prev) => ({ ...prev, isLoading: false }));
        }
    }, []);

    const login = (token: string, user: UserSession) => {
        localStorage.setItem('von_token', token);
        localStorage.setItem('von_user', JSON.stringify(user));
        setState({ token, user, isLoading: false });
    };

    const logout = () => {
        localStorage.removeItem('von_token');
        localStorage.removeItem('von_user');
        setState({ token: null, user: null, isLoading: false });
    };

    return (
        <AuthContext.Provider value={{ ...state, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) throw new Error('useAuth must be used within an AuthProvider');
    return context;
}