import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface UserData {
  id?: string;
  email?: string;
  role?: string;
}

interface AuthStore {
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  userData: UserData | null;

  setTokens: (t: { accessToken: string; refreshToken: string }) => void;
  setUserData: (userData: UserData) => void;
  clearTokens: () => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      accessToken: null,
      refreshToken: null,
      isAuthenticated: false,
      userData: null,

      setTokens: ({ accessToken, refreshToken }) =>
        set({ accessToken, refreshToken, isAuthenticated: true }),

      setUserData: (userData) => set({ userData }),

      clearTokens: () =>
        set({
          accessToken: null,
          refreshToken: null,
          isAuthenticated: false,
          userData: null,
        }),
    }),
    { name: "auth-storage", version: 2 },
  ),
);
