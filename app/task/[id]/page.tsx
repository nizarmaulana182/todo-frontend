import React from 'react';
import TodoStateOnlyApp from '@/app/components/TodoStateOnlyApp';
import { getTodos } from '@/lib/todos';

export default async function TodoPage() {
  // Mengambil data awal di Server Component
  const initialTodos = await getTodos();

  return (
    <main className="min-h-screen p-6 md:p-10 bg-white text-gray-900">
      <div className="max-w-2xl mx-auto space-y-6">
        <header className="bg-white p-6 md:p-8 rounded-2xl shadow-xl border border-gray-100">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 text-center">
            Daftar Tugas (Todo List)
          </h1>
        </header>

        {/* Halaman Beranda: Menggunakan State Murni (In-Memory) */}
        <TodoStateOnlyApp initialTodos={initialTodos} />
      </div>
    </main>
  );
}