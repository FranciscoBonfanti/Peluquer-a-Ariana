import { useState } from 'react';
import { useAdminStore } from '../../store/adminStore';
import type { Service } from '../../types';

type EditFields = Pick<Service, 'price' | 'priceNum' | 'desc' | 'duration'>;

function ServiceRow({ s, onSave }: { s: Service; onSave: (patch: Partial<EditFields>) => void }) {
  const [editing, setEditing] = useState(false);
  const [fields, setFields] = useState<EditFields>({ price: s.price, priceNum: s.priceNum, desc: s.desc, duration: s.duration });

  const set = (key: keyof EditFields) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setFields(f => ({ ...f, [key]: key === 'priceNum' ? Number(e.target.value) || f.priceNum : e.target.value }));

  const handleSave = () => { onSave(fields); setEditing(false); };
  const handleCancel = () => {
    setFields({ price: s.price, priceNum: s.priceNum, desc: s.desc, duration: s.duration });
    setEditing(false);
  };

  return (
    <div className="bg-white rounded-2xl p-5 shadow-card border border-charcoal/5">
      <div className="flex justify-between items-start mb-3">
        <div className="w-10 h-10 rounded-xl bg-rose/10 flex items-center justify-center text-lg text-rose">
          {s.icon}
        </div>
        {!editing ? (
          <div className="flex items-center gap-2">
            <span className="text-sm font-bold text-rose bg-rose/10 px-2.5 py-1 rounded-full">{s.price}</span>
            <button
              onClick={() => setEditing(true)}
              className="text-xs text-muted hover:text-rose transition-colors px-2 py-1 rounded-lg hover:bg-rose/5"
            >
              Editar
            </button>
          </div>
        ) : (
          <div className="flex gap-1.5">
            <button onClick={handleSave} className="text-xs font-semibold text-white bg-rose px-3 py-1 rounded-lg hover:opacity-90 transition-opacity">
              Guardar
            </button>
            <button onClick={handleCancel} className="text-xs text-muted px-2 py-1 rounded-lg hover:bg-gray-100 transition-colors">
              Cancelar
            </button>
          </div>
        )}
      </div>

      <h3 className="font-display text-lg font-semibold text-charcoal mb-2">{s.name}</h3>

      {editing ? (
        <div className="flex flex-col gap-2.5">
          <div>
            <label className="block text-[11px] font-semibold text-muted uppercase tracking-wider mb-1">Descripción</label>
            <textarea
              value={fields.desc}
              onChange={set('desc')}
              rows={2}
              className="w-full px-3 py-2 rounded-xl border border-charcoal/10 font-sans text-xs outline-none focus:border-rose transition-colors resize-none"
            />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-[11px] font-semibold text-muted uppercase tracking-wider mb-1">Precio (texto)</label>
              <input
                value={fields.price}
                onChange={set('price')}
                placeholder="ej: $15.000"
                className="w-full px-3 py-2 rounded-xl border border-charcoal/10 font-sans text-xs outline-none focus:border-rose transition-colors"
              />
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-muted uppercase tracking-wider mb-1">Precio (número)</label>
              <input
                value={fields.priceNum}
                onChange={set('priceNum')}
                type="number"
                placeholder="ej: 15000"
                className="w-full px-3 py-2 rounded-xl border border-charcoal/10 font-sans text-xs outline-none focus:border-rose transition-colors"
              />
            </div>
          </div>
          <div>
            <label className="block text-[11px] font-semibold text-muted uppercase tracking-wider mb-1">Duración</label>
            <input
              value={fields.duration}
              onChange={set('duration')}
              placeholder="ej: 45 min"
              className="w-full px-3 py-2 rounded-xl border border-charcoal/10 font-sans text-xs outline-none focus:border-rose transition-colors"
            />
          </div>
        </div>
      ) : (
        <>
          <p className="text-xs text-muted leading-relaxed mb-3">{s.desc}</p>
          <div className="flex items-center gap-1.5 text-xs text-muted">
            <span>⏱</span>
            <span>{s.duration}</span>
          </div>
        </>
      )}
    </div>
  );
}

export function ServicesView() {
  const { services, updateService } = useAdminStore();

  return (
    <div className="p-4 sm:p-8">
      <h1 className="font-display text-3xl font-semibold text-charcoal mb-2">Servicios</h1>
      <p className="text-sm text-muted mb-6">Hacé clic en "Editar" para modificar precio, descripción o duración</p>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {services.map((s) => (
          <ServiceRow
            key={s.name}
            s={s}
            onSave={(patch) => updateService(s.name, patch)}
          />
        ))}
      </div>
    </div>
  );
}
