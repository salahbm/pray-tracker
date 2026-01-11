import { create } from 'zustand';

interface AlertOptions {
  title: string;
  subtitle?: string;
  icon?: React.ReactNode;
  cancelLabel?: string | null;
  confirmLabel?: string;
  onConfirm?: () => void | Promise<void>;
  onCancel?: () => void;
}

interface AlertStore {
  visible: boolean;
  options: AlertOptions | null;
  showAlert: (options: AlertOptions) => void;
  hideAlert: () => void;
}

export const useAlertStore = create<AlertStore>(set => ({
  visible: false,
  options: null,
  showAlert: options => set({ visible: true, options }),
  hideAlert: () => set({ visible: false, options: null }),
}));

// The helper function to call from logic files
export const alert = (options: AlertOptions) => {
  useAlertStore.getState().showAlert(options);
};

export const hideAlert = () => {
  useAlertStore.getState().hideAlert();
};
