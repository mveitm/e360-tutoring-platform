'use client'

import { useState, useEffect, useCallback } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent } from '@/components/ui/card'
import { Users, Plus, Loader2, Mail, UserCircle, Pencil, Trash2, ExternalLink, Search } from 'lucide-react'
import Link from 'next/link'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { toast } from 'sonner'

interface Student {
  id: string
  firstName: string
  lastName: string
  email: string
  status: string
  createdAt: string
  _count?: { programInstances: number }
}

export function StudentsView() {
  const [students, setStudents] = useState<Student[]>([])
  const [loading, setLoading] = useState(true)
  const [open, setOpen] = useState(false)
  const [saving, setSaving] = useState(false)
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', status: 'active' })

  // Inline status update state
  const [updatingStudentStatus, setUpdatingStudentStatus] = useState<string | null>(null)

  // Edit state
  const [editOpen, setEditOpen] = useState(false)
  const [editId, setEditId] = useState<string | null>(null)
  const [editForm, setEditForm] = useState({ firstName: '', lastName: '', email: '' })
  const [editSaving, setEditSaving] = useState(false)
  const [search, setSearch] = useState('')

  const fetchStudents = useCallback(async () => {
    try {
      const res = await fetch('/api/students')
      if (res.ok) {
        const data = await res.json()
        setStudents(data ?? [])
      }
    } catch (err: any) {
      console.error('Failed to fetch students', err)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchStudents()
  }, [fetchStudents])

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    try {
      const res = await fetch('/api/students', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (!res.ok) {
        toast.error(data?.error ?? 'Failed to create student')
      } else {
        toast.success('Student created')
        setForm({ firstName: '', lastName: '', email: '', status: 'active' })
        setOpen(false)
        fetchStudents()
      }
    } catch {
      toast.error('Something went wrong')
    } finally {
      setSaving(false)
    }
  }

  const openEdit = (s: Student) => {
    setEditId(s.id)
    setEditForm({ firstName: s.firstName, lastName: s.lastName, email: s.email })
    setEditOpen(true)
  }

  const handleEdit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!editId) return
    setEditSaving(true)
    try {
      const res = await fetch(`/api/students/${editId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editForm),
      })
      const data = await res.json()
      if (!res.ok) {
        toast.error(data?.error ?? 'Failed to update student')
      } else {
        toast.success('Student updated')
        setEditOpen(false)
        fetchStudents()
      }
    } catch {
      toast.error('Something went wrong')
    } finally {
      setEditSaving(false)
    }
  }

  const handleStudentStatusChange = async (id: string, newStatus: string) => {
    setUpdatingStudentStatus(id)
    try {
      const res = await fetch(`/api/students/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      })
      const data = await res.json()
      if (!res.ok) {
        toast.error(data?.error ?? 'Failed to update student status')
      } else {
        toast.success('Student updated')
        fetchStudents()
      }
    } catch {
      toast.error('Something went wrong')
    } finally {
      setUpdatingStudentStatus(null)
    }
  }

  const handleDelete = async (s: Student) => {
    if (!window.confirm(`Delete student "${s.firstName} ${s.lastName}"?`)) return
    try {
      const res = await fetch(`/api/students/${s.id}`, { method: 'DELETE' })
      const data = await res.json()
      if (!res.ok) {
        toast.error(data?.error ?? 'Failed to delete')
      } else {
        toast.success('Student deleted')
        fetchStudents()
      }
    } catch {
      toast.error('Something went wrong')
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-semibold tracking-tight flex items-center gap-2">
            <Users className="w-6 h-6 text-primary" /> Students
          </h1>
          <p className="text-muted-foreground text-sm mt-1">Manage student records</p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2"><Plus className="w-4 h-4" /> Add Student</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>New Student</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleCreate} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>First Name</Label>
                  <Input
                    value={form.firstName}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setForm({ ...form, firstName: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label>Last Name</Label>
                  <Input
                    value={form.lastName}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setForm({ ...form, lastName: e.target.value })}
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Email</Label>
                <Input
                  type="email"
                  value={form.email}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setForm({ ...form, email: e.target.value })}
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
                  <option value="suspended">Suspended</option>
                </select>
              </div>
              <Button type="submit" className="w-full" disabled={saving}>
                {saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Create Student
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Edit Dialog */}
      <Dialog open={editOpen} onOpenChange={setEditOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Student</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleEdit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>First Name</Label>
                <Input
                  value={editForm.firstName}
                  onChange={(e) => setEditForm({ ...editForm, firstName: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label>Last Name</Label>
                <Input
                  value={editForm.lastName}
                  onChange={(e) => setEditForm({ ...editForm, lastName: e.target.value })}
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Email</Label>
              <Input
                type="email"
                value={editForm.email}
                onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                required
              />
            </div>
            <Button type="submit" className="w-full" disabled={editSaving}>
              {editSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Save Changes
            </Button>
          </form>
        </DialogContent>
      </Dialog>

      {!loading && students.length > 0 && (
        <div className="flex items-center gap-3">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search by name or email…"
              value={search}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)}
              className="pl-9"
            />
          </div>
          {search && (
            <span className="text-xs text-muted-foreground">
              Showing {students.filter((s) => {
                const q = search.toLowerCase()
                return s.firstName.toLowerCase().includes(q) || s.lastName.toLowerCase().includes(q) || s.email.toLowerCase().includes(q)
              }).length} of {students.length}
            </span>
          )}
        </div>
      )}

      {loading ? (
        <div className="flex justify-center py-12">
          <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
        </div>
      ) : (students?.length ?? 0) === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <UserCircle className="w-12 h-12 text-muted-foreground/40 mx-auto mb-3" />
            <p className="text-muted-foreground">No students yet. Add one to get started.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-3">
          {students.filter((s) => {
            if (!search) return true
            const q = search.toLowerCase()
            return s.firstName.toLowerCase().includes(q) || s.lastName.toLowerCase().includes(q) || s.email.toLowerCase().includes(q)
          }).map((s: Student) => (
            <Card key={s.id} className="hover:shadow-md transition-shadow" style={{ boxShadow: 'var(--shadow-sm)' }}>
              <CardContent className="py-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-primary font-semibold text-sm">
                      {s?.firstName?.[0] ?? ''}{s?.lastName?.[0] ?? ''}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium">{s?.firstName ?? ''} {s?.lastName ?? ''}</p>
                    <p className="text-sm text-muted-foreground flex items-center gap-1">
                      <Mail className="w-3 h-3" /> {s?.email ?? ''}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-muted-foreground font-mono">
                    {s?._count?.programInstances ?? 0} program{(s?._count?.programInstances ?? 0) !== 1 ? 's' : ''}
                  </span>
                  <select
                    className="rounded-md border border-input bg-background px-2 py-1 text-xs font-medium"
                    value={s.status}
                    disabled={updatingStudentStatus === s.id}
                    onChange={(e) => handleStudentStatusChange(s.id, e.target.value)}
                  >
                    <option value="active">active</option>
                    <option value="inactive">inactive</option>
                    <option value="suspended">suspended</option>
                  </select>
                  <Link
                    href={`/admin/students/${s.id}`}
                    className="inline-flex items-center gap-1 text-xs text-primary hover:underline whitespace-nowrap"
                  >
                    Open student <ExternalLink className="w-3 h-3" />
                  </Link>
                  <button onClick={() => openEdit(s)} className="p-1.5 rounded-md hover:bg-muted transition-colors" title="Edit">
                    <Pencil className="w-3.5 h-3.5 text-muted-foreground" />
                  </button>
                  <button onClick={() => handleDelete(s)} className="p-1.5 rounded-md hover:bg-destructive/10 transition-colors" title="Delete">
                    <Trash2 className="w-3.5 h-3.5 text-destructive" />
                  </button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
