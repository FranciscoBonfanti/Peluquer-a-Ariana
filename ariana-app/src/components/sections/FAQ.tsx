import { useState } from 'react';
import { useInView } from '../../hooks/useInView';

const faqs = [
  { q: '¿Cómo son los precios en comparación con otros salones?', a: 'Trabajamos con precios justos para que puedas acceder a un servicio profesional sin gastar de más. Usamos productos de calidad sin cargar el precio innecesariamente.' },
  { q: '¿Puedo conseguir turno cuando yo necesito?', a: 'Tenemos turnos disponibles de lunes a sábado, con horarios flexibles. Podés reservar con anticipación o consultar disponibilidad del día por WhatsApp.' },
  { q: '¿Y si no me gusta el resultado?', a: 'Antes del servicio hacemos una consulta para entender exactamente lo que buscás. Si algo no te convence, lo hablamos en el momento para que salgas conforme.' },
  { q: '¿Con qué productos trabajan?', a: 'Solo usamos marcas profesionales certificadas. Priorizamos el cuidado y la salud de tu cabello en cada tratamiento.' },
];

export function FAQ() {
  const [ref, visible] = useInView();
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section ref={ref} className="bg-white py-16 sm:py-24 px-4 sm:px-6">
      <div className="max-w-[780px] mx-auto">
        <div
          className="text-center mb-12 transition-all duration-500"
          style={{ opacity: visible ? 1 : 0, transform: visible ? 'none' : 'translateY(20px)' }}
        >
          <p className="section-label">Preguntas frecuentes</p>
          <h2 className="font-display text-4xl font-semibold text-charcoal leading-tight">
            ¿Tenés dudas? <em className="not-italic text-rose">Te respondemos</em>
          </h2>
        </div>

        <div
          className="flex flex-col gap-3 transition-opacity duration-500 delay-200"
          style={{ opacity: visible ? 1 : 0 }}
        >
          {faqs.map((faq, i) => (
            <div
              key={i}
              onClick={() => setOpen(open === i ? null : i)}
              className="rounded-2xl overflow-hidden cursor-pointer transition-colors duration-300"
              style={{
                background: '#FAFAFA',
                border: `1px solid ${open === i ? 'var(--rose)' : 'rgba(0,0,0,0.08)'}`,
              }}
            >
              <div className="px-6 py-5 flex items-center justify-between gap-4">
                <h3 className="font-sans text-[15px] font-medium text-charcoal leading-snug flex-1">
                  {faq.q}
                </h3>
                <span
                  className="text-rose text-xl flex-shrink-0 transition-transform duration-300"
                  style={{ transform: open === i ? 'rotate(45deg)' : 'none' }}
                >
                  +
                </span>
              </div>
              {open === i && (
                <div className="px-6 pb-5 border-t border-charcoal/5">
                  <p className="pt-4 text-[14.4px] leading-[1.7] text-muted font-light">{faq.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
