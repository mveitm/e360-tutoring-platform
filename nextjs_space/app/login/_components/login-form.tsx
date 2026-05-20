'use client'

import { useState } from 'react'
import Link from 'next/link'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { GraduationCap, Loader2 } from 'lucide-react'

export function LoginForm() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
      })

      if (result?.error) {
        setError('Invalid email or password')
        setLoading(false)
        return
      }

      router.replace('/')
    } catch {
      setError('Something went wrong')
      setLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-md mx-4" style={{ boxShadow: 'var(--shadow-lg)' }}>
      <CardHeader className="text-center space-y-2">
        <div className="mx-auto w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
          <GraduationCap className="w-6 h-6 text-primary" />
        </div>
        <CardTitle className="font-display text-2xl tracking-tight">
          Bexauri
        </CardTitle>
        <CardDescription>
          Ingresa a tu cuenta
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="admin@example.com"
              value={email}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && (
            <p className="text-sm text-destructive">{error}</p>
          )}
          <Button type="submit" className="w-full" disabled={loading}>
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Ingresar
          </Button>
          <p className="text-center text-sm text-muted-foreground">
            No tienes cuenta?{' '}
            <Link href="/signup" className="text-primary underline-offset-4 hover:underline">
              Crea una cuenta estudiante
            </Link>
          </p>
        </form>
      </CardContent>
    </Card>
  )
}
