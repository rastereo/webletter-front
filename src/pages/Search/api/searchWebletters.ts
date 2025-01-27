import { Dispatch } from '@reduxjs/toolkit';

import { setIsInitialLoadData, setList } from '@/entities/webletterList';
import { mainApi } from '@/shared/api';

import { ISelectedFilter } from '@types';

export async function searchWebletters(
  selectedFilter: ISelectedFilter,
  setErrorMessage: (value: React.SetStateAction<string | null>) => void,
  dispatch: Dispatch
) {
  try {
    dispatch(setIsInitialLoadData(false));

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
