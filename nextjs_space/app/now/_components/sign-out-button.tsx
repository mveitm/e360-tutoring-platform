'use client'

import { useState } from 'react'
import { signOut } from 'next-auth/react'
import { LogOut } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function SignOutButton() {
  const [isSigningOut, setIsSigningOut] = useState(false)

  async function handleClick() {
    if (isSigningOut) return
    setIsSigningOut(true)
    await signOut({ callbackUrl: '/login' })
  }

  return (
    <Button
      type="button"
      variant="outline"
      size="sm"
      onClick={handleClick}
      disabled={isSigningOut}
      className="h-8 shrink-0 gap-1.5 px-3 text-xs"
    >
      <LogOut className="h-3.5 w-3.5" aria-hidden="true" />
      <span>{isSigningOut ? 'Cerrando...' : 'Cerrar sesión'}</span>
    </Button>
  )
}
