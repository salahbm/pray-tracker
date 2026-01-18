import { create } from "zustand"

interface MenuStore {
  opened: boolean
  toggleMenu: () => void
}

export const useMenuStore = create<MenuStore>((set) => ({
  opened: false,
  toggleMenu: () => set((state) => ({ opened: !state.opened })),
}))
