'use client';

import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function SignOut() {
    const router = useRouter();

    const handleSignOut = async () => {
        await signOut({ redirect: false });
        router.push('/auth/signin');
    };

    return (
        <main className="container mx-auto p-4 max-w-md">
            <h1 className="text-2xl font-bold mb-4">Sign Out</h1>
            <p className="mb-4">Are you sure you want to sign out?</p>
            <button
                onClick={handleSignOut}
                className="bg-red-500 text-white p-2 rounded-md hover:bg-red-600"
            >
                Sign Out
            </button>
        </main>
    );
}