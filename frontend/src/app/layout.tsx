import "./globals.css";
export const metadata = { title: "TaskFlow", description: "Task CRUD with Next.js + React Query" };
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{fontFamily:'system-ui, Arial', margin:0}}>
        <div style={{maxWidth:900, margin:'24px auto', padding:'0 16px'}}>{children}</div>
      </body>
    </html>
  );
}
