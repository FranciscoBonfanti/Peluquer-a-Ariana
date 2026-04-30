import { useState } from 'react';
import { useInView } from '../../hooks/useInView';

const pillars = [
  { icon: '🎓', title: 'Formación certificada', desc: 'Cursos inicial, profesional y de trenzas avalados. Técnica actual y resultados reales.' },
  { icon: '✨', title: 'Productos de alta calidad', desc: 'Trabajamos solo con marcas profesionales para cuidar y embellecer tu cabello.' },
  { icon: '⏱', title: 'Atención puntual', desc: 'Respetamos tu tiempo. Turnos organizados, sin demoras, sin sorpresas.' },
];

function TrustCard({ p, i, visible }: { p: typeof pillars[0]; i: number; visible: boolean }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="text-center px-8 py-10 rounded-2xl border transition-all duration-500 cursor-default"
      style={{
        border: `1px solid ${hovered ? 'rgba(196,116,138,0.4)' : 'rgba(196,116,138,0.15)'}`,
        background: hovered ? '#FDF0EF' : '#fff',
        opacity: visible ? 1 : 0,
        transform: visible ? (hovered ? 'translateY(-6px)' : 'none') : 'translateY(40px)',
        transition: `all 0.65s cubic-bezier(0.22,1,0.36,1) ${i * 0.15}s`,
        boxShadow: hovered ? '0 24px 64px rgba(196,116,138,0.15)' : '0 4px 32px rgba(0,0,0,0.06)',
      }}
    >
      <div
        className="text-5xl mb-5 inline-block transition-transform duration-300"
        style={{ transform: hovered ? 'scale(1.2) rotate(-4deg)' : 'scale(1)' }}
      >
        {p.icon}
      </div>
      <h3 className="font-display text-[22px] font-semibold text-charcoal mb-3 leading-tight">{p.title}</h3>
      <p className="text-[14.4px] leading-[1.7] text-muted font-light">{p.desc}</p>
      <div
        className="h-0.5 bg-rose rounded-full mt-6 mx-auto transition-all duration-300"
        style={{ width: hovered ? '60%' : '0%' }}
      />
    </div>
  );
}

export function Trust() {
  const [ref, visible] = useInView();

  return (
    <section ref={ref} className="bg-charcoal py-16 sm:py-24 px-4 sm:px-6 relative overflow-hidden">
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{ background: 'rgba(196,116,138,0.04)', filter: 'blur(80px)' }}
      />

      <div className="max-w-6xl mx-auto relative">
        <div
          className="text-center mb-14 transition-all duration-700"
          style={{ opacity: visible ? 1 : 0, transform: visible ? 'none' : 'translateY(24px)' }}
        >
          <p className="section-label">Por qué elegirnos</p>
          <h2 className="font-display text-4xl font-semibold text-white leading-tight">
            Calidad que se nota,<br />
            <em className="not-italic text-rose">confianza que se siente</em>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {pillars.map((p, i) => (
            <TrustCard key={i} p={p} i={i} visible={visible} />
          ))}
        </div>
      </div>
    </section>
  );
}
