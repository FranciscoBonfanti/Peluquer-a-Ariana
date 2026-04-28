import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', h, { passive: true });
    return () => window.removeEventListener('scroll', h);
  }, []);

  const navLinks = [
    { href: '#servicios', label: 'Servicios' },
    { href: '#precios', label: 'Precios' },
    { href: '#turnero', label: 'Reservar' },
  ];

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: scrolled ? 'rgba(253,240,239,0.96)' : 'transparent',
        boxShadow: scrolled ? '0 2px 24px rgba(0,0,0,0.08)' : 'none',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
      }}
    >
      <div className="max-w-6xl mx-auto px-6 h-[72px] flex items-center justify-between">
        <a href="#top" className="flex items-center gap-2">
          <img src="/logo-header.jpeg" alt="Ariana Peluquería" className="h-10 object-contain" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
        </a>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map(({ href, label }) => (
            <a
              key={href}
              href={href}
              className="text-sm font-medium text-charcoal tracking-wide hover:text-rose transition-colors duration-200"
            >
              {label}
            </a>
          ))}
          <a
            href="#turnero"
            className="bg-rose text-white text-sm font-semibold px-5 py-2 rounded-full shadow-rose hover:-translate-y-0.5 hover:shadow-rose-lg transition-all duration-200"
          >
            Reservar turno
          </a>
          <Link
            to="/admin"
            className="text-xs text-muted hover:text-rose transition-colors duration-200"
          >
            Admin
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2 text-charcoal"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menú"
        >
          <div className="w-5 space-y-1">
            <span className={`block h-0.5 bg-current transition-all duration-200 ${menuOpen ? 'rotate-45 translate-y-1.5' : ''}`} />
            <span className={`block h-0.5 bg-current transition-all duration-200 ${menuOpen ? 'opacity-0' : ''}`} />
            <span className={`block h-0.5 bg-current transition-all duration-200 ${menuOpen ? '-rotate-45 -translate-y-1.5' : ''}`} />
          </div>
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-cream-warm border-t border-rose/10 px-6 py-4 flex flex-col gap-4">
          {navLinks.map(({ href, label }) => (
            <a
              key={href}
              href={href}
              className="text-base font-medium text-charcoal"
              onClick={() => setMenuOpen(false)}
            >
              {label}
            </a>
          ))}
          <a
            href="#turnero"
            className="bg-rose text-white text-sm font-semibold px-5 py-3 rounded-full text-center shadow-rose"
            onClick={() => setMenuOpen(false)}
          >
            Reservar turno
          </a>
          <Link to="/admin" className="text-xs text-muted text-center" onClick={() => setMenuOpen(false)}>
            Panel admin →
          </Link>
        </div>
      )}
    </nav>
  );
}
