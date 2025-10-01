'use client';

import { useState, useMemo } from 'react';
import TaskFormModal from './TaskFormModal';
import TaskCard from './TaskCard';
import Pagination from './Pagination';
import { Task } from '@/lib/types';

interface TaskListProps {
    initialTasks: Task[];
}

export default function TaskList({ initialTasks }: TaskListProps) {
    const [tasks, setTasks] = useState<Task[]>(initialTasks);
    const [search, setSearch] = useState('');
    const [filter, setFilter] = useState<'all' | 'completed' | 'incomplete'>('all');
    const [currentPage, setCurrentPage] = useState(1);
    const [modalOpen, setModalOpen] = useState(false);
    const [editTask, setEditTask] = useState<Task | null>(null);
    const tasksPerPage = 10;

    const filteredTasks = useMemo(() => {
        return tasks.filter((task) => {
            const matchesName = task.name.toLowerCase().includes(search.toLowerCase());
            const matchesFilter =
                filter === 'all' ||
                (filter === 'completed' && task.status === 'DONE') ||
                (filter === 'incomplete' && task.status !== 'DONE');
            return matchesName && matchesFilter;
        });
    }, [tasks, search, filter]);

    const stats = useMemo(() => {
        const total = tasks.length;
        const completed = tasks.filter((t) => t.status === 'DONE').length;
        const pending = tasks.filter((t) => t.status === 'TODO' || t.status === 'IN_PROGRESS').length;
        return { total, completed, pending };
    }, [tasks]);

    const totalPages = Math.ceil(filteredTasks.length / tasksPerPage);
    const currentTasks = filteredTasks.slice(
        (currentPage - 1) * tasksPerPage,
        currentPage * tasksPerPage
    );

    const handleTaskCreated = (newTask: Task) => {
        setTasks([newTask, ...tasks]);
        setModalOpen(false);
    };

    const handleTaskUpdated = (updatedTask: Task) => {
        setTasks(tasks.map((t) => (t.id === updatedTask.id ? updatedTask : t)));
        setModalOpen(false);
    };

    const handleTaskDeleted = (id: number) => {
        setTasks(tasks.filter((t) => t.id !== id));
    };

    return (
        <main className="space-y-6">
            <header className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white p-6 rounded-t-lg text-center">
                <h1 className="text-3xl font-bold flex items-center justify-center gap-2">
                    TaskMaster Pro
                </h1>
                <p className="text-sm">Stay organized, stay productive</p>
                <div className="flex justify-center gap-6 mt-4">
                    <div>
                        <span className="text-2xl font-bold">{stats.total}</span>
                        <p className="text-sm">Total Tasks</p>
                    </div>
                    <div>
                        <span className="text-2xl font-bold">{stats.completed}</span>
                        <p className="text-sm">Completed</p>
                    </div>
                    <div>
                        <span className="text-2xl font-bold">{stats.pending}</span>
                        <p className="text-sm">Pending</p>
                    </div>
                </div>
            </header>
            <section className="flex flex-col sm:flex-row gap-4 bg-gray-50 p-4 rounded-md">
                <div className="flex-1 relative">
                    <input
                        type="text"
                        placeholder="Search by task name..."
                        value={search}
                        onChange={(e) => {
                            setSearch(e.target.value);
                            setCurrentPage(1);
                        }}
                        className="w-full p-2 pr-10 border rounded-full"
                        aria-label="Search tasks"
                    />
                    <svg
                        className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        />
                    </svg>
                </div>
                <select
                    value={filter}
                    onChange={(e) => {
                        setFilter(e.target.value as 'all' | 'completed' | 'incomplete');
                        setCurrentPage(1);
                    }}
                    className="p-2 border rounded-full"
                    aria-label="Filter tasks"
                >
                    <option value="all">All</option>
                    <option value="completed">Completed</option>
                    <option value="incomplete">Incomplete</option>
                </select>
                <button
                    onClick={() => {
                        setEditTask(null);
                        setModalOpen(true);
                    }}
                    className="bg-green-500 text-white px-4 py-2 rounded-full hover:bg-green-600 flex items-center gap-2"
                >
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M12 4v16m8-8H4"
                        />
                    </svg>
                    Add Task
                </button>
            </section>
            <section className="space-y-4">
                {currentTasks.map((task) => (
                    <TaskCard
                        key={task.id}
                        task={task}
                        onEdit={() => {
                            setEditTask(task);
                            setModalOpen(true);
                        }}
                        onDelete={() => handleTaskDeleted(task.id)}
                    />
                ))}
            </section>
            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
            />
            <TaskFormModal
                open={modalOpen}
                onOpenChange={setModalOpen}
                initialData={editTask}
                onSuccess={editTask ? handleTaskUpdated : handleTaskCreated}
            />
        </main>
    );
}