import { motion } from 'motion/react';

export function Hero() {
  return (
    <section
      id="top"
      className="min-h-svh flex items-center relative overflow-hidden pt-[72px]"
      style={{ background: 'linear-gradient(145deg, #FDF0EF 0%, #F7EBE8 100%)' }}
    >
      {/* Animated background orbs */}
      <div className="absolute top-[6%] right-[-4%] w-[520px] h-[520px] rounded-full pointer-events-none animate-float-a"
        style={{ background: 'rgba(196,116,138,0.13)', filter: 'blur(70px)' }} />
      <div className="absolute bottom-[4%] left-[-6%] w-[380px] h-[380px] rounded-full pointer-events-none animate-float-b"
        style={{ background: 'rgba(201,169,110,0.1)', filter: 'blur(55px)' }} />
      <div className="absolute top-[40%] left-[42%] w-[200px] h-[200px] rounded-full pointer-events-none animate-float-c"
        style={{ background: 'rgba(196,116,138,0.06)', filter: 'blur(40px)' }} />

      {/* Grid pattern */}
      <div
        className="absolute inset-0 pointer-events-none opacity-60"
        style={{ backgroundImage: 'radial-gradient(circle, rgba(196,116,138,0.06) 1px, transparent 1px)', backgroundSize: '40px 40px' }}
      />

      <div className="max-w-6xl mx-auto px-6 py-12 md:py-20 w-full grid md:grid-cols-2 gap-10 md:gap-16 items-center">
        {/* Text */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="inline-flex items-center gap-2 mb-6 px-3.5 py-1.5 rounded-full bg-rose/10 border border-rose/25"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-rose animate-pulse-rose" />
            <span className="text-[11px] font-semibold tracking-[0.12em] uppercase text-rose">Peluquería Femenina</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="font-display font-semibold leading-[1.08] text-charcoal mb-5"
            style={{ fontSize: 'clamp(2.6rem, 5.5vw, 4.2rem)' }}
          >
            Tu próximo look<br />
            <em className="shimmer-text not-italic">empieza con un<br />turno fácil y rápido</em>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-[17px] leading-[1.7] text-muted font-light mb-9 max-w-[460px]"
          >
            Resultados de calidad con productos profesionales y precios accesibles. Porque merecés sentirte bien, sin complicaciones.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.5 }}
            className="flex gap-4 flex-wrap mb-10"
          >
            <a
              href="#turnero"
              className="inline-flex items-center gap-2 bg-rose text-white px-8 py-3.5 rounded-full text-[15px] font-semibold shadow-rose hover:-translate-y-0.5 hover:shadow-rose-lg transition-all duration-300 animate-pulse-rose"
            >
              ✦ Reservar turno
            </a>
            <a
              href="#servicios"
              className="inline-flex items-center gap-2 border border-charcoal/20 text-charcoal px-8 py-3.5 rounded-full text-[15px] font-medium hover:border-rose hover:text-rose hover:-translate-y-px transition-all duration-300"
            >
              Ver servicios →
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="flex gap-6 flex-wrap"
          >
            {['✓ Turnos sin espera', '✓ Productos profesionales', '✓ Cursos certificados'].map((t) => (
              <span key={t} className="text-[13px] text-muted font-light">{t}</span>
            ))}
          </motion.div>
        </motion.div>

        {/* Image column */}
        <motion.div
          initial={{ opacity: 0, x: 32 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="hidden md:flex justify-center"
        >
          <div className="relative w-full max-w-[440px]">
            {/* Spinning rings */}
            <div className="absolute -top-7 -right-7 w-[140px] h-[140px] rounded-full border border-dashed border-gold/40 pointer-events-none z-0 animate-spin-slow" />
            <div className="absolute -top-2.5 -right-2.5 w-[104px] h-[104px] rounded-full border border-dashed border-rose/25 pointer-events-none z-0 animate-spin-reverse" />

            {/* Image frame */}
            <div className="rounded-[24px_24px_80px_24px] overflow-hidden aspect-[4/5] bg-rose/10 relative z-[1]"
              style={{ boxShadow: '0 40px 100px rgba(0,0,0,0.15)' }}>
              <img src="/salon-bg.jpeg" alt="Salón Ariana" className="w-full h-full object-cover" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-charcoal/40" />
              <div className="absolute top-4 left-4 w-12 h-12 border-t-2 border-l-2 border-white/60 rounded-tl-sm" />
              <div className="absolute bottom-4 right-4 w-12 h-12 border-b-2 border-r-2 border-white/60 rounded-br-sm" />
            </div>

            {/* Floating card */}
            <div className="animate-bounce-in [animation-delay:0.8s] absolute -bottom-6 -left-6 bg-white rounded-2xl px-5 py-4 z-[2] flex items-center gap-3"
              style={{ boxShadow: '0 20px 56px rgba(0,0,0,0.14)' }}>
              <div className="w-10 h-10 rounded-full bg-rose/12 flex items-center justify-center text-lg animate-float-c">✂</div>
              <div>
                <div className="text-[13px] font-bold text-charcoal">Turno disponible hoy</div>
                <div className="text-xs text-muted">desde las 10:00 hs</div>
              </div>
            </div>

            {/* Stats badge */}
            <div className="animate-float-a absolute top-[20%] -left-8 bg-rose rounded-2xl px-4 py-3 z-[2]"
              style={{ boxShadow: '0 12px 36px rgba(196,116,138,0.4)' }}>
              <div className="font-display text-2xl font-bold text-white leading-none">100%</div>
              <div className="text-[10px] text-white/85 font-semibold tracking-[0.06em] uppercase mt-0.5">Satisfacción</div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 animate-fade-in [animation-delay:1.1s]">
        <span className="text-[10px] tracking-[0.15em] uppercase text-muted/70">Scrollear</span>
        <div className="w-px h-10 bg-gradient-to-b from-rose/50 to-transparent animate-float-a" />
      </div>
    </section>
  );
}
