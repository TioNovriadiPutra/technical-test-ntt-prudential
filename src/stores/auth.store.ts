import type { AuthStateType } from "@/types/state.type";
import { create } from "zustand";

export const useAuth = create<AuthStateType>((set) => ({
  access: "",
  refresh: "",
  addToken: (access, refresh) => set({ access, refresh }),
  removeToken: () => set({ access: "", refresh: "" }),
  checkIsLoggedIn: () => {
    const access = localStorage.getItem("@access");
    const refresh = localStorage.getItem("@refresh");

    if (access && refresh) {
      set({ access, refresh });
    } else {
      set({ access: "", refresh: "" });
    }
  },
}));
