import type { ServiceItem, StaffMember } from "@/types";
import { create } from "zustand";

export type BookingStep = 1 | 2 | 3 | 4 | 5;

export interface CustomerInfo {
  fullName: string;
  email: string;
  phone: string;
  notes: string;
}

export interface BookingState {
  salonId: string | null;
  step: BookingStep;
  service: ServiceItem | null;
  staff: StaffMember | null;
  date: Date | null;
  timeSlot: string | null;
  customer: CustomerInfo;
  setSalonId: (id: string | null) => void;
  setStep: (step: BookingStep) => void;
  setService: (s: ServiceItem | null) => void;
  setStaff: (s: StaffMember | null) => void;
  setDate: (d: Date | null) => void;
  setTimeSlot: (t: string | null) => void;
  setCustomer: (c: Partial<CustomerInfo>) => void;
  nextStep: () => void;
  prevStep: () => void;
  reset: () => void;
}

const emptyCustomer: CustomerInfo = {
  fullName: "",
  email: "",
  phone: "",
  notes: "",
};

export const useBookingStore = create<BookingState>((set, get) => ({
  salonId: null,
  step: 1,
  service: null,
  staff: null,
  date: null,
  timeSlot: null,
  customer: { ...emptyCustomer },
  setSalonId: (salonId) => set({ salonId }),
  setStep: (step) => set({ step }),
  setService: (service) => set({ service }),
  setStaff: (staff) => set({ staff }),
  setDate: (date) => set({ date }),
  setTimeSlot: (timeSlot) => set({ timeSlot }),
  setCustomer: (patch) =>
    set((s) => ({ customer: { ...s.customer, ...patch } })),
  nextStep: () => {
    const { step } = get();
    if (step < 5) set({ step: (step + 1) as BookingStep });
  },
  prevStep: () => {
    const { step } = get();
    if (step > 1) set({ step: (step - 1) as BookingStep });
  },
  reset: () =>
    set({
      salonId: null,
      step: 1,
      service: null,
      staff: null,
      date: null,
      timeSlot: null,
      customer: { ...emptyCustomer },
    }),
}));
