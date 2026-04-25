'use client'

import { Button } from '@/components/ui/button'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'

interface Props {
  month: number
  year: number
  onChange: (month: number, year: number) => void
}

export default function MonthPicker({ month, year, onChange }: Props) {
  function prev() {
    if (month === 1) onChange(12, year - 1)
    else onChange(month - 1, year)
  }

  function next() {
    const now = new Date()
    if (year > now.getFullYear() || (year === now.getFullYear() && month >= now.getMonth() + 1))
      return
    if (month === 12) onChange(1, year + 1)
    else onChange(month + 1, year)
  }

  const isCurrentMonth =
    month === new Date().getMonth() + 1 && year === new Date().getFullYear()

  return (
    <div className="flex items-center gap-1 bg-white border border-slate-200 rounded-xl px-2 py-1.5">
      <Button variant="ghost" size="icon" className="h-7 w-7" onClick={prev}>
        <ChevronLeft className="h-4 w-4" />
      </Button>
      <span className="text-sm font-medium text-slate-700 min-w-[120px] text-center capitalize">
        {format(new Date(year, month - 1), 'MMMM yyyy', { locale: ptBR })}
      </span>
      <Button
        variant="ghost"
        size="icon"
        className="h-7 w-7"
        onClick={next}
        disabled={isCurrentMonth}
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  )
}
