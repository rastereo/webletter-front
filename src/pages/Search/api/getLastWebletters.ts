import { Dispatch } from '@reduxjs/toolkit';

import {
  setIsInitialLoadData,
  setList,
  setTotalCount,
} from '@entities/webletterList';
import {
  setExhibitionSelectList,
  setLangSelectList,
  setRangeDate,
} from '@entities/searchConfig';
import { mainApi } from '@shared/api';

// import { firstAndLastDate } from '@types';

export async function getLastWebletters(
  setErrorMessage: React.Dispatch<React.SetStateAction<string | null>>,
  dispatch: Dispatch
) {
  try {
    dispatch(setIsInitialLoadData(true));
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
    if (err instanceof Error) {
      setErrorMessage(err.message);
    } else {
      setErrorMessage('An unexpected error occurred. Please try again.');
    }
  }
}
