import { useInView } from '../../hooks/useInView';
import { WHATSAPP } from '../../lib/constants';

export function FinalCTA() {
  const [ref, visible] = useInView();
  const waLink = `https://wa.me/${WHATSAPP}?text=Hola%20Ariana!%20Quisiera%20reservar%20un%20turno%20%F0%9F%92%86%E2%80%8D%E2%99%80%EF%B8%8F`;

  return (
    <section
      ref={ref}
      className="py-16 sm:py-24 px-4 sm:px-6 text-center"
      style={{ background: 'linear-gradient(135deg, #C4748A 0%, #D4889A 100%)' }}
    >
      <div
        className="max-w-[680px] mx-auto transition-all duration-700"
        style={{ opacity: visible ? 1 : 0, transform: visible ? 'none' : 'translateY(30px)' }}
      >
        <div className="text-5xl mb-6">✦</div>
        <h2 className="font-display font-semibold text-white leading-[1.08] mb-6"
          style={{ fontSize: 'clamp(2.4rem, 5vw, 3.75rem)' }}>
          ¿Lista para tu<br /><em className="italic">nuevo look?</em>
        </h2>
        <p className="text-base text-white/80 font-light leading-[1.7] mb-10">
          Los turnos se llenan rápido. Reservá el tuyo ahora y asegurate tu lugar.
        </p>
        <div className="flex gap-4 justify-center flex-wrap">
          <a
            href="#turnero"
            className="bg-white text-rose px-9 py-3.5 rounded-full text-[15px] font-bold hover:-translate-y-0.5 transition-all duration-300"
            style={{ boxShadow: '0 8px 32px rgba(0,0,0,0.15)' }}
          >
            Reservar turno
          </a>
          <a
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white/15 text-white border border-white/30 px-9 py-3.5 rounded-full text-[15px] font-semibold hover:bg-white/25 transition-all duration-300"
          >
            Escribir por WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}
