import ApiTodoList from './components/ApiTodoList';

async function getTodos() {
  try {
    const res = await fetch('http://localhost:3000/api/todos', {
      cache: 'no-store',
    });
    const json = await res.json();
    return json.data?.tasks || [];
  } catch (error) {
    console.error('Gagal mengambil data todos:', error);
    return [];
  }
}

export default async function ApiTodosPage() {
  const initialTasks = await getTodos();

  return (
    <main className="min-h-screen bg-gray-100 py-10">
      <ApiTodoList initialTasks={initialTasks} />
    </main>
  );
}