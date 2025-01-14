import { useContext, useEffect, useState } from 'react';

import WebletterList from './WebletterList/WebletterList';
import SearchForm from './SearchForm/SearchForm';
import { Counter } from './Counter/Counter';
import { getLastWebletters } from '../api/getLastWebletters';
import { searchWebletters } from '../api/searchWebletters';
import { ErrorMessage } from '@widgets/ErrorMessage';
import { Loader } from '@widgets/Loader';
import { UserContext } from '@shared/contexts';
import useDocumentTitle from '@shared/lib/useDocumentTitle';

import './Search.css';

export function Search() {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const {
    webletterList,
    setWebletterList,
    setExhibitionList,
    setLangList,
    setRangeDate,
    weblettersCount,
    setWeblettersCount,
    isInitialLoadData,
    setIsInitialLoadData,
    mainApi,
    selectedFilter,
  } = useContext(UserContext);

  useDocumentTitle('Webletters', true);

  useEffect(() => {
    if (!webletterList)
      getLastWebletters(
        mainApi,
        setIsInitialLoadData,
        setErrorMessage,
        setWebletterList,
        setExhibitionList,
        setLangList,
        setRangeDate,
        setWeblettersCount
      );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <main className="search">
      <SearchForm
        onSubmit={(evt) =>
          searchWebletters(
            mainApi,
            evt,
            selectedFilter,
            setErrorMessage,
            setWebletterList,
            setIsInitialLoadData,
            setWeblettersCount
          )
        }
      />
      <Counter
        quantity={weblettersCount}
        text={isInitialLoadData ? 'Всего писем:' : 'Найдено писем:'}
      />
      {webletterList ? (
        <>
          <WebletterList webletterList={webletterList} />
        </>
      ) : errorMessage ? (
        <ErrorMessage message={errorMessage} />
      ) : (
        <Loader />
      )}
    </main>
  );
}
