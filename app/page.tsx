import Link from 'next/link';

export default function Home() {
  return (
    <main className="container mx-auto p-4 text-center">
      <h1 className="text-4xl font-bold mb-4">Welcome to TaskMaster Pro</h1>
      <p className="text-lg mb-6">Manage your tasks efficiently. Sign in to get started.</p>
      <Link
        href="/auth/signin"
        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
      >
        Sign In
      </Link>
    </main>
  );
}