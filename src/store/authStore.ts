import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface User {
  id: string
  email: string
  role: 'CLIENT' | 'COUNSELOR'
  name: string
}

interface AuthState {
  accessToken: string | null
  user: User | null
  isLoggedIn: boolean
  setAuth: (token: string, user: User) => void
  clearAuth: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      accessToken: null,
      user: null,
      isLoggedIn: false,
      setAuth: (token, user) =>
        set({ accessToken: token, user, isLoggedIn: true }),
      clearAuth: () =>
        set({ accessToken: null, user: null, isLoggedIn: false }),
    }),
    {
      name: 'rapport-auth',
    }
  )
)
