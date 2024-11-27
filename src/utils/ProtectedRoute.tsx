import { useContext, useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

import { IProtectedRoute } from '../types';
import Loader from '../components/Loader/Loader';
import UserContext from '../contexts/UserContext';

function ProtectedRoute({ children }: IProtectedRoute) {
  const [isVerified, setIsVerified] = useState<boolean | null>(null);

  const { setUser, mainApi } = useContext(UserContext);

  const location = useLocation();

  async function checkJWT() {
    try {
      if (!mainApi) {
        throw new Error('MainApi not found');
      }

      const { name } = await mainApi.verifyJWT();

      setUser(name);
      setIsVerified(true);
    } catch (err) {
      console.log(err);

      setIsVerified(false);
    }
  }

  useEffect(() => {
    checkJWT();
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
