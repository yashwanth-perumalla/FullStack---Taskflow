Tech Stack:

  Frontend: Next.js, TypeScript, React Query, Zustand
  Backend: NestJS, REST API, SQLite (optional)
  Purpose: Demonstrates CRUD operations with API integration and state management.

Structure
```
TaskFlow/
 ├── backend/
 │    ├── src/
 │    │    ├── main.ts
 │    │    ├── modules/
 │    │    │    └── tasks/
 │    │    │         ├── tasks.controller.ts
 │    │    │         ├── tasks.module.ts
 │    │    │         └── tasks.service.ts
 ├── frontend/
 │    ├── src/
 │    │    ├── app/page.tsx
 │    │    ├── hooks/useTasks.ts
 │    │    ├── store/
 │    │    │    └── tasksSlice.ts
 │    │    └── components/
 │    │         └── TaskList.tsx
 └── package.json
```
# Backend
cd TaskFlow/backend
npm run start

# Frontend
cd TaskFlow/frontend
$env:NEXT_PUBLIC_API_URL="http://localhost:4000"
npm run dev


Notes

API endpoints:

GET /tasks → fetch all tasks

POST /tasks → add a task

PATCH /tasks/:id → update status

DELETE /tasks/:id → remove a task

Frontend uses React Query for async updates and Zustand for global state.

Shows modern folder-based architecture (Next.js App Router).
