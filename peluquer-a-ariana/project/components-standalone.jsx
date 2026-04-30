
// ─── Ariana Peluquería — Static Sections ───────────────────────────────────

const { useState, useEffect, useRef } = React;

// ── Helpers ────────────────────────────────────────────────────────────────
function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

// ── Navbar ─────────────────────────────────────────────────────────────────
function Navbar({ variant }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', h);
    return () => window.removeEventListener('scroll', h);
  }, []);

  const bg = scrolled
    ? (variant === 'A' ? 'rgba(255,255,255,0.96)' : variant === 'C' ? 'rgba(26,26,26,0.97)' : 'rgba(253,240,239,0.96)')
    : 'transparent';
  const shadow = scrolled ? '0 2px 24px rgba(0,0,0,0.08)' : 'none';
  const linkColor = variant === 'C' && scrolled ? '#fff' : '#1A1A1A';

  return (
    <nav style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100, background: bg, boxShadow: shadow, transition: 'all 0.4s ease', backdropFilter: scrolled ? 'blur(12px)' : 'none' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 1.5rem', height: 72, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <img src={window.__resources && window.__resources.logoHeader || "assets/logo-header.jpeg"} alt="Ariana Peluquería" style={{ height: 48, objectFit: 'contain' }} />
        <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
          {[['#servicios','Servicios'], ['#precios','Precios'], ['#turnero','Reservar']].map(([href, label]) => (
            <a key={href} href={href} style={{ color: linkColor, textDecoration: 'none', fontSize: '0.875rem', fontFamily: 'DM Sans, sans-serif', fontWeight: 500, letterSpacing: '0.04em', transition: 'opacity 0.2s' }}
               onMouseEnter={e => e.target.style.opacity = '0.6'} onMouseLeave={e => e.target.style.opacity = '1'}>
              {label}
            </a>
          ))}
          <a href="#turnero" style={{ background: 'var(--rose)', color: '#fff', padding: '0.55rem 1.4rem', borderRadius: 999, fontSize: '0.875rem', fontFamily: 'DM Sans, sans-serif', fontWeight: 600, textDecoration: 'none', transition: 'transform 0.2s, box-shadow 0.2s', boxShadow: '0 4px 16px rgba(196,116,138,0.35)' }}
             onMouseEnter={e => { e.target.style.transform = 'translateY(-1px)'; e.target.style.boxShadow = '0 8px 24px rgba(196,116,138,0.45)'; }}
             onMouseLeave={e => { e.target.style.transform = ''; e.target.style.boxShadow = '0 4px 16px rgba(196,116,138,0.35)'; }}>
            Reservar turno
          </a>
        </div>
      </div>
    </nav>
  );
}

