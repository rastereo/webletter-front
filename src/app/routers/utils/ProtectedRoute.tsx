import { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { Loader } from '@widgets/Loader';
// import { login, logout } from '@entities/user/model/userSlice';
import { RootState } from '@app/store';

import { IProtectedRoute } from '@types';
import { login, logout } from '@/entities/user';
import { mainApi } from '@/shared/api';

export function ProtectedRoute({ children }: IProtectedRoute) {
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

        dispatch(login(developerName));
      } else {
        if (!mainApi) {
          throw new Error('MainApi not found');
        }

        const { name } = await mainApi.verifyJWT();

        dispatch(login(name));
      }
    } catch (err) {
      console.log(err);

      dispatch(logout());
    }
  }

  useEffect(() => {
    checkJWT();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isVerified === false) {
    return (
      <main style={{ height: '100vh' }}>
        <Loader />
      </main>
    );
  }

  if (isVerified) {
    return children;
  } else {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
}
