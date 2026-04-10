import { create } from 'zustand'
import { persist, devtools } from 'zustand/middleware'
import type { IUser } from '../types'

interface AuthState {
  user: IUser | null
  isAuthenticated: boolean
  isLoading: boolean
  // ── Actions ───────────────────────────────────────────────────
  setUser: (user: IUser | null) => void
  setLoading: (loading: boolean) => void
  logout: () => void
}

export const useAuthStore = create<AuthState>()(
  devtools(
    persist(
      (set) => ({
        user: null,
        isAuthenticated: false,
        isLoading: true,

        setUser: (user) =>
          set({ user, isAuthenticated: !!user, isLoading: false }),

        setLoading: (isLoading) => set({ isLoading }),

        logout: () =>
          set({ user: null, isAuthenticated: false, isLoading: false }),
      }),
      {
        name: 'fsocietypk-auth',
        partialize: (state) => ({ user: state.user, isAuthenticated: state.isAuthenticated }),
      },
    ),
    { name: 'AuthStore' },
  ),
)
