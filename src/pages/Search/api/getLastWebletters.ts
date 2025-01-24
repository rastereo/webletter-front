import { Dispatch } from '@reduxjs/toolkit';

import { setList, setTotalCount } from '@entities/webletterList';
import {
  setExhibitionSelectList,
  setLangSelectList,
  setRangeDate,
} from '@entities/searchConfig';
import { MainApi } from '@shared/api';

// import { firstAndLastDate } from '@/types';

export async function getLastWebletters(
  mainApi: MainApi | null,
  setIsInitialLoadData: (InitialLoadData: boolean) => void,
  setErrorMessage: React.Dispatch<React.SetStateAction<string | null>>,
  // setWebletterList: (webletters: IWebletter[] | null) => void,
  // setExhibitionList: (exhibitions: string[]) => void,
  // setLangList: (langs: string[]) => void,
  // setRangeDate: (rangeDate: firstAndLastDate | null) => void,
  // setWeblettersCount: (number: number) => void,
  dispatch: Dispatch
) {
  if (!mainApi) {
    throw new Error('MainApi not found');
  }

  try {
    setIsInitialLoadData(true);
    setErrorMessage(null);

    const {
      webletterList,
      exhibitionList,
      langList,
      weblettersCount,
      firstAndLastDate,
    } = await mainApi.getInitialLoadData();

    dispatch(setList(webletterList));
    dispatch(setTotalCount(weblettersCount));
    dispatch(
      setExhibitionSelectList(exhibitionList.filter((exhibition) => exhibition))
    );
    dispatch(setLangSelectList(langList.filter((lang) => lang)));

    dispatch(setRangeDate(firstAndLastDate));
  } catch (err) {
    // setWeblettersCount(0);

    if (err instanceof Error) {
      setErrorMessage(err.message);
    } else {
      setErrorMessage('An unexpected error occurred. Please try again.');
    }
  }
}
