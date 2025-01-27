import { FormEvent, ReactNode } from 'react';

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
