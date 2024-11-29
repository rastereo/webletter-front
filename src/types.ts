import { FormEvent, ReactNode } from 'react';
import MainApi from './utils/MainApi';

export interface ResultWebletter {
  exhibition: string | null;
  id: string;
  size: number;
  title: string;
  preheader: string;
  lang: string;
  banner: string;
  upload_date: string;
}

export interface IProtectedRoute {
  children: ReactNode;
}

export interface IUserContext {
  user: string | null;
  setUser: (user: string | null) => void;
  webletterList: ResultWebletter[] | null;
  setWebletterList: (webletters: ResultWebletter[] | null) => void;
  exhibitionList: string[] | null;
  setExhibitionList: (exhibitions: string[]) => void;
  langList: string[] | null;
  setLangList: (langs: string[]) => void;
  selectedFilter: Record<string, string>;
  setSelectedFilter: (select: any) => void;
  weblettersCount: number;
  setWeblettersCount: (number: number) => void;
  isInitialLoadData: boolean;
  setIsInitialLoadData: (InitialLoadData: boolean) => void;
  isDarkMode: boolean;
  setIsDarkMode: (darkMode: boolean) => void;
  isStartCounter: boolean;
  setIsStartCounter: (start: boolean) => void;
  mainApi: MainApi | null;
}

export type UserContextProviderProps = {
  children: ReactNode;
};

export interface IUser {
  name: string;
}

export interface ISearchForm {
  onSubmit: (
    evt: FormEvent<HTMLFormElement>,
    selectedFilter: Record<string, string>
  ) => void;
}

export interface InitialLoadData {
  webletterList: ResultWebletter[];
  exhibitionList: string[];
  langList: string[];
  weblettersCount: number;
}

export interface IWebletterText {
  text: string;
  misspelledWords: string[];
  stopWordsInText: string[];
}
