import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface Customer {
  id: string | number;
  phone: string;
  name: string;
}

interface CustomerStore {
  customer: Customer | null;
  setCustomer: (customer: Customer) => void;
  clearCustomer: () => void;
}

const useCustomerStore = create(
  persist<CustomerStore>(
    (set) => ({
      customer: null,

      // Set customer details
      setCustomer: (customer) => set({ customer }),

      // Clear customer details
      clearCustomer: () => set({ customer: null }),
    }),
    {
      name: 'customer-store', // Key for localStorage
      storage: createJSONStorage(() => localStorage), // Use localStorage to persist
    }
  )
);

export default useCustomerStore;
