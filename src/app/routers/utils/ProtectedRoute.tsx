import { useContext, useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

import { Loader } from '@widgets/Loader';
import { UserContext } from '@shared/contexts';

import { IProtectedRoute } from '../../../types';

export function ProtectedRoute({ children }: IProtectedRoute) {
  const [isVerified, setIsVerified] = useState<boolean | null>(null);

  const { setUser, mainApi } = useContext(UserContext);

  const location = useLocation();

  async function checkJWT() {
    try {
      if (process.env.NODE_ENV === 'development') {
        setUser('Developer');
        setIsVerified(true);
      } else {
        if (!mainApi) {
          throw new Error('MainApi not found');
        }

        const { name } = await mainApi.verifyJWT();

        setUser(name);
        setIsVerified(true);
      }
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
