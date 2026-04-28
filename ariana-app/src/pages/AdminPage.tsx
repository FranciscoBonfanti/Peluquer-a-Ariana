import { useState } from 'react';
import { useAdminStore } from '../store/adminStore';
import { AdminLayout } from '../components/admin/AdminLayout';
import { DashboardView } from '../components/admin/DashboardView';
import { AppointmentsView } from '../components/admin/AppointmentsView';
import { ExpensesView } from '../components/admin/ExpensesView';
import { BalanceView } from '../components/admin/BalanceView';
import { ServicesView } from '../components/admin/ServicesView';

function LoginScreen() {
  const { login } = useAdminStore();
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  const handleLogin = () => {
    const ok = login(password);
    if (!ok) setError(true);
  };

  return (
    <div className="min-h-screen bg-cream-warm flex items-center justify-center px-6">
      <div className="bg-white rounded-2xl p-10 shadow-card border border-charcoal/5 w-full max-w-sm text-center">
        <div className="font-display text-3xl font-semibold text-charcoal mb-1">Ariana <span className="text-rose">✦</span></div>
        <p className="text-sm text-muted mb-8">Panel de administración</p>
        <div className="flex flex-col gap-3">
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={e => { setPassword(e.target.value); setError(false); }}
            onKeyDown={e => e.key === 'Enter' && handleLogin()}
            className="w-full px-4 py-3.5 rounded-xl border font-sans text-sm outline-none transition-colors"
            style={{ borderColor: error ? '#E86060' : '#E0E0E0' }}
          />
          {error && <p className="text-xs text-red-500 -mt-1">Contraseña incorrecta</p>}
          <button
            onClick={handleLogin}
            className="w-full bg-rose text-white py-3.5 rounded-xl font-semibold text-sm shadow-rose hover:-translate-y-0.5 transition-all"
          >
            Ingresar
          </button>
        </div>
        <p className="text-xs text-muted mt-6">Contraseña: <code className="bg-gray-100 px-1.5 py-0.5 rounded">ariana2026</code></p>
      </div>
    </div>
  );
}

const VIEW_MAP = {
  dashboard: DashboardView,
  appointments: AppointmentsView,
  expenses: ExpensesView,
  balance: BalanceView,
  services: ServicesView,
};

export function AdminPage() {
  const { authenticated, activeView } = useAdminStore();

  if (!authenticated) return <LoginScreen />;

  const ActiveView = VIEW_MAP[activeView] ?? DashboardView;

  return (
    <AdminLayout>
      <ActiveView />
    </AdminLayout>
  );
}
