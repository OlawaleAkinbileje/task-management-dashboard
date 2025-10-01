import Link from 'next/link';

export default function NotFound() {
    return (
        <main className="container mx-auto p-4 text-center">
            <h1 className="text-3xl font-bold text-red-500 mb-4">404 - Page Not Found</h1>
            <p className="mb-4">Sorry, the page you are looking for does not exist.</p>
            <Link
                href="/dashboard"
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            >
                Go to Dashboard
            </Link>
        </main>
    );
}