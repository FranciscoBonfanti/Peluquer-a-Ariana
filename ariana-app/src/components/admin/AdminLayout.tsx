import { type ReactNode } from 'react';
import { useAdminStore } from '../../store/adminStore';
import type { AdminView } from '../../types';
import { Link } from 'react-router-dom';

const nav: { id: AdminView; icon: string; label: string }[] = [
  { id: 'dashboard', icon: '📊', label: 'Dashboard' },
  { id: 'appointments', icon: '📅', label: 'Turnos' },
  { id: 'expenses', icon: '💸', label: 'Gastos' },
  { id: 'balance', icon: '📈', label: 'Balance' },
  { id: 'services', icon: '✂', label: 'Servicios' },
];

export function AdminLayout({ children }: { children: ReactNode }) {
  const { activeView, setView, logout } = useAdminStore();

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-charcoal text-white flex flex-col fixed top-0 bottom-0 left-0 z-40">
        <div className="px-6 py-5 border-b border-white/10">
          <div className="flex items-center gap-2">
            <span className="font-display text-xl font-semibold tracking-tight">Ariana</span>
            <span className="text-rose">✦</span>
          </div>
          <p className="text-xs text-white/40 mt-0.5">Panel de administración</p>
        </div>

        <nav className="flex-1 px-3 py-4 flex flex-col gap-1">
          {nav.map((item) => (
            <button
              key={item.id}
              onClick={() => setView(item.id)}
              className="w-full text-left flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200"
              style={{
                background: activeView === item.id ? 'rgba(196,116,138,0.2)' : 'transparent',
                color: activeView === item.id ? '#E8C5CF' : 'rgba(255,255,255,0.6)',
              }}
            >
              <span className="text-base">{item.icon}</span>
              {item.label}
            </button>
          ))}
        </nav>

        <div className="px-3 py-4 border-t border-white/10 flex flex-col gap-2">
          <Link
            to="/"
            className="flex items-center gap-2 px-3 py-2 text-xs text-white/40 hover:text-white/70 transition-colors"
          >
            ← Ver sitio web
          </Link>
          <button
            onClick={logout}
            className="flex items-center gap-2 px-3 py-2 text-xs text-white/40 hover:text-red-400 transition-colors"
          >
            Cerrar sesión
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="ml-64 flex-1 min-h-screen">
        {children}
      </main>
    </div>
  );
}
