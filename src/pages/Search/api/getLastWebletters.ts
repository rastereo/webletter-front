import { MainApi } from '@shared/api';

import { firstAndLastDate, ResultWebletter } from '../../../types';

export async function getLastWebletters(
  mainApi: MainApi | null,
  setIsInitialLoadData: (InitialLoadData: boolean) => void,
  setErrorMessage: React.Dispatch<React.SetStateAction<string | null>>,
  setWebletterList: (webletters: ResultWebletter[] | null) => void,
  setExhibitionList: (exhibitions: string[]) => void,
  setLangList: (langs: string[]) => void,
  setRangeDate: (rangeDate: firstAndLastDate | null) => void,
  setWeblettersCount: (number: number) => void
) {
  if (!mainApi) {
    throw new Error('MainApi not found');
  }

  try {
    setIsInitialLoadData(true);
    setErrorMessage(null);
    setWebletterList(null);

    const {
      webletterList,
      exhibitionList,
      langList,
      weblettersCount,
      firstAndLastDate,
    } = await mainApi.getInitialLoadData();

    setWebletterList(webletterList);
    setExhibitionList(exhibitionList.filter((exhibition) => exhibition));
    setLangList(langList.filter((lang) => lang));
    setRangeDate(firstAndLastDate);
    setWeblettersCount(weblettersCount);
  } catch (err) {
    setWeblettersCount(0);

    if (err instanceof Error) {
      setErrorMessage(err.message);
    } else {
      setErrorMessage('An unexpected error occurred. Please try again.');
    }
  }
}
