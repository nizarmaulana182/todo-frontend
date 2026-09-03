'use client';

import React, { useState, useEffect } from 'react';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import { getTodos } from '@/lib/todos';
import { Todo } from '@/types/todo';

export default function TodoPage() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchInitialTodos() {
      try {
        const initialTodos = await getTodos();
        setTodos(initialTodos);
      } catch (error) {
        console.error('Gagal memuat todos:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchInitialTodos();
  }, []);

  const handleAddTodo = (title: string) => {
    const newTodo: Todo = {
      id: Date.now(),
      title,
      completed: false,
      description: '', // Menambahkan properti yang hilang
      createdAt: new Date().toISOString(), // Menambahkan properti yang hilang
    };
    setTodos((prev) => [newTodo, ...prev]);
  };

  const handleToggleTodo = (id: number) => {
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  const handleDeleteTodo = (id: number) => {
    setTodos((prev) => prev.filter((t) => t.id !== id));
  };

  if (loading) {
    return (
      <main className="min-h-screen p-8 bg-gray-100 flex items-center justify-center">
        <p className="text-gray-500">Memuat daftar tugas...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen p-8 bg-gray-100">
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-lg border border-gray-100">
        <header className="mb-8 border-b pb-4">
          <h1 className="text-3xl font-bold text-gray-800 text-center">
            Daftar Tugas (Todo List)
          </h1>
        </header>

        {/* Form Komponen */}
        <TodoForm onAddTodo={handleAddTodo} />

        {/* List Komponen */}
        <TodoList
          todos={todos}
          onToggleTodo={handleToggleTodo}
          onDeleteTodo={handleDeleteTodo}
        />
      </div>
    </main>
  );
}