// ── Hero ───────────────────────────────────────────────────────────────────
function Hero({ variant }) {
  const bgColor = variant === 'A' ? '#F9F4F2' : variant === 'C' ? '#1A1A1A' : 'linear-gradient(145deg, #FDF0EF 0%, #F7EBE8 100%)';
  const textColor = variant === 'C' ? '#FFFFFF' : '#1A1A1A';
  const subColor = variant === 'C' ? 'rgba(255,255,255,0.7)' : '#7A7A7A';

  return (
    <section id="top" style={{ minHeight: '100svh', background: bgColor, display: 'flex', alignItems: 'center', position: 'relative', overflow: 'hidden', paddingTop: 72 }}>
      {/* Animated background orbs */}
      <div className="deco-float-a" style={{ position: 'absolute', top: '6%', right: '-4%', width: 520, height: 520, borderRadius: '50%', background: variant === 'C' ? 'rgba(196,116,138,0.07)' : 'rgba(196,116,138,0.13)', filter: 'blur(70px)', pointerEvents: 'none' }} />
      <div className="deco-float-b" style={{ position: 'absolute', bottom: '4%', left: '-6%', width: 380, height: 380, borderRadius: '50%', background: 'rgba(201,169,110,0.1)', filter: 'blur(55px)', pointerEvents: 'none' }} />
      <div className="deco-float-c" style={{ position: 'absolute', top: '40%', left: '42%', width: 200, height: 200, borderRadius: '50%', background: 'rgba(196,116,138,0.06)', filter: 'blur(40px)', pointerEvents: 'none' }} />

      {/* Subtle grid pattern */}
      <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle, rgba(196,116,138,0.06) 1px, transparent 1px)', backgroundSize: '40px 40px', pointerEvents: 'none', opacity: variant === 'C' ? 0.4 : 0.6 }} />

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '5rem 1.5rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center', width: '100%' }} className="hero-grid">
        {/* Left: text */}
        <div>
          <div className="hero-badge" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem', padding: '0.35rem 0.9rem', background: variant === 'C' ? 'rgba(196,116,138,0.15)' : 'rgba(196,116,138,0.1)', borderRadius: 999, border: '1px solid rgba(196,116,138,0.25)' }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--rose)', display: 'inline-block', animation: 'pulse2 2s ease-in-out infinite' }}></span>
            <span style={{ fontSize: '0.75rem', fontFamily: 'DM Sans, sans-serif', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--rose)' }}>Peluquería Femenina</span>
          </div>

          <h1 className="hero-h1" style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(2.6rem, 5.5vw, 4.2rem)', fontWeight: 600, lineHeight: 1.08, color: textColor, marginBottom: '1.25rem', textWrap: 'pretty' }}>
            Tu próximo look<br />
            <em className="shimmer-text" style={{ fontStyle: 'italic' }}>empieza con un<br />turno fácil y rápido</em>
          </h1>

          <p className="hero-sub" style={{ fontSize: '1.0625rem', lineHeight: 1.7, color: subColor, fontFamily: 'DM Sans, sans-serif', fontWeight: 300, marginBottom: '2.25rem', maxWidth: 460 }}>
            Resultados de calidad con productos profesionales y precios accesibles. Porque merecés sentirte bien, sin complicaciones.
          </p>

          <div className="hero-ctas" style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '2.5rem' }}>
            <a href="#turnero" className="btn-pulse" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'var(--rose)', color: '#fff', padding: '0.9rem 2rem', borderRadius: 999, fontSize: '0.9375rem', fontFamily: 'DM Sans, sans-serif', fontWeight: 600, textDecoration: 'none', boxShadow: '0 8px 32px rgba(196,116,138,0.4)', transition: 'all 0.3s' }}
               onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px) scale(1.03)'; e.currentTarget.style.boxShadow = '0 18px 48px rgba(196,116,138,0.55)'; }}
               onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = '0 8px 32px rgba(196,116,138,0.4)'; }}>
              ✦ Reservar turno
            </a>
            <a href="#servicios" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'transparent', color: textColor, padding: '0.9rem 2rem', borderRadius: 999, fontSize: '0.9375rem', fontFamily: 'DM Sans, sans-serif', fontWeight: 500, textDecoration: 'none', border: `1px solid ${variant === 'C' ? 'rgba(255,255,255,0.2)' : 'rgba(26,26,26,0.2)'}`, transition: 'all 0.3s' }}
               onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--rose)'; e.currentTarget.style.color = 'var(--rose)'; e.currentTarget.style.transform = 'translateY(-1px)'; }}
               onMouseLeave={e => { e.currentTarget.style.borderColor = variant === 'C' ? 'rgba(255,255,255,0.2)' : 'rgba(26,26,26,0.2)'; e.currentTarget.style.color = textColor; e.currentTarget.style.transform = ''; }}>
              Ver servicios →
            </a>
          </div>

          <div className="hero-trust" style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
            {['✓ Turnos sin espera', '✓ Productos profesionales', '✓ Cursos certificados'].map((t, i) => (
              <span key={t} style={{ fontSize: '0.8125rem', color: subColor, fontFamily: 'DM Sans, sans-serif', fontWeight: 400, animation: `fadeUp 0.5s ease ${0.8 + i * 0.12}s both` }}>{t}</span>
            ))}
          </div>
        </div>

        {/* Right: visual */}
        <div className="hero-image" style={{ position: 'relative', display: 'flex', justifyContent: 'center' }}>
          <div style={{ position: 'relative', width: '100%', maxWidth: 440 }}>
            {/* Spinning dashed ring */}
            <div style={{ position: 'absolute', top: -28, right: -28, width: 140, height: 140, borderRadius: '50%', border: '1.5px dashed rgba(201,169,110,0.4)', pointerEvents: 'none', zIndex: 0, animation: 'spin 18s linear infinite' }} />
            <div style={{ position: 'absolute', top: -10, right: -10, width: 104, height: 104, borderRadius: '50%', border: '1px dashed rgba(196,116,138,0.25)', pointerEvents: 'none', zIndex: 0, animation: 'spin 12s linear infinite reverse' }} />

            {/* Main image frame */}
            <div style={{ borderRadius: variant === 'A' ? '2px' : '24px 24px 80px 24px', overflow: 'hidden', aspectRatio: '4/5', background: 'rgba(196,116,138,0.08)', position: 'relative', border: variant === 'A' ? '1px solid rgba(0,0,0,0.08)' : 'none', boxShadow: '0 40px 100px rgba(0,0,0,0.15)', zIndex: 1 }}>
              <img src={window.__resources && window.__resources.salonBg || "assets/salon-bg.jpeg"} alt="Salón Ariana" style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 8s ease', transform: 'scale(1.04)' }} onError={e => { e.target.style.display = 'none'; }}
                   onMouseEnter={e => e.target.style.transform = 'scale(1.08)'} onMouseLeave={e => e.target.style.transform = 'scale(1.04)'} />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent 50%, rgba(26,26,26,0.4) 100%)' }} />
              {/* Corner accent */}
              <div style={{ position: 'absolute', top: 16, left: 16, width: 48, height: 48, borderTop: '2px solid rgba(255,255,255,0.6)', borderLeft: '2px solid rgba(255,255,255,0.6)', borderRadius: '4px 0 0 0' }} />
              <div style={{ position: 'absolute', bottom: 16, right: 16, width: 48, height: 48, borderBottom: '2px solid rgba(255,255,255,0.6)', borderRight: '2px solid rgba(255,255,255,0.6)', borderRadius: '0 0 4px 0' }} />
            </div>

            {/* Floating card */}
            <div className="hero-card" style={{ position: 'absolute', bottom: '-1.5rem', left: '-1.5rem', background: '#fff', borderRadius: 16, padding: '1rem 1.25rem', boxShadow: '0 20px 56px rgba(0,0,0,0.14)', display: 'flex', alignItems: 'center', gap: '0.75rem', backdropFilter: 'blur(10px)', zIndex: 2 }}>
              <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'rgba(196,116,138,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.1rem', animation: 'floatC 3s ease-in-out infinite' }}>✂</div>
              <div>
                <div style={{ fontSize: '0.8125rem', fontWeight: 700, fontFamily: 'DM Sans, sans-serif', color: '#1A1A1A' }}>Turno disponible hoy</div>
                <div style={{ fontSize: '0.75rem', color: '#7A7A7A', fontFamily: 'DM Sans, sans-serif' }}>desde las 10:00 hs</div>
              </div>
            </div>

            {/* Stats badge */}
            <div className="deco-float-d" style={{ position: 'absolute', top: '20%', left: '-2rem', background: 'var(--rose)', borderRadius: 14, padding: '0.75rem 1rem', boxShadow: '0 12px 36px rgba(196,116,138,0.4)', zIndex: 2 }}>
              <div style={{ fontSize: '1.25rem', fontFamily: 'Cormorant Garamond, serif', fontWeight: 700, color: '#fff', lineHeight: 1 }}>100%</div>
              <div style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.85)', fontFamily: 'DM Sans, sans-serif', fontWeight: 500, letterSpacing: '0.06em', textTransform: 'uppercase', marginTop: 2 }}>Satisfacción</div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div style={{ position: 'absolute', bottom: '2rem', left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.4rem', animation: 'fadeIn 1s ease 1.2s both' }}>
        <span style={{ fontSize: '0.7rem', fontFamily: 'DM Sans, sans-serif', letterSpacing: '0.15em', textTransform: 'uppercase', color: subColor, opacity: 0.7 }}>Scrollear</span>
        <div style={{ width: 1, height: 40, background: `linear-gradient(to bottom, ${variant === 'C' ? 'rgba(255,255,255,0.4)' : 'rgba(196,116,138,0.5)'}, transparent)`, animation: 'floatA 2s ease-in-out infinite' }} />
      </div>
    </section>
  );
}

