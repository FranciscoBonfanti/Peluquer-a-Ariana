import { useState } from 'react';
import { useAdminStore } from '../../store/adminStore';
import { Button } from '../ui/Button';
import { formatCurrency, formatDateShort } from '../../lib/utils';
import { EXPENSE_CATEGORIES } from '../../lib/constants';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const schema = z.object({
  description: z.string().min(2, 'Descripción requerida'),
  amount: z.number({ message: 'Ingresá un monto' }).positive('El monto debe ser positivo'),
  category: z.enum(['insumos', 'equipamiento', 'servicios', 'marketing', 'otro']),
  date: z.string().min(1, 'Fecha requerida'),
});
type FormValues = z.infer<typeof schema>;

const categoryColors: Record<string, string> = {
  insumos: 'bg-purple-100 text-purple-700',
  equipamiento: 'bg-blue-100 text-blue-700',
  servicios: 'bg-yellow-100 text-yellow-700',
  marketing: 'bg-pink-100 text-pink-700',
  otro: 'bg-gray-100 text-gray-600',
};

export function ExpensesView() {
  const { expenses, addExpense, deleteExpense } = useAdminStore();
  const [showForm, setShowForm] = useState(false);

  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { date: new Date().toISOString().split('T')[0], category: 'insumos' },
  });

  const onSubmit = (data: FormValues) => {
    addExpense(data);
    reset({ date: new Date().toISOString().split('T')[0], category: 'insumos' });
    setShowForm(false);
  };

  const total = expenses.reduce((sum, e) => sum + e.amount, 0);

  return (
    <div className="p-4 sm:p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-display text-3xl font-semibold text-charcoal">Gastos</h1>
          <p className="text-sm text-muted mt-0.5">Total: <span className="font-semibold text-charcoal">{formatCurrency(total)}</span></p>
        </div>
        <Button onClick={() => setShowForm(!showForm)} size="sm">
          {showForm ? '× Cancelar' : '+ Agregar gasto'}
        </Button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-2xl p-6 shadow-card border border-charcoal/5 mb-6">
          <h3 className="font-display text-xl font-semibold text-charcoal mb-5">Nuevo gasto</h3>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <label className="block text-sm font-semibold text-charcoal mb-1.5">Descripción *</label>
              <input {...register('description')} placeholder="Ej: Tinte L'Oreal x4" className="w-full px-4 py-3 rounded-xl border border-charcoal/10 font-sans text-sm outline-none focus:border-rose transition-colors" />
              {errors.description && <p className="text-xs text-red-500 mt-1">{errors.description.message}</p>}
            </div>
            <div>
              <label className="block text-sm font-semibold text-charcoal mb-1.5">Monto ($) *</label>
              <input {...register('amount', { valueAsNumber: true })} type="number" placeholder="Ej: 12000" className="w-full px-4 py-3 rounded-xl border border-charcoal/10 font-sans text-sm outline-none focus:border-rose transition-colors" />
              {errors.amount && <p className="text-xs text-red-500 mt-1">{errors.amount.message}</p>}
            </div>
            <div>
              <label className="block text-sm font-semibold text-charcoal mb-1.5">Categoría *</label>
              <select {...register('category')} className="w-full px-4 py-3 rounded-xl border border-charcoal/10 font-sans text-sm outline-none focus:border-rose transition-colors bg-white">
                {EXPENSE_CATEGORIES.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-charcoal mb-1.5">Fecha *</label>
              <input {...register('date')} type="date" className="w-full px-4 py-3 rounded-xl border border-charcoal/10 font-sans text-sm outline-none focus:border-rose transition-colors" />
              {errors.date && <p className="text-xs text-red-500 mt-1">{errors.date.message}</p>}
            </div>
          </div>
          <div className="flex justify-end mt-5">
            <Button type="submit">Guardar gasto</Button>
          </div>
        </form>
      )}

      <div className="bg-white rounded-2xl shadow-card border border-charcoal/5 overflow-hidden">
        <div className="flex flex-col divide-y divide-charcoal/5">
          {expenses.length === 0 && (
            <p className="text-sm text-muted italic text-center py-10">No hay gastos registrados.</p>
          )}
          {expenses.sort((a, b) => b.date.localeCompare(a.date)).map((e) => (
            <div key={e.id} className="flex items-center gap-4 px-5 py-4 hover:bg-gray-50 transition-colors">
              <div className="flex-1">
                <div className="text-sm font-semibold text-charcoal">{e.description}</div>
                <div className="text-xs text-muted mt-0.5">{formatDateShort(e.date)}</div>
              </div>
              <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${categoryColors[e.category]}`}>
                {EXPENSE_CATEGORIES.find(c => c.value === e.category)?.label}
              </span>
              <span className="text-sm font-bold text-charcoal min-w-[80px] text-right">{formatCurrency(e.amount)}</span>
              <button
                onClick={() => deleteExpense(e.id)}
                className="text-xs text-red-400 hover:text-red-600 transition-colors p-1"
                title="Eliminar"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
