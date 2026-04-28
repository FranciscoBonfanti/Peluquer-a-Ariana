import { create } from 'zustand';
import type { BookingStep, BookingStatus } from '../types';

interface BookingStore {
  step: BookingStep;
  service: string;
  date: Date | null;
  time: string;
  clientName: string;
  clientPhone: string;
  status: BookingStatus;
  setStep: (step: BookingStep) => void;
  setService: (service: string) => void;
  setDate: (date: Date | null) => void;
  setTime: (time: string) => void;
  setClientName: (name: string) => void;
  setClientPhone: (phone: string) => void;
  setStatus: (status: BookingStatus) => void;
  reset: () => void;
}

const initial = {
  step: 1 as BookingStep,
  service: '',
  date: null,
  time: '',
  clientName: '',
  clientPhone: '',
  status: 'idle' as BookingStatus,
};

export const useBookingStore = create<BookingStore>((set) => ({
  ...initial,
  setStep: (step) => set({ step }),
  setService: (service) => set({ service }),
  setDate: (date) => set({ date }),
  setTime: (time) => set({ time }),
  setClientName: (clientName) => set({ clientName }),
  setClientPhone: (clientPhone) => set({ clientPhone }),
  setStatus: (status) => set({ status }),
  reset: () => set(initial),
}));