// ── Trust Section ──────────────────────────────────────────────────────────
function Trust({ variant }) {
  const [ref, visible] = useInView();
  const bgColor = variant === 'A' ? '#1A1A1A' : variant === 'C' ? '#111' : '#FDF0EF';
  const textColor = variant === 'A' || variant === 'C' ? '#fff' : '#1A1A1A';
  const pillars = [
    { icon: '🎓', title: 'Formación certificada', desc: 'Cursos inicial, profesional y de trenzas avalados. Técnica actual y resultados reales.' },
    { icon: '✨', title: 'Productos de alta calidad', desc: 'Trabajamos solo con marcas profesionales para cuidar y embellecer tu cabello.' },
    { icon: '⏱', title: 'Atención puntual', desc: 'Respetamos tu tiempo. Turnos organizados, sin demoras, sin sorpresas.' },
  ];

  return (
    <section ref={ref} style={{ background: bgColor, padding: '5rem 1.5rem', position: 'relative', overflow: 'hidden' }}>
      {/* Decorative bg accent */}
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: 600, height: 600, borderRadius: '50%', background: 'rgba(196,116,138,0.04)', filter: 'blur(80px)', pointerEvents: 'none' }} />
      <div style={{ maxWidth: 1200, margin: '0 auto', position: 'relative' }}>
        <div style={{ textAlign: 'center', marginBottom: '3.5rem', opacity: visible ? 1 : 0, transform: visible ? 'none' : 'translateY(24px)', transition: 'all 0.7s cubic-bezier(0.22,1,0.36,1)' }}>
          <p style={{ fontSize: '0.75rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--rose)', fontFamily: 'DM Sans, sans-serif', fontWeight: 600, marginBottom: '0.75rem' }}>Por qué elegirnos</p>
          <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 600, color: textColor, lineHeight: 1.1 }}>Calidad que se nota,<br /><em style={{ fontStyle: 'italic', color: 'var(--rose)' }}>confianza que se siente</em></h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem' }} className="trust-grid">
          {pillars.map((p, i) => (
            <TrustCard key={i} p={p} i={i} visible={visible} variant={variant} textColor={textColor} />
          ))}
        </div>
      </div>
    </section>
  );
}

function TrustCard({ p, i, visible, variant, textColor }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
         style={{ textAlign: 'center', padding: '2.5rem 2rem', borderRadius: variant === 'A' ? 2 : 20, border: `1px solid ${hovered ? 'rgba(196,116,138,0.4)' : (textColor === '#fff' ? 'rgba(255,255,255,0.08)' : 'rgba(196,116,138,0.15)')}`, background: textColor === '#fff' ? (hovered ? 'rgba(196,116,138,0.08)' : 'rgba(255,255,255,0.04)') : (hovered ? '#FDF0EF' : '#fff'), opacity: visible ? 1 : 0, transform: visible ? (hovered ? 'translateY(-6px)' : 'none') : 'translateY(40px)', transition: `all 0.65s cubic-bezier(0.22,1,0.36,1) ${i * 0.15}s`, boxShadow: hovered ? '0 24px 64px rgba(196,116,138,0.15)' : (textColor === '#1A1A1A' ? '0 4px 32px rgba(0,0,0,0.06)' : 'none') }}>
      <div style={{ fontSize: '2.5rem', marginBottom: '1.25rem', display: 'inline-block', transition: 'transform 0.4s', transform: hovered ? 'scale(1.2) rotate(-4deg)' : 'scale(1)' }}>{p.icon}</div>
      <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.375rem', fontWeight: 600, color: textColor, marginBottom: '0.75rem', lineHeight: 1.2 }}>{p.title}</h3>
      <p style={{ fontSize: '0.9rem', lineHeight: 1.7, color: textColor === '#fff' ? 'rgba(255,255,255,0.65)' : '#7A7A7A', fontFamily: 'DM Sans, sans-serif', fontWeight: 300 }}>{p.desc}</p>
      {/* Animated underline */}
      <div style={{ height: 2, background: 'var(--rose)', borderRadius: 99, marginTop: '1.5rem', width: hovered ? '60%' : '0%', margin: '1.5rem auto 0', transition: 'width 0.4s ease' }} />
    </div>
  );
}

