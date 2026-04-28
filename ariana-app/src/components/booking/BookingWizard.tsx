import { useBookingStore } from '../../store/bookingStore';
import { useAdminStore } from '../../store/adminStore';
import { SERVICES, TIME_SLOTS, UNAVAILABLE_SLOTS, WHATSAPP } from '../../lib/constants';
import { formatDate, buildWhatsAppMessage } from '../../lib/utils';
import { MiniCalendar } from './MiniCalendar';
import { Button } from '../ui/Button';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const STEPS = ['Servicio', 'Fecha', 'Horario', 'Tus datos'];

const formSchema = z.object({
  name: z.string().min(2, 'Ingresá tu nombre'),
  phone: z.string().min(8, 'Ingresá un número de WhatsApp válido'),
});

type FormValues = z.infer<typeof formSchema>;

function StepIndicator({ step }: { step: number }) {
  return (
    <div className="flex justify-center items-center gap-0 mb-10">
      {STEPS.map((s, i) => {
        const active = step === i + 1;
        const done = step > i + 1;
        return (
          <div key={i} className="flex items-center">
            <div className="flex flex-col items-center gap-1.5">
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold font-sans transition-all duration-300"
                style={{
                  background: done || active ? 'var(--rose)' : '#F0F0F0',
                  border: done || active ? 'none' : '1px solid #DDD',
                  color: done || active ? '#fff' : '#7A7A7A',
                }}
              >
                {done ? '✓' : i + 1}
              </div>
              <span
                className="text-[10px] font-semibold tracking-wider uppercase"
                style={{ color: active ? 'var(--rose)' : '#7A7A7A' }}
              >
                {s}
              </span>
            </div>
            {i < STEPS.length - 1 && (
              <div
                className="w-16 h-px mb-5 mx-2 transition-colors duration-300"
                style={{ background: done ? 'var(--rose)' : '#E0E0E0' }}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

export function BookingWizard() {
  const {
    step, service, date, time, clientName, clientPhone, status,
    setStep, setService, setDate, setTime, setClientName, setClientPhone, setStatus, reset,
  } = useBookingStore();

  const addAppointment = useAdminStore((s) => s.addAppointment);

  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    values: { name: clientName, phone: clientPhone },
  });

  const onSubmit = (data: FormValues) => {
    setClientName(data.name);
    setClientPhone(data.phone);
    setStatus('loading');
    setTimeout(() => {
      const svc = SERVICES.find((s) => s.name === service);
      addAppointment({
        clientName: data.name,
        clientPhone: data.phone,
        service,
        date: date ? date.toISOString().split('T')[0] : '',
        time,
        status: 'pending',
        price: svc?.priceNum ?? 0,
      });
      setStatus('success');
    }, 1200);
  };

  const waLink = `https://wa.me/${WHATSAPP}?text=${buildWhatsAppMessage(service, date, time, clientName, clientPhone)}`;
  const waFallback = `https://wa.me/${WHATSAPP}?text=Hola%20Ariana!%20Quisiera%20reservar%20un%20turno%20%F0%9F%92%86%E2%80%8D%E2%99%80%EF%B8%8F`;

  if (status === 'success') {
    return (
      <section id="turnero" className="py-24 px-6" style={{ background: 'linear-gradient(160deg, #FDF0EF 0%, #F9EDE9 100%)' }}>
        <div className="max-w-[560px] mx-auto text-center">
          <div className="w-20 h-20 rounded-full bg-rose/12 flex items-center justify-center text-4xl mx-auto mb-8 animate-bounce-in">
            ✓
          </div>
          <h2 className="font-display text-4xl font-semibold text-rose mb-3">¡Casi listo!</h2>
          <p className="text-base text-muted leading-[1.7] mb-2">
            Confirmaste: <strong className="text-charcoal">{service}</strong> el{' '}
            <strong className="text-charcoal">{formatDate(date)}</strong> a las{' '}
            <strong className="text-charcoal">{time} hs</strong>.
          </p>
          <p className="text-[14.4px] text-muted leading-[1.6] mb-8">
            Para confirmar tu turno, tocá el botón y enviá el mensaje por WhatsApp. ¡Te esperamos!
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#25D366] text-white px-8 py-3.5 rounded-full text-[15px] font-bold hover:-translate-y-0.5 transition-all"
              style={{ boxShadow: '0 8px 32px rgba(37,211,102,0.35)' }}
            >
              💬 Confirmar por WhatsApp
            </a>
            <Button
              variant="outline"
              onClick={reset}
            >
              Nuevo turno
            </Button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="turnero" className="py-24 px-6" style={{ background: 'linear-gradient(160deg, #FDF0EF 0%, #F9EDE9 100%)' }}>
      <div className="max-w-[760px] mx-auto">
        <div className="text-center mb-10">
          <p className="section-label">Reserva online</p>
          <h2 className="font-display text-4xl font-semibold text-charcoal leading-tight">
            Reservá tu turno<br />
            <em className="not-italic text-rose">en minutos</em>
          </h2>
        </div>

        <StepIndicator step={step} />

        <div className="bg-white rounded-2xl border border-charcoal/8 p-8 md:p-10 shadow-card">

          {/* Step 1: Service */}
          {step === 1 && (
            <div>
              <h3 className="font-display text-2xl font-semibold text-charcoal mb-1">¿Qué servicio necesitás?</h3>
              <p className="text-sm text-muted mb-7">Seleccioná el servicio que querés reservar</p>
              <div className="grid sm:grid-cols-2 gap-3">
                {SERVICES.map((s) => (
                  <button
                    key={s.name}
                    onClick={() => setService(s.name)}
                    className="p-4 rounded-xl text-left transition-all duration-200 flex justify-between items-center"
                    style={{
                      border: `1.5px solid ${service === s.name ? 'var(--rose)' : '#E8E8E8'}`,
                      background: service === s.name ? 'rgba(196,116,138,0.08)' : 'transparent',
                    }}
                  >
                    <div>
                      <div className="font-sans font-semibold text-sm mb-0.5" style={{ color: service === s.name ? 'var(--rose)' : '#1A1A1A' }}>{s.name}</div>
                      <div className="font-sans text-xs text-muted">{s.price}</div>
                    </div>
                    {service === s.name && <span className="text-rose">✓</span>}
                  </button>
                ))}
              </div>
              <div className="mt-8 flex justify-end">
                <Button disabled={!service} onClick={() => setStep(2)}>Continuar →</Button>
              </div>
            </div>
          )}

          {/* Step 2: Date */}
          {step === 2 && (
            <div>
              <h3 className="font-display text-2xl font-semibold text-charcoal mb-1">Elegí una fecha</h3>
              <p className="text-sm text-muted mb-7">Atendemos de lunes a sábado</p>
              <MiniCalendar selected={date} onSelect={setDate} />
              {date && (
                <div className="mt-3 inline-flex items-center gap-2 bg-rose/8 border border-rose/20 rounded-xl px-4 py-2">
                  <span className="text-sm text-rose">📅</span>
                  <span className="font-sans text-sm font-medium text-rose">{formatDate(date)}</span>
                </div>
              )}
              <div className="mt-8 flex justify-between">
                <Button variant="ghost" onClick={() => setStep(1)}>← Volver</Button>
                <Button disabled={!date} onClick={() => setStep(3)}>Continuar →</Button>
              </div>
            </div>
          )}

          {/* Step 3: Time */}
          {step === 3 && (
            <div>
              <h3 className="font-display text-2xl font-semibold text-charcoal mb-1">Elegí un horario</h3>
              <p className="text-sm text-muted mb-7">Horarios disponibles para el {formatDate(date)}</p>
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-2.5">
                {TIME_SLOTS.map((t) => {
                  const unavail = UNAVAILABLE_SLOTS.includes(t);
                  const sel = time === t;
                  return (
                    <button
                      key={t}
                      disabled={unavail}
                      onClick={() => setTime(t)}
                      className="py-3 rounded-xl text-sm font-medium font-sans transition-all duration-200"
                      style={{
                        border: `1.5px solid ${sel ? 'var(--rose)' : unavail ? 'transparent' : '#E8E8E8'}`,
                        background: sel ? 'rgba(196,116,138,0.1)' : unavail ? '#F9F9F9' : 'transparent',
                        color: sel ? 'var(--rose)' : unavail ? '#CCC' : '#1A1A1A',
                        fontWeight: sel ? 700 : 500,
                        cursor: unavail ? 'not-allowed' : 'pointer',
                        textDecoration: unavail ? 'line-through' : 'none',
                      }}
                    >
                      {t}
                    </button>
                  );
                })}
              </div>
              <p className="mt-3 text-xs text-muted italic">Los horarios tachados ya están ocupados</p>
              <div className="mt-8 flex justify-between">
                <Button variant="ghost" onClick={() => setStep(2)}>← Volver</Button>
                <Button disabled={!time} onClick={() => setStep(4)}>Continuar →</Button>
              </div>
            </div>
          )}

          {/* Step 4: Form */}
          {step === 4 && (
            <form onSubmit={handleSubmit(onSubmit)}>
              <h3 className="font-display text-2xl font-semibold text-charcoal mb-1">Tus datos</h3>
              <p className="text-sm text-muted mb-7">Completá tus datos para confirmar el turno</p>

              <div className="flex gap-4 flex-wrap bg-rose/5 border border-rose/20 rounded-xl px-5 py-3 mb-7">
                {[['✂', service], ['📅', formatDate(date)], ['⏰', `${time} hs`]].map(([icon, val]) => (
                  <div key={val} className="flex items-center gap-1.5">
                    <span className="text-sm">{icon}</span>
                    <span className="font-sans text-[13px] font-semibold text-rose">{val}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-col gap-5">
                <div>
                  <label className="block font-sans text-sm font-semibold text-charcoal mb-2">Tu nombre *</label>
                  <input
                    {...register('name')}
                    placeholder="Ej: María García"
                    className="w-full px-4 py-3.5 rounded-xl font-sans text-[15px] text-charcoal bg-gray-50 outline-none transition-all duration-200"
                    style={{
                      border: `1.5px solid ${errors.name ? '#E86060' : '#E0E0E0'}`,
                    }}
                    onFocus={e => (e.target.style.borderColor = 'var(--rose)')}
                    onBlur={e => { if (!errors.name) e.target.style.borderColor = '#E0E0E0'; }}
                  />
                  {errors.name && <p className="text-[12px] text-red-500 mt-1">{errors.name.message}</p>}
                </div>

                <div>
                  <label className="block font-sans text-sm font-semibold text-charcoal mb-2">Tu WhatsApp *</label>
                  <input
                    {...register('phone')}
                    type="tel"
                    placeholder="Ej: +54 9 11 1234-5678"
                    className="w-full px-4 py-3.5 rounded-xl font-sans text-[15px] text-charcoal bg-gray-50 outline-none transition-all duration-200"
                    style={{ border: `1.5px solid ${errors.phone ? '#E86060' : '#E0E0E0'}` }}
                    onFocus={e => (e.target.style.borderColor = 'var(--rose)')}
                    onBlur={e => { if (!errors.phone) e.target.style.borderColor = '#E0E0E0'; }}
                  />
                  {errors.phone && <p className="text-[12px] text-red-500 mt-1">{errors.phone.message}</p>}
                  <p className="text-xs text-muted italic mt-1">Te enviaremos la confirmación por WhatsApp</p>
                </div>
              </div>

              <div className="mt-8 flex justify-between items-center flex-wrap gap-4">
                <Button variant="ghost" type="button" onClick={() => setStep(3)}>← Volver</Button>
                <Button type="submit" loading={status === 'loading'}>
                  ✦ Confirmar turno
                </Button>
              </div>
            </form>
          )}
        </div>

        <div className="text-center mt-6">
          <p className="text-[13px] text-muted">
            ¿Preferís escribir directamente?{' '}
            <a href={waFallback} target="_blank" rel="noopener noreferrer" className="text-rose font-semibold hover:underline">
              Escribinos por WhatsApp →
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
