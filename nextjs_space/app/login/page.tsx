import { LoginForm } from './_components/login-form'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth-options'
import { isAdminEmail } from '@/lib/admin-guard'
import { redirect } from 'next/navigation'

export default async function LoginPage() {
  const session = await getServerSession(authOptions)
  if (session?.user?.email) {
    redirect(isAdminEmail(session.user.email) ? '/admin' : '/now')
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/30">
      <LoginForm />
    </div>
  )
}
