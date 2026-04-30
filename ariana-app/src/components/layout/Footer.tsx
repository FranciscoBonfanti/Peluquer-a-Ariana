import { SERVICES, WHATSAPP } from '../../lib/constants';

export function Footer() {
  const waLink = `https://wa.me/${WHATSAPP}?text=Hola%20Ariana!%20Quisiera%20consultar%20sobre%20los%20servicios%20%F0%9F%92%86%E2%80%8D%E2%99%80%EF%B8%8F`;

  return (
    <footer className="bg-charcoal text-white/70 pt-12 pb-8 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-[1.5fr_1fr_1fr] gap-10 mb-10">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="font-display text-2xl font-semibold text-white tracking-tight">Ariana</span>
              <span className="text-rose text-xl">✦</span>
            </div>
            <p className="text-sm leading-relaxed font-light max-w-[280px]">
              Peluquería femenina con formación certificada. Resultados reales, atención personalizada y precios accesibles.
            </p>
          </div>

          <div>
            <h4 className="font-display text-lg font-semibold text-white mb-4">Servicios</h4>
            <div className="flex flex-col gap-2">
              {SERVICES.map((s) => (
                <span key={s.name} className="text-sm font-light">{s.name}</span>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-display text-lg font-semibold text-white mb-4">Contacto</h4>
            <div className="flex flex-col gap-3">
              <a href={waLink} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm hover:text-rose transition-colors">
                💬 WhatsApp directo
              </a>
              <span className="text-sm">📍 Consultá la dirección por WhatsApp</span>
              <a href="https://www.instagram.com/ariana.peluqueria" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm hover:text-rose transition-colors">
                📸 @ariana.peluqueria
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs font-light">© 2026 Ariana Peluquería Femenina. Todos los derechos reservados.</p>
          <a
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-[#25D366] text-white text-xs font-semibold px-4 py-2 rounded-full"
          >
            💬 WhatsApp
          </a>
        </div>
      </div>
    </footer>
  );
}
