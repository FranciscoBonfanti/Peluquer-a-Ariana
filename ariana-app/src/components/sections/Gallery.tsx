import { useState } from 'react';
import { useInView } from '../../hooks/useInView';
import { GALLERY_ITEMS } from '../../lib/constants';
import type { GalleryItem } from '../../types';

function GalleryCard({ item, i, visible, onClick }: { item: GalleryItem; i: number; visible: boolean; onClick: () => void }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="rounded-2xl overflow-hidden relative cursor-pointer"
      style={{
        aspectRatio: (i === 0 || i === 5) ? '3/4' : '1/1',
        background: item.color,
        opacity: visible ? 1 : 0,
        transform: visible ? (hovered ? 'scale(1.02)' : 'scale(1)') : 'scale(0.96)',
        transition: `all 0.4s ease ${i * 0.07}s`,
        boxShadow: hovered ? '0 16px 48px rgba(0,0,0,0.18)' : '0 4px 16px rgba(0,0,0,0.08)',
      }}
    >
      <img src="/icon-woman.jpeg" alt={item.label} className="absolute inset-0 w-full h-full object-cover transition-opacity duration-300" style={{ opacity: hovered ? 0.75 : 0.6 }} onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
      <div className="absolute inset-0" style={{ background: `linear-gradient(to top, rgba(26,26,26,${hovered ? 0.7 : 0.45}) 0%, transparent 55%)`, transition: 'all 0.4s' }} />

      {item.type === 'video' && (
        <div
          className="absolute top-1/2 left-1/2 w-12 h-12 rounded-full bg-white/90 flex items-center justify-center"
          style={{ transform: `translate(-50%, -50%) scale(${hovered ? 1.1 : 1})`, transition: 'transform 0.3s', boxShadow: '0 4px 20px rgba(0,0,0,0.2)' }}
        >
          <div style={{ width: 0, height: 0, borderTop: '9px solid transparent', borderBottom: '9px solid transparent', borderLeft: '15px solid var(--rose)', marginLeft: 3 }} />
        </div>
      )}

      <div className="absolute bottom-0 left-0 right-0 p-4 flex justify-between items-end">
        <div>
          <div className="text-[13px] text-white/70 mb-0.5">{item.type === 'video' ? '▶ Video' : '📷 Foto'}</div>
          <div className="text-[15px] text-white font-semibold">{item.label}</div>
        </div>
        <div
          className="w-8 h-8 rounded-full bg-white/15 border border-white/30 flex items-center justify-center transition-all duration-300"
          style={{ opacity: hovered ? 1 : 0, transform: hovered ? 'scale(1)' : 'scale(0.8)' }}
        >
          <span className="text-white text-sm">+</span>
        </div>
      </div>
    </div>
  );
}

function GalleryModal({ item, onClose }: { item: GalleryItem; onClose: () => void }) {
  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-6 animate-fade-in"
      style={{ background: 'rgba(26,26,26,0.85)', backdropFilter: 'blur(8px)' }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-3xl overflow-hidden max-w-[680px] w-full animate-fade-up"
        style={{ boxShadow: '0 32px 80px rgba(0,0,0,0.3)' }}
      >
        <div className="relative aspect-video flex items-center justify-center overflow-hidden" style={{ background: item.color }}>
          <div className="flex flex-col items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center" style={{ boxShadow: '0 8px 32px rgba(0,0,0,0.15)' }}>
              {item.type === 'video'
                ? <div style={{ width: 0, height: 0, borderTop: '14px solid transparent', borderBottom: '14px solid transparent', borderLeft: '22px solid var(--rose)', marginLeft: 4 }} />
                : <span className="text-rose text-2xl">✂</span>
              }
            </div>
            <span className="text-sm font-semibold text-charcoal/60">{item.label}</span>
          </div>
          <button
            onClick={onClose}
            className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/90 flex items-center justify-center text-lg hover:scale-110 transition-transform"
            style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.12)' }}
          >
            ×
          </button>
        </div>

        <div className="p-7">
          <h3 className="font-display text-3xl font-semibold text-charcoal mb-2">{item.label}</h3>
          <p className="text-[15px] leading-[1.7] text-muted font-light mb-6">{item.description}</p>
          <div className="flex gap-6 mb-7 flex-wrap">
            <div className="flex items-center gap-2">
              <span>⏱</span>
              <div>
                <div className="text-[10px] font-semibold tracking-widest uppercase text-muted">Duración</div>
                <div className="text-sm font-medium text-charcoal">{item.duration}</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span>✦</span>
              <div>
                <div className="text-[10px] font-semibold tracking-widest uppercase text-muted">Precio</div>
                <div className="text-sm font-semibold text-rose">{item.price}</div>
              </div>
            </div>
          </div>
          <a
            href="#turnero"
            onClick={onClose}
            className="inline-flex items-center gap-2 bg-rose text-white px-7 py-3 rounded-full text-sm font-bold shadow-rose hover:-translate-y-px transition-all duration-300"
          >
            Reservar este servicio →
          </a>
        </div>
      </div>
    </div>
  );
}

export function Gallery() {
  const [ref, visible] = useInView();
  const [active, setActive] = useState<GalleryItem | null>(null);

  return (
    <section ref={ref} className="py-16 sm:py-24 px-4 sm:px-6" style={{ background: '#FDF0EF' }}>
      <div className="max-w-6xl mx-auto">
        <div
          className="text-center mb-12 transition-all duration-500"
          style={{ opacity: visible ? 1 : 0, transform: visible ? 'none' : 'translateY(20px)' }}
        >
          <p className="section-label">Resultados reales</p>
          <h2 className="font-display text-4xl font-semibold text-charcoal leading-tight">
            El trabajo<br /><em className="not-italic text-rose">habla por sí solo</em>
          </h2>
          <p className="mt-3 text-sm text-muted">Tocá cada foto o video para ver los detalles</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {GALLERY_ITEMS.map((item, i) => (
            <GalleryCard key={i} item={item} i={i} visible={visible} onClick={() => setActive(item)} />
          ))}
        </div>

        <p className="text-center mt-6 text-[13px] text-muted italic">
          Seguinos en Instagram{' '}
          <a href="https://www.instagram.com/ariana.peluqueria" target="_blank" rel="noopener noreferrer" className="text-rose font-semibold not-italic hover:underline">
            @ariana.peluqueria
          </a>{' '}
          para ver más resultados
        </p>
      </div>

      {active && <GalleryModal item={active} onClose={() => setActive(null)} />}
    </section>
  );
}
