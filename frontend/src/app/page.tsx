"use client";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useTasks } from '../hooks/useTasks';
import { useState } from 'react';
const qc = new QueryClient();

function App() {
  const { list, create, toggle, remove } = useTasks();
  const [title, setTitle] = useState("");

  return (
    <div>
      <h1>TaskFlow</h1>
      <p>Set <code>NEXT_PUBLIC_API_URL</code> to your backend (e.g., http://localhost:4000).</p>
      <form onSubmit={(e)=>{e.preventDefault(); if(title.trim()) create.mutate({ title }); setTitle("");}}>
        <input value={title} onChange={e=>setTitle(e.target.value)} placeholder="New task title" />
        <button type="submit" disabled={create.isPending}>Add</button>
      </form>
      {list.isLoading && <p>Loading...</p>}
      {list.isError && <p>Error loading tasks</p>}
      <ul>
        {list.data?.map((t:any)=>(
          <li key={t.id} style={{display:'flex', gap:8, alignItems:'center'}}>
            <input type="checkbox" checked={t.done} onChange={()=>toggle.mutate(t.id)} />
            <span style={{textDecoration:t.done?'line-through':'none'}}>{t.title}</span>
            <button onClick={()=>remove.mutate(t.id)}>Delete</button>
          </li>
        ))}
      </ul>
      {(!list.data || list.data.length===0) && !list.isLoading && <p>No tasks yet.</p>}
    </div>
  );
}

export default function Page(){ return <QueryClientProvider client={qc}><App/></QueryClientProvider>; }
