import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '../node_modules/@uswds/uswds/dist/css/uswds.min.css';
import './index.css';
import AppRouter from './components/AppRouter';
import { AuthProvider } from './components/AuthProvider';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <AppRouter />
    </AuthProvider>
  </StrictMode>,
);
