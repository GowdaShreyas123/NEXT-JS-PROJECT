'use client';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type User = {
  email: string;
  password: string;
};

type AuthState = {
  users: User[];
  currentUser: User | null;
  isAuthenticated: boolean;
  register: (user: User) => boolean;
  login: (email: string, password: string) => boolean;
  logout: () => void;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      users: [],
      currentUser: null,
      isAuthenticated: false,

      // Register new user
      register: (newUser) => {
        const existingUser = get().users.find(u => u.email === newUser.email);
        if (existingUser) return false; // email already used

        set((state) => ({
          users: [...state.users, newUser]
        }));
        return true;
      },

      // Login existing user
      login: (email, password) => {
        const foundUser = get().users.find(u => u.email === email && u.password === password);
        if (foundUser) {
          set({
            currentUser: foundUser,
            isAuthenticated: true,
          });
          return true;
        }
        return false;
      },

      // Logout
      logout: () => {
        set({
          currentUser: null,
          isAuthenticated: false,
        });
      },
    }),
    {
      name: 'auth-storage', // saved in localStorage
    }
  )
);