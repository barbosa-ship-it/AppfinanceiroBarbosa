'use client'

import { Transaction, TransactionType } from '@/types'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts'

const COLORS = [
  '#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6',
  '#06b6d4', '#f97316', '#84cc16', '#ec4899',
]

interface Props {
  transactions: Transaction[]
  type: TransactionType
  loading: boolean
}

export default function CategoryChart({ transactions, type, loading }: Props) {
  const data = Object.entries(
    transactions
      .filter((t) => t.type === type)
      .reduce<Record<string, number>>((acc, t) => {
        acc[t.category] = (acc[t.category] ?? 0) + Number(t.amount)
        return acc
      }, {})
  )
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value)

  return (
    <Card className="border-slate-100">
      <CardHeader>
        <CardTitle className="text-base font-semibold text-slate-700">
          {type === 'despesa' ? 'Despesas por categoria' : 'Receitas por categoria'}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="h-52 bg-slate-50 rounded-xl animate-pulse" />
        ) : data.length === 0 ? (
          <div className="h-52 flex items-center justify-center text-slate-400 text-sm">
            Nenhum dado para exibir
          </div>
        ) : (
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={55}
                outerRadius={85}
                paddingAngle={3}
                dataKey="value"
              >
                {data.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                formatter={(value) =>
                  typeof value === 'number'
                    ? value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
                    : value
                }
              />
              <Legend
                formatter={(value) => (
                  <span className="text-xs text-slate-600">{value}</span>
                )}
              />
            </PieChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  )
}
