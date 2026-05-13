'use client'

import { useState, useEffect, useCallback } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Users, Loader2, Calendar, Mail, Link2, GraduationCap, ExternalLink, RefreshCw, Plus, Search, KeyRound, Eye, EyeOff, UserPlus } from 'lucide-react'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { toast } from 'sonner'
import Link from 'next/link'

interface EnrollmentItem {
  id: string
  status: string
  startedAt: string | null
  endedAt: string | null
  createdAt: string
  program: { id: string; code: string; name: string }
  _count: { learningCycles: number }
}

interface StudentDetail {
  id: string
  firstName: string
  lastName: string
  email: string
  createdAt: string
  hasUserAccount: boolean
  userAccountEmail: string | null
  programInstances: EnrollmentItem[]
}


export function StudentDetailView() {
  const params = useParams()
  const router = useRouter()
  const studentId = params?.id as string

  const [student, setStudent] = useState<StudentDetail | null>(null)
  const [loading, setLoading] = useState(true)

  /* ── Enrollment search ── */
  const [enrollmentSearch, setEnrollmentSearch] = useState('')

  /* ── Enroll inline controls ── */
  const [programs, setPrograms] = useState<{ id: string; code: string; name: string }[]>([])
  const [selectedProgram, setSelectedProgram] = useState('')
  const [enrolling, setEnrolling] = useState(false)
  const [updatingEnrollmentStatus, setUpdatingEnrollmentStatus] = useState<string | null>(null)

  /* ── Password reset controls ── */
  const [resetPw, setResetPw] = useState('')
  const [resetPwConfirm, setResetPwConfirm] = useState('')
  const [resettingPw, setResettingPw] = useState(false)
  const [showResetPw, setShowResetPw] = useState(false)
  const [showResetPwConfirm, setShowResetPwConfirm] = useState(false)

  /* ── Account creation controls ── */
  const [createPw, setCreatePw] = useState('')
  const [createPwConfirm, setCreatePwConfirm] = useState('')
  const [creatingUser, setCreatingUser] = useState(false)
  const [showCreatePw, setShowCreatePw] = useState(false)
  const [showCreatePwConfirm, setShowCreatePwConfirm] = useState(false)

  const handleCreateUser = async () => {
    if (!createPw || !createPwConfirm) {
      toast.error('Ambos campos son obligatorios.')
      return
    }
    if (createPw.length < 8) {
      toast.error('La contraseña debe tener al menos 8 caracteres.')
      return
    }
    if (createPw !== createPwConfirm) {
      toast.error('Las contraseñas no coinciden.')
      return
    }
    setCreatingUser(true)
    try {
      const res = await fetch(`/api/students/${studentId}/create-user`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: createPw, confirmPassword: createPwConfirm }),
      })
      const data = await res.json().catch(() => null)
      if (!res.ok) {
        throw new Error(data?.error ?? 'Error al crear la cuenta de acceso.')
      }
      toast.success('Cuenta de acceso creada exitosamente.')
      setCreatePw('')
      setCreatePwConfirm('')
      setShowCreatePw(false)
      setShowCreatePwConfirm(false)
      await fetchStudent()
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : 'Error al crear la cuenta de acceso.')
    } finally {
      setCreatingUser(false)
    }
  }

  const handlePasswordReset = async () => {
    if (!resetPw || !resetPwConfirm) {
      toast.error('Ambos campos son obligatorios.')
      return
    }
    if (resetPw.length < 8) {
      toast.error('La contraseña debe tener al menos 8 caracteres.')
      return
    }
    if (resetPw !== resetPwConfirm) {
      toast.error('Las contraseñas no coinciden.')
      return
    }
    setResettingPw(true)
    try {
      const res = await fetch(`/api/students/${studentId}/reset-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: resetPw, confirmPassword: resetPwConfirm }),
      })
      const data = await res.json().catch(() => null)
      if (!res.ok) {
        throw new Error(data?.error ?? 'Error al restablecer la contraseña.')
      }
      toast.success('Contraseña restablecida exitosamente.')
      setResetPw('')
      setResetPwConfirm('')
      setShowResetPw(false)
      setShowResetPwConfirm(false)
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : 'Error al restablecer la contraseña.')
    } finally {
      setResettingPw(false)
    }
  }

  const fetchStudent = useCallback(async () => {
    try {
      const res = await fetch(`/api/students/${studentId}`)
      if (!res.ok) {
        if (res.status === 404) {
          toast.error('Student not found')
          router.push('/admin')
          return
        }
        throw new Error('Failed to fetch')
      }
      setStudent(await res.json())
    } catch (err) {
      console.error('Failed to fetch student', err)
      toast.error('Failed to load student details')
    } finally {
      setLoading(false)
    }
  }, [studentId, router])

  useEffect(() => {
    if (studentId) fetchStudent()
  }, [studentId, fetchStudent])

  /* Fetch programs list for enroll select */
  useEffect(() => {
    fetch('/api/programs')
      .then((r) => r.ok ? r.json() : Promise.reject())
      .then((data: { id: string; code: string; name: string }[]) => setPrograms(data))
      .catch(() => { /* silent – select will simply be empty */ })
  }, [])

  const handleEnroll = async () => {
    if (!selectedProgram || enrolling) return
    setEnrolling(true)
    try {
      const res = await fetch('/api/instances', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ studentId, programId: selectedProgram }),
      })
      if (!res.ok) {
        const body = await res.json().catch(() => null)
        throw new Error(body?.error ?? 'Failed to create enrollment')
      }
      toast.success('Enrollment created')
      setSelectedProgram('')
      await fetchStudent()
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : 'Failed to create enrollment')
    } finally {
      setEnrolling(false)
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
        fetchStudent()
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

  if (!student) {
    return (
      <div className="text-center py-20 text-muted-foreground">
        <p>Student not found.</p>
        <Link href="/admin" className="text-primary underline mt-2 inline-block">Back to students</Link>
      </div>
    )
  }

  const { programInstances } = student

  return (
    <div className="space-y-6">
      {/* Back link */}
      <Link
        href="/admin"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Students
      </Link>

      {/* ── Header Card ── */}
      <Card>
        <CardContent className="py-5">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <Users className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h1 className="font-display text-xl font-semibold tracking-tight">
                  {student.firstName} {student.lastName}
                </h1>
                <p className="text-sm text-muted-foreground mt-0.5 flex items-center gap-1">
                  <Mail className="w-3.5 h-3.5" />
                  {student.email}
                </p>
              </div>
            </div>
            <div className="text-sm text-muted-foreground">
              <p className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" /> Created {fmt(student.createdAt)}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* ── Account Access ── */}
      <Card>
        <CardContent className="py-5">
          <h2 className="font-display text-lg font-semibold tracking-tight flex items-center gap-2 mb-2">
            <UserPlus className="w-5 h-5 text-primary" /> Cuenta de acceso
          </h2>
          <p className="text-sm text-muted-foreground">
            {student.hasUserAccount
              ? `Cuenta creada para ${student.userAccountEmail ?? student.email}.`
              : 'Este estudiante todavía no tiene una cuenta de acceso para iniciar sesión.'}
          </p>
          {!student.hasUserAccount && (
            <div className="mt-4 grid gap-3 max-w-sm">
              <div className="space-y-1.5">
                <Label htmlFor="create-pw" className="text-sm font-medium">Contraseña inicial</Label>
                <div className="relative">
                  <Input
                    id="create-pw"
                    type={showCreatePw ? 'text' : 'password'}
                    placeholder="Mínimo 8 caracteres"
                    value={createPw}
                    onChange={(e) => setCreatePw(e.target.value)}
                    disabled={creatingUser}
                    className="pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowCreatePw(!showCreatePw)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    tabIndex={-1}
                  >
                    {showCreatePw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="create-pw-confirm" className="text-sm font-medium">Confirmar contraseña</Label>
                <div className="relative">
                  <Input
                    id="create-pw-confirm"
                    type={showCreatePwConfirm ? 'text' : 'password'}
                    placeholder="Repetir contraseña"
                    value={createPwConfirm}
                    onChange={(e) => setCreatePwConfirm(e.target.value)}
                    disabled={creatingUser}
                    className="pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowCreatePwConfirm(!showCreatePwConfirm)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    tabIndex={-1}
                  >
                    {showCreatePwConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
              <Button
                size="sm"
                onClick={handleCreateUser}
                disabled={creatingUser || !createPw || !createPwConfirm}
                className="w-fit"
              >
                {creatingUser ? <Loader2 className="w-4 h-4 animate-spin mr-1" /> : <UserPlus className="w-4 h-4 mr-1" />}
                Crear cuenta de acceso
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* ── Password Reset ── */}
      {student.hasUserAccount && (
      <Card>
        <CardContent className="py-5">
          <h2 className="font-display text-lg font-semibold tracking-tight flex items-center gap-2 mb-4">
            <KeyRound className="w-5 h-5 text-primary" /> Restablecer contraseña
          </h2>
          <div className="grid gap-3 max-w-sm">
            <div className="space-y-1.5">
              <Label htmlFor="reset-pw" className="text-sm font-medium">Nueva contraseña</Label>
              <div className="relative">
                <Input
                  id="reset-pw"
                  type={showResetPw ? 'text' : 'password'}
                  placeholder="Mínimo 8 caracteres"
                  value={resetPw}
                  onChange={(e) => setResetPw(e.target.value)}
                  disabled={resettingPw}
                  className="pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowResetPw(!showResetPw)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  tabIndex={-1}
                >
                  {showResetPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="reset-pw-confirm" className="text-sm font-medium">Confirmar contraseña</Label>
              <div className="relative">
                <Input
                  id="reset-pw-confirm"
                  type={showResetPwConfirm ? 'text' : 'password'}
                  placeholder="Repetir contraseña"
                  value={resetPwConfirm}
                  onChange={(e) => setResetPwConfirm(e.target.value)}
                  disabled={resettingPw}
                  className="pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowResetPwConfirm(!showResetPwConfirm)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  tabIndex={-1}
                >
                  {showResetPwConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
            <Button
              size="sm"
              onClick={handlePasswordReset}
              disabled={resettingPw || !resetPw || !resetPwConfirm}
              className="w-fit"
            >
              {resettingPw ? <Loader2 className="w-4 h-4 animate-spin mr-1" /> : <KeyRound className="w-4 h-4 mr-1" />}
              Restablecer contraseña
            </Button>
          </div>
        </CardContent>
      </Card>
      )}

      {/* ── Enrollments ── */}
      <section>
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <h2 className="font-display text-lg font-semibold tracking-tight flex items-center gap-2">
            <Link2 className="w-5 h-5 text-primary" /> Enrollments
            <span className="text-sm font-normal text-muted-foreground">({programInstances.length})</span>
          </h2>
          <div className="ml-auto flex items-center gap-2">
            <select
              value={selectedProgram}
              onChange={(e) => setSelectedProgram(e.target.value)}
              className="h-8 rounded-md border border-input bg-background px-2 text-sm"
            >
              <option value="">— Program —</option>
              {programs.map((p) => (
                <option key={p.id} value={p.id}>{p.code} — {p.name}</option>
              ))}
            </select>
            <Button
              size="sm"
              onClick={handleEnroll}
              disabled={!selectedProgram || enrolling}
            >
              {enrolling ? <Loader2 className="w-4 h-4 animate-spin mr-1" /> : <Plus className="w-4 h-4 mr-1" />}
              Enroll
            </Button>
          </div>
        </div>
        {programInstances.length === 0 ? (
          <Card><CardContent className="py-8 text-center text-sm text-muted-foreground">No enrollments for this student.</CardContent></Card>
        ) : (
          <>
            <div className="relative mb-2">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search by program, status, or date…"
                value={enrollmentSearch}
                onChange={(e) => setEnrollmentSearch(e.target.value)}
                className="pl-9 h-8 text-sm"
              />
            </div>
            {(() => {
              const q = enrollmentSearch.trim().toLowerCase()
              const filtered = programInstances.filter((e) => {
                if (!q) return true
                const progName = e.program.name.toLowerCase()
                const progCode = e.program.code.toLowerCase()
                const status = e.status.toLowerCase()
                const started = fmt(e.startedAt).toLowerCase()
                const ended = e.endedAt ? fmt(e.endedAt).toLowerCase() : ''
                return progName.includes(q) || progCode.includes(q) || status.includes(q) || started.includes(q) || ended.includes(q)
              })
              return (
                <>
                  {q && (
                    <p className="text-sm text-muted-foreground mb-2">Showing {filtered.length} of {programInstances.length}</p>
                  )}
                  {q && filtered.length === 0 ? (
                    <Card>
                      <CardContent className="py-8 text-center">
                        <Search className="w-10 h-10 text-muted-foreground/40 mx-auto mb-2" />
                        <p className="text-sm text-muted-foreground">No enrollments match your search.</p>
                      </CardContent>
                    </Card>
                  ) : (
                    <div className="grid gap-2">
                      {filtered.map((e) => (
                        <Card key={e.id} className="hover:shadow-sm transition-shadow">
                          <CardContent className="py-3">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                <div>
                                  <p className="text-sm font-medium flex items-center gap-1">
                                    <GraduationCap className="w-3.5 h-3.5 text-muted-foreground" />
                                    {e.program.name} <span className="font-mono text-xs text-muted-foreground">({e.program.code})</span>
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
                                  href={`/admin/programs/${e.program.id}`}
                                  className="inline-flex items-center gap-1 text-xs text-primary hover:underline whitespace-nowrap"
                                >
                                  Open program <ExternalLink className="w-3 h-3" />
                                </Link>
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
                </>
              )
            })()}
          </>
        )}
      </section>
    </div>
  )
}
