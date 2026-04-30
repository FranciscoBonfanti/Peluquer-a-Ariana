
// ─── Ariana Peluquería — Turnero (Booking Form) ────────────────────────────

const { useState, useEffect, useRef } = React;

const TIME_SLOTS = ['09:00','09:30','10:00','10:30','11:00','11:30','14:00','14:30','15:00','15:30','16:00','16:30','17:00','17:30'];
// Simulate some slots as unavailable
const UNAVAILABLE = ['09:30','11:30','15:00','17:00'];

function getDaysInMonth(year, month) {
  return new Date(year, month + 1, 0).getDate();
}
function getFirstDayOfMonth(year, month) {
  return new Date(year, month, 1).getDay();
}
function formatDate(d) {
  if (!d) return '';
  const days = ['Domingo','Lunes','Martes','Miércoles','Jueves','Viernes','Sábado'];
  const months = ['enero','febrero','marzo','abril','mayo','junio','julio','agosto','septiembre','octubre','noviembre','diciembre'];
  return `${days[d.getDay()]} ${d.getDate()} de ${months[d.getMonth()]}`;
}

function MiniCalendar({ selected, onSelect }) {
  const today = new Date();
  const [view, setView] = useState({ year: today.getFullYear(), month: today.getMonth() });
  const monthNames = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];
  const days = getDaysInMonth(view.year, view.month);
  const firstDay = getFirstDayOfMonth(view.year, view.month);

  const cells = [];
  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let d = 1; d <= days; d++) cells.push(d);

  const isToday = (d) => d === today.getDate() && view.month === today.getMonth() && view.year === today.getFullYear();
  const isPast = (d) => new Date(view.year, view.month, d) < new Date(today.toDateString());
  const isSunday = (d) => new Date(view.year, view.month, d).getDay() === 0;
  const isSelected = (d) => selected && d === selected.getDate() && view.month === selected.getMonth() && view.year === selected.getFullYear();

  function prevMonth() {
    setView(v => v.month === 0 ? { year: v.year - 1, month: 11 } : { ...v, month: v.month - 1 });
  }
  function nextMonth() {
    setView(v => v.month === 11 ? { year: v.year + 1, month: 0 } : { ...v, month: v.month + 1 });
  }

  return (
    <div style={{ background: '#fff', borderRadius: 16, border: '1px solid rgba(0,0,0,0.08)', padding: '1.25rem', userSelect: 'none' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <button onClick={prevMonth} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#7A7A7A', fontSize: '1.1rem', padding: '0.25rem 0.5rem', borderRadius: 8, transition: 'background 0.2s' }}
                onMouseEnter={e => e.target.style.background = '#f5f5f5'} onMouseLeave={e => e.target.style.background = 'none'}>‹</button>
        <span style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 600, fontSize: '1rem', color: '#1A1A1A' }}>{monthNames[view.month]} {view.year}</span>
        <button onClick={nextMonth} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#7A7A7A', fontSize: '1.1rem', padding: '0.25rem 0.5rem', borderRadius: 8, transition: 'background 0.2s' }}
                onMouseEnter={e => e.target.style.background = '#f5f5f5'} onMouseLeave={e => e.target.style.background = 'none'}>›</button>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '0.15rem', marginBottom: '0.5rem' }}>
        {['Do','Lu','Ma','Mi','Ju','Vi','Sa'].map(d => (
          <div key={d} style={{ textAlign: 'center', fontSize: '0.6875rem', fontFamily: 'DM Sans, sans-serif', fontWeight: 600, color: '#7A7A7A', letterSpacing: '0.05em', padding: '0.25rem 0' }}>{d}</div>
        ))}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '0.15rem' }}>
        {cells.map((d, i) => {
          if (!d) return <div key={i} />;
          const disabled = isPast(d) || isSunday(d);
          const sel = isSelected(d);
          const tod = isToday(d);
          return (
            <button key={i} disabled={disabled}
                    onClick={() => onSelect(new Date(view.year, view.month, d))}
                    style={{ width: '100%', aspectRatio: '1', border: 'none', borderRadius: 8, cursor: disabled ? 'not-allowed' : 'pointer', fontFamily: 'DM Sans, sans-serif', fontSize: '0.8125rem', fontWeight: sel ? 600 : 400, background: sel ? 'var(--rose)' : tod ? 'rgba(196,116,138,0.1)' : 'transparent', color: disabled ? '#ccc' : sel ? '#fff' : tod ? 'var(--rose)' : '#1A1A1A', transition: 'background 0.15s', outline: 'none' }}
                    onMouseEnter={e => { if (!disabled && !sel) e.target.style.background = '#FDF0EF'; }}
                    onMouseLeave={e => { if (!disabled && !sel) e.target.style.background = 'transparent'; }}>
              {d}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function Turnero({ variant, whatsapp }) {
  const [step, setStep] = useState(1); // 1=service, 2=date, 3=time, 4=form
  const [service, setService] = useState('');
  const [date, setDate] = useState(null);
  const [time, setTime] = useState('');
  const [form, setForm] = useState({ name: '', phone: '' });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | loading | success | error

  const bg = variant === 'A' ? '#F9F4F2' : variant === 'C' ? '#111' : 'linear-gradient(160deg, #FDF0EF 0%, #F9EDE9 100%)';
  const textColor = variant === 'C' ? '#fff' : '#1A1A1A';
  const cardBg = variant === 'C' ? 'rgba(255,255,255,0.04)' : '#fff';
  const cardBorder = variant === 'C' ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)';

  const steps = ['Servicio', 'Fecha', 'Horario', 'Tus datos'];

  function validate() {
    const e = {};
    if (!form.name.trim()) e.name = 'Por favor ingresá tu nombre';
    if (!form.phone.trim() || form.phone.replace(/\D/g,'').length < 8) e.phone = 'Ingresá un número de WhatsApp válido';
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function handleConfirm() {
    if (!validate()) return;
    setStatus('loading');
    setTimeout(() => {
      setStatus('success');
    }, 1200);
  }

  function buildWhatsAppMessage() {
    return encodeURIComponent(
      `Hola Ariana! 👋 Quisiera reservar un turno:\n\n📌 Servicio: ${service}\n📅 Fecha: ${formatDate(date)}\n⏰ Horario: ${time} hs\n👤 Nombre: ${form.name}\n📱 WhatsApp: ${form.phone}\n\n¡Muchas gracias! 💆‍♀️`
    );
  }

  const waLink = `https://wa.me/${whatsapp}?text=${buildWhatsAppMessage()}`;

  if (status === 'success') {
    return (
      <section id="turnero" style={{ background: bg, padding: '6rem 1.5rem' }}>
        <div style={{ maxWidth: 560, margin: '0 auto', textAlign: 'center' }}>
          <div style={{ width: 80, height: 80, borderRadius: '50%', background: 'rgba(196,116,138,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2.5rem', margin: '0 auto 2rem' }}>✓</div>
          <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '2.5rem', fontWeight: 600, color: 'var(--rose)', marginBottom: '0.75rem' }}>¡Casi listo!</h2>
          <p style={{ fontSize: '1rem', color: textColor === '#fff' ? 'rgba(255,255,255,0.75)' : '#7A7A7A', fontFamily: 'DM Sans, sans-serif', lineHeight: 1.7, marginBottom: '0.5rem' }}>
            Confirmaste: <strong style={{ color: textColor }}>{service}</strong> el <strong style={{ color: textColor }}>{formatDate(date)}</strong> a las <strong style={{ color: textColor }}>{time} hs</strong>.
          </p>
          <p style={{ fontSize: '0.9rem', color: textColor === '#fff' ? 'rgba(255,255,255,0.6)' : '#7A7A7A', fontFamily: 'DM Sans, sans-serif', lineHeight: 1.6, marginBottom: '2rem' }}>
            Para confirmar tu turno, tocá el botón y enviá el mensaje por WhatsApp. ¡Te esperamos!
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href={waLink} target="_blank" rel="noopener"
               style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: '#25D366', color: '#fff', padding: '0.9rem 2rem', borderRadius: 999, fontSize: '0.9375rem', fontFamily: 'DM Sans, sans-serif', fontWeight: 700, textDecoration: 'none', boxShadow: '0 8px 32px rgba(37,211,102,0.35)', transition: 'all 0.3s' }}
               onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'} onMouseLeave={e => e.currentTarget.style.transform = ''}>
              💬 Confirmar por WhatsApp
            </a>
            <button onClick={() => { setStep(1); setService(''); setDate(null); setTime(''); setForm({ name: '', phone: '' }); setStatus('idle'); }}
                    style={{ background: 'transparent', color: 'var(--rose)', padding: '0.9rem 1.75rem', borderRadius: 999, fontSize: '0.875rem', fontFamily: 'DM Sans, sans-serif', fontWeight: 600, border: '1px solid var(--rose)', cursor: 'pointer', transition: 'all 0.3s' }}
                    onMouseEnter={e => { e.currentTarget.style.background = 'var(--rose)'; e.currentTarget.style.color = '#fff'; }}
                    onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--rose)'; }}>
              Nuevo turno
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="turnero" style={{ background: bg, padding: '6rem 1.5rem' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <p style={{ fontSize: '0.75rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--rose)', fontFamily: 'DM Sans, sans-serif', fontWeight: 600, marginBottom: '0.75rem' }}>Reserva online</p>
          <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 600, color: textColor, lineHeight: 1.1 }}>Reservá tu turno<br /><em style={{ fontStyle: 'italic', color: 'var(--rose)' }}>en minutos</em></h2>
        </div>

        {/* Step indicator */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '0', marginBottom: '2.5rem' }}>
          {steps.map((s, i) => {
            const active = step === i + 1;
            const done = step > i + 1;
            return (
              <div key={i} style={{ display: 'flex', alignItems: 'center' }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.35rem' }}>
                  <div style={{ width: 32, height: 32, borderRadius: '50%', background: done ? 'var(--rose)' : active ? 'var(--rose)' : (variant === 'C' ? 'rgba(255,255,255,0.1)' : '#F0F0F0'), border: done || active ? 'none' : `1px solid ${variant === 'C' ? 'rgba(255,255,255,0.2)' : '#DDD'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem', fontWeight: 600, color: done || active ? '#fff' : '#7A7A7A', fontFamily: 'DM Sans, sans-serif', transition: 'all 0.3s' }}>
                    {done ? '✓' : i + 1}
                  </div>
                  <span style={{ fontSize: '0.7rem', fontFamily: 'DM Sans, sans-serif', fontWeight: 500, color: active ? 'var(--rose)' : (variant === 'C' ? 'rgba(255,255,255,0.45)' : '#7A7A7A'), letterSpacing: '0.04em', textTransform: 'uppercase' }}>{s}</span>
                </div>
                {i < steps.length - 1 && (
                  <div style={{ width: 64, height: 1, background: done ? 'var(--rose)' : (variant === 'C' ? 'rgba(255,255,255,0.1)' : '#E0E0E0'), margin: '0 0.5rem', marginBottom: '1.2rem', transition: 'background 0.3s' }} />
                )}
              </div>
            );
          })}
        </div>

        {/* Card */}
        <div style={{ background: cardBg, border: `1px solid ${cardBorder}`, borderRadius: variant === 'A' ? 2 : 20, padding: '2.5rem', boxShadow: variant === 'C' ? 'none' : '0 8px 48px rgba(0,0,0,0.08)' }}>

          {/* Step 1: Service */}
          {step === 1 && (
            <div>
              <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.5rem', fontWeight: 600, color: textColor, marginBottom: '0.5rem' }}>¿Qué servicio necesitás?</h3>
              <p style={{ fontSize: '0.875rem', color: '#7A7A7A', fontFamily: 'DM Sans, sans-serif', marginBottom: '1.75rem' }}>Seleccioná el servicio que querés reservar</p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.75rem' }}>
                {SERVICES.map(s => (
                  <button key={s.name} onClick={() => setService(s.name)}
                          style={{ padding: '1rem 1.25rem', borderRadius: 12, border: `1.5px solid ${service === s.name ? 'var(--rose)' : (variant === 'C' ? 'rgba(255,255,255,0.1)' : '#E8E8E8')}`, background: service === s.name ? 'rgba(196,116,138,0.08)' : 'transparent', cursor: 'pointer', textAlign: 'left', transition: 'all 0.2s', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <div style={{ fontFamily: 'DM Sans, sans-serif', fontWeight: 600, fontSize: '0.9rem', color: service === s.name ? 'var(--rose)' : textColor, marginBottom: '0.1rem' }}>{s.name}</div>
                      <div style={{ fontFamily: 'DM Sans, sans-serif', fontWeight: 400, fontSize: '0.775rem', color: '#7A7A7A' }}>{s.price}</div>
                    </div>
                    {service === s.name && <span style={{ color: 'var(--rose)', fontSize: '1rem' }}>✓</span>}
                  </button>
                ))}
              </div>
              <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'flex-end' }}>
                <button disabled={!service} onClick={() => setStep(2)}
                        style={{ background: service ? 'var(--rose)' : '#E0E0E0', color: service ? '#fff' : '#aaa', padding: '0.8rem 2rem', borderRadius: 999, fontSize: '0.9rem', fontFamily: 'DM Sans, sans-serif', fontWeight: 600, border: 'none', cursor: service ? 'pointer' : 'not-allowed', transition: 'all 0.3s', boxShadow: service ? '0 6px 24px rgba(196,116,138,0.35)' : 'none' }}>
                  Continuar →
                </button>
              </div>
            </div>
          )}

          {/* Step 2: Date */}
          {step === 2 && (
            <div>
              <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.5rem', fontWeight: 600, color: textColor, marginBottom: '0.5rem' }}>Elegí una fecha</h3>
              <p style={{ fontSize: '0.875rem', color: '#7A7A7A', fontFamily: 'DM Sans, sans-serif', marginBottom: '1.75rem' }}>Atendemos de lunes a sábado</p>
              <MiniCalendar selected={date} onSelect={setDate} />
              {date && (
                <div style={{ marginTop: '1rem', padding: '0.75rem 1rem', background: 'rgba(196,116,138,0.08)', borderRadius: 10, border: '1px solid rgba(196,116,138,0.2)', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span style={{ color: 'var(--rose)', fontSize: '0.875rem' }}>📅</span>
                  <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.875rem', fontWeight: 500, color: 'var(--rose)' }}>{formatDate(date)}</span>
                </div>
              )}
              <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'space-between' }}>
                <button onClick={() => setStep(1)} style={{ background: 'transparent', color: '#7A7A7A', padding: '0.8rem 1.5rem', borderRadius: 999, fontSize: '0.875rem', fontFamily: 'DM Sans, sans-serif', fontWeight: 500, border: '1px solid #E0E0E0', cursor: 'pointer' }}>← Volver</button>
                <button disabled={!date} onClick={() => setStep(3)}
                        style={{ background: date ? 'var(--rose)' : '#E0E0E0', color: date ? '#fff' : '#aaa', padding: '0.8rem 2rem', borderRadius: 999, fontSize: '0.9rem', fontFamily: 'DM Sans, sans-serif', fontWeight: 600, border: 'none', cursor: date ? 'pointer' : 'not-allowed', transition: 'all 0.3s', boxShadow: date ? '0 6px 24px rgba(196,116,138,0.35)' : 'none' }}>
                  Continuar →
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Time */}
          {step === 3 && (
            <div>
              <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.5rem', fontWeight: 600, color: textColor, marginBottom: '0.5rem' }}>Elegí un horario</h3>
              <p style={{ fontSize: '0.875rem', color: '#7A7A7A', fontFamily: 'DM Sans, sans-serif', marginBottom: '1.75rem' }}>Horarios disponibles para el {formatDate(date)}</p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.65rem' }}>
                {TIME_SLOTS.map(t => {
                  const unavail = UNAVAILABLE.includes(t);
                  const sel = time === t;
                  return (
                    <button key={t} disabled={unavail} onClick={() => setTime(t)}
                            style={{ padding: '0.75rem', borderRadius: 10, border: `1.5px solid ${sel ? 'var(--rose)' : (unavail ? 'transparent' : (variant === 'C' ? 'rgba(255,255,255,0.1)' : '#E8E8E8'))}`, background: sel ? 'rgba(196,116,138,0.1)' : (unavail ? (variant === 'C' ? 'rgba(255,255,255,0.02)' : '#F9F9F9') : 'transparent'), color: sel ? 'var(--rose)' : (unavail ? '#CCC' : textColor), fontFamily: 'DM Sans, sans-serif', fontSize: '0.875rem', fontWeight: sel ? 700 : 500, cursor: unavail ? 'not-allowed' : 'pointer', transition: 'all 0.2s', textDecoration: unavail ? 'line-through' : 'none' }}>
                      {t}
                    </button>
                  );
                })}
              </div>
              <p style={{ marginTop: '0.75rem', fontSize: '0.75rem', color: '#7A7A7A', fontFamily: 'DM Sans, sans-serif', fontStyle: 'italic' }}>Los horarios tachados ya están ocupados</p>
              <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'space-between' }}>
                <button onClick={() => setStep(2)} style={{ background: 'transparent', color: '#7A7A7A', padding: '0.8rem 1.5rem', borderRadius: 999, fontSize: '0.875rem', fontFamily: 'DM Sans, sans-serif', fontWeight: 500, border: '1px solid #E0E0E0', cursor: 'pointer' }}>← Volver</button>
                <button disabled={!time} onClick={() => setStep(4)}
                        style={{ background: time ? 'var(--rose)' : '#E0E0E0', color: time ? '#fff' : '#aaa', padding: '0.8rem 2rem', borderRadius: 999, fontSize: '0.9rem', fontFamily: 'DM Sans, sans-serif', fontWeight: 600, border: 'none', cursor: time ? 'pointer' : 'not-allowed', transition: 'all 0.3s', boxShadow: time ? '0 6px 24px rgba(196,116,138,0.35)' : 'none' }}>
                  Continuar →
                </button>
              </div>
            </div>
          )}

          {/* Step 4: Form */}
          {step === 4 && (
            <div>
              <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.5rem', fontWeight: 600, color: textColor, marginBottom: '0.5rem' }}>Tus datos</h3>
              <p style={{ fontSize: '0.875rem', color: '#7A7A7A', fontFamily: 'DM Sans, sans-serif', marginBottom: '1.75rem' }}>Completá tus datos para confirmar el turno</p>

              {/* Summary */}
              <div style={{ background: variant === 'C' ? 'rgba(196,116,138,0.08)' : '#FDF8F7', border: '1px solid rgba(196,116,138,0.2)', borderRadius: 12, padding: '1rem 1.25rem', marginBottom: '1.75rem', display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
                {[['✂', service],['📅', formatDate(date)],['⏰', `${time} hs`]].map(([icon, val]) => (
                  <div key={val} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <span style={{ fontSize: '0.9rem' }}>{icon}</span>
                    <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.8125rem', fontWeight: 600, color: 'var(--rose)' }}>{val}</span>
                  </div>
                ))}
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                {/* Name */}
                <div>
                  <label style={{ display: 'block', fontFamily: 'DM Sans, sans-serif', fontSize: '0.8125rem', fontWeight: 600, color: textColor, marginBottom: '0.5rem', letterSpacing: '0.02em' }}>
                    Tu nombre *
                  </label>
                  <input value={form.name} onChange={e => { setForm(f => ({...f, name: e.target.value})); setErrors(err => ({...err, name: ''})); }}
                         placeholder="Ej: María García"
                         style={{ width: '100%', padding: '0.85rem 1rem', borderRadius: 10, border: `1.5px solid ${errors.name ? '#E86060' : (variant === 'C' ? 'rgba(255,255,255,0.12)' : '#E0E0E0')}`, fontFamily: 'DM Sans, sans-serif', fontSize: '0.9375rem', color: '#1A1A1A', background: variant === 'C' ? 'rgba(255,255,255,0.05)' : '#FAFAFA', outline: 'none', transition: 'border-color 0.2s', boxSizing: 'border-box' }}
                         onFocus={e => e.target.style.borderColor = 'var(--rose)'}
                         onBlur={e => { if (!errors.name) e.target.style.borderColor = variant === 'C' ? 'rgba(255,255,255,0.12)' : '#E0E0E0'; }} />
                  {errors.name && <p style={{ color: '#E86060', fontSize: '0.75rem', fontFamily: 'DM Sans, sans-serif', marginTop: '0.35rem' }}>{errors.name}</p>}
                </div>
                {/* Phone */}
                <div>
                  <label style={{ display: 'block', fontFamily: 'DM Sans, sans-serif', fontSize: '0.8125rem', fontWeight: 600, color: textColor, marginBottom: '0.5rem' }}>
                    Tu WhatsApp *
                  </label>
                  <input value={form.phone} onChange={e => { setForm(f => ({...f, phone: e.target.value})); setErrors(err => ({...err, phone: ''})); }}
                         placeholder="Ej: +54 9 11 1234-5678" type="tel"
                         style={{ width: '100%', padding: '0.85rem 1rem', borderRadius: 10, border: `1.5px solid ${errors.phone ? '#E86060' : (variant === 'C' ? 'rgba(255,255,255,0.12)' : '#E0E0E0')}`, fontFamily: 'DM Sans, sans-serif', fontSize: '0.9375rem', color: '#1A1A1A', background: variant === 'C' ? 'rgba(255,255,255,0.05)' : '#FAFAFA', outline: 'none', transition: 'border-color 0.2s', boxSizing: 'border-box' }}
                         onFocus={e => e.target.style.borderColor = 'var(--rose)'}
                         onBlur={e => { if (!errors.phone) e.target.style.borderColor = variant === 'C' ? 'rgba(255,255,255,0.12)' : '#E0E0E0'; }} />
                  {errors.phone && <p style={{ color: '#E86060', fontSize: '0.75rem', fontFamily: 'DM Sans, sans-serif', marginTop: '0.35rem' }}>{errors.phone}</p>}
                  <p style={{ fontSize: '0.75rem', color: '#7A7A7A', fontFamily: 'DM Sans, sans-serif', marginTop: '0.35rem', fontStyle: 'italic' }}>Te enviaremos la confirmación por WhatsApp</p>
                </div>
              </div>

              <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
                <button onClick={() => setStep(3)} style={{ background: 'transparent', color: '#7A7A7A', padding: '0.8rem 1.5rem', borderRadius: 999, fontSize: '0.875rem', fontFamily: 'DM Sans, sans-serif', fontWeight: 500, border: '1px solid #E0E0E0', cursor: 'pointer' }}>← Volver</button>
                <button onClick={handleConfirm} disabled={status === 'loading'}
                        style={{ background: 'var(--rose)', color: '#fff', padding: '0.9rem 2.25rem', borderRadius: 999, fontSize: '0.9375rem', fontFamily: 'DM Sans, sans-serif', fontWeight: 700, border: 'none', cursor: 'pointer', boxShadow: '0 8px 32px rgba(196,116,138,0.4)', transition: 'all 0.3s', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  {status === 'loading' ? (
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span style={{ width: 14, height: 14, border: '2px solid rgba(255,255,255,0.4)', borderTopColor: '#fff', borderRadius: '50%', display: 'inline-block', animation: 'spin 0.8s linear infinite' }} />
                      Confirmando...
                    </span>
                  ) : '✦ Confirmar turno'}
                </button>
              </div>
            </div>
          )}

        </div>

        {/* Fallback */}
        <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
          <p style={{ fontSize: '0.8125rem', color: variant === 'C' ? 'rgba(255,255,255,0.45)' : '#7A7A7A', fontFamily: 'DM Sans, sans-serif' }}>
            ¿Preferís escribir directamente?{' '}
            <a href={`https://wa.me/${whatsapp}?text=Hola%20Ariana!%20Quisiera%20reservar%20un%20turno%20%F0%9F%92%86%E2%80%8D%E2%99%80%EF%B8%8F`} target="_blank" rel="noopener"
               style={{ color: 'var(--rose)', fontWeight: 600, textDecoration: 'none' }}>
              Escribinos por WhatsApp →
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { Turnero });
