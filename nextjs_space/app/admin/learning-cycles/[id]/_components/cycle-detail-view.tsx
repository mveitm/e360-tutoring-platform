'use client'

import { useState, useEffect, useCallback } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog'
import { ArrowLeft, RefreshCw, GitBranch, BookOpen, ClipboardCheck, Loader2, Calendar, User, GraduationCap, ExternalLink, Plus, Pencil, Trash2, Search, Lock, CheckCircle2 } from 'lucide-react'
import { toast } from 'sonner'
import Link from 'next/link'

interface CycleDetail {
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
  cycleDecisions: {
    id: string
    decisionType: string
    rationale: string | null
    createdAt: string
  }[]
  studyLoads: {
    id: string
    loadType: string
    title: string
    status: string
    releasedAt: string | null
    dueAt: string | null
    createdAt: string
  }[]
  cycleEvaluations: {
    id: string
    evaluationType: string
    resultSummary: string | null
    createdAt: string
  }[]
  // Phase DT — continuity signals scoped to this cycle. Only used to gate
  // the "Autorizar continuidad" button. Not rendered anywhere else.
  continuitySignals: {
    id: string
    signalType: string
    rationale: string | null
    createdAt: string
  }[]
}

const decisionColors: Record<string, string> = {
  advance: 'bg-emerald-100 text-emerald-800',
  reinforce: 'bg-amber-100 text-amber-800',
  hold: 'bg-gray-200 text-gray-700',
  redirect: 'bg-rose-100 text-rose-800',
  pause: 'bg-sky-100 text-sky-800',
  close_cycle: 'bg-slate-200 text-slate-700',
}

const evalColors: Record<string, string> = {
  diagnostic: 'bg-violet-100 text-violet-800',
  progress_check: 'bg-blue-100 text-blue-800',
  cycle_close: 'bg-gray-200 text-gray-700',
}

const CANONICAL_LOAD_TYPES = new Set(['practice', 'reading', 'video', 'project', 'assessment'])

