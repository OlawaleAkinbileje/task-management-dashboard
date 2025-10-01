import { fetchTasks } from '@/lib/api';
import TaskList from '@/components/TaskList';
import { Task } from '@/lib/types';

export default async function Dashboard() {
    let tasks: Task[] = [];
    let error: string | null = null;

    try {
        tasks = await fetchTasks();
    } catch (err) {
        error = 'Failed to load tasks. Please try again later.';
        console.error('Dashboard fetchTasks error:', err);
    }

    return (
        <main className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <TaskList initialTasks={tasks} />
        </main>
    );
}