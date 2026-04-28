import type { Appointment, Expense } from '../types';

export const MOCK_APPOINTMENTS: Appointment[] = [
  { id: 'a1', clientName: 'María García', clientPhone: '+54 9 11 1234-5678', service: 'Color', date: '2026-04-28', time: '09:00', status: 'confirmed', price: 42000, createdAt: '2026-04-25T10:00:00' },
  { id: 'a2', clientName: 'Laura Sánchez', clientPhone: '+54 9 11 8765-4321', service: 'Keratina', date: '2026-04-28', time: '11:00', status: 'pending', price: 25000, createdAt: '2026-04-26T14:00:00' },
  { id: 'a3', clientName: 'Sofía Pérez', clientPhone: '+54 9 11 2222-3333', service: 'Corte Completo', date: '2026-04-29', time: '10:00', status: 'confirmed', price: 15000, createdAt: '2026-04-26T16:00:00' },
  { id: 'a4', clientName: 'Valentina López', clientPhone: '+54 9 11 4444-5555', service: 'Alisado', date: '2026-04-30', time: '09:00', status: 'confirmed', price: 30000, createdAt: '2026-04-27T09:00:00' },
  { id: 'a5', clientName: 'Camila Torres', clientPhone: '+54 9 11 6666-7777', service: 'Peinados', date: '2026-04-30', time: '14:00', status: 'pending', price: 32500, createdAt: '2026-04-27T11:00:00' },
  { id: 'a6', clientName: 'Florencia Ruiz', clientPhone: '+54 9 11 8888-9999', service: 'Corte de Puntas', date: '2026-04-26', time: '15:00', status: 'completed', price: 10000, createdAt: '2026-04-24T10:00:00' },
  { id: 'a7', clientName: 'Ana Martínez', clientPhone: '+54 9 11 1111-2222', service: 'Color', date: '2026-04-25', time: '10:30', status: 'completed', price: 45000, createdAt: '2026-04-23T10:00:00' },
  { id: 'a8', clientName: 'Carolina Díaz', clientPhone: '+54 9 11 3333-4444', service: 'Keratina', date: '2026-04-24', time: '14:00', status: 'completed', price: 25000, createdAt: '2026-04-22T10:00:00' },
  { id: 'a9', clientName: 'Natalia Gómez', clientPhone: '+54 9 11 5555-6666', service: 'Corte Completo', date: '2026-04-23', time: '11:00', status: 'no-show', price: 15000, createdAt: '2026-04-21T10:00:00' },
  { id: 'a10', clientName: 'Romina Fernández', clientPhone: '+54 9 11 7777-8888', service: 'Peinados', date: '2026-04-22', time: '16:00', status: 'cancelled', price: 32500, createdAt: '2026-04-20T10:00:00' },
  { id: 'a11', clientName: 'Lucía Alvarez', clientPhone: '+54 9 11 9999-0000', service: 'Alisado', date: '2026-04-21', time: '09:30', status: 'completed', price: 30000, createdAt: '2026-04-19T10:00:00' },
  { id: 'a12', clientName: 'Agustina Romero', clientPhone: '+54 9 11 0000-1111', service: 'Color', date: '2026-04-18', time: '14:30', status: 'completed', price: 40000, createdAt: '2026-04-16T10:00:00' },
];

export const MOCK_EXPENSES: Expense[] = [
  { id: 'e1', description: 'Tinte L\'Oreal Professional x6', amount: 18000, category: 'insumos', date: '2026-04-05' },
  { id: 'e2', description: 'Keratina Brazilian Blowout', amount: 12000, category: 'insumos', date: '2026-04-08' },
  { id: 'e3', description: 'Alquiler del local', amount: 50000, category: 'servicios', date: '2026-04-01' },
  { id: 'e4', description: 'Internet y teléfono', amount: 8000, category: 'servicios', date: '2026-04-02' },
  { id: 'e5', description: 'Shampoo y acondicionador profesional', amount: 9500, category: 'insumos', date: '2026-04-10' },
  { id: 'e6', description: 'Instagram Ads (promo mensual)', amount: 5000, category: 'marketing', date: '2026-04-03' },
  { id: 'e7', description: 'Tijeras profesionales Kiepe', amount: 22000, category: 'equipamiento', date: '2026-04-15' },
  { id: 'e8', description: 'Oxidante y polvo decolorante', amount: 7500, category: 'insumos', date: '2026-04-18' },
];
