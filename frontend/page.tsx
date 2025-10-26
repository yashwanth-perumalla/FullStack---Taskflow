"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useTasks } from "@/hooks/useTasks";
import { useMemo, useState } from "react";

function TaskFlowPage() {
  const { list, create, toggle, remove } = useTasks();
  const [title, setTitle] = useState("");

  const onAdd = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = title.trim();
    if (!trimmed) return;
    create.mutate({ title: trimmed });
    setTitle("");
  };

  return (
    <div>
      <h1>TaskFlow</h1>
      <p className="lead">
        Simple CRUD with Next.js + TypeScript + React Query.
        Set <code>NEXT_PUBLIC_API_URL</code> to your backend (e.g., http://localhost:4000).
      </p>

      <div className="card">
        <form onSubmit={onAdd}>
          <input
            type="text"
            placeholder="New task title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            aria-label="Task title"
          />
          <button type="submit" disabled={create.isPending}>
            {create.isPending ? "Adding..." : "Add Task"}
          </button>
        </form>

        {list.isLoading && <div className="state">Loading…</div>}
        {list.isError && <div className="state text-error">Error loading tasks.</div>}

        <ul className="tasks">
          {list.data?.map((t: any) => (
            <li key={t.id} className="task-item">
              <input
                type="checkbox"
                checked={t.done}
                onChange={() => toggle.mutate(t.id)}
                aria-label={`Toggle ${t.title}`}
              />
              <span className={`task-title ${t.done ? "done" : ""}`}>{t.title}</span>
              <button
                className="task-delete"
                onClick={() => remove.mutate(t.id)}
                aria-label={`Delete ${t.title}`}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>

        {(!list.data || list.data.length === 0) && !list.isLoading && (
          <div className="state text-muted">No tasks yet. Add your first task above.</div>
        )}
      </div>
    </div>
  );
}

export default function Page() {
  // Create the QueryClient once per page instance
  const queryClient = useMemo(() => new QueryClient(), []);
  return (
    <QueryClientProvider client={queryClient}>
      <TaskFlowPage />
    </QueryClientProvider>
  );
}
