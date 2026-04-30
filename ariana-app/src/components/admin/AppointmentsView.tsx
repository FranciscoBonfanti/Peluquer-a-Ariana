import { useState } from 'react';
import { useAdminStore } from '../../store/adminStore';
import { Badge } from '../ui/Badge';
import { formatCurrency, formatDateShort } from '../../lib/utils';
import type { Appointment } from '../../types';

const STATUS_OPTIONS: Appointment['status'][] = ['pending', 'confirmed', 'completed', 'cancelled', 'no-show'];

const STATUS_LABELS: Record<Appointment['status'], string> = {
  pending: 'Pendiente',
  confirmed: 'Confirmado',
  completed: 'Completado',
  cancelled: 'Cancelado',
  'no-show': 'No se presentó',
};

export function AppointmentsView() {
  const { appointments, updateAppointmentStatus, deleteAppointment } = useAdminStore();
  const [filter, setFilter] = useState<'all' | Appointment['status']>('all');
  const [search, setSearch] = useState('');

  const filtered = appointments
    .filter(a => filter === 'all' || a.status === filter)
    .filter(a => !search || a.clientName.toLowerCase().includes(search.toLowerCase()) || a.service.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => b.date.localeCompare(a.date) || b.time.localeCompare(a.time));

  return (
    <div className="p-4 sm:p-8">
      <h1 className="font-display text-3xl font-semibold text-charcoal mb-6">Turnos</h1>

      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <input
          type="text"
          placeholder="Buscar cliente o servicio..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="flex-1 px-4 min-h-[44px] rounded-xl border border-charcoal/10 font-sans text-sm outline-none focus:border-rose transition-colors bg-white"
        />
        <select
          value={filter}
          onChange={e => setFilter(e.target.value as typeof filter)}
          className="px-4 min-h-[44px] rounded-xl border border-charcoal/10 font-sans text-sm outline-none focus:border-rose transition-colors bg-white text-charcoal cursor-pointer"
        >
          <option value="all">Todos los estados</option>
          {STATUS_OPTIONS.map(s => (
            <option key={s} value={s}>{STATUS_LABELS[s]}</option>
          ))}
        </select>
      </div>

      {/* Mobile card list */}
      <div className="md:hidden flex flex-col gap-3">
        {filtered.length === 0 && (
          <p className="text-center text-sm text-muted italic py-10">No se encontraron turnos.</p>
        )}
        {filtered.map((a) => (
          <div key={a.id} className="bg-white rounded-2xl p-4 shadow-card border border-charcoal/5">
            <div className="flex justify-between items-start mb-3">
              <div>
                <div className="text-sm font-semibold text-charcoal">{a.clientName}</div>
                <div className="text-xs text-muted mt-0.5">{a.clientPhone}</div>
              </div>
              <button
                onClick={() => { if (confirm('¿Eliminar este turno?')) deleteAppointment(a.id); }}
                className="w-8 h-8 flex items-center justify-center text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors flex-shrink-0"
                aria-label="Eliminar turno"
              >
                ×
              </button>
            </div>
            <div className="flex flex-wrap gap-x-4 gap-y-1.5 mb-3">
              <span className="text-xs text-muted">
                <span className="font-semibold text-charcoal">{a.service}</span>
              </span>
              <span className="text-xs text-rose font-bold">{formatDateShort(a.date)} · {a.time}</span>
              <span className="text-xs font-semibold text-charcoal">{formatCurrency(a.price)}</span>
            </div>
            <div className="flex items-center justify-between gap-3">
              <Badge status={a.status} />
              <select
                value={a.status}
                onChange={e => updateAppointmentStatus(a.id, e.target.value as Appointment['status'])}
                className="text-xs border border-charcoal/10 rounded-lg px-2 min-h-[36px] bg-white outline-none focus:border-rose transition-colors cursor-pointer flex-1 max-w-[160px]"
              >
                {STATUS_OPTIONS.map(s => (
                  <option key={s} value={s}>{STATUS_LABELS[s]}</option>
                ))}
              </select>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop table */}
      <div className="hidden md:block bg-white rounded-2xl shadow-card border border-charcoal/5 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px]">
            <thead>
              <tr className="border-b border-charcoal/5 bg-gray-50">
                <th className="text-left px-5 py-3.5 text-xs font-semibold text-muted uppercase tracking-wider">Cliente</th>
                <th className="text-left px-5 py-3.5 text-xs font-semibold text-muted uppercase tracking-wider">Servicio</th>
                <th className="text-left px-5 py-3.5 text-xs font-semibold text-muted uppercase tracking-wider">Fecha</th>
                <th className="text-left px-5 py-3.5 text-xs font-semibold text-muted uppercase tracking-wider">Horario</th>
                <th className="text-left px-5 py-3.5 text-xs font-semibold text-muted uppercase tracking-wider">Estado</th>
                <th className="text-right px-5 py-3.5 text-xs font-semibold text-muted uppercase tracking-wider">Precio</th>
                <th className="px-5 py-3.5" />
              </tr>
            </thead>
            <tbody>
              {filtered.map((a) => (
                <tr key={a.id} className="border-b border-charcoal/4 hover:bg-gray-50 transition-colors">
                  <td className="px-5 py-4">
                    <div className="text-sm font-semibold text-charcoal">{a.clientName}</div>
                    <div className="text-xs text-muted">{a.clientPhone}</div>
                  </td>
                  <td className="px-5 py-4 text-sm text-charcoal">{a.service}</td>
                  <td className="px-5 py-4 text-sm text-charcoal">{formatDateShort(a.date)}</td>
                  <td className="px-5 py-4 text-sm font-semibold text-rose">{a.time}</td>
                  <td className="px-5 py-4"><Badge status={a.status} /></td>
                  <td className="px-5 py-4 text-right text-sm font-semibold text-charcoal">{formatCurrency(a.price)}</td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2">
                      <select
                        value={a.status}
                        onChange={e => updateAppointmentStatus(a.id, e.target.value as Appointment['status'])}
                        className="text-xs border border-charcoal/10 rounded-lg px-2 py-1 bg-white outline-none focus:border-rose transition-colors cursor-pointer"
                      >
                        {STATUS_OPTIONS.map(s => (
                          <option key={s} value={s}>{STATUS_LABELS[s]}</option>
                        ))}
                      </select>
                      <button
                        onClick={() => { if (confirm('¿Eliminar este turno?')) deleteAppointment(a.id); }}
                        className="w-7 h-7 flex items-center justify-center text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors flex-shrink-0"
                        aria-label="Eliminar turno"
                      >
                        ×
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-5 py-10 text-center text-sm text-muted italic">No se encontraron turnos.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
