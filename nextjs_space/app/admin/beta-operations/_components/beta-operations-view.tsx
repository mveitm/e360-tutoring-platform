'use client'

import Link from 'next/link'
import {
  Users,
  RefreshCw,
  Clock,
  PlayCircle,
  CheckCircle2,
  AlertTriangle,
  ExternalLink,
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

/* ---- Types ---- */
interface Counters {
  activeEnrollments: number
  openCycles: number
  pendingLoads: number
  inProgressLoads: number
  completedLoads: number
  cyclesReadyForReview: number
}

interface Enrollment {
  id: string
  status: string
  student: { id: string; firstName: string; lastName: string; email: string }
  program: { id: string; code: string; name: string }
  lastActivityAt: string | null
}

interface StudyLoadRow {
  id: string
  title: string
  loadType: string
  status: string
  updatedAt: string
  learningCycle: {
    id: string
    cycleNumber: number
    enrollment: {
      id: string
      student: { id: string; firstName: string; lastName: string }
      program: { code: string }
    }
  }
}

interface CycleRow {
  id: string
  cycleNumber: number
  status: string
  openedAt: string
  enrollment: {
    id: string
    student: { id: string; firstName: string; lastName: string }
    program: { code: string }
  }
  studyLoads: { id: string; status: string; title: string; loadType: string; updatedAt: string }[]
  cycleDecisions: { id: string }[]
}

interface Props {
  counters: Counters
  enrollments: Enrollment[]
  cyclesReadyForReview: CycleRow[]
  inProgressLoads: StudyLoadRow[]
  pendingLoads: StudyLoadRow[]
  completedLoads: StudyLoadRow[]
}

/* ---- Helpers ---- */
const statusColor: Record<string, string> = {
  pending: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  in_progress: 'bg-blue-100 text-blue-800 border-blue-200',
  completed: 'bg-green-100 text-green-800 border-green-200',
  open: 'bg-blue-100 text-blue-800 border-blue-200',
}

function StatusBadge({ status }: { status: string }) {
  return (
    <Badge variant="outline" className={statusColor[status] || 'bg-gray-100 text-gray-800'}>
      {status.replace('_', ' ')}
    </Badge>
  )
}

function StudentLabel({ student }: { student: { firstName: string; lastName: string } }) {
  return <span className="font-medium">{student.firstName} {student.lastName}</span>
}

function fmtDate(iso: string | null) {
  if (!iso) return '—'
  return new Date(iso).toLocaleDateString('es-CL', { day: '2-digit', month: 'short' })
}

/* ---- Counter Card ---- */
function CounterCard({ label, value, icon: Icon, accent }: { label: string; value: number; icon: React.ElementType; accent?: string }) {
  return (
    <Card className="flex-1 min-w-[140px]">
      <CardContent className="pt-4 pb-3 px-4 flex items-center gap-3">
        <div className={`rounded-lg p-2 ${accent || 'bg-muted'}`}>
          <Icon className="w-4 h-4" />
        </div>
        <div>
          <p className="text-2xl font-bold leading-none">{value}</p>
          <p className="text-xs text-muted-foreground mt-0.5">{label}</p>
        </div>
      </CardContent>
    </Card>
  )
}

/* ---- Main Component ---- */
export function BetaOperationsView({
  counters,
  enrollments,
  cyclesReadyForReview,
  inProgressLoads,
  pendingLoads,
  completedLoads,
}: Props) {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Operaciones Beta</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Vista operacional de lectura para gestionar la beta PAES con 2–5 estudiantes.
        </p>
      </div>

      {/* A. Overview Counters */}
      <div className="flex flex-wrap gap-3">
        <CounterCard label="Matrículas activas" value={counters.activeEnrollments} icon={Users} accent="bg-blue-50 text-blue-600" />
        <CounterCard label="Ciclos abiertos" value={counters.openCycles} icon={RefreshCw} accent="bg-indigo-50 text-indigo-600" />
        <CounterCard label="Cargas pendientes" value={counters.pendingLoads} icon={Clock} accent="bg-yellow-50 text-yellow-700" />
        <CounterCard label="Cargas en progreso" value={counters.inProgressLoads} icon={PlayCircle} accent="bg-sky-50 text-sky-600" />
        <CounterCard label="Cargas completadas" value={counters.completedLoads} icon={CheckCircle2} accent="bg-green-50 text-green-600" />
        <CounterCard label="Ciclos para revisión" value={counters.cyclesReadyForReview} icon={AlertTriangle} accent="bg-orange-50 text-orange-600" />
      </div>

      {/* B1. Needs Attention / Review */}
      <Section
        title="Necesita atención / revisión"
        description="Ciclos donde todas las cargas están completadas — posiblemente listos para cerrar."
        empty="No hay ciclos pendientes de revisión."
        hasItems={cyclesReadyForReview.length > 0}
      >
        <div className="space-y-2">
          {cyclesReadyForReview.map((c) => (
            <Card key={c.id} className="border-orange-200 bg-orange-50/30">
              <CardContent className="py-3 px-4 flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2 text-sm">
                  <AlertTriangle className="w-4 h-4 text-orange-500 shrink-0" />
                  <StudentLabel student={c.enrollment.student} />
                  <span className="text-muted-foreground">·</span>
                  <span className="text-muted-foreground">{c.enrollment.program.code}</span>
                  <span className="text-muted-foreground">·</span>
                  <span>Ciclo {c.cycleNumber}</span>
                  <StatusBadge status={c.status} />
                  <span className="text-xs text-muted-foreground">
                    {c.studyLoads.length} carga{c.studyLoads.length !== 1 ? 's' : ''} completada{c.studyLoads.length !== 1 ? 's' : ''}
                  </span>
                  {c.cycleDecisions.length > 0 && (
                    <span className="text-xs text-muted-foreground">· {c.cycleDecisions.length} decisión(es)</span>
                  )}
                </div>
                <Link href={`/admin/learning-cycles/${c.id}`} className="text-xs text-primary hover:underline flex items-center gap-1">
                  Ver ciclo <ExternalLink className="w-3 h-3" />
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>

      {/* B2. Currently In Progress */}
      <Section
        title="En progreso"
        description="Cargas de estudio que los estudiantes están trabajando ahora."
        empty="No hay cargas en progreso."
        hasItems={inProgressLoads.length > 0}
      >
        <LoadTable loads={inProgressLoads} />
      </Section>

      {/* B3. Pending Work */}
      <Section
        title="Trabajo pendiente"
        description="Cargas de estudio pendientes, aún no iniciadas."
        empty="No hay cargas pendientes."
        hasItems={pendingLoads.length > 0}
      >
        <LoadTable loads={pendingLoads} />
      </Section>

      {/* B4. Recently Completed */}
      <Section
        title="Completadas recientemente"
        description="Últimas 20 cargas completadas."
        empty="No hay cargas completadas."
        hasItems={completedLoads.length > 0}
      >
        <LoadTable loads={completedLoads} />
      </Section>

      {/* C. Active Enrollments */}
      <Section
        title="Matrículas activas"
        description="Estudiantes con matrícula activa en la beta."
        empty="No hay matrículas activas."
        hasItems={enrollments.length > 0}
      >
        <div className="space-y-2">
          {enrollments.map((e) => (
            <Card key={e.id}>
              <CardContent className="py-3 px-4 flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2 text-sm">
                  <Users className="w-4 h-4 text-muted-foreground shrink-0" />
                  <StudentLabel student={e.student} />
                  <span className="text-muted-foreground">·</span>
                  <span className="text-muted-foreground">{e.program.code}</span>
                  <span className="text-muted-foreground">·</span>
                  <span className="text-xs text-muted-foreground">Última actividad: {fmtDate(e.lastActivityAt)}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Link href={`/admin/students/${e.student.id}`} className="text-xs text-primary hover:underline flex items-center gap-1">
                    Estudiante <ExternalLink className="w-3 h-3" />
                  </Link>
                  <Link href={`/admin/instances/${e.id}`} className="text-xs text-primary hover:underline flex items-center gap-1">
                    Matrícula <ExternalLink className="w-3 h-3" />
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>
    </div>
  )
}

/* ---- Shared Section Wrapper ---- */
function Section({
  title,
  description,
  empty,
  hasItems,
  children,
}: {
  title: string
  description: string
  empty: string
  hasItems: boolean
  children: React.ReactNode
}) {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-base">{title}</CardTitle>
        <p className="text-xs text-muted-foreground">{description}</p>
      </CardHeader>
      <CardContent>
        {hasItems ? children : <p className="text-sm text-muted-foreground italic">{empty}</p>}
      </CardContent>
    </Card>
  )
}

/* ---- Study Load Table ---- */
function LoadTable({ loads }: { loads: StudyLoadRow[] }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b text-left text-xs text-muted-foreground">
            <th className="pb-2 pr-3">Estudiante</th>
            <th className="pb-2 pr-3">Programa</th>
            <th className="pb-2 pr-3">Ciclo</th>
            <th className="pb-2 pr-3">Carga</th>
            <th className="pb-2 pr-3">Tipo</th>
            <th className="pb-2 pr-3">Estado</th>
            <th className="pb-2 pr-3">Actualizado</th>
            <th className="pb-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {loads.map((l) => (
            <tr key={l.id} className="border-b last:border-0 hover:bg-muted/30">
              <td className="py-2 pr-3">
                <Link href={`/admin/students/${l.learningCycle.enrollment.student.id}`} className="text-primary hover:underline">
                  <StudentLabel student={l.learningCycle.enrollment.student} />
                </Link>
              </td>
              <td className="py-2 pr-3 text-muted-foreground">{l.learningCycle.enrollment.program.code}</td>
              <td className="py-2 pr-3">
                <Link href={`/admin/learning-cycles/${l.learningCycle.id}`} className="text-primary hover:underline">
                  #{l.learningCycle.cycleNumber}
                </Link>
              </td>
              <td className="py-2 pr-3 max-w-[200px] truncate" title={l.title}>{l.title}</td>
              <td className="py-2 pr-3 text-muted-foreground">{l.loadType}</td>
              <td className="py-2 pr-3"><StatusBadge status={l.status} /></td>
              <td className="py-2 pr-3 text-muted-foreground text-xs">{fmtDate(l.updatedAt)}</td>
              <td className="py-2">
                <Link href={`/admin/learning-cycles/${l.learningCycle.id}`} className="text-xs text-primary hover:underline flex items-center gap-1">
                  Ver ciclo <ExternalLink className="w-3 h-3" />
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
