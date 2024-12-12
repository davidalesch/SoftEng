/*
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Define the type for user details
export interface UserDetails {
  email: string;
  name: string;
  address: string;
  phoneNumber: string;
  dateOfBirth: string;
}

// Create the store with persist middleware to save to local storage
export const useUserStore = create<{
  userDetails: UserDetails;
  updateUserDetails: (details: Partial<UserDetails>) => void;
}>()(
  persist(
    (set) => ({
      userDetails: {
        email: 'johndoe@example.com',
        name: 'John Doe',
        address: '123 Main St, Anytown, USA',
        phoneNumber: '+1 (555) 123-4567',
        dateOfBirth: '1990-01-15'
      },
      updateUserDetails: (details) => set((state) => ({
        userDetails: { ...state.userDetails, ...details }
      })),
    }),
    {
      name: 'user-storage', // name of the item in local storage
      getStorage: () => localStorage, // use localStorage for persistence
    }
  )
);
*/