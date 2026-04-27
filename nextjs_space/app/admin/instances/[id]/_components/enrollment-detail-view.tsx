'use client'

import { useState, useEffect, useCallback } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { ArrowLeft, Link2, RefreshCw, Zap, Loader2, Calendar, Activity, User, GraduationCap, ExternalLink, Pencil, Trash2, Plus, Search } from 'lucide-react'
import { toast } from 'sonner'
import Link from 'next/link'
import { GovernanceReadingsPanel } from './governance-readings-panel'
import { AttentionSignalLine } from '@/app/admin/_components/attention-signal'

interface SkillStateItem {
  id: string
  masteryLevel: string
  confidenceLevel: string
  needsReinforcement: boolean
  lastEvaluatedAt: string | null
  skill: {
    id: string
    code: string
    name: string
    axis: { id: string; code: string; name: string }
  }
}

interface LearningCycleItem {
  id: string
  cycleNumber: number
  status: string
  openedAt: string
  closedAt: string | null
  _count: {
    cycleDecisions: number
    studyLoads: number
    cycleEvaluations: number
  }
  // Phase EN: study load statuses for current-cycle operational summary (read-only).
  studyLoads?: { status: string }[]
}

interface EnrollmentDetail {
  id: string
  status: string
  startedAt: string | null
  endedAt: string | null
  lastActivityAt: string | null
  currentCycleId: string | null
  currentContinuityState: string
  createdAt: string
  student: { id: string; firstName: string; lastName: string; email: string }
  program: { id: string; code: string; name: string }
  learningCycles: LearningCycleItem[]
  skillStates: SkillStateItem[]
  latestGovernancePosture: string | null
  attentionAcknowledged: boolean
}

const masteryColors: Record<string, string> = {
  not_evaluated: 'bg-gray-200 text-gray-700',
  emerging: 'bg-amber-100 text-amber-800',
  developing: 'bg-blue-100 text-blue-800',
  proficient: 'bg-emerald-100 text-emerald-800',
  mastered: 'bg-violet-100 text-violet-800',
}

