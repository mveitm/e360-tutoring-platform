'use client'

import { useState, useEffect, useCallback } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent } from '@/components/ui/card'
import { FileBox, Plus, Loader2, Pencil, Trash2, Search } from 'lucide-react'
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

interface StudyLoad {
  id: string
  learningCycleId: string
  loadType: string
  title: string
  status: string
  releasedAt: string | null
  dueAt: string | null
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

const CANONICAL_LOAD_TYPES = new Set(['practice', 'reading', 'video', 'project', 'assessment'])

const toLocalDatetime = (d: string | null) => {
  if (!d) return ''
  try {
    const dt = new Date(d)
    const offset = dt.getTimezoneOffset()
    const local = new Date(dt.getTime() - offset * 60000)
    return local.toISOString().slice(0, 16)
  } catch { return '' }
}

export function StudyLoadsView() {
  const [loads, setLoads] = useState<StudyLoad[]>([])
  const [cycles, setCycles] = useState<CycleOption[]>([])
  const [enrollments, setEnrollments] = useState<EnrollmentOption[]>([])
  const [filterEnrollment, setFilterEnrollment] = useState('')
  const [loading, setLoading] = useState(true)
  const [open, setOpen] = useState(false)
  const [saving, setSaving] = useState(false)
  const [updating, setUpdating] = useState<string | null>(null)
  const [updatingLoadType, setUpdatingLoadType] = useState<string | null>(null)
  const [form, setForm] = useState({ learningCycleId: '', loadType: 'practice', title: '', status: 'pending', releasedAt: '', dueAt: '' })

  // Edit state
  const [editOpen, setEditOpen] = useState(false)
  const [editId, setEditId] = useState<string | null>(null)
  const [editForm, setEditForm] = useState({ title: '', loadType: '', releasedAt: '', dueAt: '' })
  const [editSaving, setEditSaving] = useState(false)
  const [search, setSearch] = useState('')

  const fetchData = useCallback(async () => {
    try {
      const [lRes, cRes, eRes] = await Promise.all([
        fetch('/api/study-loads'),
        fetch('/api/learning-cycles'),
        fetch('/api/instances'),
      ])
      if (eRes.ok) setEnrollments((await eRes.json()) ?? [])
      if (lRes.ok) setLoads((await lRes.json()) ?? [])
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
    if (!form.learningCycleId || !form.loadType || !form.title) {
      toast.error('Cycle, load type, and title are required')
      return
    }
    setSaving(true)
    try {
      const res = await fetch('/api/study-loads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          releasedAt: form.releasedAt || undefined,
          dueAt: form.dueAt || undefined,
        }),
      })
      const data = await res.json()
      if (!res.ok) {
        toast.error(data?.error ?? 'Failed to create study load')
      } else {
        toast.success('Study load created')
        setForm({ learningCycleId: '', loadType: 'practice', title: '', status: 'pending', releasedAt: '', dueAt: '' })
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
      const res = await fetch(`/api/study-loads/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      })
      if (res.ok) {
        toast.success('Study load updated')
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

  const openEdit = (ld: StudyLoad) => {
    setEditId(ld.id)
    setEditForm({
      title: ld.title,
      loadType: ld.loadType,
      releasedAt: toLocalDatetime(ld.releasedAt),
      dueAt: toLocalDatetime(ld.dueAt),
    })
    setEditOpen(true)
  }

  const handleEdit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!editId) return
    setEditSaving(true)
    try {
      const res = await fetch(`/api/study-loads/${editId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: editForm.title,
          loadType: editForm.loadType,
          releasedAt: editForm.releasedAt || null,
          dueAt: editForm.dueAt || null,
        }),
      })
      const data = await res.json()
      if (!res.ok) {
        toast.error(data?.error ?? 'Failed to update load')
      } else {
        toast.success('Study load updated')
        setEditOpen(false)
        fetchData()
      }
    } catch {
      toast.error('Something went wrong')
    } finally {
      setEditSaving(false)
    }
  }

  const handleDelete = async (ld: StudyLoad) => {
    if (!window.confirm(`Delete study load "${ld.title}"?`)) return
    try {
      const res = await fetch(`/api/study-loads/${ld.id}`, { method: 'DELETE' })
      const data = await res.json()
      if (!res.ok) {
        toast.error(data?.error ?? 'Failed to delete')
      } else {
        toast.success('Study load deleted')
        fetchData()
      }
    } catch {
      toast.error('Something went wrong')
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
      const data = await res.json()
      if (!res.ok) {
        toast.error(data?.error ?? 'Failed to update load type')
      } else {
        toast.success('Study load updated')
        fetchData()
      }
    } catch {
      toast.error('Something went wrong')
    } finally {
      setUpdatingLoadType(null)
    }
  }

  const isClosed = (ld: StudyLoad) => ld.learningCycle?.status === 'closed'

  const formatDate = (d: string | null) => {
    if (!d) return '—'
    try { return new Date(d).toLocaleDateString() } catch { return '—' }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-semibold tracking-tight flex items-center gap-2">
            <FileBox className="w-6 h-6 text-primary" /> Study Loads
          </h1>
          <p className="text-muted-foreground text-sm mt-1">Work blocks assigned per learning cycle</p>
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
            <Button className="gap-2"><Plus className="w-4 h-4" /> New Study Load</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>New Study Load</DialogTitle>
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
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Load Type</Label>
                  <select className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm" value={form.loadType} onChange={(e) => setForm({ ...form, loadType: e.target.value })}>
                    <option value="practice">Practice</option>
                    <option value="reading">Reading</option>
                    <option value="video">Video</option>
                    <option value="project">Project</option>
                    <option value="assessment">Assessment</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label>Status</Label>
                  <select className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm" value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })}>
                    <option value="pending">Pending</option>
                    <option value="released">Released</option>
                    <option value="in_progress">In Progress</option>
                    <option value="completed">Completed</option>
                  </select>
                </div>
              </div>
              <div className="space-y-2">
                <Label>Title</Label>
                <Input placeholder="e.g. Práctica de ecuaciones lineales" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Released At <span className="text-muted-foreground text-xs">(optional)</span></Label>
                  <Input type="datetime-local" value={form.releasedAt} onChange={(e) => setForm({ ...form, releasedAt: e.target.value })} />
                </div>
                <div className="space-y-2">
                  <Label>Due At <span className="text-muted-foreground text-xs">(optional)</span></Label>
                  <Input type="datetime-local" value={form.dueAt} onChange={(e) => setForm({ ...form, dueAt: e.target.value })} />
                </div>
              </div>
              <Button type="submit" className="w-full" disabled={saving}>
                {saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Create Study Load
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
            <DialogTitle>Edit Study Load</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleEdit} className="space-y-4">
            <div className="space-y-2">
              <Label>Title</Label>
              <Input value={editForm.title} onChange={(e) => setEditForm({ ...editForm, title: e.target.value })} required />
            </div>
            <div className="space-y-2">
              <Label>Load Type</Label>
              <select className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm" value={editForm.loadType} onChange={(e) => setEditForm({ ...editForm, loadType: e.target.value })}>
                {editForm.loadType && !CANONICAL_LOAD_TYPES.has(editForm.loadType) && (
                  <option value={editForm.loadType}>{editForm.loadType} (legacy)</option>
                )}
                <option value="practice">Practice</option>
                <option value="reading">Reading</option>
                <option value="video">Video</option>
                <option value="project">Project</option>
                <option value="assessment">Assessment</option>
              </select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Released At</Label>
                <Input type="datetime-local" value={editForm.releasedAt} onChange={(e) => setEditForm({ ...editForm, releasedAt: e.target.value })} />
              </div>
              <div className="space-y-2">
                <Label>Due At</Label>
                <Input type="datetime-local" value={editForm.dueAt} onChange={(e) => setEditForm({ ...editForm, dueAt: e.target.value })} />
              </div>
            </div>
            <Button type="submit" className="w-full" disabled={editSaving}>
              {editSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Save Changes
            </Button>
          </form>
        </DialogContent>
      </Dialog>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          placeholder="Search by title or load type…"
          value={search}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)}
          className="pl-9"
        />
      </div>

      {(() => {
        const enrollFiltered = loads.filter((ld) => !filterEnrollment || ld.learningCycle?.enrollment?.id === filterEnrollment)
        const q = search.trim().toLowerCase()
        const filtered = q
          ? enrollFiltered.filter((ld) =>
              ld.title.toLowerCase().includes(q) ||
              ld.loadType.toLowerCase().includes(q)
            )
          : enrollFiltered
        return <>
          {q && (
            <p className="text-sm text-muted-foreground">
              Showing {filtered.length} of {enrollFiltered.length}
            </p>
          )}

      {loading ? (
        <div className="flex justify-center py-12"><Loader2 className="w-6 h-6 animate-spin text-muted-foreground" /></div>
      ) : (loads?.length ?? 0) === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <FileBox className="w-12 h-12 text-muted-foreground/40 mx-auto mb-3" />
            <p className="text-muted-foreground">No study loads yet. Create one to assign work blocks to a learning cycle.</p>
          </CardContent>
        </Card>
      ) : q && filtered.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <Search className="w-12 h-12 text-muted-foreground/40 mx-auto mb-3" />
            <p className="text-muted-foreground">No study loads match your search.</p>
          </CardContent>
        </Card>
      ) : !q && filterEnrollment && enrollFiltered.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <FileBox className="w-12 h-12 text-muted-foreground/40 mx-auto mb-3" />
            <p className="text-muted-foreground">No study loads for this enrollment.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-3">
          {filtered.map((ld) => (
            <Card key={ld.id} className="hover:shadow-md transition-shadow" style={{ boxShadow: 'var(--shadow-sm)' }}>
              <CardContent className="py-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <FileBox className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">{ld.title}</p>
                      <p className="text-sm text-muted-foreground">
                        Cycle {ld.learningCycle?.cycleNumber ?? '?'}
                        <span className="mx-1">·</span>
                        {ld.learningCycle?.enrollment?.student?.firstName ?? ''} {ld.learningCycle?.enrollment?.student?.lastName ?? ''}
                        <span className="mx-1">·</span>
                        <span className="font-mono">{ld.learningCycle?.enrollment?.program?.code ?? ''}</span>
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <select
                      className="rounded-md border border-input bg-background px-2 py-1 text-xs font-mono"
                      value={ld.loadType}
                      disabled={isClosed(ld) || updatingLoadType === ld.id}
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
                    <select
                      className="rounded-md border border-input bg-background px-2 py-1 text-xs font-medium"
                      value={ld.status}
                      onChange={(e) => handleStatusChange(ld.id, e.target.value)}
                      disabled={isClosed(ld) || updating === ld.id}
                    >
                      <option value="pending">pending</option>
                      <option value="released">released</option>
                      <option value="in_progress">in_progress</option>
                      <option value="completed">completed</option>
                    </select>
                    {!isClosed(ld) && (
                      <>
                        <button onClick={() => openEdit(ld)} className="p-1.5 rounded-md hover:bg-muted transition-colors" title="Edit">
                          <Pencil className="w-3.5 h-3.5 text-muted-foreground" />
                        </button>
                        <button onClick={() => handleDelete(ld)} className="p-1.5 rounded-md hover:bg-destructive/10 transition-colors" title="Delete">
                          <Trash2 className="w-3.5 h-3.5 text-destructive" />
                        </button>
                      </>
                    )}
                  </div>
                </div>
                <div className="mt-3 pt-3 border-t flex gap-4 text-xs text-muted-foreground">
                  <span>Released: {formatDate(ld.releasedAt)}</span>
                  <span>Due: {formatDate(ld.dueAt)}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
      </>
      })()}
    </div>
  )
}
