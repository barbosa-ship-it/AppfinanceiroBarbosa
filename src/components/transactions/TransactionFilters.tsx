'use client'

import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { CATEGORIES } from '@/types'
import { Search } from 'lucide-react'
import MonthPicker from '@/components/dashboard/MonthPicker'

interface Props {
  month: number
  year: number
  category: string
  search: string
  onMonthChange: (month: number, year: number) => void
  onCategoryChange: (v: string | null) => void
  onSearchChange: (v: string) => void
}

export default function TransactionFilters({
  month,
  year,
  category,
  search,
  onMonthChange,
  onCategoryChange,
  onSearchChange,
}: Props) {
  return (
    <div className="bg-white rounded-2xl border border-slate-100 p-4 flex flex-wrap gap-3 items-center">
      <MonthPicker month={month} year={year} onChange={onMonthChange} />

      <div className="relative flex-1 min-w-[180px]">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
        <Input
          placeholder="Buscar por descrição..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-9"
        />
      </div>

      <Select value={category} onValueChange={onCategoryChange}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Categoria" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Todas as categorias</SelectItem>
          {CATEGORIES.map((cat) => (
            <SelectItem key={cat} value={cat}>
              {cat}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}
