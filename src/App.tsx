import Search from './pages/Search/Search';
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';

import ProtectedRoute from './utils/ProtectedRoute';
import Viewer from './pages/Viewer/Viewer';
import Login from './pages/Login/Login';

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: (
        <ProtectedRoute>
          <Search />
        </ProtectedRoute>
      ),
    },
    {
      path: '/:id',
      element: (
        <ProtectedRoute>
          <Viewer />
        </ProtectedRoute>
      ),
    },
    {
      path: '/login',
      element: <Login />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
