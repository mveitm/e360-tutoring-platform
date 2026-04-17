'use client'

import { useState, useEffect, useCallback } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent } from '@/components/ui/card'
import { BookOpen, Plus, Loader2, Code, Pencil, Trash2, ExternalLink, Search } from 'lucide-react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { toast } from 'sonner'
import Link from 'next/link'

interface Program {
  id: string
  code: string
  name: string
  vertical: string
  status: string
  createdAt: string
  _count?: { programInstances: number }
}

export function ProgramsView() {
  const [programs, setPrograms] = useState<Program[]>([])
  const [loading, setLoading] = useState(true)
  const [open, setOpen] = useState(false)
  const [saving, setSaving] = useState(false)
  const [form, setForm] = useState({ code: '', name: '', vertical: '', status: 'active' })
  const [editOpen, setEditOpen] = useState(false)
  const [editId, setEditId] = useState<string | null>(null)
  const [editForm, setEditForm] = useState({ code: '', name: '', vertical: '', status: 'active' })
  const [editSaving, setEditSaving] = useState(false)
  const [search, setSearch] = useState('')
  const [updatingProgramStatus, setUpdatingProgramStatus] = useState<string | null>(null)

  const fetchPrograms = useCallback(async () => {
    try {
      const res = await fetch('/api/programs')
      if (res.ok) {
        const data = await res.json()
        setPrograms(data ?? [])
      }
    } catch (err: any) {
      console.error('Failed to fetch programs', err)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchPrograms()
  }, [fetchPrograms])

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    try {
      const res = await fetch('/api/programs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (!res.ok) {
        toast.error(data?.error ?? 'Failed to create program')
      } else {
        toast.success('Program created')
        setForm({ code: '', name: '', vertical: '', status: 'active' })
        setOpen(false)
        fetchPrograms()
      }
    } catch {
      toast.error('Something went wrong')
    } finally {
      setSaving(false)
    }
  }

  const openEdit = (p: Program) => {
    setEditId(p.id)
    setEditForm({ code: p.code, name: p.name, vertical: p.vertical, status: p.status })
    setEditOpen(true)
  }

  const handleEdit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!editId) return
    setEditSaving(true)
    try {
      const res = await fetch(`/api/programs/${editId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editForm),
      })
      const data = await res.json()
      if (!res.ok) {
        toast.error(data?.error ?? 'Failed to update program')
      } else {
        toast.success('Program updated')
        setEditOpen(false)
        fetchPrograms()
      }
    } catch {
      toast.error('Something went wrong')
    } finally {
      setEditSaving(false)
    }
  }

  const handleDelete = async (p: Program) => {
    if (!window.confirm(`Delete program "${p.code}"?`)) return
    try {
      const res = await fetch(`/api/programs/${p.id}`, { method: 'DELETE' })
      const data = await res.json()
      if (!res.ok) {
        toast.error(data?.error ?? 'Failed to delete program')
      } else {
        toast.success('Program deleted')
        fetchPrograms()
      }
    } catch {
      toast.error('Something went wrong')
    }
  }

  const handleProgramStatusChange = async (programId: string, newStatus: string) => {
    setUpdatingProgramStatus(programId)
    try {
      const res = await fetch(`/api/programs/${programId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      })
      if (res.ok) {
        toast.success('Program updated')
        fetchPrograms()
      } else {
        const data = await res.json().catch(() => null)
        toast.error(data?.error ?? 'Failed to update program status')
      }
    } catch {
      toast.error('Something went wrong')
    } finally {
      setUpdatingProgramStatus(null)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-semibold tracking-tight flex items-center gap-2">
            <BookOpen className="w-6 h-6 text-primary" /> Programs
          </h1>
          <p className="text-muted-foreground text-sm mt-1">Manage tutoring programs</p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2"><Plus className="w-4 h-4" /> Add Program</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>New Program</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleCreate} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Code</Label>
                  <Input
                    placeholder="PAES_L1"
                    value={form.code}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setForm({ ...form, code: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label>Vertical</Label>
                  <Input
                    placeholder="PAES"
                    value={form.vertical}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setForm({ ...form, vertical: e.target.value })}
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Name</Label>
                <Input
                  placeholder="PAES Competencia Lectora"
                  value={form.name}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setForm({ ...form, name: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label>Status</Label>
                <select
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  value={form.status}
                  onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setForm({ ...form, status: e.target.value })}
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                  <option value="archived">Archived</option>
                </select>
              </div>
              <Button type="submit" className="w-full" disabled={saving}>
                {saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Create Program
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          placeholder="Search by code, name or vertical…"
          value={search}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)}
          className="pl-9"
        />
      </div>

      {(() => {
        const q = search.trim().toLowerCase()
        const filtered = q
          ? programs.filter((p) =>
              p.code.toLowerCase().includes(q) ||
              p.name.toLowerCase().includes(q) ||
              p.vertical.toLowerCase().includes(q)
            )
          : programs
        return <>
          {q && (
            <p className="text-sm text-muted-foreground">
              Showing {filtered.length} of {programs.length}
            </p>
          )}

      {loading ? (
        <div className="flex justify-center py-12">
          <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
        </div>
      ) : (programs?.length ?? 0) === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <BookOpen className="w-12 h-12 text-muted-foreground/40 mx-auto mb-3" />
            <p className="text-muted-foreground">No programs yet. Add one to get started.</p>
          </CardContent>
        </Card>
      ) : filtered.length === 0 ? (
        <Card>
          <CardContent className="py-8 text-center text-sm text-muted-foreground">No programs match your search.</CardContent>
        </Card>
      ) : (
        <div className="grid gap-3">
          {filtered.map((p: Program) => (
            <Card key={p.id} className="hover:shadow-md transition-shadow" style={{ boxShadow: 'var(--shadow-sm)' }}>
              <CardContent className="py-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Code className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">{p?.name ?? ''}</p>
                    <p className="text-sm text-muted-foreground font-mono">{p?.code ?? ''} &middot; {p?.vertical ?? ''}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-muted-foreground font-mono">
                    {p?._count?.programInstances ?? 0} enrollment{(p?._count?.programInstances ?? 0) !== 1 ? 's' : ''}
                  </span>
                  <select
                    className="rounded-md border border-input bg-background px-2 py-1 text-xs font-medium"
                    value={p.status}
                    disabled={updatingProgramStatus === p.id}
                    onChange={(e) => handleProgramStatusChange(p.id, e.target.value)}
                  >
                    <option value="active">active</option>
                    <option value="inactive">inactive</option>
                    <option value="archived">archived</option>
                  </select>
                  <Link
                    href={`/admin/programs/${p.id}`}
                    className="inline-flex items-center gap-1 text-xs text-primary hover:underline whitespace-nowrap"
                  >
                    Open program <ExternalLink className="w-3 h-3" />
                  </Link>
                  <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => openEdit(p)}>
                    <Pencil className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:text-destructive" onClick={() => handleDelete(p)}>
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
      </>
      })()}

      <Dialog open={editOpen} onOpenChange={setEditOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Program</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleEdit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Code</Label>
                <Input
                  value={editForm.code}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEditForm({ ...editForm, code: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label>Vertical</Label>
                <Input
                  value={editForm.vertical}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEditForm({ ...editForm, vertical: e.target.value })}
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Name</Label>
              <Input
                value={editForm.name}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEditForm({ ...editForm, name: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label>Status</Label>
              <select
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                value={editForm.status}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setEditForm({ ...editForm, status: e.target.value })}
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="archived">Archived</option>
              </select>
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
