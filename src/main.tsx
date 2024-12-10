import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';

import App from './App.tsx';
import theme from './theme.ts';

import ProtectedRoute from './utils/ProtectedRoute.tsx';
import Search from './pages/Search/Search.tsx';
import Viewer from './pages/Viewer/Viewer.tsx';
import Login from './pages/Login/Login.tsx';
import NotFound from './pages/NotFound/NotFound.tsx';
import { UserContextProvider } from './contexts/UserContext.tsx';

import './index.css';

const router = createBrowserRouter([
  {
    element: (
      <ProtectedRoute>
        <App />
      </ProtectedRoute>
    ),
    children: [
      {
        path: '/',
        element: <Search />,
      },
      {
        path: '/:id',
        element: <Viewer />,
      },
      {
        path: '*',
        element: <NotFound />,
      },
    ],
  },
  {
    path: '/login',
    element: <Login />,
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ChakraProvider theme={theme} resetCSS>
      <UserContextProvider>
        <RouterProvider router={router} />
      </UserContextProvider>
    </ChakraProvider>
  </StrictMode>
);
