import { createContext, useContext, useState, ReactNode } from 'react';
import { Snackbar, Alert } from '@mui/material';

interface SnackbarContextProps {
  setSuccess: (message: string | null) => void;
  setError: (message: string | null) => void;
}

const SnackbarContext = createContext<SnackbarContextProps | undefined>(undefined);

export const useSnackbar = (): SnackbarContextProps => {
  const context = useContext(SnackbarContext);
  if (!context) {
    throw new Error('useSnackbar must be used within a SnackbarProvider');
  }
  return context;
};

export const SnackbarProvider = ({ children }: { children: ReactNode }) => {
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  return (
    <SnackbarContext.Provider value={{ setSuccess, setError }}>
      {children}
      <Snackbar
        open={!!success}
        autoHideDuration={1500}
        onClose={() => setSuccess(null)}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        sx={{ zIndex: 2000 }}
      >
        <Alert onClose={() => setSuccess(null)} severity="success">
          {success}
        </Alert>
      </Snackbar>
      <Snackbar
        open={!!error}
        autoHideDuration={2000}
        onClose={() => setError(null)}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        sx={{ zIndex: 2000 }}
      >
        <Alert onClose={() => setError(null)} severity="error">
          {error}
        </Alert>
      </Snackbar>
    </SnackbarContext.Provider>
  );
};
