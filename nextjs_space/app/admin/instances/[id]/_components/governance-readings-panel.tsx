'use client'
import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface Item { id: string; createdAt: string; rationale: Record<string, unknown> | string | null }
type Status = 'loading' | 'error' | 'ready'

function pick(rationale: unknown, key: string): string {
  if (rationale && typeof rationale === 'object' && !Array.isArray(rationale)) {
    const v = (rationale as Record<string, unknown>)[key]
    if (v === null || v === undefined || v === '') return '—'
    return String(v)
  }
  return '—'
}

export function GovernanceReadingsPanel({ enrollmentId }: { enrollmentId: string }) {
  const [status, setStatus] = useState<Status>('loading')
  const [items, setItems] = useState<Item[]>([])
  const [count, setCount] = useState<number | null>(null)

  useEffect(() => {
    let cancelled = false
    ;(async () => {
      setStatus('loading')
      try {
        const res = await fetch(
          `/api/continuity-start/convergence/record?enrollmentId=${encodeURIComponent(enrollmentId)}&limit=3`
        )
        if (!res.ok) throw new Error(`status ${res.status}`)
        const json = await res.json()
        if (cancelled) return
        // Render in the exact order returned by EE. No client-side sort/reverse/filter/dedup.
        const raw = Array.isArray(json.items) ? json.items : []
        setItems(raw.slice(0, 3))
        setCount(typeof json.count === 'number' ? json.count : null)
        setStatus('ready')
      } catch {
        if (!cancelled) setStatus('error')
      }
    })()
    return () => { cancelled = true }
  }, [enrollmentId])

  return (
    <Card className="mt-6">
      <CardHeader><CardTitle className="text-base">Governance-reading records</CardTitle></CardHeader>
      <CardContent className="space-y-2">
        <p className="text-sm text-muted-foreground">
          This surface shows persisted governance-reading records for this enrollment. It is a record log,
          not the live authoritative operational state. Not a workflow state surface. Not the current
          authoritative operational state. Not a source-of-truth surface.
        </p>
        <p className="text-xs text-muted-foreground">Total recorded: {count === null ? '—' : count}</p>
        {status === 'loading' && <p className="text-sm text-muted-foreground">Loading…</p>}
        {status === 'error' && <p className="text-sm text-muted-foreground">Could not load records.</p>}
        {status === 'ready' && items.length === 0 && (<p className="text-sm text-muted-foreground">No records.</p>)}
        {status === 'ready' && items.map((item) => (
          <p key={item.id} className="text-sm">
            {new Date(item.createdAt).toLocaleString()} · {pick(item.rationale, 'posture')} · {pick(item.rationale, 'riskTier')}
          </p>
        ))}
      </CardContent>
    </Card>
  )
}
