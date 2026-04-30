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

  // Close menu on resize to desktop
  useEffect(() => {
    const h = () => { if (window.innerWidth >= 768) setMenuOpen(false); };
    window.addEventListener('resize', h);
    return () => window.removeEventListener('resize', h);
  }, []);

  const navLinks = [
    { href: '#servicios', label: 'Servicios' },
    { href: '#turnero', label: 'Reservar' },
  ];

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: scrolled || menuOpen ? 'rgba(253,240,239,0.97)' : 'transparent',
        boxShadow: scrolled ? '0 2px 24px rgba(0,0,0,0.08)' : 'none',
        backdropFilter: scrolled || menuOpen ? 'blur(12px)' : 'none',
      }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-[68px] sm:h-[72px] flex items-center justify-between">
        <a href="#top" className="flex items-center gap-2 min-h-[44px]">
          <img src="/logo-header.jpeg" alt="Ariana Peluquería" className="h-9 object-contain" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
        </a>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map(({ href, label }) => (
            <a
              key={href}
              href={href}
              className="text-sm font-medium text-charcoal tracking-wide hover:text-rose transition-colors duration-200 min-h-[44px] flex items-center"
            >
              {label}
            </a>
          ))}
          <a
            href="#turnero"
            className="bg-rose text-white text-sm font-semibold px-5 py-2.5 rounded-full shadow-rose hover:-translate-y-0.5 hover:shadow-rose-lg transition-all duration-200 min-h-[44px] flex items-center"
          >
            Reservar turno
          </a>
          <Link
            to="/admin"
            className="text-xs text-muted hover:text-rose transition-colors duration-200 min-h-[44px] flex items-center"
          >
            Admin
          </Link>
        </div>

        {/* Mobile hamburger — 44x44 touch target */}
        <button
          className="md:hidden w-11 h-11 flex items-center justify-center text-charcoal rounded-xl hover:bg-rose/5 transition-colors"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
          aria-expanded={menuOpen}
        >
          <div className="w-5 space-y-[5px]">
            <span className={`block h-0.5 bg-current transition-all duration-200 origin-center ${menuOpen ? 'rotate-45 translate-y-[7px]' : ''}`} />
            <span className={`block h-0.5 bg-current transition-all duration-200 ${menuOpen ? 'opacity-0 scale-x-0' : ''}`} />
            <span className={`block h-0.5 bg-current transition-all duration-200 origin-center ${menuOpen ? '-rotate-45 -translate-y-[7px]' : ''}`} />
          </div>
        </button>
      </div>

      {/* Mobile menu — animated */}
      <div
        className="md:hidden overflow-hidden transition-all duration-300 ease-in-out"
        style={{ maxHeight: menuOpen ? '320px' : '0px' }}
      >
        <div className="border-t border-rose/10 px-4 py-4 flex flex-col gap-1">
          {navLinks.map(({ href, label }) => (
            <a
              key={href}
              href={href}
              className="min-h-[48px] flex items-center px-3 text-[15px] font-medium text-charcoal hover:text-rose hover:bg-rose/5 rounded-xl transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              {label}
            </a>
          ))}
          <a
            href="#turnero"
            className="mt-2 min-h-[48px] flex items-center justify-center bg-rose text-white text-sm font-semibold px-5 rounded-full shadow-rose"
            onClick={() => setMenuOpen(false)}
          >
            Reservar turno
          </a>
          <Link
            to="/admin"
            className="min-h-[44px] flex items-center justify-center text-xs text-muted hover:text-rose transition-colors"
            onClick={() => setMenuOpen(false)}
          >
            Panel admin →
          </Link>
        </div>
      </div>
    </nav>
  );
}
