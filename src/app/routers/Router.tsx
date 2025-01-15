import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom';

import { ProtectedRoute } from './utils/ProtectedRoute';
import { Search } from '@pages/Search';
import { Viewer } from '@pages/Viewer';
import { NotFound } from '@pages/NotFound';
import { LoginPage } from '@pages/login';
import { Header } from '@widgets/Header';

const router = createBrowserRouter([
  {
    element: (
      <ProtectedRoute>
        <>
          <Header />
          <Outlet />
        </>
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
    element: <LoginPage />,
  },
]);

export function Router() {
  return <RouterProvider router={router} />;
}
