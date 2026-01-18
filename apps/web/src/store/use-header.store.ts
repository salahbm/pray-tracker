import { create } from "zustand"

interface HeaderStore {
  isWhite: boolean
  setIsWhite: (isWhite: boolean) => void
}

export const useHeaderStore = create<HeaderStore>((set) => ({
  isWhite: false,
  setIsWhite: (isWhite: boolean) => set(() => ({ isWhite })),
}))
