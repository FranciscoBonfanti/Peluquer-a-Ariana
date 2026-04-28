import { useState } from 'react';
import { useInView } from '../../hooks/useInView';
import { SERVICES } from '../../lib/constants';

function ServiceCard({ s, i, visible }: { s: typeof SERVICES[0]; i: number; visible: boolean }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="rounded-2xl p-7 transition-all duration-300 cursor-default"
      style={{
        background: hovered ? '#FDF0EF' : '#FAFAFA',
        border: `1px solid ${hovered ? 'var(--rose)' : 'rgba(0,0,0,0.08)'}`,
        opacity: visible ? 1 : 0,
        transform: visible ? (hovered ? 'translateY(-4px)' : 'none') : 'translateY(30px)',
        transition: `all 0.4s ease ${i * 0.08}s`,
      }}
    >
      <div className="flex justify-between items-start mb-4">
        <div className="w-11 h-11 rounded-full bg-rose/12 flex items-center justify-center text-xl text-rose">
          {s.icon}
        </div>
        <span className="text-sm font-bold text-rose bg-rose/10 px-2.5 py-1 rounded-full">{s.price}</span>
      </div>
      <h3 className="font-display text-xl font-semibold text-charcoal mb-2">{s.name}</h3>
      <p className="text-sm leading-[1.65] text-muted font-light mb-5">{s.desc}</p>
      <a
        href="#turnero"
        className="text-[13px] text-rose font-semibold inline-flex items-center gap-1.5 hover:gap-3 transition-all duration-200"
      >
        Reservar →
      </a>
    </div>
  );
}

export function Services() {
  const [ref, visible] = useInView();

  return (
    <section id="servicios" ref={ref} className="bg-white py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div
          className="text-center mb-14 transition-all duration-500"
          style={{ opacity: visible ? 1 : 0, transform: visible ? 'none' : 'translateY(20px)' }}
        >
          <p className="section-label">Lo que hacemos</p>
          <h2 className="font-display text-4xl font-semibold text-charcoal leading-tight">
            Nuestros servicios
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((s, i) => (
            <ServiceCard key={i} s={s} i={i} visible={visible} />
          ))}
        </div>

        {/* Pricing table */}
        <div
          id="precios"
          className="mt-20 max-w-[720px] mx-auto transition-all duration-500 delay-200"
          style={{ opacity: visible ? 1 : 0, transform: visible ? 'none' : 'translateY(30px)' }}
        >
          <div className="text-center mb-8">
            <p className="section-label">Tarifas</p>
            <h2 className="font-display text-4xl font-semibold text-charcoal leading-tight">
              Precios accesibles,<br />
              <em className="not-italic text-rose">calidad profesional</em>
            </h2>
          </div>

          <div className="bg-white rounded-2xl overflow-hidden shadow-card border border-charcoal/5">
            {SERVICES.map((s, i) => (
              <div
                key={i}
                className="flex items-center justify-between px-8 py-5 hover:bg-cream-warm transition-colors duration-200"
                style={{ borderBottom: i < SERVICES.length - 1 ? '1px solid rgba(0,0,0,0.06)' : 'none' }}
              >
                <div className="flex items-center gap-4">
                  <span className="text-rose">{s.icon}</span>
                  <span className="font-sans text-[15px] text-charcoal">{s.name}</span>
                </div>
                <span className="font-display text-lg font-semibold text-charcoal">{s.price}</span>
              </div>
            ))}
          </div>

          <p className="text-center mt-4 text-[13px] text-muted italic">
            * Los precios pueden variar según el largo y estado del cabello. Consultanos sin compromiso.
          </p>

          <div className="flex justify-center mt-8">
            <a
              href="#turnero"
              className="inline-flex items-center gap-2 bg-rose text-white px-10 py-3.5 rounded-full text-[15px] font-semibold shadow-rose hover:-translate-y-0.5 hover:shadow-rose-lg transition-all duration-300"
            >
              Reservar mi turno
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
