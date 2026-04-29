'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { signOut } from 'next-auth/react'
import { GraduationCap, Users, BookOpen, Link2, Layers, Zap, BarChart3, RefreshCw, GitBranch, FileBox, ClipboardCheck, Activity, LogOut } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const navGroups = [
  {
    label: 'Core',
    items: [
      { href: '/admin', label: 'Students', icon: Users },
      { href: '/admin/programs', label: 'Programs', icon: BookOpen },
      { href: '/admin/instances', label: 'Enrollments', icon: Link2 },
    ],
  },
  {
    label: 'Pedagogy',
    items: [
      { href: '/admin/axes', label: 'Axes', icon: Layers },
      { href: '/admin/skills', label: 'Skills', icon: Zap },
      { href: '/admin/skill-states', label: 'States', icon: BarChart3 },
    ],
  },
  {
    label: 'Cycles',
    items: [
      { href: '/admin/learning-cycles', label: 'Cycles', icon: RefreshCw },
      { href: '/admin/cycle-decisions', label: 'Decisions', icon: GitBranch },
      { href: '/admin/study-loads', label: 'Loads', icon: FileBox },
      { href: '/admin/cycle-evaluations', label: 'Evals', icon: ClipboardCheck },
    ],
  },
  {
    label: 'Ops',
    items: [
      { href: '/admin/beta-operations', label: 'Beta Ops', icon: Activity },
    ],
  },
]

export function AdminNav() {
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="max-w-[1200px] mx-auto px-4 flex items-center justify-between h-14">
        <div className="flex items-center gap-6">
          <Link href="/admin" className="flex items-center gap-2 shrink-0">
            <GraduationCap className="w-5 h-5 text-primary" />
            <span className="font-display font-semibold text-lg tracking-tight">Admin</span>
          </Link>
          <nav className="flex items-center gap-3 overflow-x-auto">
            {navGroups.map((group) => (
              <div key={group.label} className="flex items-center gap-0.5">
                <span className="text-[10px] uppercase tracking-wider text-muted-foreground/60 font-medium mr-1 hidden sm:inline">{group.label}</span>
                {group.items.map((item) => {
                  const Icon = item.icon
                  const isActive = pathname === item.href ||
                    (item.href !== '/admin' && pathname?.startsWith(item.href))
                  return (
                    <Link key={item.href} href={item.href}>
                      <Button
                        variant={isActive ? 'secondary' : 'ghost'}
                        size="sm"
                        className={cn('gap-1.5 h-8 px-2.5 text-xs', isActive && 'bg-primary/10 text-primary')}
                      >
                        <Icon className="w-3.5 h-3.5" />
                        {item.label}
                      </Button>
                    </Link>
                  )
                })}
              </div>
            ))}
          </nav>
        </div>
        <Button
          variant="ghost"
          size="sm"
          className="gap-2 text-muted-foreground shrink-0"
          onClick={() => signOut({ callbackUrl: '/login' })}
        >
          <LogOut className="w-4 h-4" />
          <span className="hidden sm:inline">Sign Out</span>
        </Button>
      </div>
    </header>
  )
}
