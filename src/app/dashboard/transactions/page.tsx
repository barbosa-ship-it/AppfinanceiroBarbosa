'use client'

export const dynamic = 'force-dynamic'

import { useEffect, useState, useCallback } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Transaction } from '@/types'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import TransactionDialog from '@/components/transactions/TransactionDialog'
import TransactionFilters from '@/components/transactions/TransactionFilters'
import TransactionTable from '@/components/transactions/TransactionTable'
import ExportButton from '@/components/transactions/ExportButton'

export default function TransactionsPage() {
  const supabase = createClient()
  const now = new Date()
  const [month, setMonth] = useState(now.getMonth() + 1)
  const [year, setYear] = useState(now.getFullYear())
  const [category, setCategory] = useState('all')
  const [search, setSearch] = useState('')
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [loading, setLoading] = useState(true)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editingTransaction, setEditingTransaction] = useState<Transaction | null>(null)

  const fetchTransactions = useCallback(async () => {
    setLoading(true)
    const {
      data: { user },
    } = await supabase.auth.getUser()
    if (!user) return

    const startDate = `${year}-${String(month).padStart(2, '0')}-01`
    const endDate = new Date(year, month, 0).toISOString().split('T')[0]

    let query = supabase
      .from('transactions')
      .select('*')
      .eq('user_id', user.id)
      .gte('date', startDate)
      .lte('date', endDate)
      .order('date', { ascending: false })

    if (category !== 'all') query = query.eq('category', category)
    if (search) query = query.ilike('description', `%${search}%`)

    const { data } = await query
    setTransactions(data ?? [])
    setLoading(false)
  }, [month, year, category, search, supabase])

  useEffect(() => {
    fetchTransactions()
  }, [fetchTransactions])

  function handleEdit(t: Transaction) {
    setEditingTransaction(t)
    setDialogOpen(true)
  }

  function handleAdd() {
    setEditingTransaction(null)
    setDialogOpen(true)
  }

  async function handleDelete(id: string) {
    await supabase.from('transactions').delete().eq('id', id)
    fetchTransactions()
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <h1 className="text-2xl font-bold text-slate-800">Transações</h1>
        <div className="flex items-center gap-2">
          <ExportButton transactions={transactions} />
          <Button onClick={handleAdd} className="gap-2">
            <Plus className="h-4 w-4" />
            Nova transação
          </Button>
        </div>
      </div>

      <TransactionFilters
        month={month}
        year={year}
        category={category}
        search={search}
        onMonthChange={(m, y) => {
          setMonth(m)
          setYear(y)
        }}
        onCategoryChange={(v) => setCategory(v ?? 'all')}
        onSearchChange={setSearch}
      />

      <TransactionTable
        transactions={transactions}
        loading={loading}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <TransactionDialog
        open={dialogOpen}
        onOpenChange={(open) => {
          setDialogOpen(open)
          if (!open) setEditingTransaction(null)
        }}
        transaction={editingTransaction}
        onSuccess={fetchTransactions}
      />
    </div>
  )
}
