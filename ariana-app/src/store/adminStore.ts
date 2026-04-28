import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Appointment, Expense, AdminView } from '../types';
import { MOCK_APPOINTMENTS, MOCK_EXPENSES } from '../lib/mockData';
import { generateId } from '../lib/utils';

interface AdminStore {
  authenticated: boolean;
  activeView: AdminView;
  appointments: Appointment[];
  expenses: Expense[];
  selectedMonth: number;
  selectedYear: number;
  login: (password: string) => boolean;
  logout: () => void;
  setView: (view: AdminView) => void;
  updateAppointmentStatus: (id: string, status: Appointment['status']) => void;
  addExpense: (expense: Omit<Expense, 'id'>) => void;
  deleteExpense: (id: string) => void;
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

      updateAppointmentStatus: (id, status) =>
        set((state) => ({
          appointments: state.appointments.map((a) =>
            a.id === id ? { ...a, status } : a
          ),
        })),

      addExpense: (expense) =>
        set((state) => ({
          expenses: [{ ...expense, id: generateId() }, ...state.expenses],
        })),

      deleteExpense: (id) =>
        set((state) => ({
          expenses: state.expenses.filter((e) => e.id !== id),
        })),

      setMonth: (selectedYear, selectedMonth) => set({ selectedYear, selectedMonth }),
    }),
    {
      name: 'ariana-admin',
      partialize: (state) => ({
        appointments: state.appointments,
        expenses: state.expenses,
        authenticated: state.authenticated,
      }),
    }
  )
);
