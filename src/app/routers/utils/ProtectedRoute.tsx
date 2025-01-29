import { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { Loader } from '@widgets/Loader';
import { RootState } from '@app/store';
import { login, logout } from '@entities/user';
import { mainApi } from '@shared/api';

import { IProtectedRoute } from '@types';

export function ProtectedRoute({ children }: IProtectedRoute) {
  const [shouldRedirect, setShouldRedirect] = useState<boolean>(false);

  const { isVerified } = useSelector((state: RootState) => state.user);

  const dispatch = useDispatch();

  const location = useLocation();

  function getDeveloperName(): Promise<string> {
    return new Promise((resolver) => {
      setTimeout(() => resolver('Developer'), 1000);
    });
  }

  async function checkJWT() {
    try {
      if (process.env.NODE_ENV === 'development') {
        const developerName = await getDeveloperName();

        console.log(developerName);

        dispatch(login(developerName));
      } else {
        const { name } = await mainApi.verifyJWT();

        dispatch(login(name));
      }
    } catch (err) {
      console.log(err);

      dispatch(logout());

      setShouldRedirect(true);
    }
  }

  useEffect(() => {
    checkJWT();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (shouldRedirect) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (!isVerified) {
    return <Loader />;
  } else {
    return children;
  }
}
