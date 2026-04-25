'use client'

import { Transaction } from '@/types'
import { Button } from '@/components/ui/button'
import { Download } from 'lucide-react'
import { format } from 'date-fns'

interface Props {
  transactions: Transaction[]
}

export default function ExportButton({ transactions }: Props) {
  function exportCSV() {
    const headers = ['Data', 'Descrição', 'Categoria', 'Tipo', 'Valor']
    const rows = transactions.map((t) => [
      format(new Date(t.date + 'T12:00:00'), 'dd/MM/yyyy'),
      `"${t.description.replace(/"/g, '""')}"`,
      t.category,
      t.type === 'receita' ? 'Receita' : 'Despesa',
      Number(t.amount).toFixed(2).replace('.', ','),
    ])

    const csv = [headers, ...rows].map((r) => r.join(';')).join('\n')
    const blob = new Blob(['﻿' + csv], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `transacoes-${format(new Date(), 'yyyy-MM')}.csv`
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <Button
      variant="outline"
      onClick={exportCSV}
      disabled={transactions.length === 0}
      className="gap-2"
    >
      <Download className="h-4 w-4" />
      Exportar CSV
    </Button>
  )
}
