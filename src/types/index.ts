export type TransactionType = 'receita' | 'despesa'

export const CATEGORIES = [
  'Alimentação',
  'Transporte',
  'Moradia',
  'Lazer',
  'Saúde',
  'Educação',
  'Salário',
  'Freelance',
  'Outros',
] as const

export type Category = (typeof CATEGORIES)[number]

export interface Transaction {
  id: string
  user_id: string
  description: string
  amount: number
  date: string
  type: TransactionType
  category: string
  created_at: string
}
