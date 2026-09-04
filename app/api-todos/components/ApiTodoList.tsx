'use client';

import React, { useState } from 'react';
import { TaskItem } from '@/types/api-todo';
import { todoService } from '@/services/todoServices';

interface ApiTodoListProps {
  initialTasks: TaskItem[];
}

export default function ApiTodoList({ initialTasks }: ApiTodoListProps) {
  const [tasks, setTasks] = useState<TaskItem[]>(initialTasks);

  const handleToggleTask = async (id: number, currentCompleted: boolean) => {
    const targetStatus = !currentCompleted;

    // 1. Optimistic Update di State Lokal
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: targetStatus } : t))
    );

    // 2. Simulasi Update ke DummyJSON via todoService
    try {
      await todoService.updateTodoStatus(id, targetStatus);
    } catch (err) {
      console.warn('Simulasi update ke API DummyJSON gagal (fallback state):', err);
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-2xl border border-gray-100 shadow-sm space-y-6">
      {/* Judul Utama */}
      <div className="text-center pb-4 border-b border-gray-100">
        <h1 className="text-2xl font-bold text-gray-800">Daftar Tugas (Todo List)</h1>
      </div>

      {/* Header Sub-Bagian & Counter */}
      <div className="flex items-center justify-between">
        <h2 className="text-base font-semibold text-gray-700">Daftar Tugas</h2>
        <span className="text-xs bg-gray-100 text-gray-500 px-3 py-1 rounded-full font-medium">
          {tasks.length} item
        </span>
      </div>

      {/* Daftar Kartu Tugas */}
      <div className="space-y-3">
        {tasks.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 rounded-xl border border-gray-100">
            <p className="text-gray-400 text-sm">Tidak ada tugas.</p>
          </div>
        ) : (
          tasks.map((task) => (
            <div
              key={task.id}
              onClick={() => handleToggleTask(task.id, task.completed)}
              className={`flex items-center justify-between p-4 rounded-xl border transition-all cursor-pointer select-none ${
                task.completed
                  ? 'bg-emerald-50/40 border-emerald-300'
                  : 'bg-white border-gray-200 hover:border-gray-300'
              }`}
            >
              {/* Checkbox dan Judul */}
              <div className="flex items-center gap-3.5 flex-1 pr-4">
                <input
                  type="checkbox"
                  checked={task.completed}
                  readOnly
                  className="h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                />
                <p
                  className={`text-sm font-medium transition-all ${
                    task.completed
                      ? 'line-through text-gray-300'
                      : 'text-gray-700'
                  }`}
                >
                  {task.title}
                </p>
              </div>

              {/* Badge Kanan (ID, User, Status) */}
              <div className="flex items-center gap-2 shrink-0">
                <span className="bg-purple-100 text-purple-600 text-xs font-medium px-2.5 py-1 rounded-full">
                  ID: #{task.id}
                </span>
                <span className="bg-sky-100 text-sky-600 text-xs font-medium px-2.5 py-1 rounded-full">
                  User: {task.userId}
                </span>
                <span
                  className={`text-xs font-medium px-3 py-1 rounded-full ${
                    task.completed
                      ? 'bg-emerald-100 text-emerald-600'
                      : 'bg-amber-100 text-amber-600'
                  }`}
                >
                  {task.completed ? 'Selesai' : 'Pending'}
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}