export function EnrollmentDetailView() {
  const params = useParams()
  const router = useRouter()
  const enrollmentId = params?.id as string

  const [enrollment, setEnrollment] = useState<EnrollmentDetail | null>(null)
  const [loading, setLoading] = useState(true)
  const [updating, setUpdating] = useState(false)
  const [editOpen, setEditOpen] = useState(false)
  const [editForm, setEditForm] = useState({ startedAt: '', endedAt: '' })
  const [editSaving, setEditSaving] = useState(false)
  const [creatingCycle, setCreatingCycle] = useState(false)
  const [updatingCycleStatus, setUpdatingCycleStatus] = useState<string | null>(null)

  /* ── Skill State mastery editing ── */
  const [updatingSkillState, setUpdatingSkillState] = useState<string | null>(null)

  /* ── New Skill State inline controls ── */
  const [programSkills, setProgramSkills] = useState<{ id: string; code: string; name: string; axis: { code: string; name: string } }[]>([])
  const [selectedSkill, setSelectedSkill] = useState('')
  const [creatingSkillState, setCreatingSkillState] = useState(false)
  const [skillStateSearch, setSkillStateSearch] = useState('')
  const [cycleSearch, setCycleSearch] = useState('')

  const fetchEnrollment = useCallback(async () => {
    try {
      const res = await fetch(`/api/instances/${enrollmentId}`)
      if (!res.ok) {
        if (res.status === 404) {
          toast.error('Enrollment not found')
          router.push('/admin/instances')
          return
        }
        throw new Error('Failed to fetch')
      }
      setEnrollment(await res.json())
    } catch (err) {
      console.error('Failed to fetch enrollment', err)
      toast.error('Failed to load enrollment details')
    } finally {
      setLoading(false)
    }
  }, [enrollmentId, router])

  useEffect(() => {
    if (enrollmentId) fetchEnrollment()
  }, [enrollmentId, fetchEnrollment])

  const handlePatch = async (field: string, value: string) => {
    setUpdating(true)
    try {
      const res = await fetch(`/api/instances/${enrollmentId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ [field]: value }),
      })
      if (res.ok) {
        toast.success('Enrollment updated')
        fetchEnrollment()
      } else {
        const data = await res.json()
        toast.error(data?.error ?? 'Failed to update')
      }
    } catch {
      toast.error('Something went wrong')
    } finally {
      setUpdating(false)
    }
  }

  const toLocalDatetime = (d: string | null) => {
    if (!d) return ''
    try {
      const dt = new Date(d)
      const pad = (n: number) => String(n).padStart(2, '0')
      return `${dt.getFullYear()}-${pad(dt.getMonth() + 1)}-${pad(dt.getDate())}T${pad(dt.getHours())}:${pad(dt.getMinutes())}`
    } catch { return '' }
  }

  const openEdit = () => {
    if (!enrollment) return
    setEditForm({
      startedAt: toLocalDatetime(enrollment.startedAt),
      endedAt: toLocalDatetime(enrollment.endedAt),
    })
    setEditOpen(true)
  }

  const handleEdit = async (e: React.FormEvent) => {
    e.preventDefault()
    setEditSaving(true)
    try {
      const res = await fetch(`/api/instances/${enrollmentId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          startedAt: editForm.startedAt || null,
          endedAt: editForm.endedAt || null,
        }),
      })
      const data = await res.json()
      if (!res.ok) {
        toast.error(data?.error ?? 'Failed to update enrollment')
      } else {
        toast.success('Enrollment updated')
        setEditOpen(false)
        fetchEnrollment()
      }
    } catch {
      toast.error('Something went wrong')
    } finally {
      setEditSaving(false)
    }
  }

  const handleDelete = async () => {
    if (!window.confirm('Delete this enrollment? This cannot be undone.')) return
    try {
      const res = await fetch(`/api/instances/${enrollmentId}`, { method: 'DELETE' })
      const data = await res.json()
      if (!res.ok) {
        toast.error(data?.error ?? 'Failed to delete enrollment')
      } else {
        toast.success('Enrollment deleted')
        router.push('/admin/instances')
      }
    } catch {
      toast.error('Something went wrong')
    }
  }

  /* Fetch skills for the enrollment's program (for inline skill-state creation) */
  useEffect(() => {
    if (!enrollment?.program?.id) return
    fetch(`/api/skills?programId=${enrollment.program.id}`)
      .then((r) => r.ok ? r.json() : Promise.reject())
      .then((data: { id: string; code: string; name: string; axis: { code: string; name: string } }[]) => setProgramSkills(data))
      .catch(() => { /* silent */ })
  }, [enrollment?.program?.id])

  const handleNewSkillState = async () => {
    if (!selectedSkill) {
      toast.error('Select a skill')
      return
    }
    setCreatingSkillState(true)
    try {
      const res = await fetch('/api/skill-states', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ enrollmentId, skillId: selectedSkill }),
      })
      if (res.ok) {
        toast.success('Skill state created')
        setSelectedSkill('')
        fetchEnrollment()
      } else {
        const data = await res.json().catch(() => null)
        toast.error(data?.error ?? 'Failed to create skill state')
      }
    } catch {
      toast.error('Something went wrong')
    } finally {
      setCreatingSkillState(false)
    }
  }

  const handleSkillStateMastery = async (id: string, masteryLevel: string) => {
    setUpdatingSkillState(id)
    try {
      const res = await fetch(`/api/skill-states/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ masteryLevel }),
      })
      if (res.ok) {
        toast.success('Mastery level updated')
        fetchEnrollment()
      } else {
        const data = await res.json().catch(() => null)
        toast.error(data?.error ?? 'Failed to update mastery level')
      }
    } catch {
      toast.error('Something went wrong')
    } finally {
      setUpdatingSkillState(null)
    }
  }

  const handleSkillStateConfidence = async (id: string, confidenceLevel: string) => {
    setUpdatingSkillState(id)
    try {
      const res = await fetch(`/api/skill-states/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ confidenceLevel }),
      })
      if (res.ok) {
        toast.success('Confidence level updated')
        fetchEnrollment()
      } else {
        const data = await res.json().catch(() => null)
        toast.error(data?.error ?? 'Failed to update confidence level')
      }
    } catch {
      toast.error('Something went wrong')
    } finally {
      setUpdatingSkillState(null)
    }
  }

  const handleSkillStateReinforcement = async (id: string, needsReinforcement: boolean) => {
    setUpdatingSkillState(id)
    try {
      const res = await fetch(`/api/skill-states/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ needsReinforcement }),
      })
      if (res.ok) {
        toast.success('Reinforcement flag updated')
        fetchEnrollment()
      } else {
        const data = await res.json().catch(() => null)
        toast.error(data?.error ?? 'Failed to update reinforcement flag')
      }
    } catch {
      toast.error('Something went wrong')
    } finally {
      setUpdatingSkillState(null)
    }
  }

  const handleNewCycle = async () => {
    setCreatingCycle(true)
    try {
      const res = await fetch('/api/learning-cycles', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ enrollmentId }),
      })
      if (res.ok) {
        toast.success('Learning cycle created')
        fetchEnrollment()
      } else {
        const data = await res.json()
        toast.error(data?.error ?? 'Failed to create cycle')
      }
    } catch {
      toast.error('Something went wrong')
    } finally {
      setCreatingCycle(false)
    }
  }

  const handleCycleStatusChange = async (cycleId: string, newStatus: string) => {
    setUpdatingCycleStatus(cycleId)
    try {
      const res = await fetch(`/api/learning-cycles/${cycleId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      })
      if (res.ok) {
        toast.success(`Cycle ${newStatus === 'closed' ? 'closed' : 'updated'}`)
        fetchEnrollment()
      } else {
        const data = await res.json().catch(() => null)
        toast.error(data?.error ?? 'Failed to update cycle status')
      }
    } catch {
      toast.error('Something went wrong')
    } finally {
      setUpdatingCycleStatus(null)
    }
  }

  const fmt = (d: string | null) => {
    if (!d) return '—'
    try { return new Date(d).toLocaleDateString('es-CL', { day: '2-digit', month: 'short', year: 'numeric' }) } catch { return '—' }
  }

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
      </div>
    )
  }

  if (!enrollment) {
    return (
      <div className="text-center py-20 text-muted-foreground">
        <p>Enrollment not found.</p>
        <Link href="/admin/instances" className="text-primary underline mt-2 inline-block">Back to enrollments</Link>
      </div>
    )
  }

  const { student, program, learningCycles, skillStates } = enrollment

  return (
    <div className="space-y-6">
      {/* Back link */}
      <Link
        href="/admin/instances"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Enrollments
      </Link>

      {/* ── Header Card ── */}
      <Card>
        <CardContent className="py-5">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <Link2 className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h1 className="font-display text-xl font-semibold tracking-tight flex items-center gap-2">
                  <User className="w-5 h-5 text-muted-foreground" />
                  {student.firstName} {student.lastName}
                </h1>
                <p className="text-sm text-muted-foreground mt-0.5 flex items-center gap-1">
                  <GraduationCap className="w-3.5 h-3.5" />
                  {program.name} <span className="font-mono">({program.code})</span>
                </p>
                <div className="flex items-center gap-3 mt-1">
                  <Link
                    href={`/admin/students/${student.id}`}
                    className="inline-flex items-center gap-1 text-xs text-primary hover:underline"
                  >
                    View student <ExternalLink className="w-3 h-3" />
                  </Link>
                  <Link
                    href={`/admin/programs/${program.id}`}
                    className="inline-flex items-center gap-1 text-xs text-primary hover:underline"
                  >
                    View program <ExternalLink className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <select
                className="rounded-md border border-input bg-background px-2 py-1 text-xs font-medium"
                value={enrollment.status}
                onChange={(e) => handlePatch('status', e.target.value)}
                disabled={updating}
              >
                <option value="active">active</option>
                <option value="paused">paused</option>
                <option value="completed">completed</option>
                <option value="dropped">dropped</option>
              </select>
              <select
                className="rounded-md border border-input bg-background px-2 py-1 text-xs font-medium font-mono"
                value={enrollment.currentContinuityState}
                onChange={(e) => handlePatch('currentContinuityState', e.target.value)}
                disabled={updating}
              >
                <option value="normal">normal</option>
                <option value="at_risk">at_risk</option>
                <option value="returning">returning</option>
              </select>
              <Button variant="ghost" size="icon" className="h-8 w-8" onClick={openEdit}>
                <Pencil className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:text-destructive" onClick={handleDelete}>
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
            <div>
              <p className="text-muted-foreground text-xs">Started</p>
              <p className="font-medium flex items-center gap-1"><Calendar className="w-3.5 h-3.5 text-muted-foreground" /> {fmt(enrollment.startedAt)}</p>
            </div>
            <div>
              <p className="text-muted-foreground text-xs">Ended</p>
              <p className="font-medium flex items-center gap-1"><Calendar className="w-3.5 h-3.5 text-muted-foreground" /> {fmt(enrollment.endedAt)}</p>
            </div>
            <div>
              <p className="text-muted-foreground text-xs">Last Activity</p>
              <p className="font-medium flex items-center gap-1"><Activity className="w-3.5 h-3.5 text-muted-foreground" /> {fmt(enrollment.lastActivityAt)}</p>
            </div>
            <div>
              <p className="text-muted-foreground text-xs">Created</p>
              <p className="font-medium">{fmt(enrollment.createdAt)}</p>
            </div>
          </div>

          {/* ── Phase EG: advisory-only attention signal (read-only). Does not block workflow. ── */}
          <div className="mt-4 pt-4 border-t">
            <AttentionSignalLine
              posture={enrollment.latestGovernancePosture}
              acknowledged={enrollment.attentionAcknowledged}
              enrollmentId={enrollment.id}
              onAcknowledged={fetchEnrollment}
            />
          </div>
        </CardContent>
      </Card>

      {/* ── Phase EN: Current Cycle Operational Summary (read-only) ── */}
      {(() => {
        const currentCycle = enrollment.currentCycleId
          ? learningCycles.find((c) => c.id === enrollment.currentCycleId)
          : null
        if (!currentCycle) {
          return (
            <Card>
              <CardContent className="py-4">
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1">Operational cycle summary</p>
                <p className="text-sm text-muted-foreground">No current cycle data</p>
              </CardContent>
            </Card>
          )
        }
        const loads = currentCycle.studyLoads ?? []
        const total = loads.length
        const pending = loads.filter((l) => l.status === 'pending').length
        const released = loads.filter((l) => l.status === 'released').length
        const inProgress = loads.filter((l) => l.status === 'in_progress').length
        const completed = loads.filter((l) => l.status === 'completed').length
        const indicator = total === 0
          ? 'No study loads in cycle'
          : completed === total
            ? 'All loads completed'
            : 'Cycle has incomplete loads'
        return (
          <Card>
            <CardContent className="py-4">
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2">Operational cycle summary</p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-sm">
                <div>
                  <p className="text-muted-foreground text-xs">Cycle</p>
                  <p className="font-medium">#{currentCycle.cycleNumber} · <span className="font-mono text-xs">{currentCycle.status}</span></p>
                </div>
                <div>
                  <p className="text-muted-foreground text-xs">Total loads</p>
                  <p className="font-medium">{total}</p>
                </div>
                <div>
                  <p className="text-muted-foreground text-xs">By status</p>
                  <p className="font-medium text-xs">
                    {pending > 0 && <span className="mr-2">pending {pending}</span>}
                    {released > 0 && <span className="mr-2">released {released}</span>}
                    {inProgress > 0 && <span className="mr-2">in_progress {inProgress}</span>}
                    {completed > 0 && <span className="mr-2">completed {completed}</span>}
                    {total === 0 && <span className="text-muted-foreground">—</span>}
                  </p>
                </div>
                <div>
                  <p className="text-muted-foreground text-xs">Indicator</p>
                  <p className={`font-medium text-xs ${completed === total && total > 0 ? 'text-emerald-700' : total === 0 ? 'text-muted-foreground' : 'text-amber-700'}`}>
                    {indicator}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )
      })()}

      {/* ── Learning Cycles ── */}
      <section>
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-display text-lg font-semibold tracking-tight flex items-center gap-2">
            <RefreshCw className="w-5 h-5 text-primary" /> Learning Cycles
            <span className="text-sm font-normal text-muted-foreground">({learningCycles.length})</span>
          </h2>
          <Button size="sm" onClick={handleNewCycle} disabled={creatingCycle}>
            {creatingCycle ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Plus className="mr-2 h-4 w-4" />}
            New Cycle
          </Button>
        </div>
        {learningCycles.length === 0 ? (
          <Card><CardContent className="py-8 text-center text-sm text-muted-foreground">No learning cycles for this enrollment.</CardContent></Card>
        ) : (
          <>
            <div className="relative mb-2">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search by cycle number, status, or date…"
                value={cycleSearch}
                onChange={(e) => setCycleSearch(e.target.value)}
                className="pl-9 h-8 text-sm"
              />
            </div>
            {(() => {
              const q = cycleSearch.trim().toLowerCase()
              const filtered = learningCycles.filter((c) => {
                if (!q) return true
                const num = String(c.cycleNumber)
                const status = c.status.toLowerCase()
                const opened = fmt(c.openedAt).toLowerCase()
                const closed = c.closedAt ? fmt(c.closedAt).toLowerCase() : ''
                return num.includes(q) || status.includes(q) || opened.includes(q) || closed.includes(q)
              })
              return (
                <>
                  {q && (
                    <p className="text-sm text-muted-foreground mb-2">Showing {filtered.length} of {learningCycles.length}</p>
                  )}
                  {q && filtered.length === 0 ? (
                    <Card>
                      <CardContent className="py-8 text-center">
                        <Search className="w-10 h-10 text-muted-foreground/40 mx-auto mb-2" />
                        <p className="text-sm text-muted-foreground">No learning cycles match your search.</p>
                      </CardContent>
                    </Card>
                  ) : (
                    <div className="grid gap-2">
                      {filtered.map((c) => (
                        <Card key={c.id} className="hover:shadow-sm transition-shadow">
                          <CardContent className="py-3">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                <div>
                                  <p className="text-sm font-medium">Cycle {c.cycleNumber}</p>
                                  <p className="text-xs text-muted-foreground">
                                    {fmt(c.openedAt)}{c.closedAt ? ` → ${fmt(c.closedAt)}` : ''}
                                  </p>
                                </div>
                              </div>
                              <div className="flex items-center gap-4">
                                <div className="text-xs text-muted-foreground text-right space-y-0.5">
                                  <p>{c._count.cycleDecisions} dec · {c._count.studyLoads} loads · {c._count.cycleEvaluations} evals</p>
                                </div>
                                <select
                                  className="rounded-md border border-input bg-background px-2 py-1 text-xs font-medium"
                                  value={c.status}
                                  disabled={updatingCycleStatus === c.id}
                                  onChange={(e) => handleCycleStatusChange(c.id, e.target.value)}
                                >
                                  <option value="open">open</option>
                                  <option value="in_progress">in_progress</option>
                                  <option value="closed">closed</option>
                                </select>
                                <Link
                                  href={`/admin/learning-cycles/${c.id}`}
                                  className="inline-flex items-center gap-1 text-xs text-primary hover:underline whitespace-nowrap"
                                >
                                  Open cycle <ExternalLink className="w-3 h-3" />
                                </Link>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  )}
                </>
              )
            })()}
          </>
        )}
      </section>

      {/* ── Skill States ── */}
      <section>
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-display text-lg font-semibold tracking-tight flex items-center gap-2">
            <Zap className="w-5 h-5 text-primary" /> Skill States
            <span className="text-sm font-normal text-muted-foreground">({skillStates.length})</span>
          </h2>
          <div className="flex items-center gap-2">
            <select
              className="rounded-md border border-input bg-background px-2 py-1 text-xs h-[26px]"
              value={selectedSkill}
              onChange={(e) => setSelectedSkill(e.target.value)}
            >
              <option value="">— Skill —</option>
              {programSkills.map((s) => (
                <option key={s.id} value={s.id}>{s.code} — {s.name}</option>
              ))}
            </select>
            <Button size="sm" onClick={handleNewSkillState} disabled={!selectedSkill || creatingSkillState}>
              {creatingSkillState ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Plus className="mr-2 h-4 w-4" />}
              New Skill State
            </Button>
          </div>
        </div>
        {skillStates.length > 0 && (
          <div className="relative mb-3">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search by skill code, skill name, or axis…"
              value={skillStateSearch}
              onChange={(e) => setSkillStateSearch(e.target.value)}
              className="pl-9"
            />
          </div>
        )}
        {(() => {
          const q = skillStateSearch.trim().toLowerCase()
          const filtered = q
            ? skillStates.filter((ss) =>
                (ss.skill?.code ?? '').toLowerCase().includes(q) ||
                (ss.skill?.name ?? '').toLowerCase().includes(q) ||
                (ss.skill?.axis?.name ?? '').toLowerCase().includes(q)
              )
            : skillStates

          if (skillStates.length === 0) {
            return <Card><CardContent className="py-8 text-center text-sm text-muted-foreground">No skill states tracked for this enrollment.</CardContent></Card>
          }

          if (q && filtered.length === 0) {
            return (
              <Card>
                <CardContent className="py-8 text-center">
                  <Search className="w-10 h-10 text-muted-foreground/40 mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">No skill states match your search.</p>
                </CardContent>
              </Card>
            )
          }

          return (
            <>
              {q && (
                <p className="text-xs text-muted-foreground mb-2">
                  Showing {filtered.length} of {skillStates.length}
                </p>
              )}
              <div className="grid gap-2">
                {filtered.map((ss) => (
                  <Card key={ss.id} className="hover:shadow-sm transition-shadow">
                <CardContent className="py-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Badge className={masteryColors[ss.masteryLevel] ?? 'bg-gray-200 text-gray-700'}>
                        {ss.masteryLevel.replace('_', ' ')}
                      </Badge>
                      <div>
                        <p className="text-sm font-medium">{ss.skill.name}</p>
                        <p className="text-xs text-muted-foreground">
                          <span className="font-mono">{ss.skill.code}</span>
                          <span className="mx-1">·</span>
                          {ss.skill.axis.name} <span className="font-mono">({ss.skill.axis.code})</span>
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <select
                        className="rounded-md border border-input bg-background px-2 py-1 text-xs font-medium"
                        value={ss.masteryLevel}
                        disabled={updatingSkillState === ss.id}
                        onChange={(e) => handleSkillStateMastery(ss.id, e.target.value)}
                      >
                        <option value="not_evaluated">not_evaluated</option>
                        <option value="emerging">emerging</option>
                        <option value="developing">developing</option>
                        <option value="proficient">proficient</option>
                        <option value="mastered">mastered</option>
                      </select>
                      <div className="text-xs text-muted-foreground text-right space-y-0.5">
                        <div className="flex items-center gap-1 justify-end">
                          <span>Confidence:</span>
                          <select
                            className="rounded-md border border-input bg-background px-1.5 py-0.5 text-xs"
                            value={ss.confidenceLevel}
                            disabled={updatingSkillState === ss.id}
                            onChange={(e) => handleSkillStateConfidence(ss.id, e.target.value)}
                          >
                            <option value="none">none</option>
                            <option value="low">low</option>
                            <option value="medium">medium</option>
                            <option value="high">high</option>
                          </select>
                        </div>
                        <div className="flex items-center gap-1 justify-end">
                          <select
                            className="rounded-md border border-input bg-background px-1.5 py-0.5 text-xs"
                            value={ss.needsReinforcement ? 'yes' : 'no'}
                            disabled={updatingSkillState === ss.id}
                            onChange={(e) => handleSkillStateReinforcement(ss.id, e.target.value === 'yes')}
                          >
                            <option value="no">No reinforce</option>
                            <option value="yes">Reinforce ⚠</option>
                          </select>
                        </div>
                        <p>Evaluated: {fmt(ss.lastEvaluatedAt)}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
                ))}
              </div>
            </>
          )
        })()}
      </section>

      <GovernanceReadingsPanel enrollmentId={enrollmentId} />

      <Dialog open={editOpen} onOpenChange={setEditOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Enrollment Dates</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleEdit} className="space-y-4">
            <div className="space-y-2">
              <Label>Started At</Label>
              <Input
                type="datetime-local"
                value={editForm.startedAt}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEditForm({ ...editForm, startedAt: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label>Ended At</Label>
              <Input
                type="datetime-local"
                value={editForm.endedAt}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEditForm({ ...editForm, endedAt: e.target.value })}
              />
            </div>
            <Button type="submit" className="w-full" disabled={editSaving}>
              {editSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Save Changes
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}
