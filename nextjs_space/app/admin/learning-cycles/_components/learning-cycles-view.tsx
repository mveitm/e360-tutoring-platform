'use client'

import { useState, useEffect, useCallback } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent } from '@/components/ui/card'
import { RefreshCw, Plus, Loader2, ExternalLink, Search } from 'lucide-react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { toast } from 'sonner'
import Link from 'next/link'

interface EnrollmentOption {
  id: string
  status: string
  student: { id: string; firstName: string; lastName: string }
  program: { id: string; code: string; name: string }
}

interface LearningCycle {
  id: string
  enrollmentId: string
  cycleNumber: number
  status: string
  openedAt: string
  closedAt: string | null
  createdAt: string
  enrollment?: {
    id: string
    status: string
    student: { id: string; firstName: string; lastName: string }
    program: { id: string; code: string; name: string }
  }
  _count?: { cycleDecisions: number; studyLoads: number; cycleEvaluations: number }
}

export function LearningCyclesView() {
  const [cycles, setCycles] = useState<LearningCycle[]>([])
  const [enrollments, setEnrollments] = useState<EnrollmentOption[]>([])
  const [loading, setLoading] = useState(true)
  const [open, setOpen] = useState(false)
  const [saving, setSaving] = useState(false)
  const [updating, setUpdating] = useState<string | null>(null)
  const [filterEnrollment, setFilterEnrollment] = useState('')
  const [search, setSearch] = useState('')
  const [form, setForm] = useState({ enrollmentId: '', status: 'open' })

  const fetchData = useCallback(async () => {
    try {
      const [cRes, eRes] = await Promise.all([
        fetch('/api/learning-cycles'),
        fetch('/api/instances'),
      ])
      if (cRes.ok) setCycles((await cRes.json()) ?? [])
      if (eRes.ok) setEnrollments((await eRes.json()) ?? [])
    } catch (err: any) {
      console.error('Failed to fetch data', err)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { fetchData() }, [fetchData])

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.enrollmentId) {
      toast.error('Enrollment is required')
      return
    }
    setSaving(true)
    try {
      const res = await fetch('/api/learning-cycles', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (!res.ok) {
        toast.error(data?.error ?? 'Failed to create cycle')
      } else {
        toast.success(`Cycle ${data.cycleNumber} created`)
        setForm({ enrollmentId: '', status: 'open' })
        setOpen(false)
        fetchData()
      }
    } catch {
      toast.error('Something went wrong')
    } finally {
      setSaving(false)
    }
  }

  const handleStatusChange = async (id: string, newStatus: string) => {
    setUpdating(id)
    try {
      const res = await fetch(`/api/learning-cycles/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      })
      if (res.ok) {
        toast.success(`Cycle ${newStatus === 'closed' ? 'closed' : 'updated'}`)
        fetchData()
      } else {
        const data = await res.json()
        toast.error(data?.error ?? 'Failed to update')
      }
    } catch {
      toast.error('Something went wrong')
    } finally {
      setUpdating(null)
    }
  }

  const formatDate = (d: string | null) => {
    if (!d) return '—'
    try { return new Date(d).toLocaleDateString() } catch { return '—' }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-semibold tracking-tight flex items-center gap-2">
            <RefreshCw className="w-6 h-6 text-primary" /> Learning Cycles
          </h1>
          <p className="text-muted-foreground text-sm mt-1">Adaptive learning cycles per enrollment</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              className="rounded-md border border-input bg-background pl-8 pr-3 py-2 text-sm w-52"
              placeholder="Search cycles…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <select
            className="rounded-md border border-input bg-background px-3 py-2 text-sm"
            value={filterEnrollment}
            onChange={(e) => setFilterEnrollment(e.target.value)}
          >
            <option value="">All enrollments</option>
            {enrollments.map((en) => (
              <option key={en.id} value={en.id}>
                {en.student?.firstName ?? ''} {en.student?.lastName ?? ''} — {en.program?.code ?? ''}
              </option>
            ))}
          </select>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2"><Plus className="w-4 h-4" /> New Cycle</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>New Learning Cycle</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleCreate} className="space-y-4">
              <div className="space-y-2">
                <Label>Enrollment</Label>
                <select
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  value={form.enrollmentId}
                  onChange={(e) => setForm({ ...form, enrollmentId: e.target.value })}
                  required
                >
                  <option value="">Select an enrollment...</option>
                  {enrollments.map((en) => (
                    <option key={en.id} value={en.id}>
                      {en.student?.firstName ?? ''} {en.student?.lastName ?? ''} — {en.program?.code ?? ''}
                    </option>
                  ))}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Cycle Number</Label>
                  <p className="text-sm text-muted-foreground italic">Auto-assigned on creation</p>
                </div>
                <div className="space-y-2">
                  <Label>Status</Label>
                  <select className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm" value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })}>
                    <option value="open">Open</option>
                    <option value="in_progress">In Progress</option>
                    <option value="closed">Closed</option>
                  </select>
                </div>
              </div>
              <Button type="submit" className="w-full" disabled={saving}>
                {saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Create Cycle
              </Button>
            </form>
          </DialogContent>
        </Dialog>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-12"><Loader2 className="w-6 h-6 animate-spin text-muted-foreground" /></div>
      ) : (cycles?.length ?? 0) === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <RefreshCw className="w-12 h-12 text-muted-foreground/40 mx-auto mb-3" />
            <p className="text-muted-foreground">No learning cycles yet. Create one to begin an adaptive cycle for an enrollment.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-3">
          {(() => {
            const q = search.trim().toLowerCase()
            const filtered = cycles
              .filter((cy) => !filterEnrollment || cy.enrollmentId === filterEnrollment)
              .filter((cy) => {
                if (!q) return true
                const first = cy.enrollment?.student?.firstName?.toLowerCase() ?? ''
                const last = cy.enrollment?.student?.lastName?.toLowerCase() ?? ''
                const pCode = cy.enrollment?.program?.code?.toLowerCase() ?? ''
                const pName = cy.enrollment?.program?.name?.toLowerCase() ?? ''
                const cNum = String(cy.cycleNumber)
                return first.includes(q) || last.includes(q) || pCode.includes(q) || pName.includes(q) || cNum.includes(q)
              })
            return (
              <>
                {q && (
                  <p className="text-sm text-muted-foreground">Showing {filtered.length} of {cycles.filter((cy) => !filterEnrollment || cy.enrollmentId === filterEnrollment).length}</p>
                )}
                {q && filtered.length === 0 ? (
                  <Card>
                    <CardContent className="py-8 text-center">
                      <Search className="w-10 h-10 text-muted-foreground/40 mx-auto mb-2" />
                      <p className="text-sm text-muted-foreground">No learning cycles match your search.</p>
                    </CardContent>
                  </Card>
                ) : !q && filterEnrollment && filtered.length === 0 ? (
                  <Card>
                    <CardContent className="py-12 text-center">
                      <RefreshCw className="w-12 h-12 text-muted-foreground/40 mx-auto mb-3" />
                      <p className="text-muted-foreground">No learning cycles for this enrollment.</p>
                    </CardContent>
                  </Card>
                ) : filtered.map((cy) => (
            <Card key={cy.id} className="hover:shadow-md transition-shadow" style={{ boxShadow: 'var(--shadow-sm)' }}>
              <CardContent className="py-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <RefreshCw className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">
                        Cycle {cy.cycleNumber}
                        <span className="mx-2 text-muted-foreground">·</span>
                        {cy.enrollment?.student?.firstName ?? ''} {cy.enrollment?.student?.lastName ?? ''}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {cy.enrollment?.program?.name ?? ''}
                        <span className="font-mono ml-1">({cy.enrollment?.program?.code ?? ''})</span>
                      </p>
                    </div>
                  </div>
                  <select
                    className="rounded-md border border-input bg-background px-2 py-1 text-xs font-medium"
                    value={cy.status}
                    onChange={(e) => handleStatusChange(cy.id, e.target.value)}
                    disabled={updating === cy.id}
                  >
                    <option value="open">open</option>
                    <option value="in_progress">in_progress</option>
                    <option value="closed">closed</option>
                  </select>
                </div>
                <div className="mt-3 pt-3 border-t flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
                  <span>Opened: {formatDate(cy.openedAt)}</span>
                  <span>Closed: {formatDate(cy.closedAt)}</span>
                  <span>{cy._count?.cycleDecisions ?? 0} decision{(cy._count?.cycleDecisions ?? 0) !== 1 ? 's' : ''}</span>
                  <span>{cy._count?.studyLoads ?? 0} load{(cy._count?.studyLoads ?? 0) !== 1 ? 's' : ''}</span>
                  <span>{cy._count?.cycleEvaluations ?? 0} eval{(cy._count?.cycleEvaluations ?? 0) !== 1 ? 's' : ''}</span>
                  <Link
                    href={`/admin/learning-cycles/${cy.id}`}
                    className="ml-auto inline-flex items-center gap-1 text-primary hover:underline font-medium"
                  >
                    Open cycle <ExternalLink className="w-3 h-3" />
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
              </>
            )
          })()}
        </div>
      )}
    </div>
  )
}
