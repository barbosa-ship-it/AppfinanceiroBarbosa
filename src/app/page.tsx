import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { TrendingUp, PieChart, FileText, Shield } from 'lucide-react'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <nav className="flex items-center justify-between px-8 py-5 max-w-6xl mx-auto">
        <div className="flex items-center gap-2">
          <TrendingUp className="h-6 w-6 text-blue-600" />
          <span className="font-bold text-xl text-slate-800">FinançasPessoais</span>
        </div>
        <Link href="/login">
          <Button variant="outline">Entrar</Button>
        </Link>
      </nav>

      <main className="flex flex-col items-center text-center px-6 pt-20 pb-32 max-w-4xl mx-auto">
        <span className="inline-block bg-blue-100 text-blue-700 text-sm font-medium px-4 py-1.5 rounded-full mb-6">
          Controle financeiro simples e visual
        </span>
        <h1 className="text-5xl font-bold text-slate-900 leading-tight mb-6">
          Suas finanças sob{' '}
          <span className="text-blue-600">controle</span>
        </h1>
        <p className="text-xl text-slate-500 max-w-2xl mb-10">
          Registre receitas e despesas, visualize seu saldo em tempo real e tome
          decisões financeiras com confiança.
        </p>
        <Link href="/login">
          <Button size="lg" className="text-base px-8 py-6">
            Começar gratuitamente
          </Button>
        </Link>
      </main>

      <section className="max-w-6xl mx-auto px-6 pb-24 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          {
            icon: TrendingUp,
            title: 'Dashboard visual',
            desc: 'Cards com receitas, despesas e saldo do mês',
          },
          {
            icon: PieChart,
            title: 'Gráficos',
            desc: 'Visualize seus gastos por categoria',
          },
          {
            icon: FileText,
            title: 'Exportar CSV',
            desc: 'Exporte suas transações filtradas',
          },
          {
            icon: Shield,
            title: 'Seguro',
            desc: 'Seus dados são privados e protegidos',
          },
        ].map(({ icon: Icon, title, desc }) => (
          <div
            key={title}
            className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100"
          >
            <div className="bg-blue-50 rounded-xl p-3 w-fit mb-4">
              <Icon className="h-5 w-5 text-blue-600" />
            </div>
            <h3 className="font-semibold text-slate-800 mb-1">{title}</h3>
            <p className="text-sm text-slate-500">{desc}</p>
          </div>
        ))}
      </section>
    </div>
  )
}
