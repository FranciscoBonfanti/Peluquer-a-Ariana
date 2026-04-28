import type { Service, GalleryItem } from '../types';

export const WHATSAPP = '543496548309';

export const SERVICES: Service[] = [
  { name: 'Corte de Puntas', desc: 'Renovación para lucir un cabello sano y con vida. Rápido y preciso.', price: '$10.000', priceNum: 10000, icon: '✂', duration: '30 min' },
  { name: 'Corte Completo', desc: 'Cambio de largo, capas y forma adaptados a tu rostro y estilo.', price: '$15.000', priceNum: 15000, icon: '✦', duration: '45 min' },
  { name: 'Alisado', desc: 'Resultado liso y brillante de larga duración con productos premium.', price: '$30.000', priceNum: 30000, icon: '〰', duration: '2–3 hs' },
  { name: 'Keratina', desc: 'Tratamiento nutritivo que reduce el frizz y aporta brillo intenso.', price: '$25.000', priceNum: 25000, icon: '◆', duration: '2 hs' },
  { name: 'Color', desc: 'Mechas, tinte o color completo. Colores vibrantes que cuidan tu cabello.', price: 'desde $40.000', priceNum: 40000, icon: '◉', duration: '2–3 hs' },
  { name: 'Peinados', desc: 'Para ocasiones especiales o el día a día. Desde recogidos hasta sueltos.', price: '$30.000–$35.000', priceNum: 32500, icon: '✿', duration: '1–1.5 hs' },
];

export const TIME_SLOTS = [
  '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
  '14:00', '14:30', '15:00', '15:30', '16:00', '16:30',
  '17:00', '17:30',
];

export const UNAVAILABLE_SLOTS = ['09:30', '11:30', '15:00', '17:00'];

export const GALLERY_ITEMS: GalleryItem[] = [
  { type: 'image', label: 'Alisado', color: '#E8C5CF', description: 'Alisado permanente con productos sin formol. Resultado liso, brillante y duradero.', duration: '2–3 horas', price: '$30.000' },
  { type: 'video', label: 'Keratina', color: '#D4A5B0', description: 'Keratina que nutre en profundidad y elimina el frizz hasta por 4 meses.', duration: '2 horas', price: '$25.000' },
  { type: 'image', label: 'Peinado de noche', color: '#F2D4DA', description: 'Peinados para ocasiones especiales: casamientos, cumpleaños de 15, eventos.', duration: '1–1.5 horas', price: '$30.000–$35.000' },
  { type: 'image', label: 'Color completo', color: '#C9A96E33', description: 'Coloración completa con tinte profesional. Colores naturales, fantasía o cobertura de canas.', duration: '2–3 horas', price: 'desde $40.000' },
  { type: 'video', label: 'Corte + estilo', color: '#E8C5CF', description: 'Corte personalizado adaptado a la forma de tu rostro y tu estilo de vida.', duration: '1 hora', price: '$15.000' },
  { type: 'image', label: 'Mechas', color: '#F7EBE8', description: 'Mechas en distintas técnicas: balayage, highlights, babylights.', duration: '3–4 horas', price: 'desde $40.000' },
];

export const EXPENSE_CATEGORIES = [
  { value: 'insumos', label: 'Insumos' },
  { value: 'equipamiento', label: 'Equipamiento' },
  { value: 'servicios', label: 'Servicios' },
  { value: 'marketing', label: 'Marketing' },
  { value: 'otro', label: 'Otro' },
] as const;
