'use client'

import { Transaction } from '@/types'
import { format } from 'date-fns'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Pencil, Trash2 } from 'lucide-react'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'

interface Props {
  transactions: Transaction[]
  loading: boolean
  onEdit: (t: Transaction) => void
  onDelete: (id: string) => void
}

function formatBRL(v: number) {
  return v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}

export default function TransactionTable({ transactions, loading, onEdit, onDelete }: Props) {
  if (loading) {
    return (
      <div className="bg-white rounded-2xl border border-slate-100 p-6 space-y-3">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="h-12 bg-slate-100 rounded-lg animate-pulse" />
        ))}
      </div>
    )
  }

  if (transactions.length === 0) {
    return (
      <div className="bg-white rounded-2xl border border-slate-100 p-12 text-center">
        <p className="text-slate-400 text-sm">Nenhuma transação encontrada</p>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-100 bg-slate-50">
              <th className="text-left px-4 py-3 text-xs font-medium text-slate-500 uppercase tracking-wide">
                Data
              </th>
              <th className="text-left px-4 py-3 text-xs font-medium text-slate-500 uppercase tracking-wide">
                Descrição
              </th>
              <th className="text-left px-4 py-3 text-xs font-medium text-slate-500 uppercase tracking-wide">
                Categoria
              </th>
              <th className="text-left px-4 py-3 text-xs font-medium text-slate-500 uppercase tracking-wide">
                Tipo
              </th>
              <th className="text-right px-4 py-3 text-xs font-medium text-slate-500 uppercase tracking-wide">
                Valor
              </th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody>
            {transactions.map((t) => (
              <tr
                key={t.id}
                className="border-b border-slate-50 last:border-0 hover:bg-slate-50 transition-colors"
              >
                <td className="px-4 py-3 text-sm text-slate-500 whitespace-nowrap">
                  {format(new Date(t.date + 'T12:00:00'), 'dd/MM/yyyy')}
                </td>
                <td className="px-4 py-3 text-sm font-medium text-slate-700">
                  {t.description}
                </td>
                <td className="px-4 py-3">
                  <Badge variant="secondary" className="text-xs">
                    {t.category}
                  </Badge>
                </td>
                <td className="px-4 py-3">
                  <Badge
                    className={`text-xs ${
                      t.type === 'receita'
                        ? 'bg-green-100 text-green-700 hover:bg-green-100'
                        : 'bg-red-100 text-red-600 hover:bg-red-100'
                    }`}
                  >
                    {t.type === 'receita' ? 'Receita' : 'Despesa'}
                  </Badge>
                </td>
                <td
                  className={`px-4 py-3 text-sm font-semibold text-right whitespace-nowrap ${
                    t.type === 'receita' ? 'text-green-600' : 'text-red-500'
                  }`}
                >
                  {t.type === 'receita' ? '+' : '-'} {formatBRL(Number(t.amount))}
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-1 justify-end">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7 text-slate-400 hover:text-blue-600"
                      onClick={() => onEdit(t)}
                    >
                      <Pencil className="h-3.5 w-3.5" />
                    </Button>
                    <AlertDialog>
                      <AlertDialogTrigger>
                        <span className="inline-flex items-center justify-center h-7 w-7 rounded-md text-slate-400 hover:text-red-500 hover:bg-accent cursor-pointer">
                          <Trash2 className="h-3.5 w-3.5" />
                        </span>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Excluir transação?</AlertDialogTitle>
                          <AlertDialogDescription>
                            Esta ação não pode ser desfeita.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancelar</AlertDialogCancel>
                          <AlertDialogAction
                            className="bg-red-500 hover:bg-red-600"
                            onClick={() => onDelete(t.id)}
                          >
                            Excluir
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
