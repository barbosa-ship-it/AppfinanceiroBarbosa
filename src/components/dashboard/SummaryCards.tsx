import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { TrendingUp, TrendingDown, Wallet } from 'lucide-react'

interface Props {
  receitas: number
  despesas: number
  saldo: number
  loading: boolean
}

function formatBRL(value: number) {
  return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}

export default function SummaryCards({ receitas, despesas, saldo, loading }: Props) {
  const cards = [
    {
      title: 'Receitas',
      value: receitas,
      icon: TrendingUp,
      iconColor: 'text-green-600',
      iconBg: 'bg-green-50',
      valueColor: 'text-green-600',
    },
    {
      title: 'Despesas',
      value: despesas,
      icon: TrendingDown,
      iconColor: 'text-red-500',
      iconBg: 'bg-red-50',
      valueColor: 'text-red-500',
    },
    {
      title: 'Saldo',
      value: saldo,
      icon: Wallet,
      iconColor: saldo >= 0 ? 'text-blue-600' : 'text-orange-500',
      iconBg: saldo >= 0 ? 'bg-blue-50' : 'bg-orange-50',
      valueColor: saldo >= 0 ? 'text-blue-600' : 'text-orange-500',
    },
  ]

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {cards.map(({ title, value, icon: Icon, iconColor, iconBg, valueColor }) => (
        <Card key={title} className="border-slate-100">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-500">{title}</CardTitle>
            <div className={`${iconBg} rounded-lg p-2`}>
              <Icon className={`h-4 w-4 ${iconColor}`} />
            </div>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="h-7 w-32 bg-slate-100 rounded animate-pulse" />
            ) : (
              <p className={`text-2xl font-bold ${valueColor}`}>{formatBRL(value)}</p>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
