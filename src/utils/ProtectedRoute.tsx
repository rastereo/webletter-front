import { useContext, useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

import { IProtectedRoute } from '../types';
import Loader from '../components/Loader/Loader';
import UserContext from '../contexts/UserContext';

function ProtectedRoute({ children }: IProtectedRoute) {
  const [isVerified, setIsVerified] = useState<boolean | null>(null);

  const { setUser } = useContext(UserContext);

  const verifyTokenUrl = import.meta.env.VITE_APP_VERIFY_TOKEN_URL;

  const location = useLocation();

  async function verifyToken() {
    try {
      const res = await fetch(verifyTokenUrl, { credentials: 'include' });

      const data = await res.json();

      if (res.ok) {
        setUser(data.name);

        setIsVerified(true);
      } else {
        throw new Error(data.message);
      }
    } catch (err) {
      if (err instanceof Error) {
        console.log(err.message);
      }

      setIsVerified(false);
    }
  }
  useEffect(() => {
    verifyToken();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isVerified === null) {
    return <Loader />;
  }

  if (isVerified) {
    return children;
  } else {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
}

export default ProtectedRoute;
