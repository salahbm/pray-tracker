// // CHecks onboarding visited or not
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { create } from 'zustand';
// import { createJSONStorage, persist } from 'zustand/middleware';

// export interface OnboardingState {
//   visited: boolean;
//   setVisited: () => void;
// }

// export const useOnboarding = create<OnboardingState>()(
//   persist<OnboardingState>(
//     set => ({
//       visited: false,
//       setVisited: () => set({ visited: true }),
//     }),
//     {
//       name: 'onboarding-store', // Key for persistence
//       storage: createJSONStorage(() => AsyncStorage), // (optional) by default, 'localStorage'
//     }
//   )
// );
