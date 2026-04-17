import { AdminNav } from './_components/admin-nav'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
      <AdminNav />
      <main className="max-w-[1200px] mx-auto px-4 py-8">
        {children}
      </main>
    </div>
  )
}
