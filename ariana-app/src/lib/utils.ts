export function formatDate(d: Date | null): string {
  if (!d) return '';
  const days = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
  const months = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
  return `${days[d.getDay()]} ${d.getDate()} de ${months[d.getMonth()]}`;
}

export function formatDateShort(dateStr: string): string {
  const d = new Date(dateStr + 'T00:00:00');
  const months = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'];
  return `${d.getDate()} ${months[d.getMonth()]}`;
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS', maximumFractionDigits: 0 }).format(amount);
}

export function buildWhatsAppMessage(service: string, date: Date | null, time: string, name: string, phone: string): string {
  const dateStr = formatDate(date);
  return encodeURIComponent(
    `Hola Ariana! 👋 Quisiera reservar un turno:\n\n📌 Servicio: ${service}\n📅 Fecha: ${dateStr}\n⏰ Horario: ${time} hs\n👤 Nombre: ${name}\n📱 WhatsApp: ${phone}\n\n¡Muchas gracias! 💆‍♀️`
  );
}

export function isSameMonth(dateStr: string, year: number, month: number): boolean {
  const d = new Date(dateStr + 'T00:00:00');
  return d.getFullYear() === year && d.getMonth() === month;
}

export function getMonthName(month: number): string {
  return ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'][month];
}

export function generateId(): string {
  return Math.random().toString(36).slice(2, 10);
}

export function buildGoogleCalendarUrl(
  service: string,
  date: Date | null,
  time: string,
  durationMin: number
): string {
  if (!date || !time) return '';
  const [h, m] = time.split(':').map(Number);
  const start = new Date(date);
  start.setHours(h, m, 0, 0);
  const end = new Date(start.getTime() + durationMin * 60 * 1000);
  const fmt = (d: Date) =>
    d.getFullYear().toString() +
    String(d.getMonth() + 1).padStart(2, '0') +
    String(d.getDate()).padStart(2, '0') + 'T' +
    String(d.getHours()).padStart(2, '0') +
    String(d.getMinutes()).padStart(2, '0') + '00';
  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: `Turno en Ariana Peluquería – ${service}`,
    dates: `${fmt(start)}/${fmt(end)}`,
    details: `Turno reservado en Ariana Peluquería.\n\nServicio: ${service}\nHorario: ${time} hs\n\nConfirmá tu turno por WhatsApp antes del día.`,
    location: 'Ariana Peluquería Femenina – Consultá la dirección por WhatsApp',
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}
