import { create } from 'zustand';
import { UserApi } from "@/models/user.ts";

interface UserState {
    user: UserApi | null;
    setUser: (userData: UserApi) => void;
    clearUser: () => void;
}

export const useUserStore = create<UserState>((set) => ({
  user: null,
  setUser: (userData: UserApi | null) => set({ user: userData }),
  clearUser: () => set({ user: null }),
}));
