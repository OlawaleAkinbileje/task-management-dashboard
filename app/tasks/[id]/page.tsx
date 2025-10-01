import { fetchTask } from '@/lib/api';
import Link from 'next/link';
import { Task } from '@/lib/types';

export default async function TaskDetail({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params; // Await params to extract id
    let task: Task | null = null;
    let error: string | null = null;

    try {
        task = await fetchTask(id);
    } catch (err) {
        error = 'Failed to load task. Please try again later.';
        console.error('TaskDetail fetchTask error:', err);
    }

    if (error || !task) {
        return (
            <main className="container mx-auto p-4">
                <p className="text-red-500 mb-4">{error || 'Task not found'}</p>
                <Link href="/dashboard" className="text-blue-500 hover:underline">
                    Back to Dashboard
                </Link>
            </main>
        );
    }

    return (
        <main className="container mx-auto p-4">
            <header className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white p-4 rounded-t-lg mb-4">
                <Link
                    href="/dashboard"
                    className=" items-center gap-2 text-white hover:underline mb-2 inline-block"
                >
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                    </svg>
                    Back to Dashboard
                </Link>
                <h1 className="text-2xl font-bold">Task Detail</h1>
                <p className="text-sm">Complete information about your task</p>
            </header>
            <div className="bg-white p-6 rounded-b-lg shadow-md space-y-4">
                <h2 className="text-xl font-semibold flex items-center gap-2">
                    <svg className="h-5 w-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                    {task.name}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <p><strong>ID:</strong> {task.id}</p>
                        <p><strong>Description:</strong> {task.description || 'No description'}</p>
                        <p><strong>Status:</strong> <span className={`inline-block px-2 py-1 rounded-full text-sm ${task.status === 'DONE' ? 'bg-green-100 text-green-800' : task.status === 'IN_PROGRESS' ? 'bg-blue-100 text-blue-800' : task.status === 'TODO' ? 'bg-yellow-100 text-yellow-800' : 'bg-gray-100 text-gray-800'}`}>{task.status}</span></p>
                        <p><strong>Priority:</strong> <span className={`inline-block px-2 py-1 rounded-full text-sm ${task.priority === 'HIGH' ? 'bg-red-100 text-red-800' : task.priority === 'MEDIUM' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'}`}>{task.priority}</span></p>
                    </div>
                    <div>
                        <p><strong>Start:</strong> {task.start ? new Date(task.start).toLocaleDateString() : 'Not set'}</p>
                        <p><strong>End:</strong> {task.end ? new Date(task.end).toLocaleDateString() : 'Not set'}</p>
                        <p><strong>Duration:</strong> {task.duration ? `${task.duration} hours` : 'Not set'}</p>
                        <p><strong>Archived:</strong> {task.archived ? 'Yes' : 'No'}</p>
                    </div>
                    <div>
                        <p><strong>Created:</strong> {task.createdAt ? new Date(task.createdAt).toLocaleString() : 'Not set'}</p>
                        <p><strong>Updated:</strong> {task.updatedAt ? new Date(task.updatedAt).toLocaleString() : 'Not set'}</p>
                        <p><strong>Completed:</strong> {task.completedAt ? new Date(task.completedAt).toLocaleString() : 'Not set'}</p>
                        <p><strong>Parent ID:</strong> {task.parentId || 'None'}</p>
                    </div>
                    <div>
                        <p><strong>Children:</strong> {task.children || 'None'}</p>
                        <p><strong>Tags:</strong> {task.tags || 'None'}</p>
                        <p><strong>Owner:</strong> {task.owner || 'None'}</p>
                        <p><strong>Is Default:</strong> {task.isDefault ? 'Yes' : 'No'}</p>
                    </div>
                </div>
                <Link href="/dashboard" className="text-blue-500 hover:underline">
                    Back to Dashboard
                </Link>
            </div>
        </main>
    );
}