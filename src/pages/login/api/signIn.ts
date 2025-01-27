import { FormEvent } from 'react';
import { NavigateFunction } from 'react-router-dom';

import { mainApi } from '@shared/api';

export async function signIn(
  evt: FormEvent<HTMLFormElement>,
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
