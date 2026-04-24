'use client'

import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { Loader2, Play } from 'lucide-react'
import { Button } from '@/components/ui/button'

// Phase DP — client control for the single-action "Empezar" verb on /now.
// Posts to the orchestration endpoint and refreshes the Server Component
// so the page re-reads pending and in-progress loads.

export function StartLoadButton({ loadId }: { loadId: string }) {
  const router = useRouter()
  const [isPosting, setIsPosting] = useState(false)
  const [isPending, startTransition] = useTransition()

  const busy = isPosting || isPending

  async function handleClick() {
    if (busy) return
    setIsPosting(true)
    try {
      const res = await fetch(`/api/study-loads/${loadId}/start`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      })
      if (!res.ok) {
        let message = 'No se pudo iniciar la carga'
        try {
          const data = await res.json()
          if (data?.error) message = data.error
        } catch {
          // non-JSON response — keep default message
        }
        toast.error(message)
        return
      }
      toast.success('Carga iniciada')
      startTransition(() => router.refresh())
    } catch {
      toast.error('Error de red. Intenta de nuevo.')
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
      className="h-8 gap-1.5 px-3 text-xs"
    >
      {busy ? (
        <Loader2 className="h-3.5 w-3.5 animate-spin" aria-hidden="true" />
      ) : (
        <Play className="h-3.5 w-3.5" aria-hidden="true" />
      )}
      <span>{busy ? 'Iniciando…' : 'Empezar'}</span>
    </Button>
  )
}
