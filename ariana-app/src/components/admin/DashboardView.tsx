import { useAdminStore } from '../../store/adminStore';
import { Badge } from '../ui/Badge';
import { formatCurrency, formatDateShort } from '../../lib/utils';

export function DashboardView() {
  const { appointments, expenses } = useAdminStore();
  const today = new Date().toISOString().split('T')[0];

  const todayAppts = appointments.filter(a => a.date === today);
  const monthAppts = appointments.filter(a => a.date.startsWith(new Date().toISOString().slice(0, 7)));
  const revenue = monthAppts.filter(a => a.status === 'completed').reduce((sum, a) => sum + a.price, 0);
  const monthExpenses = expenses.filter(e => e.date.startsWith(new Date().toISOString().slice(0, 7))).reduce((sum, e) => sum + e.amount, 0);
  const balance = revenue - monthExpenses;

  const upcoming = appointments
    .filter(a => a.date >= today && ['pending', 'confirmed'].includes(a.status))
    .sort((a, b) => a.date.localeCompare(b.date) || a.time.localeCompare(b.time))
    .slice(0, 5);

  const stats = [
    { label: 'Turnos hoy', value: todayAppts.length, icon: '📅', color: 'bg-blue-50 text-blue-700' },
    { label: 'Ingresos mes', value: formatCurrency(revenue), icon: '💰', color: 'bg-green-50 text-green-700' },
    { label: 'Gastos mes', value: formatCurrency(monthExpenses), icon: '💸', color: 'bg-red-50 text-red-500' },
    { label: 'Balance neto', value: formatCurrency(balance), icon: '📈', color: balance >= 0 ? 'bg-rose/10 text-rose' : 'bg-red-50 text-red-500' },
  ];

  return (
    <div className="p-4 sm:p-8">
      <h1 className="font-display text-3xl font-semibold text-charcoal mb-2">Dashboard</h1>
      <p className="text-sm text-muted mb-8">Resumen de {new Date().toLocaleDateString('es-AR', { month: 'long', year: 'numeric' })}</p>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((s) => (
          <div key={s.label} className="bg-white rounded-2xl p-5 shadow-card border border-charcoal/5">
            <div className={`w-10 h-10 rounded-xl ${s.color} flex items-center justify-center text-lg mb-3`}>{s.icon}</div>
            <div className="text-2xl font-bold text-charcoal font-display">{s.value}</div>
            <div className="text-xs text-muted mt-0.5">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Today's appointments */}
      <div className="bg-white rounded-2xl p-6 shadow-card border border-charcoal/5 mb-6">
        <h2 className="font-display text-xl font-semibold text-charcoal mb-4">
          Turnos de hoy <span className="text-rose ml-1">({todayAppts.length})</span>
        </h2>
        {todayAppts.length === 0 ? (
          <p className="text-sm text-muted italic py-4 text-center">No hay turnos para hoy. ¡A descansar! ✂</p>
        ) : (
          <div className="flex flex-col gap-2">
            {todayAppts.sort((a, b) => a.time.localeCompare(b.time)).map((a) => (
              <div key={a.id} className="flex items-center gap-4 p-3 rounded-xl bg-gray-50">
                <span className="text-sm font-bold text-rose w-12">{a.time}</span>
                <div className="flex-1">
                  <div className="text-sm font-semibold text-charcoal">{a.clientName}</div>
                  <div className="text-xs text-muted">{a.service}</div>
                </div>
                <Badge status={a.status} />
                <span className="text-sm font-semibold text-charcoal">{formatCurrency(a.price)}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Upcoming */}
      <div className="bg-white rounded-2xl p-6 shadow-card border border-charcoal/5">
        <h2 className="font-display text-xl font-semibold text-charcoal mb-4">Próximos turnos</h2>
        {upcoming.length === 0 ? (
          <p className="text-sm text-muted italic py-4 text-center">No hay turnos próximos.</p>
        ) : (
          <div className="flex flex-col gap-2">
            {upcoming.map((a) => (
              <div key={a.id} className="flex items-center gap-4 p-3 rounded-xl hover:bg-gray-50 transition-colors">
                <div className="text-center w-12">
                  <div className="text-xs text-muted">{formatDateShort(a.date)}</div>
                  <div className="text-sm font-bold text-rose">{a.time}</div>
                </div>
                <div className="flex-1">
                  <div className="text-sm font-semibold text-charcoal">{a.clientName}</div>
                  <div className="text-xs text-muted">{a.service}</div>
                </div>
                <Badge status={a.status} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