export function CycleDetailView() {
  const params = useParams()
  const router = useRouter()
  const cycleId = params?.id as string

  const [cycle, setCycle] = useState<CycleDetail | null>(null)
  const [loading, setLoading] = useState(true)
  const [newDecisionType, setNewDecisionType] = useState('')
  const [creatingDecision, setCreatingDecision] = useState(false)
  const [newEvalType, setNewEvalType] = useState('')
  const [creatingEval, setCreatingEval] = useState(false)
  const [newLoadType, setNewLoadType] = useState('')
  const [newLoadTitle, setNewLoadTitle] = useState('')
  const [creatingLoad, setCreatingLoad] = useState(false)
  const [updatingLoad, setUpdatingLoad] = useState<string | null>(null)
  const [editOpen, setEditOpen] = useState(false)
  const [editId, setEditId] = useState<string | null>(null)
  const [editForm, setEditForm] = useState({ title: '', loadType: '', releasedAt: '', dueAt: '' })
  const [editSaving, setEditSaving] = useState(false)
  const [updatingDecisionType, setUpdatingDecisionType] = useState<string | null>(null)
  const [editDecisionOpen, setEditDecisionOpen] = useState(false)
  const [editDecisionId, setEditDecisionId] = useState<string | null>(null)
  const [editDecisionForm, setEditDecisionForm] = useState({ decisionType: '', rationale: '' })
  const [editDecisionSaving, setEditDecisionSaving] = useState(false)
  const [updatingEvalType, setUpdatingEvalType] = useState<string | null>(null)
  const [updatingLoadType, setUpdatingLoadType] = useState<string | null>(null)
  const [studyLoadSearch, setStudyLoadSearch] = useState('')
  const [cycleDecisionSearch, setCycleDecisionSearch] = useState('')
  const [cycleEvaluationSearch, setCycleEvaluationSearch] = useState('')
  const [editEvalOpen, setEditEvalOpen] = useState(false)
  const [editEvalId, setEditEvalId] = useState<string | null>(null)
  const [editEvalForm, setEditEvalForm] = useState({ evaluationType: '', resultSummary: '' })
  const [editEvalSaving, setEditEvalSaving] = useState(false)

  // Phase DS — admin-only atomic cycle close
  const [closeOpen, setCloseOpen] = useState(false)
  const [closing, setClosing] = useState(false)

  // Phase DT — admin-only continuity authorization
  const [continueOpen, setContinueOpen] = useState(false)
  const [authorizing, setAuthorizing] = useState(false)

  const fetchCycle = useCallback(async () => {
    try {
      const res = await fetch(`/api/learning-cycles/${cycleId}`)
      if (!res.ok) {
        if (res.status === 404) {
          toast.error('Cycle not found')
          router.push('/admin/learning-cycles')
          return
        }
        throw new Error('Failed to fetch')
      }
      setCycle(await res.json())
    } catch (err) {
      console.error('Failed to fetch cycle', err)
      toast.error('Failed to load cycle details')
    } finally {
      setLoading(false)
    }
  }, [cycleId, router])

  useEffect(() => {
    if (cycleId) fetchCycle()
  }, [cycleId, fetchCycle])

  // Phase DS — dedicated admin-only close path. Goes through
  // POST /api/learning-cycles/[id]/close so the closing CycleSnapshot and
  // the enrollment activity stamp are persisted atomically. The generic
  // PATCH path now refuses status='closed' by design.
  const handleCloseCycle = async () => {
    setClosing(true)
    try {
      const res = await fetch(`/api/learning-cycles/${cycleId}/close`, {
        method: 'POST',
      })
      if (res.ok) {
        toast.success('Ciclo cerrado')
        setCloseOpen(false)
        fetchCycle()
      } else {
        const data = await res.json().catch(() => ({}))
        toast.error(data?.error ?? 'No se pudo cerrar el ciclo')
      }
    } catch {
      toast.error('Ocurrió un error inesperado')
    } finally {
      setClosing(false)
    }
  }

  // Phase DT — dedicated admin-only continuity authorization. Emits the
  // minimum valid ContinuitySignal{signalType:'continue', rationale:
  // 'admin_authorize'} so DL's P4b can succeed on the next cycle-open
  // attempt. This is pure authorization; it does NOT create cycle N+1.
  const handleAuthorizeContinue = async () => {
    setAuthorizing(true)
    try {
      const res = await fetch(`/api/learning-cycles/${cycleId}/continue`, {
        method: 'POST',
      })
      if (res.ok) {
        toast.success('Continuidad autorizada')
        setContinueOpen(false)
        fetchCycle()
      } else {
        const data = await res.json().catch(() => ({}))
        toast.error(data?.error ?? 'No se pudo autorizar la continuidad')
      }
    } catch {
      toast.error('Ocurrió un error inesperado')
    } finally {
      setAuthorizing(false)
    }
  }

  const handleNewDecision = async () => {
    if (!newDecisionType) return
    setCreatingDecision(true)
    try {
      const res = await fetch('/api/cycle-decisions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ learningCycleId: cycleId, decisionType: newDecisionType }),
      })
      if (res.ok) {
        toast.success('Decision created')
        setNewDecisionType('')
        fetchCycle()
      } else {
        const data = await res.json()
        toast.error(data?.error ?? 'Failed to create decision')
      }
    } catch {
      toast.error('Something went wrong')
    } finally {
      setCreatingDecision(false)
    }
  }

  const openEditDecision = (d: CycleDetail['cycleDecisions'][number]) => {
    setEditDecisionId(d.id)
    setEditDecisionForm({ decisionType: d.decisionType, rationale: d.rationale ?? '' })
    setEditDecisionOpen(true)
  }

  const handleDeleteDecision = async (id: string) => {
    try {
      const res = await fetch(`/api/cycle-decisions/${id}`, { method: 'DELETE' })
      if (res.ok) {
        toast.success('Decision deleted')
        fetchCycle()
      } else {
        const data = await res.json().catch(() => null)
        toast.error(data?.error ?? 'Failed to delete decision')
      }
    } catch {
      toast.error('Something went wrong')
    }
  }

  const handleDecisionTypeChange = async (id: string, newType: string) => {
    setUpdatingDecisionType(id)
    try {
      const res = await fetch(`/api/cycle-decisions/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ decisionType: newType }),
      })
      if (res.ok) {
        toast.success('Decision updated')
        fetchCycle()
      } else {
        const data = await res.json().catch(() => null)
        toast.error(data?.error ?? 'Failed to update decision')
      }
    } catch {
      toast.error('Something went wrong')
    } finally {
      setUpdatingDecisionType(null)
    }
  }

  const handleEvalTypeChange = async (id: string, newType: string) => {
    setUpdatingEvalType(id)
    try {
      const res = await fetch(`/api/cycle-evaluations/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ evaluationType: newType }),
      })
      if (res.ok) {
        toast.success('Evaluation updated')
        fetchCycle()
      } else {
        const data = await res.json().catch(() => null)
        toast.error(data?.error ?? 'Failed to update evaluation')
      }
    } catch {
      toast.error('Something went wrong')
    } finally {
      setUpdatingEvalType(null)
    }
  }

  const handleLoadTypeChange = async (id: string, newType: string) => {
    setUpdatingLoadType(id)
    try {
      const res = await fetch(`/api/study-loads/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ loadType: newType }),
      })
      if (res.ok) {
        toast.success('Study load updated')
        fetchCycle()
      } else {
        const data = await res.json().catch(() => null)
        toast.error(data?.error ?? 'Failed to update study load')
      }
    } catch {
      toast.error('Something went wrong')
    } finally {
      setUpdatingLoadType(null)
    }
  }

  const handleEditDecision = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!editDecisionId || !editDecisionForm.decisionType) return
    setEditDecisionSaving(true)
    try {
      const res = await fetch(`/api/cycle-decisions/${editDecisionId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          decisionType: editDecisionForm.decisionType,
          rationale: editDecisionForm.rationale.trim() || null,
        }),
      })
      if (res.ok) {
        toast.success('Decision updated')
        setEditDecisionOpen(false)
        setEditDecisionId(null)
        fetchCycle()
      } else {
        const data = await res.json().catch(() => null)
        toast.error(data?.error ?? 'Failed to update decision')
      }
    } catch {
      toast.error('Something went wrong')
    } finally {
      setEditDecisionSaving(false)
    }
  }

  const handleNewLoad = async () => {
    if (!newLoadType || !newLoadTitle.trim()) return
    setCreatingLoad(true)
    try {
      const res = await fetch('/api/study-loads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ learningCycleId: cycleId, loadType: newLoadType, title: newLoadTitle.trim() }),
      })
      if (res.ok) {
        toast.success('Study load created')
        setNewLoadType('')
        setNewLoadTitle('')
        fetchCycle()
      } else {
        const data = await res.json()
        toast.error(data?.error ?? 'Failed to create study load')
      }
    } catch {
      toast.error('Something went wrong')
    } finally {
      setCreatingLoad(false)
    }
  }

  const handleLoadStatus = async (id: string, status: string) => {
    setUpdatingLoad(id)
    try {
      const res = await fetch(`/api/study-loads/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      })
      if (res.ok) {
        toast.success('Study load status updated')
        fetchCycle()
      } else {
        const data = await res.json().catch(() => null)
        toast.error(data?.error ?? 'Failed to update status')
      }
    } catch {
      toast.error('Something went wrong')
    } finally {
      setUpdatingLoad(null)
    }
  }

  const openEditLoad = (ld: CycleDetail['studyLoads'][number]) => {
    setEditId(ld.id)
    setEditForm({
      title: ld.title,
      loadType: ld.loadType,
      releasedAt: ld.releasedAt ? ld.releasedAt.slice(0, 10) : '',
      dueAt: ld.dueAt ? ld.dueAt.slice(0, 10) : '',
    })
    setEditOpen(true)
  }

  const handleDeleteLoad = async (id: string) => {
    try {
      const res = await fetch(`/api/study-loads/${id}`, { method: 'DELETE' })
      if (res.ok) {
        toast.success('Study load deleted')
        fetchCycle()
      } else {
        const data = await res.json().catch(() => null)
        toast.error(data?.error ?? 'Failed to delete study load')
      }
    } catch {
      toast.error('Something went wrong')
    }
  }

  const handleEditLoad = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!editId || !editForm.title.trim() || !editForm.loadType) return
    setEditSaving(true)
    try {
      const res = await fetch(`/api/study-loads/${editId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: editForm.title.trim(),
          loadType: editForm.loadType,
          releasedAt: editForm.releasedAt || null,
          dueAt: editForm.dueAt || null,
        }),
      })
      if (res.ok) {
        toast.success('Study load updated')
        setEditOpen(false)
        setEditId(null)
        fetchCycle()
      } else {
        const data = await res.json().catch(() => null)
        toast.error(data?.error ?? 'Failed to update study load')
      }
    } catch {
      toast.error('Something went wrong')
    } finally {
      setEditSaving(false)
    }
  }

  const openEditEval = (ev: CycleDetail['cycleEvaluations'][number]) => {
    setEditEvalId(ev.id)
    setEditEvalForm({ evaluationType: ev.evaluationType, resultSummary: ev.resultSummary ?? '' })
    setEditEvalOpen(true)
  }

  const handleDeleteEval = async (id: string) => {
    try {
      const res = await fetch(`/api/cycle-evaluations/${id}`, { method: 'DELETE' })
      if (res.ok) {
        toast.success('Evaluation deleted')
        fetchCycle()
      } else {
        const data = await res.json().catch(() => null)
        toast.error(data?.error ?? 'Failed to delete evaluation')
      }
    } catch {
      toast.error('Something went wrong')
    }
  }

  const handleEditEval = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!editEvalId || !editEvalForm.evaluationType) return
    setEditEvalSaving(true)
    try {
      const res = await fetch(`/api/cycle-evaluations/${editEvalId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          evaluationType: editEvalForm.evaluationType,
          resultSummary: editEvalForm.resultSummary.trim() || null,
        }),
      })
      if (res.ok) {
        toast.success('Evaluation updated')
        setEditEvalOpen(false)
        setEditEvalId(null)
        fetchCycle()
      } else {
        const data = await res.json().catch(() => null)
        toast.error(data?.error ?? 'Failed to update evaluation')
      }
    } catch {
      toast.error('Something went wrong')
    } finally {
      setEditEvalSaving(false)
    }
  }

  const handleNewEval = async () => {
    if (!newEvalType) return
    setCreatingEval(true)
    try {
      const res = await fetch('/api/cycle-evaluations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ learningCycleId: cycleId, evaluationType: newEvalType }),
      })
      if (res.ok) {
        toast.success('Evaluation created')
        setNewEvalType('')
        fetchCycle()
      } else {
        const data = await res.json()
        toast.error(data?.error ?? 'Failed to create evaluation')
      }
    } catch {
      toast.error('Something went wrong')
    } finally {
      setCreatingEval(false)
    }
  }

  const fmt = (d: string | null) => {
    if (!d) return '—'
    try { return new Date(d).toLocaleDateString('es-CL', { day: '2-digit', month: 'short', year: 'numeric' }) } catch { return '—' }
  }

  const fmtFull = (d: string | null) => {
    if (!d) return '—'
    try { return new Date(d).toLocaleString('es-CL', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }) } catch { return '—' }
  }

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
      </div>
    )
  }

  if (!cycle) {
    return (
      <div className="text-center py-20 text-muted-foreground">
        <p>Cycle not found.</p>
        <Link href="/admin/learning-cycles" className="text-primary underline mt-2 inline-block">Back to cycles</Link>
      </div>
    )
  }

  const student = cycle.enrollment?.student
  const program = cycle.enrollment?.program

  return (
    <div className="space-y-6">
      {/* Back link */}
      <Link
        href="/admin/learning-cycles"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Learning Cycles
      </Link>

      {/* ── Header Card ── */}
      <Card>
        <CardContent className="py-5">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <RefreshCw className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h1 className="font-display text-xl font-semibold tracking-tight">
                  Cycle {cycle.cycleNumber}
                </h1>
                <p className="text-sm text-muted-foreground mt-0.5">
                  <span className="inline-flex items-center gap-1"><User className="w-3.5 h-3.5" /> {student?.firstName} {student?.lastName}</span>
                  <span className="mx-2">·</span>
                  <span className="inline-flex items-center gap-1"><GraduationCap className="w-3.5 h-3.5" /> {program?.name} <span className="font-mono">({program?.code})</span></span>
                </p>
                <Link
                  href={`/admin/instances/${cycle.enrollmentId}`}
                  className="inline-flex items-center gap-1 text-xs text-primary hover:underline mt-1"
                >
                  View enrollment <ExternalLink className="w-3 h-3" />
                </Link>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {/* Phase EU — Read-only status badge. Generic status mutation
                  via select is removed; lifecycle transitions happen only
                  through the guarded "Cerrar ciclo" and "Autorizar
                  continuidad" buttons below. */}
              <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                cycle.status === 'open'
                  ? 'bg-emerald-100 text-emerald-800'
                  : cycle.status === 'closed'
                    ? 'bg-gray-200 text-gray-700'
                    : 'bg-amber-100 text-amber-800'
              }`}>
                {cycle.status}
              </span>

              {/* Phase DS — "Cerrar ciclo" action.
                  Rendered only when the cycle is still open AND every
                  StudyLoad in the cycle has status='completed'. The button
                  opens a confirmation dialog; confirmation calls the
                  dedicated POST /api/learning-cycles/[id]/close endpoint,
                  which atomically transitions the cycle to 'closed',
                  writes a strictly transcriptive closing CycleSnapshot
                  and advances the enrollment's lastActivityAt. */}
              {cycle.status === 'open' &&
                cycle.studyLoads.length > 0 &&
                cycle.studyLoads.every((l) => l.status === 'completed') && (
                  <Button
                    size="sm"
                    variant="secondary"
                    onClick={() => setCloseOpen(true)}
                    disabled={closing}
                  >
                    <Lock className="w-3.5 h-3.5 mr-1.5" />
                    Cerrar ciclo
                  </Button>
                )}

              {/* Phase DT — "Autorizar continuidad" action.
                  Rendered only when the cycle is already closed AND no
                  ContinuitySignal with signalType='continue' exists for
                  this cycle. The button opens a confirmation dialog;
                  confirmation calls the dedicated POST
                  /api/learning-cycles/[id]/continue endpoint, which
                  atomically emits the continuity signal and advances
                  lastActivityAt. DT does NOT create cycle N+1 — that
                  remains the DL/DN responsibility at POST
                  /api/learning-cycles. */}
              {cycle.status === 'closed' &&
                !cycle.continuitySignals.some((s) => s.signalType === 'continue') && (
                  <Button
                    size="sm"
                    variant="secondary"
                    onClick={() => setContinueOpen(true)}
                    disabled={authorizing}
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 mr-1.5" />
                    Autorizar continuidad
                  </Button>
                )}
            </div>
          </div>

          <div className="mt-4 pt-4 border-t grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
            <div>
              <p className="text-muted-foreground text-xs">Opened</p>
              <p className="font-medium flex items-center gap-1"><Calendar className="w-3.5 h-3.5 text-muted-foreground" /> {fmt(cycle.openedAt)}</p>
            </div>
            <div>
              <p className="text-muted-foreground text-xs">Closed</p>
              <p className="font-medium flex items-center gap-1"><Calendar className="w-3.5 h-3.5 text-muted-foreground" /> {fmt(cycle.closedAt)}</p>
            </div>
            <div>
              <p className="text-muted-foreground text-xs">Enrollment status</p>
              <p className="font-medium">{cycle.enrollment?.status ?? '—'}</p>
            </div>
            <div>
              <p className="text-muted-foreground text-xs">Created</p>
              <p className="font-medium">{fmt(cycle.createdAt)}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Phase DS — Close-cycle confirmation dialog.
          Copy is intentionally phase-bounded: it describes the immediate
          action only and does NOT establish broader reopen-policy doctrine. */}
      <Dialog open={closeOpen} onOpenChange={(o) => { if (!closing) setCloseOpen(o) }}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Cerrar ciclo</DialogTitle>
            <DialogDescription asChild>
              <div className="space-y-2 pt-1 text-sm text-muted-foreground">
                <p>Esta acción cerrará el ciclo actual.</p>
                <p>Confirma solo si todas las cargas de este ciclo ya fueron completadas.</p>
              </div>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setCloseOpen(false)}
              disabled={closing}
            >
              Cancelar
            </Button>
            <Button
              onClick={handleCloseCycle}
              disabled={closing}
            >
              {closing ? (
                <span className="inline-flex items-center gap-2">
                  <Loader2 className="w-3.5 h-3.5 animate-spin" /> Cerrando…
                </span>
              ) : (
                'Cerrar ciclo'
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Phase DT — Continuity authorization dialog.
          Copy is intentionally phase-bounded: it describes the immediate
          action only (emit a continue signal) and does NOT imply cycle
          N+1 is created here — DL/DN still owns that creation path. */}
      <Dialog open={continueOpen} onOpenChange={(o) => { if (!authorizing) setContinueOpen(o) }}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Autorizar continuidad</DialogTitle>
            <DialogDescription asChild>
              <div className="space-y-2 pt-1 text-sm text-muted-foreground">
                <p>Esta acción registrará la autorización para abrir el siguiente ciclo.</p>
              </div>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setContinueOpen(false)}
              disabled={authorizing}
            >
              Cancelar
            </Button>
            <Button
              onClick={handleAuthorizeContinue}
              disabled={authorizing}
            >
              {authorizing ? (
                <span className="inline-flex items-center gap-2">
                  <Loader2 className="w-3.5 h-3.5 animate-spin" /> Autorizando…
                </span>
              ) : (
                'Autorizar'
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* ── Phase ER: Cycle decision operational summary (read-only) ── */}
      {(() => {
        const decisions = cycle.cycleDecisions
        const total = decisions.length
        const advance = decisions.filter((d) => d.decisionType === 'advance').length
        const reinforce = decisions.filter((d) => d.decisionType === 'reinforce').length
        const hold = decisions.filter((d) => d.decisionType === 'hold').length
        const redirect = decisions.filter((d) => d.decisionType === 'redirect').length
        const indicator = total === 0
          ? 'No cycle decisions recorded'
          : 'Cycle has recorded decisions'
        return (
          <Card>
            <CardContent className="py-4">
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2">Operational decision summary</p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-sm">
                <div>
                  <p className="text-muted-foreground text-xs">Total decisions</p>
                  <p className="font-medium">{total}</p>
                </div>
                <div>
                  <p className="text-muted-foreground text-xs">By type</p>
                  <p className="font-medium text-xs">
                    {advance > 0 && <span className="mr-2">advance {advance}</span>}
                    {reinforce > 0 && <span className="mr-2">reinforce {reinforce}</span>}
                    {hold > 0 && <span className="mr-2">hold {hold}</span>}
                    {redirect > 0 && <span className="mr-2">redirect {redirect}</span>}
                    {total === 0 && <span className="text-muted-foreground">—</span>}
                  </p>
                </div>
                <div>
                  <p className="text-muted-foreground text-xs">Indicator</p>
                  <p className={`font-medium text-xs ${total > 0 ? 'text-emerald-700' : 'text-muted-foreground'}`}>
                    {indicator}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )
      })()}

      {/* ── Decisions ── */}
      <section>
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-display text-lg font-semibold tracking-tight flex items-center gap-2">
            <GitBranch className="w-5 h-5 text-primary" /> Decisions
            <span className="text-sm font-normal text-muted-foreground">({cycle.cycleDecisions.length})</span>
          </h2>
          {cycle.status !== 'closed' && (
            <div className="flex items-center gap-2">
              <select
                className="rounded-md border border-input bg-background px-2 py-1 text-xs font-medium"
                value={newDecisionType}
                onChange={(e) => setNewDecisionType(e.target.value)}
              >
                <option value="" disabled>— Type —</option>
                <option value="advance">advance</option>
                <option value="reinforce">reinforce</option>
                <option value="hold">hold</option>
                <option value="redirect">redirect</option>
              </select>
              <Button size="sm" onClick={handleNewDecision} disabled={!newDecisionType || creatingDecision}>
                {creatingDecision ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Plus className="mr-2 h-4 w-4" />}
                New Decision
              </Button>
            </div>
          )}
        </div>
        {cycle.cycleDecisions.length > 0 && (
          <div className="relative mb-3">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search by decision type or rationale…"
              value={cycleDecisionSearch}
              onChange={(e) => setCycleDecisionSearch(e.target.value)}
              className="pl-9"
            />
          </div>
        )}
        {(() => {
          const q = cycleDecisionSearch.trim().toLowerCase()
          const filtered = q
            ? cycle.cycleDecisions.filter((d) =>
                (d.decisionType ?? '').toLowerCase().includes(q) ||
                (d.rationale ?? '').toLowerCase().includes(q)
              )
            : cycle.cycleDecisions

          if (cycle.cycleDecisions.length === 0) {
            return <Card><CardContent className="py-8 text-center text-sm text-muted-foreground">No decisions recorded for this cycle.</CardContent></Card>
          }

          if (q && filtered.length === 0) {
            return (
              <Card>
                <CardContent className="py-8 text-center">
                  <Search className="w-10 h-10 text-muted-foreground/40 mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">No decisions match your search.</p>
                </CardContent>
              </Card>
            )
          }

          return (
            <>
              {q && (
                <p className="text-xs text-muted-foreground mb-2">
                  Showing {filtered.length} of {cycle.cycleDecisions.length}
                </p>
              )}
              <div className="grid gap-2">
                {filtered.map((d) => (
                  <Card key={d.id} className="hover:shadow-sm transition-shadow">
                    <CardContent className="py-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <select
                            value={d.decisionType}
                            onChange={(e) => handleDecisionTypeChange(d.id, e.target.value)}
                            disabled={cycle.status === 'closed' || updatingDecisionType === d.id}
                            className={`text-xs font-semibold rounded-full px-2.5 py-0.5 border-0 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed ${decisionColors[d.decisionType] ?? 'bg-gray-200 text-gray-700'}`}
                          >
                            <option value="advance">advance</option>
                            <option value="reinforce">reinforce</option>
                            <option value="hold">hold</option>
                            <option value="redirect">redirect</option>
                          </select>
                          {d.rationale && <p className="text-sm text-muted-foreground truncate max-w-md">{d.rationale}</p>}
                        </div>
                        <div className="flex items-center gap-3">
                          {cycle.status !== 'closed' && (
                            <>
                              <button onClick={() => openEditDecision(d)} className="p-1.5 rounded-md hover:bg-muted transition-colors" title="Edit">
                                <Pencil className="w-3.5 h-3.5 text-muted-foreground" />
                              </button>
                              <button onClick={() => handleDeleteDecision(d.id)} className="p-1.5 rounded-md hover:bg-muted transition-colors" title="Delete">
                                <Trash2 className="w-3.5 h-3.5 text-destructive" />
                              </button>
                            </>
                          )}
                          <span className="text-xs text-muted-foreground whitespace-nowrap">{fmtFull(d.createdAt)}</span>
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

      {/* ── Edit Decision Dialog ── */}
      <Dialog open={editDecisionOpen} onOpenChange={setEditDecisionOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Decision</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleEditDecision} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="edit-decisionType">Decision Type</Label>
              <select id="edit-decisionType" className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm" value={editDecisionForm.decisionType} onChange={(e) => setEditDecisionForm(f => ({ ...f, decisionType: e.target.value }))}>
                <option value="advance">advance</option>
                <option value="reinforce">reinforce</option>
                <option value="hold">hold</option>
                <option value="redirect">redirect</option>
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-rationale">Rationale</Label>
              <Input id="edit-rationale" value={editDecisionForm.rationale} onChange={(e) => setEditDecisionForm(f => ({ ...f, rationale: e.target.value }))} placeholder="Optional rationale…" />
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <Button type="button" variant="outline" onClick={() => setEditDecisionOpen(false)}>Cancel</Button>
              <Button type="submit" disabled={editDecisionSaving || !editDecisionForm.decisionType}>
                {editDecisionSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Save
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* ── Phase EQ: Study load operational summary (read-only) ── */}
      {(() => {
        const loads = cycle.studyLoads
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
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2">Operational load summary</p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-sm">
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

      {/* ── Study Loads ── */}
      <section>
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-display text-lg font-semibold tracking-tight flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-primary" /> Study Loads
            <span className="text-sm font-normal text-muted-foreground">({cycle.studyLoads.length})</span>
          </h2>
          {cycle.status !== 'closed' && (
            <div className="flex items-center gap-2">
              <select
                className="rounded-md border border-input bg-background px-2 py-1 text-xs font-medium"
                value={newLoadType}
                onChange={(e) => setNewLoadType(e.target.value)}
              >
                <option value="" disabled>— Type —</option>
                <option value="practice">practice</option>
                <option value="reading">reading</option>
                <option value="video">video</option>
                <option value="project">project</option>
                <option value="assessment">assessment</option>
              </select>
              <input
                className="rounded-md border border-input bg-background px-2 py-1 text-xs w-40"
                placeholder="Title…"
                value={newLoadTitle}
                onChange={(e) => setNewLoadTitle(e.target.value)}
              />
              <Button size="sm" onClick={handleNewLoad} disabled={!newLoadType || !newLoadTitle.trim() || creatingLoad}>
                {creatingLoad ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Plus className="mr-2 h-4 w-4" />}
                New Load
              </Button>
            </div>
          )}
        </div>
        {cycle.studyLoads.length > 0 && (
          <div className="relative mb-3">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search by title or load type…"
              value={studyLoadSearch}
              onChange={(e) => setStudyLoadSearch(e.target.value)}
              className="pl-9"
            />
          </div>
        )}
        {(() => {
          const q = studyLoadSearch.trim().toLowerCase()
          const filtered = q
            ? cycle.studyLoads.filter((ld) =>
                (ld.title ?? '').toLowerCase().includes(q) ||
                (ld.loadType ?? '').toLowerCase().includes(q)
              )
            : cycle.studyLoads

          if (cycle.studyLoads.length === 0) {
            return <Card><CardContent className="py-8 text-center text-sm text-muted-foreground">No study loads assigned for this cycle.</CardContent></Card>
          }

          if (q && filtered.length === 0) {
            return (
              <Card>
                <CardContent className="py-8 text-center">
                  <Search className="w-10 h-10 text-muted-foreground/40 mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">No study loads match your search.</p>
                </CardContent>
              </Card>
            )
          }

          return (
            <>
              {q && (
                <p className="text-xs text-muted-foreground mb-2">
                  Showing {filtered.length} of {cycle.studyLoads.length}
                </p>
              )}
              <div className="grid gap-2">
                {filtered.map((ld) => (
                  <Card key={ld.id} className="hover:shadow-sm transition-shadow">
                    <CardContent className="py-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="space-y-1">
                            <p className="text-sm font-medium">{ld.title}</p>
                            <select
                              className="rounded-md border border-input bg-background px-2 py-0.5 text-xs font-medium"
                              value={ld.loadType}
                              disabled={cycle.status === 'closed' || updatingLoadType === ld.id}
                              onChange={(e) => handleLoadTypeChange(ld.id, e.target.value)}
                            >
                              {ld.loadType && !CANONICAL_LOAD_TYPES.has(ld.loadType) && (
                                <option value={ld.loadType}>{ld.loadType} (legacy)</option>
                              )}
                              <option value="practice">practice</option>
                              <option value="reading">reading</option>
                              <option value="video">video</option>
                              <option value="project">project</option>
                              <option value="assessment">assessment</option>
                            </select>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          {cycle.status !== 'closed' && (
                            <>
                              <button onClick={() => openEditLoad(ld)} className="p-1.5 rounded-md hover:bg-muted transition-colors" title="Edit">
                                <Pencil className="w-3.5 h-3.5 text-muted-foreground" />
                              </button>
                              <button onClick={() => handleDeleteLoad(ld.id)} className="p-1.5 rounded-md hover:bg-muted transition-colors" title="Delete">
                                <Trash2 className="w-3.5 h-3.5 text-destructive" />
                              </button>
                            </>
                          )}
                          <select
                            className="rounded-md border border-input bg-background px-2 py-1 text-xs font-medium"
                            value={ld.status}
                            disabled={cycle.status === 'closed' || updatingLoad === ld.id}
                            onChange={(e) => handleLoadStatus(ld.id, e.target.value)}
                          >
                            <option value="pending">pending</option>
                            <option value="released">released</option>
                            <option value="in_progress">in_progress</option>
                            <option value="completed">completed</option>
                          </select>
                          <div className="text-xs text-muted-foreground text-right space-y-0.5">
                            {ld.releasedAt && <p>Released: {fmt(ld.releasedAt)}</p>}
                            {ld.dueAt && <p>Due: {fmt(ld.dueAt)}</p>}
                            <p>{fmtFull(ld.createdAt)}</p>
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

      {/* ── Edit Study Load Dialog ── */}
      <Dialog open={editOpen} onOpenChange={setEditOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Study Load</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleEditLoad} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="edit-title">Title</Label>
              <Input id="edit-title" value={editForm.title} onChange={(e) => setEditForm(f => ({ ...f, title: e.target.value }))} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-loadType">Load Type</Label>
              <select id="edit-loadType" className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm" value={editForm.loadType} onChange={(e) => setEditForm(f => ({ ...f, loadType: e.target.value }))}>
                {editForm.loadType && !CANONICAL_LOAD_TYPES.has(editForm.loadType) && (
                  <option value={editForm.loadType}>{editForm.loadType} (legacy)</option>
                )}
                <option value="practice">practice</option>
                <option value="reading">reading</option>
                <option value="video">video</option>
                <option value="project">project</option>
                <option value="assessment">assessment</option>
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-releasedAt">Released At</Label>
              <Input id="edit-releasedAt" type="date" value={editForm.releasedAt} onChange={(e) => setEditForm(f => ({ ...f, releasedAt: e.target.value }))} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-dueAt">Due At</Label>
              <Input id="edit-dueAt" type="date" value={editForm.dueAt} onChange={(e) => setEditForm(f => ({ ...f, dueAt: e.target.value }))} />
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <Button type="button" variant="outline" onClick={() => setEditOpen(false)}>Cancel</Button>
              <Button type="submit" disabled={editSaving || !editForm.title.trim()}>
                {editSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Save
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* ── Phase ES: Cycle evaluation operational summary (read-only) ── */}
      {(() => {
        const evals = cycle.cycleEvaluations
        const total = evals.length
        const diagnostic = evals.filter((e) => e.evaluationType === 'diagnostic').length
        const progressCheck = evals.filter((e) => e.evaluationType === 'progress_check').length
        const cycleClose = evals.filter((e) => e.evaluationType === 'cycle_close').length
        const indicator = total === 0
          ? 'No cycle evaluations recorded'
          : 'Cycle has recorded evaluations'
        return (
          <Card>
            <CardContent className="py-4">
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2">Operational evaluation summary</p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-sm">
                <div>
                  <p className="text-muted-foreground text-xs">Total evaluations</p>
                  <p className="font-medium">{total}</p>
                </div>
                <div>
                  <p className="text-muted-foreground text-xs">By type</p>
                  <p className="font-medium text-xs">
                    {diagnostic > 0 && <span className="mr-2">diagnostic {diagnostic}</span>}
                    {progressCheck > 0 && <span className="mr-2">progress_check {progressCheck}</span>}
                    {cycleClose > 0 && <span className="mr-2">cycle_close {cycleClose}</span>}
                    {total === 0 && <span className="text-muted-foreground">—</span>}
                  </p>
                </div>
                <div>
                  <p className="text-muted-foreground text-xs">Indicator</p>
                  <p className={`font-medium text-xs ${total > 0 ? 'text-emerald-700' : 'text-muted-foreground'}`}>
                    {indicator}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )
      })()}

      {/* ── Evaluations ── */}
      <section>
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-display text-lg font-semibold tracking-tight flex items-center gap-2">
            <ClipboardCheck className="w-5 h-5 text-primary" /> Evaluations
            <span className="text-sm font-normal text-muted-foreground">({cycle.cycleEvaluations.length})</span>
          </h2>
          {cycle.status !== 'closed' && (
            <div className="flex items-center gap-2">
              <select
                className="rounded-md border border-input bg-background px-2 py-1 text-xs font-medium"
                value={newEvalType}
                onChange={(e) => setNewEvalType(e.target.value)}
              >
                <option value="" disabled>— Type —</option>
                <option value="diagnostic">diagnostic</option>
                <option value="progress_check">progress check</option>
                <option value="cycle_close">cycle close</option>
              </select>
              <Button size="sm" onClick={handleNewEval} disabled={!newEvalType || creatingEval}>
                {creatingEval ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Plus className="mr-2 h-4 w-4" />}
                New Evaluation
              </Button>
            </div>
          )}
        </div>
        {cycle.cycleEvaluations.length > 0 && (
          <div className="relative mb-3">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search by evaluation type or result summary…"
              value={cycleEvaluationSearch}
              onChange={(e) => setCycleEvaluationSearch(e.target.value)}
              className="pl-9"
            />
          </div>
        )}
        {(() => {
          const q = cycleEvaluationSearch.trim().toLowerCase()
          const filtered = q
            ? cycle.cycleEvaluations.filter((ev) =>
                (ev.evaluationType ?? '').toLowerCase().includes(q) ||
                (ev.resultSummary ?? '').toLowerCase().includes(q)
              )
            : cycle.cycleEvaluations

          if (cycle.cycleEvaluations.length === 0) {
            return <Card><CardContent className="py-8 text-center text-sm text-muted-foreground">No evaluations recorded for this cycle.</CardContent></Card>
          }

          if (q && filtered.length === 0) {
            return (
              <Card>
                <CardContent className="py-8 text-center">
                  <Search className="w-10 h-10 text-muted-foreground/40 mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">No evaluations match your search.</p>
                </CardContent>
              </Card>
            )
          }

          return (
            <>
              {q && (
                <p className="text-xs text-muted-foreground mb-2">
                  Showing {filtered.length} of {cycle.cycleEvaluations.length}
                </p>
              )}
              <div className="grid gap-2">
                {filtered.map((ev) => (
                  <Card key={ev.id} className="hover:shadow-sm transition-shadow">
                    <CardContent className="py-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <select
                            value={ev.evaluationType}
                            onChange={(e) => handleEvalTypeChange(ev.id, e.target.value)}
                            disabled={cycle.status === 'closed' || updatingEvalType === ev.id}
                            className={`text-xs font-semibold rounded-full px-2.5 py-0.5 border-0 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed ${evalColors[ev.evaluationType] ?? 'bg-gray-200 text-gray-700'}`}
                          >
                            <option value="diagnostic">diagnostic</option>
                            <option value="progress_check">progress check</option>
                            <option value="cycle_close">cycle close</option>
                          </select>
                          {ev.resultSummary && <p className="text-sm text-muted-foreground truncate max-w-md">{ev.resultSummary}</p>}
                        </div>
                        <div className="flex items-center gap-3">
                          {cycle.status !== 'closed' && (
                            <>
                              <button onClick={() => openEditEval(ev)} className="p-1.5 rounded-md hover:bg-muted transition-colors" title="Edit">
                                <Pencil className="w-3.5 h-3.5 text-muted-foreground" />
                              </button>
                              <button onClick={() => handleDeleteEval(ev.id)} className="p-1.5 rounded-md hover:bg-muted transition-colors" title="Delete">
                                <Trash2 className="w-3.5 h-3.5 text-destructive" />
                              </button>
                            </>
                          )}
                          <span className="text-xs text-muted-foreground whitespace-nowrap">{fmtFull(ev.createdAt)}</span>
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

      {/* ── Edit Evaluation Dialog ── */}
      <Dialog open={editEvalOpen} onOpenChange={setEditEvalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Evaluation</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleEditEval} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="edit-evaluationType">Evaluation Type</Label>
              <select id="edit-evaluationType" className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm" value={editEvalForm.evaluationType} onChange={(e) => setEditEvalForm(f => ({ ...f, evaluationType: e.target.value }))}>
                <option value="diagnostic">diagnostic</option>
                <option value="progress_check">progress check</option>
                <option value="cycle_close">cycle close</option>
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-resultSummary">Result Summary</Label>
              <Input id="edit-resultSummary" value={editEvalForm.resultSummary} onChange={(e) => setEditEvalForm(f => ({ ...f, resultSummary: e.target.value }))} placeholder="Optional result summary…" />
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <Button type="button" variant="outline" onClick={() => setEditEvalOpen(false)}>Cancel</Button>
              <Button type="submit" disabled={editEvalSaving || !editEvalForm.evaluationType}>
                {editEvalSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Save
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}
