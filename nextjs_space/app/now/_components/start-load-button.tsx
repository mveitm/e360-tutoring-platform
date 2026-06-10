'use client'

import { useState, useTransition } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { Loader2, Play } from 'lucide-react'
import { Button } from '@/components/ui/button'

// Phase DP - client control for the single-action "Empezar" verb on /now.
// Posts to the orchestration endpoint and opens the activity directly.

type StartLoadButtonProps = {
  loadId: string
  label?: string
  busyLabel?: string
  startedLabel?: string
  className?: string
}

export function StartLoadButton({
  loadId,
  label = 'Empezar',
  busyLabel = 'Iniciando…',
  startedLabel = 'Cápsula iniciada',
  className = 'h-8 gap-1.5 px-3 text-xs',
}: StartLoadButtonProps) {
  const router = useRouter()
  const pathname = usePathname()
  const [isPosting, setIsPosting] = useState(false)
  const [hasStarted, setHasStarted] = useState(false)
  const [isPending, startTransition] = useTransition()

  const busy = isPosting || isPending || hasStarted

  async function handleClick() {
    if (busy) return
    setIsPosting(true)
    try {
      const res = await fetch(`/api/study-loads/${loadId}/start`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      })
      if (!res.ok) {
        let message = 'No se pudo iniciar la cápsula'
        try {
          const data = await res.json()
          if (data?.error) message = data.error
        } catch {
          // Non-JSON response; keep default message.
        }
        toast.error(message)
        return
      }

      toast.success('Cápsula iniciada')
      setHasStarted(true)
      startTransition(() => {
        const targetPath = `/now/study-loads/${loadId}`
        if (pathname === targetPath) {
          router.refresh()
          return
        }
        router.push(targetPath)
      })
    } catch {
      toast.error('Error de red. Intenta de nuevo.')
      setHasStarted(false)
    } finally {
      setIsPosting(false)
    }
  }

  return (
    <Button
      type="button"
      size="sm"
      onClick={handleClick}
      disabled={busy}
      className={className}
    >
      {isPosting || isPending ? (
        <Loader2 className="h-3.5 w-3.5 animate-spin" aria-hidden="true" />
      ) : (
        <Play className="h-3.5 w-3.5" aria-hidden="true" />
      )}
      <span>{isPosting || isPending ? busyLabel : hasStarted ? startedLabel : label}</span>
    </Button>
  )
}
