import type { Metadata } from 'next'
import { Geist } from 'next/font/google'
import './globals.css'

const geist = Geist({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'FinançasPessoais — Controle financeiro simples',
  description:
    'Registre receitas e despesas, visualize seu saldo e tome decisões financeiras com confiança.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={geist.className}>
      <body className="min-h-screen antialiased">{children}</body>
    </html>
  )
}
