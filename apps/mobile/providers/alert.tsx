import React, { createContext, useContext, useState, ReactNode } from 'react';

import ErrorModal from '@/components/shared/error-modal';

interface AlertState {
  isVisible: boolean;
  title: string;
  description?: string;
}

interface AlertContextProps {
  showAlert: (title: string, description?: string) => void;
  hideAlert: () => void;
  alert: AlertState;
}

const AlertContext = createContext<AlertContextProps | undefined>(undefined);

export const AlertProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [alert, setAlert] = useState<AlertState>({
    isVisible: false,
    title: '',
    description: '',
  });

  const showAlert = (title: string, description?: string) => {
    setAlert({ isVisible: true, title, description });
  };

  const hideAlert = () => {
    setAlert({ isVisible: false, title: '', description: '' });
  };

  return (
    <AlertContext.Provider value={{ showAlert, hideAlert, alert }}>
      {children}
      <ErrorModal
        isVisible={alert.isVisible}
        title={alert.title}
        description={alert.description}
        onClose={hideAlert}
      />
    </AlertContext.Provider>
  );
};

export const useAlert = () => {
  const context = useContext(AlertContext);
  if (!context) {
    throw new Error('useAlert must be used within an AlertProvider');
  }
  return context;
};
