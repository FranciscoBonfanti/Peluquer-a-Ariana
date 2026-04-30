export interface Service {
  name: string;
  desc: string;
  price: string;
  priceNum: number;
  icon: string;
  duration: string;
  durationMin: number;
}

export interface GalleryItem {
  type: 'image' | 'video';
  label: string;
  color: string;
  description: string;
  duration: string;
  price: string;
}

export interface Appointment {
  id: string;
  clientName: string;
  clientPhone: string;
  service: string;
  date: string;
  time: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled' | 'no-show';
  price: number;
  createdAt: string;
}

export interface Expense {
  id: string;
  description: string;
  amount: number;
  category: 'insumos' | 'equipamiento' | 'servicios' | 'marketing' | 'otro';
  date: string;
}

export type BookingStep = 1 | 2 | 3 | 4;
export type BookingStatus = 'idle' | 'loading' | 'success';

export type AdminView = 'dashboard' | 'appointments' | 'expenses' | 'balance' | 'services';
