'use client'

/**
 * Phase EG+EK — Minimal admin-only attention-signal presentation.
 *
 * Renderers that consume the mapping in `lib/admin/attention-signal.ts`:
 *   - AttentionSignalLine (detail header use; verbatim advisory note + EK acknowledge button)
 *   - AttentionSignalCell (enrollments list use; compact single-line with acknowledged badge)
 *
 * Advisory only. Not a workflow decision. Not a blocking condition.
 * Not a write authorization. Not a source-of-truth resolution.
 */

import { useState } from 'react'
import {
  mapPostureToAttentionSignal,
  ATTENTION_SIGNAL_LABELS,
  type AttentionSignal,
} from '@/lib/admin/attention-signal'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { CheckCircle2, Loader2 } from 'lucide-react'
import { toast } from 'sonner'

const SIGNAL_CLASSES: Record<AttentionSignal, string> = {
  attention_required: 'text-amber-700',
  monitor: 'text-blue-700',
  stable: 'text-emerald-700',
  no_governance_record: 'text-muted-foreground',
}

interface AttentionSignalLineProps {
  posture: string | null | undefined
  acknowledged?: boolean
  enrollmentId?: string
  /** Called after a successful acknowledge action so parent can refresh */
  onAcknowledged?: () => void
}

export function AttentionSignalLine({
  posture,
  acknowledged,
  enrollmentId,
  onAcknowledged,
}: AttentionSignalLineProps) {
  const signal = mapPostureToAttentionSignal(posture)
  const label = ATTENTION_SIGNAL_LABELS[signal]
  const [submitting, setSubmitting] = useState(false)

  const canAcknowledge =
    enrollmentId &&
    !acknowledged &&
    signal !== 'no_governance_record'

  async function handleAcknowledge() {
    if (!enrollmentId || submitting) return
    setSubmitting(true)
    try {
      const res = await fetch(`/api/instances/${enrollmentId}/acknowledge`, {
        method: 'POST',
      })
      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(data.error || 'Failed to acknowledge')
      }
      toast.success('Attention signal acknowledged')
      onAcknowledged?.()
    } catch (err: any) {
      toast.error(err.message || 'Failed to acknowledge')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="text-sm">
      <div className="flex items-center gap-2">
        <p className={cn('font-medium', SIGNAL_CLASSES[signal])}>{label}</p>
        {acknowledged && (
          <span className="inline-flex items-center gap-1 text-xs text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded">
            <CheckCircle2 className="w-3 h-3" />
            Reviewed
          </span>
        )}
      </div>
      <p className="text-xs text-muted-foreground mt-0.5">
        {acknowledged
          ? 'Reviewed by admin. Does not mean pedagogically resolved.'
          : 'Advisory only. Does not block workflow.'}
      </p>
      {canAcknowledge && (
        <Button
          variant="outline"
          size="sm"
          className="mt-2 h-7 text-xs"
          onClick={handleAcknowledge}
          disabled={submitting}
        >
          {submitting ? (
            <Loader2 className="w-3 h-3 mr-1 animate-spin" />
          ) : (
            <CheckCircle2 className="w-3 h-3 mr-1" />
          )}
          Mark as reviewed
        </Button>
      )}
    </div>
  )
}

interface AttentionSignalCellProps {
  posture: string | null | undefined
  acknowledged?: boolean
}

export function AttentionSignalCell({ posture, acknowledged }: AttentionSignalCellProps) {
  const signal = mapPostureToAttentionSignal(posture)
  const label = ATTENTION_SIGNAL_LABELS[signal]
  return (
    <span className="inline-flex items-center gap-1.5">
      <span className={cn('text-xs font-medium', SIGNAL_CLASSES[signal])}>
        {label}
      </span>
      {acknowledged && signal !== 'no_governance_record' && (
        <span className="inline-flex items-center gap-0.5 text-[10px] text-emerald-700 bg-emerald-50 px-1 py-0.5 rounded leading-none">
          <CheckCircle2 className="w-2.5 h-2.5" />
          Reviewed
        </span>
      )}
    </span>
  )
}
