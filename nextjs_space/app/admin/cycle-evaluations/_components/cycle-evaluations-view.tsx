'use client'

import { useState, useEffect, useCallback } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent } from '@/components/ui/card'
import { ClipboardCheck, Plus, Loader2, Pencil, Trash2, Search } from 'lucide-react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { toast } from 'sonner'

interface CycleOption {
  id: string
  cycleNumber: number
  status: string
  enrollment?: {
    id: string
    student: { firstName: string; lastName: string }
    program: { code: string; name: string }
  }
}

interface CycleEvaluation {
  id: string
  learningCycleId: string
  evaluationType: string
  resultSummary: string | null
  createdAt: string
  learningCycle?: {
    id: string
    cycleNumber: number
    status: string
    enrollment?: {
      id: string
      student: { firstName: string; lastName: string }
      program: { code: string; name: string }
    }
  }
}

interface EnrollmentOption {
  id: string
  label: string
  student: { firstName: string; lastName: string }
  program: { code: string }
}

export function CycleEvaluationsView() {
  const [evaluations, setEvaluations] = useState<CycleEvaluation[]>([])
  const [cycles, setCycles] = useState<CycleOption[]>([])
  const [enrollments, setEnrollments] = useState<EnrollmentOption[]>([])
  const [filterEnrollment, setFilterEnrollment] = useState('')
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)
  const [open, setOpen] = useState(false)
  const [saving, setSaving] = useState(false)
  const [form, setForm] = useState({ learningCycleId: '', evaluationType: 'progress_check', resultSummary: '' })

  // Inline eval type update state
  const [updatingEvalType, setUpdatingEvalType] = useState<string | null>(null)

  // Edit state
  const [editOpen, setEditOpen] = useState(false)
  const [editId, setEditId] = useState<string | null>(null)
  const [editForm, setEditForm] = useState({ evaluationType: '', resultSummary: '' })
  const [editSaving, setEditSaving] = useState(false)

  const fetchData = useCallback(async () => {
    try {
      const [eRes, cRes, enRes] = await Promise.all([
        fetch('/api/cycle-evaluations'),
        fetch('/api/learning-cycles'),
        fetch('/api/instances'),
      ])
      if (enRes.ok) {
        const enData: any[] = (await enRes.json()) ?? []
        setEnrollments(enData.map((e: any) => ({ ...e, label: `${e.student?.firstName ?? ''} ${e.student?.lastName ?? ''} — ${e.program?.code ?? ''}` })))
      }
      if (eRes.ok) setEvaluations((await eRes.json()) ?? [])
      if (cRes.ok) setCycles((await cRes.json()) ?? [])
    } catch (err: any) {
      console.error('Failed to fetch data', err)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { fetchData() }, [fetchData])

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.learningCycleId || !form.evaluationType) {
      toast.error('Cycle and evaluation type are required')
      return
    }
    setSaving(true)
    try {
      const res = await fetch('/api/cycle-evaluations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, resultSummary: form.resultSummary || undefined }),
      })
      const data = await res.json()
      if (!res.ok) {
        toast.error(data?.error ?? 'Failed to create evaluation')
      } else {
        toast.success('Cycle evaluation created')
        setForm({ learningCycleId: '', evaluationType: 'progress_check', resultSummary: '' })
        setOpen(false)
        fetchData()
      }
    } catch {
      toast.error('Something went wrong')
    } finally {
      setSaving(false)
    }
  }

  const openEdit = (ev: CycleEvaluation) => {
    setEditId(ev.id)
    setEditForm({ evaluationType: ev.evaluationType, resultSummary: ev.resultSummary ?? '' })
    setEditOpen(true)
  }

  const handleEdit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!editId) return
    setEditSaving(true)
    try {
      const res = await fetch(`/api/cycle-evaluations/${editId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editForm),
      })
      const data = await res.json()
      if (!res.ok) {
        toast.error(data?.error ?? 'Failed to update evaluation')
      } else {
        toast.success('Evaluation updated')
        setEditOpen(false)
        fetchData()
      }
    } catch {
      toast.error('Something went wrong')
    } finally {
      setEditSaving(false)
    }
  }

  const handleDelete = async (ev: CycleEvaluation) => {
    if (!window.confirm(`Delete this ${ev.evaluationType.replace(/_/g, ' ')} evaluation?`)) return
    try {
      const res = await fetch(`/api/cycle-evaluations/${ev.id}`, { method: 'DELETE' })
      const data = await res.json()
      if (!res.ok) {
        toast.error(data?.error ?? 'Failed to delete')
      } else {
        toast.success('Evaluation deleted')
        fetchData()
      }
    } catch {
      toast.error('Something went wrong')
    }
  }

  const handleEvalTypeChange = async (evId: string, newType: string) => {
    setUpdatingEvalType(evId)
    try {
      const res = await fetch(`/api/cycle-evaluations/${evId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ evaluationType: newType }),
      })
      const data = await res.json()
      if (!res.ok) {
        toast.error(data?.error ?? 'Failed to update evaluation type')
      } else {
        toast.success('Evaluation updated')
        fetchData()
      }
    } catch {
      toast.error('Something went wrong')
    } finally {
      setUpdatingEvalType(null)
    }
  }

  const isClosed = (ev: CycleEvaluation) => ev.learningCycle?.status === 'closed'

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-semibold tracking-tight flex items-center gap-2">
            <ClipboardCheck className="w-6 h-6 text-primary" /> Cycle Evaluations
          </h1>
          <p className="text-muted-foreground text-sm mt-1">Evaluation records per learning cycle</p>
        </div>
        <div className="flex items-center gap-3">
          <select
            className="rounded-md border border-input bg-background px-3 py-2 text-sm"
            value={filterEnrollment}
            onChange={(e) => setFilterEnrollment(e.target.value)}
          >
            <option value="">All enrollments</option>
            {enrollments.map((en) => (
              <option key={en.id} value={en.id}>{en.label}</option>
            ))}
          </select>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2"><Plus className="w-4 h-4" /> New Evaluation</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>New Cycle Evaluation</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleCreate} className="space-y-4">
              <div className="space-y-2">
                <Label>Learning Cycle</Label>
                <select
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  value={form.learningCycleId}
                  onChange={(e) => setForm({ ...form, learningCycleId: e.target.value })}
                  required
                >
                  <option value="">Select a cycle...</option>
                  {cycles.filter((cy) => cy.status !== 'closed').map((cy) => (
                    <option key={cy.id} value={cy.id}>
                      Cycle {cy.cycleNumber} — {cy.enrollment?.student?.firstName ?? ''} {cy.enrollment?.student?.lastName ?? ''} ({cy.enrollment?.program?.code ?? ''})
                    </option>
                  ))}
                </select>
              </div>
              <div className="space-y-2">
                <Label>Evaluation Type</Label>
                <select className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm" value={form.evaluationType} onChange={(e) => setForm({ ...form, evaluationType: e.target.value })}>
                  <option value="diagnostic">Diagnostic</option>
                  <option value="progress_check">Progress Check</option>
                  <option value="cycle_close">Cycle Close</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label>Result Summary <span className="text-muted-foreground text-xs">(optional)</span></Label>
                <Input placeholder="Brief summary of the evaluation result" value={form.resultSummary} onChange={(e) => setForm({ ...form, resultSummary: e.target.value })} />
              </div>
              <Button type="submit" className="w-full" disabled={saving}>
                {saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Create Evaluation
              </Button>
            </form>
          </DialogContent>
        </Dialog>
        </div>
      </div>

      {/* Edit Dialog */}
      <Dialog open={editOpen} onOpenChange={setEditOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Evaluation</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleEdit} className="space-y-4">
            <div className="space-y-2">
              <Label>Evaluation Type</Label>
              <select className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm" value={editForm.evaluationType} onChange={(e) => setEditForm({ ...editForm, evaluationType: e.target.value })}>
                <option value="diagnostic">Diagnostic</option>
                <option value="progress_check">Progress Check</option>
                <option value="cycle_close">Cycle Close</option>
              </select>
            </div>
            <div className="space-y-2">
              <Label>Result Summary <span className="text-muted-foreground text-xs">(optional)</span></Label>
              <Input placeholder="Brief summary" value={editForm.resultSummary} onChange={(e) => setEditForm({ ...editForm, resultSummary: e.target.value })} />
            </div>
            <Button type="submit" className="w-full" disabled={editSaving}>
              {editSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Save Changes
            </Button>
          </form>
        </DialogContent>
      </Dialog>

      {!loading && (evaluations?.length ?? 0) > 0 && (
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search by evaluation type or result summary…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
      )}

      {(() => {
        const enrollmentFiltered = evaluations.filter((ev) => !filterEnrollment || ev.learningCycle?.enrollment?.id === filterEnrollment)
        const q = search.trim().toLowerCase()
        const filtered = q
          ? enrollmentFiltered.filter((ev) =>
              ev.evaluationType.toLowerCase().includes(q) ||
              (ev.resultSummary ?? '').toLowerCase().includes(q)
            )
          : enrollmentFiltered

        if (loading) {
          return <div className="flex justify-center py-12"><Loader2 className="w-6 h-6 animate-spin text-muted-foreground" /></div>
        }

        if ((evaluations?.length ?? 0) === 0) {
          return (
            <Card>
              <CardContent className="py-12 text-center">
                <ClipboardCheck className="w-12 h-12 text-muted-foreground/40 mx-auto mb-3" />
                <p className="text-muted-foreground">No cycle evaluations yet. Create one to record an evaluation for a learning cycle.</p>
              </CardContent>
            </Card>
          )
        }

        return (
          <>
            {q && (
              <p className="text-sm text-muted-foreground">
                Showing {filtered.length} of {enrollmentFiltered.length}
              </p>
            )}
            {q && filtered.length === 0 ? (
              <Card>
                <CardContent className="py-12 text-center">
                  <Search className="w-12 h-12 text-muted-foreground/40 mx-auto mb-3" />
                  <p className="text-muted-foreground">No cycle evaluations match your search.</p>
                </CardContent>
              </Card>
            ) : !q && filterEnrollment && enrollmentFiltered.length === 0 ? (
              <Card>
                <CardContent className="py-12 text-center">
                  <ClipboardCheck className="w-12 h-12 text-muted-foreground/40 mx-auto mb-3" />
                  <p className="text-muted-foreground">No cycle evaluations for this enrollment.</p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-3">
                {filtered.map((ev) => (
                  <Card key={ev.id} className="hover:shadow-md transition-shadow" style={{ boxShadow: 'var(--shadow-sm)' }}>
                    <CardContent className="py-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                            <ClipboardCheck className="w-5 h-5 text-primary" />
                          </div>
                          <div>
                            <p className="font-medium">
                              Cycle {ev.learningCycle?.cycleNumber ?? '?'}
                              <span className="mx-2 text-muted-foreground">·</span>
                              {ev.learningCycle?.enrollment?.student?.firstName ?? ''} {ev.learningCycle?.enrollment?.student?.lastName ?? ''}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              {ev.learningCycle?.enrollment?.program?.name ?? ''}
                              <span className="font-mono ml-1">({ev.learningCycle?.enrollment?.program?.code ?? ''})</span>
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <select
                            className="rounded-md border border-input bg-background px-2 py-1 text-xs"
                            value={ev.evaluationType}
                            disabled={isClosed(ev) || updatingEvalType === ev.id}
                            onChange={(e) => handleEvalTypeChange(ev.id, e.target.value)}
                          >
                            <option value="diagnostic">diagnostic</option>
                            <option value="progress_check">progress check</option>
                            <option value="cycle_close">cycle close</option>
                          </select>
                          {!isClosed(ev) && (
                            <>
                              <button onClick={() => openEdit(ev)} className="p-1.5 rounded-md hover:bg-muted transition-colors" title="Edit">
                                <Pencil className="w-3.5 h-3.5 text-muted-foreground" />
                              </button>
                              <button onClick={() => handleDelete(ev)} className="p-1.5 rounded-md hover:bg-destructive/10 transition-colors" title="Delete">
                                <Trash2 className="w-3.5 h-3.5 text-destructive" />
                              </button>
                            </>
                          )}
                        </div>
                      </div>
                      {ev.resultSummary && (
                        <div className="mt-3 pt-3 border-t text-xs text-muted-foreground">
                          <span className="font-medium">Result:</span> {ev.resultSummary}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </>
        )
      })()}
    </div>
  )
}
