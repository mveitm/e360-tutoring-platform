'use client'

import { useState, useEffect, useCallback } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent } from '@/components/ui/card'

import { GitBranch, Plus, Loader2, Pencil, Trash2, Search } from 'lucide-react'
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

interface CycleDecision {
  id: string
  learningCycleId: string
  decisionType: string
  rationale: string | null
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
  student: { firstName: string; lastName: string }
  program: { code: string }
}

export function CycleDecisionsView() {
  const [decisions, setDecisions] = useState<CycleDecision[]>([])
  const [cycles, setCycles] = useState<CycleOption[]>([])
  const [enrollments, setEnrollments] = useState<EnrollmentOption[]>([])
  const [filterEnrollment, setFilterEnrollment] = useState('')
  const [search, setSearch] = useState('')
  const [updatingDecisionType, setUpdatingDecisionType] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [open, setOpen] = useState(false)
  const [saving, setSaving] = useState(false)
  const [form, setForm] = useState({ learningCycleId: '', decisionType: 'advance', rationale: '' })

  // Edit state
  const [editOpen, setEditOpen] = useState(false)
  const [editId, setEditId] = useState<string | null>(null)
  const [editForm, setEditForm] = useState({ decisionType: '', rationale: '' })
  const [editSaving, setEditSaving] = useState(false)

  const fetchData = useCallback(async () => {
    try {
      const [dRes, cRes, eRes] = await Promise.all([
        fetch('/api/cycle-decisions'),
        fetch('/api/learning-cycles'),
        fetch('/api/instances'),
      ])
      if (eRes.ok) setEnrollments((await eRes.json()) ?? [])
      if (dRes.ok) setDecisions((await dRes.json()) ?? [])
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
    if (!form.learningCycleId || !form.decisionType) {
      toast.error('Cycle and decision type are required')
      return
    }
    setSaving(true)
    try {
      const res = await fetch('/api/cycle-decisions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, rationale: form.rationale || undefined }),
      })
      const data = await res.json()
      if (!res.ok) {
        toast.error(data?.error ?? 'Failed to create decision')
      } else {
        toast.success('Cycle decision created')
        setForm({ learningCycleId: '', decisionType: 'advance', rationale: '' })
        setOpen(false)
        fetchData()
      }
    } catch {
      toast.error('Something went wrong')
    } finally {
      setSaving(false)
    }
  }

  const openEdit = (dec: CycleDecision) => {
    setEditId(dec.id)
    setEditForm({ decisionType: dec.decisionType, rationale: dec.rationale ?? '' })
    setEditOpen(true)
  }

  const handleEdit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!editId) return
    setEditSaving(true)
    try {
      const res = await fetch(`/api/cycle-decisions/${editId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editForm),
      })
      const data = await res.json()
      if (!res.ok) {
        toast.error(data?.error ?? 'Failed to update decision')
      } else {
        toast.success('Decision updated')
        setEditOpen(false)
        fetchData()
      }
    } catch {
      toast.error('Something went wrong')
    } finally {
      setEditSaving(false)
    }
  }

  const handleDelete = async (dec: CycleDecision) => {
    if (!window.confirm(`Delete this ${dec.decisionType} decision?`)) return
    try {
      const res = await fetch(`/api/cycle-decisions/${dec.id}`, { method: 'DELETE' })
      const data = await res.json()
      if (!res.ok) {
        toast.error(data?.error ?? 'Failed to delete')
      } else {
        toast.success('Decision deleted')
        fetchData()
      }
    } catch {
      toast.error('Something went wrong')
    }
  }

  const isClosed = (dec: CycleDecision) => dec.learningCycle?.status === 'closed'

  const handleDecisionTypeChange = async (decisionId: string, newType: string) => {
    setUpdatingDecisionType(decisionId)
    try {
      const res = await fetch(`/api/cycle-decisions/${decisionId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ decisionType: newType }),
      })
      if (res.ok) {
        toast.success('Decision updated')
        fetchData()
      } else {
        const data = await res.json().catch(() => null)
        toast.error(data?.error ?? 'Failed to update decision type')
      }
    } catch {
      toast.error('Something went wrong')
    } finally {
      setUpdatingDecisionType(null)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-semibold tracking-tight flex items-center gap-2">
            <GitBranch className="w-6 h-6 text-primary" /> Cycle Decisions
          </h1>
          <p className="text-muted-foreground text-sm mt-1">Decisions registered per learning cycle</p>
        </div>
        <div className="flex items-center gap-3">
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
            <Button className="gap-2"><Plus className="w-4 h-4" /> New Decision</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>New Cycle Decision</DialogTitle>
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
                  {cycles.map((cy) => (
                    <option key={cy.id} value={cy.id}>
                      Cycle {cy.cycleNumber} — {cy.enrollment?.student?.firstName ?? ''} {cy.enrollment?.student?.lastName ?? ''} ({cy.enrollment?.program?.code ?? ''})
                    </option>
                  ))}
                </select>
              </div>
              <div className="space-y-2">
                <Label>Decision Type</Label>
                <select className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm" value={form.decisionType} onChange={(e) => setForm({ ...form, decisionType: e.target.value })}>
                  <option value="advance">Advance</option>
                  <option value="reinforce">Reinforce</option>
                  <option value="hold">Hold</option>
                  <option value="redirect">Redirect</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label>Rationale <span className="text-muted-foreground text-xs">(optional)</span></Label>
                <Input placeholder="Brief reasoning for this decision" value={form.rationale} onChange={(e) => setForm({ ...form, rationale: e.target.value })} />
              </div>
              <Button type="submit" className="w-full" disabled={saving}>
                {saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Create Decision
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
            <DialogTitle>Edit Decision</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleEdit} className="space-y-4">
            <div className="space-y-2">
              <Label>Decision Type</Label>
              <select className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm" value={editForm.decisionType} onChange={(e) => setEditForm({ ...editForm, decisionType: e.target.value })}>
                <option value="advance">Advance</option>
                <option value="reinforce">Reinforce</option>
                <option value="hold">Hold</option>
                <option value="redirect">Redirect</option>
              </select>
            </div>
            <div className="space-y-2">
              <Label>Rationale <span className="text-muted-foreground text-xs">(optional)</span></Label>
              <Input placeholder="Brief reasoning" value={editForm.rationale} onChange={(e) => setEditForm({ ...editForm, rationale: e.target.value })} />
            </div>
            <Button type="submit" className="w-full" disabled={editSaving}>
              {editSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Save Changes
            </Button>
          </form>
        </DialogContent>
      </Dialog>

      {!loading && (decisions?.length ?? 0) > 0 && (
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search by decision type or rationale…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
      )}

      {(() => {
        const enrollmentFiltered = decisions.filter((dec) => !filterEnrollment || dec.learningCycle?.enrollment?.id === filterEnrollment)
        const q = search.trim().toLowerCase()
        const filtered = q
          ? enrollmentFiltered.filter((dec) =>
              dec.decisionType.toLowerCase().includes(q) ||
              (dec.rationale ?? '').toLowerCase().includes(q)
            )
          : enrollmentFiltered

        if (loading) {
          return <div className="flex justify-center py-12"><Loader2 className="w-6 h-6 animate-spin text-muted-foreground" /></div>
        }

        if ((decisions?.length ?? 0) === 0) {
          return (
            <Card>
              <CardContent className="py-12 text-center">
                <GitBranch className="w-12 h-12 text-muted-foreground/40 mx-auto mb-3" />
                <p className="text-muted-foreground">No cycle decisions yet. Create one to register a decision for a learning cycle.</p>
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
            {filtered.length === 0 ? (
              <Card>
                <CardContent className="py-12 text-center">
                  <Search className="w-12 h-12 text-muted-foreground/40 mx-auto mb-3" />
                  <p className="text-muted-foreground">No cycle decisions match your search.</p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-3">
                {filtered.map((dec) => (
                  <Card key={dec.id} className="hover:shadow-md transition-shadow" style={{ boxShadow: 'var(--shadow-sm)' }}>
                    <CardContent className="py-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                            <GitBranch className="w-5 h-5 text-primary" />
                          </div>
                          <div>
                            <p className="font-medium">
                              Cycle {dec.learningCycle?.cycleNumber ?? '?'}
                              <span className="mx-2 text-muted-foreground">·</span>
                              {dec.learningCycle?.enrollment?.student?.firstName ?? ''} {dec.learningCycle?.enrollment?.student?.lastName ?? ''}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              {dec.learningCycle?.enrollment?.program?.name ?? ''}
                              <span className="font-mono ml-1">({dec.learningCycle?.enrollment?.program?.code ?? ''})</span>
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <select
                            className="rounded-md border border-input bg-background px-2 py-1 text-xs font-medium"
                            value={dec.decisionType}
                            disabled={isClosed(dec) || updatingDecisionType === dec.id}
                            onChange={(e) => handleDecisionTypeChange(dec.id, e.target.value)}
                          >
                            <option value="advance">advance</option>
                            <option value="reinforce">reinforce</option>
                            <option value="hold">hold</option>
                            <option value="redirect">redirect</option>
                          </select>
                          {!isClosed(dec) && (
                            <>
                              <button onClick={() => openEdit(dec)} className="p-1.5 rounded-md hover:bg-muted transition-colors" title="Edit">
                                <Pencil className="w-3.5 h-3.5 text-muted-foreground" />
                              </button>
                              <button onClick={() => handleDelete(dec)} className="p-1.5 rounded-md hover:bg-destructive/10 transition-colors" title="Delete">
                                <Trash2 className="w-3.5 h-3.5 text-destructive" />
                              </button>
                            </>
                          )}
                        </div>
                      </div>
                      {dec.rationale && (
                        <div className="mt-3 pt-3 border-t text-xs text-muted-foreground">
                          <span className="font-medium">Rationale:</span> {dec.rationale}
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