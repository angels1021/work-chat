import { StrictMode } from 'react';
import { createRoot, type Root } from 'react-dom/client';
import { QueryClientProvider } from '@tanstack/react-query';
import { createBrowserRouter, RouterProvider } from 'react-router';
import { AuthProvider } from './auth';
import './index.css';
import { APP_ROUTES, QUERY_CLIENT } from './routes';

const routerBrowser = createBrowserRouter(APP_ROUTES);

const container = document.getElementById('root')!;

// This is a workaround for React 18 HMR.
// It's used to persist the root across hot reloads.
interface ContainerWithRoot extends HTMLElement {
  _reactRoot?: Root;
}

const containerWithRoot = container as ContainerWithRoot;
if (!containerWithRoot._reactRoot) {
  containerWithRoot._reactRoot = createRoot(containerWithRoot);
}

containerWithRoot._reactRoot.render(
  <StrictMode>
    <QueryClientProvider client={QUERY_CLIENT}>
      <AuthProvider>
        <RouterProvider router={routerBrowser} />
      </AuthProvider>
    </QueryClientProvider>
  </StrictMode>
);
