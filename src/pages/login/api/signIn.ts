import { FormEvent } from 'react';
import { NavigateFunction } from 'react-router-dom';

import { MainApi } from '@shared/api';

export async function signIn(
  evt: FormEvent<HTMLFormElement>,
  mainApi: MainApi | null,
  setErrorMessage: React.Dispatch<React.SetStateAction<string>>,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
  navigate: NavigateFunction,
  username: string,
  password: string,
  from: string
) {
  evt.preventDefault();

  setErrorMessage('');

  setLoading(true);

  try {
    if (!mainApi) {
      throw new Error('MainApi not found');
    }

    await mainApi.signIn(username, password);

    navigate(from, { replace: true });
  } catch (err) {
    if (err instanceof Error) {
      setErrorMessage(err.message);
    } else {
      setErrorMessage('An unexpected error occurred. Please try again.');
    }
  } finally {
    setLoading(false);
  }
}
