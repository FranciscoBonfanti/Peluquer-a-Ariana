import { useState, type ReactNode } from 'react';
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

function SidebarContent({ onNavigate }: { onNavigate?: () => void }) {
  const { activeView, setView, logout } = useAdminStore();

  return (
    <>
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
            onClick={() => { setView(item.id); onNavigate?.(); }}
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
          onClick={onNavigate}
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
    </>
  );
}

export function AdminLayout({ children }: { children: ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Desktop sidebar */}
      <aside className="hidden md:flex w-64 bg-charcoal text-white flex-col fixed top-0 bottom-0 left-0 z-40">
        <SidebarContent />
      </aside>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Mobile sidebar drawer */}
      <aside
        className="fixed top-0 bottom-0 left-0 w-64 bg-charcoal text-white flex flex-col z-50 md:hidden transition-transform duration-300"
        style={{ transform: mobileOpen ? 'translateX(0)' : 'translateX(-100%)' }}
      >
        <SidebarContent onNavigate={() => setMobileOpen(false)} />
      </aside>

      {/* Main content */}
      <main className="md:ml-64 flex-1 min-h-screen">
        {/* Mobile header */}
        <div className="md:hidden flex items-center justify-between px-4 py-4 bg-charcoal text-white sticky top-0 z-30">
          <div className="flex items-center gap-2">
            <span className="font-display text-lg font-semibold">Ariana</span>
            <span className="text-rose">✦</span>
          </div>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="p-2 rounded-lg hover:bg-white/10 transition-colors"
            aria-label="Menú"
          >
            <div className="w-5 space-y-1">
              <span className={`block h-0.5 bg-white transition-all duration-200 ${mobileOpen ? 'rotate-45 translate-y-1.5' : ''}`} />
              <span className={`block h-0.5 bg-white transition-all duration-200 ${mobileOpen ? 'opacity-0' : ''}`} />
              <span className={`block h-0.5 bg-white transition-all duration-200 ${mobileOpen ? '-rotate-45 -translate-y-1.5' : ''}`} />
            </div>
          </button>
        </div>

        {children}
      </main>
    </div>
  );
}
