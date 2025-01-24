import { FormEvent, ReactNode } from 'react';
import { MainApi } from '@shared/api';

export interface IWebletter {
  exhibition: string | null;
  id: string;
  size: number;
  title: string;
  preheader: string;
  lang: string;
  banner: string;
  upload_date: string;
}

export interface IUser {
  isVerified: boolean;
  isDarkMode: boolean;
  name: string;
}

export interface ISelectedFilter {
  exhibition: string;
  title: string;
  lang: string;
  startDate: string;
  endDate: string;
}

export interface IProtectedRoute {
  children: ReactNode;
}

export interface IUserContext {
  // user: string | null;
  // setUser: (user: string | null) => void;
  // webletterList: IWebletter[] | null;
  // setWebletterList: (webletters: IWebletter[] | null) => void;
  // exhibitionList: string[] | null;
  // setExhibitionList: (exhibitions: string[]) => void;
  // langList: string[] | null;
  // setLangList: (langs: string[]) => void;
  // rangeDate: firstAndLastDate | null;
  // setRangeDate: (rangeDate: firstAndLastDate | null) => void;
  // selectedFilter: Record<string, string>;
  // setSelectedFilter: (select: any) => void;
  // weblettersCount: number;
  // setWeblettersCount: (number: number) => void;
  isInitialLoadData: boolean;
  setIsInitialLoadData: (InitialLoadData: boolean) => void;
  // isDarkMode: boolean;
  // setIsDarkMode: (darkMode: boolean) => void;
  isStartCounter: boolean;
  setIsStartCounter: (start: boolean) => void;
  mainApi: MainApi | null;
}

export type UserContextProviderProps = {
  children: ReactNode;
};

// export interface IUser {
//   name: string;
// }

export interface ISearchForm {
  onSubmit: (
    evt: FormEvent<HTMLFormElement>,
    selectedFilter: ISelectedFilter
  ) => void;
}

export interface InitialLoadData {
  webletterList: IWebletter[];
  exhibitionList: string[];
  langList: string[];
  weblettersCount: number;
  firstAndLastDate: IFirstAndLastDate;
}

export type IFirstAndLastDate = {
  first_upload_date: string;
  last_upload_date: string;
};

export interface IWebletterText {
  text: string;
  misspelledWords: string[];
  stopWordsInText: string[];
}
