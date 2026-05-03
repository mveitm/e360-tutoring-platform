import { AdminNav } from './_components/admin-nav'
import { requireAdminSession } from '@/lib/admin-guard'

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  // CUST-AUTH-1A: Enforce admin-only access at the layout level.
  // Unauthenticated → /login. Authenticated non-admin → /now.
  await requireAdminSession()

  return (
    <div className="min-h-screen bg-background">
      <AdminNav />
      <main className="max-w-[1200px] mx-auto px-4 py-8">
        {children}
      </main>
    </div>
  )
}
