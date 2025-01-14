import { FormEvent } from 'react';

import { MainApi } from '@shared/api';

import { ResultWebletter } from '../../../types';

export async function searchWebletters(
  mainApi: MainApi | null,
  evt: FormEvent<HTMLFormElement>,
  selectedFilter: Record<string, string>,
  setErrorMessage: (value: React.SetStateAction<string | null>) => void,
  setWebletterList: (webletters: ResultWebletter[] | null) => void,
  setIsInitialLoadData: (InitialLoadData: boolean) => void,
  setWeblettersCount: (number: number) => void
) {
  if (!mainApi) {
    throw new Error('MainApi not found');
  }

  evt.preventDefault();

  setErrorMessage(null);
  setWebletterList(null);

  try {
    const data = await mainApi.searchWebletters(selectedFilter);

    if ('webletterList' in data) {
      setIsInitialLoadData(true);
      setWebletterList(data.webletterList);
      setWeblettersCount(data.weblettersCount);
    } else if (Array.isArray(data)) {
      setIsInitialLoadData(false);
      setWebletterList(data);
      setWeblettersCount(data.length);
    }
  } catch (err) {
    setWeblettersCount(0);

    if (err instanceof Error) {
      setErrorMessage(err.message);
    } else {
      setErrorMessage('An unexpected error occurred. Please try again.');
    }
  }
}
