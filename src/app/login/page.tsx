'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { TrendingUp, MailCheck } from 'lucide-react'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isSignUp, setIsSignUp] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [confirmEmail, setConfirmEmail] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')

    const supabase = createClient()

    let result
    if (isSignUp) {
      result = await supabase.auth.signUp({ email, password })
    } else {
      result = await supabase.auth.signInWithPassword({ email, password })
    }

    if (result.error) {
      setError(result.error.message)
    } else if (isSignUp && !result.data.session) {
      setConfirmEmail(email)
    } else {
      router.push('/dashboard')
      router.refresh()
    }
    setLoading(false)
  }

  if (confirmEmail) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8 w-full max-w-md text-center">
          <div className="flex items-center gap-2 mb-8 justify-center">
            <TrendingUp className="h-6 w-6 text-blue-600" />
            <span className="font-bold text-xl text-slate-800">FinançasPessoais</span>
          </div>

          <div className="bg-blue-50 rounded-2xl p-5 mb-6 flex justify-center">
            <MailCheck className="h-12 w-12 text-blue-500" />
          </div>

          <h2 className="text-2xl font-bold text-slate-800 mb-2">Confirme seu e-mail</h2>
          <p className="text-slate-500 text-sm mb-2">
            Enviamos um link de confirmação para:
          </p>
          <p className="font-semibold text-slate-700 mb-6">{confirmEmail}</p>
          <p className="text-slate-400 text-sm mb-8">
            Clique no link do e-mail para ativar sua conta e depois volte aqui para entrar.
          </p>

          <Button
            variant="outline"
            className="w-full"
            onClick={() => {
              setConfirmEmail('')
              setIsSignUp(false)
              setPassword('')
            }}
          >
            Já confirmei — fazer login
          </Button>

          <p className="text-xs text-slate-400 mt-4">
            Não recebeu? Verifique a caixa de spam.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8 w-full max-w-md">
        <div className="flex items-center gap-2 mb-8">
          <TrendingUp className="h-6 w-6 text-blue-600" />
          <span className="font-bold text-xl text-slate-800">FinançasPessoais</span>
        </div>

        <h2 className="text-2xl font-bold text-slate-800 mb-1">
          {isSignUp ? 'Criar conta' : 'Bem-vindo de volta'}
        </h2>
        <p className="text-slate-500 mb-6 text-sm">
          {isSignUp
            ? 'Comece a controlar suas finanças hoje'
            : 'Entre para acessar seu dashboard'}
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="email">E-mail</Label>
            <Input
              id="email"
              type="email"
              placeholder="seu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="password">Senha</Label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
            />
          </div>

          {error && (
            <p className="text-sm text-red-500 bg-red-50 rounded-lg px-3 py-2">{error}</p>
          )}

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? 'Aguarde...' : isSignUp ? 'Criar conta' : 'Entrar'}
          </Button>
        </form>

        <p className="text-center text-sm text-slate-500 mt-6">
          {isSignUp ? 'Já tem conta?' : 'Não tem conta?'}{' '}
          <button
            onClick={() => setIsSignUp(!isSignUp)}
            className="text-blue-600 font-medium hover:underline"
          >
            {isSignUp ? 'Entrar' : 'Criar conta'}
          </button>
        </p>

        <div className="mt-4 text-center">
          <Link href="/" className="text-sm text-slate-400 hover:text-slate-600">
            ← Voltar ao início
          </Link>
        </div>
      </div>
    </div>
  )
}
