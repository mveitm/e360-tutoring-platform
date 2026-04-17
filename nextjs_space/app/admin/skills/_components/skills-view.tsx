'use client'

import { useState, useEffect, useCallback } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent } from '@/components/ui/card'
import { Zap, Plus, Loader2, Pencil, Trash2, Search } from 'lucide-react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { toast } from 'sonner'

interface ProgramOption { id: string; code: string; name: string }
interface AxisOption { id: string; code: string; name: string; programId: string }

interface Skill {
  id: string
  programId: string
  axisId: string
  code: string
  name: string
  description: string | null
  displayOrder: number
  status: string
  program?: ProgramOption
  axis?: { id: string; code: string; name: string }
}

export function SkillsView() {
  const [skills, setSkills] = useState<Skill[]>([])
  const [programs, setPrograms] = useState<ProgramOption[]>([])
  const [axes, setAxes] = useState<AxisOption[]>([])
  const [loading, setLoading] = useState(true)
  const [open, setOpen] = useState(false)
  const [saving, setSaving] = useState(false)
  const [form, setForm] = useState({ programId: '', axisId: '', code: '', name: '', description: '', displayOrder: '0', status: 'active' })

  // Edit state (no axisId — excluded per scope)
  const [editOpen, setEditOpen] = useState(false)
  const [editId, setEditId] = useState('')
  const [editForm, setEditForm] = useState({ code: '', name: '', description: '', displayOrder: '0', status: 'active' })
  const [editSaving, setEditSaving] = useState(false)
  const [search, setSearch] = useState('')
  const [updatingSkillStatus, setUpdatingSkillStatus] = useState<string | null>(null)

  const fetchData = useCallback(async () => {
    try {
      const [sRes, pRes, aRes] = await Promise.all([
        fetch('/api/skills'),
        fetch('/api/programs'),
        fetch('/api/axes'),
      ])
      if (sRes.ok) setSkills((await sRes.json()) ?? [])
      if (pRes.ok) setPrograms((await pRes.json()) ?? [])
      if (aRes.ok) setAxes((await aRes.json()) ?? [])
    } catch (err: any) {
      console.error('Failed to fetch data', err)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { fetchData() }, [fetchData])

  const filteredAxes = form.programId ? axes.filter((a) => a.programId === form.programId) : axes

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.programId || !form.axisId || !form.code || !form.name) {
      toast.error('Program, axis, code, and name are required')
      return
    }
    setSaving(true)
    try {
      const res = await fetch('/api/skills', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, displayOrder: parseInt(form.displayOrder) || 0, description: form.description || undefined }),
      })
      const data = await res.json()
      if (!res.ok) {
        toast.error(data?.error ?? 'Failed to create skill')
      } else {
        toast.success('Skill created')
        setForm({ programId: '', axisId: '', code: '', name: '', description: '', displayOrder: '0', status: 'active' })
        setOpen(false)
        fetchData()
      }
    } catch {
      toast.error('Something went wrong')
    } finally {
      setSaving(false)
    }
  }

  const openEdit = (sk: Skill) => {
    setEditId(sk.id)
    setEditForm({ code: sk.code, name: sk.name, description: sk.description ?? '', displayOrder: String(sk.displayOrder), status: sk.status })
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
      const res = await fetch(`/api/skills/${editId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...editForm, displayOrder: parseInt(editForm.displayOrder) || 0, description: editForm.description || null }),
      })
      const data = await res.json()
      if (!res.ok) {
        toast.error(data?.error ?? 'Failed to update skill')
      } else {
        toast.success('Skill updated')
        setEditOpen(false)
        fetchData()
      }
    } catch {
      toast.error('Something went wrong')
    } finally {
      setEditSaving(false)
    }
  }

  const handleDelete = async (sk: Skill) => {
    if (!window.confirm(`Delete skill "${sk.code} — ${sk.name}"?`)) return
    try {
      const res = await fetch(`/api/skills/${sk.id}`, { method: 'DELETE' })
      const data = await res.json()
      if (!res.ok) {
        toast.error(data?.error ?? 'Failed to delete skill')
      } else {
        toast.success('Skill deleted')
        fetchData()
      }
    } catch {
      toast.error('Something went wrong')
    }
  }

  const handleSkillStatusChange = async (skillId: string, newStatus: string) => {
    setUpdatingSkillStatus(skillId)
    try {
      const res = await fetch(`/api/skills/${skillId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      })
      if (res.ok) {
        toast.success('Skill updated')
        fetchData()
      } else {
        const data = await res.json().catch(() => null)
        toast.error(data?.error ?? 'Failed to update skill status')
      }
    } catch {
      toast.error('Something went wrong')
    } finally {
      setUpdatingSkillStatus(null)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-semibold tracking-tight flex items-center gap-2">
            <Zap className="w-6 h-6 text-primary" /> Skills
          </h1>
          <p className="text-muted-foreground text-sm mt-1">Specific skills per axis and program</p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2"><Plus className="w-4 h-4" /> New Skill</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>New Skill</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleCreate} className="space-y-4">
              <div className="space-y-2">
                <Label>Program</Label>
                <select
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  value={form.programId}
                  onChange={(e) => setForm({ ...form, programId: e.target.value, axisId: '' })}
                  required
                >
                  <option value="">Select a program...</option>
                  {programs.map((p) => (
                    <option key={p.id} value={p.id}>{p.name} ({p.code})</option>
                  ))}
                </select>
              </div>
              <div className="space-y-2">
                <Label>Axis</Label>
                <select
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  value={form.axisId}
                  onChange={(e) => setForm({ ...form, axisId: e.target.value })}
                  required
                  disabled={!form.programId}
                >
                  <option value="">{form.programId ? 'Select an axis...' : 'Select a program first'}</option>
                  {filteredAxes.map((a) => (
                    <option key={a.id} value={a.id}>{a.name} ({a.code})</option>
                  ))}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Code</Label>
                  <Input placeholder="e.g. ALG_LINEAR" value={form.code} onChange={(e) => setForm({ ...form, code: e.target.value })} required />
                </div>
                <div className="space-y-2">
                  <Label>Display Order</Label>
                  <Input type="number" value={form.displayOrder} onChange={(e) => setForm({ ...form, displayOrder: e.target.value })} />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Name</Label>
                <Input placeholder="e.g. Resolver problemas de ecuaciones lineales" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
              </div>
              <div className="space-y-2">
                <Label>Description <span className="text-muted-foreground text-xs">(optional)</span></Label>
                <Input placeholder="Brief description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
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
                Create Skill
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Edit Modal — no axisId reassignment per Phase K scope */}
      <Dialog open={editOpen} onOpenChange={setEditOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Skill</DialogTitle>
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
              <Label>Description <span className="text-muted-foreground text-xs">(optional)</span></Label>
              <Input value={editForm.description} onChange={(e) => setEditForm({ ...editForm, description: e.target.value })} />
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

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          placeholder="Search by code, name or axis…"
          value={search}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)}
          className="pl-9"
        />
      </div>

      {(() => {
        const q = search.trim().toLowerCase()
        const filtered = q
          ? skills.filter((sk) =>
              sk.code.toLowerCase().includes(q) ||
              sk.name.toLowerCase().includes(q) ||
              (sk.axis?.name ?? '').toLowerCase().includes(q)
            )
          : skills
        return <>
          {q && (
            <p className="text-sm text-muted-foreground">
              Showing {filtered.length} of {skills.length}
            </p>
          )}

      {loading ? (
        <div className="flex justify-center py-12"><Loader2 className="w-6 h-6 animate-spin text-muted-foreground" /></div>
      ) : (skills?.length ?? 0) === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <Zap className="w-12 h-12 text-muted-foreground/40 mx-auto mb-3" />
            <p className="text-muted-foreground">No skills yet. Create one to define a specific skill within an axis.</p>
          </CardContent>
        </Card>
      ) : filtered.length === 0 ? (
        <Card>
          <CardContent className="py-8 text-center text-sm text-muted-foreground">No skills match your search.</CardContent>
        </Card>
      ) : (
        <div className="grid gap-3">
          {filtered.map((sk) => (
            <Card key={sk.id} className="hover:shadow-md transition-shadow" style={{ boxShadow: 'var(--shadow-sm)' }}>
              <CardContent className="py-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Zap className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">
                        <span className="font-mono text-xs text-muted-foreground mr-2">{sk.code}</span>
                        {sk.name}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {sk.program?.name ?? ''}
                        <span className="mx-1">·</span>
                        {sk.axis?.name ?? ''} ({sk.axis?.code ?? ''})
                        <span className="mx-1">·</span>
                        Order: {sk.displayOrder}
                      </p>
                      {sk.description && <p className="text-xs text-muted-foreground mt-0.5">{sk.description}</p>}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <select
                      className="rounded-md border border-input bg-background px-2 py-1 text-xs font-medium"
                      value={sk.status}
                      disabled={updatingSkillStatus === sk.id}
                      onChange={(e) => handleSkillStatusChange(sk.id, e.target.value)}
                    >
                      <option value="active">active</option>
                      <option value="inactive">inactive</option>
                    </select>
                    <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => openEdit(sk)}>
                      <Pencil className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:text-destructive" onClick={() => handleDelete(sk)}>
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
      })()}
    </div>
  )
}