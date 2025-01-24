import { NavigateFunction } from 'react-router-dom';

import { MainApi } from '@shared/api';
import { Dispatch } from '@reduxjs/toolkit';
import { logout } from '@entities/user';

export async function signOut(
  mainApi: MainApi | null,
  navigate: NavigateFunction,
  dispatch: Dispatch
) {
  try {
    if (!mainApi) {
      throw new Error('MainApi not found');
    }

    await mainApi.signOut();

    dispatch(logout());

    navigate('login', { replace: true });
  } catch (err) {
    console.log(err);
  }
}
