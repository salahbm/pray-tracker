// context/ErrorContext.tsx
import React, { createContext, useState, ReactNode, useContext } from 'react';

import ErrorModal from '@/components/shared/error-modal';

// Define the shape of the error
interface ErrorState {
  title: string;
  description?: string;
}

// Define the context's properties
interface ErrorContextProps {
  error: ErrorState | null;
  showError: (title: string, description?: string) => void;
  hideError: () => void;
}

// Create the context with default values
const ErrorContext = createContext<ErrorContextProps>({
  error: null,
  showError: () => {},
  hideError: () => {},
});

// Create a provider component
export const ErrorProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [error, setError] = useState<ErrorState | null>(null);

  const showError = (title: string, description?: string) => {
    setError({ title, description });
  };

  const hideError = () => {
    setError(null);
  };

  return (
    <ErrorContext.Provider value={{ error, showError, hideError }}>
      {children}
      {/* Render the ErrorModal here so it's globally accessible */}
      {error && (
        <ErrorModal
          isVisible={!!error}
          title={error.title}
          description={error.description}
          onClose={hideError}
        />
      )}
    </ErrorContext.Provider>
  );
};

// Create a custom hook for easy access to the context
export const useError = () => useContext(ErrorContext);
