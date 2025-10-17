// // CHecks onboarding visited or not
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { create } from 'zustand';
// import { createJSONStorage, persist } from 'zustand/middleware';

// export interface NotificationState {
//   isNotificationEnabled: boolean;
//   setNotificationEnabled: (val: boolean) => void;
// }

// export const useNotificationStore = create<NotificationState>()(
//   persist<NotificationState>(
//     set => ({
//       isNotificationEnabled: false,
//       setNotificationEnabled: val => set({ isNotificationEnabled: val }),
//     }),
//     {
//       name: 'notification-store', // Key for persistence
//       storage: createJSONStorage(() => AsyncStorage), // (optional) by default, 'localStorage'
//     }
//   )
// );
