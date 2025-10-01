import { fetchTask } from '@/lib/api';
import Link from 'next/link';
import {Task} from '@/lib/types'

export default async function TaskDetail({ params }: { params: { id: string } }) {
    let task: Task | null = null;
    try {
        task = await fetchTask(params.id);
    } catch (error) {
        return (
            <main className="container mx-auto p-4">
                <p className="text-red-500">{(error as Error).message}</p>
            </main>
        );
    }

    return (
        <main className="container mx-auto p-4">
            <header className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white p-4 rounded-t-lg">
                <Link
                    href="/dashboard"
                    className="flex items-center gap-2 text-white hover:underline"
                >
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M15 19l-7-7 7-7"
                        />
                    </svg>
                    Back to Tasks
                </Link>
                <h1 className="text-2xl font-bold">Task Detail</h1>
                <p>Complete information about your task</p>
            </header>
            <div className="bg-white p-4 rounded-b-lg shadow">
                <h2 className="text-xl font-semibold flex items-center gap-2">
                    <svg className="h-5 w-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                        />
                    </svg>
                    {task.name}
                </h2>
                <div className="space-y-2 mt-4">
                    <p>
                        <strong>ID:</strong> #{task.id}
                    </p>
                    <p>
                        <strong>Description:</strong> {task.description || 'No description'}
                    </p>
                    <p>
                        <strong>Status:</strong>{' '}
                        <span
                            className={`inline-block px-2 py-1 rounded-full text-sm ${task.status === 'DONE'
                                ? 'bg-green-100 text-green-800'
                                : task.status === 'IN_PROGRESS'
                                    ? 'bg-blue-100 text-blue-800'
                                    : task.status === 'TODO'
                                        ? 'bg-yellow-100 text-yellow-800'
                                        : 'bg-gray-100 text-gray-800'
                                }`}
                        >
                            {task.status}
                        </span>
                    </p>
                    {task.createdAt && (
                        <p>
                            <strong>Created:</strong> {new Date(task.createdAt).toLocaleString()}
                        </p>
                    )}
                    {task.updatedAt && (
                        <p>
                            <strong>Updated:</strong> {new Date(task.updatedAt).toLocaleString()}
                        </p>
                    )}
                </div>
            </div>
        </main>
    );
}