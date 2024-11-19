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
