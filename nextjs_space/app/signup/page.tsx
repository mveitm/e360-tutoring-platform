import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { authOptions } from '@/lib/auth-options'
import { isAdminEmail } from '@/lib/admin-guard'
import { SignupForm } from './_components/signup-form'

export default async function SignupPage() {
  const session = await getServerSession(authOptions)
  if (session?.user?.email) {
    redirect(isAdminEmail(session.user.email) ? '/admin' : '/now')
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/30 py-10">
      <SignupForm />
    </div>
  )
}
