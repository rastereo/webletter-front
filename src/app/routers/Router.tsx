import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom';

import Search from '../../pages/Search/Search';
import Viewer from '../../pages/Viewer/Viewer';
import NotFound from '../../pages/NotFound/NotFound';
import { LoginPage } from '../../pages/login';

import ProtectedRoute from '../../utils/ProtectedRoute';
import Header from '../../components/Header/Header';

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

// createRoot(document.getElementById('root')!).render(
//   <StrictMode>
//     <ChakraProvider theme={theme} resetCSS>
//       <UserContextProvider>
//         <RouterProvider router={router} />
//       </UserContextProvider>
//     </ChakraProvider>
//   </StrictMode>
// );
