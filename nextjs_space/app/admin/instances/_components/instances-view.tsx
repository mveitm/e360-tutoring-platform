'use client'

import { useState, useEffect, useCallback } from 'react'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Card, CardContent } from '@/components/ui/card'

import { Input } from '@/components/ui/input'
import { Link2, Plus, Loader2, Calendar, Activity, ExternalLink, Search } from 'lucide-react'
import Link from 'next/link'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { toast } from 'sonner'
import { AttentionSignalCell } from '@/app/admin/_components/attention-signal'
import {
  mapPostureToAttentionSignal,
  ATTENTION_SIGNAL_LABELS,
  type AttentionSignal,
} from '@/lib/admin/attention-signal'

interface StudentOption {
  id: string
  firstName: string
  lastName: string
  email: string
}

interface ProgramOption {
  id: string
  code: string
  name: string
}

interface Instance {
  id: string
  studentId: string
  programId: string
  status: string
  startedAt: string | null
  endedAt: string | null
  lastActivityAt: string | null
  currentCycleId: string | null
  currentContinuityState: string
  createdAt: string
  student?: StudentOption
  program?: ProgramOption
  latestGovernancePosture?: string | null
  attentionAcknowledged?: boolean
}

export function InstancesView() {
  const [instances, setInstances] = useState<Instance[]>([])
  const [students, setStudents] = useState<StudentOption[]>([])
  const [programs, setPrograms] = useState<ProgramOption[]>([])
  const [loading, setLoading] = useState(true)
  const [open, setOpen] = useState(false)
  const [saving, setSaving] = useState(false)
  const [form, setForm] = useState({ studentId: '', programId: '', status: 'active', currentContinuityState: 'normal', startedAt: '', endedAt: '', currentCycleId: '' })
  const [search, setSearch] = useState('')
  // Phase EH+EL: client-side advisory attention filter. Default 'all'. No persistence.
  // 'attention_unreviewed' (EL) is a composite filter: attention_required AND not acknowledged.
  const [attentionFilter, setAttentionFilter] = useState<'all' | AttentionSignal | 'attention_unreviewed'>('all')
  const [updatingEnrollmentStatus, setUpdatingEnrollmentStatus] = useState<string | null>(null)
  const [updatingContinuityState, setUpdatingContinuityState] = useState<string | null>(null)

  const fetchData = useCallback(async () => {
    try {
      const [iRes, sRes, pRes] = await Promise.all([
        fetch('/api/instances'),
        fetch('/api/students'),
        fetch('/api/programs'),
      ])
      if (iRes.ok) setInstances((await iRes.json()) ?? [])
      if (sRes.ok) setStudents((await sRes.json()) ?? [])
      if (pRes.ok) setPrograms((await pRes.json()) ?? [])
    } catch (err: any) {
      console.error('Failed to fetch data', err)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.studentId || !form.programId) {
      toast.error('Select both a student and a program')
      return
    }
    setSaving(true)
    try {
      const res = await fetch('/api/instances', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          startedAt: form.startedAt || undefined,
          endedAt: form.endedAt || undefined,
          currentCycleId: form.currentCycleId || undefined,
        }),
      })
      const data = await res.json()
      if (!res.ok) {
        toast.error(data?.error ?? 'Failed to create enrollment')
      } else {
        toast.success('Enrollment created')
        setForm({ studentId: '', programId: '', status: 'active', currentContinuityState: 'normal', startedAt: '', endedAt: '', currentCycleId: '' })
        setOpen(false)
        fetchData()
      }
    } catch {
      toast.error('Something went wrong')
    } finally {
      setSaving(false)
    }
  }

  const formatDate = (d: string | null) => {
    if (!d) return '—'
    try {
      return new Date(d).toLocaleDateString()
    } catch {
      return '—'
    }
  }

  const handleContinuityStateChange = async (enrollmentId: string, newState: string) => {
    setUpdatingContinuityState(enrollmentId)
    try {
      const res = await fetch(`/api/instances/${enrollmentId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ currentContinuityState: newState }),
      })
      if (res.ok) {
        toast.success('Enrollment updated')
        fetchData()
      } else {
        const data = await res.json().catch(() => null)
        toast.error(data?.error ?? 'Failed to update continuity state')
      }
    } catch {
      toast.error('Something went wrong')
    } finally {
      setUpdatingContinuityState(null)
    }
  }

  const handleEnrollmentStatusChange = async (enrollmentId: string, newStatus: string) => {
    setUpdatingEnrollmentStatus(enrollmentId)
    try {
      const res = await fetch(`/api/instances/${enrollmentId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      })
      if (res.ok) {
        toast.success('Enrollment updated')
        fetchData()
      } else {
        const data = await res.json().catch(() => null)
        toast.error(data?.error ?? 'Failed to update enrollment status')
      }
    } catch {
      toast.error('Something went wrong')
    } finally {
      setUpdatingEnrollmentStatus(null)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-semibold tracking-tight flex items-center gap-2">
            <Link2 className="w-6 h-6 text-primary" /> Enrollments
          </h1>
          <p className="text-muted-foreground text-sm mt-1">Student-program enrollment instances</p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2"><Plus className="w-4 h-4" /> New Enrollment</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>New Enrollment</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleCreate} className="space-y-4">
              <div className="space-y-2">
                <Label>Student</Label>
                <select
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  value={form.studentId}
                  onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setForm({ ...form, studentId: e.target.value })}
                  required
                >
                  <option value="">Select a student...</option>
                  {(students ?? []).map((s: StudentOption) => (
                    <option key={s.id} value={s.id}>
                      {s?.firstName ?? ''} {s?.lastName ?? ''} ({s?.email ?? ''})
                    </option>
                  ))}
                </select>
                {(students?.length ?? 0) === 0 && (
                  <p className="text-xs text-muted-foreground">No students found. Create a student first.</p>
                )}
              </div>
              <div className="space-y-2">
                <Label>Program</Label>
                <select
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  value={form.programId}
                  onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setForm({ ...form, programId: e.target.value })}
                  required
                >
                  <option value="">Select a program...</option>
                  {(programs ?? []).map((p: ProgramOption) => (
                    <option key={p.id} value={p.id}>
                      {p?.name ?? ''} ({p?.code ?? ''})
                    </option>
                  ))}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Status</Label>
                  <select
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    value={form.status}
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setForm({ ...form, status: e.target.value })}
                  >
                    <option value="active">Active</option>
                    <option value="paused">Paused</option>
                    <option value="completed">Completed</option>
                    <option value="dropped">Dropped</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label>Continuity State</Label>
                  <select
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    value={form.currentContinuityState}
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setForm({ ...form, currentContinuityState: e.target.value })}
                  >
                    <option value="normal">Normal</option>
                    <option value="at_risk">At Risk</option>
                    <option value="returning">Returning</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Started At <span className="text-muted-foreground text-xs">(optional, defaults to now)</span></Label>
                  <Input
                    type="datetime-local"
                    value={form.startedAt}
                    onChange={(e) => setForm({ ...form, startedAt: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Ended At <span className="text-muted-foreground text-xs">(optional)</span></Label>
                  <Input
                    type="datetime-local"
                    value={form.endedAt}
                    onChange={(e) => setForm({ ...form, endedAt: e.target.value })}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Current Cycle ID <span className="text-muted-foreground text-xs">(optional)</span></Label>
                <Input
                  placeholder="e.g. cycle_001"
                  value={form.currentCycleId}
                  onChange={(e) => setForm({ ...form, currentCycleId: e.target.value })}
                />
              </div>
              <Button type="submit" className="w-full" disabled={saving}>
                {saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Create Enrollment
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {!loading && instances.length > 0 && (
        <div className="flex items-center gap-3 flex-wrap">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search by student name or program…"
              value={search}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)}
              className="pl-9"
            />
          </div>
          {/* ── Phase EH: client-side advisory attention filter (list-scanning affordance only; not a workflow control). ── */}
          <div className="flex items-center gap-2">
            <Label htmlFor="attention-filter" className="text-xs text-muted-foreground whitespace-nowrap">
              Filter by attention signal
            </Label>
            <select
              id="attention-filter"
              className="rounded-md border border-input bg-background px-2 py-1 text-xs"
              value={attentionFilter}
              onChange={(e) => setAttentionFilter(e.target.value as 'all' | AttentionSignal | 'attention_unreviewed')}
            >
              <option value="all">All</option>
              <option value="attention_unreviewed">Attention unreviewed</option>
              <option value="attention_required">{ATTENTION_SIGNAL_LABELS.attention_required}</option>
              <option value="monitor">{ATTENTION_SIGNAL_LABELS.monitor}</option>
              <option value="stable">{ATTENTION_SIGNAL_LABELS.stable}</option>
              <option value="no_governance_record">{ATTENTION_SIGNAL_LABELS.no_governance_record}</option>
            </select>
          </div>
          {/* ── Phase EJ+EL: filter-aware orientation counter (read-only; composes search + attention filter; no network; no state). ── */}
          <span className="text-xs text-muted-foreground">
            Showing {instances.filter((inst) => {
              if (search) {
                const q = search.toLowerCase()
                const matchesSearch =
                  (inst.student?.firstName ?? '').toLowerCase().includes(q) ||
                  (inst.student?.lastName ?? '').toLowerCase().includes(q) ||
                  (inst.program?.code ?? '').toLowerCase().includes(q) ||
                  (inst.program?.name ?? '').toLowerCase().includes(q)
                if (!matchesSearch) return false
              }
              if (attentionFilter === 'attention_unreviewed') {
                if (mapPostureToAttentionSignal(inst.latestGovernancePosture) !== 'attention_required' || inst.attentionAcknowledged) return false
              } else if (attentionFilter !== 'all') {
                if (mapPostureToAttentionSignal(inst.latestGovernancePosture) !== attentionFilter) return false
              }
              return true
            }).length} of {instances.length} enrollments
          </span>
        </div>
      )}

      {loading ? (
        <div className="flex justify-center py-12">
          <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
        </div>
      ) : (instances?.length ?? 0) === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <Link2 className="w-12 h-12 text-muted-foreground/40 mx-auto mb-3" />
            <p className="text-muted-foreground">No enrollments yet. Create one to link a student with a program.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-3">
          {(() => {
            const filtered = instances.filter((inst) => {
              // Phase EH+EL: compose search + attention filter on the already-fetched list.
              if (search) {
                const q = search.toLowerCase()
                const matchesSearch =
                  (inst.student?.firstName ?? '').toLowerCase().includes(q) ||
                  (inst.student?.lastName ?? '').toLowerCase().includes(q) ||
                  (inst.program?.code ?? '').toLowerCase().includes(q) ||
                  (inst.program?.name ?? '').toLowerCase().includes(q)
                if (!matchesSearch) return false
              }
              if (attentionFilter === 'attention_unreviewed') {
                if (mapPostureToAttentionSignal(inst.latestGovernancePosture) !== 'attention_required' || inst.attentionAcknowledged) {
                  return false
                }
              } else if (attentionFilter !== 'all') {
                if (mapPostureToAttentionSignal(inst.latestGovernancePosture) !== attentionFilter) {
                  return false
                }
              }
              return true
            })
            // Phase EH: if the attention filter is active and yields zero rows, show the filter-specific empty state.
            if (attentionFilter !== 'all' && filtered.length === 0) {
              return (
                <Card>
                  <CardContent className="py-8 text-center">
                    <p className="text-sm text-muted-foreground">No enrollments match this filter.</p>
                  </CardContent>
                </Card>
              )
            }
            if (search && filtered.length === 0) {
              return (
                <Card>
                  <CardContent className="py-8 text-center">
                    <Search className="w-10 h-10 text-muted-foreground/40 mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground">No enrollments match your search.</p>
                  </CardContent>
                </Card>
              )
            }
            return filtered.map((inst: Instance) => (
            <Card key={inst.id} className="hover:shadow-md transition-shadow" style={{ boxShadow: 'var(--shadow-sm)' }}>
              <CardContent className="py-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Link2 className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">
                        {inst?.student?.firstName ?? ''} {inst?.student?.lastName ?? ''}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {inst?.program?.name ?? ''}
                        <span className="font-mono ml-1">({inst?.program?.code ?? ''})</span>
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <select
                      className="rounded-md border border-input bg-background px-2 py-1 text-xs font-medium"
                      value={inst.status}
                      disabled={updatingEnrollmentStatus === inst.id}
                      onChange={(e) => handleEnrollmentStatusChange(inst.id, e.target.value)}
                    >
                      <option value="active">active</option>
                      <option value="paused">paused</option>
                      <option value="completed">completed</option>
                      <option value="dropped">dropped</option>
                    </select>
                    <select
                      className="rounded-md border border-input bg-background px-2 py-1 text-xs font-mono"
                      value={inst.currentContinuityState}
                      disabled={updatingContinuityState === inst.id}
                      onChange={(e) => handleContinuityStateChange(inst.id, e.target.value)}
                    >
                      <option value="normal">normal</option>
                      <option value="at_risk">at_risk</option>
                      <option value="returning">returning</option>
                    </select>
                    <Link
                      href={`/admin/instances/${inst.id}`}
                      className="inline-flex items-center gap-1 text-xs text-primary hover:underline whitespace-nowrap"
                    >
                      Open enrollment <ExternalLink className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
                <div className="mt-3 pt-3 border-t grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs text-muted-foreground">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>Started: {formatDate(inst?.startedAt)}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>Ended: {formatDate(inst?.endedAt)}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Activity className="w-3.5 h-3.5" />
                    <span>Last activity: {formatDate(inst?.lastActivityAt)}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-mono">Cycle: {inst?.currentCycleId ?? '—'}</span>
                  </div>
                </div>
                {/* ── Phase EG: advisory-only attention signal (read-only). Does not block workflow. ── */}
                <div className="mt-2 flex items-center gap-1.5">
                  <span className="text-xs text-muted-foreground">Attention:</span>
                  <AttentionSignalCell posture={inst?.latestGovernancePosture} acknowledged={inst?.attentionAcknowledged} />
                </div>
              </CardContent>
            </Card>
          ))
          })()}
        </div>
      )}
    </div>
  )
}
