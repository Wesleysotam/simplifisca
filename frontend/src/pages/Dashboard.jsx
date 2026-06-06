import React from 'react';
import { Bell, Info, Calendar, Lightbulb, LayoutGrid, BarChart2, FileText, Settings, ShoppingBag, Factory, Briefcase } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

function Dashboard() {
  const chartData = [
    { name: 'Comércio', value: 2125, color: '#9EE3FF' }, // cyan
    { name: 'Indústria', value: 1445, color: '#FFD6F9' }, // pink
    { name: 'Serviços', value: 680, color: '#E0D4FF' }, // purple
  ];

  return (
    <div className="min-h-screen bg-bg-main font-sans pb-28 pt-8 px-6 sm:px-8 max-w-md mx-auto relative shadow-2xl overflow-x-hidden">

      {/* HEADER */}
      <header className="flex justify-between items-center mb-8">
        <div className="flex items-center space-x-3">
          <img src="https://i.pravatar.cc/150?img=11" alt="Profile" className="w-12 h-12 rounded-full object-cover" />
          <div className="flex flex-col">
            <span className="text-text-secondary text-sm font-medium">Olá,</span>
            <span className="text-dark font-bold text-lg leading-tight">Elineuton Pinheiro</span>
          </div>
        </div>
        <button className="w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center shadow-md">
          <Bell size={20} />
        </button>
      </header>

      {/* MINHAS DECLARACOES */}
      <section className="mb-8">
        <div className="flex justify-between items-end mb-4">
          <h2 className="text-dark font-bold text-lg">Minhas Declarações</h2>
          <button className="text-text-secondary text-xs font-bold border-b border-highlight pb-0.5 hover:text-dark">Ver todas</button>
        </div>
        <div className="bg-white rounded-3xl p-5 shadow-sm">
          <div className="flex justify-between items-start mb-1">
            <h3 className="text-dark font-bold text-base">Ano-Calendário 2024</h3>
            <Info size={18} className="text-gray-300" />
          </div>
          <p className="text-text-secondary text-[10px] mb-4">1 de 12 meses concluído</p>
          <div className="flex justify-between items-end">
            <span className="text-dark font-semibold text-2xl">R$ 4.250,00</span>
            <button className="text-dark font-bold text-sm hover:underline">Continuar</button>
          </div>
        </div>
      </section>

      {/* É BOM LEMBRAR */}
      <section className="mb-8">
        <div className="flex justify-between items-end mb-4">
          <h2 className="text-dark font-bold text-lg">É Bom Lembrar</h2>
          <button className="text-text-secondary text-xs font-bold border-b border-highlight pb-0.5 hover:text-dark">Ver todos</button>
        </div>
        <div className="space-y-3">
          <div className="bg-white rounded-3xl p-4 shadow-sm flex items-center space-x-4">
            <div className="w-10 h-10 bg-[#EDFEE8] rounded-full flex-shrink-0 flex items-center justify-center text-[#74C355]">
              <Calendar size={20} />
            </div>
            <p className="text-dark text-sm font-medium leading-snug">
              Faltam 20 dias para o prazo final de entrega da Declaração 2024!
            </p>
          </div>
          <div className="bg-white rounded-3xl p-4 shadow-sm flex items-center space-x-4">
            <div className="w-10 h-10 bg-[#EDFEE8] rounded-full flex-shrink-0 flex items-center justify-center text-[#74C355]">
              <FileText size={20} />
            </div>
            <p className="text-dark text-sm font-medium leading-snug">
              Você ainda não lançou receitas para outubro de 2024.
            </p>
          </div>
        </div>
      </section>

      {/* ULTIMOS LANCAMENTOS */}
      <section className="mb-8">
        <div className="flex justify-between items-end mb-4">
          <h2 className="text-dark font-bold text-lg">Últimos Lançamentos</h2>
          <button className="text-text-secondary text-xs font-bold border-b border-highlight pb-0.5 hover:text-dark">Ver todos</button>
        </div>
        <div className="space-y-3">

          <div className="bg-white rounded-3xl p-4 shadow-sm flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-[#E0F7FF] rounded-full flex-shrink-0 flex items-center justify-center text-[#38B6FF]">
                <ShoppingBag size={18} />
              </div>
              <div className="flex flex-col">
                <span className="text-dark font-semibold text-sm">R$ 1000,00</span>
                <span className="text-text-secondary text-xs">Comércio</span>
              </div>
            </div>
            <div className="flex flex-col items-end text-right">
              <span className="text-dark font-medium text-xs">25 de mai</span>
              <span className="text-text-secondary text-[10px]">08:25</span>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-4 shadow-sm flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-[#F4E6FF] rounded-full flex-shrink-0 flex items-center justify-center text-[#9747FF]">
                <Factory size={18} />
              </div>
              <div className="flex flex-col">
                <span className="text-dark font-semibold text-sm">R$ 1000,00</span>
                <span className="text-text-secondary text-xs">Indústria</span>
              </div>
            </div>
            <div className="flex flex-col items-end text-right">
              <span className="text-dark font-medium text-xs">25 de mai</span>
              <span className="text-text-secondary text-[10px]">08:25</span>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-4 shadow-sm flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-[#FFE6F2] rounded-full flex-shrink-0 flex items-center justify-center text-[#FF5CB2]">
                <Briefcase size={18} />
              </div>
              <div className="flex flex-col">
                <span className="text-dark font-semibold text-sm">R$ 1000,00</span>
                <span className="text-text-secondary text-xs">Serviços</span>
              </div>
            </div>
            <div className="flex flex-col items-end text-right">
              <span className="text-dark font-medium text-xs">25 de mai</span>
              <span className="text-text-secondary text-[10px]">08:25</span>
            </div>
          </div>

        </div>
      </section>

      {/* RESUMO DO ANO */}
      <section className="mb-8">
        <h2 className="text-dark font-bold text-lg mb-4">Resumo do Ano-Calendário</h2>
        <div className="bg-white rounded-[2rem] p-6 shadow-sm flex flex-col items-center">
          <h3 className="text-text-secondary font-medium text-sm self-start mb-2">Receitas Distribuídas</h3>

          <div className="relative w-full h-56 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  stroke="none"
                  paddingAngle={0}
                  dataKey="value"
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            {/* Center Text */}
            <div className="absolute flex flex-col items-center justify-center pointer-events-none">
              <span className="text-text-secondary text-[10px]">Receita Total</span>
              <span className="text-dark font-bold text-sm">R$ 4.250,00</span>
            </div>

            {/* Custom Labels overlay */}
            <span className="absolute left-[15%] top-[50%] text-[8px] font-bold text-dark/70">50%</span>
            <span className="absolute right-[15%] top-[45%] text-[8px] font-bold text-dark/70">34%</span>
            <span className="absolute bottom-[10%] right-[35%] text-[8px] font-bold text-dark/70">16%</span>
          </div>

          <div className="w-full flex justify-between items-center mt-2 px-2">

            <div className="flex flex-col">
              <div className="flex items-center space-x-1.5 mb-0.5">
                <div className="w-2 h-2 rounded-full border-2 border-[#9EE3FF] bg-transparent"></div>
                <span className="text-text-secondary text-[10px]">Comércio</span>
              </div>
              <span className="text-dark font-bold text-xs pl-3.5">R$ 2.125,00</span>
            </div>

            <div className="flex flex-col">
              <div className="flex items-center space-x-1.5 mb-0.5">
                <div className="w-2 h-2 rounded-full border-2 border-[#FFD6F9] bg-transparent"></div>
                <span className="text-text-secondary text-[10px]">Indústria</span>
              </div>
              <span className="text-dark font-bold text-xs pl-3.5">R$ 1.445,00</span>
            </div>

            <div className="flex flex-col">
              <div className="flex items-center space-x-1.5 mb-0.5">
                <div className="w-2 h-2 rounded-full border-2 border-[#E0D4FF] bg-transparent"></div>
                <span className="text-text-secondary text-[10px]">Serviços</span>
              </div>
              <span className="text-dark font-bold text-xs pl-3.5">R$ 680,00</span>
            </div>

          </div>

        </div>
      </section>

      {/* FICA A DICA */}
      <section className="mb-4">
        <div className="flex justify-between items-end mb-4">
          <h2 className="text-dark font-bold text-lg">Fica a Dica</h2>
          <button className="text-text-secondary text-xs font-bold border-b border-highlight pb-0.5 hover:text-dark">Ver todas</button>
        </div>
        <div className="bg-white rounded-3xl p-4 shadow-sm flex items-center space-x-4">
          <div className="w-10 h-10 bg-[#EDFEE8] rounded-full flex-shrink-0 flex items-center justify-center text-[#74C355]">
            <Lightbulb size={20} />
          </div>
          <p className="text-dark text-sm font-medium leading-snug">
            Registre as receitas assim que elas ocorrerem. Evite esquecimentos!
          </p>
        </div>
      </section>

      {/* BOTTOM NAV */}
      <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto px-6 pb-6 pt-2 z-50 pointer-events-none">
        <nav className="bg-primary text-white rounded-[2rem] h-16 flex items-center justify-around shadow-xl px-2 pointer-events-auto relative">

          <button className="flex flex-col items-center justify-center w-12 h-12 relative group">
            <LayoutGrid size={22} strokeWidth={2.5} />
            <div className="absolute -bottom-2 w-5 h-1 bg-white rounded-full"></div>
          </button>

          <button className="flex flex-col items-center justify-center w-12 h-12 text-white/70 hover:text-white transition-colors">
            <BarChart2 size={24} strokeWidth={2} />
          </button>

          <button className="flex flex-col items-center justify-center w-12 h-12 text-white/70 hover:text-white transition-colors">
            <FileText size={24} strokeWidth={2} />
          </button>

          <button className="flex flex-col items-center justify-center w-12 h-12 text-white/70 hover:text-white transition-colors">
            <div className="border-[2.5px] border-current rounded-full p-0.5">
              <div className="w-2.5 h-2.5 rounded-full border-[2.5px] border-current"></div>
            </div>
          </button>

          <button className="flex flex-col items-center justify-center w-12 h-12 text-white/70 hover:text-white transition-colors">
            <Settings size={24} strokeWidth={2} />
          </button>

        </nav>
      </div>

    </div>
  );
}

export default Dashboard;
