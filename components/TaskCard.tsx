'use client';

import Link from 'next/link';
import { deleteTask } from '@/lib/actions';
import { Task } from '@/lib/types';

interface TaskCardProps {
    task: Task;
    onEdit: () => void;
    onDelete: () => void;
}

export default function TaskCard({ task, onEdit, onDelete }: TaskCardProps) {
    const handleDelete = async () => {
        try {
            await deleteTask(task.id);
            onDelete();
        } catch (error) {
            alert((error as Error).message);
        }
    };

    return (
        <div className="flex items-center justify-between p-4 bg-white border rounded-lg shadow-sm hover:shadow-md transition">
            <div>
                <h3 className="text-lg font-semibold">{task.name}</h3>
                {task.description && (
                    <p className="text-gray-600 text-sm">
                        {task.description.length > 30
                            ? task.description.substring(0, 30) + '...'
                            : task.description}
                    </p>
                )}
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
            </div>
            <div className="flex gap-2">
                <Link
                    href={`/tasks/${task.id}`}
                    className="p-2 text-blue-500 hover:text-blue-700"
                    title="View"
                >
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                        />
                    </svg>
                </Link>
                <button
                    onClick={onEdit}
                    className="p-2 text-yellow-500 hover:text-yellow-700"
                    title="Edit"
                >
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                        />
                    </svg>
                </button>
                <button
                    onClick={handleDelete}
                    className="p-2 text-red-500 hover:text-red-700"
                    title="Delete"
                >
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5-4h4M7 7h10m-9 3v8m4-8v8m4-8v8"
                        />
                    </svg>
                </button>
            </div>
        </div>
    );
}