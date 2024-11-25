import { createContext, useState } from 'react';

import {
  IUserContext,
  ResultWebletter,
  UserContextProviderProps,
} from '../types';

const UserContext = createContext<IUserContext>({
  user: null,
  setUser: () => {},
  webletterList: null,
  setWebletterList: () => {},
  exhibitionList: null,
  setExhibitionList: () => {},
  langList: null,
  setLangList: () => {},
  selectedFilter: {},
  setSelectedFilter: () => {},
  isDarkMode: false,
  setIsDarkMode: () => {},
});

export const UserContextProvider = ({ children }: UserContextProviderProps) => {
  const [user, setUser] = useState<string | null>(null);
  const [webletterList, setWebletterList] = useState<ResultWebletter[] | null>(null);
  const [exhibitionList, setExhibitionList] = useState<string[] | null>(null);
  const [langList, setLangList] = useState<string[] | null>(null);
  const [selectedFilter, setSelectedFilter] = useState<Record<string, string>>({});
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        webletterList,
        setWebletterList,
        exhibitionList,
        setExhibitionList,
        langList,
        setLangList,
        selectedFilter,
        setSelectedFilter,
        isDarkMode,
        setIsDarkMode,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;

// https://stackoverflow.com/questions/41030361/how-to-update-react-context-from-inside-a-child-component
// https://devtrium.com/posts/how-use-react-context-pro
