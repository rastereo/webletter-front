import { NavigateFunction } from 'react-router-dom';

import { MainApi } from '@shared/api';

export async function signOut(
  mainApi: MainApi | null,
  navigate: NavigateFunction
) {
  try {
    if (!mainApi) {
      throw new Error('MainApi not found');
    }

    await mainApi.signOut();

    navigate('login', { replace: true });
  } catch (err) {
    console.log(err);
  }
}
