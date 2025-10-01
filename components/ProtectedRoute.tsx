'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { ReactNode, useEffect } from 'react';

interface ProtectedRouteProps {
    children: ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
    const { data: session, status } = useSession();
    const router = useRouter();

    useEffect(() => {
        if (status === 'loading') return;
        if (!session) router.push('/auth/signin');
    }, [session, status, router]);

    if (status === 'loading') {
        return <div className="container mx-auto p-4">Loading...</div>;
    }

    return session ? <>{children}</> : null;
}