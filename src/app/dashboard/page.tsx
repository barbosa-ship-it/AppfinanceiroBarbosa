'use client'

import { useEffect, useState, useCallback } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Transaction } from '@/types'
import SummaryCards from '@/components/dashboard/SummaryCards'
import CategoryChart from '@/components/dashboard/CategoryChart'
import MonthPicker from '@/components/dashboard/MonthPicker'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'

export default function DashboardPage() {
  const supabase = createClient()
  const now = new Date()
  const [month, setMonth] = useState(now.getMonth() + 1)
  const [year, setYear] = useState(now.getFullYear())
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [loading, setLoading] = useState(true)

  const fetchTransactions = useCallback(async () => {
    setLoading(true)
    const {
      data: { user },
    } = await supabase.auth.getUser()
    if (!user) return

    const startDate = `${year}-${String(month).padStart(2, '0')}-01`
    const endDate = new Date(year, month, 0).toISOString().split('T')[0]

    const { data } = await supabase
      .from('transactions')
      .select('*')
      .eq('user_id', user.id)
      .gte('date', startDate)
      .lte('date', endDate)
      .order('date', { ascending: false })

    setTransactions(data ?? [])
    setLoading(false)
  }, [month, year, supabase])

  useEffect(() => {
    fetchTransactions()
  }, [fetchTransactions])

  const totalReceitas = transactions
    .filter((t) => t.type === 'receita')
    .reduce((sum, t) => sum + Number(t.amount), 0)

  const totalDespesas = transactions
    .filter((t) => t.type === 'despesa')
    .reduce((sum, t) => sum + Number(t.amount), 0)

  const saldo = totalReceitas - totalDespesas

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Dashboard</h1>
          <p className="text-slate-500 text-sm capitalize">
            {format(new Date(year, month - 1), 'MMMM yyyy', { locale: ptBR })}
          </p>
        </div>
        <MonthPicker
          month={month}
          year={year}
          onChange={(m, y) => {
            setMonth(m)
            setYear(y)
          }}
        />
      </div>

      <SummaryCards
        receitas={totalReceitas}
        despesas={totalDespesas}
        saldo={saldo}
        loading={loading}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <CategoryChart transactions={transactions} type="despesa" loading={loading} />
        <CategoryChart transactions={transactions} type="receita" loading={loading} />
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 p-6">
        <h2 className="font-semibold text-slate-800 mb-4">Transações recentes</h2>
        {loading ? (
          <div className="space-y-3">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-10 bg-slate-100 rounded-lg animate-pulse" />
            ))}
          </div>
        ) : transactions.length === 0 ? (
          <p className="text-slate-400 text-sm text-center py-8">
            Nenhuma transação neste período
          </p>
        ) : (
          <div className="space-y-1">
            {transactions.slice(0, 5).map((t) => (
              <div
                key={t.id}
                className="flex items-center justify-between py-2.5 border-b border-slate-50 last:border-0"
              >
                <div>
                  <p className="text-sm font-medium text-slate-700">{t.description}</p>
                  <p className="text-xs text-slate-400">
                    {t.category} ·{' '}
                    {format(new Date(t.date + 'T12:00:00'), 'dd/MM/yyyy')}
                  </p>
                </div>
                <span
                  className={`text-sm font-semibold ${
                    t.type === 'receita' ? 'text-green-600' : 'text-red-500'
                  }`}
                >
                  {t.type === 'receita' ? '+' : '-'} R${' '}
                  {Number(t.amount).toFixed(2).replace('.', ',')}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
