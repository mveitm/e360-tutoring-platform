'use client'

import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { Loader2, CheckCircle2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'

// Phase DQ — client control for the single-action "Terminar" verb on /now.
// Opens a small dialog with a closed set of three Spanish self-report options,
// then posts to POST /api/study-loads/[id]/complete on confirm and refreshes
// the Server Component so the page re-reads pending and in_progress loads.

const OPTIONS = [
  'Me fue bien',
  'Me costó',
  'No la terminé',
] as const

type SelfReport = (typeof OPTIONS)[number]

export function CompleteLoadButton({ loadId }: { loadId: string }) {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [selected, setSelected] = useState<SelfReport | ''>('')
  const [isPosting, setIsPosting] = useState(false)
  const [isPending, startTransition] = useTransition()

  const busy = isPosting || isPending

  function handleOpenChange(nextOpen: boolean) {
    if (busy) return
    setOpen(nextOpen)
    if (!nextOpen) setSelected('')
  }

  async function handleConfirm() {
    if (busy) return
    if (!selected) {
      toast.error('Elige una opción para continuar')
      return
    }
    setIsPosting(true)
    try {
      const res = await fetch(`/api/study-loads/${loadId}/complete`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ selfReport: selected }),
      })
      if (!res.ok) {
        let message = 'No se pudo terminar la carga'
        try {
          const data = await res.json()
          if (data?.error) message = data.error
        } catch {
          // non-JSON response — keep default message
        }
        toast.error(message)
        return
      }
      toast.success('Carga terminada')
      setOpen(false)
      setSelected('')
      startTransition(() => router.refresh())
    } catch {
      toast.error('Error de red. Intenta de nuevo.')
    } finally {
      setIsPosting(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button
          type="button"
          size="sm"
          variant="outline"
          className="h-8 gap-1.5 px-3 text-xs"
        >
          <CheckCircle2 className="h-3.5 w-3.5" aria-hidden="true" />
          <span>Terminar</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>¿Cómo te fue?</DialogTitle>
          <DialogDescription>
            Elige una opción para cerrar esta carga.
          </DialogDescription>
        </DialogHeader>
        <RadioGroup
          value={selected}
          onValueChange={(value) => setSelected(value as SelfReport)}
          className="gap-2"
        >
          {OPTIONS.map((option) => {
            const id = `self-report-${loadId}-${option}`
            return (
              <div
                key={option}
                className="flex items-center gap-3 rounded-md border p-3"
              >
                <RadioGroupItem value={option} id={id} />
                <Label htmlFor={id} className="flex-1 cursor-pointer text-sm">
                  {option}
                </Label>
              </div>
            )
          })}
        </RadioGroup>
        <DialogFooter className="mt-2 flex-row justify-end gap-2">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => handleOpenChange(false)}
            disabled={busy}
          >
            Cancelar
          </Button>
          <Button
            type="button"
            size="sm"
            onClick={handleConfirm}
            disabled={busy || !selected}
            className="gap-1.5"
          >
            {busy ? (
              <Loader2
                className="h-3.5 w-3.5 animate-spin"
                aria-hidden="true"
              />
            ) : (
              <CheckCircle2 className="h-3.5 w-3.5" aria-hidden="true" />
            )}
            <span>{busy ? 'Cerrando…' : 'Confirmar'}</span>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
