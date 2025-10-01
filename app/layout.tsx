import './globals.css';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Task Manager',
  description: 'A simple task management app',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-100">
        <nav className="bg-blue-500 text-white p-4">
          <div className="container mx-auto flex justify-between">
            <Link href="/" className="text-xl font-bold">
              Task Manager
            </Link>
            <div>
              <Link href="/auth/signin" className="mr-4">
                Sign In
              </Link>
              <Link href="/auth/signout">
                Sign Out
              </Link>
            </div>
          </div>
        </nav>
        <main>{children}</main>
      </body>
    </html>
  );
}