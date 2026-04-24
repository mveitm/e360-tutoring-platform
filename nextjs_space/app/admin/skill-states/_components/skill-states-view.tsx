'use client'

import { useState, useEffect, useCallback } from 'react'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Card, CardContent } from '@/components/ui/card'
import { BarChart3, Plus, Loader2, Search } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { toast } from 'sonner'

interface EnrollmentOption {
  id: string
  status: string
  student: { id: string; firstName: string; lastName: string }
  program: { id: string; code: string; name: string }
}

interface SkillOption {
  id: string
  code: string
  name: string
  programId: string
  axis?: { code: string; name: string }
}

interface SkillState {
  id: string
  enrollmentId: string
  skillId: string
  masteryLevel: string
  confidenceLevel: string
  needsReinforcement: boolean
  lastEvaluatedAt: string | null
  stateSource: string
  createdAt: string
  enrollment?: {
    id: string
    status: string
    student: { id: string; firstName: string; lastName: string }
    program: { id: string; code: string; name: string }
  }
  skill?: { id: string; code: string; name: string; axis?: { code: string; name: string } }
}

export function SkillStatesView() {
  const [states, setStates] = useState<SkillState[]>([])
  const [enrollments, setEnrollments] = useState<EnrollmentOption[]>([])
  const [skills, setSkills] = useState<SkillOption[]>([])
  const [loading, setLoading] = useState(true)
  const [open, setOpen] = useState(false)
  const [saving, setSaving] = useState(false)
  const [updating, setUpdating] = useState<string | null>(null)
  const [selectedEnrollment, setSelectedEnrollment] = useState('')
  const [search, setSearch] = useState('')
  const [form, setForm] = useState({
    enrollmentId: '',
    skillId: '',
    masteryLevel: 'not_evaluated',
    confidenceLevel: 'none',
    needsReinforcement: false,
    stateSource: 'manual',
  })

  const fetchData = useCallback(async () => {
    try {
      const [ssRes, eRes, skRes] = await Promise.all([
        fetch('/api/skill-states'),
        fetch('/api/instances'),
        fetch('/api/skills'),
      ])
      if (ssRes.ok) setStates((await ssRes.json()) ?? [])
      if (eRes.ok) setEnrollments((await eRes.json()) ?? [])
      if (skRes.ok) setSkills((await skRes.json()) ?? [])
    } catch (err: any) {
      console.error('Failed to fetch data', err)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { fetchData() }, [fetchData])

  // Filter skills by enrollment's programId
  const selectedEnr = enrollments.find((e) => e.id === form.enrollmentId)
  const filteredSkills = selectedEnr ? skills.filter((s) => s.programId === selectedEnr.program.id) : []

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.enrollmentId || !form.skillId) {
      toast.error('Select both an enrollment and a skill')
      return
    }
    setSaving(true)
    try {
      const res = await fetch('/api/skill-states', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (!res.ok) {
        toast.error(data?.error ?? 'Failed to create skill state')
      } else {
        toast.success('Skill state created')
        setForm({ enrollmentId: '', skillId: '', masteryLevel: 'not_evaluated', confidenceLevel: 'none', needsReinforcement: false, stateSource: 'manual' })
        setOpen(false)
        fetchData()
      }
    } catch {
      toast.error('Something went wrong')
    } finally {
      setSaving(false)
    }
  }

  const handleUpdate = async (id: string, field: string, value: string | boolean) => {
    setUpdating(id)
    try {
      const res = await fetch(`/api/skill-states/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ [field]: value }),
      })
      if (!res.ok) {
        const data = await res.json()
        toast.error(data?.error ?? 'Failed to update')
      } else {
        toast.success('Skill state updated')
        fetchData()
      }
    } catch {
      toast.error('Something went wrong')
    } finally {
      setUpdating(null)
    }
  }

  const masteryColor = (level: string) => {
    switch (level) {
      case 'mastered': return 'default'
      case 'developing': return 'secondary'
      case 'not_evaluated': return 'outline'
      default: return 'outline'
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-semibold tracking-tight flex items-center gap-2">
            <BarChart3 className="w-6 h-6 text-primary" /> Skill States
          </h1>
          <p className="text-muted-foreground text-sm mt-1">Current skill state per enrollment instance</p>
        </div>
        <div className="flex items-center gap-3">
          <select
            className="rounded-md border border-input bg-background px-3 py-2 text-sm"
            value={selectedEnrollment}
            onChange={(e) => setSelectedEnrollment(e.target.value)}
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
            <Button className="gap-2"><Plus className="w-4 h-4" /> New Skill State</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>New Skill State</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleCreate} className="space-y-4">
              <div className="space-y-2">
                <Label>Enrollment</Label>
                <select
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  value={form.enrollmentId}
                  onChange={(e) => setForm({ ...form, enrollmentId: e.target.value, skillId: '' })}
                  required
                >
                  <option value="">Select an enrollment...</option>
                  {enrollments.map((en) => (
                    <option key={en.id} value={en.id}>
                      {en.student?.firstName ?? ''} {en.student?.lastName ?? ''} — {en.program?.code ?? ''}
                    </option>
                  ))}
                </select>
              </div>
              <div className="space-y-2">
                <Label>Skill</Label>
                <select
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  value={form.skillId}
                  onChange={(e) => setForm({ ...form, skillId: e.target.value })}
                  required
                  disabled={!form.enrollmentId}
                >
                  <option value="">{form.enrollmentId ? 'Select a skill...' : 'Select an enrollment first'}</option>
                  {filteredSkills.map((s) => (
                    <option key={s.id} value={s.id}>
                      [{s.axis?.code ?? ''}] {s.code} — {s.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Mastery Level</Label>
                  <select className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm" value={form.masteryLevel} onChange={(e) => setForm({ ...form, masteryLevel: e.target.value })}>
                    <option value="not_evaluated">Not Evaluated</option>
                    <option value="developing">Developing</option>
                    <option value="mastered">Mastered</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label>Confidence Level</Label>
                  <select className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm" value={form.confidenceLevel} onChange={(e) => setForm({ ...form, confidenceLevel: e.target.value })}>
                    <option value="none">None</option>
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Needs Reinforcement</Label>
                  <select className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm" value={form.needsReinforcement ? 'true' : 'false'} onChange={(e) => setForm({ ...form, needsReinforcement: e.target.value === 'true' })}>
                    <option value="false">No</option>
                    <option value="true">Yes</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label>State Source</Label>
                  <select className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm" value={form.stateSource} onChange={(e) => setForm({ ...form, stateSource: e.target.value })}>
                    <option value="manual">Manual</option>
                    <option value="diagnostic">Diagnostic</option>
                    <option value="evaluation">Evaluation</option>
                  </select>
                </div>
              </div>
              <Button type="submit" className="w-full" disabled={saving}>
                {saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Create Skill State
              </Button>
            </form>
          </DialogContent>
        </Dialog>
        </div>
      </div>

      {!loading && (states?.length ?? 0) > 0 && (
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search by skill code, skill name, or axis…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
      )}

      {(() => {
        const enrollmentFiltered = states.filter((st) => !selectedEnrollment || st.enrollmentId === selectedEnrollment)
        const q = search.trim().toLowerCase()
        const filtered = q
          ? enrollmentFiltered.filter((st) =>
              (st.skill?.code ?? '').toLowerCase().includes(q) ||
              (st.skill?.name ?? '').toLowerCase().includes(q) ||
              (st.skill?.axis?.name ?? '').toLowerCase().includes(q)
            )
          : enrollmentFiltered

        if (loading) {
          return <div className="flex justify-center py-12"><Loader2 className="w-6 h-6 animate-spin text-muted-foreground" /></div>
        }

        if ((states?.length ?? 0) === 0) {
          return (
            <Card>
              <CardContent className="py-12 text-center">
                <BarChart3 className="w-12 h-12 text-muted-foreground/40 mx-auto mb-3" />
                <p className="text-muted-foreground">No skill states yet. Create one to track a student&apos;s skill progress in an enrollment.</p>
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
                  <p className="text-muted-foreground">No skill states match your search.</p>
                </CardContent>
              </Card>
            ) : !q && selectedEnrollment && enrollmentFiltered.length === 0 ? (
              <Card>
                <CardContent className="py-12 text-center">
                  <BarChart3 className="w-12 h-12 text-muted-foreground/40 mx-auto mb-3" />
                  <p className="text-muted-foreground">No skill states for this enrollment.</p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-3">
                {filtered.map((st) => (
                  <Card key={st.id} className="hover:shadow-md transition-shadow" style={{ boxShadow: 'var(--shadow-sm)' }}>
                    <CardContent className="py-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                            <BarChart3 className="w-5 h-5 text-primary" />
                          </div>
                          <div>
                            <p className="font-medium">
                              {st.enrollment?.student?.firstName ?? ''} {st.enrollment?.student?.lastName ?? ''}
                              <span className="mx-1 text-muted-foreground">·</span>
                              <span className="font-mono text-xs">{st.enrollment?.program?.code ?? ''}</span>
                            </p>
                            <p className="text-sm text-muted-foreground">
                              <span className="font-mono">[{st.skill?.axis?.code ?? ''}]</span>{' '}
                              {st.skill?.code ?? ''} — {st.skill?.name ?? ''}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <select
                            className="rounded-md border border-input bg-background px-2 py-1 text-xs font-medium"
                            value={st.masteryLevel}
                            disabled={updating === st.id}
                            onChange={(e) => handleUpdate(st.id, 'masteryLevel', e.target.value)}
                          >
                            <option value="not_evaluated">not_evaluated</option>
                            <option value="developing">developing</option>
                            <option value="mastered">mastered</option>
                          </select>
                          <select
                            className="rounded-md border border-input bg-background px-2 py-1 text-xs"
                            value={st.needsReinforcement ? 'yes' : 'no'}
                            disabled={updating === st.id}
                            onChange={(e) => handleUpdate(st.id, 'needsReinforcement', e.target.value === 'yes')}
                          >
                            <option value="no">No reinforce</option>
                            <option value="yes">Reinforce ⚠</option>
                          </select>
                        </div>
                      </div>
                      <div className="mt-3 pt-3 border-t flex items-center gap-4 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">Confidence:
                          <select
                            className="rounded-md border border-input bg-background px-1.5 py-0.5 text-xs"
                            value={st.confidenceLevel}
                            disabled={updating === st.id}
                            onChange={(e) => handleUpdate(st.id, 'confidenceLevel', e.target.value)}
                          >
                            <option value="none">none</option>
                            <option value="low">low</option>
                            <option value="medium">medium</option>
                            <option value="high">high</option>
                          </select>
                        </span>
                        <span className="flex items-center gap-1">Source:
                          <select
                            className="rounded-md border border-input bg-background px-1.5 py-0.5 text-xs"
                            value={st.stateSource}
                            disabled={updating === st.id}
                            onChange={(e) => handleUpdate(st.id, 'stateSource', e.target.value)}
                          >
                            <option value="manual">manual</option>
                            <option value="diagnostic">diagnostic</option>
                            <option value="evaluation">evaluation</option>
                          </select>
                        </span>
                        <span>Last evaluated: {st.lastEvaluatedAt ? new Date(st.lastEvaluatedAt).toLocaleDateString() : '—'}</span>
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
