import { createContext, useMemo, useState } from 'react';

import {
  IUserContext,
  ResultWebletter,
  UserContextProviderProps,
} from '../types';
import MainApi from '../utils/MainApi';

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
  weblettersCount: 0,
  setWeblettersCount: () => {},
  isInitialLoadData: false,
  setIsInitialLoadData: () => {},
  isDarkMode: false,
  setIsDarkMode: () => {},
  isStartCounter: false,
  setIsStartCounter: () => {},
  mainApi: null,
});

export const UserContextProvider = ({ children }: UserContextProviderProps) => {
  const [user, setUser] = useState<string | null>(null);
  const [webletterList, setWebletterList] = useState<ResultWebletter[] | null>(
    null
  );
  const [exhibitionList, setExhibitionList] = useState<string[] | null>(null);
  const [langList, setLangList] = useState<string[] | null>(null);
  const [selectedFilter, setSelectedFilter] = useState<Record<string, string>>(
    {}
  );
  const [weblettersCount, setWeblettersCount] = useState<number>(0);
  const [isInitialLoadData, setIsInitialLoadData] = useState<boolean>(false);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  const [isStartCounter, setIsStartCounter] = useState<boolean>(true);

  const mainApi = useMemo(
    () =>
      new MainApi(
        import.meta.env.VITE_APP_SERVER_BASE_URL,
        import.meta.env.VITE_APP_LOGIN_PATH,
        import.meta.env.VITE_APP_VERIFY_PATH,
        import.meta.env.VITE_APP_LOGOUT_PATH,
        import.meta.env.VITE_APP_WEBLETTERS_PATH,
        import.meta.env.VITE_APP_SEARCH_WEBLETTERS_PATH,
        import.meta.env.VITE_APP_WEBLETTER_TEXT_PATH,
        import.meta.env.VITE_APP_CREDENTIALS
      ),
    []
  );

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
        weblettersCount,
        setWeblettersCount,
        isInitialLoadData,
        setIsInitialLoadData,
        isDarkMode,
        setIsDarkMode,
        isStartCounter,
        setIsStartCounter,
        mainApi,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;

// https://stackoverflow.com/questions/41030361/how-to-update-react-context-from-inside-a-child-component
// https://devtrium.com/posts/how-use-react-context-pro
