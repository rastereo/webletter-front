import { Dispatch } from '@reduxjs/toolkit';

import { MainApi } from '@shared/api';
import { setList } from '@/entities/webletterList';
import { ISelectedFilter } from '@/types';

export async function searchWebletters(
  mainApi: MainApi | null,
  selectedFilter: ISelectedFilter,
  setErrorMessage: (value: React.SetStateAction<string | null>) => void,
  setIsInitialLoadData: (InitialLoadData: boolean) => void,
  dispatch: Dispatch
) {
  if (!mainApi) {
    throw new Error('MainApi not found');
  }

  try {
    setIsInitialLoadData(false);

    const webLetterList = await mainApi.searchWebletters(selectedFilter);

    dispatch(setList(webLetterList));
  } catch (err) {
    if (err instanceof Error) {
      setErrorMessage(err.message);
    } else {
      setErrorMessage('An unexpected error occurred. Please try again.');
    }
  }
}
