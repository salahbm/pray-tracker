import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface LanguageState {
  currentLanguage: string;
  changeLanguage: (lang: string) => void;
}

export const useLanguageStore = create<LanguageState>()(
  persist<LanguageState>(
    (set) => ({
      currentLanguage: 'en',
      changeLanguage: (lang) => set({ currentLanguage: lang }),
    }),
    {
      name: 'language-store', // Key for persistence
    },
  ),
);
