'use client'

import { useState, useEffect, useCallback } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent } from '@/components/ui/card'
import { Layers, Plus, Loader2, Pencil, Trash2, Search } from 'lucide-react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { toast } from 'sonner'

interface ProgramOption {
  id: string
  code: string
  name: string
}

interface Axis {
  id: string
  programId: string
  code: string
  name: string
  displayOrder: number
  status: string
  createdAt: string
  program?: ProgramOption
  _count?: { skills: number }
}

export function AxesView() {
  const [axes, setAxes] = useState<Axis[]>([])
  const [programs, setPrograms] = useState<ProgramOption[]>([])
  const [loading, setLoading] = useState(true)
  const [open, setOpen] = useState(false)
  const [saving, setSaving] = useState(false)
  const [form, setForm] = useState({ programId: '', code: '', name: '', displayOrder: '0', status: 'active' })

  const [search, setSearch] = useState('')
  const [updatingAxisStatus, setUpdatingAxisStatus] = useState<string | null>(null)

  // Edit state
  const [editOpen, setEditOpen] = useState(false)
  const [editId, setEditId] = useState('')
  const [editForm, setEditForm] = useState({ code: '', name: '', displayOrder: '0', status: 'active' })
  const [editSaving, setEditSaving] = useState(false)

  const fetchData = useCallback(async () => {
    try {
      const [aRes, pRes] = await Promise.all([
        fetch('/api/axes'),
        fetch('/api/programs'),
      ])
      if (aRes.ok) setAxes((await aRes.json()) ?? [])
      if (pRes.ok) setPrograms((await pRes.json()) ?? [])
    } catch (err: any) {
      console.error('Failed to fetch data', err)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { fetchData() }, [fetchData])

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.programId || !form.code || !form.name) {
      toast.error('Program, code, and name are required')
      return
    }
    setSaving(true)
    try {
      const res = await fetch('/api/axes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, displayOrder: parseInt(form.displayOrder) || 0 }),
      })
      const data = await res.json()
      if (!res.ok) {
        toast.error(data?.error ?? 'Failed to create axis')
      } else {
        toast.success('Axis created')
        setForm({ programId: '', code: '', name: '', displayOrder: '0', status: 'active' })
        setOpen(false)
        fetchData()
      }
    } catch {
      toast.error('Something went wrong')
    } finally {
      setSaving(false)
    }
  }

  const openEdit = (ax: Axis) => {
    setEditId(ax.id)
    setEditForm({ code: ax.code, name: ax.name, displayOrder: String(ax.displayOrder), status: ax.status })
    setEditOpen(true)
  }

  const handleEdit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!editForm.code || !editForm.name) {
      toast.error('Code and name are required')
      return
    }
    setEditSaving(true)
    try {
      const res = await fetch(`/api/axes/${editId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...editForm, displayOrder: parseInt(editForm.displayOrder) || 0 }),
      })
      const data = await res.json()
      if (!res.ok) {
        toast.error(data?.error ?? 'Failed to update axis')
      } else {
        toast.success('Axis updated')
        setEditOpen(false)
        fetchData()
      }
    } catch {
      toast.error('Something went wrong')
    } finally {
      setEditSaving(false)
    }
  }

  const handleDelete = async (ax: Axis) => {
    if (!window.confirm(`Delete axis "${ax.code} — ${ax.name}"?`)) return
    try {
      const res = await fetch(`/api/axes/${ax.id}`, { method: 'DELETE' })
      const data = await res.json()
      if (!res.ok) {
        toast.error(data?.error ?? 'Failed to delete axis')
      } else {
        toast.success('Axis deleted')
        fetchData()
      }
    } catch {
      toast.error('Something went wrong')
    }
  }

  const handleAxisStatusChange = async (axisId: string, newStatus: string) => {
    setUpdatingAxisStatus(axisId)
    try {
      const res = await fetch(`/api/axes/${axisId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      })
      if (res.ok) {
        toast.success('Axis updated')
        fetchData()
      } else {
        const data = await res.json().catch(() => null)
        toast.error(data?.error ?? 'Failed to update axis status')
      }
    } catch {
      toast.error('Something went wrong')
    } finally {
      setUpdatingAxisStatus(null)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-semibold tracking-tight flex items-center gap-2">
            <Layers className="w-6 h-6 text-primary" /> Axes
          </h1>
          <p className="text-muted-foreground text-sm mt-1">Learning axes per program</p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2"><Plus className="w-4 h-4" /> New Axis</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>New Axis</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleCreate} className="space-y-4">
              <div className="space-y-2">
                <Label>Program</Label>
                <select
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  value={form.programId}
                  onChange={(e) => setForm({ ...form, programId: e.target.value })}
                  required
                >
                  <option value="">Select a program...</option>
                  {programs.map((p) => (
                    <option key={p.id} value={p.id}>{p.name} ({p.code})</option>
                  ))}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Code</Label>
                  <Input placeholder="e.g. ALG" value={form.code} onChange={(e) => setForm({ ...form, code: e.target.value })} required />
                </div>
                <div className="space-y-2">
                  <Label>Display Order</Label>
                  <Input type="number" value={form.displayOrder} onChange={(e) => setForm({ ...form, displayOrder: e.target.value })} />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Name</Label>
                <Input placeholder="e.g. Álgebra" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
              </div>
              <div className="space-y-2">
                <Label>Status</Label>
                <select className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm" value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })}>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
              <Button type="submit" className="w-full" disabled={saving}>
                {saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Create Axis
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Edit Modal */}
      <Dialog open={editOpen} onOpenChange={setEditOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Axis</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleEdit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Code</Label>
                <Input value={editForm.code} onChange={(e) => setEditForm({ ...editForm, code: e.target.value })} required />
              </div>
              <div className="space-y-2">
                <Label>Display Order</Label>
                <Input type="number" value={editForm.displayOrder} onChange={(e) => setEditForm({ ...editForm, displayOrder: e.target.value })} />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Name</Label>
              <Input value={editForm.name} onChange={(e) => setEditForm({ ...editForm, name: e.target.value })} required />
            </div>
            <div className="space-y-2">
              <Label>Status</Label>
              <select className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm" value={editForm.status} onChange={(e) => setEditForm({ ...editForm, status: e.target.value })}>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
            <Button type="submit" className="w-full" disabled={editSaving}>
              {editSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Save Changes
            </Button>
          </form>
        </DialogContent>
      </Dialog>

      {!loading && (axes?.length ?? 0) > 0 && (
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search by code, name, or program…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
      )}

      {(() => {
        const q = search.trim().toLowerCase()
        const filtered = q
          ? axes.filter((ax) =>
              ax.code.toLowerCase().includes(q) ||
              ax.name.toLowerCase().includes(q) ||
              (ax.program?.name ?? '').toLowerCase().includes(q)
            )
          : axes

        if (loading) {
          return <div className="flex justify-center py-12"><Loader2 className="w-6 h-6 animate-spin text-muted-foreground" /></div>
        }

        if ((axes?.length ?? 0) === 0) {
          return (
            <Card>
              <CardContent className="py-12 text-center">
                <Layers className="w-12 h-12 text-muted-foreground/40 mx-auto mb-3" />
                <p className="text-muted-foreground">No axes yet. Create one to define a learning axis for a program.</p>
              </CardContent>
            </Card>
          )
        }

        return (
          <>
            {q && (
              <p className="text-sm text-muted-foreground">
                Showing {filtered.length} of {axes.length}
              </p>
            )}
            {filtered.length === 0 ? (
              <Card>
                <CardContent className="py-12 text-center">
                  <Search className="w-12 h-12 text-muted-foreground/40 mx-auto mb-3" />
                  <p className="text-muted-foreground">No axes match your search.</p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-3">
                {filtered.map((ax) => (
            <Card key={ax.id} className="hover:shadow-md transition-shadow" style={{ boxShadow: 'var(--shadow-sm)' }}>
              <CardContent className="py-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Layers className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">
                        <span className="font-mono text-xs text-muted-foreground mr-2">{ax.code}</span>
                        {ax.name}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {ax.program?.name ?? ''}
                        <span className="mx-1">·</span>
                        Order: {ax.displayOrder}
                        <span className="mx-1">·</span>
                        {ax._count?.skills ?? 0} skill{(ax._count?.skills ?? 0) !== 1 ? 's' : ''}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <select
                      className="rounded-md border border-input bg-background px-2 py-1 text-xs font-medium"
                      value={ax.status}
                      disabled={updatingAxisStatus === ax.id}
                      onChange={(e) => handleAxisStatusChange(ax.id, e.target.value)}
                    >
                      <option value="active">active</option>
                      <option value="inactive">inactive</option>
                    </select>
                    <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => openEdit(ax)}>
                      <Pencil className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:text-destructive" onClick={() => handleDelete(ax)}>
                      <Trash2 className="w-4 h-4" />
                    </Button>
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
    </div>
  )
}