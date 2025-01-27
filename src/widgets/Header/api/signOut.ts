import { NavigateFunction } from 'react-router-dom';

import { Dispatch } from '@reduxjs/toolkit';
import { logout } from '@entities/user';
import { mainApi } from '@shared/api';

export async function signOut(
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
