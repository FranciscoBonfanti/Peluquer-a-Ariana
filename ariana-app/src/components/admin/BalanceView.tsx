import { useAdminStore } from '../../store/adminStore';
import { formatCurrency, getMonthName, isSameMonth } from '../../lib/utils';

export function BalanceView() {
  const { appointments, expenses, selectedMonth, selectedYear, setMonth } = useAdminStore();

  const monthAppts = appointments.filter(a => isSameMonth(a.date, selectedYear, selectedMonth));
  const monthExpenses = expenses.filter(e => isSameMonth(e.date, selectedYear, selectedMonth));

  const revenue = monthAppts.filter(a => a.status === 'completed').reduce((sum, a) => sum + a.price, 0);
  const totalExpenses = monthExpenses.reduce((sum, e) => sum + e.amount, 0);
  const balance = revenue - totalExpenses;
  const completedCount = monthAppts.filter(a => a.status === 'completed').length;

  // Per-service breakdown
  const byService = monthAppts
    .filter(a => a.status === 'completed')
    .reduce<Record<string, { count: number; total: number }>>((acc, a) => {
      if (!acc[a.service]) acc[a.service] = { count: 0, total: 0 };
      acc[a.service].count++;
      acc[a.service].total += a.price;
      return acc;
    }, {});

  // Per-category breakdown
  const byCategory = monthExpenses.reduce<Record<string, number>>((acc, e) => {
    acc[e.category] = (acc[e.category] || 0) + e.amount;
    return acc;
  }, {});

  const months = Array.from({ length: 12 }, (_, i) => ({ value: i, label: getMonthName(i) }));
  const years = [2025, 2026, 2027];

  return (
    <div className="p-4 sm:p-8">
      <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
        <h1 className="font-display text-3xl font-semibold text-charcoal">Balance mensual</h1>
        <div className="flex gap-2">
          <select
            value={selectedMonth}
            onChange={e => setMonth(selectedYear, Number(e.target.value))}
            className="px-3 py-2 rounded-xl border border-charcoal/10 font-sans text-sm outline-none focus:border-rose bg-white"
          >
            {months.map(m => <option key={m.value} value={m.value}>{m.label}</option>)}
          </select>
          <select
            value={selectedYear}
            onChange={e => setMonth(Number(e.target.value), selectedMonth)}
            className="px-3 py-2 rounded-xl border border-charcoal/10 font-sans text-sm outline-none focus:border-rose bg-white"
          >
            {years.map(y => <option key={y} value={y}>{y}</option>)}
          </select>
        </div>
      </div>

      {/* Summary cards */}
      <div className="grid sm:grid-cols-3 gap-4 mb-8">
        <div className="bg-white rounded-2xl p-5 shadow-card border border-charcoal/5">
          <div className="text-xs text-muted uppercase tracking-wider mb-1">Ingresos</div>
          <div className="font-display text-3xl font-semibold text-green-600">{formatCurrency(revenue)}</div>
          <div className="text-xs text-muted mt-1">{completedCount} servicios completados</div>
        </div>
        <div className="bg-white rounded-2xl p-5 shadow-card border border-charcoal/5">
          <div className="text-xs text-muted uppercase tracking-wider mb-1">Gastos</div>
          <div className="font-display text-3xl font-semibold text-red-500">{formatCurrency(totalExpenses)}</div>
          <div className="text-xs text-muted mt-1">{monthExpenses.length} gastos registrados</div>
        </div>
        <div className={`rounded-2xl p-5 shadow-card border ${balance >= 0 ? 'bg-rose/5 border-rose/20' : 'bg-red-50 border-red-200'}`}>
          <div className="text-xs text-muted uppercase tracking-wider mb-1">Balance neto</div>
          <div className={`font-display text-3xl font-semibold ${balance >= 0 ? 'text-rose' : 'text-red-500'}`}>
            {balance >= 0 ? '+' : ''}{formatCurrency(balance)}
          </div>
          <div className="text-xs text-muted mt-1">{balance >= 0 ? 'Ganancia' : 'Pérdida'} del mes</div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Revenue by service */}
        <div className="bg-white rounded-2xl p-6 shadow-card border border-charcoal/5">
          <h3 className="font-display text-xl font-semibold text-charcoal mb-4">Ingresos por servicio</h3>
          {Object.keys(byService).length === 0 ? (
            <p className="text-sm text-muted italic text-center py-6">Sin servicios completados este mes.</p>
          ) : (
            <div className="flex flex-col gap-3">
              {Object.entries(byService).sort((a, b) => b[1].total - a[1].total).map(([name, data]) => (
                <div key={name}>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium text-charcoal">{name}</span>
                    <span className="text-sm font-semibold text-charcoal">{formatCurrency(data.total)}</span>
                  </div>
                  <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-rose rounded-full transition-all duration-500"
                      style={{ width: `${(data.total / revenue) * 100}%` }}
                    />
                  </div>
                  <div className="text-xs text-muted mt-0.5">{data.count} {data.count === 1 ? 'vez' : 'veces'}</div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Expenses by category */}
        <div className="bg-white rounded-2xl p-6 shadow-card border border-charcoal/5">
          <h3 className="font-display text-xl font-semibold text-charcoal mb-4">Gastos por categoría</h3>
          {Object.keys(byCategory).length === 0 ? (
            <p className="text-sm text-muted italic text-center py-6">Sin gastos este mes.</p>
          ) : (
            <div className="flex flex-col gap-3">
              {Object.entries(byCategory).sort((a, b) => b[1] - a[1]).map(([cat, amount]) => (
                <div key={cat}>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium text-charcoal capitalize">{cat}</span>
                    <span className="text-sm font-semibold text-charcoal">{formatCurrency(amount)}</span>
                  </div>
                  <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-red-400 rounded-full transition-all duration-500"
                      style={{ width: `${(amount / totalExpenses) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
