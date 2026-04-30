import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Appointment, Expense, AdminView, Service } from '../types';
import { MOCK_APPOINTMENTS, MOCK_EXPENSES } from '../lib/mockData';
import { SERVICES } from '../lib/constants';
import { generateId } from '../lib/utils';

interface AdminStore {
  authenticated: boolean;
  activeView: AdminView;
  appointments: Appointment[];
  expenses: Expense[];
  services: Service[];
  selectedMonth: number;
  selectedYear: number;
  login: (password: string) => boolean;
  logout: () => void;
  setView: (view: AdminView) => void;
  addAppointment: (appointment: Omit<Appointment, 'id' | 'createdAt'>) => void;
  updateAppointmentStatus: (id: string, status: Appointment['status']) => void;
  deleteAppointment: (id: string) => void;
  addExpense: (expense: Omit<Expense, 'id'>) => void;
  deleteExpense: (id: string) => void;
  updateService: (name: string, patch: Partial<Pick<Service, 'price' | 'priceNum' | 'desc' | 'duration'>>) => void;
  setMonth: (year: number, month: number) => void;
}

const ADMIN_PASSWORD = 'ariana2026';

export const useAdminStore = create<AdminStore>()(
  persist(
    (set) => ({
      authenticated: false,
      activeView: 'dashboard',
      appointments: MOCK_APPOINTMENTS,
      expenses: MOCK_EXPENSES,
      services: SERVICES,
      selectedMonth: new Date().getMonth(),
      selectedYear: new Date().getFullYear(),

      login: (password) => {
        if (password === ADMIN_PASSWORD) {
          set({ authenticated: true });
          return true;
        }
        return false;
      },

      logout: () => set({ authenticated: false, activeView: 'dashboard' }),

      setView: (activeView) => set({ activeView }),

      addAppointment: (appointment) =>
        set((state) => ({
          appointments: [{ ...appointment, id: generateId(), createdAt: new Date().toISOString() }, ...state.appointments],
        })),

      updateAppointmentStatus: (id, status) =>
        set((state) => ({
          appointments: state.appointments.map((a) =>
            a.id === id ? { ...a, status } : a
          ),
        })),

      deleteAppointment: (id) =>
        set((state) => ({
          appointments: state.appointments.filter((a) => a.id !== id),
        })),

      addExpense: (expense) =>
        set((state) => ({
          expenses: [{ ...expense, id: generateId() }, ...state.expenses],
        })),

      deleteExpense: (id) =>
        set((state) => ({
          expenses: state.expenses.filter((e) => e.id !== id),
        })),

      updateService: (name, patch) =>
        set((state) => ({
          services: state.services.map((s) => s.name === name ? { ...s, ...patch } : s),
        })),

      setMonth: (selectedYear, selectedMonth) => set({ selectedYear, selectedMonth }),
    }),
    {
      name: 'ariana-admin',
      partialize: (state) => ({
        appointments: state.appointments,
        expenses: state.expenses,
        services: state.services,
        authenticated: state.authenticated,
      }),
    }
  )
);