// ── Services ───────────────────────────────────────────────────────────────
const SERVICES = [
  { name: 'Corte de Puntas', desc: 'Renovación para lucir un cabello sano y con vida. Rápido y preciso.', price: '$10.000', icon: '✂' },
  { name: 'Corte Completo', desc: 'Cambio de largo, capas y forma adaptados a tu rostro y estilo.', price: '$15.000', icon: '✦' },
  { name: 'Alisado', desc: 'Resultado liso y brillante de larga duración con productos premium.', price: '$30.000', icon: '〰' },
  { name: 'Keratina', desc: 'Tratamiento nutritivo que reduce el frizz y aporta brillo intenso.', price: '$25.000', icon: '◆' },
  { name: 'Color', desc: 'Mechas, tinte o color completo. Colores vibrantes que cuidan tu cabello.', price: 'desde $40.000', icon: '◉' },
  { name: 'Peinados', desc: 'Para ocasiones especiales o el día a día. Desde recogidos hasta sueltos.', price: '$30.000 – $35.000', icon: '✿' },
];

function Services({ variant }) {
  const [ref, visible] = useInView();
  const bg = variant === 'C' ? '#1A1A1A' : '#FFFFFF';
  const textColor = variant === 'C' ? '#fff' : '#1A1A1A';

  return (
    <section id="servicios" ref={ref} style={{ background: bg, padding: '6rem 1.5rem' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '3.5rem', opacity: visible ? 1 : 0, transform: visible ? 'none' : 'translateY(20px)', transition: 'all 0.6s ease' }}>
          <p style={{ fontSize: '0.75rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--rose)', fontFamily: 'DM Sans, sans-serif', fontWeight: 600, marginBottom: '0.75rem' }}>Lo que hacemos</p>
          <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 600, color: textColor, lineHeight: 1.1 }}>Nuestros servicios</h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem' }}>
          {SERVICES.map((s, i) => (
            <ServiceCard key={i} s={s} i={i} visible={visible} variant={variant} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ServiceCard({ s, i, visible, variant }) {
  const [hovered, setHovered] = useState(false);
  const bg = variant === 'C' ? (hovered ? 'rgba(196,116,138,0.12)' : 'rgba(255,255,255,0.04)') : (hovered ? '#FDF0EF' : '#FAFAFA');
  const border = hovered ? 'var(--rose)' : (variant === 'C' ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)');
  const textColor = variant === 'C' ? '#fff' : '#1A1A1A';

  return (
    <div onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
         style={{ background: bg, border: `1px solid ${border}`, borderRadius: variant === 'A' ? 2 : 16, padding: '1.75rem', opacity: visible ? 1 : 0, transform: visible ? (hovered ? 'translateY(-4px)' : 'none') : 'translateY(30px)', transition: `all 0.4s ease ${i * 0.08}s`, cursor: 'default' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
        <div style={{ width: 44, height: 44, borderRadius: '50%', background: 'rgba(196,116,138,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', color: 'var(--rose)' }}>{s.icon}</div>
        <span style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--rose)', fontFamily: 'DM Sans, sans-serif', background: 'rgba(196,116,138,0.1)', padding: '0.2rem 0.65rem', borderRadius: 999 }}>{s.price}</span>
      </div>
      <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.25rem', fontWeight: 600, color: textColor, marginBottom: '0.5rem' }}>{s.name}</h3>
      <p style={{ fontSize: '0.875rem', lineHeight: 1.65, color: variant === 'C' ? 'rgba(255,255,255,0.6)' : '#7A7A7A', fontFamily: 'DM Sans, sans-serif', fontWeight: 300, marginBottom: '1.25rem' }}>{s.desc}</p>
      <a href="#turnero" style={{ fontSize: '0.8125rem', color: 'var(--rose)', fontFamily: 'DM Sans, sans-serif', fontWeight: 600, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.3rem', transition: 'gap 0.2s' }}
         onMouseEnter={e => e.currentTarget.style.gap = '0.6rem'} onMouseLeave={e => e.currentTarget.style.gap = '0.3rem'}>
        Reservar →
      </a>
    </div>
  );
}

// ── Pricing ────────────────────────────────────────────────────────────────
function Pricing({ variant }) {
  const [ref, visible] = useInView();
  const bg = variant === 'A' ? '#F9F4F2' : variant === 'C' ? '#111' : 'linear-gradient(160deg, #FDF0EF 0%, #F9EDE9 100%)';
  const textColor = variant === 'C' ? '#fff' : '#1A1A1A';

  return (
    <section id="precios" ref={ref} style={{ background: bg, padding: '6rem 1.5rem' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem', opacity: visible ? 1 : 0, transform: visible ? 'none' : 'translateY(20px)', transition: 'all 0.6s ease' }}>
          <p style={{ fontSize: '0.75rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--rose)', fontFamily: 'DM Sans, sans-serif', fontWeight: 600, marginBottom: '0.75rem' }}>Tarifas</p>
          <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 600, color: textColor, lineHeight: 1.1 }}>Precios accesibles,<br /><em style={{ fontStyle: 'italic', color: 'var(--rose)' }}>calidad profesional</em></h2>
        </div>

        <div style={{ background: variant === 'C' ? 'rgba(255,255,255,0.04)' : '#fff', borderRadius: variant === 'A' ? 2 : 20, overflow: 'hidden', boxShadow: '0 8px 48px rgba(0,0,0,0.08)', border: variant === 'C' ? '1px solid rgba(255,255,255,0.08)' : 'none', opacity: visible ? 1 : 0, transform: visible ? 'none' : 'translateY(30px)', transition: 'all 0.6s ease 0.2s' }}>
          {SERVICES.map((s, i) => (
            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.25rem 2rem', borderBottom: i < SERVICES.length - 1 ? `1px solid ${variant === 'C' ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'}` : 'none', transition: 'background 0.2s' }}
                 onMouseEnter={e => e.currentTarget.style.background = variant === 'C' ? 'rgba(196,116,138,0.06)' : '#FDF8F7'}
                 onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <span style={{ color: 'var(--rose)', fontSize: '1rem' }}>{s.icon}</span>
                <span style={{ fontFamily: 'DM Sans, sans-serif', fontWeight: 400, color: textColor, fontSize: '0.9375rem' }}>{s.name}</span>
              </div>
              <span style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 600, fontSize: '1.125rem', color: variant === 'C' ? 'var(--rose)' : '#1A1A1A' }}>{s.price}</span>
            </div>
          ))}
        </div>

        <p style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '0.8125rem', color: variant === 'C' ? 'rgba(255,255,255,0.45)' : '#7A7A7A', fontFamily: 'DM Sans, sans-serif', fontStyle: 'italic', opacity: visible ? 1 : 0, transition: 'opacity 0.6s ease 0.4s' }}>
          * Los precios pueden variar según el largo y estado del cabello. Consultanos sin compromiso.
        </p>

        <div style={{ textAlign: 'center', marginTop: '2.5rem', opacity: visible ? 1 : 0, transition: 'opacity 0.6s ease 0.5s' }}>
          <a href="#turnero" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'var(--rose)', color: '#fff', padding: '0.9rem 2.5rem', borderRadius: 999, fontSize: '0.9375rem', fontFamily: 'DM Sans, sans-serif', fontWeight: 600, textDecoration: 'none', boxShadow: '0 8px 32px rgba(196,116,138,0.4)', transition: 'all 0.3s' }}
             onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 14px 40px rgba(196,116,138,0.5)'; }}
             onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = '0 8px 32px rgba(196,116,138,0.4)'; }}>
            Reservar mi turno
          </a>
        </div>
      </div>
    </section>
  );
}

// ── Objections ─────────────────────────────────────────────────────────────
function Objections({ variant }) {
  const [ref, visible] = useInView();
  const [open, setOpen] = useState(null);
  const bg = variant === 'A' ? '#fff' : variant === 'C' ? '#1A1A1A' : '#fff';
  const textColor = variant === 'C' ? '#fff' : '#1A1A1A';

  const faqs = [
    { q: '¿Cómo son los precios en comparación con otros salones?', a: 'Trabajamos con precios justos para que puedas acceder a un servicio profesional sin gastar de más. Usamos productos de calidad sin cargar el precio innecesariamente.' },
    { q: '¿Puedo conseguir turno cuando yo necesito?', a: 'Tenemos turnos disponibles de lunes a sábado, con horarios flexibles. Podés reservar con anticipación o consultar disponibilidad del día por WhatsApp.' },
    { q: '¿Y si no me gusta el resultado?', a: 'Antes del servicio hacemos una consulta para entender exactamente lo que buscás. Si algo no te convence, lo hablamos en el momento para que salgas conforme.' },
    { q: '¿Con qué productos trabajan?', a: 'Solo usamos marcas profesionales certificadas. Priorizamos el cuidado y la salud de tu cabello en cada tratamiento.' },
  ];

  return (
    <section ref={ref} style={{ background: bg, padding: '6rem 1.5rem' }}>
      <div style={{ maxWidth: 780, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem', opacity: visible ? 1 : 0, transform: visible ? 'none' : 'translateY(20px)', transition: 'all 0.6s ease' }}>
          <p style={{ fontSize: '0.75rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--rose)', fontFamily: 'DM Sans, sans-serif', fontWeight: 600, marginBottom: '0.75rem' }}>Preguntas frecuentes</p>
          <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(2rem, 4vw, 2.75rem)', fontWeight: 600, color: textColor, lineHeight: 1.1 }}>¿Tenés dudas? <em style={{ fontStyle: 'italic', color: 'var(--rose)' }}>Te respondemos</em></h2>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', opacity: visible ? 1 : 0, transition: 'opacity 0.6s ease 0.2s' }}>
          {faqs.map((faq, i) => (
            <div key={i} onClick={() => setOpen(open === i ? null : i)}
                 style={{ background: variant === 'C' ? 'rgba(255,255,255,0.04)' : '#FAFAFA', border: `1px solid ${open === i ? 'var(--rose)' : (variant === 'C' ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)')}`, borderRadius: variant === 'A' ? 2 : 14, overflow: 'hidden', transition: 'border-color 0.3s', cursor: 'pointer' }}>
              <div style={{ padding: '1.25rem 1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem' }}>
                <h3 style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.9375rem', fontWeight: 500, color: textColor, lineHeight: 1.4, flex: 1 }}>{faq.q}</h3>
                <span style={{ color: 'var(--rose)', fontSize: '1.25rem', lineHeight: 1, flexShrink: 0, transform: open === i ? 'rotate(45deg)' : 'none', transition: 'transform 0.3s' }}>+</span>
              </div>
              {open === i && (
                <div style={{ padding: '0 1.5rem 1.25rem', borderTop: `1px solid ${variant === 'C' ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'}` }}>
                  <p style={{ paddingTop: '1rem', fontSize: '0.9rem', lineHeight: 1.7, color: variant === 'C' ? 'rgba(255,255,255,0.65)' : '#7A7A7A', fontFamily: 'DM Sans, sans-serif', fontWeight: 300 }}>{faq.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Gallery ────────────────────────────────────────────────────────────────
const GALLERY_ITEMS = [
  { type: 'image', label: 'Alisado', color: '#E8C5CF', description: 'Alisado permanente con productos sin formol. Resultado liso, brillante y duradero. Ideal para cabellos con mucho volumen o frizz.', duration: '2–3 horas', price: '$30.000' },
  { type: 'video', label: 'Keratina', color: '#D4A5B0', description: 'Tratamiento de keratina que nutre en profundidad y elimina el frizz hasta por 4 meses. El cabello queda suave, brilloso y fácil de manejar.', duration: '2 horas', price: '$25.000' },
  { type: 'image', label: 'Peinado de noche', color: '#F2D4DA', description: 'Peinados para ocasiones especiales: casamientos, cumpleaños de 15, eventos. Recogidos, semirecogidos y sueltos con ondas.', duration: '1–1.5 horas', price: '$30.000 – $35.000' },
  { type: 'image', label: 'Color completo', color: '#C9A96E33', description: 'Coloración completa con tinte profesional. Colores naturales, fantasía o cobertura de canas. Cuidamos la salud del cabello en cada proceso.', duration: '2–3 horas', price: 'desde $40.000' },
  { type: 'video', label: 'Corte + estilo', color: '#E8C5CF', description: 'Corte personalizado adaptado a la forma de tu rostro y tu estilo de vida. Incluye lavado, corte y secado.', duration: '1 hora', price: '$15.000' },
  { type: 'image', label: 'Mechas', color: '#F7EBE8', description: 'Mechas en distintas técnicas: balayage, highlights, babylights. Efecto natural o llamativo según lo que busques.', duration: '3–4 horas', price: 'desde $40.000' },
];

function GalleryModal({ item, onClose }) {
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    document.body.style.overflow = 'hidden';
    return () => { window.removeEventListener('keydown', handler); document.body.style.overflow = ''; };
  }, []);

  return (
    <div onClick={onClose} style={{ position: 'fixed', inset: 0, zIndex: 1000, background: 'rgba(26,26,26,0.85)', backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1.5rem', animation: 'fadeIn 0.25s ease' }}>
      <style>{`@keyframes fadeIn { from { opacity: 0 } to { opacity: 1 } } @keyframes slideUp { from { opacity: 0; transform: translateY(24px) } to { opacity: 1; transform: none } }`}</style>
      <div onClick={e => e.stopPropagation()} style={{ background: '#fff', borderRadius: 24, overflow: 'hidden', maxWidth: 680, width: '100%', boxShadow: '0 32px 80px rgba(0,0,0,0.3)', animation: 'slideUp 0.3s ease', display: 'flex', flexDirection: 'column' }}>
        {/* Media area */}
        <div style={{ position: 'relative', background: item.color, aspectRatio: '16/9', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
          {item.type === 'video' ? (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
              <div style={{ width: 72, height: 72, borderRadius: '50%', background: 'rgba(255,255,255,0.9)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 8px 32px rgba(0,0,0,0.15)' }}>
                <div style={{ width: 0, height: 0, borderTop: '14px solid transparent', borderBottom: '14px solid transparent', borderLeft: '22px solid var(--rose)', marginLeft: 4 }} />
              </div>
              <div style={{ background: 'rgba(255,255,255,0.8)', backdropFilter: 'blur(8px)', padding: '0.4rem 1rem', borderRadius: 999 }}>
                <span style={{ fontSize: '0.8rem', fontFamily: 'DM Sans, sans-serif', fontWeight: 600, color: '#7A7A7A', letterSpacing: '0.08em' }}>VIDEO PRÓXIMAMENTE</span>
              </div>
              <p style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.8)', fontFamily: 'DM Sans, sans-serif', textAlign: 'center', maxWidth: 260, lineHeight: 1.5 }}>Subí tu video a la carpeta assets/ y lo mostramos aquí</p>
            </div>
          ) : (
            <img src={window.__resources && window.__resources.iconWoman || "assets/icon-woman.jpeg"} alt={item.label} style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.75 }} onError={e => e.target.style.display = 'none'} />
          )}
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent 50%, rgba(0,0,0,0.25) 100%)', pointerEvents: 'none' }} />
          {/* Close button */}
          <button onClick={onClose} style={{ position: 'absolute', top: 12, right: 12, width: 36, height: 36, borderRadius: '50%', background: 'rgba(255,255,255,0.9)', border: 'none', cursor: 'pointer', fontSize: '1.1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.12)', transition: 'transform 0.2s' }}
                 onMouseEnter={e => e.target.style.transform = 'scale(1.1)'} onMouseLeave={e => e.target.style.transform = ''}>
            ×
          </button>
          {/* Type badge */}
          <div style={{ position: 'absolute', top: 12, left: 12, background: item.type === 'video' ? 'rgba(196,116,138,0.9)' : 'rgba(255,255,255,0.9)', borderRadius: 999, padding: '0.25rem 0.75rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
            <span style={{ fontSize: '0.7rem' }}>{item.type === 'video' ? '▶' : '📷'}</span>
            <span style={{ fontSize: '0.7rem', fontFamily: 'DM Sans, sans-serif', fontWeight: 700, color: item.type === 'video' ? '#fff' : '#1A1A1A', letterSpacing: '0.06em', textTransform: 'uppercase' }}>{item.type === 'video' ? 'Video' : 'Foto'}</span>
          </div>
        </div>

        {/* Content */}
        <div style={{ padding: '1.75rem 2rem 2rem' }}>
          <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.75rem', fontWeight: 600, color: '#1A1A1A', marginBottom: '0.5rem' }}>{item.label}</h3>
          <p style={{ fontSize: '0.9375rem', lineHeight: 1.7, color: '#7A7A7A', fontFamily: 'DM Sans, sans-serif', fontWeight: 300, marginBottom: '1.5rem' }}>{item.description}</p>
          <div style={{ display: 'flex', gap: '1.5rem', marginBottom: '1.75rem', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <span style={{ fontSize: '0.9rem' }}>⏱</span>
              <div>
                <div style={{ fontSize: '0.7rem', fontFamily: 'DM Sans, sans-serif', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#7A7A7A' }}>Duración</div>
                <div style={{ fontSize: '0.9rem', fontFamily: 'DM Sans, sans-serif', fontWeight: 500, color: '#1A1A1A' }}>{item.duration}</div>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <span style={{ fontSize: '0.9rem' }}>✦</span>
              <div>
                <div style={{ fontSize: '0.7rem', fontFamily: 'DM Sans, sans-serif', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#7A7A7A' }}>Precio</div>
                <div style={{ fontSize: '0.9rem', fontFamily: 'DM Sans, sans-serif', fontWeight: 600, color: 'var(--rose)' }}>{item.price}</div>
              </div>
            </div>
          </div>
          <a href="#turnero" onClick={onClose} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'var(--rose)', color: '#fff', padding: '0.75rem 1.75rem', borderRadius: 999, fontSize: '0.9rem', fontFamily: 'DM Sans, sans-serif', fontWeight: 700, textDecoration: 'none', boxShadow: '0 6px 24px rgba(196,116,138,0.4)', transition: 'all 0.3s' }}
             onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-1px)'} onMouseLeave={e => e.currentTarget.style.transform = ''}>
            Reservar este servicio →
          </a>
        </div>
      </div>
    </div>
  );
}

function Gallery({ variant }) {
  const [ref, visible] = useInView();
  const [activeItem, setActiveItem] = useState(null);
  const bg = variant === 'A' ? '#F9F4F2' : variant === 'C' ? '#111' : '#FDF0EF';
  const textColor = variant === 'C' ? '#fff' : '#1A1A1A';

  const spanConfig = [0, 1, 0, 0, 1, 0]; // wide items

  return (
    <section ref={ref} style={{ background: bg, padding: '6rem 1.5rem' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem', opacity: visible ? 1 : 0, transform: visible ? 'none' : 'translateY(20px)', transition: 'all 0.6s ease' }}>
          <p style={{ fontSize: '0.75rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--rose)', fontFamily: 'DM Sans, sans-serif', fontWeight: 600, marginBottom: '0.75rem' }}>Resultados reales</p>
          <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 600, color: textColor, lineHeight: 1.1 }}>El trabajo<br /><em style={{ fontStyle: 'italic', color: 'var(--rose)' }}>habla por sí solo</em></h2>
          <p style={{ marginTop: '0.75rem', fontSize: '0.9rem', color: variant === 'C' ? 'rgba(255,255,255,0.5)' : '#7A7A7A', fontFamily: 'DM Sans, sans-serif' }}>Tocá cada foto o video para ver los detalles</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
          {GALLERY_ITEMS.map((item, i) => (
            <GalleryCard key={i} item={item} i={i} visible={visible} variant={variant} onClick={() => setActiveItem(item)} />
          ))}
        </div>

        <p style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '0.8125rem', color: variant === 'C' ? 'rgba(255,255,255,0.4)' : '#7A7A7A', fontFamily: 'DM Sans, sans-serif', fontStyle: 'italic' }}>
          Seguinos en Instagram @ariana.peluqueria para ver más resultados
        </p>
      </div>

      {activeItem && <GalleryModal item={activeItem} onClose={() => setActiveItem(null)} />}
    </section>
  );
}

function GalleryCard({ item, i, visible, variant, onClick }) {
  const [hovered, setHovered] = useState(false);
  const radius = variant === 'A' ? 2 : 16;

  return (
    <div onClick={onClick}
         onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
         style={{ aspectRatio: i === 0 || i === 5 ? '3/4' : '1/1', borderRadius: radius, overflow: 'hidden', background: item.color, position: 'relative', cursor: 'pointer', opacity: visible ? 1 : 0, transform: visible ? (hovered ? 'scale(1.02)' : 'scale(1)') : 'scale(0.96)', transition: `all 0.4s ease ${i * 0.07}s`, boxShadow: hovered ? '0 16px 48px rgba(0,0,0,0.18)' : '0 4px 16px rgba(0,0,0,0.08)' }}>
      <img src={window.__resources && window.__resources.iconWoman || "assets/icon-woman.jpeg"} alt={item.label} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: hovered ? 0.75 : 0.6, transition: 'opacity 0.4s' }} onError={e => { e.target.style.display = 'none'; }} />
      <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(to top, rgba(26,26,26,${hovered ? 0.7 : 0.45}) 0%, transparent 55%)`, transition: 'all 0.4s' }} />

      {/* Video play indicator */}
      {item.type === 'video' && (
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%) scale(' + (hovered ? 1.1 : 1) + ')', width: 48, height: 48, borderRadius: '50%', background: 'rgba(255,255,255,0.9)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 20px rgba(0,0,0,0.2)', transition: 'transform 0.3s' }}>
          <div style={{ width: 0, height: 0, borderTop: '9px solid transparent', borderBottom: '9px solid transparent', borderLeft: '15px solid var(--rose)', marginLeft: 3 }} />
        </div>
      )}

      {/* Bottom label */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <div>
          <div style={{ fontSize: '0.8125rem', color: 'rgba(255,255,255,0.7)', fontFamily: 'DM Sans, sans-serif', fontWeight: 400, marginBottom: '0.1rem' }}>{item.type === 'video' ? '▶ Video' : '📷 Foto'}</div>
          <div style={{ fontSize: '0.9375rem', color: '#fff', fontFamily: 'DM Sans, sans-serif', fontWeight: 600 }}>{item.label}</div>
        </div>
        <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(4px)', border: '1px solid rgba(255,255,255,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: hovered ? 1 : 0, transform: hovered ? 'scale(1)' : 'scale(0.8)', transition: 'all 0.3s' }}>
          <span style={{ color: '#fff', fontSize: '0.875rem' }}>+</span>
        </div>
      </div>
    </div>
  );
}

// ── Final CTA ──────────────────────────────────────────────────────────────
function FinalCTA({ variant, whatsapp }) {
  const [ref, visible] = useInView();
  const bg = variant === 'A' ? '#1A1A1A' : variant === 'C' ? 'var(--rose)' : 'linear-gradient(135deg, #C4748A 0%, #D4889A 100%)';
  const waLink = `https://wa.me/${whatsapp}?text=Hola%20Ariana!%20Quisiera%20reservar%20un%20turno%20%F0%9F%92%86%E2%80%8D%E2%99%80%EF%B8%8F`;

  return (
    <section ref={ref} style={{ background: bg, padding: '6rem 1.5rem', textAlign: 'center' }}>
      <div style={{ maxWidth: 680, margin: '0 auto', opacity: visible ? 1 : 0, transform: visible ? 'none' : 'translateY(30px)', transition: 'all 0.7s ease' }}>
        <div style={{ fontSize: '3rem', marginBottom: '1.5rem' }}>✦</div>
        <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(2.4rem, 5vw, 3.75rem)', fontWeight: 600, color: '#fff', lineHeight: 1.08, marginBottom: '1.5rem' }}>¿Lista para tu<br /><em style={{ fontStyle: 'italic' }}>nuevo look?</em></h2>
        <p style={{ fontSize: '1rem', color: 'rgba(255,255,255,0.8)', fontFamily: 'DM Sans, sans-serif', fontWeight: 300, lineHeight: 1.7, marginBottom: '2.5rem' }}>Los turnos se llenan rápido. Reservá el tuyo ahora y asegurate tu lugar.</p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <a href="#turnero" style={{ background: '#fff', color: 'var(--rose)', padding: '0.9rem 2.25rem', borderRadius: 999, fontSize: '0.9375rem', fontFamily: 'DM Sans, sans-serif', fontWeight: 700, textDecoration: 'none', boxShadow: '0 8px 32px rgba(0,0,0,0.15)', transition: 'all 0.3s' }}
             onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'} onMouseLeave={e => e.currentTarget.style.transform = ''}>
            Reservar turno
          </a>
          <a href={waLink} target="_blank" rel="noopener" style={{ background: 'rgba(255,255,255,0.15)', color: '#fff', padding: '0.9rem 2.25rem', borderRadius: 999, fontSize: '0.9375rem', fontFamily: 'DM Sans, sans-serif', fontWeight: 600, textDecoration: 'none', border: '1px solid rgba(255,255,255,0.3)', transition: 'all 0.3s' }}
             onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.25)'} onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.15)'}>
            Escribir por WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}

// ── Footer ─────────────────────────────────────────────────────────────────
function Footer({ variant, whatsapp }) {
  const bg = variant === 'C' ? '#0D0D0D' : '#1A1A1A';
  const waLink = `https://wa.me/${whatsapp}?text=Hola%20Ariana!%20Quisiera%20consultar%20sobre%20los%20servicios%20%F0%9F%92%86%E2%80%8D%E2%99%80%EF%B8%8F`;

  return (
    <footer style={{ background: bg, padding: '3.5rem 1.5rem 2rem', color: 'rgba(255,255,255,0.7)' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr 1fr', gap: '3rem', marginBottom: '3rem' }}>
          <div>
            <img src={window.__resources && window.__resources.logoHeader || "assets/logo-header.jpeg"} alt="Ariana Peluquería" style={{ height: 52, marginBottom: '1rem', filter: 'brightness(1.1)' }} />
            <p style={{ fontSize: '0.875rem', lineHeight: 1.7, fontFamily: 'DM Sans, sans-serif', fontWeight: 300, maxWidth: 280 }}>Peluquería femenina con formación certificada. Resultados reales, atención personalizada y precios accesibles.</p>
          </div>
          <div>
            <h4 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.1rem', fontWeight: 600, color: '#fff', marginBottom: '1rem' }}>Servicios</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {SERVICES.map(s => <span key={s.name} style={{ fontSize: '0.875rem', fontFamily: 'DM Sans, sans-serif', fontWeight: 300 }}>{s.name}</span>)}
            </div>
          </div>
          <div>
            <h4 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.1rem', fontWeight: 600, color: '#fff', marginBottom: '1rem' }}>Contacto</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <a href={waLink} target="_blank" rel="noopener" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'rgba(255,255,255,0.7)', textDecoration: 'none', fontSize: '0.875rem', fontFamily: 'DM Sans, sans-serif', transition: 'color 0.2s' }}
                 onMouseEnter={e => e.currentTarget.style.color = 'var(--rose)'} onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.7)'}>
                💬 WhatsApp directo
              </a>
              <span style={{ fontSize: '0.875rem', fontFamily: 'DM Sans, sans-serif' }}>📍 Consultá la dirección por WhatsApp</span>
              <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.5rem' }}>
                <a href="#" style={{ width: 34, height: 34, borderRadius: '50%', background: 'rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', textDecoration: 'none', fontSize: '0.9rem', transition: 'background 0.2s' }}
                   onMouseEnter={e => e.currentTarget.style.background = 'var(--rose)'} onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.08)'}>
                  📸
                </a>
              </div>
            </div>
          </div>
        </div>
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
          <p style={{ fontSize: '0.8125rem', fontFamily: 'DM Sans, sans-serif', fontWeight: 300 }}>© 2026 Ariana Peluquería Femenina. Todos los derechos reservados.</p>
          <a href={waLink} target="_blank" rel="noopener" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: '#25D366', color: '#fff', padding: '0.5rem 1.1rem', borderRadius: 999, fontSize: '0.8125rem', fontFamily: 'DM Sans, sans-serif', fontWeight: 600, textDecoration: 'none' }}>
            WhatsApp
          </a>
        </div>
      </div>
    </footer>
  );
}

Object.assign(window, { Navbar, Hero, Trust, Services, Pricing, Objections, Gallery, FinalCTA, Footer, SERVICES, useInView });
