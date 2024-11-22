import { ReactNode } from 'react';

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
  webletterList: ResultWebletter[] | null,
  setWebletterList: (webletters: ResultWebletter[]) => void,
  isDarkMode: boolean
  setIsDarkMode: (darkMode: boolean) => void
}

export type UserContextProviderProps = {
  children: ReactNode;
};