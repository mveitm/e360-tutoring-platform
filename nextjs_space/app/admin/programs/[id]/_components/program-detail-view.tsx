'use client'

import { useState, useEffect, useCallback } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ArrowLeft, BookOpen, Loader2, Calendar, Layers, Zap, Link2, User, RefreshCw, ExternalLink, Plus } from 'lucide-react'
import { toast } from 'sonner'
import Link from 'next/link'

interface AxisItem {
  id: string
  code: string
  name: string
  status: string
  displayOrder: number
  _count: { skills: number }
}

interface SkillItem {
  id: string
  code: string
  name: string
  status: string
  axis: { id: string; code: string; name: string }
}

interface EnrollmentItem {
  id: string
  status: string
  startedAt: string | null
  endedAt: string | null
  createdAt: string
  student: { id: string; firstName: string; lastName: string }
  _count: { learningCycles: number }
}

interface ProgramDetail {
  id: string
  code: string
  name: string
  vertical: string
  status: string
  createdAt: string
  axes: AxisItem[]
  skills: SkillItem[]
  programInstances: EnrollmentItem[]
}

export function ProgramDetailView() {
  const params = useParams()
  const router = useRouter()
  const programId = params?.id as string

  const [program, setProgram] = useState<ProgramDetail | null>(null)
  const [loading, setLoading] = useState(true)

  /* ── New Axis inline controls ── */
  const [newAxisCode, setNewAxisCode] = useState('')
  const [newAxisName, setNewAxisName] = useState('')
  const [newAxisOrder, setNewAxisOrder] = useState('0')
  const [creatingAxis, setCreatingAxis] = useState(false)

  /* ── New Skill inline controls ── */
  const [newSkillAxis, setNewSkillAxis] = useState('')
  const [newSkillCode, setNewSkillCode] = useState('')
  const [newSkillName, setNewSkillName] = useState('')
  const [creatingSkill, setCreatingSkill] = useState(false)

  /* ── Enroll inline controls ── */
  const [students, setStudents] = useState<{ id: string; firstName: string; lastName: string }[]>([])
  const [selectedStudent, setSelectedStudent] = useState('')
  const [enrolling, setEnrolling] = useState(false)
  const [updatingEnrollmentStatus, setUpdatingEnrollmentStatus] = useState<string | null>(null)
  const [updatingProgramStatus, setUpdatingProgramStatus] = useState(false)
  const [updatingAxisStatus, setUpdatingAxisStatus] = useState<string | null>(null)
  const [updatingSkillStatus, setUpdatingSkillStatus] = useState<string | null>(null)

  const fetchProgram = useCallback(async () => {
    try {
      const res = await fetch(`/api/programs/${programId}`)
      if (!res.ok) {
        if (res.status === 404) {
          toast.error('Program not found')
          router.push('/admin/programs')
          return
        }
        throw new Error('Failed to fetch')
      }
      setProgram(await res.json())
    } catch (err) {
      console.error('Failed to fetch program', err)
      toast.error('Failed to load program details')
    } finally {
      setLoading(false)
    }
  }, [programId, router])

  useEffect(() => {
    if (programId) fetchProgram()
  }, [programId, fetchProgram])

  /* Fetch students list for enroll select */
  useEffect(() => {
    fetch('/api/students')
      .then((r) => r.ok ? r.json() : Promise.reject())
      .then((data: { id: string; firstName: string; lastName: string }[]) => setStudents(data))
      .catch(() => { /* silent – select will simply be empty */ })
  }, [])

  const handleEnroll = async () => {
    if (!selectedStudent || enrolling) return
    setEnrolling(true)
    try {
      const res = await fetch('/api/instances', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ studentId: selectedStudent, programId }),
      })
      if (!res.ok) {
        const body = await res.json().catch(() => null)
        throw new Error(body?.error ?? 'Failed to create enrollment')
      }
      toast.success('Enrollment created')
      setSelectedStudent('')
      await fetchProgram()
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : 'Failed to create enrollment')
    } finally {
      setEnrolling(false)
    }
  }

  const handleProgramStatusChange = async (newStatus: string) => {
    setUpdatingProgramStatus(true)
    try {
      const res = await fetch(`/api/programs/${programId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      })
      if (res.ok) {
        toast.success('Program updated')
        fetchProgram()
      } else {
        const data = await res.json().catch(() => null)
        toast.error(data?.error ?? 'Failed to update program status')
      }
    } catch {
      toast.error('Something went wrong')
    } finally {
      setUpdatingProgramStatus(false)
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
        fetchProgram()
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
        fetchProgram()
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

  const handleEnrollmentStatusChange = async (enrollmentId: string, newStatus: string) => {
    setUpdatingEnrollmentStatus(enrollmentId)
    try {
      const res = await fetch(`/api/instances/${enrollmentId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      })
      if (res.ok) {
        toast.success('Enrollment updated')
        fetchProgram()
      } else {
        const data = await res.json().catch(() => null)
        toast.error(data?.error ?? 'Failed to update enrollment status')
      }
    } catch {
      toast.error('Something went wrong')
    } finally {
      setUpdatingEnrollmentStatus(null)
    }
  }

  const handleNewAxis = async () => {
    if (!newAxisCode.trim() || !newAxisName.trim()) {
      toast.error('Code and name are required')
      return
    }
    setCreatingAxis(true)
    try {
      const res = await fetch('/api/axes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ programId, code: newAxisCode.trim(), name: newAxisName.trim(), displayOrder: parseInt(newAxisOrder) || 0, status: 'active' }),
      })
      if (res.ok) {
        toast.success('Axis created')
        setNewAxisCode('')
        setNewAxisName('')
        setNewAxisOrder('0')
        fetchProgram()
      } else {
        const data = await res.json().catch(() => null)
        toast.error(data?.error ?? 'Failed to create axis')
      }
    } catch {
      toast.error('Something went wrong')
    } finally {
      setCreatingAxis(false)
    }
  }

  const handleNewSkill = async () => {
    if (!newSkillAxis || !newSkillCode.trim() || !newSkillName.trim()) {
      toast.error('Axis, code, and name are required')
      return
    }
    setCreatingSkill(true)
    try {
      const res = await fetch('/api/skills', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ programId, axisId: newSkillAxis, code: newSkillCode.trim(), name: newSkillName.trim() }),
      })
      if (res.ok) {
        toast.success('Skill created')
        setNewSkillAxis('')
        setNewSkillCode('')
        setNewSkillName('')
        fetchProgram()
      } else {
        const data = await res.json().catch(() => null)
        toast.error(data?.error ?? 'Failed to create skill')
      }
    } catch {
      toast.error('Something went wrong')
    } finally {
      setCreatingSkill(false)
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

  if (!program) {
    return (
      <div className="text-center py-20 text-muted-foreground">
        <p>Program not found.</p>
        <Link href="/admin/programs" className="text-primary underline mt-2 inline-block">Back to programs</Link>
      </div>
    )
  }

  const { axes, skills, programInstances } = program

  return (
    <div className="space-y-6">
      {/* Back link */}
      <Link
        href="/admin/programs"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Programs
      </Link>

      {/* ── Header Card ── */}
      <Card>
        <CardContent className="py-5">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h1 className="font-display text-xl font-semibold tracking-tight">
                  {program.name}
                </h1>
                <p className="text-sm text-muted-foreground mt-0.5">
                  <span className="font-mono">{program.code}</span>
                  <span className="mx-2">·</span>
                  {program.vertical}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <select
                className="rounded-md border border-input bg-background px-2 py-1 text-xs font-medium"
                value={program.status}
                disabled={updatingProgramStatus}
                onChange={(e) => handleProgramStatusChange(e.target.value)}
              >
                <option value="active">active</option>
                <option value="inactive">inactive</option>
                <option value="archived">archived</option>
              </select>
              <span className="text-sm text-muted-foreground flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" /> {fmt(program.createdAt)}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* ── Axes ── */}
      <section>
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-display text-lg font-semibold tracking-tight flex items-center gap-2">
            <Layers className="w-5 h-5 text-primary" /> Axes
            <span className="text-sm font-normal text-muted-foreground">({axes.length})</span>
          </h2>
          <div className="flex items-center gap-2">
            <input
              className="rounded-md border border-input bg-background px-2 py-1 text-xs w-20"
              placeholder="Code…"
              value={newAxisCode}
              onChange={(e) => setNewAxisCode(e.target.value)}
            />
            <input
              className="rounded-md border border-input bg-background px-2 py-1 text-xs w-36"
              placeholder="Name…"
              value={newAxisName}
              onChange={(e) => setNewAxisName(e.target.value)}
            />
            <input
              className="rounded-md border border-input bg-background px-2 py-1 text-xs w-14"
              type="number"
              placeholder="Order"
              value={newAxisOrder}
              onChange={(e) => setNewAxisOrder(e.target.value)}
            />
            <Button size="sm" onClick={handleNewAxis} disabled={!newAxisCode.trim() || !newAxisName.trim() || creatingAxis}>
              {creatingAxis ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Plus className="mr-2 h-4 w-4" />}
              New Axis
            </Button>
          </div>
        </div>
        {axes.length === 0 ? (
          <Card><CardContent className="py-8 text-center text-sm text-muted-foreground">No axes for this program.</CardContent></Card>
        ) : (
          <div className="grid gap-2">
            {axes.map((a) => (
              <Card key={a.id} className="hover:shadow-sm transition-shadow">
                <CardContent className="py-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <select
                        className="rounded-md border border-input bg-background px-2 py-1 text-xs font-medium"
                        value={a.status}
                        disabled={updatingAxisStatus === a.id}
                        onChange={(e) => handleAxisStatusChange(a.id, e.target.value)}
                      >
                        <option value="active">active</option>
                        <option value="inactive">inactive</option>
                      </select>
                      <div>
                        <p className="text-sm font-medium">{a.name}</p>
                        <p className="text-xs text-muted-foreground font-mono">{a.code}</p>
                      </div>
                    </div>
                    <div className="text-xs text-muted-foreground flex items-center gap-1">
                      <Zap className="w-3 h-3" /> {a._count.skills} skill{a._count.skills !== 1 ? 's' : ''}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </section>

      {/* ── Skills ── */}
      <section>
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-display text-lg font-semibold tracking-tight flex items-center gap-2">
            <Zap className="w-5 h-5 text-primary" /> Skills
            <span className="text-sm font-normal text-muted-foreground">({skills.length})</span>
          </h2>
          <div className="flex items-center gap-2">
            <select
              className="rounded-md border border-input bg-background px-2 py-1 text-xs h-[26px]"
              value={newSkillAxis}
              onChange={(e) => setNewSkillAxis(e.target.value)}
            >
              <option value="">— Axis —</option>
              {axes.map((a) => (
                <option key={a.id} value={a.id}>{a.name}</option>
              ))}
            </select>
            <input
              className="rounded-md border border-input bg-background px-2 py-1 text-xs w-20"
              placeholder="Code…"
              value={newSkillCode}
              onChange={(e) => setNewSkillCode(e.target.value)}
            />
            <input
              className="rounded-md border border-input bg-background px-2 py-1 text-xs w-36"
              placeholder="Name…"
              value={newSkillName}
              onChange={(e) => setNewSkillName(e.target.value)}
            />
            <Button size="sm" onClick={handleNewSkill} disabled={!newSkillAxis || !newSkillCode.trim() || !newSkillName.trim() || creatingSkill}>
              {creatingSkill ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Plus className="mr-2 h-4 w-4" />}
              New Skill
            </Button>
          </div>
        </div>
        {skills.length === 0 ? (
          <Card><CardContent className="py-8 text-center text-sm text-muted-foreground">No skills for this program.</CardContent></Card>
        ) : (
          <div className="grid gap-2">
            {skills.map((s) => (
              <Card key={s.id} className="hover:shadow-sm transition-shadow">
                <CardContent className="py-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <select
                        className="rounded-md border border-input bg-background px-2 py-1 text-xs font-medium"
                        value={s.status}
                        disabled={updatingSkillStatus === s.id}
                        onChange={(e) => handleSkillStatusChange(s.id, e.target.value)}
                      >
                        <option value="active">active</option>
                        <option value="inactive">inactive</option>
                      </select>
                      <div>
                        <p className="text-sm font-medium">{s.name}</p>
                        <p className="text-xs text-muted-foreground">
                          <span className="font-mono">{s.code}</span>
                          <span className="mx-1">·</span>
                          {s.axis.name}
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </section>

      {/* ── Enrollments ── */}
      <section>
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <h2 className="font-display text-lg font-semibold tracking-tight flex items-center gap-2">
            <Link2 className="w-5 h-5 text-primary" /> Enrollments
            <span className="text-sm font-normal text-muted-foreground">({programInstances.length})</span>
          </h2>
          <div className="ml-auto flex items-center gap-2">
            <select
              value={selectedStudent}
              onChange={(e) => setSelectedStudent(e.target.value)}
              className="h-8 rounded-md border border-input bg-background px-2 text-sm"
            >
              <option value="">— Student —</option>
              {students.map((s) => (
                <option key={s.id} value={s.id}>{s.firstName} {s.lastName}</option>
              ))}
            </select>
            <Button
              size="sm"
              onClick={handleEnroll}
              disabled={!selectedStudent || enrolling}
            >
              {enrolling ? <Loader2 className="w-4 h-4 animate-spin mr-1" /> : <Plus className="w-4 h-4 mr-1" />}
              Enroll
            </Button>
          </div>
        </div>
        {programInstances.length === 0 ? (
          <Card><CardContent className="py-8 text-center text-sm text-muted-foreground">No enrollments for this program.</CardContent></Card>
        ) : (
          <div className="grid gap-2">
            {programInstances.map((e) => (
              <Card key={e.id} className="hover:shadow-sm transition-shadow">
                <CardContent className="py-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div>
                        <p className="text-sm font-medium flex items-center gap-1">
                          <User className="w-3.5 h-3.5 text-muted-foreground" />
                          {e.student.firstName} {e.student.lastName}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {fmt(e.startedAt)}{e.endedAt ? ` → ${fmt(e.endedAt)}` : ''}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-xs text-muted-foreground text-right flex items-center gap-1">
                        <RefreshCw className="w-3 h-3" /> {e._count.learningCycles} cycle{e._count.learningCycles !== 1 ? 's' : ''}
                      </div>
                      <select
                        className="rounded-md border border-input bg-background px-2 py-1 text-xs font-medium"
                        value={e.status}
                        disabled={updatingEnrollmentStatus === e.id}
                        onChange={(ev) => handleEnrollmentStatusChange(e.id, ev.target.value)}
                      >
                        <option value="active">active</option>
                        <option value="paused">paused</option>
                        <option value="completed">completed</option>
                        <option value="dropped">dropped</option>
                      </select>
                      <Link
                        href={`/admin/instances/${e.id}`}
                        className="inline-flex items-center gap-1 text-xs text-primary hover:underline whitespace-nowrap"
                      >
                        Open enrollment <ExternalLink className="w-3 h-3" />
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </section>
    </div>
  )
}
