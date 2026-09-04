import React from 'react';
import TodoCachedApp from './components/TodoCachedApp';
import { getTodos } from '@/lib/todos';

export default async function CachedTodoPage() {
  // Mengambil data awal di Server Component
  const initialTodos = await getTodos();

  return (
    <main className="min-h-screen bg-gray-100 py-10 px-4 flex justify-center items-start">
      <div className="w-full max-w-2xl bg-white p-6 md:p-8 rounded-2xl border border-gray-200 shadow-sm space-y-6">
        <header className="border-b border-gray-200 pb-4">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 text-center">
            Daftar Tugas (Todo List)
          </h1>
        </header>

        {/* Halaman Caching */}
        <TodoCachedApp initialTodos={initialTodos} />
      </div>
    </main>
  );
}