import Link from 'next/link'
import { LogOut } from 'lucide-react'
import { buttonVariants } from '@/components/ui/button'

export function SignOutButton() {
  return (
    <Link
      href="/api/session/sign-out"
      className={buttonVariants({
        variant: 'outline',
        size: 'sm',
        className: 'h-8 shrink-0 gap-1.5 px-3 text-xs',
      })}
    >
      <LogOut className="h-3.5 w-3.5" aria-hidden="true" />
      <span>Cerrar sesión</span>
    </Link>
  )
}
