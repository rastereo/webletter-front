import { FormEvent } from 'react';
import MainApi from '../../../shared/api/MainApi';
import { NavigateFunction } from 'react-router-dom';

export async function signIn(
  evt: FormEvent<HTMLFormElement>,
  mainApi: MainApi,
  setErrorMessage: React.Dispatch<React.SetStateAction<string>>,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
  navigate: NavigateFunction,
  username: string,
  password: string,
  from: string,
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
