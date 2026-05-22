import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function proxy(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // Custom mock token verification concept (To be synced with JWT token cookie parsing)
    const isAuthenticated = request.cookies.has('von_session_token');

    // Guard rails for protected dashboards [cite: 241]
    if (pathname.startsWith('/admin') || pathname.startsWith('/dashboard')) {
        if (!isAuthenticated) {
            // Direct redirection toward secure login screen
            const loginUrl = new URL('/login', request.url);
            return NextResponse.redirect(loginUrl);
        }
    }

    return NextResponse.next();
}

// Config to run middleware only on relevant structural pathways
export const config = {
    matcher: ['/admin/:path*', '/dashboard/:path*'],
};