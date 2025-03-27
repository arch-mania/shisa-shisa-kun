import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { MainScreen } from './screens/MainScreen';

createRoot(document.getElementById('app') as HTMLElement).render(
  <StrictMode>
    <BrowserRouter>
      <MainScreen />
    </BrowserRouter>
  </StrictMode>
);
