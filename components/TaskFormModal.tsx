'use client';

import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { createTask, updateTask } from '@/lib/actions';
import { Task } from '@/lib/types';

interface TaskFormModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    initialData: Task | null;
    onSuccess: (task: Task) => void;
}

export default function TaskFormModal({
    open,
    onOpenChange,
    initialData,
    onSuccess,
}: TaskFormModalProps) {
    const [name, setName] = useState(initialData?.name || '');
    const [description, setDescription] = useState(initialData?.description || '');
    const [status, setStatus] = useState<Task['status']>(initialData?.status || 'TODO');
    const [priority, setPriority] = useState<Task['priority']>(initialData?.priority || 'LOW');
    const [start, setStart] = useState(initialData?.start || '');
    const [end, setEnd] = useState(initialData?.end || '');
    const [duration, setDuration] = useState(initialData?.duration?.toString() || '');
    const [archived, setArchived] = useState(initialData?.archived || false);
    const [isDefault, setIsDefault] = useState(initialData?.isDefault || false);
    const [parentId, setParentId] = useState(initialData?.parentId || '');
    const [children, setChildren] = useState(initialData?.children || '');
    const [tags, setTags] = useState(initialData?.tags || '');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    useEffect(() => {
        if (initialData) {
            setName(initialData.name);
            setDescription(initialData.description || '');
            setStatus(initialData.status);
            setPriority(initialData.priority || 'LOW');
            setStart(initialData.start || '');
            setEnd(initialData.end || '');
            setDuration(initialData.duration?.toString() || '');
            setArchived(initialData.archived || false);
            setIsDefault(initialData.isDefault || false);
            setParentId(initialData.parentId || '');
            setChildren(initialData.children || '');
            setTags(initialData.tags || '');
        } else {
            setName('');
            setDescription('');
            setStatus('TODO');
            setPriority('LOW');
            setStart('');
            setEnd('');
            setDuration('');
            setArchived(false);
            setIsDefault(false);
            setParentId('');
            setChildren('');
            setTags('');
        }
        setError('');
    }, [initialData, open]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        const formData = new FormData();
        formData.append('name', name);
        formData.append('description', description || '');
        formData.append('status', status);
        formData.append('priority', priority);
        formData.append('start', start);
        formData.append('end', end);
        formData.append('duration', duration);
        formData.append('archived', String(archived));
        formData.append('isDefault', String(isDefault));
        formData.append('parentId', parentId);
        formData.append('children', children || ''); // Ensure non-null string
        formData.append('tags', tags);

        try {
            const newTask = initialData
                ? await updateTask(initialData.id, formData)
                : await createTask(formData);
            onSuccess(newTask);
            onOpenChange(false);
            router.refresh(); // Refresh to update the dashboard
        } catch (err) {
            setError((err as Error).message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div
            className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center ${open ? '' : 'hidden'}`}
            onClick={() => !loading && onOpenChange(false)}
        >
            <div
                className="bg-white p-6 rounded-lg max-w-md w-full"
                onClick={(e) => e.stopPropagation()}
            >
                <h2 className="text-xl font-bold mb-2 flex items-center gap-2">
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d={initialData ? 'M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z' : 'M12 4v16m8-8H4'}
                        />
                    </svg>
                    {initialData ? 'Update Task' : 'Create Task'}
                </h2>
                <p className="text-gray-600 mb-4">
                    {initialData ? 'Update task details.' : 'Add a new task.'}
                </p>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium">
                            Task Name *
                        </label>
                        <input
                            id="name"
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="mt-1 w-full p-2 border rounded-md"
                            required
                            disabled={loading}
                        />
                    </div>
                    <div>
                        <label htmlFor="description" className="block text-sm font-medium">
                            Description
                        </label>
                        <textarea
                            id="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="mt-1 w-full p-2 border rounded-md"
                            disabled={loading}
                        />
                    </div>
                    <div>
                        <label htmlFor="status" className="block text-sm font-medium">
                            Status
                        </label>
                        <select
                            id="status"
                            value={status}
                            onChange={(e) => setStatus(e.target.value as Task['status'])}
                            className="mt-1 w-full p-2 border rounded-md"
                            disabled={loading}
                        >
                            <option value="TODO">To Do</option>
                            <option value="IN_PROGRESS">In Progress</option>
                            <option value="DONE">Done</option>
                            <option value="CANCELLED">Cancelled</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="priority" className="block text-sm font-medium">
                            Priority
                        </label>
                        <select
                            id="priority"
                            value={priority}
                            onChange={(e) => setPriority(e.target.value as Task['priority'])}
                            className="mt-1 w-full p-2 border rounded-md"
                            disabled={loading}
                        >
                            <option value="LOW">Low</option>
                            <option value="MEDIUM">Medium</option>
                            <option value="HIGH">High</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="start" className="block text-sm font-medium">
                            Start Date
                        </label>
                        <input
                            id="start"
                            type="date"
                            value={start}
                            onChange={(e) => setStart(e.target.value)}
                            className="mt-1 w-full p-2 border rounded-md"
                            disabled={loading}
                        />
                    </div>
                    <div>
                        <label htmlFor="end" className="block text-sm font-medium">
                            End Date
                        </label>
                        <input
                            id="end"
                            type="date"
                            value={end}
                            onChange={(e) => setEnd(e.target.value)}
                            className="mt-1 w-full p-2 border rounded-md"
                            disabled={loading}
                        />
                    </div>
                    <div>
                        <label htmlFor="duration" className="block text-sm font-medium">
                            Duration (hours)
                        </label>
                        <input
                            id="duration"
                            type="number"
                            value={duration}
                            onChange={(e) => setDuration(e.target.value)}
                            className="mt-1 w-full p-2 border rounded-md"
                            disabled={loading}
                        />
                    </div>
                    <div>
                        <label htmlFor="archived" className="block text-sm font-medium">
                            Archived
                        </label>
                        <input
                            id="archived"
                            type="checkbox"
                            checked={archived}
                            onChange={(e) => setArchived(e.target.checked)}
                            className="mt-1"
                            disabled={loading}
                        />
                    </div>
                    <div>
                        <label htmlFor="isDefault" className="block text-sm font-medium">
                            Default Task
                        </label>
                        <input
                            id="isDefault"
                            type="checkbox"
                            checked={isDefault}
                            onChange={(e) => setIsDefault(e.target.checked)}
                            className="mt-1"
                            disabled={loading}
                        />
                    </div>
                    <div>
                        <label htmlFor="parentId" className="block text-sm font-medium">
                            Parent Task ID
                        </label>
                        <input
                            id="parentId"
                            type="text"
                            value={parentId}
                            onChange={(e) => setParentId(e.target.value)}
                            className="mt-1 w-full p-2 border rounded-md"
                            disabled={loading}
                        />
                    </div>
                    <div>
                        <label htmlFor="children" className="block text-sm font-medium">
                            Children (comma-separated IDs)
                        </label>
                        <input
                            id="children"
                            type="text"
                            value={children}
                            onChange={(e) => setChildren(e.target.value)}
                            className="mt-1 w-full p-2 border rounded-md"
                            disabled={loading}
                        />
                    </div>
                    <div>
                        <label htmlFor="tags" className="block text-sm font-medium">
                            Tags (comma-separated)
                        </label>
                        <input
                            id="tags"
                            type="text"
                            value={tags}
                            onChange={(e) => setTags(e.target.value)}
                            className="mt-1 w-full p-2 border rounded-md"
                            disabled={loading}
                        />
                    </div>
                    {error && <p className="text-red-500">{error}</p>}
                    <div className="flex justify-end gap-2">
                        <button
                            type="button"
                            onClick={() => !loading && onOpenChange(false)}
                            className="px-4 py-2 border rounded-md hover:bg-gray-100"
                            disabled={loading}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                            disabled={loading}
                        >
                            {loading ? 'Saving...' : initialData ? 'Update' : 'Create'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}