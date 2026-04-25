'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { TrendingUp, LayoutDashboard, List, LogOut } from 'lucide-react'
import { cn } from '@/lib/utils'

export default function Navbar() {
  const pathname = usePathname()
  const router = useRouter()

  async function signOut() {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/login')
    router.refresh()
  }

  return (
    <nav className="bg-white border-b border-slate-100 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto flex items-center justify-between h-16">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-blue-600" />
            <span className="font-bold text-slate-800 hidden sm:block">FinançasPessoais</span>
          </div>
          <div className="flex items-center gap-1">
            <Link href="/dashboard">
              <Button
                variant="ghost"
                size="sm"
                className={cn('gap-2', pathname === '/dashboard' && 'bg-blue-50 text-blue-700')}
              >
                <LayoutDashboard className="h-4 w-4" />
                <span className="hidden sm:block">Dashboard</span>
              </Button>
            </Link>
            <Link href="/dashboard/transactions">
              <Button
                variant="ghost"
                size="sm"
                className={cn(
                  'gap-2',
                  pathname === '/dashboard/transactions' && 'bg-blue-50 text-blue-700'
                )}
              >
                <List className="h-4 w-4" />
                <span className="hidden sm:block">Transações</span>
              </Button>
            </Link>
          </div>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={signOut}
          className="gap-2 text-slate-500 hover:text-red-500"
        >
          <LogOut className="h-4 w-4" />
          <span className="hidden sm:block">Sair</span>
        </Button>
      </div>
    </nav>
  )
}
