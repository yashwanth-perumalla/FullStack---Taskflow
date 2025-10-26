"use client";
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

async function getTasks(){ const r = await fetch(`${API}/tasks`); if(!r.ok) throw new Error(); return r.json(); }
async function postTask(body:{title:string}){ const r = await fetch(`${API}/tasks`,{method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(body)}); if(!r.ok) throw new Error(); return r.json(); }
async function toggleTask(id:string){ const r = await fetch(`${API}/tasks/${id}/toggle`,{method:'PATCH'}); if(!r.ok) throw new Error(); return r.json(); }
async function deleteTask(id:string){ const r = await fetch(`${API}/tasks/${id}`,{method:'DELETE'}); if(!r.ok) throw new Error(); return r.json(); }

export function useTasks(){
  const qc = useQueryClient();
  const list = useQuery({ queryKey:['tasks'], queryFn: getTasks });
  const create = useMutation({ mutationFn: postTask, onSuccess:()=> qc.invalidateQueries({queryKey:['tasks']}) });
  const toggle = useMutation({ mutationFn: toggleTask, onSuccess:()=> qc.invalidateQueries({queryKey:['tasks']}) });
  const remove = useMutation({ mutationFn: deleteTask, onSuccess:()=> qc.invalidateQueries({queryKey:['tasks']}) });
  return { list, create, toggle, remove };
}
