import { SERVICES } from '../../lib/constants';

export function ServicesView() {
  return (
    <div className="p-8">
      <h1 className="font-display text-3xl font-semibold text-charcoal mb-2">Servicios</h1>
      <p className="text-sm text-muted mb-6">Catálogo de servicios ofrecidos</p>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {SERVICES.map((s) => (
          <div key={s.name} className="bg-white rounded-2xl p-5 shadow-card border border-charcoal/5 hover:shadow-lg transition-shadow">
            <div className="flex justify-between items-start mb-3">
              <div className="w-10 h-10 rounded-xl bg-rose/10 flex items-center justify-center text-lg text-rose">
                {s.icon}
              </div>
              <span className="text-sm font-bold text-rose bg-rose/10 px-2.5 py-1 rounded-full">{s.price}</span>
            </div>
            <h3 className="font-display text-lg font-semibold text-charcoal mb-1">{s.name}</h3>
            <p className="text-xs text-muted leading-relaxed mb-3">{s.desc}</p>
            <div className="flex items-center gap-1.5 text-xs text-muted">
              <span>⏱</span>
              <span>{s.duration}</span>
            </div>
          </div>
        ))}
      </div>

      <p className="text-xs text-muted italic mt-8 text-center">
        Para modificar servicios o precios, editar <code className="bg-gray-100 px-1.5 py-0.5 rounded text-charcoal">src/lib/constants.ts</code>
      </p>
    </div>
  );
}
